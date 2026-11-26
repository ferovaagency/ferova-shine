import { ArrowUpRight, Linkedin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import type { Lang } from "@/config/routes";
import { CREDENTIALS, DIRECTORIES, FOUNDER, monthLabel } from "@/data/founder";
import { CheckList, CtaBand, Eyebrow, FeraButton, FxLink, PageHero, Panel, Section, SectionHeading } from "@/components/fx/primitives";

const LINKEDIN = FOUNDER.linkedin;

const COPY = {
  es: {
    path: "/sobre-nosotros",
    title: "María Fernanda Calderón, Fractional SEO | Ferova",
    desc: "María Fernanda Calderón, Fractional SEO en Ferova: SEO técnico senior y white label para agencias y ecommerce, con decisiones trazables y trato directo.",
    home: "Inicio", crumb: "Sobre mí",
    eyebrow: "Sobre mí",
    h1: "Criterio senior para decisiones SEO que no admiten improvisación.",
    lede: "Trabajo directamente con ecommerce, equipos de marketing y agencias en problemas orgánicos complejos, como especialista independiente.",
    roleKicker: "Trato directo",
    role: "Fractional Senior Technical SEO · White label para agencias de marketing",
    linkedin: "Ver perfil en LinkedIn",
    body: [
      "La consultoría está diseñada para intervenir donde se necesita experiencia: auditorías técnicas, arquitectura, migraciones, crecimiento orgánico y preparación para los nuevos entornos de búsqueda.",
      "El trabajo es cercano y trazable. Cada recomendación debe responder qué problema resuelve, por qué importa, qué necesita para ejecutarse y cómo se validará.",
    ],
    principlesKicker: "Principios de trabajo",
    principlesTitle: "Claridad técnica al servicio de la ejecución.",
    principles: [
      "Entender el negocio antes de recomendar tareas.",
      "Explicar decisiones técnicas con claridad y contexto.",
      "Priorizar por impacto, esfuerzo, dependencia y riesgo.",
      "Transferir criterio al equipo durante la ejecución.",
    ],
    profileKicker: "Experiencia",
    experience: `${FOUNDER.yearsExperience} años en SEO y marketing digital`,
    specialtiesLabel: "Especialidades",
    specialties: [
      "SEO, GEO y AIO para ecommerce",
      "Desarrollo de ecommerce",
      "Desarrollo y posicionamiento de sitios de servicios",
      "Posicionamiento en recomendaciones de IA",
    ],
    industriesLabel: "Industrias",
    industries: ["Tecnología especializada", "Real estate", "Servicios"],
    languagesLabel: "Idiomas",
    languages: "Español nativo · Inglés B1",
    resultsTitle: "Algunos resultados",
    results: [
      "Un ecommerce de mascotas pasó de ~COP 3 M a más de COP 10 M en ventas mensuales tras rediseño + SEO.",
      "Sitios que llegaron a 10–15 llamadas o mensajes diarios desde Google.",
      "Catálogos de más de 14.000 productos.",
    ],
    portfolioCta: "Ver los casos en el portafolio",
    credentialsKicker: "Formación",
    credentialsTitle: "Formación y certificaciones",
    credentialsIntro: "Credenciales tal como figuran en mi perfil de LinkedIn.",
    issued: "Expedición",
    validUntil: "vigente hasta",
    directoriesKicker: "Directorios",
    directoriesTitle: "Perfiles verificados",
    directoryCta: "Ver perfil",
    ferovaTitle: "Además construyo software con Ferova",
    ferovaBody: "Software, SaaS y automatizaciones a la medida con IA y low-code. Ferova One y Librero IA ya están en vivo.",
    ferovaCta: "Ver mi perfil en ferova.com.co",
    ctaTitle: "¿Hay un problema SEO complejo detrás de tu próximo proyecto?",
    ctaLede: "Conversemos para entender el contexto y determinar si una intervención senior es el siguiente paso correcto.",
    ctaLabel: "Solicitar cotización",
    contact: "/contacto",
  },
  en: {
    path: "/en/about-me",
    title: "María Fernanda Calderón, Fractional SEO | Ferova",
    desc: "María Fernanda Calderón, Fractional SEO at Ferova: senior technical and white label SEO for agencies and ecommerce, with traceable decisions and direct collaboration.",
    home: "Home", crumb: "About me",
    eyebrow: "About me",
    h1: "Senior judgement for SEO decisions that cannot be improvised.",
    lede: "I work directly with ecommerce teams, marketing teams and agencies on complex organic problems, as an independent specialist based in Colombia.",
    roleKicker: "You deal with me directly",
    role: "Fractional Senior Technical SEO · White-label for marketing agencies",
    linkedin: "View LinkedIn profile",
    body: [
      "The work is built for where experience actually matters: technical audits, architecture, migrations, organic growth, and getting a site ready for how search engines answer questions now.",
      "It stays close and traceable. Every recommendation has to answer what problem it solves, why it matters, what it needs to be executed, and how it will be validated.",
    ],
    principlesKicker: "How I work",
    principlesTitle: "Technical clarity in service of execution.",
    principles: [
      "Understand the business before recommending tasks.",
      "Explain technical decisions with clarity and context.",
      "Prioritise by impact, effort, dependency and risk.",
      "Hand the reasoning to your team as we execute.",
    ],
    profileKicker: "Experience",
    experience: `${FOUNDER.yearsExperience} years in SEO and digital marketing`,
    specialtiesLabel: "Specialties",
    specialties: [
      "SEO, GEO and AIO for ecommerce",
      "Ecommerce development",
      "Building and ranking service websites",
      "Visibility in AI recommendations",
    ],
    industriesLabel: "Industries",
    industries: ["Specialised technology", "Real estate", "Services"],
    languagesLabel: "Languages",
    languages: "Spanish (native) · English B1",
    resultsTitle: "Some results",
    results: [
      "A pet ecommerce store grew from ~COP 3M to over COP 10M in monthly sales after a redesign + SEO.",
      "Sites that reached 10–15 calls or messages a day from Google.",
      "Catalogues of more than 14,000 products.",
    ],
    portfolioCta: "See the case studies in the portfolio",
    credentialsKicker: "Education",
    credentialsTitle: "Education and certifications",
    credentialsIntro: "Credentials as listed on my LinkedIn profile.",
    issued: "Issued",
    validUntil: "valid until",
    directoriesKicker: "Directories",
    directoriesTitle: "Verified profiles",
    directoryCta: "View profile",
    ferovaTitle: "I also build software with Ferova",
    ferovaBody: "Custom software, SaaS and automation with AI and low-code. Ferova One and Librero IA are already live.",
    ferovaCta: "See my profile on ferova.com.co (Spanish)",
    ctaTitle: "Is there a complex SEO problem behind your next project?",
    ctaLede: "Let's talk through the context and decide whether a senior intervention is the right next step.",
    ctaLabel: "Request a quote",
    contact: "/en/contact",
  },
} as const;

export default function SeoAbout({ lang = "es" }: { lang?: Lang }) {
  const t = COPY[lang === "en" ? "en" : "es"];
  const principles = t.principles;
  const lk = lang === "en" ? "en" : "es";
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: FOUNDER.name,
    alternateName: FOUNDER.alternateName,
    jobTitle: t.role,
    email: `mailto:${FOUNDER.email}`,
    knowsAbout: t.specialties,
    knowsLanguage: ["es", "en"],
    worksFor: {
      "@type": "Organization",
      name: "Ferova Agency",
      sameAs: DIRECTORIES.map((directory) => directory.url),
    },
    image: "https://seoparaecommerce.co/brand/maria-fernanda-calderon.webp",
    address: { "@type": "PostalAddress", addressCountry: "CO" },
    sameAs: [LINKEDIN, FOUNDER.ferovaProfile],
    hasCredential: CREDENTIALS.map((credential) => ({
      "@type": "EducationalOccupationalCredential",
      name: credential.name[lk],
      credentialCategory: credential.kind === "diplomado" ? "Diploma" : "Certificate",
      dateCreated: credential.issued,
      ...(credential.expires ? { expires: credential.expires } : {}),
      recognizedBy: { "@type": "Organization", name: credential.issuer },
    })),
  };
  const crumbs = [{ name: t.crumb, path: t.path }];
  return (
    <div className="fx-site min-h-screen">
      <SEO
        title={t.title}
        description={t.desc}
        path={t.path}
        lang={lang}
        jsonLd={personLd}
        image="https://seoparaecommerce.co/brand/maria-fernanda-calderon-og.jpg"
        breadcrumbs={[{ name: t.home, path: lang === "en" ? "/en" : "/" }, { name: t.crumb, path: t.path }]}
      />
      <Header lang={lang} />

      <main id="contenido-principal" className="pt-20">
        <PageHero eyebrow={t.eyebrow} title={t.h1} intro={t.lede} breadcrumbs={crumbs} lang={lk}>
          <FxLink to={t.contact}>{t.ctaLabel}</FxLink>
          <FxLink to={LINKEDIN} variant="outline">{t.linkedin}</FxLink>
        </PageHero>

        <Section>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
            <div className="offset-visual">
              <figure className="portrait-card m-0">
                <img
                  src="/brand/maria-fernanda-calderon.webp"
                  alt={lang === "en" ? "María Fernanda Calderón, Fractional SEO at Ferova, working on her laptop with her two cats and two dogs" : "María Fernanda Calderón, Fractional SEO en Ferova, trabajando en su portátil con sus dos gatos y sus dos perros"}
                  width={800}
                  height={800}
                  loading="lazy"
                  style={{ aspectRatio: "1 / 1" }}
                />
                <figcaption>{t.role}</figcaption>
              </figure>
            </div>
            <div>
              <Eyebrow className="mb-5">{t.roleKicker}</Eyebrow>
              <h2 className="text-3xl leading-tight sm:text-4xl lg:text-5xl lg:leading-[1.15]">{FOUNDER.name}</h2>
              <p className="mt-3 font-semibold text-[#541014]">{t.role}</p>
              <div className="fx-muted mt-6 space-y-4 leading-relaxed sm:text-lg">
                {t.body.map((p) => <p key={p}>{p}</p>)}
              </div>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="fx-text-link mt-7">
                <Linkedin aria-hidden="true" /> {t.linkedin}
              </a>
            </div>
          </div>
        </Section>

        <Section tone="surface">
          <SectionHeading eyebrow={t.principlesKicker} title={t.principlesTitle} />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {principles.map((principle) => (
              <li key={principle} className="panel-card">
                <p className="check-item">{principle}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <SectionHeading eyebrow={t.profileKicker} title={t.resultsTitle} />
              <CheckList className="mt-8" items={[...t.results]} />
              <a href={FOUNDER.portfolio} className="fx-text-link mt-8">
                {t.portfolioCta} <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <Panel className="h-fit">
              <p className="text-xl font-semibold" style={{ fontFamily: "Poppins, system-ui, sans-serif" }}>{t.experience}</p>
              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="font-semibold">{t.specialtiesLabel}</dt>
                  <dd className="fx-muted mt-1 leading-7">{t.specialties.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="font-semibold">{t.industriesLabel}</dt>
                  <dd className="fx-muted mt-1 leading-7">{t.industries.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="font-semibold">{t.languagesLabel}</dt>
                  <dd className="fx-muted mt-1 leading-7">{t.languages}</dd>
                </div>
              </dl>
            </Panel>
          </div>
        </Section>

        <Section tone="surface" id="credenciales">
          <SectionHeading eyebrow={t.credentialsKicker} title={t.credentialsTitle} intro={t.credentialsIntro} />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CREDENTIALS.map((credential) => (
              <li key={credential.name.es} className="case-card">
                <small>{credential.issuer.toUpperCase()}</small>
                <h3 className="mt-3 text-xl leading-snug">{credential.name[lk]}</h3>
                {credential.detail ? <p className="fx-muted mt-1 text-sm">{credential.detail[lk]}</p> : null}
                <p className="fx-muted mt-auto pt-4 text-sm">
                  {t.issued}: {monthLabel(credential.issued, lk)}
                  {credential.expires ? ` · ${t.validUntil} ${monthLabel(credential.expires, lk)}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="directorios">
          <SectionHeading eyebrow={t.directoriesKicker} title={t.directoriesTitle} />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {DIRECTORIES.map((directory) => (
              <li key={directory.name}>
                <a href={directory.url} target="_blank" rel="noopener noreferrer" className="link-tile flex items-center gap-5">
                  {directory.badge ? (
                    <img src={directory.badge.src} alt={directory.badge.alt} width={directory.badge.width} height={directory.badge.height} loading="lazy" className="h-12 w-auto shrink-0 rounded-md bg-white" />
                  ) : null}
                  <span>
                    <span className="block font-semibold">{directory.name}</span>
                    <span className="fx-muted block text-sm">{directory.status[lk]}</span>
                    <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold">
                      {t.directoryCta} <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Panel className="mt-12">
            <h3 className="text-2xl">{t.ferovaTitle}</h3>
            <p className="fx-muted mt-2 max-w-2xl leading-7">{t.ferovaBody}</p>
            <a href={FOUNDER.ferovaProfile} className="fx-text-link mt-5">
              {t.ferovaCta} <ArrowUpRight aria-hidden="true" />
            </a>
          </Panel>
        </Section>

        <CtaBand title={t.ctaTitle} body={t.ctaLede}>
          <FxLink to={t.contact}>{t.ctaLabel}</FxLink>
          <FeraButton variant="outline" source="about_final">{lang === "en" ? "Talk to Fera" : "Hablar con Fera"}</FeraButton>
        </CtaBand>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
