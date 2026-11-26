import { ArrowUpRight, Bot, Layers3, Search, ShoppingBag, Waypoints } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import {
  CheckList,
  CtaBand,
  FaqList,
  FeraButton,
  FxLink,
  IconTile,
  PageHero,
  Panel,
  Section,
  SectionHeading,
  faqSchema,
} from "@/components/fx/primitives";

const pillars = [
  { icon: Search, title: "Base técnica", text: "Rastreo, indexación, renderizado, Core Web Vitals, canonicals y control de deuda técnica." },
  { icon: Layers3, title: "Arquitectura del catálogo", text: "Categorías, facetas, productos, enlazado interno y reglas para catálogos que cambian continuamente." },
  { icon: ShoppingBag, title: "Demanda y conversión", text: "Priorización de consultas y páginas según intención, margen, disponibilidad y capacidad comercial." },
  { icon: Waypoints, title: "Autoridad y contenido", text: "Contenido útil, señales externas y cobertura temática conectada con decisiones de compra reales." },
];

const signals = [
  "El tráfico orgánico no crece aunque el equipo publique y optimice.",
  "Google indexa URLs que no deberían competir entre sí.",
  "El catálogo cambió y la arquitectura ya no representa el negocio.",
  "Hay una migración, replatforming o rediseño próximo.",
  "El backlog SEO crece, pero nadie puede defender qué va primero.",
];

const faqs = [
  { q: "¿Qué diferencia el SEO para ecommerce?", a: "Un ecommerce combina catálogos extensos, inventario cambiante, variantes, filtros y múltiples rutas hacia productos similares. La estrategia debe controlar esa complejidad sin perder intención comercial." },
  { q: "¿La consultoría incluye implementación?", a: "El alcance se define según el equipo y la plataforma. Puedo acompañar a desarrollo y contenidos, validar entregas o asumir bloques concretos cuando sea viable." },
  { q: "¿Cuándo se pueden esperar resultados?", a: "Depende del estado técnico, la autoridad, la competencia y la velocidad de implementación. Se acuerdan indicadores y ventanas de evaluación, pero no se garantizan posiciones ni plazos universales." },
  { q: "¿AI Search está separado del SEO?", a: "No. Se trabaja como una capa del sistema SEO mediante entidades claras, contenido rastreable, datos estructurados, autoridad externa y medición específica." },
];

const PATH = "/servicios/seo-ecommerce";
const DESCRIPTION = "Consultoría SEO senior para ecommerce: arquitectura de catálogo, SEO técnico, migraciones, contenido y preparación para AI Search.";

/** /servicios/seo-ecommerce con el sistema de diseño de Ferova. */
export default function SeoEcommerceEs() {
  const faqPairs = faqs.map((f) => [f.q, f.a] as [string, string]);
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO para ecommerce",
    serviceType: "SEO para ecommerce",
    description: DESCRIPTION,
    url: `https://seoparaecommerce.co${PATH}`,
    provider: { "@type": "Person", name: "María Fernanda Calderón", url: "https://seoparaecommerce.co/sobre-nosotros" },
  };
  const crumbs = [{ name: "SEO para ecommerce", path: PATH }];

  return (
    <div className="fx-site min-h-screen">
      <SEO
        title="SEO para Ecommerce: estrategia técnica y crecimiento orgánico | Ferova"
        description={DESCRIPTION}
        path={PATH}
        lang="es"
        jsonLd={[serviceLd, faqSchema(faqPairs)]}
        breadcrumbs={[{ name: "Inicio", path: "/" }, ...crumbs]}
      />
      <Header lang="es" />
      <main id="contenido-principal" className="pt-20">
        <PageHero
          eyebrow="SEO para ecommerce"
          title="Convierte la complejidad de tu ecommerce en una arquitectura que Google pueda entender y el negocio pueda aprovechar."
          intro="Trabajo con catálogos, categorías, facetas, productos y equipos técnicos para detectar bloqueos, priorizar oportunidades y construir crecimiento orgánico sostenible."
          breadcrumbs={crumbs}
        >
          <FxLink to="/contacto">Cotizar SEO para ecommerce</FxLink>
          <FxLink to="/casos-de-exito" variant="outline">Ver evidencia disponible</FxLink>
        </PageHero>

        <Section>
          <SectionHeading eyebrow="El sistema completo" title="El problema rara vez está en una sola etiqueta o palabra clave." />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {pillars.map(({ icon, title, text }) => (
              <Panel key={title}>
                <IconTile icon={icon} />
                <h3>{title}</h3>
                <p className="fx-muted mt-3 leading-relaxed">{text}</p>
              </Panel>
            ))}
          </div>
        </Section>

        <Section tone="surface">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading eyebrow="Cuándo intervenir" title="Señales de que necesitas criterio senior." />
            <CheckList items={signals} />
          </div>
        </Section>

        <Section>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <SectionHeading eyebrow="AI Search dentro del SEO" title="Preparar la marca para nuevas interfaces sin abandonar los fundamentos." />
              <p className="fx-muted mt-6 leading-relaxed sm:text-lg">
                La comprensión de entidades, el contenido citable, los datos estructurados y la autoridad multifuente complementan el SEO técnico y editorial. Ninguna intervención garantiza una mención o recomendación.
              </p>
              <Link to="/recursos/herramientas/evaluador-preparacion-ai-search" className="fx-text-link mt-8">
                Usar el evaluador <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
            <div className="cta-card cta-card--indigo on-dark">
              <span className="icon-tile">
                <Bot aria-hidden="true" strokeWidth={1.5} className="text-[#e4c45f]" />
              </span>
              <h3 className="text-2xl">Medición antes que afirmaciones</h3>
              <p className="fx-muted mt-4 leading-relaxed">
                Para hablar de visibilidad real se requiere un conjunto de consultas, plataformas, fechas de corte y competidores. Una autoevaluación no sustituye esa medición.
              </p>
            </div>
          </div>
        </Section>

        <Section tone="surface">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading title="Preguntas frecuentes" />
            <FaqList items={faqPairs} />
          </div>
        </Section>

        <CtaBand title="Empecemos por identificar qué está frenando el crecimiento.">
          <FeraButton source="seo_ecommerce_es_final">Cotizar SEO para ecommerce</FeraButton>
          <FxLink to="/contacto" variant="outline">Ir a contacto</FxLink>
        </CtaBand>
      </main>
      <Footer lang="es" />
    </div>
  );
}
