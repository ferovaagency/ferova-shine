import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO, { type Breadcrumb } from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight, ArrowRight, HelpCircle } from "lucide-react";
import { SITE_ORIGIN, type Lang } from "@/config/routes";

/**
 * Plantilla reutilizable de herramientas del Laboratorio Ferova (plan §14/§16).
 * Toda herramienta tiene: breadcrumb, H1 con intención, herramienta interactiva,
 * y contenido editorial INDEXABLE (fórmula, ejemplo, FAQ, relacionados, CTA).
 * Emite schema WebApplication + FAQPage + BreadcrumbList.
 *
 * El contenido editorial existe en el HTML prerenderizado aunque la herramienta
 * sea interactiva — nunca una página vacía con solo una app JS.
 */
export interface ToolLayoutProps {
  lang: Lang;
  path: string;
  seoTitle: string;
  seoDesc: string;
  /** Nombre del producto WebApplication para el schema. */
  appName: string;
  h1: string;
  intro: string;
  breadcrumbs: Breadcrumb[];
  /** La herramienta interactiva (formulario + resultado). */
  children: React.ReactNode;
  /** "¿Cómo se calcula?" */
  formulaTitle: string;
  formula: React.ReactNode;
  /** Ejemplo real. */
  exampleTitle?: string;
  example?: React.ReactNode;
  faqTitle: string;
  faq: { q: string; a: string }[];
  relatedTitle: string;
  related: { label: string; href: string }[];
  cta: { title: string; text: string; label: string; href: string };
}

const ToolLayout = (p: ToolLayoutProps) => {
  const abs = (path: string) => (/^https?:/.test(path) ? path : `${SITE_ORIGIN}${path}`);

  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: p.appName,
    url: abs(p.path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Ferova Agency", url: SITE_ORIGIN },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: p.breadcrumbs.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.name, item: abs(b.path) })),
  };

  // JSON-LD renderizado en el BODY (no vía Helmet): el prerender no serializa
  // los <script> de Helmet, así que la única forma de que el schema quede en el
  // HTML estático es inyectarlo aquí directamente.
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([webAppLd, faqLd, breadcrumbLd]) }} />
      <SEO title={p.seoTitle} description={p.seoDesc} path={p.path} lang={p.lang} />
      <Header currentLang={p.lang} />
      <main className="pt-20">
        <section className="py-10 md:py-14 relative grid-pattern">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, hsla(45, 86%, 40%, 0.06), transparent 55%)" }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 flex-wrap">
              {p.breadcrumbs.map((b, i) => (
                <span key={b.path} className="inline-flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="w-3 h-3" />}
                  {i < p.breadcrumbs.length - 1 ? (
                    <Link to={b.path} className="hover:text-gold transition-colors">{b.name}</Link>
                  ) : (
                    <span className="text-foreground">{b.name}</span>
                  )}
                </span>
              ))}
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 max-w-3xl">{p.h1}</h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">{p.intro}</p>
          </div>
        </section>

        {/* Herramienta interactiva */}
        <section className="pb-12 md:pb-16">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">{p.children}</div>
        </section>

        {/* Contenido editorial (indexable) */}
        <section className="py-12 md:py-16 border-t border-border/40">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">{p.formulaTitle}</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">{p.formula}</div>
            </div>

            {p.example && (
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">{p.exampleTitle}</h2>
                <div className="text-muted-foreground leading-relaxed space-y-3">{p.example}</div>
              </div>
            )}

            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">{p.faqTitle}</h2>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {p.faq.map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="glass-card border px-5 md:px-6 !border-border">
                    <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:no-underline py-5">
                      <span className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <span>{f.q}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pb-5 pl-8">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-display font-bold mb-4">{p.relatedTitle}</h2>
              <div className="flex flex-wrap gap-3">
                {p.related.map((r) => (
                  <Link key={r.href} to={r.href} className="inline-flex items-center gap-1.5 text-sm rounded-full border border-border px-4 py-2 text-muted-foreground hover:text-gold hover:border-gold/50 transition-colors">
                    {r.label} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 dark-section" style={{ background: "hsl(243, 28%, 14%)" }}>
          <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-foreground">{p.cta.title}</h2>
            <p className="text-muted-foreground mb-8">{p.cta.text}</p>
            <Link to={p.cta.href} className="btn-gold inline-flex items-center justify-center gap-2">
              {p.cta.label} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer currentLang={p.lang} />
    </>
  );
};

export default ToolLayout;
