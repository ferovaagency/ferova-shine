# Sistema visual — SEO para Ecommerce by Ferova

Este documento convierte el manual de marca de Ferova Agency y la guía de interfaces de vanguardia en reglas operativas para `seoparaecommerce.co`.

## Principio rector

El diseño debe comunicar criterio senior, trazabilidad y capacidad técnica. La profundidad visual apoya la jerarquía; nunca compite con el contenido, la conversión, el rendimiento o la accesibilidad.

## Paleta oficial

| Token | Hex | Uso principal |
| --- | --- | --- |
| Ink | `#3C3C3B` | Texto y elementos sobrios |
| Wine | `#541014` | Profundidad, alertas editoriales y acento secundario |
| Navy | `#2F2D56` | Héroes, superficies de autoridad y fondos oscuros |
| Brown | `#6A4C30` | Enlaces, iconografía y estados secundarios |
| Gold | `#C0930E` | CTA, foco, progreso y señales de valor |
| Cream | `#FBF7EF` | Fondo cálido complementario |

El dorado no se usa como texto pequeño sobre fondos claros sin comprobar contraste. El azul Ferova sustituye al azul SaaS genérico de la reconstrucción inicial.

## Tipografía

- Marca: Nexa, según el manual.
- Implementación web: `Nexa`, con `Outfit` como fallback geométrico autorizado técnicamente mientras no exista un archivo webfont licenciado en el repositorio.
- Texto de lectura: Inter y fuentes del sistema.
- Se mantiene una jerarquía compacta, con títulos de alta presencia y párrafos de ancho limitado.

## Composición

- Bento Grid para agrupar diagnósticos, servicios, métricas y herramientas relacionadas.
- Glassmorphism solamente sobre superficies oscuras y con contraste verificable.
- Radios medios; evitar la repetición indiscriminada de píldoras y tarjetas idénticas.
- El isotipo de ascenso funciona como firma visual y metáfora de progreso, no como decoración repetitiva.
- Fondo marfil y blancos cálidos para evitar la apariencia de plantilla SaaS azul genérica.

## Movimiento e interacción

- Respuesta visual inmediata en hover, focus, carga y confirmación.
- Curvas naturales `cubic-bezier`, desplazamientos cortos y propósito cognitivo.
- Objetivo de 60 fps; animar `transform` y `opacity` antes que propiedades de layout.
- Cumplir `prefers-reduced-motion` en toda interacción.
- No incorporar Spline o WebGL hasta contar con una escena optimizada, fallback estático y presupuesto de rendimiento medido.

## Accesibilidad y rendimiento

- Foco visible dorado sobre superficies claras y oscuras.
- Mantener HTML semántico y contenido crítico fuera de canvas.
- No cargar 3D, vídeo o tipografías pesadas en el camino crítico del LCP.
- Cada efecto de blur debe tener un fondo sólido o degradado de respaldo.
- Validar escritorio y móvil después de cada modificación estructural.

## Componentes implementados

- `seo-brand`: contexto de marca para páginas de SEO.
- `seo-brand-hero`: fondo azul Ferova con profundidad de vino y dorado.
- `seo-glass-panel`: panel de vidrio para información secundaria sobre fondos oscuros.
- `seo-bento-card`: tarjeta modular con elevación y respuesta física moderada.
- `seo-brand-mark`: presentación compacta del isotipo oficial en el encabezado.

## Criterio para nuevas páginas

Antes de crear una nueva sección, responder:

1. ¿Qué decisión debe poder tomar el usuario?
2. ¿Qué información necesita escanear en menos de diez segundos?
3. ¿La profundidad o animación aclara un estado o solo adorna?
4. ¿La experiencia conserva contraste, navegación por teclado y movimiento reducido?
5. ¿El recurso visual afecta LCP, CLS o interacción móvil?
