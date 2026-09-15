import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Linkedin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import type { Lang } from "@/config/routes";

const LINKEDIN = "https://www.linkedin.com/in/maria-fer-calderon/";

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
    role: "Fundadora y estratega SEO de Ferova",
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
    lede: "I work directly with ecommerce teams, marketing teams and agencies on complex organic problems, as an independent specialist based in Medellín, Colombia.",
    roleKicker: "You deal with me directly",
    role: "Founder and SEO strategist at Ferova",
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
    ctaTitle: "Is there a complex SEO problem behind your next project?",
    ctaLede: "Let's talk through the context and decide whether a senior intervention is the right next step.",
    ctaLabel: "Request a quote",
    contact: "/en/contact",
  },
} as const;

export default function SeoAbout({ lang = "es" }: { lang?: Lang }) {
  const t = COPY[lang === "en" ? "en" : "es"];
  const principles = t.principles;
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "María Fer Calderón",
    jobTitle: lang === "en" ? "Senior technical SEO consultant" : "Estratega SEO senior",
    worksFor: { "@type": "Organization", name: "Ferova Agency" },
    address: { "@type": "PostalAddress", addressLocality: "Medellín", addressCountry: "CO" },
    sameAs: [LINKEDIN],
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
              <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">Maria Fer Calderón</h2>
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
