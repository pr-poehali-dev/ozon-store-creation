import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Сохраняет заказ клиента в базу данных и отправляет уведомление на почту."""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')

    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    delivery = body.get('delivery', '')
    address = body.get('address', '')
    comment = body.get('comment', '')
    total = float(body.get('total', 0))
    items = body.get('items', [])

    if not name or not phone or not email:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Заполните обязательные поля'}, ensure_ascii=False),
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO orders (name, phone, email, delivery, address, comment, total, items) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
        (name, phone, email, delivery, address, comment, total, json.dumps(items, ensure_ascii=False))
    )
    order_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'ok': True, 'order_id': order_id}),
    }
