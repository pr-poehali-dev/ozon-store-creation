import json
import os
import uuid
import base64
import urllib.request
import urllib.error
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p37034511_ozon_store_creation')
MAX_QTY = 1000
RETURN_URL = 'https://proekt-polimer.ru/payment-success'


def load_items(raw_items):
    """Считает позиции заказа по ценам из базы, цены и суммы от клиента игнорируются."""
    wanted = {}
    for it in raw_items if isinstance(raw_items, list) else []:
        try:
            pid = int(it.get('id'))
            qty = int(it.get('quantity', 1))
        except (TypeError, ValueError, AttributeError):
            return None
        if qty < 1 or qty > MAX_QTY:
            return None
        wanted[pid] = wanted.get(pid, 0) + qty
    if not wanted:
        return None

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(f'SELECT id, name, price FROM {SCHEMA}.products WHERE active = TRUE AND id = ANY(%s)', (list(wanted.keys()),))
    rows = {r[0]: r for r in cur.fetchall()}
    cur.close(); conn.close()

    if len(rows) != len(wanted):
        return None
    return [{'id': pid, 'name': rows[pid][1], 'price': float(rows[pid][2]), 'quantity': qty} for pid, qty in wanted.items()]


def handler(event: dict, context) -> dict:
    """Создаёт платёж в ЮKassa. Сумма считается на сервере по ценам из базы."""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    def reply(status: int, payload: dict) -> dict:
        return {'statusCode': status, 'headers': cors_headers, 'body': json.dumps(payload, ensure_ascii=False)}

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    customer = body.get('customer') or {}

    items = load_items(body.get('items'))
    if items is None:
        return reply(400, {'error': 'Некорректный состав заказа'})

    total = sum(i['price'] * i['quantity'] for i in items)

    shop_id = os.environ.get('YOOKASSA_SHOP_ID')
    secret_key = os.environ.get('YOOKASSA_SECRET_KEY')
    if not shop_id or not secret_key:
        print('[CONFIG] не заданы YOOKASSA_SHOP_ID / YOOKASSA_SECRET_KEY')
        return reply(500, {'error': 'Оплата временно недоступна'})
    shop_id = shop_id.strip()
    secret_key = secret_key.strip()
    credentials = base64.b64encode(f'{shop_id}:{secret_key}'.encode()).decode()

    receipt_items = [
        {
            'description': i['name'][:128],
            'quantity': str(i['quantity']),
            'amount': {'value': f"{i['price']:.2f}", 'currency': 'RUB'},
            'vat_code': 1,
            'payment_mode': 'full_payment',
            'payment_subject': 'commodity',
        }
        for i in items
    ]

    payload = json.dumps({
        'amount': {'value': f'{total:.2f}', 'currency': 'RUB'},
        'confirmation': {'type': 'redirect', 'return_url': RETURN_URL},
        'description': f"Заказ: {str(customer.get('name', ''))[:60]}, {str(customer.get('phone', ''))[:20]}",
        'capture': True,
        'receipt': {
            'customer': {
                'full_name': str(customer.get('name', ''))[:256],
                'email': str(customer.get('email', ''))[:256],
                'phone': str(customer.get('phone', '')).replace(' ', '').replace('-', ''),
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
        with urllib.request.urlopen(req, timeout=15) as resp:
            result = json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        raw = e.read().decode('utf-8')
        try:
            err = json.loads(raw)
        except ValueError:
            err = {}
        code = err.get('code', '')
        if e.code in (401, 403) or code in ('invalid_credentials', 'forbidden'):
            print('[YOOKASSA CONFIG] ЮKassa не приняла shopId/секретный ключ. Проверьте секреты YOOKASSA_SHOP_ID и YOOKASSA_SECRET_KEY: значения без пробелов, ключ действующий, магазин активен.')
            return reply(503, {
                'error': 'Онлайн-оплата временно недоступна. Вы можете оформить заказ без оплаты, и мы свяжемся с вами.',
                'code': 'payment_unavailable',
            })
        print(f'[YOOKASSA ERROR] http={e.code} code={code} description={err.get("description", raw[:300])}')
        return reply(502, {
            'error': 'Не удалось создать платёж. Попробуйте ещё раз или оформите заказ без оплаты.',
            'code': 'payment_failed',
        })
    except (urllib.error.URLError, TimeoutError) as e:
        print(f'[YOOKASSA NETWORK] {e}')
        return reply(502, {
            'error': 'Платёжный сервис не отвечает. Попробуйте ещё раз или оформите заказ без оплаты.',
            'code': 'payment_failed',
        })

    return reply(200, {
        'confirmation_url': result['confirmation']['confirmation_url'],
        'payment_id': result['id'],
        'amount': total,
    })
