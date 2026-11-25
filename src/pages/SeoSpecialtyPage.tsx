import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, FileSearch, GitBranch, Network, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { SEO_SPECIALTIES, SEO_SPECIALTY_UI, type SeoSpecialtyKind } from "@/content/seoSpecialties";
import type { Lang } from "@/config/routes";

const ICONS = [FileSearch, Network, ShieldCheck, GitBranch];

export default function SeoSpecialtyPage({ kind, lang = "es" }: { kind: SeoSpecialtyKind; lang?: Lang }) {
  const content = SEO_SPECIALTIES[lang][kind];
  const ui = SEO_SPECIALTY_UI[lang];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const usd = new Intl.NumberFormat(lang === "en" ? "en-US" : "es-CO", { maximumFractionDigits: 0 });
  const serviceLd = content.pricing
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: content.pricing.serviceName,
        serviceType: content.pricing.serviceName,
        description: content.description,
        url: `https://seoparaecommerce.co${content.path}`,
        areaServed: "Worldwide",
        provider: {
          "@type": "Person",
          name: "María Fernanda Calderón",
          url: `https://seoparaecommerce.co${lang === "en" ? "/en/about-me" : "/sobre-nosotros"}`,
        },
        offers: content.pricing.plans.map((plan) => ({
          "@type": "Offer",
          name: plan.name,
          description: plan.description,
          price: plan.price,
          priceCurrency: "USD",
        })),
      }
    : null;

  return (
    <div className="seo-brand min-h-screen bg-background text-foreground">
      <SEO
        title={content.metaTitle ?? `${content.title} | ${ui.siteName}`}
        description={content.description}
        path={content.path}
        lang={lang}
        jsonLd={serviceLd ? [serviceLd, faqLd] : faqLd}
        breadcrumbs={[
          { name: ui.home, path: lang === "en" ? "/en" : "/" },
          { name: content.eyebrow, path: content.path },
        ]}
      />
      <Header lang={lang} />

      <main className="pt-20">
        <section className="relative overflow-hidden bg-[#541014] py-20 text-white md:py-28">
          <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_20%_20%,rgba(192,147,14,.36),transparent_36%),radial-gradient(circle_at_80%_70%,rgba(106,76,48,.3),transparent_32%)]" />
          <div className="container relative mx-auto max-w-6xl px-4 md:px-6">
            <p className="mb-6 text-xs font-semibold tracking-[0.22em] text-[#e0bd52]">{content.eyebrow}</p>
            <h1 className="max-w-5xl text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">{content.title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">{content.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to={lang === "en" ? "/en/contact" : "/contacto"} className="seo-primary-button inline-flex items-center justify-center gap-2">
                {ui.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to={lang === "en" ? "/en/case-studies" : "/casos-de-exito"} className="seo-secondary-button inline-flex items-center justify-center">{ui.ctaSecondary}</Link>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card py-16 md:py-20">
          <div className="container mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[.85fr_1.15fr] md:px-6">
            <div><p className="seo-kicker">{ui.problemKicker}</p><h2 className="mt-3 text-3xl md:text-4xl">{ui.problemTitle}</h2></div>
            <p className="text-lg leading-relaxed text-muted-foreground">{content.problem}</p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <p className="seo-kicker">{ui.deliverablesKicker}</p>
            <h2 className="mt-3 max-w-3xl text-3xl md:text-5xl">{ui.deliverablesTitle}</h2>
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
              <div><p className="seo-kicker">{ui.outcomesKicker}</p><h2 className="mt-3 text-3xl md:text-5xl">{ui.outcomesTitle}</h2></div>
              <div className="space-y-4">
                {content.outcomes.map((outcome) => <div key={outcome} className="flex gap-3 rounded-xl bg-white p-5 shadow-sm"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8c6905]" /><p>{outcome}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <p className="seo-kicker">{ui.processKicker}</p><h2 className="mt-3 text-3xl md:text-5xl">{ui.processTitle}</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {content.process.map((step, index) => <article key={step.title} className="border-t-2 border-[#c0930e] pt-6"><span className="font-mono text-sm text-[#6a4c30]">0{index + 1}{step.time ? ` · ${step.time}` : ""}</span><h3 className="mt-5 text-xl">{step.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{step.description}</p></article>)}
            </div>
          </div>
        </section>

        {content.proof && (
          <section className="bg-[#f4eadb] py-20 text-[#3c3c3b] md:py-24">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
              <p className="seo-kicker">{content.proof.kicker}</p>
              <h2 className="mt-3 max-w-3xl text-3xl md:text-5xl">{content.proof.title}</h2>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {content.proof.items.map((item) => (
                  <article key={item.label} className="rounded-2xl bg-white p-7 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6a4c30]">{item.label}</p>
                    <p className="mt-4 text-3xl font-bold md:text-4xl">{item.before} → {item.after}</p>
                    <p className="mt-1 text-sm font-semibold">{item.metric}</p>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{item.context}</p>
                  </article>
                ))}
              </div>
              <p className="mt-6 max-w-4xl text-sm leading-relaxed text-muted-foreground">{content.proof.note}</p>
              <a href={content.proof.cta.href} className="mt-6 inline-flex items-center gap-2 border-b border-[#c0930e] pb-0.5 font-semibold text-[#541014]">
                {content.proof.cta.label} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        )}

        {content.pricing && (
          <section id="pricing" className="py-20 md:py-28">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
              <p className="seo-kicker">{content.pricing.kicker}</p>
              <h2 className="mt-3 max-w-3xl text-3xl md:text-5xl">{content.pricing.title}</h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">{content.pricing.intro}</p>
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {content.pricing.plans.map((plan) => (
                  <article key={plan.name} className="flex flex-col rounded-2xl border border-border bg-card p-7">
                    <h3 className="text-xl">{plan.name}</h3>
                    <p className="mt-5"><span className="text-4xl font-bold">USD {usd.format(plan.price)}</span> <span className="text-muted-foreground">{plan.unit}</span></p>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{plan.description}</p>
                  </article>
                ))}
              </div>
              <div className="mt-6 flex gap-3 rounded-2xl border border-[#c0930e] bg-[#fbf6ea] p-6">
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#8c6905]" />
                <p className="leading-relaxed">{content.pricing.guarantee}</p>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{content.pricing.currencyNote}</p>
            </div>
          </section>
        )}

        <section className="border-y border-border bg-card py-20">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <p className="seo-kicker">{ui.faqKicker}</p>
            <div className="mt-8 divide-y divide-border">
              {content.faqs.map((faq) => <article key={faq.question} className="py-6"><h2 className="text-xl">{faq.question}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p></article>)}
            </div>
          </div>
        </section>

        {/* Enlaces internos relacionados. Se omite si la pieza no los declara. */}
        {content.relatedLinks && content.relatedLinks.length > 0 && (
          <section className="border-t border-border bg-card py-12">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
              <p className="seo-kicker">{ui.relatedKicker}</p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {content.relatedLinks.map((r) => (
                  <li key={r.to}>
                    <Link to={r.to} className="border-b border-[#c0930e] pb-0.5 font-semibold text-[#541014]">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="bg-[#541014] py-20 text-white">
          <div className="container mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 md:flex-row md:items-end md:px-6">
            <div><p className="text-xs font-semibold tracking-[0.22em] text-[#e0bd52]">{ui.nextKicker}</p><h2 className="mt-4 max-w-3xl text-3xl md:text-5xl">{ui.nextTitle}</h2></div>
            <Link to={lang === "en" ? "/en/contact" : "/contacto"} className="seo-primary-button shrink-0">{ui.ctaPrimary}</Link>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
