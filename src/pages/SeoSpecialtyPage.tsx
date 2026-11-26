import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { ArrowUpRight, CheckCircle2, FileSearch, GitBranch, Network, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { SEO_SPECIALTIES, SEO_SPECIALTY_UI, type SeoSpecialtyKind } from "@/content/seoSpecialties";
import type { Lang } from "@/config/routes";
import {
  CheckList,
  FaqList,
  FeraButton,
  FxLink,
  IconTile,
  PageHero,
  Panel,
  ProcessSteps,
  Section,
  SectionHeading,
  StatusBadge,
  faqSchema,
} from "@/components/fx/primitives";

const ICONS = [FileSearch, Network, ShieldCheck, GitBranch];
const MONO = { fontFamily: '"IBM Plex Mono", ui-monospace, monospace' };

/** Banda vino de cierre (misma pieza visual que CtaBand) con etiqueta sobre el titular. */
function ClosingBand({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <section className="cta-band on-dark">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="eyebrow-pill mb-6">{eyebrow}</p>
        <h2 className="text-4xl leading-[1.15] sm:text-5xl">{title}</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </section>
  );
}

/**
 * Página de especialidad (agencias, auditoría, migraciones; ES y EN) con el
 * sistema de diseño de Ferova: héroe índigo, secciones alternas, precios en
 * tarjetas, preguntas en acordeón y banda vino de cierre.
 */
export default function SeoSpecialtyPage({ kind, lang = "es" }: { kind: SeoSpecialtyKind; lang?: Lang }) {
  const content = SEO_SPECIALTIES[lang][kind];
  const ui = SEO_SPECIALTY_UI[lang];
  const en = lang === "en";
  const faqLd = faqSchema(content.faqs.map((faq) => [faq.question, faq.answer]));

  const usd = new Intl.NumberFormat(en ? "en-US" : "es-CO", { maximumFractionDigits: 0 });
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
          url: `https://seoparaecommerce.co${en ? "/en/about-me" : "/sobre-nosotros"}`,
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

  const contactPath = en ? "/en/contact" : "/contacto";
  const crumbs = [{ name: content.eyebrow, path: content.path }];

  // Alterna blanco / lavanda según las secciones que existan en esta pieza.
  let sectionIndex = 0;
  const nextTone = (): "default" | "surface" => (sectionIndex++ % 2 === 0 ? "default" : "surface");

  return (
    <div className="fx-site min-h-screen">
      <SEO
        title={content.metaTitle ?? `${content.title} | ${ui.siteName}`}
        description={content.description}
        path={content.path}
        lang={lang}
        jsonLd={serviceLd ? [serviceLd, faqLd] : faqLd}
        breadcrumbs={[{ name: ui.home, path: en ? "/en" : "/" }, ...crumbs]}
      />
      <Header lang={lang} />

      <main id="contenido-principal" className="pt-20">
        <PageHero eyebrow={content.eyebrow} title={content.title} intro={content.description} breadcrumbs={crumbs} lang={lang}>
          <FxLink to={contactPath}>{ui.ctaPrimary}</FxLink>
          <FxLink to={en ? "/en/case-studies" : "/casos-de-exito"} variant="outline">
            {ui.ctaSecondary}
          </FxLink>
        </PageHero>

        <Section tone={nextTone()}>
          <SectionHeading eyebrow={ui.problemKicker} title={ui.problemTitle} intro={content.problem} />
        </Section>

        <Section tone={nextTone()}>
          <SectionHeading eyebrow={ui.deliverablesKicker} title={ui.deliverablesTitle} />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {content.deliverables.map((item, index) => (
              <Panel key={item.title}>
                <IconTile icon={ICONS[index] ?? CheckCircle2} />
                <h3>{item.title}</h3>
                <p className="fx-muted mt-3 leading-relaxed">{item.description}</p>
              </Panel>
            ))}
          </div>
        </Section>

        <Section tone={nextTone()}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <SectionHeading eyebrow={ui.outcomesKicker} title={ui.outcomesTitle} />
            <CheckList items={content.outcomes} />
          </div>
        </Section>

        <Section tone={nextTone()}>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading eyebrow={ui.processKicker} title={ui.processTitle} />
            <ProcessSteps
              steps={content.process.map((step) => ({
                title: step.title,
                body: (
                  <>
                    {step.time ? (
                      <p className="mb-2 text-sm" style={MONO}>
                        {step.time}
                      </p>
                    ) : null}
                    <p>{step.description}</p>
                  </>
                ),
              }))}
            />
          </div>
        </Section>

        {content.longform && content.longform.length > 0 && (
          <Section tone={nextTone()} narrow>
            <div className="fx-prose">
              {content.longform.map((block) => (
                <article key={block.heading}>
                  <h2>{block.heading}</h2>
                  <div className="fx-muted">
                    {block.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {block.bullets && <CheckList items={block.bullets} className="mt-5" />}
                </article>
              ))}
            </div>
          </Section>
        )}

        {content.proof && (
          <Section tone={nextTone()}>
            <SectionHeading eyebrow={content.proof.kicker} title={content.proof.title} />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {content.proof.items.map((item) => (
                <article key={item.label} className="case-card">
                  <small>{item.label}</small>
                  <strong>
                    {item.before} → {item.after}
                  </strong>
                  <p className="mt-1 text-sm font-semibold">{item.metric}</p>
                  <p className="fx-muted mt-4 leading-relaxed">{item.context}</p>
                </article>
              ))}
            </div>
            <p className="fx-muted mt-6 max-w-4xl text-sm leading-relaxed">{content.proof.note}</p>
            <a href={content.proof.cta.href} className="fx-text-link mt-6">
              {content.proof.cta.label} <ArrowUpRight aria-hidden="true" />
            </a>
          </Section>
        )}

        {content.pricing && (
          <Section tone={nextTone()} id="pricing">
            <SectionHeading eyebrow={content.pricing.kicker} title={content.pricing.title} intro={content.pricing.intro} />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {content.pricing.plans.map((plan) => (
                <Panel key={plan.name} className="flex flex-col">
                  <h3>{plan.name}</h3>
                  <p className="mt-5 flex flex-wrap items-baseline gap-3">
                    <span className="text-4xl font-semibold" style={{ fontFamily: "Poppins, system-ui, sans-serif", letterSpacing: "-0.04em" }}>
                      USD {usd.format(plan.price)}
                    </span>
                    <StatusBadge>{plan.unit}</StatusBadge>
                  </p>
                  <p className="fx-muted mt-4 leading-relaxed">{plan.description}</p>
                </Panel>
              ))}
            </div>
            <Panel className="mt-6 flex gap-4">
              <ShieldCheck aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-[#c0930e]" />
              <p className="leading-relaxed">{content.pricing.guarantee}</p>
            </Panel>
            <p className="fx-muted mt-4 text-sm">{content.pricing.currencyNote}</p>
          </Section>
        )}

        <Section tone={nextTone()}>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <h2 className="max-w-[22ch] text-3xl lowercase leading-tight first-letter:uppercase sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              {ui.faqKicker}
            </h2>
            <FaqList items={content.faqs.map((faq) => [faq.question, faq.answer] as [string, string])} />
          </div>
        </Section>

        {/* Enlaces internos relacionados. Se omite si la pieza no los declara. */}
        {content.relatedLinks && content.relatedLinks.length > 0 && (
          <Section tone={nextTone()}>
            <p className="eyebrow-pill mb-6">{ui.relatedKicker}</p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.relatedLinks.map((r) => (
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

        <ClosingBand eyebrow={ui.nextKicker} title={ui.nextTitle}>
          <FeraButton source={`specialty_${kind}_final`}>{ui.ctaPrimary}</FeraButton>
          <FxLink to={contactPath} variant="outline">
            {en ? "Go to contact" : "Ir a contacto"}
          </FxLink>
        </ClosingBand>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
