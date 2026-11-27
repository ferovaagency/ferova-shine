/**
 * Utilidades del artículo como landing (mismo sistema que ferova.com.co).
 *
 * - withToc: añade id a cada H2 y devuelve el índice.
 * - extractFaq: preguntas frecuentes para el schema FAQPage (H2 "Preguntas
 *   frecuentes" / "Frequently asked questions" / "FAQ", cada pregunta en H3).
 * - splitForCta: parte el HTML para intercalar la llamada a Fera.
 * - wordCount / inlineImages.
 */

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const plain = (value: string) =>
  value
    .replace(/<\/(p|li|h\d|div|ul|ol)>|<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

export function withToc(html: string): { html: string; toc: { id: string; label: string }[] } {
  const toc: { id: string; label: string }[] = [];
  const seen = new Set<string>();
  const result = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_m, attrs: string, inner: string) => {
    const label = plain(inner);
    const base = slugify(label) || "seccion";
    let id = base;
    for (let n = 2; seen.has(id); n += 1) id = `${base}-${n}`;
    seen.add(id);
    toc.push({ id, label });
    return `<h2${attrs.replace(/\sid="[^"]*"/i, "")} id="${id}">${inner}</h2>`;
  });
  return { html: result, toc };
}

export function extractFaq(html: string): { question: string; answer: string }[] {
  const faq = html.split(/<h2[^>]*>/i).find((section) => {
    const heading = plain(section.split(/<\/h2>/i)[0] ?? "");
    return /preguntas frecuentes|frequently asked|^faqs?$/i.test(heading);
  });
  if (!faq) return [];
  return faq
    .split(/<\/h2>/i)
    .slice(1)
    .join("")
    .split(/<h3[^>]*>/i)
    .slice(1)
    .map((chunk) => {
      const [question = "", ...rest] = chunk.split(/<\/h3>/i);
      return { question: plain(question), answer: plain(rest.join(" ")) };
    })
    .filter((item) => item.question && item.answer);
}

/** Antes del tercer H2 (o del segundo si hay pocos). Con menos de tres H2 no parte. */
export function splitForCta(html: string): [string, string] | null {
  const starts = [...html.matchAll(/<h2[\s>]/gi)].map((m) => m.index ?? 0);
  if (starts.length < 3) return null;
  const at = starts.length >= 4 ? starts[2] : starts[1];
  return at === undefined ? null : [html.slice(0, at), html.slice(at)];
}

export const wordCount = (html: string) => plain(html).split(/\s+/).filter(Boolean).length;

export const inlineImages = (html: string) =>
  [...html.matchAll(/<img[^>]+src="([^"]+)"/gi)]
    .map((m) => m[1])
    .filter((src): src is string => Boolean(src?.startsWith("http")));
