import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  lang?: "es" | "en" | "pt";
  /** Path relativo (ej. "/servicios") o URL absoluta. Si se omite, se usa la ruta actual. */
  canonicalUrl?: string;
  type?: "website" | "article";
  image?: string;
}

const HOSTS = {
  es: "https://seoparaecommerce.co",
  en: "https://seoforecommerces.co",
  pt: "https://seoparaecommerce.co",
} as const;

/**
 * Traduce la ruta actual a su equivalente en cada idioma para hreflang cruzado.
 * Heurística simple: usa el mismo pathname para es/en y antepone /pt para portugués.
 * Si la ruta ya incluye /pt, lo remueve para las otras versiones.
 */
function buildHreflangs(pathname: string) {
  let basePath = pathname;
  if (basePath.startsWith("/pt")) {
    basePath = basePath.slice(3) || "/";
  }
  if (basePath.startsWith("/en")) {
    basePath = basePath.slice(3) || "/";
  }
  if (!basePath.startsWith("/")) basePath = "/" + basePath;

  const ptPath = basePath === "/" ? "/pt" : `/pt${basePath}`;

  return {
    es: `${HOSTS.es}${basePath}`,
    en: `${HOSTS.en}${basePath}`,
    pt: `${HOSTS.es}${ptPath}`,
  };
}

const SEOHead = ({
  title,
  description,
  lang = "es",
  canonicalUrl,
  type = "website",
  image,
}: SEOHeadProps) => {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const host = HOSTS[lang];
  const resolvedCanonical = canonicalUrl
    ? canonicalUrl.startsWith("http")
      ? canonicalUrl
      : `${host}${canonicalUrl.startsWith("/") ? canonicalUrl : "/" + canonicalUrl}`
    : `${host}${pathname}`;

  const hreflangs = buildHreflangs(pathname);

  const ogLocale = lang === "en" ? "en_US" : lang === "pt" ? "pt_BR" : "es_CO";

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={resolvedCanonical} />

      <link rel="alternate" hrefLang="es" href={hreflangs.es} />
      <link rel="alternate" hrefLang="es-co" href={hreflangs.es} />
      <link rel="alternate" hrefLang="es-419" href={hreflangs.es} />
      <link rel="alternate" hrefLang="en" href={hreflangs.en} />
      <link rel="alternate" hrefLang="pt" href={hreflangs.pt} />
      <link rel="alternate" hrefLang="pt-br" href={hreflangs.pt} />
      <link rel="alternate" hrefLang="x-default" href={hreflangs.es} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={ogLocale} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEOHead;
