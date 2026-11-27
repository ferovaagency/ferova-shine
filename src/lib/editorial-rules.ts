/**
 * Reglas editoriales del blog (CLAUDE.md §3 y §4) como comprobaciones puras.
 *
 * Sin dependencias y sin DOM: recibe los campos del formulario y el idioma y
 * devuelve una lista de resultados { id, label, status, detail }. Las reglas
 * son orientativas: el editor las muestra en vivo, pero nunca bloquean el
 * guardado.
 */

export type EditorialLanguage = "es" | "en";
export type RuleStatus = "pass" | "warn" | "fail";

export interface EditorialRule {
  id: string;
  label: string;
  status: RuleStatus;
  detail: string;
}

export interface EditorialInput {
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  keyword: string;
  cover_image: string;
}

/** Rutas internas permitidas por idioma (CLAUDE.md §3, "Enlaces internos"). */
export const INTERNAL_ROUTES: Record<EditorialLanguage, readonly string[]> = {
  es: [
    "/seo-para-agencias",
    "/auditoria-seo-tecnica",
    "/migraciones-seo",
    "/servicios/seo-ecommerce",
    "/casos-de-exito",
    "/recursos",
    "/blog",
    "/sobre-nosotros",
    "/contacto",
  ],
  en: [
    "/en/white-label-seo-for-agencies",
    "/en/technical-seo-audit-services",
    "/en/seo-migration-services",
    "/en/services/ecommerce-seo",
    "/en/case-studies",
    "/en/resources",
    "/en/blog",
    "/en/about-me",
    "/en/contact",
  ],
};

export const LIMITS = {
  titleMax: 65,
  metaTitleMax: 60,
  metaDescriptionMin: 150,
  metaDescriptionMax: 160,
  wordsMin: 800,
  wordsMax: 3500,
  linksMin: 2,
  linksMax: 4,
  faqMin: 3,
  faqMax: 5,
  densityMax: 3,
  inlineImagesMax: 2,
} as const;

const FAQ_HEADING: Record<EditorialLanguage, string> = {
  es: "Preguntas frecuentes",
  en: "Frequently asked questions",
};

const SITE_HOSTS = ["seoparaecommerce.co", "www.seoparaecommerce.co"];

const STOPWORDS: Record<EditorialLanguage, ReadonlySet<string>> = {
  es: new Set(["de", "la", "el", "los", "las", "y", "e", "o", "u", "en", "para", "por", "con", "sin", "un", "una", "unos", "unas", "del", "al", "que", "como", "a", "su", "sus", "es", "lo", "se", "mas", "tu", "tus"]),
  en: new Set(["the", "a", "an", "of", "for", "and", "or", "to", "in", "on", "with", "how", "is", "are", "your", "you", "what", "why", "it", "its", "by", "at", "from"]),
};

/* ------------------------------------------------------------------ */
/* Utilidades de texto (regex, sin DOM)                                */
/* ------------------------------------------------------------------ */

const ENTITIES: Record<string, string> = { nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", "#39": "'" };

function decodeEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, code: string) => {
    const lower = code.toLowerCase();
    if (lower in ENTITIES) return ENTITIES[lower];
    if (lower.startsWith("#x")) return String.fromCodePoint(parseInt(lower.slice(2), 16) || 32);
    if (lower.startsWith("#")) return String.fromCodePoint(parseInt(lower.slice(1), 10) || 32);
    return match;
  });
}

/** HTML → texto plano. */
export function htmlToText(html: string): string {
  return decodeEntities(
    html
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/(p|div|li|h[1-6]|blockquote|tr|td|th)>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

/** Minúsculas, sin tildes y con espacios simples: para comparar keywords. */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export function words(text: string): string[] {
  return text.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word));
}

function containsPhrase(haystack: string, phrase: string): boolean {
  const h = ` ${normalize(haystack)} `;
  const p = normalize(phrase);
  return p.length > 0 && h.includes(` ${p} `);
}

function countPhrase(haystack: string, phrase: string): number {
  const h = ` ${normalize(haystack)} `;
  const p = normalize(phrase);
  if (!p) return 0;
  let count = 0;
  let from = 0;
  for (;;) {
    const at = h.indexOf(` ${p} `, from);
    if (at === -1) break;
    count += 1;
    from = at + p.length + 1;
  }
  return count;
}

interface Heading { level: number; text: string; index: number }

function extractHeadings(html: string): Heading[] {
  return [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: Number(m[1]),
    text: htmlToText(m[2] ?? ""),
    index: m.index ?? 0,
  }));
}

function extractHrefs(html: string): string[] {
  return [...html.matchAll(/<a\b[^>]*?\bhref\s*=\s*(["'])(.*?)\1/gi)].map((m) => decodeEntities(m[2] ?? "").trim());
}

/** Devuelve la ruta si el enlace es interno (relativo o al dominio del sitio). */
function internalPath(href: string): string | null {
  if (!href || href.startsWith("#") || /^(mailto|tel|javascript):/i.test(href)) return null;
  let path: string;
  if (/^https?:\/\//i.test(href) || href.startsWith("//")) {
    const match = href.match(/^(?:https?:)?\/\/([^/?#]+)([^?#]*)/i);
    if (!match || !SITE_HOSTS.includes(match[1].toLowerCase())) return null;
    path = match[2] || "/";
  } else if (href.startsWith("/")) {
    path = href.split(/[?#]/)[0];
  } else {
    return null;
  }
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

const fmtNumber = (value: number, lang: EditorialLanguage) => new Intl.NumberFormat(lang === "en" ? "en-US" : "es-CO", { maximumFractionDigits: 1 }).format(value);

const worst = (statuses: RuleStatus[]): RuleStatus => (statuses.includes("fail") ? "fail" : statuses.includes("warn") ? "warn" : "pass");

/* ------------------------------------------------------------------ */
/* Reglas                                                              */
/* ------------------------------------------------------------------ */

export function checkEditorialRules(input: EditorialInput, lang: EditorialLanguage): EditorialRule[] {
  const rules: EditorialRule[] = [];
  const keyword = input.keyword.trim();
  const hasKeyword = normalize(keyword).length > 0;
  const html = input.content ?? "";
  const text = htmlToText(html);
  const allWords = words(text);
  const wordCount = allWords.length;
  const hasContent = wordCount > 0;
  const headings = extractHeadings(html);
  const noKeyword = "Define la keyword para comprobarla.";
  const noContent = "Aún no hay contenido.";

  // 1. Título (H1)
  {
    const title = input.title.trim();
    const length = [...title].length;
    const statuses: RuleStatus[] = [];
    const notes: string[] = [`${length}/${LIMITS.titleMax} caracteres`];
    if (!title) statuses.push("fail");
    else if (length > LIMITS.titleMax) statuses.push("fail");
    if (!hasKeyword) { statuses.push("warn"); notes.push("sin keyword definida"); }
    else if (title && containsPhrase(title, keyword)) {
      notes.push(normalize(title).startsWith(normalize(keyword)) ? "keyword al inicio" : "contiene la keyword (mejor al inicio)");
    } else if (title) { statuses.push("warn"); notes.push("no contiene la keyword"); }
    rules.push({ id: "title", label: "Título (H1) ≤ 65 y con la keyword", status: title ? worst(statuses) : "fail", detail: title ? notes.join(" · ") : "Falta el título." });
  }

  // 2. Meta title
  {
    const meta = input.meta_title.trim();
    const length = [...meta].length;
    if (!meta) {
      const fallback = [...input.title.trim()].length;
      rules.push({ id: "meta_title", label: "Meta title ≤ 60", status: "warn", detail: `Vacío: se usará el título (${fallback}/${LIMITS.metaTitleMax}).` });
    } else {
      rules.push({ id: "meta_title", label: "Meta title ≤ 60", status: length > LIMITS.metaTitleMax ? "fail" : "pass", detail: `${length}/${LIMITS.metaTitleMax} caracteres${hasKeyword && !containsPhrase(meta, keyword) ? " · sin la keyword" : ""}` });
    }
  }

  // 3. Meta description
  {
    const meta = input.meta_description.trim();
    const length = [...meta].length;
    let status: RuleStatus = "pass";
    if (!meta || length < LIMITS.metaDescriptionMin) status = "warn";
    if (length > LIMITS.metaDescriptionMax) status = "fail";
    rules.push({ id: "meta_description", label: "Meta description 150–160", status, detail: meta ? `${length} caracteres (objetivo ${LIMITS.metaDescriptionMin}–${LIMITS.metaDescriptionMax})` : "Vacía: se usará el extracto." });
  }

  // 4. Slug
  {
    const slug = input.slug.trim();
    const segments = slug.split("-").filter(Boolean);
    const statuses: RuleStatus[] = [];
    const notes: string[] = [];
    if (!slug) { statuses.push("fail"); notes.push("Falta el slug."); }
    else {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) { statuses.push("fail"); notes.push("solo minúsculas, números y guiones"); }
      if (/(^|-)(19|20)\d{2}(-|$)/.test(slug) || /\d{4}-\d{2}(-\d{2})?/.test(slug)) { statuses.push("warn"); notes.push("contiene una fecha"); }
      const stop = segments.filter((segment) => STOPWORDS[lang].has(segment)).length;
      if (stop > 2 || (segments.length > 0 && stop / segments.length > 0.4)) { statuses.push("warn"); notes.push(`${stop} palabras vacías`); }
      if (slug.length > 75 || segments.length > 8) { statuses.push("warn"); notes.push("demasiado largo"); }
      if (hasKeyword) {
        const tokens = normalize(keyword).split(" ").filter((token) => token && !STOPWORDS[lang].has(token));
        const missing = tokens.filter((token) => !segments.includes(token));
        if (tokens.length && missing.length) { statuses.push("warn"); notes.push("no se basa en la keyword"); }
        else if (tokens.length) notes.push("basado en la keyword");
      }
      if (!notes.length) notes.push(`${segments.length} palabras, correcto`);
    }
    rules.push({ id: "slug", label: "Slug corto, minúsculas y guiones", status: worst(statuses), detail: `/${slug || "…"} · ${notes.join(" · ")}` });
  }

  // 5. Keyword en las primeras 100 palabras
  {
    let status: RuleStatus = "warn";
    let detail = noKeyword;
    if (hasKeyword && !hasContent) detail = noContent;
    else if (hasKeyword) {
      const found = containsPhrase(allWords.slice(0, 100).join(" "), keyword);
      status = found ? "pass" : "fail";
      detail = found ? "Aparece en las primeras 100 palabras." : "No aparece en las primeras 100 palabras.";
    }
    rules.push({ id: "keyword_intro", label: "Keyword en las primeras 100 palabras", status, detail });
  }

  // 6. Keyword en un H2
  {
    const h2 = headings.filter((h) => h.level === 2);
    let status: RuleStatus = "warn";
    let detail = noKeyword;
    if (hasKeyword && !h2.length) detail = "Aún no hay H2.";
    else if (hasKeyword) {
      const hits = h2.filter((h) => containsPhrase(h.text, keyword)).length;
      status = hits > 0 ? "pass" : "fail";
      detail = hits > 0 ? `En ${hits} de ${h2.length} H2.` : `Ningún H2 (de ${h2.length}) la contiene.`;
    }
    rules.push({ id: "keyword_h2", label: "Keyword en al menos un H2", status, detail });
  }

  // 7. Jerarquía de encabezados
  {
    const h1 = headings.filter((h) => h.level === 1).length;
    const h2 = headings.filter((h) => h.level === 2).length;
    const h3 = headings.filter((h) => h.level === 3).length;
    const deep = headings.filter((h) => h.level >= 4).length;
    const firstH2 = headings.findIndex((h) => h.level === 2);
    const firstH3 = headings.findIndex((h) => h.level === 3);
    const h3BeforeH2 = firstH3 !== -1 && (firstH2 === -1 || firstH3 < firstH2);
    const problems: string[] = [];
    if (h1) problems.push(`${h1} H1 en el cuerpo (el sitio ya pinta el H1)`);
    if (deep) problems.push(`${deep} ${deep === 1 ? "encabezado" : "encabezados"} H4–H6`);
    if (h3BeforeH2) problems.push("hay un H3 antes del primer H2");
    let status: RuleStatus = problems.length ? "fail" : "pass";
    if (!problems.length && !h2) { status = "warn"; problems.push(hasContent ? "sin H2 todavía" : noContent); }
    rules.push({ id: "headings", label: "Solo H2/H3, sin saltos de nivel", status, detail: problems.length ? problems.join(" · ") : `${h2} H2 · ${h3} H3` });
  }

  // 8. Extensión
  {
    let status: RuleStatus = "pass";
    let detail = `${fmtNumber(wordCount, lang)} palabras`;
    if (wordCount < LIMITS.wordsMin) { status = "warn"; detail += ` (mínimo ${fmtNumber(LIMITS.wordsMin, lang)} para un informativo)`; }
    else if (wordCount > LIMITS.wordsMax) { status = "warn"; detail += " (más que una guía pilar: considera dividirlo)"; }
    else detail += wordCount <= 1200 ? " · informativo" : wordCount <= 2000 ? " · autoridad" : " · guía pilar";
    rules.push({ id: "word_count", label: "Extensión (800+ palabras)", status, detail });
  }

  // 9. Enlaces internos
  {
    const allowedSet = new Set(INTERNAL_ROUTES[lang]);
    // Además de las rutas de la lista, valen los artículos del propio blog.
    const blogPrefix = lang === "en" ? "/en/blog/" : "/blog/";
    const allowed = { has: (path: string) => allowedSet.has(path) || (path.startsWith(blogPrefix) && path.length > blogPrefix.length) };
    const internal = extractHrefs(html).map(internalPath).filter((path): path is string => path !== null);
    const valid = internal.filter((path) => allowed.has(path));
    const invalid = [...new Set(internal.filter((path) => !allowed.has(path)))];
    let status: RuleStatus = valid.length >= LIMITS.linksMin && valid.length <= LIMITS.linksMax ? "pass" : "warn";
    const notes = [`${valid.length} válidos (objetivo ${LIMITS.linksMin}–${LIMITS.linksMax})`];
    if (invalid.length) {
      status = "fail";
      notes.push(`fuera de la lista: ${invalid.slice(0, 3).join(", ")}${invalid.length > 3 ? ` y ${invalid.length - 3} más` : ""}`);
    }
    rules.push({ id: "internal_links", label: "2–4 enlaces internos permitidos", status, detail: notes.join(" · ") });
  }

  // 10. FAQ
  {
    const expected = FAQ_HEADING[lang];
    const h2Index = headings.findIndex((h) => h.level === 2 && normalize(h.text) === normalize(expected) && h.text.trim().replace(/[:.]$/, "") === expected);
    const looseIndex = headings.findIndex((h) => h.level === 2 && /preguntas frecuentes|frequently asked|^faqs?$/i.test(h.text.trim()));
    const at = h2Index !== -1 ? h2Index : looseIndex;
    let status: RuleStatus = "fail";
    let detail = `Falta un H2 "${expected}" con 3–5 preguntas en H3.`;
    if (at !== -1) {
      const after = headings.slice(at + 1);
      const end = after.findIndex((h) => h.level <= 2);
      const questions = (end === -1 ? after : after.slice(0, end)).filter((h) => h.level === 3 && h.text).length;
      status = questions >= LIMITS.faqMin && questions <= LIMITS.faqMax ? "pass" : "warn";
      detail = `${questions} preguntas en H3 (objetivo ${LIMITS.faqMin}–${LIMITS.faqMax})`;
      if (h2Index === -1) { status = "warn"; detail += ` · renombra el H2 a "${expected}" exacto`; }
    }
    rules.push({ id: "faq", label: `FAQ: H2 "${expected}"`, status, detail });
  }

  // 11. Portada
  rules.push({ id: "cover", label: "Imagen de portada", status: input.cover_image.trim() ? "pass" : "fail", detail: input.cover_image.trim() ? "Cargada." : "Falta la imagen de portada." });

  // 12. Imágenes con alt
  {
    const images = html.match(/<img\b[^>]*>/gi) ?? [];
    const missing = images.filter((tag) => {
      const alt = tag.match(/\balt\s*=\s*(["'])([\s\S]*?)\1/i);
      return !alt || !decodeEntities(alt[2] ?? "").trim();
    }).length;
    let status: RuleStatus = missing ? "fail" : "pass";
    const notes = [images.length ? `${images.length - missing}/${images.length} con alt` : "Sin imágenes en el texto"];
    if (images.length > LIMITS.inlineImagesMax) { status = status === "fail" ? "fail" : "warn"; notes.push(`máximo ${LIMITS.inlineImagesMax} dentro del texto`); }
    rules.push({ id: "img_alt", label: "Imágenes con texto alternativo", status, detail: notes.join(" · ") });
  }

  // 13. Densidad de keyword
  {
    let status: RuleStatus = "warn";
    let detail = noKeyword;
    if (hasKeyword && !hasContent) detail = noContent;
    else if (hasKeyword) {
      const hits = countPhrase(text, keyword);
      const density = (hits / wordCount) * 100;
      status = hits === 0 ? "warn" : density > LIMITS.densityMax ? "warn" : "pass";
      detail = `${fmtNumber(density, lang)} % (${hits} ${hits === 1 ? "vez" : "veces"} en ${fmtNumber(wordCount, lang)} palabras; máx. ${LIMITS.densityMax} %)`;
    }
    rules.push({ id: "density", label: "Densidad de keyword ≤ 3 %", status, detail });
  }

  return rules;
}

export function summarizeRules(rules: EditorialRule[]): Record<RuleStatus, number> {
  return rules.reduce<Record<RuleStatus, number>>((acc, rule) => { acc[rule.status] += 1; return acc; }, { pass: 0, warn: 0, fail: 0 });
}
