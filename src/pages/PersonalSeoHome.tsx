import { useState } from "react";
import { ArrowRight, Check, ChevronDown, MessageCircle, ShieldCheck } from "lucide-react";
import RedesignCaseStory from "@/components/RedesignCaseStory";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { trackEvent } from "@/lib/analytics";
import mafeHero from "@/assets/mafe-ferova-hero.png";

const modes = {
  tarea: { title: "Resolvamos una entrega concreta.", copy: "Una auditoría, una landing o el QA de una migración. Definimos alcance y criterios de aceptación antes de empezar.", items: ["Entregable definido", "Alcance y precio acordados", "Documentación y revisión"] },
  horas: { title: "Activa apoyo cuando el backlog cambia.", copy: "Priorizamos tareas de SEO, mantenimiento web o implementación dentro de un bloque de horas acordado.", items: ["Prioridades compartidas", "Registro de tareas y horas", "Flexibilidad dentro del alcance"] },
  mensual: { title: "Demos continuidad a tus entregas.", copy: "Acordamos capacidad recurrente para proyectos que necesitan seguimiento y producción durante el mes.", items: ["Disponibilidad acordada", "Seguimiento de prioridades", "Entregas documentadas"] },
};

const faqs = [
  ["¿Qué tipo de trabajo puedo delegarte?", "SEO técnico, migraciones, mantenimiento web, landings y QA. Primero entendemos la tarea y después acordamos la forma de colaboración."],
  ["¿Puedes trabajar bajo la marca de mi agencia?", "Sí. Podemos trabajar como apoyo interno, bajo tu marca o como especialista visible ante tu cliente, según el proyecto."],
  ["¿Cómo se presenta un caso sin revelar al cliente?", "Mostraremos el problema, la intervención y la evidencia técnica sin publicar empresa, nombres, dominios, URLs, logos ni datos identificables."],
  ["¿Necesito una llamada para empezar?", "No necesariamente. Puedes dejar el contexto inicial y definimos si hace falta conversar para cerrar alcance, accesos y fecha."],
];

export default function PersonalSeoHome() {
  const [mode, setMode] = useState<keyof typeof modes>("tarea");
  const c = modes[mode];
  const openQuote = () => { trackEvent("quote_requested", { source: "personal_home", mode }); window.dispatchEvent(new CustomEvent("open-fera-quote", { detail: { prompt: `Quiero conversar sobre ${mode}` } })); };
  const professional = { "@context": "https://schema.org", "@type": "Person", name: "María Fer", jobTitle: "Especialista SEO técnico y proyectos web", worksFor: { "@type": "Organization", name: "Ferova Agency" }, url: "https://seoparaecommerce.co/" };
  const service = { "@context": "https://schema.org", "@type": "ProfessionalService", name: "María Fer · SEO técnico y proyectos web", provider: { "@type": "Person", name: "María Fer" }, audience: { "@type": "BusinessAudience", audienceType: "Agencias de marketing, SEO, performance y desarrollo web" } };
  return <div className="personal-home min-h-screen"><SEO title="María Fer · SEO técnico y proyectos web para agencias | Ferova" description="Criterio técnico, implementación y entregas documentadas para agencias. Trabaja con María Fer por tarea, horas o capacidad mensual." path="/" lang="es" image={mafeHero} jsonLd={[professional, service]} /><Header lang="es" />
    <main id="contenido-principal">
      <section className="personal-hero"><div className="personal-shell personal-hero-grid"><div className="personal-copy"><p className="personal-eyebrow">Tu aliada técnica para agencias</p><h1>Soy María Fer. Me sumo a tu equipo para resolver <em>SEO y web.</em></h1><p className="personal-lede">Trabajo contigo por tarea, horas o mes. Aporto criterio técnico, implementación y entregas documentadas para que tu agencia conserve el control.</p><div className="personal-actions"><button type="button" className="personal-button personal-button-gold" onClick={openQuote}>Cuéntame tu proyecto <ArrowRight aria-hidden="true" /></button><a className="personal-link" href="#trabajo">Conoce mi trabajo <ArrowRight aria-hidden="true" /></a></div><p className="personal-assurance"><ShieldCheck aria-hidden="true" /> Colaboración directa · White label disponible</p></div><figure className="personal-portrait"><img src={mafeHero} alt="María Fer en un espacio de trabajo de Ferova" /><figcaption>María Fer · SEO técnico y proyectos web</figcaption></figure></div></section>
      <section className="personal-proof" id="trabajo"><div className="personal-shell"><RedesignCaseStory /></div></section>
      <section className="personal-modes" id="ayuda"><div className="personal-shell personal-two-col"><div><p className="personal-eyebrow">Cómo podemos trabajar</p><h2>La capacidad que necesitas, con una relación directa.</h2><p>Una tarea concreta o apoyo continuo para las entregas de tu agencia.</p></div><div><div className="personal-tabs" role="tablist" aria-label="Modalidad de colaboración">{(Object.keys(modes) as Array<keyof typeof modes>).map((key) => <button type="button" role="tab" key={key} aria-selected={mode === key} onClick={() => setMode(key)}>{key === "tarea" ? "Por tarea" : key === "horas" ? "Por horas" : "Mensual"}</button>)}</div><div className="personal-mode-panel" role="tabpanel"><h3>{c.title}</h3><p>{c.copy}</p><ul>{c.items.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul><button type="button" className="personal-link" onClick={openQuote}>Quiero conversar sobre {mode} <ArrowRight aria-hidden="true" /></button></div></div></div></section>
      <section className="personal-about" id="sobre-mi"><div className="personal-shell personal-two-col"><div><p className="personal-eyebrow">Una relación de trabajo directa</p><h2>Sabes con quién hablas y quién está detrás de la entrega.</h2></div><div><p>Me integro al trabajo de tu agencia para convertir necesidades técnicas en entregas que puedas revisar y presentar a tu cliente.</p><p>Antes de empezar acordamos prioridades, accesos, alcance y forma de colaboración. Durante el proyecto, las decisiones quedan documentadas.</p><a href="#contacto" className="personal-link">Hablemos de tu próxima entrega <ArrowRight aria-hidden="true" /></a></div></div></section>
      <section className="personal-faq"><div className="personal-shell personal-two-col"><div><p className="personal-eyebrow">Preguntas frecuentes</p><h2>Antes de trabajar juntas, puedes preguntarme esto.</h2></div><div>{faqs.map(([q,a]) => <details key={q}><summary>{q}<ChevronDown aria-hidden="true" /></summary><p>{a}</p></details>)}</div></div></section>
      <section className="personal-contact" id="contacto"><div className="personal-shell personal-contact-inner"><div><p className="personal-eyebrow">El siguiente proyecto</p><h2>Cuéntame qué necesitas resolver.</h2><p>Empecemos por el trabajo. La modalidad la definimos a partir del alcance real.</p></div><button type="button" className="personal-button personal-button-gold" onClick={openQuote}><MessageCircle aria-hidden="true" /> Abrir Fera y conversar</button></div></section>
    </main><Footer lang="es" /></div>;
}
