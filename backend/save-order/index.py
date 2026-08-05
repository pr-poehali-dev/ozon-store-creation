import json
import os
import smtplib
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_email_notification(order_id, name, phone, email, delivery, address, comment, total, items):
    delivery_labels = {
        'courier': 'Курьер',
        'sdek': 'СДЭК',
        'pochta': 'Почта России',
        'pickup': 'Самовывоз',
    }
    delivery_label = delivery_labels.get(delivery, delivery)

    items_html = ''.join(
        f"<tr><td style='padding:4px 8px'>{i.get('name','')}</td>"
        f"<td style='padding:4px 8px;text-align:right'>{i.get('quantity',1)} шт.</td>"
        f"<td style='padding:4px 8px;text-align:right'>{int(i.get('price',0)):,} ₽</td></tr>".replace(',', ' ')
        for i in items
    )

    html = f"""
    <h2 style="color:#1a1a1a">Новый заказ #{order_id} на сайте Полимер-проект</h2>
    <table style="border-collapse:collapse;width:100%;max-width:560px">
      <tr><td style="padding:4px 8px;color:#666">Имя:</td><td style="padding:4px 8px"><strong>{name}</strong></td></tr>
      <tr><td style="padding:4px 8px;color:#666">Телефон:</td><td style="padding:4px 8px"><strong>{phone}</strong></td></tr>
      <tr><td style="padding:4px 8px;color:#666">Email:</td><td style="padding:4px 8px">{email}</td></tr>
      <tr><td style="padding:4px 8px;color:#666">Доставка:</td><td style="padding:4px 8px">{delivery_label}</td></tr>
      {'<tr><td style="padding:4px 8px;color:#666">Адрес:</td><td style="padding:4px 8px">' + address + '</td></tr>' if address else ''}
      {'<tr><td style="padding:4px 8px;color:#666">Комментарий:</td><td style="padding:4px 8px">' + comment + '</td></tr>' if comment else ''}
    </table>
    <h3 style="margin-top:24px">Состав заказа</h3>
    <table style="border-collapse:collapse;width:100%;max-width:560px">
      <thead>
        <tr style="background:#f5f5f5">
          <th style="padding:4px 8px;text-align:left">Товар</th>
          <th style="padding:4px 8px;text-align:right">Кол-во</th>
          <th style="padding:4px 8px;text-align:right">Цена</th>
        </tr>
      </thead>
      <tbody>{items_html}</tbody>
      <tfoot>
        <tr style="font-weight:bold;border-top:2px solid #eee">
          <td colspan="2" style="padding:8px">Итого:</td>
          <td style="padding:8px;text-align:right">{int(total):,} ₽</td>
        </tr>
      </tfoot>
    </table>
    """.replace(',', '\u00a0')

    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    to_email = os.environ.get('TO_EMAIL', smtp_user)

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новый заказ #{order_id} — {name} — {int(total):,} ₽'.replace(',', '\u00a0')
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg['Reply-To'] = email

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, to_email, msg.as_string())


ADMIN_TOKEN = 'polimer-admin-2024'


def handler(event: dict, context) -> dict:
    """Сохраняет заказ в БД (POST), возвращает список заказов для админки (GET), обновляет статус (PUT)."""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    method = event.get('httpMethod', 'POST')
    headers = event.get('headers') or {}
    params = event.get('queryStringParameters') or {}

    # GET — список заказов для админки или история заказов пользователя
    if method == 'GET':
        token = headers.get('X-Admin-Token') or headers.get('x-admin-token')

        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()

        if token == ADMIN_TOKEN:
            cur.execute(
                "SELECT id, name, phone, email, delivery, address, comment, total, items, status, created_at "
                "FROM orders ORDER BY created_at DESC LIMIT 200"
            )
        else:
            user_id = params.get('user_id')
            user_email = (params.get('email') or '').strip().lower()
            if not user_id and not user_email:
                cur.close(); conn.close()
                return {'statusCode': 401, 'headers': cors_headers, 'body': json.dumps({'error': 'Нет доступа'})}

            cur.execute(
                "SELECT id, name, phone, email, delivery, address, comment, total, items, status, created_at "
                "FROM orders WHERE user_id = %s OR LOWER(email) = %s ORDER BY created_at DESC LIMIT 200",
                (user_id, user_email)
            )

        rows = cur.fetchall()
        cur.close(); conn.close()

        orders = []
        for r in rows:
            orders.append({
                'id': r[0], 'name': r[1], 'phone': r[2], 'email': r[3],
                'delivery': r[4], 'address': r[5] or '', 'comment': r[6] or '',
                'total': float(r[7]),
                'items': r[8] if isinstance(r[8], list) else json.loads(r[8]),
                'status': r[9],
                'created_at': r[10].isoformat() if r[10] else '',
            })

        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'orders': orders}, ensure_ascii=False)}

    # PUT — обновление статуса
    if method == 'PUT':
        token = headers.get('X-Admin-Token') or headers.get('x-admin-token')
        if token != ADMIN_TOKEN:
            return {'statusCode': 401, 'headers': cors_headers, 'body': json.dumps({'error': 'Нет доступа'})}

        body = json.loads(event.get('body') or '{}')
        order_id = body.get('id')
        new_status = body.get('status')
        allowed = ['new', 'processing', 'shipped', 'delivered', 'cancelled']
        if not order_id or new_status not in allowed:
            return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Неверные данные'})}

        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        cur.execute("UPDATE orders SET status = %s WHERE id = %s", (new_status, order_id))
        conn.commit()
        cur.close(); conn.close()
        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'ok': True})}

    # POST — создать заказ
    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    delivery = body.get('delivery', '')
    address = body.get('address', '')
    comment = body.get('comment', '')
    total = float(body.get('total', 0))
    items = body.get('items', [])
    user_id = body.get('user_id')

    if not name or not phone or not email:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Заполните обязательные поля'}, ensure_ascii=False),
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO orders (name, phone, email, delivery, address, comment, total, items, user_id) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
        (name, phone, email, delivery, address, comment, total, json.dumps(items, ensure_ascii=False), user_id)
    )
    order_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    try:
        send_email_notification(order_id, name, phone, email, delivery, address, comment, total, items)
    except Exception:
        pass

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'ok': True, 'order_id': order_id}),
    }