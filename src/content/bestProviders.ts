/**
 * "Best white label SEO providers for ecommerce" — lista comparativa (EN).
 *
 * Por qué existe: a Map Ranking su lista "top 10 white label SEO agencies" le
 * trae tráfico (#4 para "white label seo programs", 1.300/mes en EE. UU.,
 * Ubersuggest nov 2026). Esta es la versión centrada en ecommerce.
 *
 * REGLAS:
 *  - Cada afirmación sobre un tercero sale de SU propia página, con URL y fecha
 *    de consulta. Nada de reseñas, cifras de clientes ni rankings inventados.
 *  - Precios de terceros solo si se verificaron en su página. Si no, "see site".
 *  - Ferova aparece con aviso explícito de que es nuestro servicio.
 */

export type Provider = {
  name: string;
  url: string;
  /** Página de la que sale la información, y fecha de consulta. */
  source: string;
  consulted: string;
  bestFor: string;
  focus: string;
  pricing: string;
  notes: string[];
  ours?: boolean;
};

export const BEST_PROVIDERS = {
  path: "/en/best-white-label-seo-providers-for-ecommerce",
  metaTitle: "Best White Label SEO Providers for Ecommerce (2026)",
  metaDescription:
    "A sourced comparison of white label SEO providers for agencies with ecommerce clients: focus, best fit and published pricing, with the source next to every claim.",
  eyebrow: "Comparison · White label SEO · 2026",
  h1: "Best white label SEO providers for ecommerce agencies in 2026",
  lede:
    "Most white label SEO lists rank providers for local businesses. This one looks at what an agency with online-store clients needs: technical depth, catalogue architecture, migrations and clear pricing.",
  disclosure:
    "Disclosure: this page is published by Ferova, which appears first on the list. Every claim about another provider comes from that provider's own website, linked and dated. Check current terms on their site before contracting.",
  criteriaTitle: "How we compared them",
  criteria: [
    "Ecommerce focus: does the provider say it works on online stores, catalogues or ecommerce platforms?",
    "White label delivery: branded reports, dashboards and confidentiality for the agency's clients.",
    "Pricing transparency: are prices published, or only available after a call?",
    "Fit: the kind of agency and client each provider is built for.",
  ],
  providers: [
    {
      name: "Ferova",
      url: "https://seoparaecommerce.co/en/white-label-seo-for-agencies",
      source: "seoparaecommerce.co/en/white-label-seo-for-agencies",
      consulted: "Nov 2026",
      bestFor: "Agencies with ecommerce clients that need senior technical SEO under their brand",
      focus: "Ecommerce and technical SEO: catalogue architecture, faceted navigation, migrations",
      pricing: "USD 750 audit · USD 1,250/mo for 20 hours · USD 500/mo per site",
      notes: [
        "Delivered by María Fernanda Calderón, Fractional SEO at Ferova.",
        "No long-term contracts and no setup fee; written guarantee on resellable deliverables.",
        "English and Spanish delivery.",
      ],
      ours: true,
    },
    {
      name: "SEOReseller",
      url: "https://www.seoreseller.com/",
      source: "seoreseller.com",
      consulted: "Nov 2026",
      bestFor: "Agencies that want packaged SEO and PPC to resell with a white label dashboard",
      focus: "General white label SEO and PPC packages for resellers",
      pricing: "See site",
      notes: [
        "States it offers a white label dashboard for client reporting.",
        "States it charges no setup fees and doesn't lock resellers into contracts.",
      ],
    },
    {
      name: "Boostability",
      url: "https://www.boostability.com/seo-reseller-partner/",
      source: "boostability.com/seo-reseller-partner",
      consulted: "Nov 2026",
      bestFor: "Agencies reselling SEO to small businesses at volume",
      focus: "White label SEO reseller program for small and medium businesses",
      pricing: "Wholesale rates; see site",
      notes: [
        "Describes three partner models: agency reseller, supported reseller and white label reseller.",
        "Partners buy at wholesale rates and set their own retail prices.",
      ],
    },
    {
      name: "Semify",
      url: "https://www.semify.com/seo-program",
      source: "semify.com/seo-program",
      consulted: "Nov 2026",
      bestFor: "Agencies that want a managed white label SEO program with an account manager",
      focus: "White label SEO: keyword research, on-page, content and link building",
      pricing: "See site",
      notes: [
        "States it has run its SEO reseller program since 2008.",
        "Offers a dedicated account manager and a white-labeled dashboard.",
      ],
    },
    {
      name: "DashClicks",
      url: "https://www.dashclicks.com/fulfillment/seo",
      source: "dashclicks.com/fulfillment/seo",
      consulted: "Nov 2026",
      bestFor: "Agencies that want SEO fulfillment inside a broader agency platform",
      focus: "White label SEO fulfillment for marketing agencies",
      pricing: "See site",
      notes: ["SEO is one of several white label fulfillment services offered to agencies."],
    },
    {
      name: "E2M Solutions",
      url: "https://www.e2msolutions.com/white-label-ecommerce-seo-services/",
      source: "e2msolutions.com/white-label-ecommerce-seo-services",
      consulted: "Nov 2026",
      bestFor: "Agencies looking for a dedicated white label ecommerce SEO service page and plans",
      focus: "White label ecommerce SEO for digital agencies",
      pricing: "See site",
      notes: ["Has a service page specifically for white label ecommerce SEO."],
    },
    {
      name: "Map Ranking",
      url: "https://mapranking.com/white-label-local-seo/",
      source: "mapranking.com/white-label-local-seo",
      consulted: "Nov 2026",
      bestFor: "Agencies whose clients are local businesses that depend on Google Maps",
      focus: "White label local SEO and Google Maps visibility",
      pricing: "From USD 299/mo (USD 399/mo tier)",
      notes: ["Built for local search rather than online stores."],
    },
  ] as Provider[],
  howToChooseTitle: "How to choose a white label SEO provider for ecommerce",
  howToChoose: [
    "Ask for a sample audit of a store, not a local business. Look for faceted navigation, variants, pagination and out-of-stock handling.",
    "Check who does the work. A named senior specialist and a fulfillment team are different products at different prices.",
    "Read the contract terms: minimum commitment, setup fees, what happens to deliverables when you stop.",
    "Confirm reports can carry your brand and that nothing reaches your client without your approval.",
    "If your client is planning a platform migration, ask how the provider maps URLs and tests redirects before launch.",
  ],
  faqs: [
    {
      question: "What is the best white label SEO provider for ecommerce?",
      answer:
        "It depends on the client. For online stores with catalogue, faceted navigation or migration problems, a provider focused on ecommerce and technical SEO fits best. For local businesses that depend on Google Maps, a local SEO specialist is the better choice.",
    },
    {
      question: "How much does white label ecommerce SEO cost?",
      answer:
        "Published prices vary widely and many providers only quote after a call. Ferova publishes a USD 750 audit, USD 1,250 a month for 20 senior hours and USD 500 a month per site. Map Ranking lists local SEO plans from USD 299 a month.",
    },
    {
      question: "Is this list sponsored?",
      answer:
        "No provider paid to appear. The page is published by Ferova, which is listed first and disclosed as our own service. Information about other providers comes from their own websites, linked and dated, and should be checked for current terms.",
    },
  ],
  related: [
    { label: "White label SEO services for ecommerce", to: "/en/white-label-seo-for-agencies" },
    { label: "Map Ranking alternative for ecommerce", to: "/en/map-ranking-alternative" },
    { label: "Technical SEO audit services", to: "/en/technical-seo-audit-services" },
  ],
};
