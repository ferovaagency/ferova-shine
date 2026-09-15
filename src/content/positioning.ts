/**
 * ============================================================================
 *  PÁGINAS DE POSICIONAMIENTO  ·  contenido tipado
 * ============================================================================
 *
 *  Plantilla para las piezas que atacan consultas de COMPARACIÓN
 *  ("outsource seo services", "freelance seo consultant"), donde el lector
 *  todavía está eligiendo MODELO, no proveedor.
 *
 *  No confundir con `seoSpecialties.ts`: esa es una landing de servicio y
 *  asume que el lector ya decidió contratar. Esta plantilla añade tres
 *  bloques que aquella no tiene y que son los que hacen el trabajo:
 *    · `answer`      → el párrafo que los motores de IA extraen como cita.
 *    · `marketRates` → tabla con FUENTE Y FECHA por fila. Sin fuente, se omite.
 *    · `comparison`  → incluye obligatoriamente la fila "cuándo NO conviene".
 *
 *  REGLAS DE CONTENIDO (no son estilo, son requisitos):
 *    1. `answer` entre 40 y 70 palabras, un solo párrafo, sin viñetas.
 *    2. Cada `faq.answer` entre 40 y 60 palabras y AUTOCONTENIDA: tiene que
 *       entenderse fuera de la página, porque así es como se cita.
 *    3. Ninguna fila de `marketRates` se publica sin `source` + `date`.
 *       Una cifra sin fuente destruye justo el bloque que la hace citable.
 *    4. `proof` sólo admite hechos verificables. Sin cifra real, se deja el
 *       array vacío y la sección no se renderiza. No se rellena.
 *    5. NUNCA se publica un precio propio. `marketRates` son rangos de
 *       mercado de TERCEROS.
 * ============================================================================
 */

import type { Lang } from "@/config/routes";

export type PositioningKind = "outsource-seo-services";

export interface RateRow {
  /** Modelo de contratación comparado. */
  model: string;
  /** Rango publicado por la fuente. Nunca un precio propio. */
  range: string;
  /** Cómo se factura ese rango. */
  billedAs: string;
  /** Fuente pública. Obligatoria. */
  source: string;
  /** Fecha de consulta de la fuente. Obligatoria. */
  date: string;
}

export interface ComparisonTable {
  /** Encabezados de las columnas comparadas (sin la columna de criterio). */
  options: string[];
  /** Filas de criterio: `values` va alineado con `options`. */
  rows: { criterion: string; values: string[] }[];
  /** Fila obligatoria: cuándo NO conviene cada opción. Da credibilidad. */
  whenNot: { criterion: string; values: string[] };
}

export interface PositioningContent {
  path: string;
  lang: Lang;
  /** Keyword objetivo exacta. Se documenta para auditar la pieza después. */
  targetKeyword: string;
  /** Volumen y dificultad verificados, con fuente. Sólo documentación interna. */
  keywordEvidence: string;

  metaTitle: string;
  metaDescription: string;

  eyebrow: string;
  h1: string;
  lede: string;

  /** Bloque 03 — la respuesta directa que cita la IA. 40-70 palabras. */
  answerHeading: string;
  answer: string;

  /** Bloque 04 — segmenta las dos intenciones que caen en la misma URL. */
  audiences: { title: string; body: string; linkLabel: string; to: string }[];

  /** Bloque 05 — vacío hasta tener fuente y fecha por fila. */
  marketRates: { heading: string; rows: RateRow[] };

  /** Bloque 06 — comparativa honesta. */
  comparison: { heading: string; table: ComparisonTable };

  /** Bloque 07 — CTA intermedio, en el punto de decisión. */
  midCta: { text: string; label: string; to: string };

  /** Bloque 08 */
  process: { heading: string; steps: { title: string; description: string }[] };

  /** Bloque 09 — vacío = sección no renderizada. Nunca se rellena a mano. */
  proof: { heading: string; stats: { value: string; description: string }[] };

  /** Bloque 10 */
  faqs: { question: string; answer: string }[];

  /** Bloque 11 */
  finalCta: { heading: string; label: string; to: string };

  /** Autoría para el schema Person. Vacío = no se emite `sameAs`. */
  authorSameAs: string[];
}

export const POSITIONING: Record<PositioningKind, PositioningContent> = {
  "outsource-seo-services": {
    path: "/en/outsource-seo-services",
    lang: "en",
    targetKeyword: "outsource seo services",
    keywordEvidence: "480 búsquedas/mes, KD 25, CPC USD 12.63 — Ubersuggest, sept 2026.",

    metaTitle: "Outsource SEO Services: How Agencies Hire Senior Help",
    metaDescription:
      "What outsourcing SEO really means for an agency, how the three models compare, and when each one is the wrong call. Written by a senior SEO who works white label.",

    eyebrow: "Senior SEO · White label · Medellín, Colombia",
    h1: "Outsource SEO Services Without Losing Control of the Account",
    lede:
      "A senior SEO who plugs into your agency's process, works under your brand, and hands back decisions your team can defend in front of the client.",

    answerHeading: "What does outsourcing SEO actually mean for an agency?",
    answer:
      "Outsourcing SEO means an agency contracts an external specialist to run technical audits, architecture, migrations or ecommerce SEO under the agency's own brand. The agency keeps the client relationship, pricing and reporting; the specialist supplies senior capacity without going on payroll. It works when scope, confidentiality and who speaks to the client are agreed up front.",

    audiences: [
      {
        title: "You run an agency in the US",
        body:
          "You've won a project that needs deeper technical SEO than your team covers today, and hiring for it doesn't make sense yet. You need capacity you can put in front of a client — or keep invisible.",
        linkLabel: "White-label SEO for agencies",
        to: "/seo-para-agencias",
      },
      {
        title: "You run the ecommerce yourself",
        body:
          "You're comparing an agency retainer against a senior freelancer, and you want to know which one actually moves revenue on a Shopify, VTEX or WooCommerce catalog.",
        linkLabel: "Ecommerce SEO services",
        to: "/en/services/ecommerce-seo",
      },
    ],

    // ⚠️ PENDIENTE DE DATOS. Las filas de rango de mercado necesitan fuente
    // pública + fecha. Hasta entonces el bloque NO se renderiza: publicar una
    // tabla de tarifas sin fuente es peor que no publicarla.
    marketRates: { heading: "Outsourced SEO rates, by model", rows: [] },

    comparison: {
      heading: "Freelance senior vs white-label agency vs in-house",
      table: {
        options: ["Senior freelancer", "White-label agency", "In-house hire"],
        rows: [
          { criterion: "Who you talk to", values: ["The person doing the work", "An account manager", "Your employee"] },
          { criterion: "Ramp-up time", values: ["Days", "1–2 weeks", "1–3 months"] },
          { criterion: "Scales to 10 accounts at once", values: ["No", "Yes", "No"] },
          { criterion: "Handles migrations", values: ["Yes", "Depends who they assign", "Depends on seniority"] },
        ],
        whenNot: {
          criterion: "When NOT to pick it",
          values: [
            "You need volume across many accounts at once, or 24/7 coverage.",
            "You need the specialist visible to your client by name.",
            "SEO isn't a permanent line in your P&L yet.",
          ],
        },
      },
    },

    midCta: {
      text: "Not sure which model fits the project on your desk?",
      label: "Tell me the scope",
      to: "/contacto",
    },

    process: {
      heading: "Three steps, no discovery theatre",
      steps: [
        {
          title: "Scope and role",
          description:
            "We agree deliverables, confidentiality, who speaks to the client and how visible I am. In writing, before anything starts.",
        },
        {
          title: "Evidence first",
          description:
            "Crawl, Search Console, rendering and architecture. Findings separated into cause and symptom, ranked by impact and effort.",
        },
        {
          title: "Handover",
          description:
            "Your team gets priorities and the reasoning behind them, so they can execute and defend the work without me in every call.",
        },
      ],
    },

    // ⚠️ PENDIENTE DE DATOS. Cada stat necesita cifra, periodo y contexto
    // verificables. Sin autorización escrita no se nombra a ningún cliente.
    proof: { heading: "What that looks like in numbers", stats: [] },

    faqs: [
      {
        question: "Can you work fully white label?",
        answer:
          "Yes. The arrangement can be fully white label, internal support only, or a named specialist your client meets directly. It is agreed in writing before the project starts, and it can differ per client inside the same agency.",
      },
      {
        question: "How do you handle confidentiality with our clients?",
        answer:
          "Client names, figures and screenshots are never reused without written authorization. Relevant experience is shared in anonymized form, so your prospect can judge the work without exposing anyone else's account.",
      },
      {
        question: "Do you work with agencies outside Colombia?",
        answer:
          "Yes. Work is remote with agencies and clients in other countries. Overlap hours and response windows are set in the scope, so there is no ambiguity about when you can reach me.",
      },
      {
        question: "What if the problem turns out to be development, not SEO?",
        answer:
          "You get the finding, the evidence and what it would take to fix it. I do not quietly expand scope into your dev team's work — you decide whether I take it on or your developers do.",
      },
      {
        question: "How is pricing defined?",
        answer:
          "Pricing depends on the skill, the platform, the number of clients or deliverables and the collaboration model — project, volume, hour bank or monthly capacity. It is quoted per engagement after scoping, not from a public rate card.",
      },
    ],

    finalCta: {
      heading: "Tell me what the project needs and I'll tell you if I'm the right fit.",
      label: "Start the conversation",
      to: "/contacto",
    },

    authorSameAs: ["https://www.linkedin.com/in/maria-fer-calderon/"],
  },
};
