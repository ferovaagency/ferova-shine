/**
 * Detects language from hostname:
 *  - seoforecommerces.co → 'en'
 *  - seoparaecommerce.co (or any other) → 'es'
 */
export function getLangFromHostname(): 'es' | 'en' {
  const host = window.location.hostname.toLowerCase();
  if (host === 'seoforecommerces.co' || host === 'www.seoforecommerces.co') {
    return 'en';
  }
  return 'es';
}
