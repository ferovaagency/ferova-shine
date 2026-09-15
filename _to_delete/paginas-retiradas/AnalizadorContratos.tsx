import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { FileSearch, ShieldAlert, Clock, CheckCircle2 } from "lucide-react";

interface Props {
  lang?: "es" | "en" | "pt";
}

const WA = "https://wa.me/17865787671";

const T = {
  es: {
    eyebrow: "Recurso B2B · Gratuito",
    title: "Analizador de contratos con IA",
    sub: "Sube un contrato (proveedor, agencia, SaaS, freelance) y recibe en minutos los riesgos clave traducidos a lenguaje de negocio.",
    cta: "Solicitar análisis por WhatsApp",
    bullets: [
      { icon: ShieldAlert, t: "Cláusulas de riesgo", d: "Penalidades, auto-renovación, indemnizaciones y exclusividad detectadas y explicadas." },
      { icon: Clock, t: "En menos de 24h", d: "Recibes un informe ejecutivo de 1 página listo para decidir." },
      { icon: CheckCircle2, t: "Recomendaciones accionables", d: "Qué pedir renegociar, qué firmar tal cual y qué evitar a toda costa." },
    ],
    how: "Cómo funciona",
    steps: ["Envíanos el PDF por WhatsApp.", "Lo procesamos con IA + revisión humana.", "Te entregamos el informe + llamada de 15 min."],
    seoT: "Analizador de contratos B2B con IA — Ferova",
    seoD: "Sube tu contrato y recibe los riesgos clave en lenguaje claro. Gratis para empresas en evaluación de Ferova Agency.",
    path: "/recursos/analizador-contratos",
  },
  en: {
    eyebrow: "B2B Resource · Free",
    title: "AI contract analyzer",
    sub: "Upload a contract (vendor, agency, SaaS, freelance) and get the key risks translated into business language in minutes.",
    cta: "Request analysis on WhatsApp",
    bullets: [
      { icon: ShieldAlert, t: "Risk clauses", d: "Penalties, auto-renewal, indemnity and exclusivity flagged and explained." },
      { icon: Clock, t: "Under 24h", d: "You get a 1-page executive report ready to act on." },
      { icon: CheckCircle2, t: "Actionable recommendations", d: "What to renegotiate, what to sign as-is, what to avoid." },
    ],
    how: "How it works",
    steps: ["Send the PDF on WhatsApp.", "We process it with AI + human review.", "We deliver the report + a 15-min call."],
    seoT: "B2B AI Contract Analyzer — Ferova",
    seoD: "Upload your contract and get the key risks in plain English. Free for companies evaluating Ferova Agency.",
    path: "/en/resources/contract-analyzer",
  },
  pt: {
    eyebrow: "Recurso B2B · Gratuito",
    title: "Analisador de contratos com IA",
    sub: "Envie um contrato (fornecedor, agência, SaaS, freelancer) e receba em minutos os riscos-chave traduzidos para linguagem de negócio.",
    cta: "Solicitar análise no WhatsApp",
    bullets: [
      { icon: ShieldAlert, t: "Cláusulas de risco", d: "Multas, renovação automática, indenizações e exclusividade detectadas e explicadas." },
      { icon: Clock, t: "Em menos de 24h", d: "Você recebe um relatório executivo de 1 página pronto para decidir." },
      { icon: CheckCircle2, t: "Recomendações acionáveis", d: "O que renegociar, o que assinar como está e o que evitar." },
    ],
    how: "Como funciona",
    steps: ["Envie o PDF pelo WhatsApp.", "Processamos com IA + revisão humana.", "Entregamos o relatório + call de 15 min."],
    seoT: "Analisador de contratos B2B com IA — Ferova",
    seoD: "Envie seu contrato e receba os riscos-chave em linguagem clara. Grátis para empresas em avaliação da Ferova Agency.",
    path: "/pt/recursos/analisador-contratos",
  },
} as const;

export default function AnalizadorContratos({ lang = "es" }: Props) {
  const t = T[lang];
  return (
    <>
      <SEO title={t.seoT} description={t.seoD} path={t.path} lang={lang} />
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-20 md:py-28 text-center">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/30">
              {t.eyebrow}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 flex items-center justify-center gap-3">
              <FileSearch className="w-10 h-10 text-gold" />
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg mb-10">{t.sub}</p>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-full bg-gold text-black font-semibold hover:opacity-90 transition"
            >
              {t.cta}
            </a>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.bullets.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.t} className="glass-card p-6">
                  <Icon className="w-7 h-7 text-gold mb-4" />
                  <h3 className="text-lg font-bold mb-2">{b.t}</h3>
                  <p className="text-sm text-muted-foreground">{b.d}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">{t.how}</h2>
            <ol className="space-y-4">
              {t.steps.map((s, i) => (
                <li key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold text-black font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="text-base">{s}</span>
                </li>
              ))}
            </ol>
            <div className="text-center mt-10">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-full bg-gold text-black font-semibold hover:opacity-90 transition"
              >
                {t.cta}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
