/**
 * Almacén de datos SSR — SOLO se llena durante el build (src/prerender.tsx).
 *
 * Por qué existe: las páginas de contenido (BlogPost) piden sus datos a Supabase
 * dentro de un `useEffect`. En `renderToString` los efectos NO corren, así que la
 * página se renderizaba siempre en su estado de carga (un spinner) y nunca montaba
 * <SEO>, por lo que el HTML estático salía con el <title> por defecto del index.html
 * (el de la home) y sin <h1>. Es decir: aunque la ruta se prerenderizara, para
 * Google el artículo no existía.
 *
 * Con esto, el prerender deja el post ya cargado aquí y el componente lo lee de
 * forma síncrona en el primer render.
 *
 * En el navegador este módulo queda vacío: `main.tsx` usa `createRoot` (no
 * `hydrateRoot`), así que React descarta el HTML prerenderizado y vuelve a pedir
 * los datos como siempre. No hay riesgo de mismatch de hidratación.
 */

export interface PrerenderPost {
  title: string;
  author: string;
  category: string;
  content: string;
  created_at: string;
  meta_title: string | null;
  meta_description: string | null;
  /** Rutas hermanas del mismo artículo, para los hreflang. */
  alternates?: Partial<Record<"es" | "en", string>>;
}

const posts = new Map<string, PrerenderPost>();

const key = (lang: string, slug: string) => `${lang}:${slug}`;

export function setPrerenderPost(lang: string, slug: string, post: PrerenderPost): void {
  posts.set(key(lang, slug), post);
}

/** Devuelve el post precargado en build, o null en el navegador. */
export function getPrerenderPost(lang: string, slug: string | undefined): PrerenderPost | null {
  if (!slug) return null;
  return posts.get(key(lang, slug)) ?? null;
}

export function prerenderPostCount(): number {
  return posts.size;
}
