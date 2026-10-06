import json  # v2
import os
import html as htmllib
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с формы обратной связи на email компании."""
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    subject = body.get('subject', '').strip()
    message = body.get('message', '').strip()
    phone = body.get('phone', '').strip()
    company = body.get('company', '').strip()

    if not name or not email:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Имя и email обязательны'})
        }

    smtp_host = os.environ.get('SMTP_HOST', 'smtp.mail.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    to_email = os.environ.get('TO_EMAIL', 'proekt-polimer@mail.ru')

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта: {subject or "Без темы"}'
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg['Reply-To'] = email

    esc = lambda v: htmllib.escape(v) if v else ''
    html = f"""
    <h2>Новая заявка с сайта Полимер-проект</h2>
    <p><strong>Имя:</strong> {esc(name)}</p>
    <p><strong>Организация:</strong> {esc(company) or 'Не указана'}</p>
    <p><strong>Email:</strong> {esc(email)}</p>
    <p><strong>Телефон:</strong> {esc(phone) or 'Не указан'}</p>
    <p><strong>Тема:</strong> {esc(subject) or 'Не указана'}</p>
    <p><strong>Сообщение:</strong><br>{esc(message) or 'Не указано'}</p>
    """
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    try:
        with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, to_email, msg.as_string())
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True})
    }