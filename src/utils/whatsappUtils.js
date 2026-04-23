/**
 * Generates a WhatsApp link with pre-filled message
 */
export const generateWhatsAppLink = (phoneNumber, message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

/**
 * Opens WhatsApp with pre-filled message in a new window
 */
export const openWhatsApp = (phoneNumber, message) => {
  const link = generateWhatsAppLink(phoneNumber, message);
  window.open(link, '_blank');
};

// Default company phone number
export const COMPANY_PHONE = '5519974194374';

/**
 * Opens WhatsApp with company number and custom message
 * (kept for backwards compatibility; prefer useWhatsAppLead().open())
 */
export const contactCompany = (message) => {
  openWhatsApp(COMPANY_PHONE, message);
};

/* -------------------- UTM capture & persistence -------------------- */
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
const STORAGE_KEY = 'jf_utms';

export const captureUTMs = () => {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const fresh = {};
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) fresh[k] = v;
    });
    if (Object.keys(fresh).length > 0) {
      fresh._referrer = document.referrer || '';
      fresh._landing = window.location.pathname + window.location.search;
      fresh._capturedAt = new Date().toISOString();
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    }
  } catch {
    // sessionStorage may be unavailable (privacy mode) — fail silently
  }
};

export const getUTMs = () => {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  // Fallback: try reading directly from URL
  try {
    const params = new URLSearchParams(window.location.search);
    const live = {};
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) live[k] = v;
    });
    if (Object.keys(live).length > 0) {
      live._referrer = document.referrer || '';
      return live;
    }
  } catch {}
  return { _referrer: (typeof document !== 'undefined' && document.referrer) || '' };
};

/* -------------------- Protocolo único -------------------- */
export const generateProtocol = () => {
  const now = new Date();
  const ymd =
    String(now.getFullYear()).slice(-2) +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `JF-${ymd}-${rand}`;
};

/* -------------------- Telefone — máscara BR -------------------- */
/**
 * Formata progressivamente para `55 (XX) XXXXX-XXXX`.
 * Se o usuário digitar só 10/11 dígitos (DDD + número), adiciona 55 automaticamente.
 */
export const formatPhoneBR = (raw) => {
  let digits = String(raw || '').replace(/\D/g, '');
  if (digits.length === 0) return '';

  // Se começa com 55 e total > 11 dígitos, assume já tem DDI
  if (digits.length > 11 && !digits.startsWith('55')) {
    digits = '55' + digits;
  }
  // Se tem até 11 dígitos e não começa com 55, assume que precisa de DDI
  if (digits.length <= 11 && !digits.startsWith('55')) {
    digits = '55' + digits;
  }
  // Corta em 13 dígitos (55 + DDD + 9 dígitos)
  digits = digits.slice(0, 13);

  const country = digits.slice(0, 2);
  const ddd = digits.slice(2, 4);
  const p1 = digits.slice(4, 9);
  const p2 = digits.slice(9, 13);

  let out = country;
  if (ddd) {
    out += ` (${ddd}`;
    if (ddd.length === 2) out += ')';
  }
  if (p1) out += ` ${p1}`;
  if (p2) out += `-${p2}`;
  return out;
};

export const isValidPhoneBR = (formatted) => {
  const digits = String(formatted || '').replace(/\D/g, '');
  // 55 + DDD (2) + número (8 ou 9 dígitos) → total entre 12 e 13
  return digits.length >= 12 && digits.length <= 13;
};

/* -------------------- Origem legível -------------------- */
const describeOrigin = (utms) => {
  if (!utms) return 'Acesso direto';
  if (utms.utm_source) {
    let base = utms.utm_source;
    if (utms.utm_medium) base += ` / ${utms.utm_medium}`;
    return base;
  }
  if (utms.gclid) return 'Google Ads';
  if (utms.fbclid) return 'Facebook / Instagram Ads';
  if (utms._referrer) {
    try {
      const host = new URL(utms._referrer).hostname;
      if (host && !host.includes('jftruck.com.br') && !host.includes('localhost')) return host;
    } catch {}
  }
  return 'Acesso direto';
};

/* -------------------- Monta mensagem do lead -------------------- */
/**
 * Formato:
 *   Olá eu sou o {nome}
 *   Nome da empresa: {empresa ou "Pessoa física"}
 *   Cidade: {cidade}
 *   Vim do {origem}
 *   KW: {utm_term}
 *   Ad: {utm_campaign}
 *   Protocolo: {código} - não apague esta mensagem ...
 *
 *   Mensagem: {productMessage ou padrão}
 */
export const buildLeadMessage = ({
  name,
  entityType, // 'pf' | 'pj'
  company,
  city,
  productMessage,
  utms = {},
  protocol,
}) => {
  const empresa = entityType === 'pj' ? (company || '-').trim() : 'Pessoa física';
  const cidade = (city || '').trim() || '-';
  const origem = describeOrigin(utms);
  const kw = (utms.utm_term || '').trim() || '-';
  const ad = (utms.utm_campaign || '').trim() || '-';
  const mensagem = (productMessage || '').trim() || 'Olá gostaria de solicitar um orçamento.';
  const pct = protocol || generateProtocol();

  return [
    `Olá eu sou o ${name}`,
    `Nome da empresa: ${empresa}`,
    `Cidade: ${cidade}`,
    `Vim do ${origem}`,
    `KW: ${kw}`,
    `Ad: ${ad}`,
    `Protocolo: ${pct} - não apague esta mensagem é importante para agilizarmos o seu atendimento`,
    '',
    `Mensagem: ${mensagem}`,
  ].join('\n');
};
