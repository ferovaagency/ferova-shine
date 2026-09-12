import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { SITE_ORIGIN } from "@/config/routes";
import { POSITIONING, type PositioningKind } from "@/content/positioning";

/**
 * Plantilla de páginas de posicionamiento. El orden de los bloques es parte
 * del diseño, no una lista de ingredientes: ver src/content/positioning.ts.
 *
 * Los bloques `marketRates` y `proof` se OMITEN cuando no hay datos con
 * fuente. Es deliberado: una tabla de tarifas sin fuente o una cifra
 * inventada anulan justo lo que hace citable a la página.
 *
 * Los tres CTA llevan `data-cta` para poder medirlos por separado en GA4
 * (evento generate_lead, parámetro cta_location).
 */
export default function PositioningPage({ kind }: { kind: PositioningKind }) {
  const c = POSITIONING[kind];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  // Person: ata la autoría a una entidad nombrada. Sin esto los motores de IA
  // citan el contenido sin atribuirlo a nadie.
  const personLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "María Fernanda Cardona",
    jobTitle: "Senior SEO Consultant",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressCountry: "CO",
    },
    url: `${SITE_ORIGIN}${c.path}`,
  };
  if (c.authorSameAs.length > 0) personLd.sameAs = c.authorSameAs;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.h1,
    description: c.metaDescription,
    inLanguage: c.lang,
    mainEntityOfPage: `${SITE_ORIGIN}${c.path}`,
    author: { "@type": "Person", name: "María Fernanda Cardona" },
  };

  const showRates = c.marketRates.rows.length > 0;
  const showProof = c.proof.stats.length > 0;

  return (
    <div className="seo-brand min-h-screen bg-background text-foreground">
      <SEO
        title={c.metaTitle}
        description={c.metaDescription}
        path={c.path}
        lang={c.lang}
        type="article"
        jsonLd={[articleLd, personLd, faqLd]}
        breadcrumbs={[
          { name: "Home", path: "/en" },
          { name: c.eyebrow, path: c.path },
        ]}
      />
      <Header lang={c.lang} />

      <main className="pt-20">
        {/* 01-02 · meta + H1 */}
        <section className="relative overflow-hidden bg-[#541014] py-20 text-white md:py-28">
          <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_20%_20%,rgba(192,147,14,.36),transparent_36%),radial-gradient(circle_at_80%_70%,rgba(106,76,48,.3),transparent_32%)]" />
          <div className="container relative mx-auto max-w-6xl px-4 md:px-6">
            <p className="mb-6 text-xs font-semibold tracking-[0.22em] text-[#e0bd52]">{c.eyebrow}</p>
            <h1 className="max-w-5xl text-4xl font-bold leading-[1.05] md:text-6xl">{c.h1}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">{c.lede}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to={c.finalCta.to} data-cta="hero" className="seo-primary-button inline-flex items-center justify-center gap-2">
                {c.finalCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#how-it-works" className="seo-secondary-button inline-flex items-center justify-center">
                See how I work
              </a>
            </div>
          </div>
        </section>

        {/* 03 · respuesta directa — el bloque que cita la IA */}
        <section className="pt-16 md:pt-20">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <p className="seo-kicker">The short answer</p>
            <h2 className="mt-3 max-w-3xl text-3xl md:text-4xl">{c.answerHeading}</h2>
            <p className="mt-8 max-w-[70ch] rounded-r-2xl border-y border-r border-border border-l-4 border-l-[#c0930e] bg-card p-7 text-lg leading-relaxed md:text-xl">
              {c.answer}
            </p>
          </div>
        </section>

        {/* 04 · segmentación del lector */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <p className="seo-kicker">Two very different readers</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Which one are you?</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {c.audiences.map((a) => (
                <article key={a.title} className="rounded-2xl border border-border bg-card p-7">
                  <h3 className="text-xl">{a.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{a.body}</p>
                  <Link to={a.to} className="mt-5 inline-block border-b-2 border-[#c0930e] pb-0.5 font-bold text-[#541014]">
                    {a.linkLabel} →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 05 · datos verificables — se omite si no hay fuente por fila */}
        {showRates && (
          <section className="bg-[#f4eadb] py-16 text-[#3c3c3b] md:py-20">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
              <p className="seo-kicker">What the market actually pays</p>
              <h2 className="mt-3 text-3xl md:text-4xl">{c.marketRates.heading}</h2>
              <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-white">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-[#f4eadb] text-xs uppercase tracking-wide text-[#6a4c30]">
                    <tr>
                      <th className="p-4">Model</th><th className="p-4">Typical range</th>
                      <th className="p-4">Billed as</th><th className="p-4">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.marketRates.rows.map((r) => (
                      <tr key={r.model} className="border-t border-border align-top">
                        <td className="p-4 font-semibold">{r.model}</td>
                        <td className="p-4">{r.range}</td>
                        <td className="p-4">{r.billedAs}</td>
                        <td className="p-4 text-xs text-muted-foreground">{r.source} — {r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* 06 · comparativa honesta + 07 · CTA intermedio */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <p className="seo-kicker">Honest comparison</p>
            <h2 className="mt-3 text-3xl md:text-4xl">{c.comparison.heading}</h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-[#f4eadb] text-xs uppercase tracking-wide text-[#6a4c30]">
                  <tr>
                    <th className="p-4" />
                    {c.comparison.table.options.map((o) => <th key={o} className="p-4">{o}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {c.comparison.table.rows.map((row) => (
                    <tr key={row.criterion} className="border-t border-border align-top">
                      <td className="p-4 font-semibold">{row.criterion}</td>
                      {row.values.map((v, i) => <td key={i} className="p-4 text-muted-foreground">{v}</td>)}
                    </tr>
                  ))}
                  {/* La fila negativa es la que da credibilidad y la que los
                      modelos reproducen como respuesta equilibrada. */}
                  <tr className="border-t border-border bg-[#541014]/[0.04] align-top">
                    <td className="p-4 font-bold text-[#541014]">{c.comparison.table.whenNot.criterion}</td>
                    {c.comparison.table.whenNot.values.map((v, i) => <td key={i} className="p-4">{v}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-[#f4eadb] p-8">
              <p className="max-w-[34ch] font-display text-xl font-bold text-[#3c3c3b] md:text-2xl">{c.midCta.text}</p>
              <Link to={c.midCta.to} data-cta="mid" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#541014] px-6 py-3 font-bold text-white">
                {c.midCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 08 · proceso */}
        <section id="how-it-works" className="border-y border-border bg-card py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <p className="seo-kicker">How it works</p>
            <h2 className="mt-3 text-3xl md:text-4xl">{c.process.heading}</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {c.process.steps.map((s, i) => (
                <article key={s.title} className="border-t-2 border-[#c0930e] pt-6">
                  <span className="font-mono text-sm text-[#6a4c30]">0{i + 1}</span>
                  <h3 className="mt-4 text-xl">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{s.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 09 · prueba — se omite si no hay cifras verificables */}
        {showProof && (
          <section className="py-16 md:py-20">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
              <p className="seo-kicker">Evidence</p>
              <h2 className="mt-3 text-3xl md:text-4xl">{c.proof.heading}</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {c.proof.stats.map((s) => (
                  <article key={s.value} className="rounded-2xl border border-border bg-card p-7">
                    <p className="font-display text-4xl font-extrabold leading-none text-[#541014]">{s.value}</p>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{s.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 10 · FAQ */}
        <section className="border-y border-border bg-card py-16 md:py-20">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <p className="seo-kicker">Frequent questions</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Before you outsource</h2>
            <div className="mt-8 divide-y divide-border">
              {c.faqs.map((f) => (
                <article key={f.question} className="py-6">
                  <h3 className="text-xl">{f.question}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{f.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 11 · CTA final */}
        <section className="bg-[#541014] py-16 text-white md:py-20">
          <div className="container mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 md:flex-row md:items-end md:px-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#e0bd52]">Next step</p>
              <h2 className="mt-4 max-w-[22ch] text-3xl md:text-4xl">{c.finalCta.heading}</h2>
            </div>
            <Link to={c.finalCta.to} data-cta="final" className="seo-primary-button shrink-0">
              {c.finalCta.label}
            </Link>
          </div>
        </section>
      </main>
      <Footer lang={c.lang} />
    </div>
  );
}
