import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, Linkedin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import type { Lang } from "@/config/routes";
import { CREDENTIALS, DIRECTORIES, FOUNDER, monthLabel } from "@/data/founder";

const LINKEDIN = FOUNDER.linkedin;

const COPY = {
  es: {
    path: "/sobre-nosotros",
    title: "Sobre María Fer Calderón | SEO senior freelance para agencias",
    desc: "El criterio detrás de SEO para Ecommerce by Ferova: SEO técnico senior, decisiones trazables y acompañamiento directo para agencias y ecommerce.",
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
      "Un ecommerce de mascotas pasó de ~$3M a más de $10M mensuales tras rediseño + SEO.",
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
    title: "About María Fer Calderón | Senior freelance SEO for agencies",
    desc: "The judgement behind SEO para Ecommerce by Ferova: senior technical SEO, traceable decisions and direct collaboration with agencies and ecommerce teams.",
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
      "A pet ecommerce store grew from ~$3M to over $10M per month after a redesign + SEO.",
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
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SEO
        title={t.title}
        description={t.desc}
        path={t.path}
        lang={lang}
        jsonLd={personLd}
        breadcrumbs={[{ name: t.home, path: lang === "en" ? "/en" : "/" }, { name: t.crumb, path: t.path }]}
      />
      <Header lang={lang} />

      <main className="pt-20">
        <section className="bg-[#541014] py-20 text-white md:py-28">
          <div className="container mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e0bd52]">{t.eyebrow}</p>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">{t.h1}</h1>
            </div>
            <p className="text-lg leading-8 text-slate-300">{t.lede}</p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="seo-kicker">{t.roleKicker}</p>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">{FOUNDER.name}</h2>
              <p className="mt-3 font-semibold text-[#6a4c30]">{t.role}</p>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 font-semibold text-slate-700 hover:text-[#6a4c30]">
                <Linkedin className="h-5 w-5" /> {t.linkedin}
              </a>
            </div>
            <div className="space-y-6 text-lg leading-8 text-slate-600">
              {t.body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 md:py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <p className="seo-kicker">{t.principlesKicker}</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold md:text-5xl">{t.principlesTitle}</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {principles.map((principle) => (
                <div key={principle} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8c6905]" />
                  <p className="leading-7 text-slate-700">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="seo-kicker">{t.profileKicker}</p>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">{t.resultsTitle}</h2>
              <ul className="mt-8 space-y-4">
                {t.results.map((result) => (
                  <li key={result} className="flex gap-4 text-lg leading-8 text-slate-700">
                    <CheckCircle2 className="mt-1.5 h-5 w-5 shrink-0 text-[#8c6905]" />
                    {result}
                  </li>
                ))}
              </ul>
              <a href={FOUNDER.portfolio} className="mt-8 inline-flex items-center gap-2 font-semibold text-[#541014] hover:text-[#6a4c30]">
                {t.portfolioCta} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <dl className="h-fit space-y-5 rounded-2xl border border-slate-200 bg-white p-7 text-slate-700">
              <p className="font-display text-xl font-bold text-slate-950">{t.experience}</p>
              <div>
                <dt className="font-semibold text-slate-950">{t.specialtiesLabel}</dt>
                <dd className="mt-1 leading-7">{t.specialties.join(" · ")}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-950">{t.industriesLabel}</dt>
                <dd className="mt-1 leading-7">{t.industries.join(" · ")}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-950">{t.languagesLabel}</dt>
                <dd className="mt-1 leading-7">{t.languages}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="credenciales" className="bg-slate-50 py-20 md:py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <p className="seo-kicker">{t.credentialsKicker}</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold md:text-5xl">{t.credentialsTitle}</h2>
            <p className="mt-4 text-slate-600">{t.credentialsIntro}</p>
            <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {CREDENTIALS.map((credential) => (
                <li key={credential.name.es} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{credential.issuer}</p>
                  <h3 className="mt-2 font-display text-xl font-bold leading-snug">{credential.name[lk]}</h3>
                  {credential.detail ? <p className="mt-1 text-sm text-slate-600">{credential.detail[lk]}</p> : null}
                  <p className="mt-3 text-sm text-slate-700">
                    {t.issued}: {monthLabel(credential.issued, lk)}
                    {credential.expires ? ` · ${t.validUntil} ${monthLabel(credential.expires, lk)}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="directorios" className="py-20 md:py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <p className="seo-kicker">{t.directoriesKicker}</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold md:text-5xl">{t.directoriesTitle}</h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {DIRECTORIES.map((directory) => (
                <li key={directory.name}>
                  <a href={directory.url} target="_blank" rel="noopener noreferrer" className="flex h-full items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-[#8c6905]">
                    {directory.badge ? (
                      <img src={directory.badge.src} alt={directory.badge.alt} width={directory.badge.width} height={directory.badge.height} loading="lazy" className="h-12 w-auto shrink-0" />
                    ) : null}
                    <span>
                      <span className="block font-semibold text-slate-950">{directory.name}</span>
                      <span className="block text-sm text-slate-600">{directory.status[lk]}</span>
                      <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[#541014]">{t.directoryCta} <ArrowUpRight className="h-3.5 w-3.5" /></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-7">
              <h3 className="font-display text-2xl font-bold">{t.ferovaTitle}</h3>
              <p className="mt-2 max-w-2xl leading-7 text-slate-600">{t.ferovaBody}</p>
              <a href={FOUNDER.ferovaProfile} className="mt-5 inline-flex items-center gap-2 font-semibold text-[#541014] hover:text-[#6a4c30]">
                {t.ferovaCta} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 text-center md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold md:text-5xl">{t.ctaTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">{t.ctaLede}</p>
            <Link to={t.contact} className="seo-primary-button mt-9">{t.ctaLabel} <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
