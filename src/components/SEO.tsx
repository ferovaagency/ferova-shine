import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  /** absolute or relative path, e.g. "/contacto" */
  path: string;
  lang?: 'es' | 'en' | 'pt';
  type?: 'website' | 'article';
  /** absolute URL or path resolved against host; when omitted, DEFAULT_OG_IMAGE is used */
  image?: string;
  /** any additional JSON-LD blocks */
  jsonLd?: object | object[];
}

const HOSTS = {
  es: 'https://seoparaecommerce.co',
  en: 'https://seoforecommerces.co',
  pt: 'https://seoparaecommerce.co',
};

const SITE_NAMES = {
  es: 'Ferova Agency',
  en: 'Ferova Agency',
  pt: 'Ferova Agency',
};

const LOCALES = {
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

function toAbsolute(url: string, host: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `${host}${url.startsWith('/') ? url : '/' + url}`;
}

const SEO = ({ title, description, path, lang = 'es', type = 'website', image, jsonLd }: SEOProps) => {
  const host = HOSTS[lang];
  const url = path.startsWith('http') ? path : `${host}${path.startsWith('/') ? path : '/' + path}`;
  const ogImage = toAbsolute(image || DEFAULT_OG_IMAGE, host);
  const blocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content={SITE_NAMES[lang]} />
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
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(b)}</script>
      ))}
    </Helmet>
  );
};

export default SEO;
