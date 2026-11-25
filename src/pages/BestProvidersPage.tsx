import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { BEST_PROVIDERS as c } from "@/content/bestProviders";

const ORIGIN = "https://seoparaecommerce.co";

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

  return (
    <div className="seo-brand min-h-screen bg-background text-foreground">
      <SEO
        title={c.metaTitle}
        description={c.metaDescription}
        path={c.path}
        lang="en"
        jsonLd={[articleLd, listLd, faqLd]}
        breadcrumbs={[{ name: "Home", path: "/en" }, { name: "Best white label SEO providers", path: c.path }]}
      />
      <Header lang="en" />
      <main className="pt-20">
        <section className="bg-[#541014] py-20 text-white md:py-24">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#e0bd52]">{c.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] md:text-6xl">{c.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{c.lede}</p>
          </div>
        </section>

        <section className="border-b border-border bg-card py-8">
          <p className="container mx-auto max-w-5xl px-4 text-sm leading-relaxed text-muted-foreground md:px-6">{c.disclosure}</p>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl">{c.criteriaTitle}</h2>
            <ul className="mt-6 space-y-3">
              {c.criteria.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#8c6905]" />{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#f4eadb] py-16 text-[#3c3c3b] md:py-20">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl">At a glance</h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-white">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-[#f4eadb] text-xs uppercase tracking-wide text-[#6a4c30]">
                  <tr><th className="p-4">Provider</th><th className="p-4">Best for</th><th className="p-4">Published pricing</th></tr>
                </thead>
                <tbody>
                  {c.providers.map((p) => (
                    <tr key={p.name} className="border-t border-border align-top">
                      <td className="p-4 font-semibold">{p.name}{p.ours ? " (ours)" : ""}</td>
                      <td className="p-4">{p.bestFor}</td>
                      <td className="p-4">{p.pricing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-10 px-4 md:px-6">
            {c.providers.map((p, i) => (
              <article key={p.name} className="rounded-2xl border border-border bg-card p-7">
                <p className="font-mono text-sm text-[#6a4c30]">{String(i + 1).padStart(2, "0")}{p.ours ? " · Our service" : ""}</p>
                <h2 className="mt-2 text-2xl md:text-3xl">{p.name}</h2>
                <dl className="mt-5 grid gap-4 text-sm md:grid-cols-3">
                  <div><dt className="font-semibold">Focus</dt><dd className="mt-1 text-muted-foreground">{p.focus}</dd></div>
                  <div><dt className="font-semibold">Best for</dt><dd className="mt-1 text-muted-foreground">{p.bestFor}</dd></div>
                  <div><dt className="font-semibold">Published pricing</dt><dd className="mt-1 text-muted-foreground">{p.pricing}</dd></div>
                </dl>
                <ul className="mt-5 space-y-2">
                  {p.notes.map((n) => <li key={n} className="flex gap-3 leading-relaxed"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#8c6905]" />{n}</li>)}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                  {p.ours ? (
                    <Link to="/en/white-label-seo-for-agencies" className="inline-flex items-center gap-2 font-semibold text-[#541014]">See Ferova's white label service <ArrowRight className="h-4 w-4" /></Link>
                  ) : (
                    <a href={p.url} target="_blank" rel="noopener nofollow" className="inline-flex items-center gap-2 font-semibold text-[#541014]">Visit {p.name} <ArrowUpRight className="h-4 w-4" /></a>
                  )}
                  <span className="text-xs text-muted-foreground">Source: {p.source} — consulted {p.consulted}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-card py-16 md:py-20">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl">{c.howToChooseTitle}</h2>
            <ol className="mt-6 list-decimal space-y-3 pl-6 leading-relaxed">
              {c.howToChoose.map((s) => <li key={s}>{s}</li>)}
            </ol>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <p className="seo-kicker">FREQUENT QUESTIONS</p>
            <div className="mt-6 divide-y divide-border">
              {c.faqs.map((f) => <article key={f.question} className="py-6"><h2 className="text-xl">{f.question}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{f.answer}</p></article>)}
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {c.related.map((r) => <li key={r.to}><Link to={r.to} className="border-b border-[#c0930e] pb-0.5 font-semibold text-[#541014]">{r.label}</Link></li>)}
            </ul>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </div>
  );
}
