/**
 * Prerender SSG — usado por vite-prerender-plugin en build.
 * Renderiza cada ruta a HTML estático para GPTBot/ClaudeBot/PerplexityBot.
 */
import "./prerender-polyfills"; // ⚠️ DEBE ser el primer import.
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

type HelmetOut = {
  title?: { toString(): string };
  meta?: { toString(): string };
  link?: { toString(): string };
  script?: { toString(): string };
};

// Slugs estáticos de casos de éxito (data/pricing.ts).
const CASO_IDS = [
  "google-ads-arcos-desinfeccion",
  "ecommerce-cableado-estructurado",
  "ecommerce-mascotas",
  "cliente-tecnologia-migracion-web-app",
];

let dynamicSlugsCache: string[] | null = null;

async function fetchDynamicSlugs(): Promise<string[]> {
  if (dynamicSlugsCache) return dynamicSlugsCache;
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
  const routes: string[] = [];

  if (url && key) {
    try {
      const headers = { apikey: key, Authorization: `Bearer ${key}` };
      // ⚠️ blog_posts NO tiene columna `status` — se publica con `active=true` y
      // `published_at <= now` (mismo filtro que src/pages/Blog.tsx). La query
      // anterior (`status=eq.published`) devolvía HTTP 400 y NINGÚN post se
      // prerenderizaba. Newsletter se lee de la vista pública ya filtrada.
      const now = new Date().toISOString();
      const [blogRes, editionsRes, casesRes] = await Promise.all([
        fetch(`${url}/rest/v1/blog_posts?select=slug,language&active=eq.true&published_at=lte.${now}`, { headers }),
        fetch(`${url}/rest/v1/newsletter_editions_public?select=slug`, { headers }),
        fetch(`${url}/rest/v1/case_studies_public?select=slug`, { headers }),
      ]);
      if (blogRes.ok) {
        const posts = (await blogRes.json()) as { slug: string; language: "es" | "en" }[];
        posts.forEach((p) => routes.push(p.language === "en" ? `/en/blog/${p.slug}` : `/blog/${p.slug}`));
      }
      if (casesRes.ok) ((await casesRes.json()) as { slug: string }[]).forEach((item) => routes.push(`/casos-de-exito/${item.slug}`));
      if (editionsRes.ok) {
        const eds = (await editionsRes.json()) as { slug: string }[];
        eds.forEach((e) => {
          routes.push(
            `/newsletter/edicion/${e.slug}`,
            `/en/newsletter/edition/${e.slug}`,
            `/pt/newsletter/edicao/${e.slug}`,
          );
        });
      }
    } catch (err) {
      console.warn("[prerender] Supabase fetch failed:", err);
    }
  }

  CASO_IDS.forEach((id) => {
    routes.push(`/casos-de-exito/${id}`, `/en/case-studies/${id}`, `/pt/casos-de-sucesso/${id}`);
  });

  dynamicSlugsCache = routes;
  return routes;
}

export async function prerender(data: { url: string }) {
  const helmetContext: Record<string, unknown> = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext as never}>
      <App url={data.url} />
    </HelmetProvider>,
  );

  const helmet = (helmetContext as { helmet?: HelmetOut }).helmet;
  const titleMatch = helmet?.title?.toString().match(/<title[^>]*>([^<]*)<\/title>/);
  const title = titleMatch?.[1];

  // Extraer descripción, canonical y og:* del helmet como elementos individuales.
  const rawHead = (helmet?.meta?.toString() ?? "") + (helmet?.link?.toString() ?? "");
  const elements = new Set<{ type: string; props: Record<string, string> }>();
  const tagRegex = /<(meta|link|script)\s+([^>]*?)\/?>/g;
  let m: RegExpExecArray | null;
  while ((m = tagRegex.exec(rawHead)) !== null) {
    const [, type, attrStr] = m;
    const props: Record<string, string> = {};
    const attrRegex = /(\w[\w-]*)="([^"]*)"/g;
    let a: RegExpExecArray | null;
    while ((a = attrRegex.exec(attrStr)) !== null) props[a[1]] = a[2];
    if (Object.keys(props).length) elements.add({ type, props });
  }

  // Enlaces internos + rutas dinámicas (solo desde la primera pasada `/`).
  let links: Set<string> | undefined;
  try {
    const { parseLinks } = await import("vite-prerender-plugin/parse");
    const internal = parseLinks(html).filter((h) => h.startsWith("/") && !h.startsWith("//"));
    links = new Set(internal);
    if (data.url === "/") {
      const dynamic = await fetchDynamicSlugs();
      dynamic.forEach((r) => links!.add(r));
    }
  } catch {
    /* opcional */
  }

  const lang = data.url.startsWith("/en") ? "en" : data.url.startsWith("/pt") ? "pt" : "es";

  return {
    html,
    links,
    head: { lang, title, elements },
  };
}
