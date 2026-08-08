import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileSearch,
  GitBranch,
  Network,
  Search,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";

const services = [
  {
    icon: Search,
    title: "SEO para ecommerce",
    description: "Estrategia orgánica conectada con categorías, productos, arquitectura y objetivos comerciales.",
    href: "/servicios/seo-ecommerce",
  },
  {
    icon: Network,
    title: "SEO para agencias",
    description: "Dirección senior y capacidad técnica especializada para complementar a tu equipo.",
    href: "/seo-para-agencias",
  },
  {
    icon: FileSearch,
    title: "Auditoría SEO técnica",
    description: "Diagnóstico priorizado para encontrar bloqueos de rastreo, indexación, arquitectura y rendimiento.",
    href: "/auditoria-seo-tecnica",
  },
  {
    icon: GitBranch,
    title: "Migraciones SEO",
    description: "Planificación, acompañamiento y control para proteger señales orgánicas durante un cambio crítico.",
    href: "/migraciones-seo",
  },
];

const steps = [
  ["01", "Entender el negocio", "Objetivos, restricciones, mercado, tecnología y capacidad real del equipo."],
  ["02", "Encontrar la causa", "Datos y revisión técnica para separar síntomas, oportunidades y problemas estructurales."],
  ["03", "Priorizar decisiones", "Un plan ejecutable según impacto, esfuerzo, dependencia y riesgo."],
  ["04", "Acompañar la ejecución", "Criterio senior durante la implementación y validación de resultados."],
];

const SeoHome = () => (
  <div className="min-h-screen bg-white text-slate-950">
    <SEO
      title="Consultora SEO Senior para Ecommerce y Agencias | Ferova"
      description="Consultoría SEO senior para ecommerce y agencias: auditorías técnicas, arquitectura, migraciones, crecimiento orgánico y preparación para AI Search."
      path="/"
      lang="es"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "SEO para Ecommerce by Ferova",
        url: "https://seoparaecommerce.co/",
        areaServed: ["Colombia", "Latin America", "United States"],
        serviceType: ["SEO para ecommerce", "Auditoría SEO técnica", "Migraciones SEO", "Consultoría SEO para agencias"],
      }}
    />
    <Header lang="es" />

    <main>
      <section className="relative overflow-hidden bg-[#071a2f] pb-24 pt-36 text-white md:pb-32 md:pt-44">
        <div className="absolute -right-24 top-16 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="container relative mx-auto grid items-end gap-14 px-4 md:px-6 lg:grid-cols-[1fr_340px]">
          <div className="max-w-4xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Senior SEO Consulting · Ecommerce · Technical SEO · AI Search
            </p>
            <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-7xl">
              SEO senior para ecommerce y agencias que necesitan resolver problemas complejos.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              Trabajo directamente con equipos de marketing y agencias en auditorías técnicas, arquitectura SEO,
              migraciones, crecimiento orgánico y visibilidad en Google y motores de IA.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/contacto" className="seo-primary-button">
                Evaluar mi proyecto <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/casos-de-exito" className="seo-secondary-button">
                Ver casos reales
              </Link>
            </div>
          </div>
          <aside className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
            <p className="text-sm font-semibold text-cyan-300">Intervención senior directa</p>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
              {["Decisiones basadas en evidencia", "Prioridades claras para el equipo", "SEO técnico conectado con negocio"].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" /> {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="seo-kicker">Diagnóstico antes que volumen</p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">
                No necesitas más tareas SEO. Necesitas saber qué está frenando el crecimiento.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Problemas de rastreo o indexación que pasan desapercibidos.",
                "Arquitecturas que no reflejan la demanda ni el catálogo real.",
                "Backlogs extensos sin criterio de impacto o dependencia.",
                "Migraciones y cambios técnicos sin control de riesgo orgánico.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <p className="seo-kicker">Especialidades</p>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight md:text-5xl">
              Consultoría enfocada en los puntos donde el SEO se vuelve crítico.
            </h2>
            <p className="max-w-md text-slate-600">Cada servicio parte del problema, no de un paquete genérico de tareas.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {services.map(({ icon: Icon, title, description, href }) => (
              <Link key={href} to={href} className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-slate-200/60">
                <div className="flex items-start justify-between gap-6">
                  <span className="rounded-xl bg-blue-50 p-3 text-blue-700"><Icon className="h-6 w-6" /></span>
                  <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" />
                </div>
                <h3 className="mt-8 font-display text-2xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="seo-kicker">Cómo trabajo</p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">Del diagnóstico a una ejecución que el equipo puede sostener.</h2>
              <p className="mt-6 leading-7 text-slate-600">El método organiza la investigación, la priorización y el acompañamiento sin separar el SEO de las decisiones comerciales y técnicas.</p>
              <Link to="/metodo-ferova" className="mt-8 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900">Conocer el método <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <ol className="divide-y divide-slate-200 border-y border-slate-200">
              {steps.map(([number, title, description]) => (
                <li key={number} className="grid gap-3 py-6 sm:grid-cols-[56px_190px_1fr] sm:items-start">
                  <span className="font-mono text-sm text-blue-700">{number}</span>
                  <h3 className="font-display text-lg font-bold">{title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-[#071a2f] py-20 text-white md:py-28">
        <div className="container mx-auto grid gap-12 px-4 md:px-6 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">SEO + AI Search</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">La búsqueda cambia. Los fundamentos técnicos y la autoridad siguen importando.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Integro la preparación para respuestas de ChatGPT, Gemini, Claude y Perplexity dentro de una estrategia SEO sólida: contenido claro, entidades comprensibles, evidencia y presencia multifuente. Sin promesas de aparición ni atajos.</p>
            <Link to="/recursos/herramientas/evaluador-preparacion-ai-search" className="seo-primary-button mt-9">
              Evaluar preparación para AI Search <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8">
            <Bot className="h-10 w-10 text-cyan-300" />
            <h3 className="mt-7 font-display text-2xl font-bold">Una capa del sistema SEO</h3>
            <p className="mt-4 leading-7 text-slate-300">El evaluador es una autoevaluación orientativa. Para conocer visibilidad, menciones y brechas competitivas se necesita medición y análisis específico.</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center md:px-6">
          <p className="seo-kicker">Siguiente paso</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight md:text-5xl">Conversemos sobre el problema que necesitas resolver.</h2>
          <p className="mx-auto mt-6 max-w-2xl leading-7 text-slate-600">Cuéntame qué está cambiando, qué ya intentaste y dónde necesita apoyo tu equipo. Revisaremos si una intervención senior tiene sentido.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contacto" className="seo-primary-button">Evaluar mi proyecto <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/casos-de-exito" className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition hover:border-blue-500 hover:text-blue-700">Ver casos reales</Link>
          </div>
        </div>
      </section>
    </main>

    <Footer lang="es" />
  </div>
);

export default SeoHome;
