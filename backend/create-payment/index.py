import json
import os
import uuid
import urllib.request
import urllib.parse
import urllib.error
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

    shop_id = os.environ.get('YOOKASSA_SHOP_ID', '1311963')
    secret_key = os.environ.get('YOOKASSA_SECRET_KEY', 'live_tv7B3B-suhtM-MaNxc2KsG0jujg2reK_xGebnExt-x4')
    credentials = base64.b64encode(f'{shop_id}:{secret_key}'.encode()).decode()

    return_url = 'https://polimer-proekt.ru/payment-success'

    customer = body.get('customer', {})
    items = body.get('items', [])

    receipt_items = [
        {
            'description': item.get('name', 'Товар')[:128],
            'quantity': str(item.get('quantity', 1)),
            'amount': {'value': f"{float(item.get('price', 0)):.2f}", 'currency': 'RUB'},
            'vat_code': 1,
            'payment_mode': 'full_payment',
            'payment_subject': 'commodity',
        }
        for item in items
    ] or [
        {
            'description': description[:128],
            'quantity': '1',
            'amount': {'value': f'{float(amount):.2f}', 'currency': 'RUB'},
            'vat_code': 1,
            'payment_mode': 'full_payment',
            'payment_subject': 'commodity',
        }
    ]

    payload = json.dumps({
        'amount': {'value': f'{float(amount):.2f}', 'currency': 'RUB'},
        'confirmation': {'type': 'redirect', 'return_url': return_url},
        'description': description,
        'capture': True,
        'receipt': {
            'customer': {
                'full_name': customer.get('name', ''),
                'email': customer.get('email', ''),
                'phone': customer.get('phone', '').replace(' ', '').replace('-', ''),
            },
            'items': receipt_items,
        },
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

    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f'[YOOKASSA ERROR] code={e.code} body={error_body}')
        return {
            'statusCode': 502,
            'headers': cors_headers,
            'body': json.dumps({'error': f'ЮКасса: {error_body}'}, ensure_ascii=False),
        }

    confirmation_url = result['confirmation']['confirmation_url']

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'confirmation_url': confirmation_url, 'payment_id': result['id']}),
    }