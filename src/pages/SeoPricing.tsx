import { Link } from "react-router-dom";
import { ArrowRight, CalendarClock, Check, ClipboardCheck, Layers3, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { trackEvent } from "@/lib/analytics";

const modalities = [
  {
    id: "tarea", icon: ClipboardCheck, title: "Por tarea cerrada", price: "Precio por alcance", note: "Una entrega concreta, una fecha y criterios de aceptación",
    text: "La forma más simple de empezar cuando sabes qué debe salir.",
    items: ["Auditoría o diagnóstico técnico", "Landing page o lote definido", "QA de migración", "Corrección o implementación puntual"],
  },
  {
    id: "horas", icon: Layers3, title: "Bolsa de horas", price: "Capacidad reservada", note: "Las tareas se priorizan dentro del bloque acordado",
    text: "Para backlogs que cambian y requieren más de una habilidad durante el periodo.",
    items: ["Priorización compartida del backlog", "Registro de tareas atendidas", "SEO, web y QA dentro del alcance", "Renovación según necesidad real"],
  },
  {
    id: "mensual", icon: CalendarClock, title: "Capacidad mensual", price: "Bloque recurrente", note: "Continuidad sin crear un cargo permanente",
    text: "Para agencias con demanda frecuente que necesitan un ritmo estable de producción.",
    items: ["Capacidad recurrente acordada", "Mantenimiento y SEO técnico", "Producción de landings", "Ritmo y responsables definidos"],
  },
];

export default function SeoPricing() {
  const offerCatalog = {
    "@context": "https://schema.org", "@type": "Service", name: "SEO y producción web por horas o tareas para agencias", provider: { "@type": "Organization", name: "Ferova Agency" },
    audience: { "@type": "BusinessAudience", audienceType: "Agencias" },
    hasOfferCatalog: { "@type": "OfferCatalog", name: "Modalidades de contratación", itemListElement: modalities.map((item) => ({ "@type": "Offer", name: item.title, itemOffered: { "@type": "Service", name: item.title, description: item.text } })) },
  };

  return (
    <div className="seo-brand agency-site min-h-screen">
      <SEO title="SEO por horas y tareas para agencias | Modalidades Ferova" description="Compara contratación por tarea, bolsa de horas y capacidad mensual para SEO técnico, mantenimiento web, landings y migraciones white label." path="/precios" lang="es" jsonLd={offerCatalog} breadcrumbs={[{ name: "Inicio", path: "/" }, { name: "Modalidades", path: "/precios" }]} />
      <Header lang="es" />
      <main id="contenido-principal" className="pt-20">
        <section className="agency-subpage-hero">
          <div>
            <h1>Contrata por tarea, horas o capacidad mensual.</h1>
            <p>No necesitas adivinar un plan. Describe el backlog y recibe la unidad de contratación que mejor corresponde al volumen, la fecha y la especialidad requerida.</p>
            <Link to="/contacto" className="seo-primary-button">Cotizar mi backlog <ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="agency-pricing">
          <div className="agency-section-heading">
            <h2>Tres maneras de comprar capacidad senior.</h2>
            <p>El precio final se confirma antes de empezar y depende de la habilidad, el volumen, la plataforma, los accesos y el nivel de interacción con el cliente final.</p>
          </div>
          <div className="agency-pricing-rail">
            {modalities.map(({ id, icon: Icon, title, price, note, text, items }) => (
              <article key={id}>
                <div className="agency-pricing-icon"><Icon aria-hidden="true" /></div>
                <h2>{title}</h2>
                <strong>{price}</strong>
                <span>{note}</span>
                <p>{text}</p>
                <ul>{items.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
                <Link to={`/contacto?contratacion=${id}`} onClick={() => trackEvent("pricing_card_clicked", { tier: id, lang: "es" })}>Cotizar {title.toLowerCase()} <ArrowRight aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="agency-price-explainer">
          <div><h2>¿Por qué no publicamos una tarifa única?</h2><p>Una hora de QA sobre un sitio estable no tiene las mismas dependencias que una migración, una landing o una auditoría de un ecommerce grande. Una tarifa aislada ocultaría esas diferencias.</p></div>
          <div className="agency-price-factors"><h3>La cotización separa</h3><ul><li>Unidad de contratación</li><li>Entregables y supuestos</li><li>Accesos y responsables</li><li>Fecha y disponibilidad</li></ul></div>
        </section>

        <section className="agency-pricing-truth">
          <ShieldCheck aria-hidden="true" />
          <div><h2>Capacidad flexible no significa promesas flexibles.</h2><p>No vendemos posiciones, tráfico garantizado ni menciones en motores de IA. Vendemos trabajo especializado, criterios de aceptación, documentación y una modalidad proporcional al alcance.</p></div>
        </section>

        <section className="agency-final-cta">
          <div className="agency-final-copy"><h2>Empieza con una tarea. Amplía solo si lo necesitas.</h2><p>Comparte el trabajo pendiente y recibe una recomendación de modalidad, alcance, precio y disponibilidad.</p></div>
          <Link to="/contacto" className="seo-primary-button">Cotizar horas o tareas <ArrowRight aria-hidden="true" /></Link>
        </section>
      </main>
      <Footer lang="es" />
    </div>
  );
}
