/**
 * Cliente de Supabase cargado bajo demanda.
 *
 * Las páginas públicas solo usan Supabase dentro de efectos o al enviar un
 * formulario, nunca durante el render. Importarlo de forma estática metía
 * todo supabase-js (~850 KB de código fuente) en el JavaScript inicial de
 * cada página. Con este import dinámico el cliente se descarga solo cuando
 * hace falta, en su propio chunk.
 */
export const getSupabase = () => import("./client").then((m) => m.supabase);

/** Mismo cliente tipado para el CMS de casos, también bajo demanda. */
export const getCaseCms = () => import("./cms-types").then((m) => m.caseCms);
