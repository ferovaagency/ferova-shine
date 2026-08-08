import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, FileSearch, GitBranch, Network, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { SEO_SPECIALTIES, type SeoSpecialtyKind } from "@/content/seoSpecialties";

const ICONS = [FileSearch, Network, ShieldCheck, GitBranch];

export default function SeoSpecialtyPage({ kind }: { kind: SeoSpecialtyKind }) {
  const content = SEO_SPECIALTIES[kind];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="seo-brand min-h-screen bg-background text-foreground">
      <SEO
        title={`${content.title} | SEO Para Ecommerce`}
        description={content.description}
        path={content.path}
        lang="es"
        jsonLd={faqLd}
        breadcrumbs={[
          { name: "Inicio", path: "/" },
          { name: content.eyebrow, path: content.path },
        ]}
      />
      <Header lang="es" />

      <main className="pt-20">
        <section className="relative overflow-hidden bg-[#541014] py-20 text-white md:py-28">
          <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_20%_20%,rgba(192,147,14,.36),transparent_36%),radial-gradient(circle_at_80%_70%,rgba(106,76,48,.3),transparent_32%)]" />
          <div className="container relative mx-auto max-w-6xl px-4 md:px-6">
            <p className="mb-6 text-xs font-semibold tracking-[0.22em] text-[#e0bd52]">{content.eyebrow}</p>
            <h1 className="max-w-5xl text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">{content.title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">{content.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/contacto" className="seo-primary-button inline-flex items-center justify-center gap-2">
                Solicitar cotización <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/casos-de-exito" className="seo-secondary-button inline-flex items-center justify-center">Ver casos reales</Link>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card py-16 md:py-20">
          <div className="container mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[.85fr_1.15fr] md:px-6">
            <div><p className="seo-kicker">EL PROBLEMA</p><h2 className="mt-3 text-3xl md:text-4xl">Primero entendemos la decisión que está en riesgo.</h2></div>
            <p className="text-lg leading-relaxed text-muted-foreground">{content.problem}</p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <p className="seo-kicker">QUÉ RECIBES</p>
            <h2 className="mt-3 max-w-3xl text-3xl md:text-5xl">Entregables pensados para tomar decisiones y ejecutar.</h2>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {content.deliverables.map((item, index) => {
                const Icon = ICONS[index] ?? CheckCircle2;
                return <article key={item.title} className="rounded-2xl border border-border bg-card p-7">
                  <Icon className="h-6 w-6 text-[#6a4c30]" />
                  <h3 className="mt-8 text-xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#f4eadb] py-20 text-[#3c3c3b] md:py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div><p className="seo-kicker">RESULTADO OPERATIVO</p><h2 className="mt-3 text-3xl md:text-5xl">Menos opinión. Más evidencia y criterios compartidos.</h2></div>
              <div className="space-y-4">
                {content.outcomes.map((outcome) => <div key={outcome} className="flex gap-3 rounded-xl bg-white p-5 shadow-sm"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8c6905]" /><p>{outcome}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <p className="seo-kicker">PROCESO</p><h2 className="mt-3 text-3xl md:text-5xl">Un proceso corto, visible y transferible.</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {content.process.map((step, index) => <article key={step.title} className="border-t-2 border-[#c0930e] pt-6"><span className="font-mono text-sm text-[#6a4c30]">0{index + 1}</span><h3 className="mt-5 text-xl">{step.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{step.description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card py-20">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <p className="seo-kicker">PREGUNTAS FRECUENTES</p>
            <div className="mt-8 divide-y divide-border">
              {content.faqs.map((faq) => <article key={faq.question} className="py-6"><h2 className="text-xl">{faq.question}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p></article>)}
            </div>
          </div>
        </section>

        <section className="bg-[#541014] py-20 text-white">
          <div className="container mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 md:flex-row md:items-end md:px-6">
            <div><p className="text-xs font-semibold tracking-[0.22em] text-[#e0bd52]">SIGUIENTE PASO</p><h2 className="mt-4 max-w-3xl text-3xl md:text-5xl">Cuéntanos qué habilidad y capacidad necesita tu agencia.</h2></div>
            <Link to="/contacto" className="seo-primary-button shrink-0">Solicitar cotización</Link>
          </div>
        </section>
      </main>
      <Footer lang="es" />
    </div>
  );
}
