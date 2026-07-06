/**
 * Prerender SSG — usado por vite-prerender-plugin en build.
 * Renderiza cada ruta a HTML estático para GPTBot/ClaudeBot/PerplexityBot.
 */
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

type HelmetContext = { helmet?: { title?: { toString(): string }; meta?: { toString(): string }; link?: { toString(): string }; script?: { toString(): string } } };
import "./index.css";

export async function prerender(data: { url: string }) {
  const helmetContext: Record<string, unknown> = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext as never}>
      <App url={data.url} />
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  // Elementos <head> generados por react-helmet-async por ruta.
  const headElements = new Set<{ type: string; props: Record<string, string> }>();

  // Extraer <title> del helmet — vite-prerender-plugin usa `head.title` directo.
  const titleMatch = helmet?.title?.toString().match(/<title[^>]*>([^<]*)<\/title>/);
  const title = titleMatch?.[1];

  // Extraer meta tags y links del helmet a strings HTML crudos.
  const rawMetas = helmet?.meta?.toString() ?? "";
  const rawLinks = helmet?.link?.toString() ?? "";
  const rawScripts = helmet?.script?.toString() ?? "";

  // Descubrir otros enlaces internos para el crawler.
  let links: Set<string> | undefined;
  try {
    const { parseLinks } = await import("vite-prerender-plugin/parse");
    links = new Set(parseLinks(html).filter((h) => h.startsWith("/") && !h.startsWith("//")));
  } catch {
    /* opcional */
  }

  // Idioma para <html lang="...">
  const lang = data.url.startsWith("/en") ? "en" : data.url.startsWith("/pt") ? "pt" : "es";

  return {
    html,
    links,
    head: {
      lang,
      title,
      // Inyectamos meta/link/script del helmet como HTML crudo antes de </head>
      // vía un solo <meta> data-helmet que después post-procesamos, o mejor:
      // usamos `elements` de vite-prerender-plugin para meta/link estándar.
      elements: new Set([
        // Marcador para inyección: el HTML de Helmet se añade al final.
        {
          type: "meta",
          props: {
            name: "helmet-payload",
            content: (rawMetas + rawLinks + rawScripts).replace(/"/g, "&quot;"),
          },
        },
      ]),
    },
  };
}
