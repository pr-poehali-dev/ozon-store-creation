import fs from 'node:fs';
import path from 'node:path';

export const SITE = 'https://proekt-polimer.ru';
const read = (p) => JSON.parse(fs.readFileSync(path.resolve(p), 'utf-8'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const money = (n) => `${Number(n).toLocaleString('ru-RU')} ₽`;
const abs = (u) => (u.startsWith('http') ? u : `${SITE}${u}`);

const NAV = [
  ['/', 'Главная'], ['/catalog', 'Каталог'], ['/print-calculator', 'Печать на заказ'], ['/wholesale', 'Опт'],
  ['/reviews', 'Отзывы'], ['/delivery', 'Доставка'], ['/about', 'О магазине'], ['/contacts', 'Контакты'],
  ['/privacy', 'Политика конфиденциальности'], ['/offer', 'Оферта'], ['/returns', 'Возврат и обмен'],
];

const nav = () => `<nav>${NAV.map(([h, l]) => `<a href="${h}">${l}</a>`).join(' | ')}</nav>`;
const wrap = (inner) => `<main style="font-family:sans-serif;max-width:900px;margin:0 auto;padding:20px;color:#333">${inner}${nav()}</main>`;
const productList = (products) => `<ul>${products.map((p) => `<li><a href="/product/${p.id}">${esc(p.name)} — ${money(p.price)}</a></li>`).join('')}</ul>`;

const CONTACTS = `<p>Телефон: <a href="tel:+79216363608">8 921 636-36-08</a><br/>Email: <a href="mailto:proekt-polimer@mail.ru">proekt-polimer@mail.ru</a><br/>Адрес: г. Санкт-Петербург, Уральская ул., 19к9Ж, офис 409<br/>Режим работы: ежедневно с 10:00 до 19:00</p>`;

export const buildPages = () => {
  const products = read('src/data/products.json');
  const legal = read('src/data/legal.json');
  const reviews = read('src/data/reviews.json');
  const minPrice = Math.min(...products.map((p) => p.price));
  const pages = [];

  pages.push({
    path: '/',
    title: 'Полимер-проект — декоративные светильники и сувениры из Санкт-Петербурга',
    description: `Декоративные светильники и сувениры из полимера: ворон, сова, луна, ключницы. Производство в Санкт-Петербурге, доставка по России. Цены от ${minPrice} ₽.`,
    body: wrap(`<h1>Полимер-проект — декоративные светильники и сувениры</h1><p>Производитель декоративных светильников и сувениров из полимерных материалов из Санкт-Петербурга. Доставка по всей России, оптовые цены от ${minPrice} ₽.</p><h2>Каталог</h2>${productList(products)}<h2>Контакты</h2>${CONTACTS}`),
  });

  pages.push({
    path: '/catalog',
    title: 'Каталог светильников и сувениров — Полимер-проект',
    description: `Каталог декоративных светильников, ключниц и сувениров из полимера. ${products.length} товаров, цены от ${minPrice} ₽. Доставка по России.`,
    body: wrap(`<h1>Каталог товаров</h1>${productList(products)}`),
  });

  for (const p of products) {
    const desc = (p.description || '').replace(/\s+/g, ' ').trim();
    pages.push({
      path: `/product/${p.id}`,
      title: `${p.name} — купить за ${money(p.price)} | Полимер-проект`,
      description: `${p.name}. Цена: ${p.price} ₽. ${desc.slice(0, 110)}`.trim(),
      image: abs(p.image),
      jsonLd: {
        '@context': 'https://schema.org', '@type': 'Product', name: p.name, sku: p.sku, image: abs(p.image),
        description: desc, brand: { '@type': 'Brand', name: 'Полимер-проект' },
        offers: { '@type': 'Offer', url: `${SITE}/product/${p.id}`, priceCurrency: 'RUB', price: p.price, availability: 'https://schema.org/InStock' },
      },
      body: wrap(`<h1>${esc(p.name)}</h1><img src="${esc(abs(p.image))}" alt="${esc(p.name)}" width="400"/><p><strong>Цена: ${money(p.price)}</strong> · Артикул ${esc(p.sku)} · Категория: ${esc(p.category)}</p>${(p.description || '').split('\n\n').map((t) => `<p>${esc(t)}</p>`).join('')}<p><a href="/catalog">← Весь каталог</a></p>`),
    });
  }

  pages.push({
    path: '/reviews',
    title: 'Отзывы покупателей — Полимер-проект',
    description: `Отзывы покупателей о светильниках Полимер-проект: ${reviews.length} отзывов, оценка 5 из 5.`,
    body: wrap(`<h1>Отзывы покупателей</h1>${reviews.map((r) => `<h3>${esc(r.name)} — ${'★'.repeat(r.stars)}</h3><p><small>${esc(r.date)}</small><br/>${esc(r.text)}</p>`).join('')}`),
  });

  pages.push({
    path: '/delivery',
    title: 'Доставка и оплата — Полимер-проект',
    description: 'Доставка светильников по Санкт-Петербургу, области и всей России (СДЭК, Деловые Линии, ПЭК). Самовывоз со склада. Оплата онлайн.',
    body: wrap(`<h1>Доставка и оплата</h1><h2>Самовывоз</h2><p>Адрес: г. Санкт-Петербург, Уральская ул., 19к9Ж, офис 409, ежедневно 10:00–19:00.</p><h2>Доставка по Санкт-Петербургу</h2><p>Стоимость 1 000 ₽, бесплатно при заказе от 50 000 ₽.</p><h2>Ленинградская область</h2><p>Стоимость рассчитывается индивидуально — позвоните 8 921 636-36-08.</p><h2>По России</h2><p>СДЭК, Деловые Линии, ПЭК. После отправки выдаём трек-номер.</p><h2>Оплата</h2><p>Онлайн банковской картой через ЮKassa или при самовывозе.</p><p><a href="/returns">Возврат и обмен</a></p>`),
  });

  pages.push({
    path: '/about',
    title: 'О магазине — Полимер-проект',
    description: 'Полимер-проект — российская компания из Санкт-Петербурга, производитель декоративных светильников и сувениров из полимерных материалов. Основана в 2024 году.',
    body: wrap(`<h1>О магазине</h1><p>«Полимер-проект» — российская компания, основанная в 2024 году в Санкт-Петербурге. Мы производим декоративные светильники и сувениры из высококачественных полимерных материалов: от разработки модели до упаковки готового изделия.</p><p>Производство полностью локализовано в Санкт-Петербурге, поэтому мы контролируем качество на каждом этапе.</p>`),
  });

  pages.push({
    path: '/contacts',
    title: 'Контакты — Полимер-проект',
    description: 'Контакты магазина Полимер-проект: г. Санкт-Петербург, Уральская ул., 19к9Ж, офис 409. Телефон 8 921 636-36-08, email proekt-polimer@mail.ru.',
    body: wrap(`<h1>Контакты</h1>${CONTACTS}`),
  });

  pages.push({
    path: '/wholesale',
    title: 'Опт — оптовые закупки светильников от производителя — Полимер-проект',
    description: 'Оптовые закупки декоративных светильников и сувениров от производителя. Цены от 260 ₽, работа с юрлицами и ИП, доставка по России.',
    body: wrap(`<h1>Оптовым покупателям</h1><p>Магазинам декора, дизайн-студиям, event-агентствам: оптовые цены от 260 ₽, работа с юрлицами и ИП, счёт и закрывающие документы, доставка по России. Оставьте заявку на странице или позвоните 8 921 636-36-08.</p>`),
  });

  pages.push({
    path: '/print-calculator',
    title: 'Калькулятор стоимости 3D-печати — Печать на заказ | Полимер-проект',
    description: 'Печать на заказ: рассчитайте ориентировочную стоимость 3D-печати. Фигурки по фото, сувениры, подарки.',
    body: wrap(`<h1>Печать на заказ</h1><p>Печатаем фигурки по фотографии, свадебные пары, портреты и подарочные сувениры. Рассчитайте стоимость в калькуляторе или позвоните 8 921 636-36-08.</p>`),
  });

  for (const [type, doc] of Object.entries(legal)) {
    pages.push({
      path: `/${type}`,
      title: `${doc.title} — Полимер-проект`,
      description: doc.description,
      body: wrap(`<h1>${esc(doc.title)}</h1>${doc.sections.map((s) => `<h2>${esc(s.h)}</h2>${s.p.map((t) => `<p>${esc(t)}</p>`).join('')}`).join('')}`),
    });
  }

  return pages;
};

export const renderPage = (template, page) => {
  const url = `${SITE}${page.path === '/' ? '/' : page.path}`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(page.description)}">`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}">`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}">`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(page.title)}">`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(page.description)}">`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(page.title)}">`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(page.description)}">`);
  if (page.image) {
    html = html
      .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${esc(page.image)}">`)
      .replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${esc(page.image)}">`);
  }
  if (page.jsonLd) {
    html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>\n</head>`);
  }
  return html.replace('<!--ssr-outlet-->', page.body);
};

export const buildSitemap = (pages, lastmod) => {
  const prio = (p) => (p === '/' ? '1.0' : p === '/catalog' ? '0.9' : p.startsWith('/product/') ? '0.8' : p === '/wholesale' || p === '/print-calculator' ? '0.7' : p === '/privacy' || p === '/offer' || p === '/returns' ? '0.3' : '0.6');
  const freq = (p) => (p === '/' || p === '/catalog' ? 'weekly' : p.startsWith('/product/') ? 'monthly' : 'monthly');
  const urls = pages.map((pg) => `  <url>\n    <loc>${SITE}${pg.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq(pg.path)}</changefreq>\n    <priority>${prio(pg.path)}</priority>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};
