/*
 * Scraper one-shot para jftruck.com.br (Nuvem Shop).
 * - Descobre URLs via sitemap.xml
 * - Raspa cada página de produto (nome, categoria, descrição curta/longa, specs, SKU, imagens)
 * - Baixa as imagens para public/products/<slug>/img-N.webp
 * - Gera src/data/productData.js preservando os helpers atuais
 *
 * Uso:
 *   node tools/scrape-jftruck.js
 *
 * Idempotente: mantém checkpoint em tools/scraped.json e pula imagens já baixadas.
 */

import { load } from 'cheerio';
import { mkdir, writeFile, readFile, stat } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SITE = 'https://jftruck.com.br';
const SITEMAP = `${SITE}/sitemap.xml`;
const UA = 'JFHydraulic-Scraper/1.0 (contato interno)';

const PUBLIC_PRODUCTS = join(ROOT, 'public', 'products');
const TOOLS = join(ROOT, 'tools');
const OUT_DATA = join(ROOT, 'src', 'data', 'productData.js');
const CHECK_URLS = join(TOOLS, 'urls.json');
const CHECK_SCRAPED = join(TOOLS, 'scraped.json');
const CHECK_FAILED = join(TOOLS, 'failed.txt');

/* -------- utils -------- */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const jitter = (min, max) => min + Math.floor(Math.random() * (max - min));

async function fileExistsWithSize(path) {
  try {
    const s = await stat(path);
    return s.size > 0;
  } catch {
    return false;
  }
}

async function readJsonIfExists(path, fallback) {
  try {
    const txt = await readFile(path, 'utf-8');
    return JSON.parse(txt);
  } catch {
    return fallback;
  }
}

async function fetchText(url, attempt = 1) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err) {
    if (attempt < 3) {
      await sleep(1200 * attempt);
      return fetchText(url, attempt + 1);
    }
    throw err;
  }
}

async function downloadFile(url, destPath, attempt = 1) {
  if (await fileExistsWithSize(destPath)) return { skipped: true };
  await mkdir(dirname(destPath), { recursive: true });
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const stream = createWriteStream(destPath);
    await finished(Readable.fromWeb(res.body).pipe(stream));
    return { skipped: false };
  } catch (err) {
    if (attempt < 3) {
      await sleep(800 * attempt);
      return downloadFile(url, destPath, attempt + 1);
    }
    throw err;
  }
}

/* -------- mini semáforo (concorrência) -------- */
function createLimiter(concurrency) {
  let active = 0;
  const queue = [];
  const runNext = () => {
    if (active >= concurrency || queue.length === 0) return;
    active++;
    const { fn, resolve, reject } = queue.shift();
    fn().then(resolve, reject).finally(() => {
      active--;
      runNext();
    });
  };
  return (fn) =>
    new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject });
      runNext();
    });
}

/* -------- 1) descobrir URLs via sitemap -------- */
async function discoverUrls() {
  console.log('[1/4] Lendo sitemap...');
  const cached = await readJsonIfExists(CHECK_URLS, null);
  if (cached && Array.isArray(cached) && cached.length > 0) {
    console.log(`      cache: ${cached.length} URLs`);
    return cached;
  }
  const xml = await fetchText(SITEMAP);
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const productUrls = matches.filter((u) => /\/produtos\/[^/]+\/?$/.test(u));
  const unique = [...new Set(productUrls)];
  await mkdir(TOOLS, { recursive: true });
  await writeFile(CHECK_URLS, JSON.stringify(unique, null, 2));
  console.log(`      ${unique.length} URLs de produto descobertas`);
  return unique;
}

/* -------- 2) raspar uma página de produto -------- */
function extractFromHtml(html, url) {
  const $ = load(html);
  const slug = url.replace(/\/$/, '').split('/').pop();

  // Nome
  let name =
    $('h1.js-product-name').first().text().trim() ||
    $('[data-store="product-name"]').first().text().trim() ||
    $('meta[property="og:title"]').attr('content') ||
    $('h1').first().text().trim();
  name = (name || '').replace(/\s+/g, ' ').trim();

  // Categoria (breadcrumb)
  let category = '';
  const crumbs = $('nav[aria-label="breadcrumb"] a, .breadcrumb a, .breadcrumbs a, [itemprop="breadcrumb"] a')
    .map((_, el) => $(el).text().trim())
    .get()
    .filter((t) => t && !/^in[ií]cio|home$/i.test(t));
  if (crumbs.length > 0) category = crumbs[crumbs.length - 1];

  // meta de categoria (fallback)
  if (!category) {
    const metaCat = $('meta[property="product:category"]').attr('content');
    if (metaCat) category = metaCat;
  }

  // Descrições
  const descSelectors = [
    '.user-description',
    '.js-product-description',
    '[data-store="product-description"]',
    '#product-description-content',
    '.product-description',
  ];
  let descHtml = '';
  for (const sel of descSelectors) {
    const el = $(sel).first();
    if (el.length > 0) {
      descHtml = el.html() || '';
      if (descHtml.trim()) break;
    }
  }
  const desc$ = load(`<div id="r">${descHtml || ''}</div>`);
  // Coleta blocos preservando quebras de linha
  const descBlocks = desc$('#r p, #r li, #r div, #r br').map((_, el) => {
    const tag = el.tagName.toLowerCase();
    if (tag === 'br') return '\n';
    return desc$(el).text().trim();
  }).get();
  // Converte <br> em \n antes de extrair o texto
  desc$('br').replaceWith('\n');
  const rawText = desc$('#r').text();
  // Injeta quebras antes de tokens conhecidos (info-box + ficha técnica) quando aparecem inline
  const splitTokens = [
    'C[óo]digo', 'Peso', 'Altura', 'Largura', 'Profundidade', 'Marca', 'SKU',
    'Ficha\\s*T[éeè]cnica', 'Eixo\\s*(?:de\\s*)?Acionamento', 'Entrada', 'Sa[íi]da', 'Flange',
    'Litragem', 'Press[ãa]o', 'Rota[çc][ãa]o', 'Tipo\\s*de\\s*Acionamento', 'Tipo',
    'Aplica[çc][ãa]o', 'Instala[çc][ãa]o', 'Medida', 'Rosca', 'Material', 'Veda[çc][õoã]es?',
    'Fluido', 'Constru[çc][ãa]o', 'Temperatura', 'Di[âa]metro', 'Curso', 'Norma',
    'Vaz[ãa]o', 'Acoplamento', 'Sentido',
  ];
  const splitRe = new RegExp('\\s*\\b(' + splitTokens.join('|') + ')\\s*:', 'gi');
  const prepared = rawText
    .replace(splitRe, (m, token) => '\n' + token + ':')
    .replace(/[\r\n\u2028\u2029]+/g, '\n')
    .replace(/\n{2,}/g, '\n');
  const lines = prepared
    .split(/\n/)
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  // Separa "info box" (Código/Peso/Altura/Marca) das "especificações reais" (Ficha Técnica)
  const infoBoxKeys = /^(c[oó]digo|peso|altura|largura|profundidade|marca|sku)\s*:/i;
  const techKeywords = /ficha\s+t[eé]cnica|caracter[ií]sticas|especifica[çc][ãa]o|descri[çc][ãa]o/i;

  let marketingLines = [];
  let specLines = [];
  let fichaSeen = false;
  for (const line of lines) {
    if (techKeywords.test(line)) {
      fichaSeen = true;
      continue;
    }
    if (infoBoxKeys.test(line)) continue; // descarta info-box repetida
    if (/^[^:]{2,40}:\s*.{1,160}$/.test(line)) {
      specLines.push(line);
    } else if (fichaSeen && specLines.length > 0) {
      // depois que virou spec, para marketing; mas linhas curtas de bullets viram marketing
      if (line.length < 80) marketingLines.push(line);
    } else {
      marketingLines.push(line);
    }
  }

  // Parse specs
  const specs = [];
  const seenLabels = new Set();
  for (const line of specLines) {
    const m = line.match(/^([^:]{2,40}):\s*(.{1,160})$/);
    if (!m) continue;
    const label = m[1].trim().replace(/\s+/g, ' ');
    const value = m[2].trim().replace(/\s+/g, ' ');
    const key = label.toLowerCase();
    if (seenLabels.has(key)) continue;
    seenLabels.add(key);
    specs.push({ label, value });
    if (specs.length >= 15) break;
  }
  // Fallback: tabelas
  if (specs.length === 0) {
    $('table tr').each((_, tr) => {
      const tds = $(tr).find('td, th');
      if (tds.length >= 2) {
        const label = $(tds[0]).text().trim();
        const value = $(tds[1]).text().trim();
        if (label && value && specs.length < 15) specs.push({ label, value });
      }
    });
  }

  // Marketing: usa as linhas não-spec
  const fullDescription = marketingLines.join('\n').trim() || lines.join('\n').trim();
  const firstMarketingPara = marketingLines.find((l) => l.length > 30) || marketingLines[0] || '';
  const shortDesc =
    firstMarketingPara ||
    $('meta[property="og:description"]').attr('content') ||
    $('meta[name="description"]').attr('content') ||
    (lines[0] || '');

  // SKU / code: procurar "Code:" ou "SKU:" em textos próximos do título
  let code = '';
  const skuPatterns = [
    /C[oó]digo[:\s]+(\d{3,10})\b/i,
    /SKU[:\s]+(\d{3,10})\b/i,
    /Code[:\s]+(\d{3,10})\b/i,
  ];
  const bodyText = $('body').text();
  for (const re of skuPatterns) {
    const m = bodyText.match(re);
    if (m) {
      code = m[1].trim();
      break;
    }
  }
  if (!code) {
    const metaSku = $('meta[property="product:retailer_item_id"]').attr('content');
    if (metaSku) code = metaSku.trim();
  }

  // Imagens: cobrir múltiplos seletores da Nuvem Shop
  const imgUrls = new Set();
  const pushImg = (u) => {
    if (!u) return;
    // URLs relativas ao protocolo
    if (u.startsWith('//')) u = 'https:' + u;
    if (!/^https?:\/\//.test(u)) return;
    // Filtra placeholders, logos, sprites, assets de tema
    if (/empty-placeholder|placeholder|\/themes\/|\/assets\/|logo|icon|sprite|blank|1x1/i.test(u)) return;
    // Normalizar para versão 640px quando possível (Nuvem Shop aceita sufixos)
    u = u.replace(/-(\d+)-0\.(webp|jpg|jpeg|png)/i, '-640-0.$2');
    imgUrls.add(u);
  };

  $('[data-js-image], .swiper-slide img, .product-images img, .product-image img, [data-store="product-image"] img, .js-product-slide img').each((_, el) => {
    pushImg($(el).attr('data-src') || $(el).attr('src') || $(el).attr('data-image'));
  });
  // og:image como fallback
  if (imgUrls.size === 0) {
    const og = $('meta[property="og:image"]').attr('content');
    if (og) pushImg(og);
  }
  // links de alta resolução em atributos data-*
  $('a[data-image], a[data-src]').each((_, el) => pushImg($(el).attr('data-image') || $(el).attr('data-src')));

  // Filtra apenas CDN Nuvem Shop ou domínio próprio
  const images = [...imgUrls].filter((u) => /(mitiendanube\.com|tiendanube\.com|jftruck\.com\.br)/i.test(u));

  return {
    id: slug,
    url,
    name: name || slug,
    category: (category || 'Outros').trim(),
    code,
    description: (shortDesc || '').replace(/\s+/g, ' ').trim().slice(0, 240),
    fullDescription: (fullDescription || '').trim(),
    specifications: specs,
    imageUrls: images,
  };
}

/* -------- 3) scrape todos os produtos -------- */
async function scrapeAll(urls) {
  console.log('[2/4] Raspando páginas de produto...');
  const scraped = await readJsonIfExists(CHECK_SCRAPED, {});
  const failed = [];

  let i = 0;
  for (const url of urls) {
    i++;
    const slug = url.replace(/\/$/, '').split('/').pop();
    if (scraped[slug]) {
      if (i % 20 === 0) console.log(`      (${i}/${urls.length}) cache: ${slug}`);
      continue;
    }
    try {
      const html = await fetchText(url);
      const data = extractFromHtml(html, url);
      scraped[slug] = data;
      console.log(`      (${i}/${urls.length}) ok: ${slug} — ${data.imageUrls.length} img, ${data.specifications.length} specs`);
      // checkpoint a cada 10
      if (i % 10 === 0) {
        await writeFile(CHECK_SCRAPED, JSON.stringify(scraped, null, 2));
      }
      await sleep(jitter(400, 800));
    } catch (err) {
      console.log(`      (${i}/${urls.length}) FAIL: ${url} — ${err.message}`);
      failed.push(`${url} :: ${err.message}`);
    }
  }
  await writeFile(CHECK_SCRAPED, JSON.stringify(scraped, null, 2));
  if (failed.length > 0) {
    await writeFile(CHECK_FAILED, failed.join('\n'));
    console.log(`      ${failed.length} falhas registradas em tools/failed.txt`);
  }
  console.log(`      total raspado: ${Object.keys(scraped).length}`);
  return scraped;
}

/* -------- 4) baixar imagens -------- */
async function downloadAllImages(scraped) {
  console.log('[3/4] Baixando imagens...');
  const limit = createLimiter(6);
  const tasks = [];
  let total = 0;
  let skipped = 0;
  let ok = 0;
  let err = 0;

  const slugs = Object.keys(scraped);
  for (const slug of slugs) {
    const rec = scraped[slug];
    const urls = (rec.imageUrls || []).slice(0, 8); // até 8 imagens por produto
    rec.localImages = [];
    // Produtos sem imagens ganham placeholder
    if (urls.length === 0) {
      rec.localImages.push('/products/_placeholder.svg');
      continue;
    }
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const ext = (url.match(/\.(webp|jpg|jpeg|png)(\?|$)/i)?.[1] || 'webp').toLowerCase();
      const filename = `img-${i + 1}.${ext === 'jpeg' ? 'jpg' : ext}`;
      const destPath = join(PUBLIC_PRODUCTS, slug, filename);
      const publicPath = `/products/${slug}/${filename}`;
      rec.localImages.push(publicPath);
      total++;
      tasks.push(
        limit(async () => {
          try {
            const res = await downloadFile(url, destPath);
            if (res.skipped) skipped++;
            else ok++;
          } catch (e) {
            err++;
            console.log(`      img fail: ${url} — ${e.message}`);
          }
        })
      );
    }
  }
  await Promise.all(tasks);
  console.log(`      total: ${total} | baixadas: ${ok} | cache: ${skipped} | erros: ${err}`);
  await writeFile(CHECK_SCRAPED, JSON.stringify(scraped, null, 2));
  return scraped;
}

/* -------- 5) gerar productData.js -------- */
function esc(s) {
  return String(s ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function sanitizeCategory(raw) {
  if (!raw) return 'Acessórios';
  let c = raw.trim().replace(/\s+/g, ' ');

  // Consolidação ampla em 10 categorias canônicas
  const rules = [
    [/cilindro/i, 'Cilindros Hidráulicos'],
    [/bomba.*pist/i, 'Bomba de Pistão'],
    [/bomba|engrenagem/i, 'Bomba de Engrenagem'],
    [/kit\s*seguran|contran/i, 'Kit Segurança CONTRAN 859/2021'],
    [/kit|conjunto\s+hidr/i, 'Kit Hidráulico'],
    [/v[aá]lvula|comando/i, 'Válvula'],
    [/tomada\s*de\s*for/i, 'Tomada de Força'],
    [/engate/i, 'Engate Hidráulico'],
    [/mangueira/i, 'Mangueira'],
    [/filtro/i, 'Filtros'],
    [/reservat[oó]rio/i, 'Reservatório'],
    [/inclin[oó]metro/i, 'Acessórios'],
    [/acionamento|controle/i, 'Acessórios'],
    [/reparo|vedac|vedaç/i, 'Reparos e Vedações'],
    [/eixo|flange|pe[çc]a/i, 'Acessórios'],
  ];

  for (const [re, name] of rules) {
    if (re.test(c)) return name;
  }
  return 'Acessórios';
}

function generateProductDataFile(scraped) {
  console.log('[4/4] Gerando src/data/productData.js...');
  const items = Object.values(scraped).filter((r) => r.name && (r.localImages?.length || 0) > 0);

  // Pós-processo: relatedProductIds por categoria
  const byCategory = {};
  for (const p of items) {
    const cat = sanitizeCategory(p.category);
    (byCategory[cat] = byCategory[cat] || []).push(p.id);
  }
  for (const p of items) {
    const cat = sanitizeCategory(p.category);
    const siblings = (byCategory[cat] || []).filter((id) => id !== p.id);
    // Pega 3 aleatórios estáveis (shuffle determinístico)
    p._related = siblings.sort().slice(0, 3);
  }

  const lines = [];
  lines.push('export const productsData = [');
  for (const p of items) {
    const cat = sanitizeCategory(p.category);
    const waMsg = p.code
      ? `Olá! Tenho interesse no produto ${p.name} (SKU: ${p.code}). Pode me passar mais informações?`
      : `Olá! Tenho interesse no produto ${p.name}. Pode me passar mais informações?`;
    lines.push('  {');
    lines.push(`    id: '${esc(p.id)}',`);
    lines.push(`    name: '${esc(p.name)}',`);
    lines.push(`    category: '${esc(cat)}',`);
    if (p.code) lines.push(`    code: '${esc(p.code)}',`);
    lines.push(`    price: 'Consulte',`);
    lines.push(`    description: '${esc(p.description || p.name)}',`);
    lines.push(`    fullDescription: '${esc(p.fullDescription || p.description || p.name)}',`);
    // images
    lines.push('    images: [');
    for (const img of p.localImages) lines.push(`      '${img}',`);
    lines.push('    ],');
    // specs
    lines.push('    specifications: [');
    for (const s of p.specifications || []) {
      lines.push(`      { label: '${esc(s.label)}', value: '${esc(s.value)}' },`);
    }
    lines.push('    ],');
    // related
    lines.push('    relatedProductIds: [');
    for (const id of p._related) lines.push(`      '${esc(id)}',`);
    lines.push('    ],');
    lines.push(`    whatsappMessage: '${esc(waMsg)}'`);
    lines.push('  },');
  }
  lines.push('];');
  lines.push('');

  // Helpers preservados (com nova ordem de categorias)
  lines.push(`export const getProductById = (id) => {`);
  lines.push(`  return productsData.find(product => product.id === id);`);
  lines.push(`};`);
  lines.push('');
  lines.push(`export const getRelatedProducts = (productId) => {`);
  lines.push(`  const product = getProductById(productId);`);
  lines.push(`  if (!product) return [];`);
  lines.push(`  return product.relatedProductIds`);
  lines.push(`    .map(id => getProductById(id))`);
  lines.push(`    .filter(Boolean)`);
  lines.push(`    .slice(0, 3);`);
  lines.push(`};`);
  lines.push('');
  lines.push(`export const getProductsByCategory = (category) => {`);
  lines.push(`  return productsData.filter(product => product.category === category);`);
  lines.push(`};`);
  lines.push('');
  lines.push(`export const getUniqueCategories = () => {`);
  lines.push(`  const order = [`);
  const order = [
    'Kit Hidráulico',
    'Kit Segurança CONTRAN 859/2021',
    'Bomba de Engrenagem',
    'Bomba de Pistão',
    'Cilindros Hidráulicos',
    'Tomada de Força',
    'Válvula',
    'Engate Hidráulico',
    'Mangueira',
    'Filtros',
    'Reservatório',
    'Reparos e Vedações',
    'Acessórios',
  ];
  for (const c of order) lines.push(`    '${esc(c)}',`);
  lines.push(`  ];`);
  lines.push(`  const categories = [...new Set(productsData.map(p => p.category))];`);
  lines.push(`  return categories.sort((a, b) => {`);
  lines.push(`    const ia = order.indexOf(a);`);
  lines.push(`    const ib = order.indexOf(b);`);
  lines.push(`    if (ia !== -1 && ib !== -1) return ia - ib;`);
  lines.push(`    if (ia !== -1) return -1;`);
  lines.push(`    if (ib !== -1) return 1;`);
  lines.push(`    return a.localeCompare(b);`);
  lines.push(`  });`);
  lines.push(`};`);
  lines.push('');

  return lines.join('\n');
}

/* -------- main -------- */
(async () => {
  try {
    await mkdir(TOOLS, { recursive: true });
    await mkdir(PUBLIC_PRODUCTS, { recursive: true });

    const urls = await discoverUrls();
    const scraped = await scrapeAll(urls);
    const withImages = await downloadAllImages(scraped);
    const out = generateProductDataFile(withImages);
    await writeFile(OUT_DATA, out, 'utf-8');

    const items = Object.values(withImages).filter((r) => r.name && (r.localImages?.length || 0) > 0);
    const cats = new Set(items.map((i) => sanitizeCategory(i.category)));
    console.log('\n✅ Pronto!');
    console.log(`   Produtos: ${items.length}`);
    console.log(`   Categorias: ${cats.size} — ${[...cats].join(', ')}`);
    console.log(`   Arquivo: ${OUT_DATA}`);
  } catch (err) {
    console.error('ERRO FATAL:', err);
    process.exit(1);
  }
})();
