import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { BEST_PROVIDERS as c } from "@/content/bestProviders";
import { CheckList, CtaBand, FaqList, FeraButton, FxLink, PageHero, Section, SectionHeading, StatusBadge } from "@/components/fx/primitives";

const ORIGIN = "https://seoparaecommerce.co";

/** Comparativa de proveedores white label (EN) con el sistema de diseño de Ferova. */
export default function BestProvidersPage() {
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.h1,
    itemListElement: c.providers.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: p.url,
    })),
  };
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.h1,
    description: c.metaDescription,
    inLanguage: "en",
    mainEntityOfPage: `${ORIGIN}${c.path}`,
    author: { "@type": "Person", name: "María Fernanda Calderón", jobTitle: "Fractional SEO" },
    publisher: { "@type": "Organization", name: "Ferova" },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };


  const crumbs = [{ name: "Best white label SEO providers", path: c.path }];

  return (
    <div className="fx-site min-h-screen">
      <SEO
        title={c.metaTitle}
        description={c.metaDescription}
        path={c.path}
        lang="en"
        jsonLd={[articleLd, listLd, faqLd]}
        breadcrumbs={[{ name: "Home", path: "/en" }, ...crumbs]}
      />
      <Header lang="en" />
      <main id="contenido-principal" className="pt-20">
        <PageHero eyebrow={c.eyebrow} title={c.h1} intro={c.lede} breadcrumbs={crumbs} lang="en">
          <FxLink to="/en/white-label-seo-for-agencies">See Ferova's white label service</FxLink>
        </PageHero>

        <div className="fx-bg-surface">
          <p className="fx-muted mx-auto w-full max-w-5xl px-5 py-6 text-sm leading-relaxed sm:px-8">{c.disclosure}</p>
        </div>

        <Section narrow>
          <SectionHeading title={c.criteriaTitle} />
          <CheckList items={c.criteria} className="mt-8" />
        </Section>

        <Section tone="surface">
          <SectionHeading title="At a glance" />
          <div className="mt-8 overflow-x-auto rounded-[1.25rem] bg-white">
            <table className="fx-table min-w-[720px]">
              <thead>
                <tr>
                  <th scope="col">Provider</th>
                  <th scope="col">Best for</th>
                  <th scope="col">Published pricing</th>
                </tr>
              </thead>
              <tbody>
                {c.providers.map((p) => (
                  <tr key={p.name}>
                    <td className="font-semibold">
                      {p.name}
                      {p.ours ? " (ours)" : ""}
                    </td>
                    <td>{p.bestFor}</td>
                    <td>{p.pricing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section>
          <div className="grid gap-6">
            {c.providers.map((p, i) => (
              <article key={p.name} className="panel-card">
                <p className="flex flex-wrap items-center gap-3 text-sm" style={{ fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}>
                  {String(i + 1).padStart(2, "0")}
                  {p.ours ? <StatusBadge>Our service</StatusBadge> : null}
                </p>
                <h2 className="mt-3 text-2xl md:text-3xl">{p.name}</h2>
                <dl className="mt-5 grid gap-4 text-sm md:grid-cols-3">
                  <div>
                    <dt className="font-semibold">Focus</dt>
                    <dd className="fx-muted mt-1">{p.focus}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Best for</dt>
                    <dd className="fx-muted mt-1">{p.bestFor}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Published pricing</dt>
                    <dd className="fx-muted mt-1">{p.pricing}</dd>
                  </div>
                </dl>
                <CheckList items={p.notes} className="mt-5" />
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                  {p.ours ? (
                    <Link to="/en/white-label-seo-for-agencies" className="fx-text-link">
                      See Ferova's white label service <ArrowUpRight aria-hidden="true" />
                    </Link>
                  ) : (
                    <a href={p.url} target="_blank" rel="noopener nofollow" className="fx-text-link">
                      Visit {p.name} <ArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                  <span className="fx-muted text-xs">
                    Source: {p.source} — consulted {p.consulted}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section tone="surface">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading title={c.howToChooseTitle} />
            <ol className="process">
              {c.howToChoose.map((s, i) => (
                <li key={s} className="flex items-start gap-5 rounded-[1.25rem] bg-white p-5 leading-relaxed">
                  <span className="process__number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <span className="pt-2.5">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading title="Frequent questions" />
            <FaqList items={c.faqs.map((f) => [f.question, f.answer] as [string, string])} />
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.related.map((r) => (
              <li key={r.to}>
                <Link to={r.to} className="link-tile flex items-center justify-between gap-4 font-semibold">
                  {r.label}
                  <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <CtaBand title="Need a technical SEO partner for your ecommerce clients?">
          <FeraButton source="best_providers_final">Talk to Fera</FeraButton>
          <FxLink to="/en/contact" variant="outline">Contact</FxLink>
        </CtaBand>
      </main>
      <Footer lang="en" />
    </div>
  );
}
