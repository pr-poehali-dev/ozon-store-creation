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

    try:
        send_email_notification(order_id, name, phone, email, delivery, address, comment, total, items)
    except Exception:
        pass

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'ok': True, 'order_id': order_id}),
    }
