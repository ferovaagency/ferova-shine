/**
 * Detects language from hostname or pathname:
 *  - seoforecommerces.co → 'en'
 *  - pathname starting with /pt → 'pt'
 *  - seoparaecommerce.co (or any other) → 'es'
 */
export function getLangFromHostname(): 'es' | 'en' | 'pt' {
  const host = window.location.hostname.toLowerCase();
  if (host === 'seoforecommerces.co' || host === 'www.seoforecommerces.co') {
    return 'en';
  }
  if (window.location.pathname.startsWith('/pt')) {
    return 'pt';
  }
  return 'es';
}
