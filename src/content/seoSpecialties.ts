import type { Lang } from "@/config/routes";

export type SeoSpecialtyKind = "agencies" | "audit" | "migrations";

export type SeoSpecialtyContent = {
  path: string;
  /** <title> exacto. Si falta: `${title} | siteName`. */
  metaTitle?: string;
  /** Imagen para redes (og:image). Si falta, la de por defecto del sitio. */
  ogImage?: string;
  eyebrow: string;
  title: string;
  description: string;
  problem: string;
  outcomes: string[];
  deliverables: { title: string; description: string }[];
  /** `time`: plazo opcional del paso, se muestra junto al número. */
  process: { title: string; description: string; time?: string }[];
  /** Precios públicos. Si existe, se renderiza y entra en el schema Service. */
  pricing?: {
    kicker: string;
    title: string;
    intro: string;
    serviceName: string;
    plans: { name: string; price: number; unit: string; description: string }[];
    guarantee: string;
    currencyNote: string;
  };
  /** Pruebas con cifras y su fuente. Siempre anonimizadas salvo autorización. */
  proof?: {
    kicker: string;
    title: string;
    items: { label: string; before: string; after: string; metric: string; context: string }[];
    note: string;
    cta: { label: string; href: string };
  };
  /** Secciones de contenido largo: profundidad para posicionar y para la IA. */
  longform?: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  faqs: { question: string; answer: string }[];
  /** Enlaces internos relacionados al cierre. Vacio = no se renderiza. */
  relatedLinks?: { label: string; to: string }[];
};

const ES: Record<SeoSpecialtyKind, SeoSpecialtyContent> = {
  agencies: {
    path: "/seo-para-agencias",
    metaTitle: "SEO marca blanca para agencias: ecommerce y SEO técnico | Ferova",
    eyebrow: "SEO MARCA BLANCA · ECOMMERCE Y SEO TÉCNICO",
    title: "SEO marca blanca para agencias que venden ecommerce y SEO técnico.",
    description:
      "Servicio de SEO marca blanca para agencias: auditorías, arquitectura de catálogos y migraciones entregadas bajo tu marca, con tu logo en cada reporte. Trabajo técnico senior de María Fernanda Calderón, Fractional SEO en Ferova, con precios publicados y garantía por escrito.",
    problem:
      "La mayoría de los programas de SEO marca blanca están pensados para negocios locales: mapas, citaciones y reseñas. El ecommerce se rompe en otros lugares: navegación facetada, miles de URLs de producto, variantes duplicadas y migraciones de plataforma. Recomendar ahí sin suficiente profundidad es como una agencia pierde un cliente.",
    outcomes: [
      "Capacidad para vender y entregar proyectos de ecommerce técnicamente exigentes.",
      "Diagnósticos y recomendaciones que el equipo puede explicar y ejecutar.",
      "Participación flexible: marca blanca total, soporte interno o especialista visible.",
      "SEO técnico limpio, dentro de las directrices de Google: sin clics simulados ni atajos.",
    ],
    deliverables: [
      { title: "Auditoría técnica", description: "Rastreo, indexación, renderizado, datos estructurados, Core Web Vitals y riesgos priorizados, en un reporte con el logo de tu agencia." },
      { title: "Arquitectura de catálogo", description: "Categorías, facetas, filtros, paginación, variantes de producto y enlazado interno para tiendas con miles de URLs." },
      { title: "Migraciones de plataforma", description: "Inventario, equivalencias, redirects, QA en staging y monitoreo post-lanzamiento en Shopify, WooCommerce y WordPress." },
      { title: "Capacidad recurrente", description: "Un bloque mensual de horas senior para correcciones, revisiones y landing pages que tu agencia entrega como propias." },
    ],
    process: [
      { title: "Brief", time: "día 0", description: "Me cuentas el cliente, el objetivo y la fecha. Acordamos por escrito el rol, la visibilidad y los entregables." },
      { title: "NDA y accesos", time: "día 1", description: "Firmo tu NDA antes de entrar a cualquier cuenta. Compartes Search Console, analítica y la plataforma." },
      { title: "Auditoría técnica", time: "en 5 días", description: "Rastreo, contraste de datos y revisión manual de las plantillas que generan ventas." },
      { title: "Reporte con tu logo", time: "misma semana", description: "Hallazgos con evidencia, prioridad y criterio de aceptación, con la marca de tu agencia. Tu equipo lo revisa y aprueba antes de que llegue al cliente." },
      { title: "Entrega y soporte", time: "continuo", description: "Lo explico a tu equipo y acompaño la implementación como bloque mensual o por sitio." },
    ],
    pricing: {
      kicker: "PRECIOS",
      title: "Precios de SEO marca blanca publicados. Sin llamada previa para conocer la cifra.",
      intro: "Tres formas de trabajar con Ferova. Sin contratos largos ni cuota de entrada. Los precios son lo que paga tu agencia; tú defines el precio de reventa a tu cliente.",
      serviceName: "SEO marca blanca para agencias",
      plans: [
        { name: "Auditoría técnica", price: 750, unit: "por sitio", description: "Auditoría técnica de un sitio, entregada bajo tu marca con un plan de acción priorizado." },
        { name: "Bloque de 20 horas", price: 1250, unit: "al mes", description: "Veinte horas senior al mes para auditorías, arquitectura, migraciones, correcciones y revisiones entre tus clientes." },
        { name: "Por sitio, agencias nuevas", price: 500, unit: "al mes", description: "SEO técnico continuo para el sitio de un cliente, para agencias que empiezan su primer proyecto conmigo." },
      ],
      guarantee: "Garantía por escrito: si el entregable no se puede revender a tu cliente tal cual, bajo tu marca, no se cobra.",
      currencyNote: "Precios en dólares estadounidenses (USD), facturados en USD.",
    },
    proof: {
      kicker: "RESULTADOS",
      title: "Lo que ha movido el trabajo, con la fuente junto a cada cifra.",
      items: [
        {
          label: "Tienda online · rediseño + SEO técnico",
          before: "COP 1,0 M",
          after: "COP 13,3 M",
          metric: "Ventas online mensuales, enero → mayo 2025",
          context: "Rediseño en WordPress, limpieza de plugins y SEO técnico en sitemap, robots.txt y URLs rotas. También hubo campañas a WhatsApp, así que el crecimiento no se atribuye solo al SEO.",
        },
        {
          label: "Servicios profesionales · recuperación SEO",
          before: "153",
          after: "1.180",
          metric: "Clics orgánicos, noviembre 2024 → mayo 2025",
          context: "Limpieza de enlaces maliciosos inyectados, migración de hosting y SEO técnico. Las impresiones pasaron de 4.300 a 22.000 y la posición media de 23,9 a 10,2 entre los mismos dos reportes.",
        },
      ],
      note: "Fuentes: registros de ventas e informes de seguimiento compartidos por los clientes. Clientes anonimizados; los casos identificables solo se publican con autorización escrita.",
      cta: { label: "Ver el portafolio completo", href: "https://ferova.com.co/portafolio?lang=es" },
    },
    longform: [
      {
        heading: "Por qué el SEO marca blanca para ecommerce es otro trabajo",
        paragraphs: [
          "La mayoría de los programas de SEO marca blanca están diseñados para negocios locales: un perfil de Google Business, citaciones, reseñas y unas cuantas páginas de servicio. Ese modelo funciona para un consultorio o un taller. No sirve para una tienda con 5.000 productos, 40 filtros y tres caminos para llegar al mismo artículo.",
          "En ecommerce, los ingresos orgánicos los deciden las plantillas, no las páginas sueltas. Una regla de la navegación facetada puede crear decenas de miles de URLs rastreables. Las variantes de producto pueden repartir señales entre duplicados. Los productos agotados necesitan una política, no redirects improvisados. Una migración de plataforma puede borrar años de posiciones en un fin de semana.",
          "Para ese trabajo está pensado este servicio. Tu agencia conserva el cliente y la relación; yo aporto la profundidad técnica para diagnosticar, priorizar por impacto en ventas y explicarlo de forma que tu equipo lo pueda defender.",
        ],
      },
      {
        heading: "Cómo funciona la entrega en marca blanca",
        paragraphs: [
          "Tú decides cuánto aparezco. En marca blanca total nunca contacto a tu cliente: las preguntas pasan por tu equipo y cada documento lleva el logo y la voz de tu agencia. Si prefieres, puedo entrar a las llamadas como parte de tu equipo.",
          "Nada llega a tu cliente sin tu aprobación. Cada reporte se entrega primero a tu equipo; lo revisas, pides cambios y lo presentas cuando quieras.",
          "Los accesos se manejan bajo NDA y se limitan a lo que el proyecto necesita: Search Console, analítica, el administrador de la plataforma y, si hace falta, un entorno de staging.",
        ],
      },
      {
        heading: "SEO técnico limpio, sin atajos",
        paragraphs: [
          "Algunos programas de marca blanca venden tácticas que simulan comportamiento de usuarios o inflan señales de forma artificial. Pueden dar un salto corto y dejar un riesgo largo que tiene que explicar tu agencia, no el proveedor.",
          "Este servicio no usa clics simulados, interacción falsa ni esquemas de enlaces. Es SEO técnico y de contenido dentro de las directrices de Google.",
        ],
      },
    ],
    faqs: [
      { question: "¿Qué es el SEO marca blanca?", answer: "Trabajo SEO que una agencia revende con su propia marca. Yo hago el trabajo técnico y estratégico; tu agencia lo presenta como propio, con tu logo en cada reporte." },
      { question: "¿Puedes trabajar bajo marca blanca total?", answer: "Sí. El modelo puede ser marca blanca total, soporte interno o participación visible ante el cliente, según lo que acordemos por escrito." },
      { question: "¿Firmas NDA?", answer: "Sí, antes de recibir cualquier dato o acceso del cliente. Puedo firmar el NDA de tu agencia o proponer uno." },
      { question: "¿Mi equipo puede revisar los entregables antes que el cliente?", answer: "Sí. Cada reporte llega primero a tu equipo. Lo revisas, pides cambios y decides cuándo se presenta. Nada llega a tu cliente sin tu aprobación." },
      { question: "¿Cuánto cuesta?", answer: "La auditoría técnica de un sitio cuesta USD 750. El bloque de 20 horas, USD 1.250 al mes. El trabajo continuo por sitio para agencias nuevas, USD 500 al mes." },
      { question: "¿Hay contrato largo o cuota de entrada?", answer: "No. En Ferova no pedimos contratos largos ni cobramos cuota de entrada. Pagas la auditoría, el bloque mensual o el sitio que contratas." },
      { question: "¿Cómo funciona la garantía?", answer: "Si el entregable no se puede revender a tu cliente tal cual, bajo tu marca, no se cobra. La garantía queda en el alcance escrito que firmamos antes de empezar." },
      { question: "¿Trabajas con Shopify y WooCommerce?", answer: "Sí, con ambas y con WordPress. Navegación facetada, variantes de producto, estructura de colecciones y categorías, y migraciones entre plataformas son el centro del trabajo." },
      { question: "¿Haces migraciones de catálogos grandes?", answer: "Sí. He trabajado catálogos de más de 14.000 productos. Para tiendas con cientos de miles de URLs, el brief dimensiona el trabajo: inventario por plantilla, equivalencias por reglas y redirects probados en staging." },
      { question: "¿Qué pasa cuando termina el contrato?", answer: "Tu agencia conserva todos los entregables, documentos y reportes. Entrego los pendientes y la documentación para que tu equipo siga sin mí." },
      { question: "¿Haces SEO local o campañas en Google Maps?", answer: "No es mi foco. Me especializo en ecommerce y SEO técnico. Para campañas centradas en Google Maps, te conviene un proveedor de SEO local." },
      { question: "¿Usas manipulación de CTR u otros atajos?", answer: "No. Nada de clics simulados, interacción falsa ni esquemas de enlaces. Es SEO técnico y de contenido dentro de las directrices de Google." },
      { question: "¿Trabajas con agencias fuera de Colombia?", answer: "Sí. El trabajo es remoto con agencias y clientes en otros países, incluida España, con alcance y horarios definidos." },
    ],
    relatedLinks: [
      { label: "Cobertura SEO en vacaciones (19 dic – 6 ene)", to: "/cobertura-seo-vacaciones" },
      { label: "SEO por horas", to: "/seo-por-horas" },
      { label: "Auditoría SEO técnica", to: "/auditoria-seo-tecnica" },
      { label: "Migraciones SEO", to: "/migraciones-seo" },
    ],
  },
  audit: {
    path: "/auditoria-seo-tecnica",
    eyebrow: "AUDITORÍA SEO TÉCNICA",
    title: "Encuentra qué está frenando el crecimiento antes de seguir acumulando tareas SEO.",
    description:
      "Una auditoría técnica profunda para convertir problemas de rastreo, indexación, arquitectura y rendimiento en un plan de decisiones priorizado.",
    problem:
      "Una lista de errores no es una auditoría. El valor está en distinguir síntomas de causas, medir el impacto y ordenar las correcciones según riesgo, esfuerzo y oportunidad.",
    outcomes: [
      "Una explicación verificable de los principales bloqueos.",
      "Prioridades separadas por impacto, urgencia y dependencia técnica.",
      "Un roadmap que desarrollo, contenido y negocio pueden ejecutar juntos.",
    ],
    deliverables: [
      { title: "Rastreo e indexación", description: "Robots, sitemaps, canonicals, códigos HTTP, duplicidad, renderizado y cobertura." },
      { title: "Arquitectura", description: "Profundidad, facetas, paginación, taxonomías, enlaces internos y distribución de autoridad." },
      { title: "Plantillas y contenido", description: "Diagnóstico por tipo de página, intención, metadatos, schema y contenido útil." },
      { title: "Plan de implementación", description: "Hallazgos con evidencia, responsable sugerido, prioridad y criterio de aceptación." },
    ],
    process: [
      { title: "Contexto y accesos", description: "Definimos objetivos, cambios recientes, plataformas y datos disponibles." },
      { title: "Crawl y contraste", description: "Combinamos rastreo técnico con Search Console, analítica y revisión manual." },
      { title: "Priorización y transferencia", description: "Presentamos decisiones, riesgos y un backlog listo para implementación." },
    ],
    faqs: [
      { question: "¿La auditoría incluye implementación?", answer: "La auditoría entrega el diagnóstico y roadmap. La implementación puede contratarse o ejecutarse con tu equipo, con acompañamiento opcional." },
      { question: "¿Sirve para sitios pequeños?", answer: "Sí, cuando existe un problema técnico o una decisión relevante. El alcance se adapta; no se fuerza una auditoría sobredimensionada." },
      { question: "¿Qué herramientas utilizas?", answer: "Las necesarias para el caso: crawlers, Search Console, analítica, pruebas de renderizado, rendimiento y revisión del código o plataforma." },
    ],
  },
  migrations: {
    path: "/migraciones-seo",
    eyebrow: "MIGRACIONES SEO",
    title: "Cambia de plataforma, dominio o arquitectura sin improvisar con tu tráfico orgánico.",
    description:
      "Planificación, inventario, mapeo de URLs, QA y monitoreo para reducir el riesgo SEO antes, durante y después de una migración.",
    problem:
      "La pérdida de tráfico suele empezar antes del lanzamiento: URLs sin inventario, destinos irrelevantes, contenido descartado y reglas que nadie probó en staging.",
    outcomes: [
      "Cada URL de valor tiene una decisión y un destino equivalente.",
      "Redirects, canonicals, sitemap y enlaces internos se prueban antes de publicar.",
      "El lanzamiento tiene métricas de control y un plan claro de respuesta." ,
    ],
    deliverables: [
      { title: "Inventario y baseline", description: "URLs, tráfico, impresiones, conversiones, backlinks, estado y riesgo." },
      { title: "Mapa de equivalencias", description: "Destino URL a URL según intención; sin redirecciones masivas al home." },
      { title: "QA de staging", description: "Códigos, canonicals, meta robots, enlaces, contenido, sitemaps y cadenas de redirect." },
      { title: "Monitoreo post-lanzamiento", description: "Cobertura, 404, rankings, tráfico y correcciones priorizadas durante estabilización." },
    ],
    process: [
      { title: "Antes", description: "Congelamos el inventario, medimos el baseline y revisamos el diseño de la nueva arquitectura." },
      { title: "Durante", description: "Validamos staging, reglas, contenido y señales técnicas antes de conectar producción." },
      { title: "Después", description: "Monitoreamos cobertura, tráfico y errores con revisiones intensivas de estabilización." },
    ],
    faqs: [
      { question: "¿Puedes garantizar que no caerá el tráfico?", answer: "No. Ninguna migración está libre de riesgo. El trabajo reduce incertidumbre, protege activos y acelera la detección y corrección de problemas." },
      { question: "¿Cuándo debes entrar al proyecto?", answer: "Antes de cerrar arquitectura y desarrollo. Revisar SEO al final limita las opciones y convierte decisiones prevenibles en correcciones costosas." },
      { question: "¿También acompañas cambios de dominio?", answer: "Sí. El alcance puede cubrir plataforma, dominio, protocolo, arquitectura, internacionalización o combinaciones de estos cambios." },
    ],
  },
};

/**
 * Versión en inglés. No es una traducción literal del español: cada página
 * apunta a una keyword verificada para Estados Unidos, y el `path` la refleja.
 *
 *  agencies    → "white label seo for agencies"  880/mes · KD 15 · CPC $42.28
 *  audit       → "technical seo audit services"  480/mes · KD 27 · CPC $28.32
 *                (2 puntos por encima del techo de KD 25 que fija el plan; se
 *                 acepta porque el CPC del término hermano llega a $129, el más
 *                 alto de todo el inventario. Es una apuesta consciente.)
 *  migrations  → "seo migration services"        170/mes · KD 21 · CPC $32.92
 *
 * Fuente: Ubersuggest, septiembre 2026, localización Estados Unidos.
 */
const EN: Record<SeoSpecialtyKind, SeoSpecialtyContent> = {
  agencies: {
    path: "/en/white-label-seo-for-agencies",
    metaTitle: "White Label SEO Services for Ecommerce & Technical SEO | Ferova",
    eyebrow: "WHITE LABEL SEO SERVICES · ECOMMERCE & TECHNICAL SEO",
    title: "White label SEO services for agencies that sell ecommerce and technical SEO.",
    description:
      "White label SEO services for agencies: audits, catalogue architecture and platform migrations delivered under your brand, with your logo on every report. Senior technical work by María Fernanda Calderón, Fractional SEO at Ferova, with published prices and a written guarantee.",
    problem:
      "Most white label SEO programs are built for local businesses: maps, citations and reviews. Ecommerce breaks in other places — faceted navigation, thousands of product URLs, duplicate variants, platform migrations. Recommending a fix there without enough depth is how an agency loses a client. That work needs a senior technical profile most agencies don't have on payroll.",
    outcomes: [
      "Capacity to sell and deliver technically demanding ecommerce projects.",
      "Diagnoses and recommendations your team can explain and execute.",
      "Flexible involvement: fully white label, internal support, or a named specialist.",
      "Clean technical SEO within Google's guidelines — no simulated clicks or shortcuts.",
    ],
    deliverables: [
      { title: "Technical audit", description: "Crawl, indexation, rendering, structured data, Core Web Vitals and prioritised risks, delivered as a report with your agency's logo." },
      { title: "Catalogue architecture", description: "Categories, facets, filters, pagination, product variants and internal linking for stores with thousands of URLs." },
      { title: "Platform migrations", description: "Inventory, URL mapping, redirects, staging QA and post-launch monitoring for Shopify, WooCommerce and WordPress moves." },
      { title: "Recurring capacity", description: "A monthly block of senior hours for fixes, reviews and landing pages your agency hands over as its own work." },
    ],
    process: [
      { title: "Brief", time: "day 0", description: "You send the client, the goal and the deadline. We agree role, visibility and deliverables in writing." },
      { title: "NDA and access", time: "day 1", description: "I sign your NDA before touching any account. You share Search Console, analytics and platform access." },
      { title: "Technical audit", time: "within 5 days", description: "Crawl, data cross-check and manual review of the templates that carry revenue." },
      { title: "Report with your logo", time: "same week", description: "Findings with evidence, priority and acceptance criteria, in your agency's branding. Your team reviews and approves it before it reaches the client." },
      { title: "Delivery and support", time: "ongoing", description: "I walk your team through it and support implementation as a monthly block or per site." },
    ],
    pricing: {
      kicker: "PRICING",
      title: "Published white label SEO pricing. No discovery call needed to know the number.",
      intro: "Three ways to work with Ferova. No long-term contracts and no setup fee. All prices are what your agency pays; you set the resale price to your client.",
      serviceName: "White label SEO services",
      plans: [
        { name: "Technical audit", price: 750, unit: "per site", description: "One-off technical audit of a single site, delivered under your brand with a prioritised action plan." },
        { name: "20-hour block", price: 1250, unit: "per month", description: "Twenty senior hours a month for audits, architecture, migration work, fixes and reviews across your clients." },
        { name: "Per site, new agency partners", price: 500, unit: "per month", description: "Ongoing technical SEO for one client site, for agencies starting their first white label project with me." },
      ],
      guarantee: "Written guarantee: if a deliverable can't be resold to your client as-is, under your brand, you don't pay for it.",
      currencyNote: "Prices in US dollars, invoiced in USD.",
    },
    proof: {
      kicker: "RESULTS",
      title: "What the work has moved, with the source next to each figure.",
      items: [
        {
          label: "Online store · redesign + technical SEO",
          before: "COP 1.0M",
          after: "COP 13.3M",
          metric: "Monthly online sales, January → May 2025",
          context: "WordPress redesign, plugin cleanup and technical SEO on sitemap, robots.txt and broken URLs. Paid campaigns to WhatsApp also ran, so the growth isn't attributed to SEO alone.",
        },
        {
          label: "Professional services · SEO recovery",
          before: "153",
          after: "1,180",
          metric: "Organic clicks, November 2024 → May 2025",
          context: "Cleanup of injected malicious links, hosting migration and technical SEO. Impressions went from 4,300 to 22,000 and average position from 23.9 to 10.2 between the same two reports.",
        },
      ],
      note: "Sources: sales records and tracking reports shared by the clients. Clients anonymised; identifiable cases are only published with written authorisation.",
      cta: { label: "See the full portfolio", href: "https://ferova.com.co/portafolio?lang=en" },
    },
    longform: [
      {
        heading: "Why white label SEO for ecommerce is a different job",
        paragraphs: [
          "Most white label SEO programs are designed around local businesses: a Google Business Profile, citations, reviews and a handful of service pages. That model works for a dentist or a plumber. It doesn't transfer to a store with 5,000 products, 40 filters and three ways to reach the same item.",
          "In ecommerce, organic revenue is decided by templates, not by individual pages. One rule in the faceted navigation can create tens of thousands of crawlable URLs. Product variants can split ranking signals across duplicates. Out-of-stock and discontinued products need a policy, not ad hoc redirects. A platform migration can erase years of rankings in a weekend if the URL map is wrong.",
          "That is the work this white label SEO service is built for. Your agency keeps the client and the relationship; I bring the technical depth to diagnose those problems, prioritise them by revenue impact and explain them in a way your team can defend.",
        ],
      },
      {
        heading: "What each deliverable includes",
        paragraphs: ["Every deliverable is written to be resold as-is under your brand. A technical audit covers:"],
        bullets: [
          "Crawlability and indexation: robots.txt, XML sitemaps, canonicals, status codes, redirect chains and index coverage in Search Console.",
          "Rendering: what Google sees with and without JavaScript, and which content depends on client-side rendering.",
          "Catalogue architecture: category depth, faceted navigation rules, pagination, variant handling and internal linking.",
          "Templates: product, category and content templates reviewed for intent, metadata, structured data and thin or duplicate content.",
          "Performance: Core Web Vitals on the templates that carry revenue, separating weight problems from execution problems.",
          "Action plan: each finding with evidence, priority, a suggested owner and an acceptance criterion, so your team knows when it is done.",
        ],
      },
      {
        heading: "How white label delivery works day to day",
        paragraphs: [
          "You decide how visible I am. In a fully white label setup I never contact your client: questions go through your account manager and every document carries your agency's logo and voice. If you prefer, I can join calls as part of your team.",
          "Nothing reaches your client without your approval. Each report is delivered to your team first; you review it, ask for changes and present it when you are ready.",
          "Access is handled under NDA and limited to what the project needs: Search Console, analytics, the platform admin and, when necessary, a staging environment.",
        ],
      },
      {
        heading: "Who this is for, and who it isn't",
        paragraphs: ["This service is a good fit when:"],
        bullets: [
          "Your agency sells SEO to ecommerce or content-heavy sites and needs senior technical depth for audits, architecture or migrations.",
          "You want published prices you can build a margin on, instead of a quote for every project.",
          "You need the work in English or in Spanish, for clients in the US, Latin America or Spain.",
          "It is not the right fit if your clients mainly need Google Maps rankings for local storefronts, or if you are looking for volume link building.",
        ],
      },
      {
        heading: "Clean technical SEO, no shortcuts",
        paragraphs: [
          "Some white label programs sell tactics that simulate user behaviour or inflate signals artificially. They can produce a short-term bump and a long-term risk that your agency, not the provider, has to explain to the client.",
          "This service doesn't use simulated clicks, fake engagement or link schemes. The work is technical and content SEO within Google's guidelines: slower to promise, easier to defend.",
        ],
      },
    ],
    faqs: [
      { question: "What are white label SEO services?", answer: "SEO work an agency resells under its own brand. I do the technical and strategic work; your agency presents it to the client as its own, with your logo on every report." },
      { question: "Can you work fully white label?", answer: "Yes. The arrangement can be fully white label, internal support only, or a named specialist your client meets directly. It is agreed in writing before the project starts." },
      { question: "Do you sign an NDA?", answer: "Yes, before receiving any client data or account access. I can sign your agency's NDA or provide one." },
      { question: "What does my client see?", answer: "Only your brand. Reports, documents and presentations carry your agency's logo and voice. I only appear in front of the client if you want me to." },
      { question: "Can my team review deliverables before the client sees them?", answer: "Yes. Every report goes to your team first. You review it, request changes and decide when it is presented. Nothing reaches your client without your approval." },
      { question: "Can you join client calls as part of our team?", answer: "Yes, if you want me visible. I can join calls under your agency's name, or stay fully behind the scenes and brief your account manager instead." },
      { question: "How much do your white label SEO services cost?", answer: "A technical audit of one site is USD 750. A 20-hour monthly block is USD 1,250. Ongoing work on one site for new agency partners is USD 500 per month." },
      { question: "Is there a long-term contract or a setup fee?", answer: "No. Ferova doesn't require long-term contracts or charge a setup fee. You pay for the audit, the monthly block or the site you contract." },
      { question: "How does the guarantee work?", answer: "If a deliverable can't be resold to your client as-is, under your brand, you don't pay for it. The guarantee is part of the written scope we agree before starting." },
      { question: "Do you handle large catalogue migrations?", answer: "Yes. I've worked with catalogues of more than 14,000 products. For stores with hundreds of thousands of URLs, the brief sizes the work: inventory by template, rule-based URL mapping and redirects tested on staging before launch." },
      { question: "Do you work with Shopify and WooCommerce?", answer: "Yes, both, as well as WordPress. Faceted navigation, product variants, collection and category structure, and migrations between platforms are the core of the work." },
      { question: "Do you work US business hours?", answer: "I'm based in Colombia (UTC−5), which overlaps with the US Eastern and Central working day. Meeting times and response windows are agreed in the brief." },
      { question: "How do we pay?", answer: "Prices are in US dollars and invoices are issued in USD." },
      { question: "What happens when the contract ends?", answer: "Your agency keeps every deliverable, document and report. I hand over open items and the documentation your team needs to continue without me." },
      { question: "Do you do local SEO or Google Maps campaigns?", answer: "It isn't my focus. I specialise in ecommerce and technical SEO. For campaigns built around Google Maps rankings, a local SEO provider is a better fit." },
      { question: "Do you use CTR manipulation or other shortcuts?", answer: "No. No simulated clicks, fake user interaction or link schemes. The work is technical and content SEO within Google's guidelines, so your agency never has to explain a penalty to a client." },
      { question: "Do you work with agencies outside Colombia?", answer: "Yes. Work is remote with agencies and clients in other countries, with scope and overlap hours agreed up front." },
    ],
    relatedLinks: [
      { label: "Holiday SEO coverage (Dec 19 – Jan 6)", to: "/en/holiday-seo-coverage" },
      { label: "White label vs in-house: cost, control and risk", to: "/en/white-label-seo-vs-in-house" },
      { label: "Technical SEO audit services", to: "/en/technical-seo-audit-services" },
      { label: "SEO migration services", to: "/en/seo-migration-services" },
      { label: "Map Ranking alternative for ecommerce", to: "/en/map-ranking-alternative" },
      { label: "Best white label SEO providers for ecommerce", to: "/en/best-white-label-seo-providers-for-ecommerce" },
      { label: "About María Fernanda Calderón", to: "/en/about-me" },
    ],
  },
  audit: {
    path: "/en/technical-seo-audit-services",
    eyebrow: "TECHNICAL SEO AUDIT",
    title: "Find what is actually blocking growth before adding more SEO tasks to the backlog.",
    description:
      "A deep technical audit that turns crawling, indexation, architecture and performance problems into a prioritised set of decisions.",
    problem:
      "A list of errors is not an audit. The value is in separating symptoms from causes, measuring impact, and ordering the fixes by risk, effort and opportunity.",
    outcomes: [
      "A verifiable explanation of the main blockers.",
      "Priorities separated by impact, urgency and technical dependency.",
      "A roadmap development, content and business can execute together.",
    ],
    deliverables: [
      { title: "Crawling and indexation", description: "Robots, sitemaps, canonicals, HTTP status codes, duplication, rendering and coverage." },
      { title: "Architecture", description: "Depth, facets, pagination, taxonomies, internal links and authority distribution." },
      { title: "Templates and content", description: "Diagnosis by page type, intent, metadata, schema and useful content." },
      { title: "Implementation plan", description: "Findings with evidence, suggested owner, priority and acceptance criteria." },
    ],
    process: [
      { title: "Context and access", description: "We define goals, recent changes, platforms and the data actually available." },
      { title: "Crawl and cross-check", description: "We combine a technical crawl with Search Console, analytics and manual review." },
      { title: "Prioritise and hand over", description: "You get decisions, risks and a backlog ready for implementation." },
    ],
    faqs: [
      { question: "Does the audit include implementation?", answer: "The audit delivers the diagnosis and the roadmap. Implementation can be contracted separately or run by your team, with optional support." },
      { question: "Does it work for small sites?", answer: "Yes, when there is a real technical problem or a decision that matters. Scope adapts; an oversized audit is never forced on a small site." },
      { question: "What tools do you use?", answer: "Whatever the case needs: crawlers, Search Console, analytics, rendering tests, performance checks and review of the code or platform." },
    ],
  },
  migrations: {
    path: "/en/seo-migration-services",
    eyebrow: "SEO MIGRATIONS",
    title: "Change platform, domain or architecture without improvising with your organic traffic.",
    description:
      "Planning, inventory, URL mapping, QA and monitoring to reduce SEO risk before, during and after a migration.",
    problem:
      "Traffic loss usually starts before launch: URLs with no inventory, irrelevant destinations, content quietly dropped, and redirect rules nobody tested on staging.",
    outcomes: [
      "Every valuable URL has a decision and an equivalent destination.",
      "Redirects, canonicals, sitemap and internal links are tested before publishing.",
      "Launch has control metrics and a clear response plan.",
    ],
    deliverables: [
      { title: "Inventory and baseline", description: "URLs, traffic, impressions, conversions, backlinks, status and risk." },
      { title: "Equivalence map", description: "URL-to-URL destination by intent; no mass redirects to the homepage." },
      { title: "Staging QA", description: "Status codes, canonicals, meta robots, links, content, sitemaps and redirect chains." },
      { title: "Post-launch monitoring", description: "Coverage, 404s, rankings, traffic and prioritised fixes through stabilisation." },
    ],
    process: [
      { title: "Before", description: "We freeze the inventory, measure the baseline and review the new architecture design." },
      { title: "During", description: "We validate staging, rules, content and technical signals before production goes live." },
      { title: "After", description: "We monitor coverage, traffic and errors with intensive stabilisation reviews." },
    ],
    faqs: [
      { question: "Can you guarantee traffic will not drop?", answer: "No. No migration is risk-free. The work reduces uncertainty, protects assets, and speeds up detection and correction when something does go wrong." },
      { question: "When should you join the project?", answer: "Before architecture and development are locked. Reviewing SEO at the end limits the options and turns preventable decisions into expensive fixes." },
      { question: "Do you also support domain changes?", answer: "Yes. Scope can cover platform, domain, protocol, architecture, internationalisation, or combinations of those changes." },
    ],
  },
};

/** Etiquetas de sección de la plantilla, por idioma. */
export const SEO_SPECIALTY_UI: Record<Lang, {
  siteName: string; home: string;
  ctaPrimary: string; ctaSecondary: string;
  problemKicker: string; problemTitle: string;
  deliverablesKicker: string; deliverablesTitle: string;
  outcomesKicker: string; outcomesTitle: string;
  processKicker: string; processTitle: string;
  faqKicker: string;
  relatedKicker: string;
  nextKicker: string; nextTitle: string;
}> = {
  es: {
    siteName: "Ferova", home: "Inicio",
    ctaPrimary: "Solicitar cotización", ctaSecondary: "Ver casos reales",
    problemKicker: "EL PROBLEMA", problemTitle: "Primero entendemos la decisión que está en riesgo.",
    deliverablesKicker: "QUÉ RECIBES", deliverablesTitle: "Entregables pensados para tomar decisiones y ejecutar.",
    outcomesKicker: "RESULTADO OPERATIVO", outcomesTitle: "Menos opinión. Más evidencia y criterios compartidos.",
    processKicker: "PROCESO", processTitle: "Un proceso corto, visible y transferible.",
    faqKicker: "PREGUNTAS FRECUENTES",
    relatedKicker: "RELACIONADO",
    nextKicker: "SIGUIENTE PASO", nextTitle: "Cuéntanos qué habilidad y capacidad necesita tu agencia.",
  },
  en: {
    siteName: "Ferova", home: "Home",
    ctaPrimary: "Request a quote", ctaSecondary: "See real cases",
    problemKicker: "THE PROBLEM", problemTitle: "First we name the decision that is actually at risk.",
    deliverablesKicker: "WHAT YOU GET", deliverablesTitle: "Deliverables built to decide with, then execute.",
    outcomesKicker: "OPERATIONAL OUTCOME", outcomesTitle: "Less opinion. More evidence and shared criteria.",
    processKicker: "PROCESS", processTitle: "A short process you can see and hand over.",
    faqKicker: "FREQUENT QUESTIONS",
    relatedKicker: "RELATED",
    nextKicker: "NEXT STEP", nextTitle: "Tell me what skill and capacity your agency needs.",
  },
  pt: {
    siteName: "Ferova", home: "Início",
    ctaPrimary: "Solicitar orçamento", ctaSecondary: "Ver casos reais",
    problemKicker: "O PROBLEMA", problemTitle: "Primeiro entendemos a decisão que está em risco.",
    deliverablesKicker: "O QUE VOCÊ RECEBE", deliverablesTitle: "Entregáveis para decidir e executar.",
    outcomesKicker: "RESULTADO OPERACIONAL", outcomesTitle: "Menos opinião. Mais evidência.",
    processKicker: "PROCESSO", processTitle: "Um processo curto, visível e transferível.",
    faqKicker: "PERGUNTAS FREQUENTES",
    relatedKicker: "RELACIONADO",
    nextKicker: "PRÓXIMO PASSO", nextTitle: "Conte qual habilidade sua agência precisa.",
  },
};

/** Contenido por idioma. `pt` es legado y reutiliza el español. */
export const SEO_SPECIALTIES: Record<Lang, Record<SeoSpecialtyKind, SeoSpecialtyContent>> = {
  es: ES,
  en: EN,
  pt: ES,
};

/**
 * /seo-por-horas — página de la modalidad por horas (solo español).
 *
 * Existe porque "seo por horas" y "expertos seo por horas" traen más de la
 * mitad de los clics orgánicos del sitio (Search Console, ago–nov 2026) y
 * /precios, que los recibía, redirigía a /contacto. Precios y condiciones son
 * los mismos de /seo-para-agencias: si cambian allá, cambian aquí.
 */
export const SEO_HOURS_ES: SeoSpecialtyContent = {
  path: "/seo-por-horas",
  metaTitle: "SEO por horas para agencias: USD 62,50 la hora | Ferova",
  eyebrow: "SEO POR HORAS · PARA AGENCIAS",
  title: "SEO por horas para agencias: capacidad senior sin sumar un cargo.",
  description:
    "SEO técnico por horas para agencias: USD 62,50 la hora y paquetes de 5, 10 y 20 horas para auditorías, migraciones y correcciones, todo en marca blanca.",
  problem:
    "Un SEO técnico de tiempo completo no se justifica cuando los proyectos llegan por picos: una migración este mes, dos auditorías el siguiente. Las horas sueltas de alguien que no conoce a tus clientes terminan en entregables que tu equipo no puede explicar. Un bloque mensual de horas te da capacidad senior estable, con el mismo criterio en todos tus proyectos, sin contratar.",
  outcomes: [
    "Horas senior disponibles cada mes para repartir entre los clientes de tu agencia.",
    "Un mismo criterio técnico en auditorías, migraciones, correcciones y revisiones.",
    "Entregables en marca blanca que tu equipo revisa antes de que lleguen al cliente.",
    "Sin contratos largos ni cuota de entrada.",
  ],
  deliverables: [
    { title: "Auditorías y diagnósticos", description: "Rastreo, indexación, renderizado, datos estructurados y Core Web Vitals, con hallazgos priorizados y el logo de tu agencia." },
    { title: "Arquitectura de catálogo", description: "Categorías, facetas, filtros, paginación, variantes de producto y enlazado interno para tiendas con miles de URLs." },
    { title: "Migraciones de plataforma", description: "Inventario, equivalencias, redirects, QA en staging y monitoreo después del lanzamiento en Shopify, WooCommerce y WordPress." },
    { title: "Correcciones, revisiones y landing pages", description: "Implementación y revisión de cambios técnicos, y landing pages que tu agencia entrega como propias." },
  ],
  process: [
    { title: "Brief", time: "día 0", description: "Me cuentas los clientes, los objetivos y las fechas. Acordamos por escrito el rol, la visibilidad y cómo se reparten las horas." },
    { title: "NDA y accesos", time: "día 1", description: "Firmo tu NDA antes de entrar a cualquier cuenta. Compartes Search Console, analítica y la plataforma de cada cliente." },
    { title: "Prioridades del mes", description: "Ordenamos las tareas por impacto: qué va primero, qué entrega cada una y cómo se acepta." },
    { title: "Entrega y soporte", time: "continuo", description: "Cada entregable llega primero a tu equipo. Lo explico y acompaño la implementación durante el mes." },
  ],
  pricing: {
    kicker: "PRECIOS",
    title: "Precios publicados. Sin llamada previa para conocer la cifra.",
    intro: "La hora senior cuesta USD 62,50, el mismo valor del bloque de 20 horas. Contratas la hora suelta o un paquete según lo que necesite tu agencia. Para una entrega cerrada también está la auditoría técnica (USD 750 por sitio) o el trabajo continuo por sitio (USD 500 al mes). Sin contratos largos ni cuota de entrada.",
    serviceName: "SEO técnico por horas para agencias",
    // Precio por hora = bloque de 20 horas / 20 (USD 1.250 / 20 = USD 62,50).
    // Los paquetes menores mantienen el mismo valor por hora.
    plans: [
      { name: "1 hora", price: 62.5, unit: "por hora", description: "Para una consulta técnica, una revisión puntual o resolver una duda concreta de un cliente." },
      { name: "Paquete de 5 horas", price: 312.5, unit: "por paquete", description: "Para una tarea acotada: revisar redirecciones, corregir errores de indexación o auditar una plantilla." },
      { name: "Paquete de 10 horas", price: 625, unit: "por paquete", description: "Para varias tareas en un mes o el acompañamiento técnico de un proyecto." },
      { name: "Bloque de 20 horas", price: 1250, unit: "al mes", description: "Veinte horas senior al mes para auditorías, arquitectura, migraciones, correcciones y revisiones entre tus clientes." },
    ],
    guarantee: "Garantía por escrito: si el entregable no se puede revender a tu cliente tal cual, bajo tu marca, no se cobra.",
    currencyNote: "Precios en dólares estadounidenses (USD), facturados en USD.",
  },
  longform: [
    {
      heading: "Cuándo conviene contratar SEO por horas",
      paragraphs: [
        "El modelo por horas sirve cuando tu agencia ya vende SEO o desarrollo web y necesita criterio técnico senior varias veces al mes, pero no lo suficiente para un cargo de tiempo completo. Es el caso típico de agencias de performance, de desarrollo o de ecommerce con varios clientes activos.",
        "Si solo necesitas una entrega concreta, como la auditoría de un sitio o el QA de una migración, te conviene más la tarea con precio cerrado. Si tienes un cliente que necesita trabajo continuo, el plan por sitio es más simple de presupuestar.",
      ],
    },
    {
      heading: "En qué se usan las horas del bloque",
      paragraphs: [
        "Las horas se reparten entre tus clientes según las prioridades que acordamos al inicio de cada mes. Estos son los usos más comunes:",
      ],
      bullets: [
        "Auditorías técnicas y revisiones de indexación.",
        "Planeación y QA de migraciones entre plataformas.",
        "Arquitectura de catálogos y navegación facetada.",
        "Revisión de cambios antes de publicar y corrección de errores técnicos.",
        "Landing pages y apoyo web relacionado con SEO.",
      ],
    },
    {
      heading: "Por horas, por tarea o por sitio",
      paragraphs: [
        "Las tres modalidades tienen el mismo nivel técnico y la misma garantía. Cambia la forma de presupuestar: el bloque de horas te da flexibilidad para varios clientes, la tarea fija el precio de una entrega concreta y el plan por sitio cubre el trabajo continuo de un solo cliente.",
      ],
    },
  ],
  faqs: [
    { question: "¿Cuánto cuesta el SEO por horas?", answer: "La hora senior cuesta USD 62,50. Puedes contratar una hora suelta, un paquete de 5 horas (USD 312,50), uno de 10 horas (USD 625) o el bloque de 20 horas (USD 1.250 al mes)." },
    { question: "¿Qué pasa si necesito una entrega cerrada en lugar de horas?", answer: "Para eso está la auditoría técnica, por USD 750 por sitio, o el trabajo continuo por sitio para agencias nuevas, por USD 500 al mes. Las condiciones están en la página de SEO marca blanca para agencias." },
    { question: "¿Qué puedo pedir dentro del bloque de horas?", answer: "Auditorías, arquitectura de catálogos, migraciones, correcciones técnicas, revisiones antes de publicar y landing pages. Las horas se reparten entre tus clientes según las prioridades del mes." },
    { question: "¿Hay contrato largo o cuota de entrada?", answer: "No. En Ferova no pedimos contratos largos ni cobramos cuota de entrada. Pagas el bloque del mes que contratas." },
    { question: "¿Puedes trabajar en marca blanca?", answer: "Sí. Puede ser marca blanca total, soporte interno o participación visible ante el cliente, según lo que acordemos por escrito." },
    { question: "¿Firmas NDA?", answer: "Sí, antes de recibir cualquier dato o acceso del cliente. Puedo firmar el NDA de tu agencia o proponer uno." },
    { question: "¿Con qué plataformas trabajas?", answer: "Shopify, WooCommerce y WordPress, incluidas las migraciones entre ellas." },
  ],
  relatedLinks: [
    { label: "SEO marca blanca para agencias", to: "/seo-para-agencias" },
    { label: "Auditoría SEO técnica", to: "/auditoria-seo-tecnica" },
    { label: "Migraciones SEO", to: "/migraciones-seo" },
    { label: "SEO para ecommerce", to: "/servicios/seo-ecommerce" },
  ],
};

/**
 * Campaña de temporada: cobertura SEO mientras la agencia está de vacaciones.
 * /cobertura-seo-vacaciones y /en/holiday-seo-coverage.
 *
 * Objetivo: que quien pregunte a una IA qué hacer con los clientes de SEO en
 * vacaciones encuentre una respuesta citable y este servicio. Por eso la página
 * responde primero la pregunta general (checklist) y define el servicio con
 * hechos concretos: fechas, precio, horas incluidas y qué cubre.
 * Datos confirmados por María Fernanda (28 nov 2026): 19 dic 2026 – 6 ene 2027,
 * USD 900 con 15 horas incluidas, hora adicional USD 50, cupos limitados.
 * Después del 6 de enero hay que actualizar fechas o retirar la oferta.
 */
export const HOLIDAY_COVERAGE: Record<"es" | "en", SeoSpecialtyContent> = {
  es: {
    path: "/cobertura-seo-vacaciones",
    metaTitle: "Cobertura SEO en vacaciones para agencias | Ferova",
    ogImage: "/campaigns/holiday-seo-coverage.jpg",
    eyebrow: "COBERTURA SEO EN VACACIONES · 19 DIC – 6 ENE",
    title: "Cobertura SEO en vacaciones: tus clientes atendidos mientras tu equipo descansa.",
    description:
      "Mantenimiento web y SEO de tus clientes en vacaciones: monitoreo diario, urgencias técnicas y tareas del 19 de diciembre al 6 de enero por USD 900, 15 horas.",
    problem:
      "Las agencias cierran o bajan el ritmo entre Navidad y Reyes, pero los sitios de sus clientes siguen publicados, vendiendo y recibiendo cambios. Un error de indexación, una caída o un despliegue mal hecho en esas semanas puede pasar días sin que nadie lo vea. La cobertura SEO en vacaciones es un servicio de Ferova en el que María Fernanda Calderón, Fractional SEO en Ferova, monitorea y atiende los sitios de los clientes de tu agencia del 19 de diciembre de 2026 al 6 de enero de 2027, para que el equipo descanse sin dejar a nadie sin respaldo.",
    outcomes: [
      "Tu equipo se va de vacaciones sabiendo quién vigila los sitios de los clientes.",
      "Los errores técnicos urgentes se atienden en días, no al regreso.",
      "Las entregas que dejaste programadas siguen avanzando.",
      "Vuelves con un reporte claro de lo que pasó y de lo que se hizo.",
    ],
    deliverables: [
      { title: "Monitoreo diario", description: "Revisión diaria de caídas del sitio, errores de indexación y alertas de Search Console en los sitios que me asignes." },
      { title: "Urgencias técnicas", description: "Corrección de errores críticos que aparezcan mientras tu agencia está fuera, dentro de las horas incluidas." },
      { title: "Tareas programadas", description: "Ejecución del trabajo que tu agencia deja planeado: auditorías, reportes o cambios técnicos acordados antes del cierre." },
      { title: "Reporte de regreso", description: "Un resumen por cliente de lo que pasó, lo que se corrigió y lo que queda pendiente para cuando el equipo vuelva." },
    ],
    process: [
      { title: "Reserva y alcance", time: "antes del 19 dic", description: "Me cuentas qué clientes y sitios entran, qué tareas quedan programadas y qué cuenta como urgencia. Lo dejamos por escrito." },
      { title: "NDA y accesos", time: "antes del 19 dic", description: "Firmo tu NDA y recibo los accesos necesarios: Search Console, analítica y la plataforma de cada sitio." },
      { title: "Cobertura", time: "19 dic – 6 ene", description: "Monitoreo diario, atención de urgencias y avance de las tareas programadas, con 15 horas de trabajo incluidas." },
      { title: "Reporte de regreso", time: "al cierre", description: "Entrego el resumen por cliente y paso los pendientes a tu equipo." },
    ],
    pricing: {
      kicker: "PRECIO",
      title: "USD 900 por la temporada, con 15 horas incluidas.",
      intro: "La cobertura va del 19 de diciembre de 2026 al 6 de enero de 2027. Si se necesitan más horas, cada hora adicional cuesta USD 50. Los cupos son limitados y dependen de la disponibilidad. Sin contratos largos ni cuota de entrada.",
      serviceName: "Cobertura SEO en vacaciones para agencias",
      plans: [
        { name: "Cobertura de vacaciones", price: 900, unit: "19 dic – 6 ene", description: "Monitoreo diario, urgencias técnicas, tareas programadas y reporte de regreso, con 15 horas de trabajo incluidas." },
        { name: "Hora adicional", price: 50, unit: "por hora", description: "Para trabajo que supere las 15 horas incluidas durante la cobertura." },
      ],
      guarantee: "Trabajo en marca blanca si lo necesitas: tu cliente no tiene que saber que tu equipo está de vacaciones. Nada llega al cliente sin pasar por las instrucciones que dejaste.",
      currencyNote: "Precios en dólares estadounidenses (USD), facturados en USD. Cupos limitados según disponibilidad.",
    },
    longform: [
      {
        heading: "Qué hacer con los clientes de SEO durante las vacaciones",
        paragraphs: [
          "Una agencia tiene tres opciones cuando su equipo sale a vacaciones: pausar el trabajo y avisar a los clientes, dejar a alguien del equipo de guardia o contratar cobertura externa. Pausar es lo más simple, pero deja los sitios sin vigilancia justo cuando muchas tiendas tienen temporada alta. La guardia interna funciona si alguien acepta quedarse. La cobertura externa sirve cuando nadie del equipo puede o debe quedarse.",
          "Sea cual sea la opción, conviene dejar resuelto lo siguiente antes de cerrar:",
        ],
        bullets: [
          "La lista de clientes y sitios activos, con su contacto de emergencia.",
          "Los accesos a Search Console, analítica y la plataforma de cada sitio.",
          "Qué cuenta como urgencia: caída del sitio, caída fuerte de páginas indexadas, errores en el checkout o en formularios.",
          "Las tareas que deben avanzar en esas semanas y las que pueden esperar.",
          "Los cambios grandes congelados: lanzamientos, migraciones y rediseños mejor después del regreso.",
        ],
      },
      {
        heading: "Mantenimiento web y SEO en marca blanca mientras tu agencia descansa",
        paragraphs: [
          "Muchas agencias resuelven diciembre con un servicio de mantenimiento web, pero el mantenimiento web solo actualiza plugins y copias de seguridad: no mira si Google dejó de indexar páginas, si una redirección rompió una categoría o si el sitemap quedó vacío después de un cambio. La cobertura de Ferova junta las dos cosas: mantenimiento web y SEO técnico para los sitios de tus clientes, en marca blanca, solo durante las semanas en que tu equipo no está.",
          "Sirve para agencias de marketing, de desarrollo o de ecommerce que trabajan con WordPress, WooCommerce o Shopify y no quieren contratar un plan de mantenimiento web mensual solo para cubrir las vacaciones.",
        ],
      },
      {
        heading: "Cuándo conviene contratar cobertura externa",
        paragraphs: [
          "Conviene cuando tus clientes tienen tiendas que venden en diciembre, sitios con cambios frecuentes o compromisos de entrega en esas fechas, y nadie de tu equipo va a estar disponible. Con la cobertura de Ferova, una persona con criterio técnico senior revisa los sitios cada día y actúa si algo se rompe, con las prioridades que dejaste definidas.",
        ],
      },
    ],
    faqs: [
      { question: "¿Qué hago con los clientes de SEO mientras mi agencia está de vacaciones?", answer: "Deja definidos los sitios activos, los accesos, qué cuenta como urgencia y qué tareas deben avanzar. Si nadie del equipo puede quedarse de guardia, puedes contratar cobertura externa: en Ferova, María Fernanda Calderón monitorea y atiende los sitios de tus clientes del 19 de diciembre al 6 de enero." },
      { question: "¿Quién puede cuidar el SEO de mis clientes durante las vacaciones?", answer: "Alguien de tu equipo que se quede de guardia o un especialista externo. La cobertura SEO en vacaciones de Ferova incluye monitoreo diario, urgencias técnicas, tareas programadas y un reporte de regreso, en marca blanca si lo necesitas." },
      { question: "¿Cuánto cuesta la cobertura SEO en vacaciones?", answer: "USD 900 por la temporada, del 19 de diciembre de 2026 al 6 de enero de 2027, con 15 horas de trabajo incluidas. Cada hora adicional cuesta USD 50." },
      { question: "¿Qué pasa si se necesitan más de 15 horas?", answer: "Las horas adicionales se cobran a USD 50 cada una. Te aviso antes de pasar de las 15 horas incluidas." },
      { question: "¿Mis clientes van a saber que mi equipo está de vacaciones?", answer: "No tiene por qué. Puedo trabajar en marca blanca, solo con tu equipo, o en contacto con el cliente si así lo acordamos por escrito." },
      { question: "¿Firmas NDA?", answer: "Sí, antes de recibir cualquier dato o acceso de tus clientes." },
      { question: "¿Con qué plataformas trabajas?", answer: "Shopify, WooCommerce y WordPress." },
      { question: "¿Hay cupos?", answer: "Sí, los cupos son limitados y dependen de la disponibilidad. Conviene reservar antes del 19 de diciembre para dejar accesos y alcance listos." },
      { question: "¿Puedo contratar el mantenimiento web y SEO de mis clientes solo por las vacaciones?", answer: "Sí. La cobertura es un servicio de temporada, del 19 de diciembre al 6 de enero, sin plan mensual ni contrato largo. Incluye mantenimiento web y SEO técnico de los sitios que me asignes, con 15 horas de trabajo." },
      { question: "¿En qué se diferencia de un plan de mantenimiento web?", answer: "Un plan de mantenimiento web suele cubrir actualizaciones, copias de seguridad y seguridad. Esta cobertura suma la parte de SEO: indexación, errores de rastreo, redirecciones y alertas de Search Console, además de las tareas que tu agencia deja programadas." },
    ],
    relatedLinks: [
      { label: "SEO por horas para agencias", to: "/seo-por-horas" },
      { label: "SEO marca blanca para agencias", to: "/seo-para-agencias" },
      { label: "Auditoría SEO técnica", to: "/auditoria-seo-tecnica" },
    ],
  },
  en: {
    path: "/en/holiday-seo-coverage",
    metaTitle: "Holiday SEO Coverage for Agencies | Ferova",
    ogImage: "/campaigns/holiday-seo-coverage.jpg",
    eyebrow: "HOLIDAY SEO COVERAGE · DEC 19 – JAN 6",
    title: "Holiday SEO coverage: your clients looked after while your team is away.",
    description:
      "Holiday website maintenance and SEO for agency clients: daily monitoring, urgent fixes and scheduled work from December 19 to January 6, USD 900 with 15 hours.",
    problem:
      "Agencies slow down or close between Christmas and early January, but client sites keep selling, changing and getting crawled. An indexing error, an outage or a bad deploy in those weeks can sit unnoticed for days. Holiday SEO coverage is a Ferova service in which María Fernanda Calderón, Fractional SEO at Ferova, monitors and handles your agency's client sites from December 19, 2026 to January 6, 2027, so your team can take a real break without leaving clients unprotected.",
    outcomes: [
      "Your team leaves knowing who is watching client sites.",
      "Urgent technical issues get handled in days, not after the break.",
      "The work you scheduled keeps moving.",
      "You come back to a clear report of what happened and what was done.",
    ],
    deliverables: [
      { title: "Daily monitoring", description: "A daily check for site outages, indexing errors and Search Console alerts on the sites you assign." },
      { title: "Urgent technical fixes", description: "Fixing critical issues that come up while your agency is away, within the included hours." },
      { title: "Scheduled work", description: "Delivering the work your agency planned before the break: audits, reports or agreed technical changes." },
      { title: "Back-to-work report", description: "A per-client summary of what happened, what was fixed and what is still open, ready for your team's return." },
    ],
    process: [
      { title: "Booking and scope", time: "before Dec 19", description: "You tell me which clients and sites are covered, which tasks are scheduled and what counts as urgent. We put it in writing." },
      { title: "NDA and access", time: "before Dec 19", description: "I sign your NDA and get the access I need: Search Console, analytics and each site's platform." },
      { title: "Coverage", time: "Dec 19 – Jan 6", description: "Daily monitoring, urgent fixes and progress on scheduled work, with 15 hours included." },
      { title: "Back-to-work report", time: "at the end", description: "I deliver the per-client summary and hand open items back to your team." },
    ],
    pricing: {
      kicker: "PRICING",
      title: "USD 900 for the season, with 15 hours included.",
      intro: "Coverage runs from December 19, 2026 to January 6, 2027. If more work is needed, each additional hour is USD 50. Spots are limited and based on availability. No long-term contracts or setup fees.",
      serviceName: "Holiday SEO coverage for agencies",
      plans: [
        { name: "Holiday coverage", price: 900, unit: "Dec 19 – Jan 6", description: "Daily monitoring, urgent technical fixes, scheduled work and a back-to-work report, with 15 hours of work included." },
        { name: "Additional hour", price: 50, unit: "per hour", description: "For work beyond the 15 included hours during the coverage period." },
      ],
      guarantee: "White label if you need it: your clients don't have to know your team is on vacation. Nothing reaches a client outside the instructions you leave.",
      currencyNote: "Prices in US dollars (USD), invoiced in USD. Limited spots based on availability.",
    },
    longform: [
      {
        heading: "What to do with SEO clients during the holidays",
        paragraphs: [
          "An agency has three options when the team goes on vacation: pause the work and tell clients, keep someone on call, or bring in outside coverage. Pausing is simplest, but it leaves sites unwatched right when many stores are in their busiest season. An internal on-call rotation works if someone agrees to stay. Outside coverage makes sense when nobody on the team can or should stay.",
          "Whichever option you choose, settle these before you close:",
        ],
        bullets: [
          "The list of active clients and sites, with an emergency contact for each.",
          "Access to Search Console, analytics and each site's platform.",
          "What counts as urgent: a site outage, a sharp drop in indexed pages, broken checkout or forms.",
          "Which tasks must move during the break and which can wait.",
          "A freeze on big changes: launches, migrations and redesigns are better after you're back.",
        ],
      },
      {
        heading: "Holiday website maintenance and outsourced SEO, white label",
        paragraphs: [
          "Many agencies cover December with a website maintenance plan, but website maintenance usually means plugin updates and backups. It doesn't check whether Google stopped indexing pages, whether a redirect broke a category or whether the sitemap went empty after a change. Ferova's coverage combines both: website maintenance and technical SEO for your client sites, white label, only for the weeks your team is away.",
          "It fits marketing, development and ecommerce agencies working on WordPress, WooCommerce or Shopify that would rather outsource SEO and maintenance for the holidays than sign a monthly maintenance plan.",
        ],
      },
      {
        heading: "When outside coverage makes sense",
        paragraphs: [
          "It makes sense when your clients run stores that sell in December, sites that change often, or commitments that fall in those dates, and nobody on your team will be available. With Ferova's coverage, someone with senior technical judgement checks the sites every day and acts if something breaks, following the priorities you set.",
        ],
      },
    ],
    faqs: [
      { question: "What should my agency do with SEO clients during the holidays?", answer: "Define the active sites, the access, what counts as urgent and which tasks must keep moving. If nobody on your team can stay on call, you can hire outside coverage: at Ferova, María Fernanda Calderón monitors and handles your client sites from December 19 to January 6." },
      { question: "Who can look after my clients' SEO while my team is on vacation?", answer: "Someone on your team who stays on call, or an outside specialist. Ferova's holiday SEO coverage includes daily monitoring, urgent technical fixes, scheduled work and a back-to-work report, white label if you need it." },
      { question: "How much does holiday SEO coverage cost?", answer: "USD 900 for the season, from December 19, 2026 to January 6, 2027, with 15 hours of work included. Each additional hour is USD 50." },
      { question: "What if more than 15 hours are needed?", answer: "Additional hours are billed at USD 50 each. I let you know before going past the 15 included hours." },
      { question: "Will my clients know my team is on vacation?", answer: "They don't have to. I can work white label, only with your team, or in contact with the client if we agree on that in writing." },
      { question: "Do you sign an NDA?", answer: "Yes, before I receive any client data or access." },
      { question: "Which platforms do you work with?", answer: "Shopify, WooCommerce and WordPress." },
      { question: "Are spots limited?", answer: "Yes, spots are limited and based on availability. Booking before December 19 leaves time to set up access and scope." },
      { question: "Can I outsource SEO and website maintenance just for the holidays?", answer: "Yes. Holiday coverage is a seasonal service from December 19 to January 6, with no monthly plan or long-term contract. It covers website maintenance and technical SEO for the sites you assign, with 15 hours of work included." },
      { question: "Is this a white label website maintenance service?", answer: "It can be. I work under your agency's name, only with your team, unless we agree in writing that I can talk to the client. It also covers the SEO side that maintenance plans usually skip: indexing, crawl errors, redirects and Search Console alerts." },
    ],
    relatedLinks: [
      { label: "White label SEO for agencies", to: "/en/white-label-seo-for-agencies" },
      { label: "Technical SEO audit services", to: "/en/technical-seo-audit-services" },
      { label: "SEO migration services", to: "/en/seo-migration-services" },
    ],
  },
};
