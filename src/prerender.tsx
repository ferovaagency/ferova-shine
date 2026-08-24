/**
 * Prerender SSG — usado por vite-prerender-plugin en build.
 * Renderiza cada ruta a HTML estático para GPTBot/ClaudeBot/PerplexityBot.
 */
import "./prerender-polyfills"; // ⚠️ DEBE ser el primer import.
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { fetchDynamicSlugs } from "./prerender-content";
import { getPrerenderPost } from "./lib/prerender-store";
import "./index.css";

type HelmetOut = {
  title?: { toString(): string };
  meta?: { toString(): string };
  link?: { toString(): string };
  script?: { toString(): string };
};

/** /blog/:slug y /en/blog/:slug — las únicas rutas de artículo que existen. */
const BLOG_POST_URL = /^\/(?:(en)\/)?blog\/([^/]+)$/;

export async function prerender(data: { url: string }) {
  const helmetContext: Record<string, unknown> = {};

  // Aviso (no error) cuando se va a prerenderizar un artículo sin datos cargados:
  // el HTML saldría con el <title> de la home y sin <h1>. Pasa con slugs que
  // están en el listado editorial estático pero no tienen fila en blog_posts.
  const postMatch = BLOG_POST_URL.exec(data.url);
  if (postMatch && !getPrerenderPost(postMatch[1] ?? "es", postMatch[2])) {
    console.warn(
      `[prerender] ${data.url}: sin datos de blog_posts. El HTML saldrá sin título ni H1 propios.`,
    );
  }

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

  // Enlaces internos descubiertos en el HTML. Es un extra: si el parser falla,
  // el build puede seguir con el registro de rutas.
  let links: Set<string> | undefined;
  try {
    const { parseLinks } = await import("vite-prerender-plugin/parse");
    const internal = parseLinks(html).filter((h) => h.startsWith("/") && !h.startsWith("//"));
    links = new Set(internal);
  } catch (err) {
    console.warn("[prerender] parseLinks no disponible:", (err as Error).message);
  }

  // Rutas dinámicas (blog, casos, newsletter). ⚠️ FUERA del try de arriba a
  // propósito: si esto falla, el build TIENE que caerse. Antes quedaba dentro y
  // el catch se comía el error, así que un fallo de Supabase producía un sitio
  // completo sin artículos y con exit code 0.
  if (data.url === "/") {
    const dynamic = await fetchDynamicSlugs();
    links = links ?? new Set<string>();
    dynamic.forEach((r) => links!.add(r));
  }

  const lang = data.url.startsWith("/en") ? "en" : data.url.startsWith("/pt") ? "pt" : "es";

  return {
    html,
    links,
    head: { lang, title, elements },
  };
}
