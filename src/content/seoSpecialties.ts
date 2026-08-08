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

export const SEO_SPECIALTIES: Record<SeoSpecialtyKind, SeoSpecialtyContent> = {
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
