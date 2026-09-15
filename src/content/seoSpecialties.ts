import type { Lang } from "@/config/routes";

export type SeoSpecialtyKind = "agencies" | "audit" | "migrations";

export type SeoSpecialtyContent = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  problem: string;
  outcomes: string[];
  deliverables: { title: string; description: string }[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
};

const ES: Record<SeoSpecialtyKind, SeoSpecialtyContent> = {
  agencies: {
    path: "/seo-para-agencias",
    eyebrow: "PARTNER SEO SENIOR · WHITE LABEL",
    title: "La capacidad SEO senior que tu agencia necesita sin ampliar su nómina.",
    description:
      "Acompaño a agencias que necesitan resolver auditorías, arquitectura, ecommerce y migraciones complejas bajo su marca o como especialista visible ante el cliente.",
    problem:
      "Cuando el proyecto supera el SEO operativo, el riesgo no es solo retrasarse: es recomendar una migración, una arquitectura o una solución técnica sin suficiente profundidad para defenderla.",
    outcomes: [
      "Más capacidad para asumir proyectos técnicamente exigentes.",
      "Diagnósticos y recomendaciones que el equipo puede explicar y ejecutar.",
      "Participación flexible: white label, soporte interno o especialista ante cliente.",
    ],
    deliverables: [
      { title: "Auditoría y diagnóstico", description: "Crawl, indexación, arquitectura, renderizado, datos estructurados y riesgos priorizados." },
      { title: "Arquitectura y estrategia", description: "Decisiones sobre categorías, facetas, enlazado interno, contenido y crecimiento orgánico." },
      { title: "Soporte en migraciones", description: "Inventario, equivalencias, redirects, QA y monitoreo para proteger activos orgánicos." },
      { title: "Capacidad web recurrente", description: "Mantenimiento mensual, correcciones y landing pages listas para que la agencia entregue a sus clientes." },
    ],
    process: [
      { title: "Alineamos el alcance", description: "Definimos rol, confidencialidad, entregables, interlocutores y nivel de exposición." },
      { title: "Diagnóstico basado en evidencia", description: "Trabajamos con datos, crawls, Search Console y contexto técnico real." },
      { title: "Transferimos decisiones", description: "El equipo recibe prioridades, criterios y soporte para ejecutar sin dependencia permanente." },
    ],
    faqs: [
      { question: "¿Puedes trabajar bajo marca blanca?", answer: "Sí. El modelo puede ser completamente white label, soporte interno o participación visible, según el acuerdo con la agencia." },
      { question: "¿Qué habilidades puede contratar una agencia?", answer: "SEO técnico, auditorías, migraciones, SEO para ecommerce, mantenimiento web mensual y diseño o desarrollo de landing pages." },
      { question: "¿Cómo se define el precio?", answer: "El precio se prepara según la habilidad, la plataforma, el número de clientes o entregables, la fecha y la modalidad de colaboración. Puede cotizarse por proyecto, volumen, bolsa de horas o capacidad mensual." },
      { question: "¿Qué experiencia se puede presentar al cliente final?", answer: "Antes de contratar se comparte experiencia relevante sin revelar información confidencial. Los casos identificables, cifras y marcas solo se usan con autorización escrita." },
      { question: "¿Trabajas con agencias fuera de Colombia?", answer: "Sí. El trabajo puede realizarse de forma remota con equipos y clientes en distintos países, con alcance y horarios definidos." },
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
    eyebrow: "SENIOR SEO PARTNER · WHITE LABEL",
    title: "The senior SEO capacity your agency needs without adding to payroll.",
    description:
      "I work with agencies that need audits, architecture, ecommerce and complex migrations resolved under their brand — or as a named specialist in front of their client.",
    problem:
      "When a project outgrows operational SEO, the risk isn't only falling behind. It's recommending a migration, an architecture or a technical fix without enough depth to defend it when the client pushes back.",
    outcomes: [
      "Capacity to take on technically demanding projects.",
      "Diagnoses and recommendations your team can explain and execute.",
      "Flexible involvement: white label, internal support, or visible specialist.",
    ],
    deliverables: [
      { title: "Audit and diagnosis", description: "Crawl, indexation, architecture, rendering, structured data and prioritised risks." },
      { title: "Architecture and strategy", description: "Decisions on categories, facets, internal linking, content and organic growth." },
      { title: "Migration support", description: "Inventory, URL mapping, redirects, QA and monitoring to protect organic assets." },
      { title: "Recurring web capacity", description: "Monthly maintenance, fixes and landing pages ready for your agency to hand over." },
    ],
    process: [
      { title: "Agree the scope", description: "We define role, confidentiality, deliverables, who speaks to the client and how visible I am." },
      { title: "Evidence-based diagnosis", description: "We work from data, crawls, Search Console and the real technical context." },
      { title: "Hand over decisions", description: "Your team gets priorities, criteria and support to execute without permanent dependency." },
    ],
    faqs: [
      { question: "Can you work fully white label?", answer: "Yes. The arrangement can be fully white label, internal support only, or a named specialist your client meets directly. It is agreed in writing before the project starts." },
      { question: "What skills can an agency contract?", answer: "Technical SEO, audits, migrations, ecommerce SEO, monthly web maintenance, and landing page design or development." },
      { question: "How is pricing defined?", answer: "Pricing depends on the skill, the platform, the number of clients or deliverables, the timeline and the collaboration model. It can be quoted per project, by volume, as an hour bank or as monthly capacity." },
      { question: "What experience can I show my client?", answer: "Relevant experience is shared before contracting without exposing confidential information. Identifiable cases, figures and brands are only used with written authorization." },
      { question: "Do you work with agencies outside Colombia?", answer: "Yes. Work is remote with teams and clients in other countries, with scope and overlap hours agreed up front." },
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
  nextKicker: string; nextTitle: string;
}> = {
  es: {
    siteName: "SEO Para Ecommerce", home: "Inicio",
    ctaPrimary: "Solicitar cotización", ctaSecondary: "Ver casos reales",
    problemKicker: "EL PROBLEMA", problemTitle: "Primero entendemos la decisión que está en riesgo.",
    deliverablesKicker: "QUÉ RECIBES", deliverablesTitle: "Entregables pensados para tomar decisiones y ejecutar.",
    outcomesKicker: "RESULTADO OPERATIVO", outcomesTitle: "Menos opinión. Más evidencia y criterios compartidos.",
    processKicker: "PROCESO", processTitle: "Un proceso corto, visible y transferible.",
    faqKicker: "PREGUNTAS FRECUENTES",
    nextKicker: "SIGUIENTE PASO", nextTitle: "Cuéntanos qué habilidad y capacidad necesita tu agencia.",
  },
  en: {
    siteName: "SEO Para Ecommerce", home: "Home",
    ctaPrimary: "Request a quote", ctaSecondary: "See real cases",
    problemKicker: "THE PROBLEM", problemTitle: "First we name the decision that is actually at risk.",
    deliverablesKicker: "WHAT YOU GET", deliverablesTitle: "Deliverables built to decide with, then execute.",
    outcomesKicker: "OPERATIONAL OUTCOME", outcomesTitle: "Less opinion. More evidence and shared criteria.",
    processKicker: "PROCESS", processTitle: "A short process you can see and hand over.",
    faqKicker: "FREQUENT QUESTIONS",
    nextKicker: "NEXT STEP", nextTitle: "Tell me what skill and capacity your agency needs.",
  },
  pt: {
    siteName: "SEO Para Ecommerce", home: "Início",
    ctaPrimary: "Solicitar orçamento", ctaSecondary: "Ver casos reais",
    problemKicker: "O PROBLEMA", problemTitle: "Primeiro entendemos a decisão que está em risco.",
    deliverablesKicker: "O QUE VOCÊ RECEBE", deliverablesTitle: "Entregáveis para decidir e executar.",
    outcomesKicker: "RESULTADO OPERACIONAL", outcomesTitle: "Menos opinião. Mais evidência.",
    processKicker: "PROCESSO", processTitle: "Um processo curto, visível e transferível.",
    faqKicker: "PERGUNTAS FREQUENTES",
    nextKicker: "PRÓXIMO PASSO", nextTitle: "Conte qual habilidade sua agência precisa.",
  },
};

/** Contenido por idioma. `pt` es legado y reutiliza el español. */
export const SEO_SPECIALTIES: Record<Lang, Record<SeoSpecialtyKind, SeoSpecialtyContent>> = {
  es: ES,
  en: EN,
  pt: ES,
};
