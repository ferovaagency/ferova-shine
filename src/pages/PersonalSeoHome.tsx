import { useState } from "react";
import { ArrowRight, Check, ChevronDown, MessageCircle, ShieldCheck } from "lucide-react";
import CaseStory from "@/components/CaseStory";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { trackEvent } from "@/lib/analytics";
import mafeHero from "@/assets/mafe-ferova-hero.png";
import { PERSONAL_HOME, type ModeKey } from "@/content/personalHome";
import { SITE_ORIGIN, type Lang } from "@/config/routes";

const LINKEDIN = "https://www.linkedin.com/in/maria-fer-calderon/";
const MODE_KEYS: ModeKey[] = ["task", "hours", "monthly"];

/**
 * Portada personal. Es la MISMA página en los dos idiomas: mismo diseño, misma
 * oferta, copy propio por idioma en src/content/personalHome.ts.
 *
 * Antes /en servía la portada vieja de Ferova Agency ("We grow businesses."),
 * que era otro negocio. Un selector de idioma que llevara de aquí a aquella
 * habría mandado a un dueño de agencia a una página que dice otra cosa.
 */
export default function PersonalSeoHome({ lang = "es" }: { lang?: Lang }) {
  const c = PERSONAL_HOME[lang];
  const [mode, setMode] = useState<ModeKey>("task");
  const m = c.modes[mode];

  const openQuote = () => {
    trackEvent("quote_requested", { source: "personal_home", mode, lang });
    window.dispatchEvent(new CustomEvent("open-fera-quote", { detail: { prompt: c.modeCta(c.modeTabs[mode]) } }));
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "María Fer Calderón",
    jobTitle: lang === "en" ? "Senior technical SEO consultant" : "Especialista SEO técnico y proyectos web",
    worksFor: { "@type": "Organization", name: "Ferova Agency" },
    address: { "@type": "PostalAddress", addressLocality: "Medellín", addressCountry: "CO" },
    sameAs: [LINKEDIN],
    url: `${SITE_ORIGIN}${c.path}`,
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "María Fer · Technical SEO and web projects",
    provider: { "@type": "Person", name: "María Fer Calderón" },
    areaServed: lang === "en" ? "US" : "CO",
    audience: {
      "@type": "BusinessAudience",
      audienceType: lang === "en"
        ? "Marketing, SEO, performance and web development agencies"
        : "Agencias de marketing, SEO, performance y desarrollo web",
    },
  };

  return (
    <div className="personal-home min-h-screen">
      <SEO title={c.seoTitle} description={c.seoDesc} path={c.path} lang={lang} image={mafeHero} jsonLd={[person, service]} />
      <Header lang={lang} />

      <main id="contenido-principal">
        <section className="personal-hero">
          <div className="personal-shell personal-hero-grid">
            <div className="personal-copy">
              <p className="personal-eyebrow">{c.heroEyebrow}</p>
              <h1>{c.heroTitleA}<em>{c.heroTitleEm}</em></h1>
              <p className="personal-lede">{c.heroLede}</p>
              <div className="personal-actions">
                <button type="button" className="personal-button personal-button-gold" data-cta="hero" onClick={openQuote}>
                  {c.heroCta} <ArrowRight aria-hidden="true" />
                </button>
                <a className="personal-link" href="#trabajo">{c.heroLink} <ArrowRight aria-hidden="true" /></a>
              </div>
              <p className="personal-assurance"><ShieldCheck aria-hidden="true" /> {c.heroAssurance}</p>
            </div>
            <figure className="personal-portrait">
              <img src={mafeHero} alt={c.portraitAlt} />
              <figcaption>{c.portraitCaption}</figcaption>
            </figure>
          </div>
        </section>

        <section className="personal-proof" id="trabajo">
          <div className="personal-shell">
            <CaseStory data={c.cases.redesign} />
            <CaseStory data={c.cases.recovery} />
            <CaseStory data={c.cases.maintenance} />
          </div>
        </section>

        <section className="personal-modes" id="ayuda">
          <div className="personal-shell personal-two-col">
            <div>
              <p className="personal-eyebrow">{c.modesEyebrow}</p>
              <h2>{c.modesTitle}</h2>
              <p>{c.modesLede}</p>
            </div>
            <div>
              <div className="personal-tabs" role="tablist" aria-label={c.modesAria}>
                {MODE_KEYS.map((key) => (
                  <button type="button" role="tab" key={key} aria-selected={mode === key} onClick={() => setMode(key)}>
                    {c.modeTabs[key]}
                  </button>
                ))}
              </div>
              <div className="personal-mode-panel" role="tabpanel">
                <h3>{m.title}</h3>
                <p>{m.copy}</p>
                <ul>{m.items.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
                <button type="button" className="personal-link" data-cta="mid" onClick={openQuote}>
                  {c.modeCta(c.modeTabs[mode])} <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="personal-about" id="sobre-mi">
          <div className="personal-shell personal-two-col">
            <div>
              <p className="personal-eyebrow">{c.aboutEyebrow}</p>
              <h2>{c.aboutTitle}</h2>
            </div>
            <div>
              {c.aboutParagraphs.map((p) => <p key={p}>{p}</p>)}
              <a href="#contacto" className="personal-link">{c.aboutLink} <ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="personal-faq">
          <div className="personal-shell personal-two-col">
            <div>
              <p className="personal-eyebrow">{c.faqEyebrow}</p>
              <h2>{c.faqTitle}</h2>
            </div>
            <div>
              {c.faqs.map(([q, a]) => (
                <details key={q}><summary>{q}<ChevronDown aria-hidden="true" /></summary><p>{a}</p></details>
              ))}
            </div>
          </div>
        </section>

        <section className="personal-contact" id="contacto">
          <div className="personal-shell personal-contact-inner">
            <div>
              <p className="personal-eyebrow">{c.contactEyebrow}</p>
              <h2>{c.contactTitle}</h2>
              <p>{c.contactLede}</p>
            </div>
            <button type="button" className="personal-button personal-button-gold" data-cta="final" onClick={openQuote}>
              <MessageCircle aria-hidden="true" /> {c.contactCta}
            </button>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
