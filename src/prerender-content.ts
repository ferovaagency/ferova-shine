/**
 * Rutas dinámicas para el prerender (build).
 *
 * Envoltorio fino sobre src/lib/dynamic-content.ts, que es la fuente única de la
 * consulta y de qué variantes de idioma existen de verdad. Aquí solo se leen las
 * credenciales de `import.meta.env`, se arman las rutas y se dejan los posts en
 * el store SSR para que BlogPost renderice el artículo y no un spinner.
 */
import {
  fetchDynamicContent,
  BLOG_PATHS,
  CASE_PATHS,
  EDITION_PATHS,
  CASO_IDS,
} from "./lib/dynamic-content";
import { setPrerenderPost } from "./lib/prerender-store";

let cache: string[] | null = null;

export async function fetchDynamicSlugs(): Promise<string[]> {
  if (cache) return cache;

  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

  const { posts, cases, editions, skippedLanguages } = await fetchDynamicContent(url, key, "prerender");
  const routes: string[] = [];

  for (const post of posts) {
    routes.push(BLOG_PATHS[post.language](post.slug));
    setPrerenderPost(post.language, post.slug, {
      title: post.title,
      author: post.author,
      category: post.category,
      content: post.content,
      created_at: post.created_at,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
    });
  }

  if (skippedLanguages.length) {
    console.warn(`[prerender] idiomas sin ruta propia, no prerenderizados: ${skippedLanguages.join(", ")}`);
  }

  // Casos y ediciones: las tres variantes existen como ruta real en App.tsx.
  const all = (paths: Record<string, (s: string) => string>, slug: string) =>
    Object.values(paths).forEach((p) => routes.push(p(slug)));

  cases.forEach((c) => all(CASE_PATHS, c.slug));
  editions.forEach((e) => all(EDITION_PATHS, e.slug));
  CASO_IDS.forEach((id) => all(CASE_PATHS, id));

  console.log(
    `[prerender] contenido dinámico: ${posts.length} posts, ${cases.length} casos, ${editions.length} ediciones.`,
  );

  cache = [...new Set(routes)];
  return cache;
}
