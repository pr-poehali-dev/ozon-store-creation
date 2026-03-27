import json
import os
import uuid
import urllib.request
import urllib.parse
import base64


def handler(event: dict, context) -> dict:
    """Создаёт платёж в ЮКассе и возвращает ссылку для оплаты."""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    amount = body.get('amount')
    description = body.get('description', 'Заказ в интернет-магазине')

    if not amount or float(amount) < 30000:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Минимальный заказ 30 000 ₽'}, ensure_ascii=False),
        }

    shop_id = os.environ['YOOKASSA_SHOP_ID']
    secret_key = os.environ['YOOKASSA_SECRET_KEY']
    credentials = base64.b64encode(f'{shop_id}:{secret_key}'.encode()).decode()

    return_url = 'https://polimer-proekt.ru/payment-success'

    payload = json.dumps({
        'amount': {'value': f'{float(amount):.2f}', 'currency': 'RUB'},
        'confirmation': {'type': 'redirect', 'return_url': return_url},
        'description': description,
        'capture': True,
    }).encode('utf-8')

    req = urllib.request.Request(
        'https://api.yookassa.ru/v3/payments',
        data=payload,
        headers={
            'Authorization': f'Basic {credentials}',
            'Content-Type': 'application/json',
            'Idempotence-Key': str(uuid.uuid4()),
        },
        method='POST',
    )

    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read().decode('utf-8'))

    confirmation_url = result['confirmation']['confirmation_url']

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'confirmation_url': confirmation_url, 'payment_id': result['id']}),
    }
