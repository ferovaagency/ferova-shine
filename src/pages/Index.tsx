import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Zap,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Globe,
  Bot,
  Wrench,
  Star,
  Sparkles,
  Award,
  Trophy,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trackEvent } from "@/lib/analytics";
import ValueLadder from "@/components/sections/ValueLadder";

interface IndexProps {
  lang?: "es" | "en" | "pt";
}

const WHATSAPP_URL = "https://wa.link/jvbd4j";

type Copy = {
  seoTitle: string;
  seoDesc: string;
  // Hero
  h1a: string;
  h1b: string;
  heroSub: string;
  badges: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  // Problema
  problemTitle: string;
  problemSub: string;
  problems: { icon: any; title: string; desc: string }[];
  // Solución
  solutionTitle: string;
  solutionSub: string;
  services: { icon: any; title: string; desc: string; href: string }[];
  // Resultados
  resultsTitle: string;
  resultsSub: string;
  metrics: { value: string; label: string }[];
  testimonialName: string;
  testimonialRole: string;
  testimonialText: string;
  // TAYA
  tayaTitle: string;
  tayaSub: string;
  faqs: { q: string; a: string }[];
  // CTA final
  finalTitle: string;
  finalSub: string;
  finalCtaWa: string;
  finalCtaAi: string;
};

const COPY: Record<"es" | "en" | "pt", Copy> = {
  es: {
    seoTitle: "Consultora B2B de IA y Estrategia de Crecimiento | Ferova Agency",
    seoDesc:
      "Instalamos infraestructura B2B con IA para que tu equipo venda solo. Sin maquillaje digital. Diseñado para dueños sin experiencia técnica.",
    h1a: "Hecho para empresarios que quieren ",
    h1b: "VENDER, no solo verse bien.",
    heroSub:
      "Las agencias tradicionales están desangrando tu flujo de caja con entregables inútiles. Instalamos infraestructura B2B con IA para que tu equipo venda de forma autónoma. Piénsalo: si ChatGPT, Gemini o Perplexity no mencionan tu marca hoy, ya no existes para el mercado.",
    badges: ["+7 años de experiencia", "366% crecimiento orgánico real", "Cero pauta publicitaria"],
    ctaPrimary: "Agendar Llamada de Alineación (15 Min)",
    ctaSecondary: "Hablar por WhatsApp",
    problemTitle: "¿Te suena familiar?",
    problemSub: "Estos son los 3 dolores que más nos cuentan los fundadores B2B antes de trabajar con nosotros.",
    problems: [
      {
        icon: Search,
        title: "No te encuentran orgánicamente",
        desc: "Tu marca no aparece en Google ni en las respuestas de IA. Pagas anuncios para sobrevivir, no para crecer.",
      },
      {
        icon: Zap,
        title: "Web lenta que no convierte",
        desc: "Tu sitio carga en 5+ segundos, falla en mobile y pierdes 53% de visitantes antes del primer scroll.",
      },
      {
        icon: MessageCircle,
        title: "Atención al cliente saturada",
        desc: "Tu equipo responde las mismas preguntas todo el día por WhatsApp y los leads calientes se enfrían.",
      },
    ],
    solutionTitle: "La solución: un stack completo para escalar",
    solutionSub: "Cuatro pilares trabajando en conjunto para que tu negocio crezca sin fricción.",
    services: [
      {
        icon: Globe,
        title: "Web Apps E-commerce",
        desc: "Tiendas ultrarrápidas (<1s), seguras y diseñadas para convertir desde el primer clic.",
        href: "/servicios/diseno-web",
      },
      {
        icon: Search,
        title: "SEO + GEO + IAO",
        desc: "Posicionamiento orgánico, geográfico y para motores de IA. Tu marca citada por ChatGPT, Perplexity y Google.",
        href: "/servicios/seo-ecommerce",
      },
      {
        icon: Bot,
        title: "WhatsApp IA Bot",
        desc: "Asistente que responde, califica y cierra ventas 24/7 en WhatsApp Business con tu tono de marca.",
        href: "/servicios/whatsapp-ia-bot",
      },
      {
        icon: Wrench,
        title: "Herramientas Premium",
        desc: "Acceso a herramientas de SEO, automatización e IA con descuentos exclusivos para clientes.",
        href: "/servicios/descuentos-herramientas",
      },
    ],
    resultsTitle: "Resultados que respaldan la metodología",
    resultsSub: "+13 marcas impactadas, 7+ años aplicando el mismo framework de crecimiento orgánico.",
    metrics: [
      { value: "+95%", label: "Tráfico orgánico promedio" },
      { value: "+50%", label: "Ingresos orgánicos" },
      { value: "<1s", label: "Velocidad de carga" },
      { value: "14M", label: "COP/mes generados (cliente top)" },
    ],
    testimonialName: "Ana María Osorio",
    testimonialRole: "Fundadora, marca de cosmética natural",
    testimonialText:
      '"Pasamos de no aparecer en Google a generar 14 millones de pesos al mes en orgánico. Ferova no vende humo: vende arquitectura, contenido y resultados. Es el mejor ROI que hemos tenido en 5 años."',
    tayaTitle: "Lo que todo founder pregunta antes de contratar",
    tayaSub: "Respondemos con honestidad — sin tecnicismos ni promesas vacías.",
    faqs: [
      {
        q: "¿Cuánto cuesta realmente y qué incluye?",
        a: "Desde 1.800.000 COP/año por una Web App profesional y desde 600.000 COP/mes por un plan SEO + GEO + IAO completo. El costo del asesoramiento inicial se descuenta del primer mes del servicio contratado. Cero costos ocultos.",
      },
      {
        q: "¿En cuánto tiempo veré resultados?",
        a: "Web App: en producción en 1 semana. SEO orgánico: primeros movimientos en 60-90 días, resultados sólidos a partir del mes 6 (por eso pedimos un compromiso mínimo de 6 meses).",
      },
      {
        q: "¿Qué pasa si después quiero salir o cambiar de proveedor?",
        a: "El código y los activos son tuyos desde el día 1. No quedas amarrado a una plataforma propietaria. Te entregamos todo documentado para que cualquier equipo pueda continuar.",
      },
      {
        q: "¿Cómo miden el éxito y qué reportes recibo?",
        a: "Tracking limpio de eventos (filtrando bots), reportes mensuales con tráfico, conversiones y revenue atribuido. Si las métricas no se mueven, ajustamos la estrategia sin costo extra.",
      },
      {
        q: "¿Trabajan con tiendas pequeñas o solo con marcas grandes?",
        a: "Trabajamos con fundadores serios que quieren escalar — desde tiendas que facturan 5M COP/mes hasta operaciones de 200M+. Lo importante es la mentalidad, no el tamaño actual.",
      },
    ],
    finalTitle: "¿Listo para construir un activo que venda solo?",
    finalSub:
      "Habla con nuestro equipo por WhatsApp o prueba a Fera, nuestra Asesora IA, para diagnosticar tu caso en 2 minutos.",
    finalCtaWa: "Escribir por WhatsApp",
    finalCtaAi: "Probar el Asesor IA",
  },
  en: {
    seoTitle: "High-Performance Web Apps & AI for E-commerce | Ferova Agency",
    seoDesc:
      "We build ultra-fast Web Apps, SEO + GEO + AIO and WhatsApp AI bots to scale your e-commerce. 7+ years of experience, measurable results.",
    h1a: "High-Performance Web Apps & ",
    h1b: "AI for E-commerce",
    heroSub:
      "We turn your store into a sales machine: native SEO architecture, WhatsApp AI bots and clear metrics. Built for founders who want to scale, not decorate.",
    badges: ["7+ years of experience", "$3.5K/mo generated", "#1 on Google"],
    ctaPrimary: "Generate my Market Briefing (Free)",
    ctaSecondary: "Chat on WhatsApp",
    problemTitle: "Sound familiar?",
    problemSub: "The 3 pains B2B founders bring us most often before working together.",
    problems: [
      {
        icon: Search,
        title: "You can't be found organically",
        desc: "Your brand doesn't show up on Google or in AI answers. You pay ads to survive, not to grow.",
      },
      {
        icon: Zap,
        title: "A slow site that doesn't convert",
        desc: "Your site loads in 5+ seconds, breaks on mobile and you lose 53% of visitors before the first scroll.",
      },
      {
        icon: MessageCircle,
        title: "Customer support overloaded",
        desc: "Your team answers the same questions all day on WhatsApp and hot leads go cold.",
      },
    ],
    solutionTitle: "The solution: a full stack to scale",
    solutionSub: "Four pillars working together so your business grows without friction.",
    services: [
      {
        icon: Globe,
        title: "E-commerce Web Apps",
        desc: "Ultra-fast (<1s) stores, secure and designed to convert from the first click.",
        href: "/en/services/web-design",
      },
      {
        icon: Search,
        title: "SEO + GEO + AIO",
        desc: "Organic, geographic and AI-engine ranking. Get cited by ChatGPT, Perplexity and Google.",
        href: "/en/services/ecommerce-seo",
      },
      {
        icon: Bot,
        title: "WhatsApp AI Bot",
        desc: "Assistant that replies, qualifies and closes sales 24/7 on WhatsApp Business in your brand voice.",
        href: "/services/whatsapp-ai-bot",
      },
      {
        icon: Wrench,
        title: "Premium Tools",
        desc: "Access to SEO, automation and AI tools with exclusive client discounts.",
        href: "/en/services/tool-discounts",
      },
    ],
    resultsTitle: "Results that back the method",
    resultsSub: "13+ brands impacted, 7+ years applying the same organic growth framework.",
    metrics: [
      { value: "+95%", label: "Avg. organic traffic" },
      { value: "+50%", label: "Organic revenue" },
      { value: "<1s", label: "Load speed" },
      { value: "$3.5K", label: "/mo top client revenue" },
    ],
    testimonialName: "Ana María Osorio",
    testimonialRole: "Founder, natural cosmetics brand",
    testimonialText:
      "\"We went from invisible on Google to generating $3.5K/month in organic. Ferova doesn't sell hype: they sell architecture, content and results. Best ROI we've had in 5 years.\"",
    tayaTitle: "What every founder asks before hiring us",
    tayaSub: "Straight answers — no jargon, no empty promises.",
    faqs: [
      {
        q: "What does it really cost and what's included?",
        a: "From $599 USD/year for a professional Web App and from $199 USD/month for a full SEO + GEO + AIO plan. The initial consulting fee is credited against the first month of service. Zero hidden fees.",
      },
      {
        q: "How long until I see results?",
        a: "Web App: live in 1 week. Organic SEO: first movements in 60-90 days, solid results from month 6 onwards (that's why we ask for a 6-month minimum).",
      },
      {
        q: "What if I want to leave or switch providers later?",
        a: "Code and assets are yours from day 1. No proprietary lock-in. We deliver everything documented so any team can continue.",
      },
      {
        q: "How do you measure success and what reports do I get?",
        a: "Clean event tracking (filtering bots), monthly reports with traffic, conversions and attributed revenue. If metrics don't move, we adjust strategy at no extra cost.",
      },
      {
        q: "Do you work with small stores or only large brands?",
        a: "We work with serious founders who want to scale — from stores doing $1.5K/month to $50K+ operations. Mindset matters more than current size.",
      },
    ],
    finalTitle: "Ready to build an asset that sells on its own?",
    finalSub: "Talk to our team on WhatsApp or try Fera, our AI Advisor, to diagnose your case in 2 minutes.",
    finalCtaWa: "Message on WhatsApp",
    finalCtaAi: "Try the AI Advisor",
  },
  pt: {
    seoTitle: "Web Apps de Alto Desempenho e IA para E-commerce | Ferova Agency",
    seoDesc:
      "Construímos Web Apps ultrarrápidas, SEO + GEO + IAO e bots de WhatsApp com IA para escalar seu e-commerce. 7+ anos de experiência, resultados mensuráveis.",
    h1a: "Web Apps de Alto Desempenho e ",
    h1b: "IA para E-commerce",
    heroSub:
      "Transformamos sua loja em uma máquina de vendas: arquitetura SEO nativa, bots de WhatsApp com IA e métricas claras. Feito para fundadores que querem escalar, não maquiar.",
    badges: ["+7 anos de experiência", "R$17 mil/mês gerados", "#1 no Google"],
    ctaPrimary: "Gerar meu Briefing de Mercado (Grátis)",
    ctaSecondary: "Falar pelo WhatsApp",
    problemTitle: "Soa familiar?",
    problemSub: "As 3 dores que os fundadores B2B mais nos trazem antes de trabalhar juntos.",
    problems: [
      {
        icon: Search,
        title: "Você não é encontrado organicamente",
        desc: "Sua marca não aparece no Google nem nas respostas de IA. Você paga anúncios para sobreviver, não para crescer.",
      },
      {
        icon: Zap,
        title: "Site lento que não converte",
        desc: "Seu site carrega em 5+ segundos, falha no mobile e você perde 53% dos visitantes antes do primeiro scroll.",
      },
      {
        icon: MessageCircle,
        title: "Atendimento sobrecarregado",
        desc: "Seu time responde as mesmas perguntas o dia todo no WhatsApp e os leads quentes esfriam.",
      },
    ],
    solutionTitle: "A solução: um stack completo para escalar",
    solutionSub: "Quatro pilares trabalhando juntos para o seu negócio crescer sem fricção.",
    services: [
      {
        icon: Globe,
        title: "Web Apps E-commerce",
        desc: "Lojas virtuais ultrarrápidas (<1s), seguras e desenhadas para converter desde o primeiro clique.",
        href: "/pt/design-web",
      },
      {
        icon: Search,
        title: "SEO + GEO + IAO",
        desc: "Posicionamento orgânico, geográfico e para motores de IA. Sua marca citada por ChatGPT, Perplexity e Google.",
        href: "/pt/seo-ecommerce",
      },
      {
        icon: Bot,
        title: "WhatsApp IA Bot",
        desc: "Assistente que responde, qualifica e fecha vendas 24/7 no WhatsApp Business com a voz da sua marca.",
        href: "/pt/whatsapp-ia-bot",
      },
      {
        icon: Wrench,
        title: "Ferramentas Premium",
        desc: "Acesso a ferramentas de SEO, automação e IA com descontos exclusivos para clientes.",
        href: "/pt/ferramentas",
      },
    ],
    resultsTitle: "Resultados que sustentam a metodologia",
    resultsSub: "+13 marcas impactadas, 7+ anos aplicando o mesmo framework de crescimento orgânico.",
    metrics: [
      { value: "+95%", label: "Tráfego orgânico médio" },
      { value: "+50%", label: "Receita orgânica" },
      { value: "<1s", label: "Velocidade de carga" },
      { value: "R$17k", label: "/mês cliente top" },
    ],
    testimonialName: "Ana María Osorio",
    testimonialRole: "Fundadora, marca de cosmética natural",
    testimonialText:
      '"Saímos do invisível no Google para gerar R$17 mil por mês em orgânico. A Ferova não vende fumaça: vende arquitetura, conteúdo e resultados. Melhor ROI dos últimos 5 anos."',
    tayaTitle: "O que todo founder pergunta antes de contratar",
    tayaSub: "Respondemos com honestidade — sem jargões nem promessas vazias.",
    faqs: [
      {
        q: "Quanto custa de verdade e o que está incluído?",
        a: "A partir de R$2.990/ano por uma Web App profissional e a partir de R$990/mês por um plano SEO + GEO + IAO completo. O custo da consultoria inicial é descontado do primeiro mês do serviço contratado. Zero custos ocultos.",
      },
      {
        q: "Em quanto tempo vejo resultados?",
        a: "Web App: no ar em 1 semana. SEO orgânico: primeiros movimentos em 60-90 dias, resultados sólidos a partir do mês 6 (por isso pedimos um compromisso mínimo de 6 meses).",
      },
      {
        q: "E se eu quiser sair ou trocar de fornecedor depois?",
        a: "O código e os ativos são seus desde o dia 1. Sem amarras em plataforma proprietária. Entregamos tudo documentado para qualquer equipe continuar.",
      },
      {
        q: "Como medem o sucesso e que relatórios recebo?",
        a: "Tracking limpo de eventos (filtrando bots), relatórios mensais com tráfego, conversões e receita atribuída. Se as métricas não se mexem, ajustamos a estratégia sem custo extra.",
      },
      {
        q: "Atendem lojas pequenas ou só marcas grandes?",
        a: "Trabalhamos com fundadores sérios que querem escalar — desde lojas faturando R$15 mil/mês até operações de R$500 mil+. Mentalidade importa mais que tamanho atual.",
      },
    ],
    finalTitle: "Pronto para construir um ativo que vende sozinho?",
    finalSub:
      "Fale com nossa equipe no WhatsApp ou teste a Fera, nossa Consultora IA, para diagnosticar seu caso em 2 minutos.",
    finalCtaWa: "Escrever no WhatsApp",
    finalCtaAi: "Testar a Consultora IA",
  },
};

const Index = ({ lang = "es" }: IndexProps) => {
  const c = COPY[lang];
  const path = lang === "en" ? "/en" : lang === "pt" ? "/pt" : "/";

  useEffect(() => {
    trackEvent("page_view", { page: "home", lang });
  }, [lang]);

  const openAiAdvisor = () => {
    trackEvent("cta_clicked", { cta: "open_ai_advisor", section: "final" });
    // Try to click the floating chat trigger
    const trigger = document.querySelector<HTMLButtonElement>('button[aria-label*="IA"], button[aria-label*="AI"]');
    trigger?.click();
  };

  const handleWa = (section: string) => {
    trackEvent("whatsapp_button_clicked", { section, lang });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO title={c.seoTitle} description={c.seoDesc} path={path} lang={lang} />
      <Header lang={lang} />

      <main className="flex-1">
        {/* ===== SECCIÓN 1 — HERO ===== */}
        <section
          className="relative overflow-hidden dark-section pt-24 pb-20 md:pt-32 md:pb-28"
          style={{
            background: "linear-gradient(135deg, hsl(243,31%,10%) 0%, hsl(243,31%,14%) 60%, hsl(356,68%,15%) 100%)",
          }}
        >
          <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-medium bg-white/5 border border-white/10 text-white/80">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Ferova Agency · B2B Growth Stack
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-6">
              {c.h1a}
              <span className="text-gradient-gold">{c.h1b}</span>
            </h1>

            <p className="text-base md:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed mb-8">{c.heroSub}</p>

            {/* Authority badges */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
              {c.badges.map((b, i) => {
                const Icon = i === 0 ? Award : i === 1 ? TrendingUp : Trophy;
                return (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium bg-gold/10 text-gold border border-gold/30"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {b}
                  </span>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button
                onClick={() => {
                  trackEvent("cta_clicked", { cta: "briefing", section: "hero" });
                  openAiAdvisor();
                }}
                className="btn-gold w-full sm:w-auto inline-flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {c.ctaPrimary}
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWa("hero")}
                className="btn-outline-gold w-full sm:w-auto inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {c.ctaSecondary}
              </a>
            </div>
            <p className="mt-5 text-xs md:text-sm text-white/55 italic">
              {lang === "es"
                ? "No maquillamos negocios. Diseñado para dueños sin experiencia técnica."
                : lang === "pt"
                ? "Não maquiamos negócios. Feito para donos sem experiência técnica."
                : "We don't decorate businesses. Built for owners with zero technical background."}
            </p>
          </div>
        </section>

        {/* ===== ESCALERA DE VALOR (B2B) ===== */}
        <ValueLadder lang={lang} />

        {/* ===== SECCIÓN 2 — PROBLEMA ===== */}
        <section className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{c.problemTitle}</h2>
              <p className="text-base md:text-lg text-muted-foreground">{c.problemSub}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {c.problems.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="glass-card p-6 md:p-7 hover:border-wine/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-wine/10 text-wine-light">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">{title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECCIÓN 3 — SOLUCIÓN ===== */}
        <section className="py-16 md:py-24 px-4 sm:px-6 dark-section" style={{ background: "hsl(243 31% 10%)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">{c.solutionTitle}</h2>
              <p className="text-base md:text-lg text-white/70">{c.solutionSub}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              {c.services.map(({ icon: Icon, title, desc, href }) => (
                <Link
                  key={title}
                  to={href}
                  onClick={() => trackEvent("service_card_clicked", { service: title })}
                  className="glass-card p-6 md:p-7 group hover:border-gold/40 transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gold/10 text-gold group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold mb-1.5 text-white flex items-center gap-2">
                        {title}
                        <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-sm md:text-base text-white/65 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECCIÓN 4 — RESULTADOS & E-E-A-T ===== */}
        <section className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{c.resultsTitle}</h2>
              <p className="text-base md:text-lg text-muted-foreground">{c.resultsSub}</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
              {c.metrics.map((m) => (
                <div key={m.label} className="glass-card p-5 md:p-6 text-center">
                  <p className="text-3xl md:text-5xl font-bold text-gradient-gold mb-2">{m.value}</p>
                  <p className="text-xs md:text-sm text-muted-foreground leading-snug">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Featured testimonial */}
            <div className="glass-card max-w-3xl mx-auto p-7 md:p-10 gold-glow">
              <div className="flex gap-1 mb-4 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-base md:text-xl leading-relaxed text-foreground text-center italic mb-6">
                {c.testimonialText}
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-white font-bold">
                  AO
                </div>
                <div className="text-left">
                  <p className="font-bold text-foreground">{c.testimonialName}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{c.testimonialRole}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECCIÓN 5 — TAYA ===== */}
        <section className="py-16 md:py-24 px-4 sm:px-6" style={{ background: "hsl(var(--surface))" }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{c.tayaTitle}</h2>
              <p className="text-base md:text-lg text-muted-foreground">{c.tayaSub}</p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {c.faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="glass-card border px-5 md:px-6 !border-border">
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:no-underline py-5">
                    <span className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span>{f.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pb-5 pl-8">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ===== SECCIÓN 6 — CTA FINAL ===== */}
        <section
          className="relative overflow-hidden py-20 md:py-28 px-4 sm:px-6 dark-section"
          style={{
            background: "linear-gradient(135deg, hsl(243,31%,10%) 0%, hsl(356,68%,20%) 100%)",
          }}
        >
          <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden />
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-medium bg-gold/15 border border-gold/30 text-gold">
              <Sparkles className="w-3.5 h-3.5" />
              Plazas limitadas este mes
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white">{c.finalTitle}</h2>
            <p className="text-base md:text-xl text-white/75 mb-10 leading-relaxed">{c.finalSub}</p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWa("final")}
                className="btn-gold w-full sm:w-auto inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {c.finalCtaWa}
              </a>
              <button
                onClick={openAiAdvisor}
                className="btn-outline-gold w-full sm:w-auto inline-flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4" />
                {c.finalCtaAi}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default Index;
