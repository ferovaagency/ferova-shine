import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { FeraNewsletterSignup } from "@/components/newsletter/FeraNewsletterSignup";
import { CheckList, PageHero, Panel, Section, SectionHeading } from "@/components/fx/primitives";
import { getSupabase } from "@/integrations/supabase/lazy";

/**
 * /newsletter y /en/newsletter — newsletter de María Fernanda Calderón para
 * dueños de agencia. La suscripción es con Fera (sin Brevo) y exige la
 * autorización de tratamiento de datos. El archivo lista las ediciones
 * publicadas de este sitio (site_origin seoparaecommerce.co).
 */

const SITE_ORIGIN = "seoparaecommerce.co";

const COPY = {
  es: {
    path: "/newsletter",
    metaTitle: "Newsletter de SEO técnico para agencias",
    metaDescription:
      "Newsletter de María Fernanda Calderón, Fractional SEO en Ferova: SEO técnico, ecommerce y migraciones explicados para dueños de agencia. Suscríbete con Fera.",
    breadcrumb: "Newsletter",
    eyebrow: "Newsletter",
    title: "SEO técnico explicado para dueños de agencia",
    intro:
      "Escribo para agencias que venden o quieren vender SEO técnico sin tener el equipo completo. Una idea útil por bloque, con el criterio que uso al trabajar con agencias y tiendas.",
    whatTitle: "Qué vas a recibir",
    what: [
      "Criterios para auditar, priorizar y explicar problemas técnicos a tus clientes.",
      "Lo que conviene revisar antes, durante y después de una migración.",
      "Arquitectura de catálogos y SEO para ecommerce en Shopify, WooCommerce y otras plataformas.",
      "Ideas para vender y entregar mejor SEO técnico desde tu agencia.",
    ],
    signupTitle: "Suscríbete con Fera",
    archiveTitle: "Ediciones publicadas",
    editionLabel: (n: number) => `Edición ${n}`,
  },
  en: {
    path: "/en/newsletter",
    metaTitle: "Technical SEO newsletter for agencies",
    metaDescription:
      "Newsletter by María Fernanda Calderón, Fractional SEO at Ferova: technical SEO, ecommerce and migrations explained for agency owners. Subscribe with Fera.",
    breadcrumb: "Newsletter",
    eyebrow: "Newsletter",
    title: "Technical SEO explained for agency owners",
    intro:
      "I write for agencies that sell, or want to sell, technical SEO without a full in-house team. One useful idea per block, with the judgement I use when working with agencies and stores.",
    whatTitle: "What you'll get",
    what: [
      "Criteria to audit, prioritise and explain technical issues to your clients.",
      "What to check before, during and after a migration.",
      "Catalogue architecture and ecommerce SEO on Shopify, WooCommerce and other platforms.",
      "Ideas to sell and deliver technical SEO better from your agency.",
    ],
    signupTitle: "Subscribe with Fera",
    archiveTitle: "Published editions",
    editionLabel: (n: number) => `Edition ${n}`,
  },
};

type Edition = {
  id: string;
  edition_number: number;
  title: string;
  subject_line: string | null;
  linkedin_summary: string | null;
  topics: string[] | null;
};

export default function SeoNewsletter({ lang = "es" }: { lang?: "es" | "en" }) {
  const t = COPY[lang];
  const [editions, setEditions] = useState<Edition[]>([]);

  useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        const supabase = await getSupabase();
        const { data } = await supabase
          .from("newsletter_editions")
          .select("id,edition_number,title,subject_line,linkedin_summary,topics")
          .eq("site_origin", SITE_ORIGIN)
          .eq("published", true)
          .order("published_at", { ascending: false });
        if (alive) setEditions((data ?? []) as Edition[]);
      } catch {
        /* sin archivo visible si la consulta falla: la suscripción sigue funcionando */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const crumbs = [{ name: t.breadcrumb, path: t.path }];
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.metaTitle,
    description: t.metaDescription,
    inLanguage: lang,
    url: `https://seoparaecommerce.co${t.path}`,
    author: { "@type": "Person", name: "María Fernanda Calderón", jobTitle: "Fractional SEO" },
    publisher: { "@type": "Organization", name: "Ferova" },
  };

  return (
    <div className="fx-site min-h-screen">
      <SEO
        title={t.metaTitle}
        description={t.metaDescription}
        path={t.path}
        lang={lang}
        jsonLd={[pageLd]}
        breadcrumbs={[{ name: lang === "en" ? "Home" : "Inicio", path: lang === "en" ? "/en" : "/" }, ...crumbs]}
      />
      <Header lang={lang} />
      <main id="contenido-principal" className="pt-20">
        <PageHero eyebrow={t.eyebrow} title={t.title} intro={t.intro} breadcrumbs={crumbs} lang={lang} />

        <Section>
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <SectionHeading title={t.whatTitle} />
              <CheckList items={t.what} className="mt-8" />
            </div>
            <div id={lang === "en" ? "subscribe" : "suscribirse"}>
              <h2 className="text-2xl md:text-3xl">{t.signupTitle}</h2>
              <div className="mt-6">
                <FeraNewsletterSignup lang={lang} />
              </div>
            </div>
          </div>
        </Section>

        {editions.length ? (
          <Section tone="surface">
            <SectionHeading title={t.archiveTitle} />
            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {editions.map((edition) => (
                <li key={edition.id}>
                  <Panel className="h-full">
                    <p className="text-xs uppercase tracking-[.16em]" style={{ fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}>
                      {t.editionLabel(edition.edition_number)}
                    </p>
                    <h3 className="mt-3 text-xl leading-snug md:text-2xl">{edition.title}</h3>
                    {edition.linkedin_summary || edition.subject_line ? (
                      <p className="fx-muted mt-3 text-sm leading-relaxed">{edition.linkedin_summary || edition.subject_line}</p>
                    ) : null}
                    {edition.topics?.length ? <p className="fx-muted mt-4 text-xs">{edition.topics.join(" · ")}</p> : null}
                  </Panel>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}
      </main>
      <Footer lang={lang} />
    </div>
  );
}
