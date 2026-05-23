import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  /** absolute or relative path, e.g. "/contacto" */
  path: string;
  lang?: 'es' | 'en' | 'pt';
  type?: 'website' | 'article';
  image?: string;
  /** any additional JSON-LD blocks */
  jsonLd?: object | object[];
}

const HOSTS = {
  es: 'https://seoparaecommerce.co',
  en: 'https://seoforecommerces.co',
  pt: 'https://seoparaecommerce.co',
};

const SEO = ({ title, description, path, lang = 'es', type = 'website', image, jsonLd }: SEOProps) => {
  const host = HOSTS[lang];
  const url = path.startsWith('http') ? path : `${host}${path.startsWith('/') ? path : '/' + path}`;
  const blocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(b)}</script>
      ))}
    </Helmet>
  );
};

export default SEO;
