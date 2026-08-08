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
 *  Incluye contenido DINÁMICO best-effort (blog + ediciones de newsletter
 *  publicadas en Supabase, y los casos de éxito estáticos), igual que
 *  src/prerender.tsx. Si no hay credenciales o la red falla, cae con elegancia
 *  a solo-estático — NUNCA rompe el build.
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

/** hreflang codes emitidos en el sitemap (coinciden con SEO.tsx). */
const HREFLANG: Record<Lang, string> = { es: "es", en: "en", pt: "pt" };

/** Casos de éxito estáticos (espejo de src/prerender.tsx → CASO_IDS). */
const CASO_IDS = [
  "google-ads-arcos-desinfeccion",
  "ecommerce-cableado-estructurado",
  "ecommerce-mascotas",
  "cliente-tecnologia-migracion-web-app",
];

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

async function fetchDynamic(supabaseUrl?: string, supabaseKey?: string): Promise<UrlEntry[]> {
  const url = supabaseUrl || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    supabaseKey ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY;
  const entries: UrlEntry[] = [];
  if (!url || !key) {
    console.warn("[sitemap] Sin credenciales Supabase — sitemap solo-estático.");
    return entries;
  }
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  try {
    // Mismo filtro que src/pages/Blog.tsx y src/prerender.tsx: blog_posts se
    // publica con active=true + published_at<=now (NO existe columna `status`);
    // las ediciones se leen de la vista pública ya filtrada.
    const now = new Date().toISOString();
    const [blogRes, edRes] = await Promise.all([
      fetch(`${url}/rest/v1/blog_posts?select=slug&active=eq.true&published_at=lte.${now}`, { headers }),
      fetch(`${url}/rest/v1/newsletter_editions_public?select=slug`, { headers }),
    ]);
    if (blogRes.ok) {
      const posts = (await blogRes.json()) as { slug: string }[];
      for (const p of posts) {
        entries.push({
          loc: `/blog/${p.slug}`,
          alternates: { es: `/blog/${p.slug}`, en: `/en/blog/${p.slug}`, pt: `/pt/blog/${p.slug}` },
          priority: 0.7,
          changefreq: "monthly",
        });
      }
    }
    if (edRes.ok) {
      const eds = (await edRes.json()) as { slug: string }[];
      for (const e of eds) {
        entries.push({
          loc: `/newsletter/edicion/${e.slug}`,
          alternates: {
            es: `/newsletter/edicion/${e.slug}`,
            en: `/en/newsletter/edition/${e.slug}`,
            pt: `/pt/newsletter/edicao/${e.slug}`,
          },
          priority: 0.5,
          changefreq: "monthly",
        });
      }
    }
  } catch (err) {
    console.warn("[sitemap] Fetch dinámico falló, sigo solo-estático:", err);
  }
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

  // 2) Casos de éxito estáticos.
  for (const id of CASO_IDS) {
    entries.push({
      loc: `/casos-de-exito/${id}`,
      alternates: {
        es: `/casos-de-exito/${id}`,
        en: `/en/case-studies/${id}`,
        pt: `/pt/casos-de-sucesso/${id}`,
      },
      priority: 0.7,
      changefreq: "monthly",
    });
  }

  // 3) Dinámico (blog + newsletter) best-effort.
  entries.push(...(await fetchDynamic(opts.supabaseUrl, opts.supabaseKey)));

  const body = entries.map(renderUrl).join("\n\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${body}

</urlset>
`;

  writeFileSync(out, xml, "utf8");
  console.log(`[sitemap] ${entries.length} URLs escritas en ${out}`);
  return entries.length;
}
