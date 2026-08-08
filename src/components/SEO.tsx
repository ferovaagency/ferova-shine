import { Helmet } from 'react-helmet-async';
import { SITE_ORIGINS, LANGS, alternatesFor, type Lang } from '@/config/routes';

/** Etiqueta hreflang emitida por idioma. `es` es el x-default. */
const HREFLANG: Record<Lang, string> = { es: 'es', en: 'en', pt: 'pt' };

export interface Breadcrumb {
  name: string;
  /** path relativo ("/servicios") o URL absoluta. */
  path: string;
}

interface SEOProps {
  title: string;
  description: string;
  /** absolute or relative path, e.g. "/contacto" */
  path: string;
  lang?: Lang;
  type?: 'website' | 'article';
  /** absolute URL or path resolved against host; when omitted, DEFAULT_OG_IMAGE is used */
  image?: string;
  /** any additional JSON-LD blocks */
  jsonLd?: object | object[];
  /** Excluye la página de indexación (admin, resultados internos, previews). */
  noindex?: boolean;
  /**
   * Alternates hreflang explícitos { es, en, pt } → path.
   * Si se omite, se resuelven automáticamente desde el registro central de
   * rutas (src/config/routes.ts) usando `path`. Útil para rutas dinámicas
   * (blog/:slug) que no están en el registro.
   */
  alternates?: Partial<Record<Lang, string>>;
  /** Migas para generar BreadcrumbList JSON-LD. */
  breadcrumbs?: Breadcrumb[];
}

/** Dominio único para los 3 idiomas (i18n por path). */
const SITE_NAME = 'Ferova Agency';

const LOCALES: Record<Lang, string> = {
  es: 'es_CO',
  en: 'en_US',
  pt: 'pt_BR',
};

/**
 * OG image por defecto — URL absoluta estable en R2. Se usa cuando la ruta
 * no aporta una imagen propia, garantizando que TODA página pública ofrezca
 * og:image válido para redes sociales y AI crawlers.
 */
export const DEFAULT_OG_IMAGE =
  'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/08f64c97-01f2-4ae5-81b2-980286698158/id-preview-a7002c7d--6db5856a-1fbb-46ce-9318-d56343dc0fff.lovable.app-1773444142730.png';

function toAbsolute(url: string, lang: Lang): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_ORIGINS[lang]}${url.startsWith('/') ? url : '/' + url}`;
}

const SEO = ({
  title,
  description,
  path,
  lang = 'es',
  type = 'website',
  image,
  jsonLd,
  noindex = false,
  alternates,
  breadcrumbs,
}: SEOProps) => {
  const url = toAbsolute(path, lang);
  const ogImage = toAbsolute(image || DEFAULT_OG_IMAGE, lang);

  // hreflang: explícitos > registro central. Solo se emiten si hay equivalencias
  // reales — nunca adivinando prefijos (evita canonicals cruzados o rotos).
  const altMap = alternates ?? alternatesFor(path);
  const hreflangs = altMap
    ? LANGS.filter((l) => altMap[l]).map((l) => ({
        code: HREFLANG[l],
        href: toAbsolute(altMap[l] as string, l),
        isDefault: l === 'es',
      }))
    : [];

  const jsonLdBlocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  // BreadcrumbList schema (Paso 16). Opt-in vía prop `breadcrumbs`.
  const breadcrumbLd =
    breadcrumbs && breadcrumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: b.name,
            item: toAbsolute(b.path, lang),
          })),
        }
      : null;

  const allBlocks = breadcrumbLd ? [breadcrumbLd, ...jsonLdBlocks] : jsonLdBlocks;

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      )}

      {/* hreflang — equivalencias reales por idioma + x-default */}
      {hreflangs.map((h) => (
        <link key={h.code} rel="alternate" hrefLang={h.code} href={h.href} />
      ))}
      {hreflangs.find((h) => h.isDefault) && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={hreflangs.find((h) => h.isDefault)!.href}
        />
      )}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={LOCALES[lang]} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {allBlocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(b)}</script>
      ))}
    </Helmet>
  );
};

export default SEO;
