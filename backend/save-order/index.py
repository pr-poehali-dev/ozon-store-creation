import json
import os
import hashlib
import html
import smtplib
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p37034511_ozon_store_creation')
ADMIN_USER_ID = 0
MIN_ORDER = 25000
MAX_QTY = 1000
DELIVERY_LABELS = {
    'courier': 'Курьер',
    'sdek': 'СДЭК',
    'pochta': 'Почта России',
    'pickup': 'Самовывоз',
}
ALLOWED_STATUSES = ['new', 'processing', 'shipped', 'delivered', 'cancelled']

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}


def reply(status: int, payload: dict) -> dict:
    return {'statusCode': status, 'headers': CORS, 'body': json.dumps(payload, ensure_ascii=False)}


def get_session_user(cur, headers: dict):
    """Возвращает user_id по токену сессии из заголовка Authorization или None."""
    raw = headers.get('X-Authorization') or headers.get('x-authorization') or headers.get('Authorization') or headers.get('authorization') or ''
    token = raw.replace('Bearer ', '').strip()
    if not token:
        return None
    cur.execute(
        f'SELECT user_id FROM {SCHEMA}.sessions WHERE token_hash = %s AND expires_at > NOW()',
        (hashlib.sha256(token.encode()).hexdigest(),),
    )
    row = cur.fetchone()
    return row[0] if row else None


def load_items(cur, raw_items):
    """Состав и цены берутся из базы, цены от клиента игнорируются."""
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
    cur.execute(f'SELECT id, name, price FROM {SCHEMA}.products WHERE active = TRUE AND id = ANY(%s)', (list(wanted.keys()),))
    rows = {r[0]: r for r in cur.fetchall()}
    if len(rows) != len(wanted):
        return None
    return [{'id': pid, 'name': rows[pid][1], 'price': float(rows[pid][2]), 'quantity': qty} for pid, qty in wanted.items()]


def send_email_notification(order_id, name, phone, email, delivery, address, comment, total, items):
    e = lambda v: html.escape(str(v or ''))
    items_html = ''.join(
        f"<tr><td style='padding:4px 8px'>{e(i['name'])}</td>"
        f"<td style='padding:4px 8px;text-align:right'>{i['quantity']} шт.</td>"
        f"<td style='padding:4px 8px;text-align:right'>{int(i['price'])} ₽</td></tr>"
        for i in items
    )
    rows = [
        ('Имя', f'<strong>{e(name)}</strong>'),
        ('Телефон', f'<strong>{e(phone)}</strong>'),
        ('Email', e(email)),
        ('Доставка', e(DELIVERY_LABELS.get(delivery, delivery))),
    ]
    if address:
        rows.append(('Адрес', e(address)))
    if comment:
        rows.append(('Комментарий', e(comment)))
    rows_html = ''.join(f'<tr><td style="padding:4px 8px;color:#666">{k}:</td><td style="padding:4px 8px">{v}</td></tr>' for k, v in rows)

    body = f"""
    <h2>Новый заказ #{order_id} на сайте Полимер-проект</h2>
    <table style="border-collapse:collapse;width:100%;max-width:560px">{rows_html}</table>
    <h3 style="margin-top:24px">Состав заказа</h3>
    <table style="border-collapse:collapse;width:100%;max-width:560px">
      <thead><tr style="background:#f5f5f5"><th style="padding:4px 8px;text-align:left">Товар</th><th style="padding:4px 8px;text-align:right">Кол-во</th><th style="padding:4px 8px;text-align:right">Цена</th></tr></thead>
      <tbody>{items_html}</tbody>
      <tfoot><tr style="font-weight:bold;border-top:2px solid #eee"><td colspan="2" style="padding:8px">Итого:</td><td style="padding:8px;text-align:right">{int(total)} ₽</td></tr></tfoot>
    </table>
    """

    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    to_email = os.environ.get('TO_EMAIL', smtp_user)

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новый заказ #{order_id} — {name} — {int(total)} ₽'
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg['Reply-To'] = email
    msg.attach(MIMEText(body, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, to_email, msg.as_string())


def row_to_order(r):
    return {
        'id': r[0], 'name': r[1], 'phone': r[2], 'email': r[3],
        'delivery': r[4], 'address': r[5] or '', 'comment': r[6] or '',
        'total': float(r[7]),
        'items': r[8] if isinstance(r[8], list) else json.loads(r[8]),
        'status': r[9],
        'created_at': r[10].isoformat() if r[10] else '',
    }


COLUMNS = 'id, name, phone, email, delivery, address, comment, total, items, status, created_at'


def handler(event: dict, context) -> dict:
    """Заказы: создание (POST), список для админа или своя история покупателя (GET, только по токену), смена статуса (PUT, только админ)."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'POST')
    headers = event.get('headers') or {}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    session_user = get_session_user(cur, headers)

    if method == 'GET':
        if session_user is None:
            cur.close(); conn.close()
            return reply(401, {'error': 'Нет доступа'})
        if session_user == ADMIN_USER_ID:
            cur.execute(f'SELECT {COLUMNS} FROM {SCHEMA}.orders ORDER BY created_at DESC LIMIT 200')
        else:
            cur.execute(f'SELECT {COLUMNS} FROM {SCHEMA}.orders WHERE user_id = %s ORDER BY created_at DESC LIMIT 200', (session_user,))
        orders = [row_to_order(r) for r in cur.fetchall()]
        cur.close(); conn.close()
        return reply(200, {'orders': orders})

    if method == 'PUT':
        if session_user != ADMIN_USER_ID:
            cur.close(); conn.close()
            return reply(401, {'error': 'Нет доступа'})
        body = json.loads(event.get('body') or '{}')
        order_id = body.get('id')
        new_status = body.get('status')
        if not order_id or new_status not in ALLOWED_STATUSES:
            cur.close(); conn.close()
            return reply(400, {'error': 'Неверные данные'})
        cur.execute(f'UPDATE {SCHEMA}.orders SET status = %s WHERE id = %s', (new_status, order_id))
        conn.commit()
        cur.close(); conn.close()
        return reply(200, {'ok': True})

    body = json.loads(event.get('body') or '{}')
    name = str(body.get('name', '')).strip()[:200]
    phone = str(body.get('phone', '')).strip()[:50]
    email = str(body.get('email', '')).strip()[:200]
    delivery = body.get('delivery', '')
    address = str(body.get('address', ''))[:500]
    comment = str(body.get('comment', ''))[:2000]

    if not name or not phone or not email:
        cur.close(); conn.close()
        return reply(400, {'error': 'Заполните обязательные поля'})
    if delivery not in DELIVERY_LABELS:
        cur.close(); conn.close()
        return reply(400, {'error': 'Неверный способ доставки'})

    items = load_items(cur, body.get('items'))
    if items is None:
        cur.close(); conn.close()
        return reply(400, {'error': 'Некорректный состав заказа'})

    total = sum(i['price'] * i['quantity'] for i in items)
    if total < MIN_ORDER:
        cur.close(); conn.close()
        return reply(400, {'error': 'Минимальный заказ 25 000 ₽'})

    user_id = session_user if session_user not in (None, ADMIN_USER_ID) else None

    cur.execute(
        f'INSERT INTO {SCHEMA}.orders (name, phone, email, delivery, address, comment, total, items, user_id) '
        'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id',
        (name, phone, email, delivery, address, comment, total, json.dumps(items, ensure_ascii=False), user_id),
    )
    order_id = cur.fetchone()[0]
    conn.commit()
    cur.close(); conn.close()

    try:
        send_email_notification(order_id, name, phone, email, delivery, address, comment, total, items)
    except Exception as exc:
        print(f'[EMAIL] не удалось отправить уведомление: {exc}')

    return reply(200, {'ok': True, 'order_id': order_id, 'total': total})
