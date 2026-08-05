"""
Генерация каталога товаров в формате Яндекс YML (Yandex Market Language).
Возвращает XML-файл для загрузки в Яндекс.Маркет.
"""

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    products = [
        {
            'id': '8',
            'sku': '07020001',
            'name': 'Настенный светильник "Ворон настенный крепление с лево"',
            'price': 680,
            'image': 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/2c365501-6595-4d4e-bad1-d09f29e73b87.PNG',
            'category': 'Светильники',
            'description': 'Зеркальное исполнение настенного ворона с креплением с левой стороны — создайте симметричную пару или уникальную композицию в вашем интерьере',
        },
        {
            'id': '1',
            'sku': '07020002',
            'name': 'Настенный светильник "Ворон настенный крепление с право"',
            'price': 580,
            'image': 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/2c365501-6595-4d4e-bad1-d09f29e73b87.PNG',
            'category': 'Светильники',
            'description': 'Предмет искусства, который не просто украшает пространство, но и пробуждает воображение, вдохновляет на размышления',
        },
        {
            'id': '2',
            'sku': '07020003',
            'name': 'Настольный светильник "Ворон белый"',
            'price': 630,
            'image': 'https://cdn.poehali.dev/files/9c8c5d3b-f00d-47ad-b19e-51e059d79f85.JPG',
            'category': 'Светильники',
            'description': 'Стильный акцент в вашем интерьере, приковывающий взгляды и вызывающий восхищение',
        },
        {
            'id': '7',
            'sku': '07020004',
            'name': 'Настенный светильник "Сова на ветке"',
            'price': 750,
            'image': 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/83c5fef9-775f-45cf-a2ca-6f871b38f789.JPG',
            'category': 'Светильники',
            'description': 'Станет центральным элементом вашего интерьера. В детской — добрый ночной страж, в гостиной — произведёт неизгладимое впечатление на гостей',
        },
        {
            'id': '6',
            'sku': '07020005',
            'name': 'Настенный светильник "Сова"',
            'price': 1000,
            'image': 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/8879c698-3282-47fe-86c7-bb9ff379fbfa.JPG',
            'category': 'Светильники',
            'description': 'Добавьте в свою жизнь магию ночи и мудрость веков. Сова — древний символ мудрости, проницательности и защиты',
        },
        {
            'id': '5',
            'sku': '07020006',
            'name': 'Настенный светильник "Луна"',
            'price': 1100,
            'image': 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/3174a2b5-b1a4-4b3d-80e6-9f209257dc2d.JPG',
            'category': 'Светильники',
            'description': 'Свет, который словно сошёл с ночного неба, принося с собой магию лунных ночей',
        },
        {
            'id': '4',
            'sku': '07020007',
            'name': 'Настенный светильник "Ворон"',
            'price': 350,
            'image': 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/8096bb65-5a8a-4934-94e2-e85171eafebb.png',
            'category': 'Светильники',
            'description': 'Арт-объект, который привнесёт в ваш интерьер нотку готической элегантности и загадочности',
        },
        {
            'id': '3',
            'sku': '07020008',
            'name': 'Настольный светильник "Ворон"',
            'price': 630,
            'image': 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/c05a670d-564b-47d9-bde3-96214f2f5be2.PNG',
            'category': 'Светильники',
            'description': 'Выбор для тех, кто ценит оригинальность, стиль и внимание к деталям',
        },
    ]

    offers_xml = ''
    for p in products:
        desc = p['description'].replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
        name = p['name'].replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
        offers_xml += f"""
        <offer id="{p['id']}" available="true">
            <url>https://proekt-polimer.poehali.app/product/{p['id']}</url>
            <name>{name}</name>
            <vendorCode>{p['sku']}</vendorCode>
            <price>{p['price']}</price>
            <currencyId>RUR</currencyId>
            <categoryId>1</categoryId>
            <picture>{p['image']}</picture>
            <description>{desc}</description>
            <manufacturer_warranty>false</manufacturer_warranty>
            <country_of_origin>Россия</country_of_origin>
        </offer>"""

    yml = f"""<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE yml_catalog SYSTEM "shops.dtd">
<yml_catalog date="2026-03-27">
    <shop>
        <name>Полимер-проект</name>
        <company>ИП Полимер-проект</company>
        <url>https://proekt-polimer.poehali.app</url>
        <currencies>
            <currency id="RUR" rate="1"/>
        </currencies>
        <categories>
            <category id="1">Светильники декоративные</category>
        </categories>
        <offers>{offers_xml}
        </offers>
    </shop>
</yml_catalog>"""

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/xml; charset=utf-8',
            'Content-Disposition': 'attachment; filename="polimer-project-catalog.xml"',
            'Cache-Control': 'public, max-age=3600'
        },
        'body': yml
    }