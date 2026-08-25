/**
 * Traducciones de blog_posts — modelo real de la tabla.
 *
 * ⚠️ NO hay una fila por idioma. Hay UNA fila por artículo, con `language = 'es'`,
 * y las traducciones viven en columnas sufijadas de la misma fila:
 *   title_en / excerpt_en / content_en / meta_title_en / meta_description_en
 *   title_pt / … (idem)
 * Verificado contra src/integrations/supabase/types.ts (Row de blog_posts) y
 * contra los datos reales: 43 filas, las 43 con language='es', 39 con las
 * columnas _en pobladas.
 *
 * Consecuencia: la variante inglesa de un artículo NO se descubre filtrando por
 * `language`, sino mirando si las columnas _en traen contenido.
 */

export interface BlogRowI18n {
  title: string;
  content: string;
  excerpt?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  title_en?: string | null;
  content_en?: string | null;
  excerpt_en?: string | null;
  meta_title_en?: string | null;
  meta_description_en?: string | null;
}

export interface BlogVariant {
  title: string;
  content: string;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
};

/**
 * Deja texto plano: quita etiquetas, decodifica las entidades más comunes y
 * colapsa espacios. Necesario porque hay filas con el texto envuelto en HTML
 * (p. ej. `title_en = "<p>Ecommerce SEO Expert…</p>"`). Sin esto, ese `<p>`
 * acabaría literal dentro del <title> y en el resultado de Google.
 *
 * Es saneo de LECTURA: no se toca la base. La limpieza de datos es otra decisión.
 */
export function decodeEntities(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&[a-zA-Z]+;/g, (m) => ENTITIES[m] ?? m);
}

export function stripHtml(value: string | null | undefined): string {
  if (!value) return "";
  return decodeEntities(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

/** ¿La fila trae HTML en algún campo que se usa como texto plano? */
export function hasHtmlInTextFields(row: BlogRowI18n): boolean {
  const fields = [
    row.title,
    row.meta_title,
    row.meta_description,
    row.excerpt,
    row.title_en,
    row.meta_title_en,
    row.meta_description_en,
    row.excerpt_en,
  ];
  return fields.some((f) => typeof f === "string" && /<[^>]+>/.test(f));
}

/** Hay variante inglesa solo si título y cuerpo en inglés traen contenido real. */
export function hasEnglishVariant(row: BlogRowI18n): boolean {
  return stripHtml(row.title_en).length > 0 && (row.content_en ?? "").trim().length > 0;
}

/**
 * Devuelve los campos del idioma pedido, con los textos saneados.
 * `content` NO se sanea: es el cuerpo del artículo y va como HTML a propósito.
 * Devuelve null si ese idioma no existe para la fila.
 */
export function pickVariant(row: BlogRowI18n, lang: "es" | "en"): BlogVariant | null {
  if (lang === "en") {
    if (!hasEnglishVariant(row)) return null;
    return {
      title: stripHtml(row.title_en),
      content: row.content_en as string,
      excerpt: stripHtml(row.excerpt_en) || null,
      meta_title: stripHtml(row.meta_title_en) || null,
      meta_description: stripHtml(row.meta_description_en) || null,
    };
  }
  return {
    title: stripHtml(row.title) || row.title,
    content: row.content,
    excerpt: stripHtml(row.excerpt) || null,
    meta_title: stripHtml(row.meta_title) || null,
    meta_description: stripHtml(row.meta_description) || null,
  };
}

/** Columnas que hay que pedirle al REST para poder armar las tres variantes. */
export const BLOG_I18N_COLUMNS =
  "title,content,excerpt,meta_title,meta_description," +
  "title_en,content_en,excerpt_en,meta_title_en,meta_description_en";
