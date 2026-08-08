# Reconstrucción de seoparaecommerce.co

Este directorio es la fuente de verdad técnica para la reconstrucción. Su estado inicial es exclusivamente de planificación e inventario: no autoriza cambios de producción, DNS, credenciales ni redirecciones.

## Separación de propiedades

- `seoparaecommerce.co`: consultoría SEO senior para ecommerce y agencias.
- `ferova.com.co`: oferta corporativa, productos, software, desarrollo e IA no estrictamente SEO.

Los dos sitios deben vivir en repositorios, proyectos y despliegues independientes. Este repositorio conserva temporalmente el sitio anterior mientras se completa el inventario y se construyen destinos equivalentes.

## Archivos

- `strategy.json`: arquitectura objetivo, límites de marca, reglas iniciales de traslado y puertas de seguridad.
- `generated/current-url-inventory.csv`: inventario reproducible de las URLs presentes en el sitemap actual.
- `generated/baseline.json`: métricas estructurales y brechas conocidas de frontend, rutas y Supabase.

## Regenerar el inventario

```sh
npm run audit:reconstruction
```

La regeneración no modifica el sitio público. Solo lee el código y el sitemap versionados y actualiza los artefactos de inventario.

## Datos externos pendientes

Antes de aprobar una decisión final por URL, el CSV debe enriquecerse con:

1. Clics e impresiones de Search Console de los últimos 12 meses.
2. Sesiones, conversiones y leads de Analytics.
3. Backlinks y dominios de referencia.
4. Estado HTTP y canonical observados en producción.
5. Responsable, equivalencia de intención y evidencia de la decisión.

Hasta completar esos campos, `manual_seo_review`, `language_scope_review` y las decisiones condicionales no autorizan un `301` o `410`.
