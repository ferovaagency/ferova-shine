/**
 * ============================================================================
 *  LANDING · /en/white-label-seo-vs-in-house  —  CONTENIDO
 * ============================================================================
 *
 *  ⚠️ TEXTO LITERAL. Las cadenas de este archivo son el documento de origen
 *  palabra por palabra, incluidas sus comas de empalme y su puntuación. NO se
 *  corrigen, no se reescriben y no se "mejoran": fueron aprobadas así.
 *  Todo lo que aporta la plantilla es presentación.
 *
 *  Decisiones aplicadas sobre el documento:
 *  1. Los cinco enlaces externos editoriales (almcorp, stanventures,
 *     webgrouth, dominationsimplified, thebusinessrover) se ELIMINARON. El
 *     texto del ancla se conserva y se usa como enlace interno.
 *  2. Los únicos enlaces externos son los cuatro canales de contacto propios.
 *  3. La imagen del documento vivía en un bucket S3 de Composeo. No se usa:
 *     es una dependencia que no controlamos. Si se quiere, se descarga a
 *     /public/images y se pasa por `heroImage`.
 *
 *  Las cifras son del documento, no mías. Son rangos de mercado de EE.UU.,
 *  nunca un precio de Ferova.
 * ============================================================================
 */

/** Fragmento de párrafo: texto plano o enlace interno sobre texto del documento. */
export type Frag = string | { text: string; to: string };

export interface Rung {
  label: string;
  value: string;
  /** Ancho de la barra, proporcional al rango. Sólo decorativo. */
  bar: string;
}

export const WL_HERO = {
  eyebrow: "For agency owners · White label · Bogotá, Colombia",
  /** H1 partido en dos para el contraste tipográfico. Junto es el título literal. */
  h1a: "White Label SEO for Agencies vs In-House SEO: Comparing ",
  h1b: "Cost, Control, and Technical Risk",
  lede:
    "At some point, every agency owner runs the same mental calculation: keep hiring for SEO execution, or route the production work through a specialist you never put on payroll.",
  ctaPrimary: "Talk to me directly",
  ctaSecondary: "Jump to the numbers",
  /** Ruta de imagen local en /public. Vacío = hero sólo con degradado. */
  heroImage: "",
};

/** Las cuatro cifras ya presentes en el texto, sacadas a tamaño grande. */
export const WL_STATS = [
  { n: "$145k–$165k", l: "Total loaded annual cost of a senior in-house SEO specialist in the US, 2026" },
  { n: "25–40%", l: "Employer payroll taxes and benefits, on top of base salary" },
  { n: "60–90 days", l: "Ramp before a new hire operates at full capacity" },
  { n: "2x–2.5x", l: "Typical agency resale markup on wholesale production" },
];

export const WL_INTRO = {
  kick: "The calculation",
  h2: "It's not a values question. It's capacity and margin.",
  p1: [
    "At some point, every agency owner runs the same mental calculation: keep hiring for SEO execution, or route the production work through a specialist you never put on payroll. When evaluating ",
    { text: "white label SEO for agencies", to: "/en/white-label-seo-for-agencies" },
    ", most owners discover it's not a values question at all. It's a capacity and margin question, and the numbers tend to make the answer clear once you compare them side by side, specifically, the loaded cost of a hire against expected monthly wholesale spend, utilization rates, and ramp time.",
  ] as Frag[],
  p2: [
    "White-label SEO has matured well beyond simple link reselling. Today it covers the full technical stack: audits, migrations, landing page production, Core Web Vitals remediation, and ongoing maintenance, all delivered as documented, client-ready output under your agency's name. Engagement models are now more flexible, contractual protections are better defined, and the quality gap between outsourced and in-house execution has narrowed considerably for agencies working with established specialist partners. This article compares both models across cost, control, and technical risk. By the end, you'll have a concrete framework for evaluating which approach fits your backlog, and a practical look at how a specialist like ",
    { text: "Ferova", to: "/en/about-me" },
    " structures white-label work so it's indistinguishable from in-house output.",
  ] as Frag[],
};

export const WL_SCOPE = {
  kick: "What it covers",
  h2: "What white label SEO for agencies actually covers",
  lead:
    "Outsourced SEO production means a specialist executes technical SEO work under your brand, with the end client never knowing a third party was involved. This is not a software dashboard or a reseller platform. It is professional technical work delivered as documented, client-ready output, and that distinction matters when you're setting client expectations and protecting margins.",
  subs: [
    {
      tag: "Core technical services",
      h3: "Audits, migrations, landing pages, and maintenance",
      body: [
        { text: "Technical audits", to: "/en/technical-seo-audit-services" },
        " diagnose crawl issues, indexation gaps, Core Web Vitals problems, and structural errors. Each finding is documented with the affected URL, severity rating, recommended fix, and implementation notes. ",
        { text: "Migrations", to: "/en/seo-migration-services" },
        " handle URL changes, CMS switches, and domain consolidations with a complete redirect map, pre-launch QA, and post-launch validation through day 14. Landing page production covers build-out and technical QA for conversion-focused pages, scoped and priced before any work begins. Ongoing maintenance handles recurring health checks, fix implementation, and changelog documentation so nothing falls through the gaps between retainer months.",
      ] as Frag[],
    },
    {
      tag: "Why outsource",
      h3: "Why agencies outsource SEO production rather than hire",
      body: [
        "The core logic is economic. A senior technical SEO specialist carries a loaded annual cost well above what most agencies estimate. When client volume is variable, and for most agencies, it is, carrying that fixed cost against an unpredictable backlog creates a margin problem. ",
        { text: "White label SEO services for agencies", to: "/en/white-label-seo-for-agencies" },
        " convert fixed overhead into a variable production cost that scales with actual client demand, in either direction, without a renegotiated employment contract.",
      ] as Frag[],
    },
  ],
};

export const WL_COST = {
  kick: "Cost",
  h2: "Cost comparison: white label SEO for agencies vs. in-house",
  lead:
    "The most common mistake agencies make is comparing a salary figure to a wholesale monthly fee. That comparison misses the full picture on both sides.",
  inHouse: {
    h3: "What a full-time senior SEO specialist actually costs",
    intro:
      "In 2026, the total loaded annual cost of a senior in-house SEO specialist in the US runs approximately $145,000 to $165,000, with a practical budgeting midpoint around $155,000. The breakdown looks like this:",
    rungs: [
      { label: "Base salary", value: "$105,000 – $125,000", bar: "72%" },
      { label: "Employer payroll taxes and benefits", value: "25 – 40% on base", bar: "34%" },
      { label: "Professional tool stack", value: "$6,000 – $15,000 / yr", bar: "12%" },
      { label: "Equipment, training, and onboarding overhead", value: "—", bar: "8%" },
    ] as Rung[],
    outro:
      "This excludes recruiting fees, performance bonuses, and the roughly 60 to 90 day ramp period before a new hire is operating at full capacity. In practice, agencies routinely underestimate first-year cost when they skip the loaded calculation, the gap between the number on an offer letter and the actual cost to the business is often significant.",
  },
  wholesale: {
    h3: "White-label SEO pricing at the wholesale level",
    body: [
      { text: "White label SEO partners", to: "/en/white-label-seo-for-agencies" },
      " typically operate across three main tiers. Light local SEO runs $200 to $500 per month at wholesale, covering Google Business Profile optimization, citations, basic on-page work, and reporting. Standard SMB work falls in the $900 to $2,500 range, typically including technical SEO execution, content, and some link acquisition. Competitive national or enterprise work starts around $2,500 and runs to $6,000 or more per month depending on scope. Agencies typically resell at a 2x to 2.5x markup. A per-task or hour-bundle model works especially well for one-off audits and migrations where committing to a recurring retainer would waste budget on both sides, this is the structure Ferova uses for agencies with variable demand.",
    ] as Frag[],
    rungs: [
      { label: "Light local SEO", value: "$200 – $500 / mo", bar: "14%" },
      { label: "Standard SMB", value: "$900 – $2,500 / mo", bar: "42%" },
      { label: "Competitive national", value: "$2,500 – $6,000+ / mo", bar: "84%" },
    ] as Rung[],
  },
  mid: { text: "Want these numbers run against your actual backlog instead of a generic range?", label: "Send me the scope" },
};

export const WL_RISK = {
  kick: "Control and risk",
  h2: "Both models create risk. The risks are just different.",
  lead:
    "The assumption that in-house always means more control deserves a closer look. Both models create risk. The risks are just different, and one set is far easier to manage contractually.",
  subs: [
    {
      tag: "White-label exposure",
      h3: "Brand and client confidentiality in a white-label arrangement",
      body:
        "The controls that keep a white-label partner from becoming a liability are straightforward to implement. The agency owns all client accounts: GA4, GSC, CMS, Google Business Profile. Deliverables carry no third-party branding, including file metadata and screenshot windows. An NDA and non-solicitation clause covers client lists, with non-circumvention language preventing the partner from continuing work with a client who contacts them directly. Industry-standard SLA practice also calls for the partner to stay off client calls and out of client-facing emails unless the agency provides explicit written approval for a specific instance. When these terms are in the contract and enforced operationally, confidentiality risk is low and manageable.",
    },
    {
      tag: "In-house exposure",
      h3: "Where in-house SEO creates its own technical risks",
      body:
        "Agencies consistently underestimate key-person dependency. One specialist holds institutional knowledge, account access, and undocumented workflows. When they leave, that information leaves with them. Tool and platform access concentrated in personal accounts compounds the problem. Add the quality inconsistency that comes from asking a generalist to execute highly technical work outside their specialty, and you have a third category of risk. These aren't hypothetical, they're the most common reason agencies end up in client emergencies after a departure.",
    },
  ],
};

export const WL_MODELS = {
  kick: "Engagement models",
  h2: "Pricing models that match how agencies actually scope work",
  lead: [
    "The right engagement model depends entirely on how clearly the work can be defined and how predictable the volume is. ",
    { text: "Choosing the wrong model", to: "/en/outsource-seo-services" },
    " is where agencies lose margin.",
  ] as Frag[],
  /** Rótulos de navegación visual. El párrafo íntegro va justo debajo. */
  cards: [
    { num: "01", h3: "Per-task", p: "Defined deliverables: a technical audit, a site migration, or a batch of landing pages." },
    { num: "02", h3: "Hour bundles", p: "Irregular backlogs that need senior capacity without a monthly minimum." },
    { num: "03", h3: "Monthly blocks", p: "Recurring clients that need consistent maintenance and optimization." },
  ],
  subs: [
    {
      tag: "Compared",
      h3: "Per-task, hour bundles, and monthly blocks compared",
      body: [
        { text: "Per-task pricing", to: "/en/outsource-seo-services" },
        " works best for defined deliverables: a technical audit, a site migration, or a batch of landing pages. Scope is agreed upfront, price is fixed, and neither side faces surprises. Hour bundles serve agencies with irregular backlogs that need access to senior capacity without committing to a monthly minimum, this format works well for technical troubleshooting and developer coordination. Monthly blocks fit agencies with recurring clients who need consistent maintenance and optimization, where the cumulative nature of SEO work justifies a standing arrangement.",
      ] as Frag[],
    },
    {
      tag: "Before signing",
      h3: "How to scope before signing anything",
      body: [
        "Every engagement should start with a ",
        { text: "scoping conversation", to: "/en/contact" },
        " that produces one written document: defined deliverables, identified dependencies (access, approvals, content inputs), agreed turnaround windows, and clear acceptance criteria. Skipping this step is where agencies lose margin through scope creep or disputes over whether a deliverable was completed. A one-page scope document protects both sides and gives the account manager a clear reference point when a client asks why something isn't included.",
      ] as Frag[],
    },
  ],
};

export const WL_BRAND = {
  kick: "Integration",
  h2: "Integrating white-label SEO without losing brand control",
  lead:
    "Agencies that run white-label SEO production successfully treat the partner as a behind-the-scenes production team. They build explicit handoff, QA, and reporting systems to keep that invisible to the client, and they maintain the agency as the single client-facing contact at every step.",
  steps: [
    {
      n: "01",
      h3: "QA and documentation standards to require from day one",
      p: "A properly documented deliverable includes the affected URL, the specific issue, the recommended fix, the expected impact, and an implementation notes field. Reports include a work-completed log with specific pages, fixes, and technical changes, not just aggregate metrics. All assets are version-controlled and accessible after the engagement ends. The agency runs its own QA gate before anything reaches the client: checking for brand accuracy, data correctness, no third-party references, and no partner branding in file metadata or visible text.",
    },
    {
      n: "02",
      h3: "Client-presentation best practices that protect your brand",
      p: "Branded Looker Studio or PDF reports connected to GA4, GSC, and rank tracking data should carry your agency logo, colors, and domain, with \"Prepared by [Agency]\" on the cover. The executive summary is written by the account manager, who adds business context that the SEO specialist isn't positioned to provide. No provider names, logos, tool watermarks, or identifying metadata appear in any client-facing file. The agency owns every client touchpoint, and the client receives an output that reflects the agency's brand, not the production workflow behind it.",
    },
  ],
};

export const WL_FEROVA = {
  kick: "In practice",
  h2: "What this looks like in practice: how Ferova structures a white-label engagement",
  lead: "Abstract advice is easy to outline. The more useful question is what this actually looks like when it runs well.",
  left: {
    h3: "Ferova's white-label workflow for agencies",
    body: [
      "An agency sends a ",
      { text: "technical audit", to: "/en/technical-seo-audit-services" },
      " request with site access and a priority list. The Ferova team scopes the deliverable, confirms the turnaround window, and returns a fully documented audit: prioritized recommendations organized by severity and impact, annotated screenshots with evidence, affected URLs and templates identified, and an implementation-ready format the agency can hand directly to its client or dev team. The agency's name is on the cover. Nothing in the document reveals the specialist behind it. The agency presents it, answers questions, and owns the relationship from first call to final approval.",
    ] as Frag[],
  },
  right: {
    h3: "Flexible engagement options for agencies with variable backlogs",
    body: [
      "Ferova's engagement modes, closed-scope task, hour bundle, and monthly block, let agencies match capacity to actual demand rather than committing to a fixed monthly contract regardless of volume. When a client pauses, a migration lands unexpectedly, or a backlog clears faster than anticipated, the agency adjusts without renegotiating a long-term arrangement. For agencies testing a new SEO service line before adding headcount, this is the lowest-risk way to validate demand: real deliverables, documented output, and no fixed employment cost until volume justifies it. ",
      { text: "Agencies can discuss specific engagement modes with Ferova", to: "/en/contact" },
      " before committing to any structure.",
    ] as Frag[],
  },
};

export const WL_FRAMEWORK = {
  kick: "Decision framework",
  h2: "The practical decision framework",
  p1:
    "White-label SEO is not a compromise. It's a deliberate operational choice that converts a fixed staffing cost into a flexible, margin-controlled production system. The real question isn't whether outsourced quality can match in-house quality. With the right partner, documented standards, and a clean QA process, outsourced work can meet or exceed in-house output, primarily because the specialist is doing only that work, not splitting attention across account management, client calls, and internal meetings.",
  p2: [
    "When evaluating ",
    { text: "white label SEO for agencies", to: "/en/white-label-seo-for-agencies" },
    ", the framework comes down to three considerations: understand the true cost gap (it is larger than most agencies expect), set contractual controls that protect brand and client confidentiality, and match the pricing model to your actual backlog pattern. Before defaulting to a full-time hire, run the numbers on at least one specialist-led arrangement. If volume is still variable, the economics strongly favor a flexible model, and the operational risk is lower than most agencies assume once the right controls are in place.",
  ] as Frag[],
};

/** Los cuatro únicos enlaces externos de la página. */
export const WL_CHANNELS = {
  kick: "Reach me directly",
  h2: "No form in between. Pick whichever is least friction for you.",
  items: [
    { n: "WhatsApp", dd: "Fastest for a quick scope question", href: "https://wa.me/17866894686", go: "Open" },
    { n: "Email", dd: "gerencia@seoparaecommerce.co", href: "mailto:gerencia@seoparaecommerce.co", go: "Write" },
    { n: "LinkedIn", dd: "María Fer Calderón", href: "https://www.linkedin.com/in/maria-fer-calderon/", go: "Connect" },
    // ⚠️ Esta URL exige ser miembro del workspace: un prospecto rebota. Para
    // captación hace falta un enlace de Slack Connect o de canal compartido.
    { n: "Slack", dd: "For agencies already working with me", href: "https://ferovaagency.slack.com/team/", go: "Open" },
  ],
};

export const WL_RELATED = [
  { label: "White-label SEO for agencies", to: "/en/white-label-seo-for-agencies" },
  { label: "Technical SEO audit services", to: "/en/technical-seo-audit-services" },
  { label: "SEO migration services", to: "/en/seo-migration-services" },
  { label: "Outsource SEO services", to: "/en/outsource-seo-services" },
  { label: "Ecommerce SEO", to: "/en/services/ecommerce-seo" },
  { label: "About me", to: "/en/about-me" },
];

export const WL_FINAL = {
  eyebrow: "Next step",
  h2: "Run the numbers on at least one specialist-led arrangement.",
  label: "Start the conversation",
};

export const WL_SEO = {
  path: "/en/white-label-seo-vs-in-house",
  title: "White Label SEO for Agencies vs In-House SEO | Ferova",
  description:
    "Comparing cost, control and technical risk: what a senior in-house SEO hire really costs against wholesale white-label production, and how to scope either one.",
};
