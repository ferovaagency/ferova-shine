/**
 * Descubrimiento de contenido dinámico para el prerender (build).
 *
 * Regla de oro de este archivo: **fallar ruidosamente**. Un build que termina
 * bien pero deja el sitio sin HTML indexable para el blog es peor que un build
 * roto: nadie se entera hasta que Search Console reporta 0 clics. Antes, si la
 * consulta a Supabase devolvía 400 (o RLS devolvía lista vacía), el build
 * seguía y publicaba un sitio sin artículos. Ahora lanza y corta el build.
 *
 * Puerta de escape: `PRERENDER_ALLOW_EMPTY_CONTENT=1` (solo para builds locales
 * sin acceso a Supabase). NO se debe usar en Vercel.
 */
import { setPrerenderPost, type PrerenderPost } from "./lib/prerender-store";

/** Slugs estáticos de casos de éxito (viven en data/pricing.ts, no en Supabase). */
export const CASO_IDS = [
  "google-ads-arcos-desinfeccion",
  "ecommerce-cableado-estructurado",
  "ecommerce-mascotas",
  "cliente-tecnologia-migracion-web-app",
];

/**
 * Rutas reales por idioma. Solo se listan las que EXISTEN como ruta renderizable
 * en src/App.tsx. `/pt/blog/:slug` está declarada como <Navigate> a `/blog`
 * (App.tsx:223), así que prerenderizarla generaría HTML de una redirección.
 */
const BLOG_PATHS: Record<string, (slug: string) => string> = {
  es: (s) => `/blog/${s}`,
  en: (s) => `/en/blog/${s}`,
};

const CASE_PATHS: ((slug: string) => string)[] = [
  (s) => `/casos-de-exito/${s}`,
  (s) => `/en/case-studies/${s}`,
  (s) => `/pt/casos-de-sucesso/${s}`,
];

const EDITION_PATHS: ((slug: string) => string)[] = [
  (s) => `/newsletter/edicion/${s}`,
  (s) => `/en/newsletter/edition/${s}`,
  (s) => `/pt/newsletter/edicao/${s}`,
];

interface BlogRow extends PrerenderPost {
  slug: string;
  language: string;
}

const allowEmpty = () =>
  (import.meta.env.PRERENDER_ALLOW_EMPTY_CONTENT as string | undefined) === "1" ||
  (typeof process !== "undefined" && process.env?.PRERENDER_ALLOW_EMPTY_CONTENT === "1");

function fail(message: string): never {
  throw new Error(`[prerender] ${message}`);
}

async function getJson<T>(url: string, headers: Record<string, string>, what: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, { headers });
  } catch (err) {
    return fail(`no se pudo consultar ${what}: ${(err as Error).message}\n  URL: ${url}`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return fail(`${what} devolvió HTTP ${res.status}: ${body.slice(0, 500)}\n  URL: ${url}`);
  }
  return (await res.json()) as T;
}

let cache: string[] | null = null;

/**
 * Devuelve todas las rutas dinámicas a prerenderizar y deja los posts cargados
 * en el store SSR para que BlogPost renderice el artículo real (y no un spinner).
 */
export async function fetchDynamicSlugs(): Promise<string[]> {
  if (cache) return cache;

  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
  const routes: string[] = [];

  if (!url || !key) {
    if (!allowEmpty()) {
      fail(
        "faltan VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY en el entorno de build. " +
          "Sin ellas no se puede descubrir el contenido dinámico y el sitio se publicaría sin blog indexable.",
      );
    }
    console.warn("[prerender] sin credenciales de Supabase y PRERENDER_ALLOW_EMPTY_CONTENT=1: solo rutas estáticas.");
  } else {
    const headers = { apikey: key, Authorization: `Bearer ${key}` };
    const now = new Date().toISOString();

    // blog_posts NO tiene columna `status`: se publica con active=true y
    // published_at <= now (mismo filtro que src/pages/Blog.tsx).
    const blogUrl =
      `${url}/rest/v1/blog_posts` +
      `?select=slug,language,title,author,category,content,created_at,meta_title,meta_description` +
      `&active=eq.true&published_at=lte.${now}`;

    const [posts, editions, cases] = await Promise.all([
      getJson<BlogRow[]>(blogUrl, headers, "blog_posts"),
      getJson<{ slug: string }[]>(`${url}/rest/v1/newsletter_editions_public?select=slug`, headers, "newsletter_editions_public"),
      getJson<{ slug: string }[]>(`${url}/rest/v1/case_studies_public?select=slug`, headers, "case_studies_public"),
    ]);

    if (!posts.length && !allowEmpty()) {
      fail(
        `blog_posts devolvió 0 filas publicadas (HTTP 200). Puede ser RLS bloqueando al rol anon ` +
          `o que no haya posts con active=true y published_at <= ${now}. ` +
          `Publicar así deja el blog entero sin HTML indexable.`,
      );
    }

    const skippedLangs = new Set<string>();
    for (const post of posts) {
      const lang = (post.language || "es").toLowerCase();
      const toPath = BLOG_PATHS[lang];
      if (!toPath) {
        // p. ej. `pt`: existe la fila pero /pt/blog/:slug es una redirección.
        skippedLangs.add(lang);
        continue;
      }
      routes.push(toPath(post.slug));
      setPrerenderPost(lang, post.slug, {
        title: post.title,
        author: post.author,
        category: post.category,
        content: post.content,
        created_at: post.created_at,
        meta_title: post.meta_title,
        meta_description: post.meta_description,
      });
    }
    if (skippedLangs.size) {
      console.warn(
        `[prerender] idiomas sin ruta propia, no prerenderizados: ${[...skippedLangs].join(", ")}`,
      );
    }

    cases.forEach((c) => CASE_PATHS.forEach((p) => routes.push(p(c.slug))));
    editions.forEach((e) => EDITION_PATHS.forEach((p) => routes.push(p(e.slug))));

    console.log(
      `[prerender] contenido dinámico: ${posts.length} posts, ${cases.length} casos, ${editions.length} ediciones ` +
        `→ ${routes.length} rutas.`,
    );
  }

  CASO_IDS.forEach((id) => CASE_PATHS.forEach((p) => routes.push(p(id))));

  cache = [...new Set(routes)];
  return cache;
}
