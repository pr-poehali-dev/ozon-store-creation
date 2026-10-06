import json
import os
import hashlib
import hmac
import secrets
import time
from datetime import datetime, timedelta
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p37034511_ozon_store_creation')
USER_SESSION_DAYS = 30
ADMIN_SESSION_HOURS = 12
ADMIN_USER_ID = 0


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def hash_password(password: str, salt: str) -> str:
    return hashlib.sha256((salt + password).encode()).hexdigest()


def token_hash(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def create_session(cur, user_id: int, ttl: timedelta) -> str:
    token = secrets.token_hex(32)
    cur.execute(
        f'INSERT INTO {SCHEMA}.sessions (token_hash, user_id, expires_at) VALUES (%s, %s, %s)',
        (token_hash(token), user_id, datetime.utcnow() + ttl),
    )
    cur.execute(f'DELETE FROM {SCHEMA}.sessions WHERE expires_at < NOW()')
    return token


def handler(event: dict, context) -> dict:
    """Регистрация и вход покупателей, вход администратора. Выдаёт токены сессии, пароль админа проверяется только на сервере."""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }

    def reply(status: int, payload: dict) -> dict:
        return {'statusCode': status, 'headers': cors, 'body': json.dumps(payload, ensure_ascii=False)}

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    action = body.get('action')

    if action == 'admin_login':
        expected = os.environ.get('ADMIN_PASSWORD', '')
        given = body.get('password', '')
        if not expected:
            print('[CONFIG] ADMIN_PASSWORD не задан')
            return reply(401, {'error': 'Неверный пароль'})
        if not hmac.compare_digest(given.encode(), expected.encode()):
            time.sleep(1.5)
            return reply(401, {'error': 'Неверный пароль'})
        conn = get_conn()
        cur = conn.cursor()
        token = create_session(cur, ADMIN_USER_ID, timedelta(hours=ADMIN_SESSION_HOURS))
        conn.commit()
        cur.close(); conn.close()
        return reply(200, {'ok': True, 'token': token})

    conn = get_conn()
    cur = conn.cursor()

    if action == 'register':
        name = body.get('name', '').strip()
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')

        if not name or not email or not password:
            cur.close(); conn.close()
            return reply(400, {'error': 'Заполните все поля'})

        if len(password) < 6:
            cur.close(); conn.close()
            return reply(400, {'error': 'Пароль должен быть не менее 6 символов'})

        cur.execute(f'SELECT id FROM {SCHEMA}.users WHERE email = %s', (email,))
        if cur.fetchone():
            cur.close(); conn.close()
            return reply(409, {'error': 'Пользователь с таким email уже существует'})

        salt = secrets.token_hex(16)
        stored = salt + ':' + hash_password(password, salt)

        cur.execute(
            f'INSERT INTO {SCHEMA}.users (name, email, password_hash) VALUES (%s, %s, %s) RETURNING id',
            (name, email, stored),
        )
        user_id = cur.fetchone()[0]
        token = create_session(cur, user_id, timedelta(days=USER_SESSION_DAYS))
        conn.commit()
        cur.close(); conn.close()
        return reply(200, {'ok': True, 'user': {'id': user_id, 'name': name, 'email': email}, 'token': token})

    if action == 'login':
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')

        if not email or not password:
            cur.close(); conn.close()
            return reply(400, {'error': 'Введите email и пароль'})

        cur.execute(f'SELECT id, name, email, password_hash FROM {SCHEMA}.users WHERE email = %s', (email,))
        row = cur.fetchone()

        if not row:
            cur.close(); conn.close()
            return reply(401, {'error': 'Неверный email или пароль'})

        user_id, name, user_email, stored = row
        salt, pw_hash = stored.split(':', 1)
        if not hmac.compare_digest(hash_password(password, salt), pw_hash):
            cur.close(); conn.close()
            return reply(401, {'error': 'Неверный email или пароль'})

        token = create_session(cur, user_id, timedelta(days=USER_SESSION_DAYS))
        conn.commit()
        cur.close(); conn.close()
        return reply(200, {'ok': True, 'user': {'id': user_id, 'name': name, 'email': user_email}, 'token': token})

    cur.close(); conn.close()
    return reply(400, {'error': 'Неизвестное действие'})
