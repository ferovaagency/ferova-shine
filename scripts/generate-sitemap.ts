/**
 * ============================================================================
 *  scripts/generate-sitemap.ts
 * ============================================================================
 *  Genera public/sitemap.xml desde el registro central (src/config/routes.ts).
 *  Se ejecuta dentro de `vite build` vía el plugin `seoBuildPlugin`
 *  (vite.config.ts) — sin runner de TS ni dependencias nuevas.
 *
 *  Reemplaza el sitemap.xml mantenido a mano, que estaba incompleto (faltaban
 *  /servicios, /precios, /contacto, /blog, casi todos los /en y /pt, newsletter,
 *  herramientas…).
 *
 *  Incluye contenido DINÁMICO (blog + ediciones + casos de Supabase) leído con
 *  la MISMA consulta que el prerender: src/lib/dynamic-content.ts.
 *
 *  ⚠️ Ya NO es best-effort. Antes, si la consulta fallaba o RLS devolvía lista
 *  vacía, el sitemap salía solo-estático y el build terminaba con exit 0: así se
 *  publicó un sitemap de 45 URLs de /blog, ninguna de /en/blog, mientras Search
 *  Console marcaba 40 artículos como "Descubierta, actualmente sin indexar".
 *  Ahora el build se cae con el detalle del fallo.
 * ============================================================================
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  ROUTES,
  LANGS,
  SITE_ORIGINS,
  priorityOf,
  changefreqOf,
  type Lang,
} from "../src/config/routes";
import {
  fetchDynamicContent,
  buildBlogVariants,
  CASE_PATHS,
  EDITION_PATHS,
  CASO_IDS,
} from "../src/lib/dynamic-content";

/** hreflang codes emitidos en el sitemap (coinciden con SEO.tsx). */
const HREFLANG: Record<Lang, string> = { es: "es", en: "en", pt: "pt" };

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function langFromPath(path: string): Lang {
  return path === "/en" || path.startsWith("/en/") ? "en" : "es";
}

function abs(path: string, lang: Lang = langFromPath(path)): string {
  return `${SITE_ORIGINS[lang]}${path.startsWith("/") ? path : "/" + path}`;
}

interface UrlEntry {
  loc: string;
  alternates?: Partial<Record<Lang, string>>;
  priority: number;
  changefreq: string;
}

function renderUrl(e: UrlEntry): string {
  const lines: string[] = [`  <url>`, `    <loc>${xmlEscape(abs(e.loc))}</loc>`];
  if (e.alternates) {
    for (const l of LANGS) {
      const alternate = e.alternates[l];
      if (!alternate) continue;
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="${HREFLANG[l]}" href="${xmlEscape(
          abs(alternate, l),
        )}"/>`,
      );
    }
    if (e.alternates.es) {
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(
          abs(e.alternates.es, "es"),
        )}"/>`,
      );
    }
  }
  lines.push(`    <changefreq>${e.changefreq}</changefreq>`);
  lines.push(`    <priority>${e.priority.toFixed(1)}</priority>`);
  lines.push(`  </url>`);
  return lines.join("\n");
}

/**
 * Solo se listan variantes en los idiomas de `LANGS` (es, en). El portugués es
 * legado declarado fuera del SEO en src/config/routes.ts, así que no entra al
 * sitemap ni siquiera cuando la ruta existe.
 */
const SITEMAP_LANGS = LANGS.filter((l) => l !== "pt");

/** Alternates solo con los idiomas que existen de verdad para ese contenido. */
function altsFrom(paths: Record<string, (s: string) => string>, slug: string) {
  const out: Partial<Record<Lang, string>> = {};
  for (const l of SITEMAP_LANGS) {
    const build = paths[l];
    if (build) out[l] = build(slug);
  }
  return out;
}

async function fetchDynamic(supabaseUrl?: string, supabaseKey?: string): Promise<UrlEntry[]> {
  const url = supabaseUrl || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    supabaseKey ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY;

  const { posts, cases, editions, skippedLanguages } = await fetchDynamicContent(url, key, "sitemap");
  const entries: UrlEntry[] = [];

  // Blog: una fila por artículo con sus traducciones en columnas _en. Cuando la
  // traducción existe, ES y EN son el mismo artículo en dos idiomas, así que sí
  // les corresponde hreflang recíproco. Cuando no existe, se lista solo el ES y
  // sin alternates: no se inventa una equivalencia que no está.
  for (const variant of buildBlogVariants(posts, "sitemap")) {
    const reciprocos = Object.keys(variant.alternates).length > 1;
    entries.push({
      loc: variant.path,
      alternates: reciprocos ? variant.alternates : undefined,
      priority: 0.7,
      changefreq: "monthly",
    });
  }
  if (skippedLanguages.length) {
    console.warn(`[sitemap] idiomas sin ruta propia, fuera del sitemap: ${skippedLanguages.join(", ")}`);
  }

  // Casos y ediciones: una <url> por idioma listable, con sus alternates.
  for (const item of cases) {
    for (const l of SITEMAP_LANGS) {
      entries.push({
        loc: CASE_PATHS[l](item.slug),
        alternates: altsFrom(CASE_PATHS, item.slug),
        priority: 0.7,
        changefreq: "monthly",
      });
    }
  }
  for (const ed of editions) {
    for (const l of SITEMAP_LANGS) {
      entries.push({
        loc: EDITION_PATHS[l](ed.slug),
        alternates: altsFrom(EDITION_PATHS, ed.slug),
        priority: 0.5,
        changefreq: "monthly",
      });
    }
  }

  console.log(
    `[sitemap] contenido dinámico: ${posts.length} filas de blog, ${cases.length} casos, ${editions.length} ediciones.`,
  );
  return entries;
}

export interface GenerateSitemapOptions {
  /** Ruta de salida. Default: public/sitemap.xml */
  outPath?: string;
  supabaseUrl?: string;
  supabaseKey?: string;
}

export async function generateSitemap(opts: GenerateSitemapOptions = {}): Promise<number> {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const out = opts.outPath ?? resolve(__dirname, "../public/sitemap.xml");

  const entries: UrlEntry[] = [];

  // 1) Rutas estáticas del registro (una <url> por idioma, con alternates).
  for (const route of ROUTES) {
    if (!route.indexable) continue;
    for (const lang of LANGS) {
      const path = route.paths[lang];
      if (!path) continue;
      entries.push({
        loc: path,
        alternates: route.paths,
        priority: priorityOf(route),
        changefreq: changefreqOf(route),
      });
    }
  }

  // 2) Casos de éxito estáticos — una <url> por idioma listable.
  for (const id of CASO_IDS) {
    for (const l of SITEMAP_LANGS) {
      entries.push({
        loc: CASE_PATHS[l](id),
        alternates: altsFrom(CASE_PATHS, id),
        priority: 0.7,
        changefreq: "monthly",
      });
    }
  }

  // 3) Dinámico (blog + casos + newsletter). Si falla, revienta el build.
  entries.push(...(await fetchDynamic(opts.supabaseUrl, opts.supabaseKey)));

  // Una <loc> por URL: el registro y el contenido dinámico pueden solaparse.
  const seen = new Set<string>();
  const unique = entries.filter((e) => (seen.has(e.loc) ? false : (seen.add(e.loc), true)));

  const body = unique.map(renderUrl).join("\n\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${body}

</urlset>
`;

  writeFileSync(out, xml, "utf8");
  console.log(`[sitemap] ${unique.length} URLs escritas en ${out}`);
  return unique.length;
}
