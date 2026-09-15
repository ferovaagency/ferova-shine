import type { Lang } from "@/config/routes";

/**
 * Copy de la portada personal (María Fer) y de los tres casos de prueba.
 *
 * La versión en inglés NO es una traducción de cortesía: es la misma oferta
 * dicha para un dueño de agencia en Estados Unidos, que es quien busca
 * "white label seo for agencies" y "outsource seo services".
 *
 * ⚠️ Las cifras son idénticas en ambos idiomas porque son hechos, no copy.
 * Nunca se ajustan al traducir. Los importes en pesos colombianos se dejan en
 * COP también en inglés, con la moneda explícita: convertirlos a dólares
 * inventaría un tipo de cambio y una fecha que no tenemos.
 */

export type ModeKey = "task" | "hours" | "monthly";

export interface CaseStory {
  /** Ruta del interactivo en /public/case-stories. `null` = no hay versión en
   *  ese idioma todavía y el iframe NO se renderiza. Media página en español
   *  dentro de una página en inglés destruye la credibilidad que vende. */
  embedSrc: string | null;
  embedTitle: string;
  ariaLabel: string;
  heading: string;
  intro: string;
  summary: string;
  paragraphs: string[];
  bullets?: { label: string; text: string }[];
  table?: { caption: string; head: string[]; rows: string[][] };
  notes: string[];
}

export interface PersonalHomeContent {
  path: string;
  seoTitle: string;
  seoDesc: string;
  heroEyebrow: string;
  heroTitleA: string;
  heroTitleEm: string;
  heroLede: string;
  heroCta: string;
  heroLink: string;
  heroAssurance: string;
  portraitAlt: string;
  portraitCaption: string;
  modesEyebrow: string;
  modesTitle: string;
  modesLede: string;
  modesAria: string;
  modeTabs: Record<ModeKey, string>;
  modes: Record<ModeKey, { title: string; copy: string; items: string[] }>;
  modeCta: (mode: string) => string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  aboutLink: string;
  faqEyebrow: string;
  faqTitle: string;
  faqs: [string, string][];
  contactEyebrow: string;
  contactTitle: string;
  contactLede: string;
  contactCta: string;
  cases: { redesign: CaseStory; recovery: CaseStory; maintenance: CaseStory };
}

const ES: PersonalHomeContent = {
  path: "/",
  seoTitle: "María Fer · SEO técnico y proyectos web para agencias | Ferova",
  seoDesc:
    "Criterio técnico, implementación y entregas documentadas para agencias. Trabaja con María Fer por tarea, horas o capacidad mensual.",
  heroEyebrow: "Tu aliada técnica para agencias",
  heroTitleA: "Soy María Fer. Me sumo a tu equipo para resolver ",
  heroTitleEm: "SEO y web.",
  heroLede:
    "Trabajo contigo por tarea, horas o mes. Aporto criterio técnico, implementación y entregas documentadas para que tu agencia conserve el control.",
  heroCta: "Cuéntame tu proyecto",
  heroLink: "Conoce mi trabajo",
  heroAssurance: "Colaboración directa · White label disponible",
  portraitAlt: "María Fer en un espacio de trabajo de Ferova",
  portraitCaption: "María Fer · SEO técnico y proyectos web",
  modesEyebrow: "Cómo podemos trabajar",
  modesTitle: "La capacidad que necesitas, con una relación directa.",
  modesLede: "Una tarea concreta o apoyo continuo para las entregas de tu agencia.",
  modesAria: "Modalidad de colaboración",
  modeTabs: { task: "Por tarea", hours: "Por horas", monthly: "Mensual" },
  modes: {
    task: {
      title: "Resolvamos una entrega concreta.",
      copy: "Una auditoría, una landing o el QA de una migración. Definimos alcance y criterios de aceptación antes de empezar.",
      items: ["Entregable definido", "Alcance y precio acordados", "Documentación y revisión"],
    },
    hours: {
      title: "Activa apoyo cuando el backlog cambia.",
      copy: "Priorizamos tareas de SEO, mantenimiento web o implementación dentro de un bloque de horas acordado.",
      items: ["Prioridades compartidas", "Registro de tareas y horas", "Flexibilidad dentro del alcance"],
    },
    monthly: {
      title: "Demos continuidad a tus entregas.",
      copy: "Acordamos capacidad recurrente para proyectos que necesitan seguimiento y producción durante el mes.",
      items: ["Disponibilidad acordada", "Seguimiento de prioridades", "Entregas documentadas"],
    },
  },
  modeCta: (m) => `Quiero conversar sobre ${m}`,
  aboutEyebrow: "Una relación de trabajo directa",
  aboutTitle: "Sabes con quién hablas y quién está detrás de la entrega.",
  aboutParagraphs: [
    "Me integro al trabajo de tu agencia para convertir necesidades técnicas en entregas que puedas revisar y presentar a tu cliente.",
    "Antes de empezar acordamos prioridades, accesos, alcance y forma de colaboración. Durante el proyecto, las decisiones quedan documentadas.",
  ],
  aboutLink: "Hablemos de tu próxima entrega",
  faqEyebrow: "Preguntas frecuentes",
  faqTitle: "Antes de trabajar juntas, puedes preguntarme esto.",
  faqs: [
    ["¿Qué tipo de trabajo puedo delegarte?", "SEO técnico, migraciones, mantenimiento web, landings y QA. Primero entendemos la tarea y después acordamos la forma de colaboración."],
    ["¿Puedes trabajar bajo la marca de mi agencia?", "Sí. Podemos trabajar como apoyo interno, bajo tu marca o como especialista visible ante tu cliente, según el proyecto."],
    ["¿Cómo se presenta un caso sin revelar al cliente?", "Mostraremos el problema, la intervención y la evidencia técnica sin publicar empresa, nombres, dominios, URLs, logos ni datos identificables."],
    ["¿Necesito una llamada para empezar?", "No necesariamente. Puedes dejar el contexto inicial y definimos si hace falta conversar para cerrar alcance, accesos y fecha."],
  ],
  contactEyebrow: "El siguiente proyecto",
  contactTitle: "Cuéntame qué necesitas resolver.",
  contactLede: "Empecemos por el trabajo. La modalidad la definimos a partir del alcance real.",
  contactCta: "Abrir Fera y conversar",
  cases: {
    redesign: {
      embedSrc: "/case-stories/redisenio-web.html?embed=1",
      embedTitle: "Historia interactiva: rediseño de una tienda y evolución de sus ventas",
      ariaLabel: "Caso anónimo de rediseño web y SEO",
      heading: "Caso real: rediseño web y SEO de una tienda online",
      intro: "Así reconstruí una tienda con fallos y trabajé su SEO técnico. Explora mi intervención y la evolución de sus ventas entre enero y mayo de 2025.",
      summary: "Consultar los datos y el contexto del caso",
      paragraphs: [
        "Trabajo iniciado en diciembre de 2024. Rediseño en WordPress con Divi publicado en febrero de 2025. Limpieza de plugins duplicados y trabajo SEO técnico sobre sitemap, robots.txt y URLs rotas con error 404.",
      ],
      table: {
        caption: "Ventas exclusivamente online · pesos colombianos · 2025",
        head: ["Mes", "Ventas COP"],
        rows: [["Enero", "$1.025.689"], ["Febrero", "$2.548.080"], ["Marzo", "$3.587.456"], ["Abril", "$8.081.879"], ["Mayo", "$13.289.661"]],
      },
      notes: [
        "Fuente: registro compartido por María Fer. Hubo campañas dirigidas a WhatsApp. La evolución observada no permite atribuir todo el crecimiento a una sola intervención. Cliente anónimo; tienda ilustrada.",
      ],
    },
    recovery: {
      embedSrc: "/case-stories/recuperacion-seo.html?embed=1",
      embedTitle: "Historia interactiva: detección de contenido comprometido, limpieza y recuperación SEO",
      ariaLabel: "Caso anónimo de limpieza y recuperación SEO",
      heading: "Caso real: el problema SEO escondido dentro de los artículos",
      intro: "Una revisión manual reveló frases intrusas y enlaces maliciosos. Así limpié el sitio y trabajé su recuperación SEO, con resultados documentados de noviembre de 2024 a mayo de 2025.",
      summary: "Ver cifras, intervención y contexto del caso",
      paragraphs: [
        "Firma de servicios profesionales cuya identidad se mantiene confidencial. La penalización anterior ya estaba resuelta cuando comenzó mi intervención; la revisión artículo por artículo descubrió contenido que seguía comprometido.",
        "Limpié las inserciones maliciosas, migré el hosting, apliqué bloqueos de seguridad y envié un archivo de desautorización a Search Console. El trabajo SEO también incluyó robots.txt, sitemap, canonicals, redirecciones, optimización de imágenes y metadatos, y contenido informativo.",
      ],
      table: {
        caption: "Comparación de indicadores del reporte de seguimiento",
        head: ["Indicador", "Noviembre 2024", "Mayo 2025"],
        rows: [
          ["Clics orgánicos", "153", "1.180"],
          ["Impresiones en Google", "4.300", "22.000"],
          ["Usuarios orgánicos", "188", "1.550"],
          ["CTR orgánico", "3,6 %", "5,4 %"],
          ["Posición media", "23,9", "10,2"],
          ["Páginas indexadas", "4", "96"],
        ],
      },
      notes: [
        "Fuente: reporte de seguimiento proporcionado por María Fer. Comparación de dos periodos; no se dispone aquí de una serie mensual. El crecimiento corresponde al periodo de limpieza, migración y trabajo SEO, sin atribuirlo a una única acción.",
        "Según mi seguimiento, no se volvieron a detectar enlaces maliciosos durante el tiempo que trabajé con la firma. La animación es una representación con texto ficticio; no muestra contenido, enlaces ni identidad del cliente.",
      ],
    },
    maintenance: {
      embedSrc: "/case-stories/mantenimiento-seo.html?embed=1",
      embedTitle: "Caso interactivo: seguridad, captación y medición en tres sitios anónimos",
      ariaLabel: "Caso anónimo de mantenimiento web y SEO",
      heading: "Tres sitios, tres prioridades: proteger, captar y medir",
      intro: "Proyecto en curso: detecté contenido no autorizado, consultas enterradas entre spam y datos de analítica mezclados. Explora qué encontré, qué hice y qué sigue pendiente.",
      summary: "Ver intervenciones, resultados técnicos y pendientes",
      paragraphs: [
        "Muestra anonimizada de un servicio de mantenimiento web y SEO básico sobre tres sitios. Estado según la documentación de agosto de 2026 y el análisis de cierre del 1 de septiembre. Los tres frentes se solapan; no representan un problema exclusivo de cada sitio.",
      ],
      bullets: [
        { label: "Proteger:", text: "retiré contenido no autorizado en dos sitios, apliqué mejoras técnicas y SEO y activé medidas de seguridad. La revisión completa de seguridad y parte del trabajo de hosting siguen pendientes; retirar el contenido no demuestra que la intrusión esté resuelta." },
        { label: "Captar:", text: "clasifiqué envíos de formularios e identifiqué consultas legítimas entre el spam. Configuré protección y ajustes de campos, pendientes de publicación según el registro. No consta que los contactos identificados hayan sido atendidos." },
        { label: "Medir:", text: "documenté datos de dos sitios mezclados en una propiedad de analítica. La causa técnica y su corrección siguen pendientes. El acceso a Search Console ya está disponible para los tres sitios." },
      ],
      table: {
        caption: "Revisión técnica de uno de los sitios intervenidos",
        head: ["Indicador de auditoría", "Antes", "Después"],
        rows: [["Incidencias detectadas", "44", "11"], ["Puntuación de salud técnica", "77", "83"]],
      },
      notes: [
        "Fuente: auditorías e informes de intervención proporcionados por María Fer. Son indicadores de una herramienta de auditoría, no resultados de ventas, posicionamiento ni una certificación de seguridad. No se atribuye crecimiento orgánico a este trabajo sin una comparación validada.",
        "Las pantallas son recreaciones ilustrativas. Se omiten identidades, dominios, ubicaciones, contactos, marcas de clientes y detalles de sus accesos. Los documentos originales no se publican.",
      ],
    },
  },
};

const EN: PersonalHomeContent = {
  path: "/en",
  seoTitle: "María Fer · Senior technical SEO for agencies | Ferova",
  seoDesc:
    "Technical judgement, implementation and documented deliverables for agencies. Work with María Fer by task, by hours, or as monthly capacity. White label available.",
  heroEyebrow: "Your technical partner for agencies",
  heroTitleA: "I'm María Fer. I join your team to resolve ",
  heroTitleEm: "SEO and web.",
  heroLede:
    "I work with you by task, by hours or by the month. I bring technical judgement, implementation and documented deliverables, so your agency keeps control of the account.",
  heroCta: "Tell me about your project",
  heroLink: "See my work",
  heroAssurance: "Direct collaboration · White label available",
  portraitAlt: "María Fer in a Ferova workspace",
  portraitCaption: "María Fer · Technical SEO and web projects",
  modesEyebrow: "How we can work",
  modesTitle: "The capacity you need, with a direct relationship.",
  modesLede: "One defined task, or ongoing support for your agency's deliverables.",
  modesAria: "Collaboration model",
  modeTabs: { task: "By task", hours: "By hours", monthly: "Monthly" },
  modes: {
    task: {
      title: "Let's resolve one defined deliverable.",
      copy: "An audit, a landing page, or the QA of a migration. We agree scope and acceptance criteria before anything starts.",
      items: ["Defined deliverable", "Scope and price agreed up front", "Documentation and review"],
    },
    hours: {
      title: "Turn on support when the backlog shifts.",
      copy: "We prioritise SEO, web maintenance or implementation tasks inside an agreed block of hours.",
      items: ["Shared priorities", "Task and hour log", "Flexibility within the scope"],
    },
    monthly: {
      title: "Keep your deliveries moving.",
      copy: "We agree recurring capacity for projects that need follow-through and production across the month.",
      items: ["Agreed availability", "Priorities tracked", "Documented deliveries"],
    },
  },
  modeCta: (m) => `Let's talk about working ${m}`,
  aboutEyebrow: "A direct working relationship",
  aboutTitle: "You know who you're talking to, and who is behind the delivery.",
  aboutParagraphs: [
    "I plug into your agency's work and turn technical needs into deliverables you can review and put in front of your client.",
    "Before we start we agree priorities, access, scope and how we collaborate. During the project, decisions are documented as we go.",
  ],
  aboutLink: "Let's talk about your next delivery",
  faqEyebrow: "Frequent questions",
  faqTitle: "Before we work together, you can ask me this.",
  faqs: [
    ["What kind of work can I hand over?", "Technical SEO, migrations, web maintenance, landing pages and QA. First we understand the task, then we agree the collaboration model that fits it."],
    ["Can you work under my agency's brand?", "Yes. I can work as internal support, fully under your brand, or as a named specialist in front of your client — decided per project."],
    ["How do you show a case without revealing the client?", "I show the problem, the intervention and the technical evidence, with no company, names, domains, URLs, logos or identifiable data published."],
    ["Do I need a call to get started?", "Not necessarily. You can send the initial context and we decide together whether a call is needed to close scope, access and dates."],
  ],
  contactEyebrow: "The next project",
  contactTitle: "Tell me what you need resolved.",
  contactLede: "Let's start with the work. The collaboration model follows from the real scope.",
  contactCta: "Open Fera and talk",
  cases: {
    redesign: {
      // ⚠️ El interactivo sólo existe en español. Sin versión EN el iframe no
      // se renderiza: media página en español rompe la página en inglés.
      embedSrc: null,
      embedTitle: "",
      ariaLabel: "Anonymised case: web redesign and SEO",
      heading: "Real case: web redesign and SEO for an online store",
      intro: "How I rebuilt a store that was failing and worked its technical SEO. Below are the intervention and how its sales moved between January and May 2025.",
      summary: "See the figures and the context of this case",
      paragraphs: [
        "Work started in December 2024. WordPress redesign on Divi, published February 2025. Cleanup of duplicated plugins, plus technical SEO on sitemap, robots.txt and broken URLs returning 404.",
      ],
      table: {
        caption: "Online sales only · Colombian pesos (COP) · 2025",
        head: ["Month", "Sales (COP)"],
        rows: [["January", "$1,025,689"], ["February", "$2,548,080"], ["March", "$3,587,456"], ["April", "$8,081,879"], ["May", "$13,289,661"]],
      },
      notes: [
        "Source: records shared by María Fer. Figures are in Colombian pesos, not converted. There were campaigns driving traffic to WhatsApp during the period, so the growth observed cannot be attributed to a single intervention. Client anonymised.",
      ],
    },
    recovery: {
      embedSrc: null,
      embedTitle: "",
      ariaLabel: "Anonymised case: cleanup and SEO recovery",
      heading: "Real case: the SEO problem hidden inside the articles",
      intro: "A manual review found injected phrases and malicious links. How I cleaned the site and worked its SEO recovery, with results documented from November 2024 to May 2025.",
      summary: "See figures, intervention and context",
      paragraphs: [
        "A professional services firm whose identity stays confidential. A previous penalty had already been resolved when I started; reviewing article by article uncovered content that was still compromised.",
        "I removed the malicious insertions, migrated hosting, applied security hardening and submitted a disavow file to Search Console. The SEO work also covered robots.txt, sitemap, canonicals, redirects, image and metadata optimisation, and informational content.",
      ],
      table: {
        caption: "Indicators compared between two tracking reports",
        head: ["Indicator", "November 2024", "May 2025"],
        rows: [
          ["Organic clicks", "153", "1,180"],
          ["Google impressions", "4,300", "22,000"],
          ["Organic users", "188", "1,550"],
          ["Organic CTR", "3.6%", "5.4%"],
          ["Average position", "23.9", "10.2"],
          ["Indexed pages", "4", "96"],
        ],
      },
      notes: [
        "Source: tracking report provided by María Fer. This compares two points in time; no monthly series is available here. The growth corresponds to the period of cleanup, migration and SEO work, and is not attributed to any single action.",
        "Per my own monitoring, no further malicious links were detected during the time I worked with the firm. That is a statement about the monitoring period, not a security guarantee.",
      ],
    },
    maintenance: {
      embedSrc: null,
      embedTitle: "",
      ariaLabel: "Anonymised case: web maintenance and SEO",
      heading: "Three sites, three priorities: protect, capture, measure",
      intro: "An ongoing project: I found unauthorised content, genuine enquiries buried in spam, and analytics data from two sites mixed together. Here is what I found, what I did, and what is still open.",
      summary: "See interventions, technical results and what is still pending",
      paragraphs: [
        "An anonymised sample of a web maintenance and basic SEO service across three sites. Status per the August 2026 documentation and the closing analysis of 1 September. The three fronts overlap; they are not one problem per site.",
      ],
      bullets: [
        { label: "Protect:", text: "removed unauthorised content on two sites, applied technical and SEO fixes, and enabled security measures. A full security review and part of the hosting work are still open — removing the content does not prove the intrusion is resolved." },
        { label: "Capture:", text: "classified form submissions and identified legitimate enquiries buried in spam. Protection and field adjustments are configured but, per the log, not yet published. There is no record that the identified contacts were followed up." },
        { label: "Measure:", text: "documented data from two sites mixed into a single analytics property. The technical cause and its fix are still open. Search Console access is now available for all three sites." },
      ],
      table: {
        caption: "Technical review of one of the sites",
        head: ["Audit indicator", "Before", "After"],
        rows: [["Issues detected", "44", "11"], ["Technical health score", "77", "83"]],
      },
      notes: [
        "Source: audits and intervention reports provided by María Fer. These are indicators from an audit tool — not sales results, not rankings, and not a security certification. No organic growth is attributed to this work without a validated comparison.",
        "Screens are illustrative recreations. Identities, domains, locations, contacts, client brands and access details are omitted. The original documents are not published.",
      ],
    },
  },
};

/** `pt` es legado y reutiliza el español. */
export const PERSONAL_HOME: Record<Lang, PersonalHomeContent> = { es: ES, en: EN, pt: ES };
