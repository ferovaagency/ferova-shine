import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Linkedin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";

const principles = [
  "Entender el negocio antes de recomendar tareas.",
  "Explicar decisiones técnicas con claridad y contexto.",
  "Priorizar por impacto, esfuerzo, dependencia y riesgo.",
  "Transferir criterio al equipo durante la ejecución.",
];

export default function SeoAbout() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SEO
        title="Sobre Maria Fer Calderón y Ferova | Consultoría SEO Senior"
        description="Conoce el enfoque detrás de SEO para Ecommerce by Ferova: consultoría senior, criterio técnico y acompañamiento directo para ecommerce y agencias."
        path="/sobre-nosotros"
        lang="es"
        breadcrumbs={[{ name: "Inicio", path: "/" }, { name: "Sobre nosotros", path: "/sobre-nosotros" }]}
      />
      <Header lang="es" />

      <main className="pt-20">
        <section className="bg-[#541014] py-20 text-white md:py-28">
          <div className="container mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e0bd52]">Sobre nosotros</p>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">Criterio senior para decisiones SEO que no admiten improvisación.</h1>
            </div>
            <p className="text-lg leading-8 text-slate-300">SEO para Ecommerce es la práctica especializada de Ferova para trabajar directamente con ecommerce, equipos de marketing y agencias en problemas orgánicos complejos.</p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="seo-kicker">Dirección directa</p>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">Maria Fer Calderón</h2>
              <p className="mt-3 font-semibold text-[#6a4c30]">Fundadora y estratega SEO de Ferova</p>
              <a href="https://www.linkedin.com/in/maria-fer-calderon/" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 font-semibold text-slate-700 hover:text-[#6a4c30]">
                <Linkedin className="h-5 w-5" /> Ver perfil en LinkedIn
              </a>
            </div>
            <div className="space-y-6 text-lg leading-8 text-slate-600">
              <p>La consultoría está diseñada para intervenir donde se necesita experiencia: auditorías técnicas, arquitectura, migraciones, crecimiento orgánico y preparación para los nuevos entornos de búsqueda.</p>
              <p>El trabajo es cercano y trazable. Cada recomendación debe responder qué problema resuelve, por qué importa, qué necesita para ejecutarse y cómo se validará.</p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 md:py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <p className="seo-kicker">Principios de trabajo</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold md:text-5xl">Claridad técnica al servicio de la ejecución.</h2>
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
            <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold md:text-5xl">¿Hay un problema SEO complejo detrás de tu próximo proyecto?</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">Conversemos para entender el contexto y determinar si una intervención senior es el siguiente paso correcto.</p>
            <Link to="/contacto" className="seo-primary-button mt-9">Solicitar cotización <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
      <Footer lang="es" />
    </div>
  );
}
