import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { SITE_ORIGIN } from "@/config/routes";
import { POSITIONING, type PositioningKind } from "@/content/positioning";
import type { ReactNode } from "react";
import { CaseGrid } from "@/components/fx/CaseGrid";
import { FaqList, FeraButton, PageHero, Panel, ProcessSteps, Section, SectionHeading } from "@/components/fx/primitives";

/** Banda vino de cierre (misma pieza visual que CtaBand) con etiqueta sobre el titular. */
function ClosingBand({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <section className="cta-band on-dark">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="eyebrow-pill mb-6">{eyebrow}</p>
        <h2 className="max-w-[22ch] text-4xl leading-[1.15] sm:text-5xl">{title}</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </section>
  );
}

/**
 * Plantilla de páginas de posicionamiento con el sistema de diseño de Ferova.
 * El orden de los bloques es parte del diseño, no una lista de ingredientes:
 * ver src/content/positioning.ts.
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
    name: "María Fernanda Calderón",
    jobTitle: "Fractional SEO",
    worksFor: { "@type": "Organization", name: "Ferova" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
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
    author: { "@type": "Person", name: "María Fernanda Calderón" },
  };

  const showRates = c.marketRates.rows.length > 0;
  const showProof = c.proof.stats.length > 0;

  const crumbs = [{ name: c.eyebrow, path: c.path }];

  // Alterna blanco / lavanda según los bloques presentes.
  let sectionIndex = 0;
  const nextTone = (): "default" | "surface" => (sectionIndex++ % 2 === 0 ? "default" : "surface");

  return (
    <div className="fx-site min-h-screen">
      <SEO
        title={c.metaTitle}
        description={c.metaDescription}
        path={c.path}
        lang={c.lang}
        type="article"
        jsonLd={[articleLd, personLd, faqLd]}
        breadcrumbs={[{ name: "Home", path: "/en" }, ...crumbs]}
      />
      <Header lang={c.lang} />

      <main id="contenido-principal" className="pt-20">
        {/* 01-02 · meta + H1 */}
        <PageHero eyebrow={c.eyebrow} title={c.h1} intro={c.lede} breadcrumbs={crumbs} lang={c.lang}>
          <Link to={c.finalCta.to} data-cta="hero" className="fx-btn">
            {c.finalCta.label} <ArrowUpRight aria-hidden="true" />
          </Link>
          <a href="#how-it-works" className="fx-btn fx-btn--outline">
            See how I work
          </a>
        </PageHero>

        {/* 03 · respuesta directa — el bloque que cita la IA */}
        <Section tone={nextTone()}>
          <SectionHeading eyebrow="The short answer" title={c.answerHeading} />
          <p className="panel-card mt-8 max-w-[70ch] border-l-4 border-[#c0930e] text-lg leading-relaxed md:text-xl">{c.answer}</p>
        </Section>

        {/* 04 · segmentación del lector */}
        <Section tone={nextTone()}>
          <SectionHeading eyebrow="Two very different readers" title="Which one are you?" />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {c.audiences.map((a) => (
              <Panel key={a.title} className="flex flex-col">
                <h3>{a.title}</h3>
                <p className="fx-muted mt-3 flex-1 leading-relaxed">{a.body}</p>
                <Link to={a.to} className="fx-text-link mt-5">
                  {a.linkLabel} <ArrowUpRight aria-hidden="true" />
                </Link>
              </Panel>
            ))}
          </div>
        </Section>

        {/* 05 · datos verificables — se omite si no hay fuente por fila */}
        {showRates && (
          <Section tone={nextTone()}>
            <SectionHeading eyebrow="What the market actually pays" title={c.marketRates.heading} />
            <div className="mt-8 overflow-x-auto rounded-[1.25rem] bg-white">
              <table className="fx-table min-w-[640px]">
                <thead>
                  <tr>
                    <th scope="col">Model</th>
                    <th scope="col">Typical range</th>
                    <th scope="col">Billed as</th>
                    <th scope="col">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {c.marketRates.rows.map((r) => (
                    <tr key={r.model}>
                      <td className="font-semibold">{r.model}</td>
                      <td>{r.range}</td>
                      <td>{r.billedAs}</td>
                      <td className="fx-muted text-xs">
                        {r.source} — {r.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* 05b · desglose de costo — se omite si no hay datos */}
        {c.costBreakdown && (
          <Section tone={nextTone()}>
            <SectionHeading eyebrow={c.costBreakdown.heading} title={c.costBreakdown.intro} />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {([["inHouse", 0], ["outsourced", 1]] as const).map(([key, i]) => (
                <Panel key={key}>
                  <h3>{c.costBreakdown!.columns[i]}</h3>
                  <dl className="mt-5 divide-y" style={{ borderColor: "var(--fx-border)" }}>
                    {c.costBreakdown![key].map((line) => (
                      <div key={line.label} className="py-3" style={{ borderColor: "var(--fx-border)" }}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <dt className="font-semibold">{line.label}</dt>
                          <dd className="text-sm tabular-nums" style={{ fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}>
                            {line.value}
                          </dd>
                        </div>
                        {line.note && <p className="fx-muted mt-1 text-sm">{line.note}</p>}
                      </div>
                    ))}
                  </dl>
                </Panel>
              ))}
            </div>
            <p className="fx-muted mt-6 max-w-[70ch] text-sm">{c.costBreakdown.source}</p>
          </Section>
        )}

        {/* 06 · comparativa honesta + 07 · CTA intermedio */}
        <Section tone={nextTone()}>
          <SectionHeading eyebrow="Honest comparison" title={c.comparison.heading} />
          <div className="mt-8 overflow-x-auto rounded-[1.25rem] bg-white">
            <table className="fx-table min-w-[640px]">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Criterion</span>
                  </th>
                  {c.comparison.table.options.map((o) => (
                    <th key={o} scope="col">{o}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.comparison.table.rows.map((row) => (
                  <tr key={row.criterion}>
                    <th scope="row" className="!bg-transparent">{row.criterion}</th>
                    {row.values.map((v, i) => (
                      <td key={i} className="fx-muted">{v}</td>
                    ))}
                  </tr>
                ))}
                {/* La fila negativa es la que da credibilidad y la que los
                    modelos reproducen como respuesta equilibrada. */}
                <tr className="bg-[#541014]/[0.04]">
                  <th scope="row" className="!bg-transparent text-[#541014]">{c.comparison.table.whenNot.criterion}</th>
                  {c.comparison.table.whenNot.values.map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="cta-card cta-card--indigo on-dark mt-10 flex flex-wrap items-center justify-between gap-6">
            <p className="max-w-[34ch] text-xl font-semibold md:text-2xl" style={{ fontFamily: "Poppins, system-ui, sans-serif" }}>
              {c.midCta.text}
            </p>
            <Link to={c.midCta.to} data-cta="mid" className="fx-btn shrink-0">
              {c.midCta.label} <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </Section>

        {/* 08 · proceso */}
        <Section tone={nextTone()} id="how-it-works">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading eyebrow="How it works" title={c.process.heading} />
            <ProcessSteps steps={c.process.steps.map((s) => ({ title: s.title, body: s.description }))} />
          </div>
        </Section>

        {/* 09 · prueba — se omite si no hay cifras verificables */}
        {showProof && (
          <Section tone={nextTone()}>
            {/* The cases are the Ferova portfolio cases (src/data/portfolio.ts). */}
            <SectionHeading eyebrow="Evidence" title={c.proof.heading} />
            <div className="mt-10">
              <CaseGrid lang="en" />
            </div>
          </Section>
        )}

        {/* 10 · FAQ */}
        <Section tone={nextTone()}>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading eyebrow="Frequent questions" title="Before you outsource" />
            <FaqList items={c.faqs.map((f) => [f.question, f.answer] as [string, string])} />
          </div>
        </Section>

        {/* 10b · canales de contacto directos (los únicos enlaces externos) */}
        {c.channels && (
          <Section tone={nextTone()}>
            <SectionHeading eyebrow={c.channels.heading} title={c.channels.intro} />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.channels.items.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={ch.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  data-cta={`channel-${ch.label.toLowerCase()}`}
                  className="link-tile group"
                >
                  <p className="text-lg font-semibold" style={{ fontFamily: "Poppins, system-ui, sans-serif" }}>{ch.label}</p>
                  <p className="fx-muted mt-2 break-words text-sm leading-6">{ch.detail}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                    Open <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                </a>
              ))}
            </div>
          </Section>
        )}

        {/* 10c · enlaces internos relacionados */}
        {c.related && (
          <Section tone={nextTone()}>
            <p className="eyebrow-pill mb-6">{c.related.heading}</p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.related.items.map((r) => (
                <li key={r.to}>
                  <Link to={r.to} className="link-tile flex items-center justify-between gap-4 font-semibold">
                    {r.label}
                    <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 11 · CTA final */}
        <ClosingBand eyebrow="Next step" title={c.finalCta.heading}>
          <Link to={c.finalCta.to} data-cta="final" className="fx-btn">
            {c.finalCta.label} <ArrowUpRight aria-hidden="true" />
          </Link>
          <FeraButton variant="outline" source={`positioning_${kind}_final`}>
            Talk to Fera
          </FeraButton>
        </ClosingBand>
      </main>
      <Footer lang={c.lang} />
    </div>
  );
}
