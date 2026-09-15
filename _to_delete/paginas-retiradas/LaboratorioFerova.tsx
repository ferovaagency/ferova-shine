import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { AnswerBlock } from "@/components/ui/answer-block";
import { StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from "@/components/ui/motion";
import { Clock, Search, FileText, GitCompare, Newspaper, ArrowRight, FlaskConical, type LucideIcon } from "lucide-react";
import type { Lang } from "@/config/routes";

interface Props { lang?: Lang }

type Tool = { icon: LucideIcon; title: string; desc: string; href: string; tag?: string };

const LaboratorioFerova = ({ lang = "es" }: Props) => {
  const t = {
    es: {
      h1: "Laboratorio Ferova",
      lead: "Calculadoras, diagnósticos y herramientas gratuitas para tomar mejores decisiones de crecimiento. Sin registro para usarlas.",
      seoTitle: "Laboratorio Ferova — herramientas y calculadoras gratis",
      seoDesc: "Calculadoras y diagnósticos gratuitos de Ferova: valor por hora freelance, visibilidad en IA, contratos y propuestas. Sin registro.",
      path: "/recursos/herramientas", nuevo: "Nuevo", use: "Abrir",
    },
    en: {
      h1: "Ferova Lab",
      lead: "Free calculators, diagnostics and tools to make better growth decisions. No sign-up to use them.",
      seoTitle: "Ferova Lab — free tools and calculators",
      seoDesc: "Free Ferova calculators and diagnostics: freelance hourly rate, AI visibility, contracts and proposals. No sign-up.",
      path: "/en/resources/tools", nuevo: "New", use: "Open",
    },
    pt: {
      h1: "Laboratório Ferova",
      lead: "Calculadoras, diagnósticos e ferramentas gratuitas para tomar melhores decisões de crescimento. Sem cadastro para usar.",
      seoTitle: "Laboratório Ferova — ferramentas e calculadoras grátis",
      seoDesc: "Calculadoras e diagnósticos gratuitos da Ferova: valor por hora freelance, visibilidade em IA, contratos e propostas. Sem cadastro.",
      path: "/pt/recursos/ferramentas", nuevo: "Novo", use: "Abrir",
    },
  }[lang];

  const tools: Tool[] = lang === "es" ? [
    { icon: Clock, title: "Calculadora de valor por hora", desc: "Cuánto cobrar por hora según tus gastos, impuestos, vacaciones y margen.", href: "/recursos/herramientas/calculadora-valor-hora-freelancer", tag: t.nuevo },
    { icon: Search, title: "Calculadora de Visibilidad IA", desc: "Mide si tu tienda es citable por ChatGPT, Perplexity y Gemini.", href: "/herramientas/calculadora-visibilidad-ia" },
    { icon: FileText, title: "Analizador de Contratos con IA", desc: "Detecta cláusulas de riesgo antes de firmar.", href: "/recursos/analizador-contratos" },
    { icon: GitCompare, title: "Comparador de Propuestas", desc: "Compara propuestas de agencias y descubre cuál te conviene.", href: "/recursos/comparador-propuestas" },
    { icon: Newspaper, title: "Briefing de Newsletter", desc: "Genera un briefing de mercado para tu ecommerce.", href: "/recursos/briefing-newsletter" },
  ] : lang === "pt" ? [
    { icon: Clock, title: "Calculadora de valor por hora", desc: "Quanto cobrar por hora conforme gastos, impostos, férias e margem.", href: "/pt/recursos/ferramentas/calculadora-valor-hora-freelancer", tag: t.nuevo },
    { icon: Search, title: "Calculadora de Visibilidade IA", desc: "Meça se sua loja é citável por ChatGPT, Perplexity e Gemini.", href: "/pt/ferramentas/calculadora-visibilidade-ia" },
    { icon: FileText, title: "Analisador de Contratos com IA", desc: "Detecte cláusulas de risco antes de assinar.", href: "/pt/recursos/analisador-contratos" },
    { icon: GitCompare, title: "Comparador de Propostas", desc: "Compare propostas de agências e descubra qual vale a pena.", href: "/pt/recursos/comparador-propostas" },
    { icon: Newspaper, title: "Briefing de Newsletter", desc: "Gere um briefing de mercado para o seu e-commerce.", href: "/pt/recursos/briefing-newsletter" },
  ] : [
    { icon: Clock, title: "Freelance hourly rate calculator", desc: "How much to charge per hour based on expenses, taxes, vacation and margin.", href: "/en/resources/tools/freelance-hourly-rate-calculator", tag: t.nuevo },
    { icon: Search, title: "AI Visibility Calculator", desc: "Measure whether your store is citable by ChatGPT, Perplexity and Gemini.", href: "/en/tools/ai-visibility-calculator" },
    { icon: FileText, title: "AI Contract Analyzer", desc: "Detect risky clauses before signing.", href: "/en/resources/contract-analyzer" },
    { icon: GitCompare, title: "Proposal Comparator", desc: "Compare agency proposals and find out which is worth it.", href: "/en/resources/proposal-comparator" },
    { icon: Newspaper, title: "Newsletter Briefing", desc: "Generate a market briefing for your e-commerce.", href: "/en/resources/newsletter-briefing" },
  ];

  const breadcrumbs = [
    { name: lang === "es" ? "Inicio" : lang === "pt" ? "Início" : "Home", path: lang === "es" ? "/" : `/${lang}` },
    { name: lang === "es" ? "Recursos" : lang === "pt" ? "Recursos" : "Resources", path: lang === "en" ? "/en/resources" : lang === "pt" ? "/pt/recursos" : "/recursos" },
    { name: t.h1, path: t.path },
  ];

  return (
    <PageTransition>
      <SEO title={t.seoTitle} description={t.seoDesc} path={t.path} lang={lang} breadcrumbs={breadcrumbs} />
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-16 md:py-24 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)" }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-medium bg-gold/10 text-gold border border-gold/30">
              <FlaskConical className="w-3.5 h-3.5" /> {t.h1}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5">{t.h1}</h1>
            <div className="max-w-2xl mx-auto text-left text-muted-foreground"><AnswerBlock>{t.lead}</AnswerBlock></div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tools.map((tool) => (
                <StaggerItem key={tool.href}>
                  <ScaleOnHover>
                    <Link to={tool.href} className="glass-card p-6 group hover:border-gold/40 transition-all block h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gold/10 text-gold"><tool.icon className="w-5 h-5" /></div>
                        {tool.tag && <span className="text-[10px] font-semibold rounded-full bg-gold/15 text-gold px-2 py-0.5">{tool.tag}</span>}
                      </div>
                      <h2 className="font-display font-bold text-foreground mb-2 leading-snug">{tool.title}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{tool.desc}</p>
                      <span className="inline-flex items-center gap-1 text-gold text-sm font-semibold group-hover:gap-2 transition-all">{t.use} <ArrowRight className="w-4 h-4" /></span>
                    </Link>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </PageTransition>
  );
};

export default LaboratorioFerova;
