/**
 * ============================================================================
 *  src/content/home.ts — copy de la portada (Sprint 3)
 * ============================================================================
 *  Antes todo el texto de la home vivía dentro de Index.tsx (difícil de
 *  mantener). Ahora el contenido está aquí y los componentes de
 *  src/components/home/* solo pintan.
 *
 *  Los íconos se referencian por CLAVE (string); cada componente mapea la
 *  clave a su ícono de lucide-react. Así el contenido queda como datos puros.
 *
 *  ⚠️ Las métricas, el testimonio y las FAQ se conservan EXACTAMENTE como
 *  estaban publicados. La auditoría de afirmaciones (verificar/anonimizar/
 *  reescribir cifras) es la Fase 5 del plan — no se inventó ni cambió ninguna
 *  cifra en este sprint.
 * ============================================================================
 */

export type Lang = "es" | "en" | "pt";

export interface Capability {
  icon: string;
  /** Beneficio primero (lo que gana el cliente). */
  result: string;
  /** Nombre técnico después. */
  name: string;
  href: string;
}

export interface HomeContent {
  seoTitle: string;
  seoDesc: string;
  hero: {
    badge: string;
    h1: string;
    sub: string;
    specialization: string;
    ctaPrimary: string;
    ctaSecondary: string;
    disclaimer: string;
    badges: string[];
  };
  problems: {
    title: string;
    sub: string;
    /** clave estable para analítica + etiqueta visible. */
    items: { key: string; icon: string; label: string }[];
    cta: string;
  };
  capabilities: { title: string; sub: string; items: Capability[] };
  method: { title: string; sub: string; steps: string[]; cta: string };
  results: {
    title: string;
    sub: string;
    metrics: { value: string; label: string }[];
    testimonial: { text: string; name: string; role: string; initials: string };
  };
  faq: { title: string; sub: string; items: { q: string; a: string }[] };
  finalCta: { badge: string; title: string; sub: string; ctaWa: string; ctaAi: string };
}

/** Destinos por idioma para las 6 capacidades. */
const CAP_HREF = {
  es: { estrategia: "/consultoria-estrategica", visibilidad: "/servicios/seo-ecommerce", ventas: "/servicios", tecnologia: "/servicios/diseno-web", ia: "/capacitacion-ia", productos: "/recursos" },
  en: { estrategia: "/en/strategy-advisory", visibilidad: "/en/services/ecommerce-seo", ventas: "/en/services", tecnologia: "/en/services/web-design", ia: "/en/ai-training", productos: "/en/resources" },
  pt: { estrategia: "/pt/consultoria-estrategica", visibilidad: "/pt/seo-ecommerce", ventas: "/pt/servicos", tecnologia: "/pt/design-web", ia: "/pt/treinamento-ia", productos: "/pt/recursos" },
} as const;

export const HOME: Record<Lang, HomeContent> = {
  es: {
    seoTitle: "Agencia de SEO, GEO, IA y Tecnología para Ecommerce | Ferova",
    seoDesc:
      "Encontramos qué está frenando tu empresa y construimos la estrategia, el SEO, la tecnología y la IA que necesita. Especialistas en SEO y GEO para ecommerce en LATAM, Miami y España.",
    hero: {
      badge: "Ferova Agency · Estrategia, SEO, Tecnología e IA",
      h1: "Hacemos crecer empresas.",
      sub: "Encontramos qué está frenando tu negocio y construimos la estrategia, el SEO, la tecnología y la inteligencia artificial que realmente necesita.",
      specialization: "Especialistas en SEO y GEO para ecommerce.",
      ctaPrimary: "Diagnosticar mi empresa",
      ctaSecondary: "Hablar por WhatsApp",
      disclaimer: "No maquillamos negocios. Diseñado para dueños sin experiencia técnica.",
      badges: ["+7 años de experiencia", "366% crecimiento orgánico real", "Cero pauta publicitaria"],
    },
    problems: {
      title: "¿Qué está frenando tu empresa?",
      sub: "Elige lo que más se parece a tu situación. Te llevamos al camino más corto para resolverlo.",
      items: [
        { key: "mas-clientes", icon: "users", label: "Necesito más clientes" },
        { key: "pagina-no-vende", icon: "shopping-cart", label: "Mi página no vende" },
        { key: "todo-depende-de-mi", icon: "user-cog", label: "Todo depende de mí" },
        { key: "usar-ia", icon: "brain-circuit", label: "No sé cómo usar la IA" },
        { key: "trabaja-mucho", icon: "gauge", label: "Trabajamos mucho y avanzamos poco" },
        { key: "que-resolver", icon: "compass", label: "No sé qué resolver primero" },
      ],
      cta: "Ver todas las soluciones",
    },
    capabilities: {
      title: "Qué hacemos",
      sub: "Seis capacidades que se combinan según lo que tu empresa necesita. Primero el resultado, después el nombre técnico.",
      items: [
        { icon: "compass", result: "Sabe exactamente qué hacer y en qué orden.", name: "Estrategia — diagnóstico, consultoría y crecimiento.", href: CAP_HREF.es.estrategia },
        { icon: "search", result: "Haz que te encuentren cuando necesitan lo que vendes.", name: "Visibilidad — SEO, GEO y contenido.", href: CAP_HREF.es.visibilidad },
        { icon: "trending-up", result: "Convierte visitas en clientes, no solo en tráfico.", name: "Ventas — ecommerce, conversión y adquisición.", href: CAP_HREF.es.ventas },
        { icon: "code", result: "Ten una web rápida y sistemas que trabajan por ti.", name: "Tecnología — WebApps, software e integraciones.", href: CAP_HREF.es.tecnologia },
        { icon: "bot", result: "Automatiza lo repetitivo y libera a tu equipo.", name: "Inteligencia artificial — automatización, asistentes y capacitación.", href: CAP_HREF.es.ia },
        { icon: "package", result: "Herramientas que resuelven problemas concretos.", name: "Productos — Ferova One, herramientas y recursos.", href: CAP_HREF.es.productos },
      ],
    },
    method: {
      title: "Antes de recomendarte nada, entendemos",
      sub: "Cada solución sale de un diagnóstico, no de un catálogo. Este es el método Ferova.",
      steps: ["Entendemos", "Encontramos la causa", "Elegimos la solución correcta", "Implementamos", "Medimos", "Aprendemos"],
      cta: "Ver el método completo",
    },
    results: {
      title: "Resultados que respaldan la metodología",
      sub: "+13 marcas impactadas, 7+ años aplicando el mismo framework de crecimiento orgánico.",
      metrics: [
        { value: "+95%", label: "Tráfico orgánico promedio" },
        { value: "+50%", label: "Ingresos orgánicos" },
        { value: "<1s", label: "Velocidad de carga" },
        { value: "14M", label: "COP/mes generados (cliente top)" },
      ],
      testimonial: {
        text: '"Pasamos de no aparecer en Google a generar 14 millones de pesos al mes en orgánico. Ferova no vende humo: vende arquitectura, contenido y resultados. Es el mejor ROI que hemos tenido en 5 años."',
        name: "Ana María Osorio",
        role: "Fundadora, marca de cosmética natural",
        initials: "AO",
      },
    },
    faq: {
      title: "Lo que todo founder pregunta antes de contratar",
      sub: "Respondemos con honestidad — sin tecnicismos ni promesas vacías.",
      items: [
        { q: "¿Cuánto cuesta realmente y qué incluye?", a: "Desde 1.800.000 COP/año por una Web App profesional y desde 600.000 COP/mes por un plan SEO + GEO + IAO completo. El costo del asesoramiento inicial se descuenta del primer mes del servicio contratado. Cero costos ocultos." },
        { q: "¿En cuánto tiempo veré resultados?", a: "Web App: en producción en 1 semana. SEO orgánico: primeros movimientos en 60-90 días, resultados sólidos a partir del mes 6 (por eso pedimos un compromiso mínimo de 6 meses)." },
        { q: "¿Qué pasa si después quiero salir o cambiar de proveedor?", a: "El código y los activos son tuyos desde el día 1. No quedas amarrado a una plataforma propietaria. Te entregamos todo documentado para que cualquier equipo pueda continuar." },
        { q: "¿Cómo miden el éxito y qué reportes recibo?", a: "Tracking limpio de eventos (filtrando bots), reportes mensuales con tráfico, conversiones y revenue atribuido. Si las métricas no se mueven, ajustamos la estrategia sin costo extra." },
        { q: "¿Trabajan con tiendas pequeñas o solo con marcas grandes?", a: "Trabajamos con fundadores serios que quieren escalar — desde tiendas que facturan 5M COP/mes hasta operaciones de 200M+. Lo importante es la mentalidad, no el tamaño actual." },
      ],
    },
    finalCta: {
      badge: "Plazas limitadas este mes",
      title: "¿Listo para construir un activo que venda solo?",
      sub: "Habla con nuestro equipo por WhatsApp o prueba a Fera, nuestra Asesora IA, para diagnosticar tu caso en 2 minutos.",
      ctaWa: "Escribir por WhatsApp",
      ctaAi: "Probar el Asesor IA",
    },
  },

  en: {
    seoTitle: "SEO, GEO, AI & Technology Agency for E-commerce | Ferova",
    seoDesc:
      "We find what's holding your business back and build the strategy, SEO, technology and AI it needs. Specialists in SEO and GEO for e-commerce in LATAM, Miami and Spain.",
    hero: {
      badge: "Ferova Agency · Strategy, SEO, Technology & AI",
      h1: "We grow businesses.",
      sub: "We find what's holding your business back and build the strategy, SEO, technology and artificial intelligence it actually needs.",
      specialization: "Specialists in SEO and GEO for e-commerce.",
      ctaPrimary: "Diagnose my business",
      ctaSecondary: "Chat on WhatsApp",
      disclaimer: "We don't decorate businesses. Built for owners with zero technical background.",
      badges: ["7+ years of experience", "$3.5K/mo generated", "#1 on Google"],
    },
    problems: {
      title: "What's holding your business back?",
      sub: "Pick what most resembles your situation. We'll take you to the shortest path to solve it.",
      items: [
        { key: "mas-clientes", icon: "users", label: "I need more clients" },
        { key: "pagina-no-vende", icon: "shopping-cart", label: "My website doesn't sell" },
        { key: "todo-depende-de-mi", icon: "user-cog", label: "Everything depends on me" },
        { key: "usar-ia", icon: "brain-circuit", label: "I don't know how to use AI" },
        { key: "trabaja-mucho", icon: "gauge", label: "We work hard but barely move" },
        { key: "que-resolver", icon: "compass", label: "I don't know what to solve first" },
      ],
      cta: "See all solutions",
    },
    capabilities: {
      title: "What we do",
      sub: "Six capabilities that combine based on what your business needs. Result first, technical name second.",
      items: [
        { icon: "compass", result: "Know exactly what to do and in what order.", name: "Strategy — diagnosis, advisory and growth.", href: CAP_HREF.en.estrategia },
        { icon: "search", result: "Get found when people need what you sell.", name: "Visibility — SEO, GEO and content.", href: CAP_HREF.en.visibilidad },
        { icon: "trending-up", result: "Turn visits into clients, not just traffic.", name: "Sales — e-commerce, conversion and acquisition.", href: CAP_HREF.en.ventas },
        { icon: "code", result: "Get a fast website and systems that work for you.", name: "Technology — WebApps, software and integrations.", href: CAP_HREF.en.tecnologia },
        { icon: "bot", result: "Automate the repetitive and free up your team.", name: "Artificial intelligence — automation, assistants and training.", href: CAP_HREF.en.ia },
        { icon: "package", result: "Tools that solve concrete problems.", name: "Products — Ferova One, tools and resources.", href: CAP_HREF.en.productos },
      ],
    },
    method: {
      title: "Before recommending anything, we understand",
      sub: "Every solution comes from a diagnosis, not a catalog. This is the Ferova method.",
      steps: ["We understand", "We find the cause", "We choose the right solution", "We implement", "We measure", "We learn"],
      cta: "See the full method",
    },
    results: {
      title: "Results that back the method",
      sub: "13+ brands impacted, 7+ years applying the same organic growth framework.",
      metrics: [
        { value: "+95%", label: "Avg. organic traffic" },
        { value: "+50%", label: "Organic revenue" },
        { value: "<1s", label: "Load speed" },
        { value: "$3.5K", label: "/mo top client revenue" },
      ],
      testimonial: {
        text: "\"We went from invisible on Google to generating $3.5K/month in organic. Ferova doesn't sell hype: they sell architecture, content and results. Best ROI we've had in 5 years.\"",
        name: "Ana María Osorio",
        role: "Founder, natural cosmetics brand",
        initials: "AO",
      },
    },
    faq: {
      title: "What every founder asks before hiring us",
      sub: "Straight answers — no jargon, no empty promises.",
      items: [
        { q: "What does it really cost and what's included?", a: "From $599 USD/year for a professional Web App and from $199 USD/month for a full SEO + GEO + AIO plan. The initial consulting fee is credited against the first month of service. Zero hidden fees." },
        { q: "How long until I see results?", a: "Web App: live in 1 week. Organic SEO: first movements in 60-90 days, solid results from month 6 onwards (that's why we ask for a 6-month minimum)." },
        { q: "What if I want to leave or switch providers later?", a: "Code and assets are yours from day 1. No proprietary lock-in. We deliver everything documented so any team can continue." },
        { q: "How do you measure success and what reports do I get?", a: "Clean event tracking (filtering bots), monthly reports with traffic, conversions and attributed revenue. If metrics don't move, we adjust strategy at no extra cost." },
        { q: "Do you work with small stores or only large brands?", a: "We work with serious founders who want to scale — from stores doing $1.5K/month to $50K+ operations. Mindset matters more than current size." },
      ],
    },
    finalCta: {
      badge: "Limited spots this month",
      title: "Ready to build an asset that sells on its own?",
      sub: "Talk to our team on WhatsApp or try Fera, our AI Advisor, to diagnose your case in 2 minutes.",
      ctaWa: "Message on WhatsApp",
      ctaAi: "Try the AI Advisor",
    },
  },

  pt: {
    seoTitle: "Agência de SEO, GEO, IA e Tecnologia para E-commerce | Ferova",
    seoDesc:
      "Descobrimos o que está travando a sua empresa e construímos a estratégia, o SEO, a tecnologia e a IA que ela precisa. Especialistas em SEO e GEO para e-commerce na LATAM, Miami e Espanha.",
    hero: {
      badge: "Ferova Agency · Estratégia, SEO, Tecnologia e IA",
      h1: "Fazemos empresas crescer.",
      sub: "Descobrimos o que está travando o seu negócio e construímos a estratégia, o SEO, a tecnologia e a inteligência artificial que ele realmente precisa.",
      specialization: "Especialistas em SEO e GEO para e-commerce.",
      ctaPrimary: "Diagnosticar minha empresa",
      ctaSecondary: "Falar pelo WhatsApp",
      disclaimer: "Não maquiamos negócios. Feito para donos sem experiência técnica.",
      badges: ["+7 anos de experiência", "R$17 mil/mês gerados", "#1 no Google"],
    },
    problems: {
      title: "O que está travando a sua empresa?",
      sub: "Escolha o que mais se parece com a sua situação. Levamos você ao caminho mais curto para resolver.",
      items: [
        { key: "mas-clientes", icon: "users", label: "Preciso de mais clientes" },
        { key: "pagina-no-vende", icon: "shopping-cart", label: "Meu site não vende" },
        { key: "todo-depende-de-mi", icon: "user-cog", label: "Tudo depende de mim" },
        { key: "usar-ia", icon: "brain-circuit", label: "Não sei como usar a IA" },
        { key: "trabaja-mucho", icon: "gauge", label: "Trabalhamos muito e avançamos pouco" },
        { key: "que-resolver", icon: "compass", label: "Não sei o que resolver primeiro" },
      ],
      cta: "Ver todas as soluções",
    },
    capabilities: {
      title: "O que fazemos",
      sub: "Seis capacidades que se combinam conforme o que a sua empresa precisa. Primeiro o resultado, depois o nome técnico.",
      items: [
        { icon: "compass", result: "Saiba exatamente o que fazer e em que ordem.", name: "Estratégia — diagnóstico, consultoria e crescimento.", href: CAP_HREF.pt.estrategia },
        { icon: "search", result: "Seja encontrado quando precisam do que você vende.", name: "Visibilidade — SEO, GEO e conteúdo.", href: CAP_HREF.pt.visibilidad },
        { icon: "trending-up", result: "Transforme visitas em clientes, não só em tráfego.", name: "Vendas — e-commerce, conversão e aquisição.", href: CAP_HREF.pt.ventas },
        { icon: "code", result: "Tenha um site rápido e sistemas que trabalham por você.", name: "Tecnologia — WebApps, software e integrações.", href: CAP_HREF.pt.tecnologia },
        { icon: "bot", result: "Automatize o repetitivo e libere a sua equipe.", name: "Inteligência artificial — automação, assistentes e treinamento.", href: CAP_HREF.pt.ia },
        { icon: "package", result: "Ferramentas que resolvem problemas concretos.", name: "Produtos — Ferova One, ferramentas e recursos.", href: CAP_HREF.pt.productos },
      ],
    },
    method: {
      title: "Antes de recomendar qualquer coisa, entendemos",
      sub: "Cada solução nasce de um diagnóstico, não de um catálogo. Este é o método Ferova.",
      steps: ["Entendemos", "Encontramos a causa", "Escolhemos a solução certa", "Implementamos", "Medimos", "Aprendemos"],
      cta: "Ver o método completo",
    },
    results: {
      title: "Resultados que sustentam a metodologia",
      sub: "+13 marcas impactadas, 7+ anos aplicando o mesmo framework de crescimento orgânico.",
      metrics: [
        { value: "+95%", label: "Tráfego orgânico médio" },
        { value: "+50%", label: "Receita orgânica" },
        { value: "<1s", label: "Velocidade de carga" },
        { value: "R$17k", label: "/mês cliente top" },
      ],
      testimonial: {
        text: '"Saímos do invisível no Google para gerar R$17 mil por mês em orgânico. A Ferova não vende fumaça: vende arquitetura, conteúdo e resultados. Melhor ROI dos últimos 5 anos."',
        name: "Ana María Osorio",
        role: "Fundadora, marca de cosmética natural",
        initials: "AO",
      },
    },
    faq: {
      title: "O que todo founder pergunta antes de contratar",
      sub: "Respondemos com honestidade — sem jargões nem promessas vazias.",
      items: [
        { q: "Quanto custa de verdade e o que está incluído?", a: "A partir de R$2.990/ano por uma Web App profissional e a partir de R$990/mês por um plano SEO + GEO + IAO completo. O custo da consultoria inicial é descontado do primeiro mês do serviço contratado. Zero custos ocultos." },
        { q: "Em quanto tempo vejo resultados?", a: "Web App: no ar em 1 semana. SEO orgânico: primeiros movimentos em 60-90 dias, resultados sólidos a partir do mês 6 (por isso pedimos um compromisso mínimo de 6 meses)." },
        { q: "E se eu quiser sair ou trocar de fornecedor depois?", a: "O código e os ativos são seus desde o dia 1. Sem amarras em plataforma proprietária. Entregamos tudo documentado para qualquer equipe continuar." },
        { q: "Como medem o sucesso e que relatórios recebo?", a: "Tracking limpo de eventos (filtrando bots), relatórios mensais com tráfego, conversões e receita atribuída. Se as métricas não se mexem, ajustamos a estratégia sem custo extra." },
        { q: "Atendem lojas pequenas ou só marcas grandes?", a: "Trabalhamos com fundadores sérios que querem escalar — desde lojas faturando R$15 mil/mês até operações de R$500 mil+. Mentalidade importa mais que tamanho atual." },
      ],
    },
    finalCta: {
      badge: "Vagas limitadas este mês",
      title: "Pronto para construir um ativo que vende sozinho?",
      sub: "Fale com nossa equipe no WhatsApp ou teste a Fera, nossa Consultora IA, para diagnosticar seu caso em 2 minutos.",
      ctaWa: "Escrever no WhatsApp",
      ctaAi: "Testar a Consultora IA",
    },
  },
};

/** WhatsApp link compartido por toda la home. */
export const WHATSAPP_URL = "https://wa.link/jvbd4j";

/** Helpers de rutas locales para la home. */
export function solucionesHref(lang: Lang): string {
  return lang === "en" ? "/en/solutions" : lang === "pt" ? "/pt/solucoes" : "/soluciones";
}
export function metodoHref(lang: Lang): string {
  return lang === "en" ? "/en/ferova-method" : lang === "pt" ? "/pt/metodo-ferova" : "/metodo-ferova";
}
export function contactoHref(lang: Lang): string {
  return lang === "en" ? "/en/contact" : lang === "pt" ? "/pt/contato" : "/contacto";
}
