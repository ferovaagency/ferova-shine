import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ClipboardList, FileCheck2, ShieldCheck, Wrench } from "lucide-react";
import { CaseGrid } from "@/components/fx/CaseGrid";
import { portfolioUrl } from "@/data/portfolio";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { trackEvent } from "@/lib/analytics";
import mafeHero from "@/assets/mafe-ferova-hero.webp";
import { PERSONAL_HOME, type ModeKey } from "@/content/personalHome";
import { SITE_ORIGIN, type Lang } from "@/config/routes";
import { CtaBand, FaqList, FeraButton, FxLink, Section, SectionHeading, faqSchema, openFera } from "@/components/fx/primitives";

const LINKEDIN = "https://www.linkedin.com/in/maria-fer-calderon/";
const MODE_KEYS: ModeKey[] = ["task", "hours", "monthly"];

/**
 * Portada personal con el sistema de diseño de Ferova (misma estructura que la
 * portada de ferova.com.co): héroe oscuro con retícula y consola de modalidades,
 * rutas de especialidad, evidencia, sobre mí, preguntas y banda vino de cierre.
 * Copy propio por idioma en src/content/personalHome.ts.
 */
export default function PersonalSeoHome({ lang = "es" }: { lang?: Lang }) {
  const c = PERSONAL_HOME[lang];
  const en = lang === "en";
  const [mode, setMode] = useState<ModeKey>("task");
  const m = c.modes[mode];

  const openQuote = (source: string) => {
    trackEvent("quote_requested", { source: `personal_home_${source}`, mode, lang });
    openFera(c.modeCta(c.modeTabs[mode]), "personal_home");
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "María Fer Calderón",
    jobTitle: en ? "Senior technical SEO consultant" : "Especialista SEO técnico y proyectos web",
    worksFor: { "@type": "Organization", name: "Ferova Agency" },
    address: { "@type": "PostalAddress", addressLocality: "Bogotá", addressCountry: "CO" },
    sameAs: [LINKEDIN],
    url: `${SITE_ORIGIN}${c.path}`,
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "María Fer · Technical SEO and web projects",
    provider: { "@type": "Person", name: "María Fer Calderón" },
    areaServed: en ? "US" : "CO",
    audience: {
      "@type": "BusinessAudience",
      audienceType: en ? "Marketing, SEO, performance and web development agencies" : "Agencias de marketing, SEO, performance y desarrollo web",
    },
  };

  const flow = en
    ? [
        { icon: ClipboardList, title: "Brief", body: "Scope, access and acceptance criteria before starting." },
        { icon: Wrench, title: "Execution", body: "Technical work inside your agency’s process and tools." },
        { icon: FileCheck2, title: "Documented delivery", body: "Reports and decisions your team can present to the client." },
      ]
    : [
        { icon: ClipboardList, title: "Brief", body: "Alcance, accesos y criterios de aceptación antes de empezar." },
        { icon: Wrench, title: "Ejecución", body: "Trabajo técnico dentro del proceso y las herramientas de tu agencia." },
        { icon: FileCheck2, title: "Entrega documentada", body: "Reportes y decisiones que tu equipo puede presentar al cliente." },
      ];

  const branches = en
    ? [
        { kicker: "White label", name: "SEO for agencies", href: "/en/white-label-seo-for-agencies" },
        { kicker: "Diagnosis", name: "Technical SEO audit", href: "/en/technical-seo-audit-services" },
        { kicker: "Replatforming", name: "SEO migrations", href: "/en/seo-migration-services" },
      ]
    : [
        { kicker: "Marca blanca", name: "SEO para agencias", href: "/seo-para-agencias" },
        { kicker: "Diagnóstico", name: "Auditoría SEO técnica", href: "/auditoria-seo-tecnica" },
        { kicker: "Cambio de plataforma", name: "Migraciones SEO", href: "/migraciones-seo" },
      ];

  return (
    <div className="fx-site personal-home min-h-screen">
      <SEO title={c.seoTitle} description={c.seoDesc} path={c.path} lang={lang} image={mafeHero} jsonLd={[person, service, faqSchema(c.faqs)]} />
      <Header lang={lang} />

      <main id="contenido-principal" className="pt-20">
        <section className="home-hero on-dark grid-field">
          <div className="mx-auto w-full max-w-7xl px-5 pt-14 sm:px-8 sm:pt-24">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
              <div>
                <p className="eyebrow-pill mb-6">{c.heroEyebrow}</p>
                <h1>
                  {c.heroTitleA}
                  <em>{c.heroTitleEm}</em>
                </h1>
              </div>
              <div>
                <p className="text-lg leading-relaxed">{c.heroLede}</p>
                <p className="fx-muted mt-4 flex items-center gap-2 text-sm">
                  <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#ffe7a3]" /> {c.heroAssurance}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" className="fx-btn" data-cta="hero" onClick={() => openQuote("hero")}>
                    {c.heroCta} <ArrowUpRight aria-hidden="true" />
                  </button>
                  <a href="#trabajo" className="fx-btn fx-btn--outline">
                    {c.heroLink} <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-14 sm:mt-20" id="ayuda">
              <div className="console">
                <div className="console__body">
                  <div className="console__side" role="tablist" aria-label={c.modesAria}>
                    {MODE_KEYS.map((key) => (
                      <button type="button" role="tab" key={key} aria-selected={mode === key} onClick={() => setMode(key)}>
                        {c.modeTabs[key]}
                      </button>
                    ))}
                  </div>
                  <div className="console__panel" role="tabpanel">
                    <div className="console__head">
                      <div>
                        <p className="text-lg font-semibold" style={{ fontFamily: "Poppins, system-ui, sans-serif", minHeight: 0 }}>{m.title}</p>
                        <p className="mt-1 text-[#585665]">{m.copy}</p>
                      </div>
                      <button type="button" data-cta="mid" onClick={() => openQuote("console")}>
                        {c.modeCta(c.modeTabs[mode])} <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="console__flow">
                      {flow.map(({ icon: Icon, title, body }) => (
                        <div key={title} className="console__node">
                          <span><Icon aria-hidden="true" /></span>
                          <p className="mt-4 text-lg font-semibold" style={{ fontFamily: "Poppins, system-ui, sans-serif" }}>{title}</p>
                          <p className="mt-1 text-sm text-[#585665]">{body}</p>
                        </div>
                      ))}
                    </div>
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 px-[clamp(1.25rem,3vw,2.5rem)] pb-8 text-sm text-[#585665]">
                      {m.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#c0930e]" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <nav aria-label={en ? "Specialties" : "Especialidades"} className="fx-bg-surface">
          <ul className="mx-auto grid w-full max-w-7xl gap-x-10 px-5 py-5 sm:px-8 md:grid-cols-3">
            {branches.map((b) => (
              <li key={b.href}>
                <Link to={b.href} className="branch-link group">
                  <span>
                    <span className="fx-muted block text-sm">{b.kicker}</span>
                    <strong>{b.name}</strong>
                  </span>
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Section id="trabajo">
          <SectionHeading
            eyebrow={en ? "Evidence" : "Evidencia"}
            title={en ? "From search to sale, with the source behind every figure." : "De la búsqueda a la venta, con la fuente de cada cifra."}
            intro={
              en
                ? "These are the cases in the Ferova portfolio. Each one explains what was done, how it was measured and where the figure comes from."
                : "Estos son los casos del portafolio de Ferova. Cada uno explica qué se hizo, cómo se midió y de dónde sale la cifra."
            }
          />
          <div className="mt-12">
            <CaseGrid lang={lang} />
          </div>
          <div className="mt-10 text-center">
            <FxLink to={portfolioUrl(en ? "en" : "es")}>{en ? "See the full portfolio" : "Ver el portafolio completo"}</FxLink>
          </div>
        </Section>

        <Section tone="surface" id="sobre-mi" className="relative overflow-hidden">
          <div className="dot-field absolute inset-0" aria-hidden="true" />
          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div className="offset-visual">
              <figure className="portrait-card m-0">
                <img src={mafeHero} alt={c.portraitAlt} width={1536} height={1024} loading="lazy" />
                <figcaption>{c.portraitCaption}</figcaption>
              </figure>
            </div>
            <div>
              <p className="eyebrow-pill mb-5">{c.aboutEyebrow}</p>
              <h2 className="text-3xl leading-tight sm:text-4xl lg:text-5xl lg:leading-[1.15]">{c.aboutTitle}</h2>
              <div className="fx-muted mt-6 space-y-4 leading-relaxed sm:text-lg">
                {c.aboutParagraphs.map((p) => <p key={p}>{p}</p>)}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <FxLink to={en ? "/en/about-me" : "/sobre-nosotros"}>{c.aboutLink}</FxLink>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading eyebrow={c.faqEyebrow} title={c.faqTitle} />
            <FaqList items={c.faqs} />
          </div>
        </Section>

        <CtaBand title={c.contactTitle} body={c.contactLede}>
          <FeraButton source="personal_home_final" prompt={c.modeCta(c.modeTabs[mode])}>{c.contactCta}</FeraButton>
        </CtaBand>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
