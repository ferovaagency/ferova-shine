/**
 * Detecta el idioma solo por hostname.
 *  - seoforecommerces.co → 'en'
 *  - otro hostname       → 'es'
 *
 * NOTA: NO usar pathname aquí. hostLang se evalúa una sola vez al cargar
 * el módulo; si dependiera del pathname, navegar a /pt/... dejaría toda
 * la sesión "pegada" en pt y rompería rutas raíz como /recursos.
 * Las rutas /pt/* y /en/* ya pasan `lang` explícito en App.tsx.
 */
export function getLangFromHostname(): 'es' | 'en' | 'pt' {
  if (typeof window === 'undefined') return 'es';
  const host = window.location.hostname.toLowerCase();
  if (host === 'seoforecommerces.co' || host === 'www.seoforecommerces.co') {
    return 'en';
  }
  return 'es';
}
