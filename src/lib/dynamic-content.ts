/**
 * Contenido dinámico de build (blog, casos, ediciones) — fuente ÚNICA.
 *
 * La consulta vivía duplicada en src/prerender.tsx y en scripts/generate-sitemap.ts.
 * Dos copias del mismo filtro es cómo se llega a que el prerender y el sitemap
 * discrepen (que es justo lo que pasó: el sitemap listaba 45 URLs de /blog y
 * ninguna de /en/blog). Ahora las dos llaman aquí.
 *
 * Este módulo NO lee `import.meta.env` a propósito: `scripts/generate-sitemap.ts`
 * se ejecuta desde vite.config, donde ese objeto no existe. Las credenciales
 * entran por parámetro.
 *
 * Regla: **falla ruidosamente**. Un build que termina bien pero deja el sitio sin
 * artículos indexables es peor que un build roto: nadie se entera hasta que
 * Search Console reporta 0 clics.
 */

import {
  BLOG_I18N_COLUMNS,
  hasEnglishVariant,
  hasHtmlInTextFields,
  pickVariant,
  type BlogRowI18n,
} from "./blog-i18n";

export interface BlogPostRow extends BlogRowI18n {
  slug: string;
  language: string;
  author: string;
  category: string;
  created_at: string;
}

/** Una variante publicable: idioma + ruta real + los campos ya saneados. */
export interface BlogVariant {
  lang: "es" | "en";
  slug: string;
  path: string;
  title: string;
  content: string;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  author: string;
  category: string;
  created_at: string;
  /** Rutas hermanas del mismo artículo (mismo slug, otra traducción). */
  alternates: Partial<Record<"es" | "en", string>>;
}

export interface DynamicContent {
  posts: BlogPostRow[];
  cases: { slug: string }[];
  editions: { slug: string }[];
  /** Idiomas presentes en blog_posts que no tienen ruta propia (p. ej. `pt`). */
  skippedLanguages: string[];
}

/** Slugs estáticos de casos de éxito (viven en data/pricing.ts, no en Supabase). */
export const CASO_IDS = [
  "google-ads-arcos-desinfeccion",
  "ecommerce-cableado-estructurado",
  "ecommerce-mascotas",
  "cliente-tecnologia-migracion-web-app",
];

/**
 * Rutas REALES por idioma. Solo se listan las que existen como ruta renderizable
 * en src/App.tsx. `/pt/blog/:slug` está declarada como <Navigate> a `/blog`
 * (App.tsx:223): ni se prerenderiza ni entra al sitemap.
 */
export const BLOG_PATHS: Record<string, (slug: string) => string> = {
  es: (s) => `/blog/${s}`,
  en: (s) => `/en/blog/${s}`,
};

export const CASE_PATHS: Record<string, (slug: string) => string> = {
  es: (s) => `/casos-de-exito/${s}`,
  en: (s) => `/en/case-studies/${s}`,
  pt: (s) => `/pt/casos-de-sucesso/${s}`,
};

export const EDITION_PATHS: Record<string, (slug: string) => string> = {
  es: (s) => `/newsletter/edicion/${s}`,
  en: (s) => `/en/newsletter/edition/${s}`,
  pt: (s) => `/pt/newsletter/edicao/${s}`,
};

/**
 * Puerta de escape para builds locales sin acceso a Supabase. Se lee vía
 * `globalThis.process` a propósito: en el bundle del prerender, Vite reemplaza
 * `process.env.X` de forma estática y la variable nunca llegaría.
 */
export function allowEmptyContent(): boolean {
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  return proc?.env?.PRERENDER_ALLOW_EMPTY_CONTENT === "1";
}

function fail(scope: string, message: string): never {
  throw new Error(`[${scope}] ${message}`);
}

async function getJson<T>(
  url: string,
  headers: Record<string, string>,
  what: string,
  scope: string,
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, { headers });
  } catch (err) {
    return fail(scope, `no se pudo consultar ${what}: ${(err as Error).message}\n  URL: ${url}`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return fail(scope, `${what} devolvió HTTP ${res.status}: ${body.slice(0, 500)}\n  URL: ${url}`);
  }
  return (await res.json()) as T;
}

/**
 * Trae el contenido publicado. Lanza si faltan credenciales, si cualquier
 * consulta responde distinto de 200, o si `blog_posts` devuelve cero filas.
 * `PRERENDER_ALLOW_EMPTY_CONTENT=1` degrada esos tres casos a warning — solo
 * para builds locales sin acceso a Supabase, NUNCA en Vercel.
 */
export async function fetchDynamicContent(
  supabaseUrl: string | undefined,
  supabaseKey: string | undefined,
  scope: string,
): Promise<DynamicContent> {
  const empty: DynamicContent = { posts: [], cases: [], editions: [], skippedLanguages: [] };

  if (!supabaseUrl || !supabaseKey) {
    if (!allowEmptyContent()) {
      fail(
        scope,
        "faltan VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY en el entorno de build. " +
          "Sin ellas el sitio se publicaría sin blog indexable.",
      );
    }
    console.warn(`[${scope}] sin credenciales y PRERENDER_ALLOW_EMPTY_CONTENT=1: solo contenido estático.`);
    return empty;
  }

  const headers = { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` };
  const now = new Date().toISOString();

  // blog_posts NO tiene columna `status`: se publica con active=true y
  // published_at <= now (mismo filtro que src/pages/Blog.tsx).
  const blogUrl =
    `${supabaseUrl}/rest/v1/blog_posts` +
    `?select=slug,language,author,category,created_at,${BLOG_I18N_COLUMNS}` +
    `&active=eq.true&published_at=lte.${now}`;

  let posts: BlogPostRow[];
  let editions: { slug: string }[];
  let cases: { slug: string }[];
  try {
    [posts, editions, cases] = await Promise.all([
      getJson<BlogPostRow[]>(blogUrl, headers, "blog_posts", scope),
      getJson<{ slug: string }[]>(`${supabaseUrl}/rest/v1/newsletter_editions_public?select=slug`, headers, "newsletter_editions_public", scope),
      getJson<{ slug: string }[]>(`${supabaseUrl}/rest/v1/case_studies_public?select=slug`, headers, "case_studies_public", scope),
    ]);
  } catch (err) {
    // La puerta de escape existe para trabajar sin acceso a Supabase, así que
    // también cubre el fallo de red o el HTTP != 200. En Vercel va apagada.
    if (!allowEmptyContent()) throw err;
    console.warn(`[${scope}] PRERENDER_ALLOW_EMPTY_CONTENT=1, sigo sin contenido dinámico: ${(err as Error).message}`);
    return empty;
  }

  if (!posts.length) {
    if (!allowEmptyContent()) {
      fail(
        scope,
        `blog_posts devolvió 0 filas publicadas (HTTP 200). Puede ser RLS bloqueando al rol anon ` +
          `o que no haya posts con active=true y published_at <= ${now}. ` +
          `Publicar así deja el blog entero sin HTML indexable y fuera del sitemap.\n  URL: ${blogUrl}`,
      );
    }
    console.warn(`[${scope}] blog_posts devolvió 0 filas y PRERENDER_ALLOW_EMPTY_CONTENT=1: sigo sin artículos.`);
  }

  const skipped = new Set<string>();
  const usable: BlogPostRow[] = [];
  for (const post of posts) {
    const lang = (post.language || "es").toLowerCase();
    if (BLOG_PATHS[lang]) usable.push({ ...post, language: lang });
    else skipped.add(lang);
  }

  return { posts: usable, cases, editions, skippedLanguages: [...skipped] };
}

/**
 * Convierte las filas en variantes publicables.
 *
 * ⚠️ La variante inglesa NO sale de filtrar `language='en'` — no existe ninguna
 * fila así: sale de que las columnas _en de la MISMA fila traigan contenido.
 * El portugués queda fuera aunque la fila lo tenga: `/pt/blog/:slug` es un
 * <Navigate> a /blog (App.tsx:223), y no se lista lo que es una redirección.
 *
 * Avisa (no rompe) de cuántos artículos se quedan sin inglés y de cuántas filas
 * traían HTML en campos de texto.
 */
export function buildBlogVariants(posts: BlogPostRow[], scope: string): BlogVariant[] {
  const variants: BlogVariant[] = [];
  const sinIngles: string[] = [];
  let conHtml = 0;

  for (const row of posts) {
    if (hasHtmlInTextFields(row)) conHtml++;

    const baseLang = (row.language || "es").toLowerCase() === "en" ? "en" : "es";
    const english = baseLang === "es" && hasEnglishVariant(row);

    const alternates: Partial<Record<"es" | "en", string>> = {};
    alternates[baseLang] = BLOG_PATHS[baseLang](row.slug);
    if (english) alternates.en = BLOG_PATHS.en(row.slug);

    const base = pickVariant(row, "es")!; // columnas base de la fila
    variants.push({
      lang: baseLang,
      slug: row.slug,
      path: BLOG_PATHS[baseLang](row.slug),
      ...base,
      author: row.author,
      category: row.category,
      created_at: row.created_at,
      alternates,
    });

    if (english) {
      const en = pickVariant(row, "en")!;
      variants.push({
        lang: "en",
        slug: row.slug,
        path: BLOG_PATHS.en(row.slug),
        ...en,
        author: row.author,
        category: row.category,
        created_at: row.created_at,
        alternates,
      });
    } else if (baseLang === "es") {
      sinIngles.push(row.slug);
    }
  }

  if (sinIngles.length) {
    console.warn(
      `[${scope}] ${sinIngles.length} de ${posts.length} artículos sin variante inglesa ` +
        `(columnas _en vacías): ${sinIngles.join(", ")}`,
    );
  }
  if (conHtml) {
    console.warn(
      `[${scope}] ${conHtml} filas traían HTML en campos de texto (title/meta/excerpt); ` +
        `se saneó al usarlas. La base NO se modifica.`,
    );
  }
  console.log(
    `[${scope}] variantes de blog: ${variants.filter((v) => v.lang === "es").length} es, ` +
      `${variants.filter((v) => v.lang === "en").length} en.`,
  );

  return variants;
}
