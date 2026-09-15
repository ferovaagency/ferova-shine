import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Scale, BarChart3, Target, CheckCircle2 } from "lucide-react";

interface Props {
  lang?: "es" | "en" | "pt";
}

const WA = "https://wa.me/17865787671";

const T = {
  es: {
    eyebrow: "Recurso B2B · Gratuito",
    title: "Comparador de propuestas de agencia",
    sub: "Envíanos dos (o más) propuestas y te entregamos una matriz lado a lado: precio real, alcance, riesgos ocultos y recomendación final.",
    cta: "Comparar mis propuestas por WhatsApp",
    bullets: [
      { icon: BarChart3, t: "Precio real por entregable", d: "Normalizamos horas, retainers y costos variables para comparar manzanas con manzanas." },
      { icon: Target, t: "Alcance vs. promesa", d: "Detectamos qué entregables son humo y cuáles mueven la aguja." },
      { icon: CheckCircle2, t: "Recomendación clara", d: "Cuál firmar, qué renegociar y qué cláusulas exigir antes de firmar." },
    ],
    how: "Cómo funciona",
    steps: ["Envíanos las propuestas en PDF por WhatsApp.", "Las normalizamos y comparamos en 24-48h.", "Entregamos matriz + llamada de 20 min para defender la decisión."],
    seoT: "Comparador de propuestas de agencia — Ferova",
    seoD: "Compara dos propuestas de agencia lado a lado: precio, alcance, riesgos y recomendación final. Gratis para empresas en evaluación.",
    path: "/recursos/comparador-propuestas",
  },
  en: {
    eyebrow: "B2B Resource · Free",
    title: "Agency proposal comparator",
    sub: "Send us two (or more) proposals and get a side-by-side matrix: real price, scope, hidden risks and final recommendation.",
    cta: "Compare my proposals on WhatsApp",
    bullets: [
      { icon: BarChart3, t: "Real price per deliverable", d: "We normalize hours, retainers and variable costs so you compare apples to apples." },
      { icon: Target, t: "Scope vs. promise", d: "We flag which deliverables are fluff and which actually move the needle." },
      { icon: CheckCircle2, t: "Clear recommendation", d: "Which to sign, what to renegotiate, which clauses to demand before signing." },
    ],
    how: "How it works",
    steps: ["Send the proposals (PDF) on WhatsApp.", "We normalize and compare them in 24-48h.", "You get the matrix + a 20-min call to defend the decision."],
    seoT: "Agency Proposal Comparator — Ferova",
    seoD: "Compare two agency proposals side by side: price, scope, risks and final recommendation. Free for companies in evaluation.",
    path: "/en/resources/proposal-comparator",
  },
  pt: {
    eyebrow: "Recurso B2B · Gratuito",
    title: "Comparador de propostas de agência",
    sub: "Envie duas (ou mais) propostas e receba uma matriz lado a lado: preço real, escopo, riscos ocultos e recomendação final.",
    cta: "Comparar minhas propostas no WhatsApp",
    bullets: [
      { icon: BarChart3, t: "Preço real por entregável", d: "Normalizamos horas, fees e custos variáveis para você comparar de igual para igual." },
      { icon: Target, t: "Escopo vs. promessa", d: "Identificamos quais entregáveis são enrolação e quais realmente movem o ponteiro." },
      { icon: CheckCircle2, t: "Recomendação clara", d: "Qual assinar, o que renegociar e quais cláusulas exigir antes de assinar." },
    ],
    how: "Como funciona",
    steps: ["Envie as propostas em PDF pelo WhatsApp.", "Normalizamos e comparamos em 24-48h.", "Entregamos a matriz + call de 20 min para defender a decisão."],
    seoT: "Comparador de Propostas de Agência — Ferova",
    seoD: "Compare duas propostas de agência lado a lado: preço, escopo, riscos e recomendação final. Grátis para empresas em avaliação.",
    path: "/pt/recursos/comparador-propostas",
  },
} as const;

export default function ComparadorPropuestas({ lang = "es" }: Props) {
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
              <Scale className="w-10 h-10 text-gold" />
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
