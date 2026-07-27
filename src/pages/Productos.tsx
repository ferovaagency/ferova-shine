import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { AnswerBlock } from "@/components/ui/answer-block";
import { StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from "@/components/ui/motion";
import { Sparkles, ArrowRight, ExternalLink, Search, FileText, GitCompare, Newspaper, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ProductosProps { lang?: "es" | "en" | "pt"; }

type Tool = { icon: typeof Search; title: string; desc: string; href: string };

const Productos = ({ lang = "es" }: ProductosProps) => {
  const copy = {
    es: {
      h1: "Productos Ferova",
      lead: "Software y herramientas que resuelven problemas concretos de tu negocio. Los productos de pago te dan un sistema completo; las herramientas gratuitas, una respuesta rápida hoy mismo.",
      paidTitle: "Productos de pago",
      freeTitle: "Herramientas gratuitas",
      freeSub: "Sin registro para usarlas. Creamos herramientas nuevas constantemente.",
      useFree: "Usar herramienta",
      ferovaOne: {
        problem: "¿Tu operación vive repartida entre hojas de cálculo, WhatsApp y agenda?",
        name: "Ferova One",
        tagline: "El sistema operativo con IA para tu negocio.",
        desc: "Une finanzas, CRM y un asistente de IA que piensa por ti y sugiere qué hacer cada día. Reemplaza tus hojas de cálculo, tu CRM y tu agenda en un solo lugar.",
        features: ["Smart Planner por niveles de energía", "Finanzas con impuestos colombianos", "CRM inteligente con enriquecimiento", "WhatsApp con respuestas asistidas por IA", "Sincronización con Google Calendar", "Asistente ejecutivo que recomienda acciones"],
        price: "Founder Access · USD 39/mes",
        cta: "Conocer Ferova One",
      },
      ctaTitle: "¿No sabes qué producto necesitas?",
      ctaText: "Haz el diagnóstico y te decimos qué resuelve tu problema primero.",
      ctaBtn: "Diagnosticar mi empresa",
    },
    en: {
      h1: "Ferova Products",
      lead: "Software and tools that solve concrete business problems. Paid products give you a complete system; free tools give you a quick answer today.",
      paidTitle: "Paid products",
      freeTitle: "Free tools",
      freeSub: "No sign-up to use them. We build new tools all the time.",
      useFree: "Use tool",
      ferovaOne: {
        problem: "Is your operation scattered across spreadsheets, WhatsApp and a calendar?",
        name: "Ferova One",
        tagline: "The AI operating system for your business.",
        desc: "Unifies finance, CRM and an AI assistant that thinks for you and suggests what to do each day. Replaces your spreadsheets, CRM and calendar in one place.",
        features: ["Smart Planner by energy levels", "Finance with tax calculation", "Smart CRM with enrichment", "WhatsApp with AI-assisted replies", "Google Calendar sync", "Executive assistant that recommends actions"],
        price: "Founder Access · USD 39/mo",
        cta: "Discover Ferova One",
      },
      ctaTitle: "Not sure which product you need?",
      ctaText: "Take the diagnosis and we'll tell you what to solve first.",
      ctaBtn: "Diagnose my business",
    },
    pt: {
      h1: "Produtos Ferova",
      lead: "Software e ferramentas que resolvem problemas concretos do seu negócio. Os produtos pagos te dão um sistema completo; as ferramentas grátis, uma resposta rápida hoje.",
      paidTitle: "Produtos pagos",
      freeTitle: "Ferramentas gratuitas",
      freeSub: "Sem cadastro para usar. Criamos ferramentas novas o tempo todo.",
      useFree: "Usar ferramenta",
      ferovaOne: {
        problem: "Sua operação vive espalhada entre planilhas, WhatsApp e agenda?",
        name: "Ferova One",
        tagline: "O sistema operacional com IA para o seu negócio.",
        desc: "Une finanças, CRM e um assistente de IA que pensa por você e sugere o que fazer cada dia. Substitui suas planilhas, CRM e agenda em um só lugar.",
        features: ["Smart Planner por níveis de energia", "Finanças com cálculo de impostos", "CRM inteligente com enriquecimento", "WhatsApp com respostas assistidas por IA", "Sincronização com Google Calendar", "Assistente executivo que recomenda ações"],
        price: "Founder Access · USD 39/mês",
        cta: "Conhecer o Ferova One",
      },
      ctaTitle: "Não sabe de qual produto precisa?",
      ctaText: "Faça o diagnóstico e dizemos o que resolver primeiro.",
      ctaBtn: "Diagnosticar minha empresa",
    },
  }[lang];

  const tools: Tool[] = lang === "es" ? [
    { icon: Search, title: "Calculadora de Visibilidad IA", desc: "Mide en segundos si tu tienda es citable por ChatGPT, Perplexity y Gemini.", href: "/herramientas/calculadora-visibilidad-ia" },
    { icon: FileText, title: "Analizador de Contratos con IA", desc: "Sube un contrato y detecta cláusulas de riesgo antes de firmar.", href: "/recursos/analizador-contratos" },
    { icon: GitCompare, title: "Comparador de Propuestas", desc: "Compara propuestas de agencias y descubre cuál te conviene de verdad.", href: "/recursos/comparador-propuestas" },
    { icon: Newspaper, title: "Briefing de Newsletter", desc: "Genera un briefing de mercado personalizado para tu ecommerce.", href: "/recursos/briefing-newsletter" },
  ] : lang === "pt" ? [
    { icon: Search, title: "Calculadora de Visibilidade IA", desc: "Meça em segundos se sua loja é citável por ChatGPT, Perplexity e Gemini.", href: "/pt/ferramentas/calculadora-visibilidade-ia" },
    { icon: FileText, title: "Analisador de Contratos com IA", desc: "Envie um contrato e detecte cláusulas de risco antes de assinar.", href: "/pt/recursos/analisador-contratos" },
    { icon: GitCompare, title: "Comparador de Propostas", desc: "Compare propostas de agências e descubra qual vale a pena de verdade.", href: "/pt/recursos/comparador-propostas" },
    { icon: Newspaper, title: "Briefing de Newsletter", desc: "Gere um briefing de mercado personalizado para o seu e-commerce.", href: "/pt/recursos/briefing-newsletter" },
  ] : [
    { icon: Search, title: "AI Visibility Calculator", desc: "Measure in seconds whether your store is citable by ChatGPT, Perplexity and Gemini.", href: "/en/tools/ai-visibility-calculator" },
    { icon: FileText, title: "AI Contract Analyzer", desc: "Upload a contract and detect risky clauses before signing.", href: "/en/resources/contract-analyzer" },
    { icon: GitCompare, title: "Proposal Comparator", desc: "Compare agency proposals and find out which one is really worth it.", href: "/en/resources/proposal-comparator" },
    { icon: Newspaper, title: "Newsletter Briefing", desc: "Generate a personalized market briefing for your e-commerce.", href: "/en/resources/newsletter-briefing" },
  ];

  const one = copy.ferovaOne;
  const seoTitle = lang === "es" ? "Productos: Ferova One y herramientas gratuitas — Ferova"
    : lang === "pt" ? "Produtos: Ferova One e ferramentas gratuitas — Ferova"
    : "Products: Ferova One and free tools — Ferova";
  const seoDesc = lang === "es" ? "Ferova One, el sistema operativo con IA para tu negocio (finanzas, CRM y asistente), más herramientas gratuitas de visibilidad IA, contratos y propuestas."
    : lang === "pt" ? "Ferova One, o sistema operacional com IA para o seu negócio (finanças, CRM e assistente), mais ferramentas gratuitas de visibilidade IA, contratos e propostas."
    : "Ferova One, the AI operating system for your business (finance, CRM and assistant), plus free tools for AI visibility, contracts and proposals.";
  const seoPath = lang === "en" ? "/en/products" : lang === "pt" ? "/pt/produtos" : "/productos";
  const diagHref = lang === "en" ? "/en/solutions/business-diagnosis" : lang === "pt" ? "/pt/solucoes/diagnostico-empresarial" : "/soluciones/diagnostico-empresarial";

  return (
    <PageTransition>
      <SEO title={seoTitle} description={seoDesc} path={seoPath} lang={lang} />
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-16 md:py-24 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)" }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5">{copy.h1}</h1>
            <div className="max-w-2xl mx-auto text-left text-muted-foreground">
              <AnswerBlock>{copy.lead}</AnswerBlock>
            </div>
          </div>
        </section>

        {/* Productos de pago */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">{copy.paidTitle}</h2>
            <div className="glass-card p-7 md:p-10 ring-1 ring-gold/30">
              <p className="text-sm text-gold font-medium mb-3">{one.problem}</p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gold/10 text-gold shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-foreground">{one.name}</h3>
                  <p className="text-muted-foreground text-sm">{one.tagline}</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">{one.desc}</p>
              <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                {one.features.map((f: string) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="https://one.ferova.com.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("cta_clicked", { cta: "ferova_one", source: "productos", language: lang })}
                  className="btn-gold inline-flex items-center justify-center gap-2"
                >
                  {one.cta} <ExternalLink className="w-4 h-4" />
                </a>
                <span className="text-sm font-semibold text-foreground">{one.price}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Herramientas gratuitas */}
        <section className="py-12 md:py-16 border-t border-border/40">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">{copy.freeTitle}</h2>
              <p className="text-muted-foreground">{copy.freeSub}</p>
            </div>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {tools.map((tool) => (
                <StaggerItem key={tool.href}>
                  <ScaleOnHover>
                    <Link
                      to={tool.href}
                      onClick={() => trackEvent("cta_clicked", { cta: "free_tool", label: tool.title, source: "productos", language: lang })}
                      className="glass-card p-6 group hover:border-gold/40 transition-all block h-full"
                    >
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-gold/10 text-gold">
                        <tool.icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-foreground mb-2 leading-snug">{tool.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{tool.desc}</p>
                      <span className="inline-flex items-center gap-1 text-gold text-sm font-semibold group-hover:gap-2 transition-all">
                        {copy.useFree} <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA diagnóstico */}
        <section className="py-16 md:py-24 dark-section" style={{ background: "hsl(243, 28%, 14%)" }}>
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-5 text-foreground">{copy.ctaTitle}</h2>
            <p className="text-lg max-w-xl mx-auto mb-10 text-muted-foreground">{copy.ctaText}</p>
            <Link
              to={diagHref}
              onClick={() => trackEvent("cta_clicked", { cta: "diagnostico", source: "productos_cta", language: lang })}
              className="btn-gold inline-flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> {copy.ctaBtn}
            </Link>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </PageTransition>
  );
};

export default Productos;
