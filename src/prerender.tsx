/**
 * Prerender SSG — usado por vite-prerender-plugin en build.
 * Renderiza cada ruta a HTML estático para GPTBot/ClaudeBot/PerplexityBot.
 */

// --- Polyfills SSR: el Supabase client accede a localStorage al inicializarse,
//     y algunos widgets tocan window en tiempo de import. Los stubeamos ANTES de
//     importar App / index.css. Se sustituyen por los reales en el navegador.
const memStore = new Map<string, string>();
const noopStorage = {
  getItem: (k: string) => memStore.get(k) ?? null,
  setItem: (k: string, v: string) => { memStore.set(k, String(v)); },
  removeItem: (k: string) => { memStore.delete(k); },
  clear: () => memStore.clear(),
  key: (i: number) => Array.from(memStore.keys())[i] ?? null,
  get length() { return memStore.size; },
};
const g = globalThis as unknown as Record<string, unknown>;
if (typeof g.window === "undefined") g.window = g;
if (typeof g.localStorage === "undefined") g.localStorage = noopStorage;
if (typeof g.sessionStorage === "undefined") g.sessionStorage = noopStorage;
if (typeof g.document === "undefined") {
  g.document = { addEventListener: () => {}, removeEventListener: () => {}, documentElement: {}, body: {} };
}

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
      const [blogRes, editionsRes] = await Promise.all([
        fetch(`${url}/rest/v1/blog_posts?select=slug&status=eq.published`, { headers }),
        fetch(`${url}/rest/v1/newsletter_editions?select=slug&status=eq.published`, { headers }),
      ]);
      if (blogRes.ok) {
        const posts = (await blogRes.json()) as { slug: string }[];
        posts.forEach((p) => {
          routes.push(`/blog/${p.slug}`, `/en/blog/${p.slug}`, `/pt/blog/${p.slug}`);
        });
      }
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
