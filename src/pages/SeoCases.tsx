import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { CaseGrid } from "@/components/fx/CaseGrid";
import { PORTFOLIO_CASES, portfolioUrl } from "@/data/portfolio";
import { CheckList, CtaBand, FeraButton, FxLink, PageHero, Section, SectionHeading } from "@/components/fx/primitives";

/**
 * /casos-de-exito: los casos son los MISMOS del portafolio de Ferova
 * (src/data/portfolio.ts). No se listan casos ni cifras que no estén ahí.
 */

const CONDITIONS = [
  "Confidencialidad y alcance definidos antes de recibir accesos.",
  "Trabajo bajo marca blanca o participación visible según el proyecto.",
  "Entregas documentadas para que la agencia pueda presentarlas y operarlas.",
  "Contratación por tarea, bolsa de horas o capacidad mensual.",
];

const BREADCRUMBS = [{ name: "Inicio", path: "/" }, { name: "Casos de éxito", path: "/casos-de-exito" }];

export default function SeoCases() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Casos de éxito del portafolio de Ferova",
    itemListElement: PORTFOLIO_CASES.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name.es,
      url: portfolioUrl("es", item.id),
    })),
  };

  return (
    <div className="fx-site min-h-screen">
      <SEO
        title="Casos de éxito de SEO y desarrollo web | Ferova"
        description="Casos del portafolio de Ferova: Netpower IT, All For All, tres preescolares de Florida y Caro Color. Qué se hizo, cómo se midió y de dónde sale cada cifra."
        path="/casos-de-exito"
        lang="es"
        jsonLd={itemList}
        breadcrumbs={BREADCRUMBS}
      />
      <Header lang="es" />
      <main id="contenido-principal" className="pt-20">
        <PageHero
          eyebrow="Portafolio de Ferova"
          title="Casos de éxito"
          intro="Estos son los casos del portafolio de Ferova. Cada uno explica qué se hizo, cómo se midió y de dónde sale la cifra."
          breadcrumbs={BREADCRUMBS.slice(1)}
        />

        <Section>
          <SectionHeading eyebrow="Proyectos" title="Qué se hizo y qué cambió en cada proyecto." />
          <div className="mt-12">
            <CaseGrid lang="es" />
          </div>
          <div className="mt-12 flex justify-center">
            <FxLink to={portfolioUrl("es")} variant="outline">Ver el portafolio completo</FxLink>
          </div>
        </Section>

        <Section tone="surface">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <SectionHeading eyebrow="Condiciones de colaboración" title="La agencia conserva el control comercial." />
            <CheckList items={CONDITIONS} />
          </div>
        </Section>

        <CtaBand title="Cotiza las horas o tareas que necesita tu agencia." body="Indica habilidad, volumen, fecha y modalidad de colaboración para preparar alcance, precio y disponibilidad.">
          <FeraButton source="seo_cases_final">Hablar con Fera</FeraButton>
          <FxLink to="/contacto" variant="outline">Cotizar horas o tareas</FxLink>
        </CtaBand>
      </main>
      <Footer lang="es" />
    </div>
  );
}
