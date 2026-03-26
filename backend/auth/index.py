import json
import os
import hashlib
import secrets
import psycopg2

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def hash_password(password: str, salt: str) -> str:
    return hashlib.sha256((salt + password).encode()).hexdigest()

def handler(event: dict, context) -> dict:
    """Регистрация и вход пользователей магазина Полимер-проект"""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    action = body.get('action')

    conn = get_conn()
    cur = conn.cursor()

    if action == 'register':
        name = body.get('name', '').strip()
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')

        if not name or not email or not password:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Заполните все поля'})}

        if len(password) < 6:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Пароль должен быть не менее 6 символов'})}

        cur.execute('SELECT id FROM t_p37034511_ozon_store_creation.users WHERE email = %s', (email,))
        if cur.fetchone():
            cur.close(); conn.close()
            return {'statusCode': 409, 'headers': cors, 'body': json.dumps({'error': 'Пользователь с таким email уже существует'})}

        salt = secrets.token_hex(16)
        pw_hash = hash_password(password, salt)
        stored = salt + ':' + pw_hash

        cur.execute(
            'INSERT INTO t_p37034511_ozon_store_creation.users (name, email, password_hash) VALUES (%s, %s, %s) RETURNING id',
            (name, email, stored)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        cur.close(); conn.close()

        session_token = secrets.token_hex(32)
        return {
            'statusCode': 200,
            'headers': cors,
            'body': json.dumps({'ok': True, 'user': {'id': user_id, 'name': name, 'email': email}, 'token': session_token})
        }

    elif action == 'login':
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')

        if not email or not password:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Введите email и пароль'})}

        cur.execute(
            'SELECT id, name, email, password_hash FROM t_p37034511_ozon_store_creation.users WHERE email = %s',
            (email,)
        )
        row = cur.fetchone()
        cur.close(); conn.close()

        if not row:
            return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'error': 'Неверный email или пароль'})}

        user_id, name, user_email, stored = row
        salt, pw_hash = stored.split(':', 1)
        if hash_password(password, salt) != pw_hash:
            return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'error': 'Неверный email или пароль'})}

        session_token = secrets.token_hex(32)
        return {
            'statusCode': 200,
            'headers': cors,
            'body': json.dumps({'ok': True, 'user': {'id': user_id, 'name': name, 'email': user_email}, 'token': session_token})
        }

    cur.close(); conn.close()
    return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Неизвестное действие'})}
