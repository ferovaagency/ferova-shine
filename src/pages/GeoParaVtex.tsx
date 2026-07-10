import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { AnswerBlock } from '@/components/ui/answer-block';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Bot, Database, Building2, Layers, MessageCircle, type LucideIcon } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import type { Lang } from '@/lib/pricing';

interface Props { lang?: Lang }

const WHATSAPP_URL = 'https://wa.link/jvbd4j?text=' + encodeURIComponent('Hola Ferova, operamos en VTEX y queremos GEO enterprise.');

const T: Record<Lang, {
  seoTitle: string; seoDesc: string; eyebrow: string; h1: string; answer: string;
  featuresTitle: string; features: { icon: LucideIcon; title: string; desc: string }[];
  faqTitle: string; faqs: { q: string; a: string }[];
  cta: string; ctaSub: string;
}> = {
  es: {
    seoTitle: 'GEO para VTEX: citabilidad de IA para ecommerce enterprise LATAM | Ferova Agency',
    seoDesc: 'GEO enterprise para operaciones VTEX en LATAM: catálogos grandes, VTEX IO, arquitectura headless y datos estructurados a escala.',
    eyebrow: 'GEO para VTEX · Enterprise',
    h1: 'GEO para operaciones VTEX',
    answer: 'VTEX domina el ecommerce enterprise en LATAM, pero sus catálogos grandes y arquitecturas headless/VTEX IO requieren un enfoque distinto al de una tienda pequeña: automatización de Schema.org a nivel de miles de SKUs, no ediciones manuales. Ferova Agency implementa GEO a escala para operaciones VTEX, integrando con tu catálogo maestro y tu equipo técnico interno.',
    featuresTitle: 'Qué hacemos en tu operación VTEX',
    features: [
      { icon: Layers, title: 'Schema a escala', desc: 'Generación automatizada de JSON-LD Product/Offer conectada a tu catálogo maestro VTEX, no por SKU manual.' },
      { icon: Building2, title: 'Arquitectura headless', desc: 'Implementación de datos estructurados compatible con VTEX IO y frontends headless/FastStore.' },
      { icon: Database, title: 'Feeds enterprise', desc: 'Sincronización de tu feed VTEX con las fuentes que consumen los LLM, sin duplicar trabajo del equipo de catálogo.' },
      { icon: Bot, title: 'Gobernanza de contenido', desc: 'Lineamientos de citabilidad para que el equipo interno mantenga el estándar GEO al publicar nuevos productos.' },
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Trabajan con equipos técnicos internos de VTEX?', a: 'Sí. Este servicio está diseñado para coordinarse con tu equipo de desarrollo o partner VTEX existente, no para reemplazarlo.' },
      { q: '¿Funciona con VTEX IO y arquitecturas headless?', a: 'Sí, es uno de los casos que más trabajamos dado el volumen de operaciones enterprise en VTEX que usan frontends headless en LATAM.' },
      { q: '¿Cuál es el ticket de este servicio?', a: 'Al ser un servicio enterprise, el alcance y precio se definen tras una llamada de diagnóstico con tu equipo técnico y de marketing.' },
    ],
    cta: 'Agendar diagnóstico enterprise VTEX', ctaSub: 'Llamada de 30 minutos con tu equipo técnico y de marketing.',
  },
  pt: {
    seoTitle: 'GEO para VTEX: citabilidade de IA para e-commerce enterprise LATAM | Ferova Agency',
    seoDesc: 'GEO enterprise para operações VTEX na LATAM: catálogos grandes, VTEX IO, arquitetura headless e dados estruturados em escala.',
    eyebrow: 'GEO para VTEX · Enterprise',
    h1: 'GEO para operações VTEX',
    answer: 'A VTEX domina o e-commerce enterprise na LATAM, mas seus catálogos grandes e arquiteturas headless/VTEX IO exigem uma abordagem diferente da de uma loja pequena: automação de Schema.org em nível de milhares de SKUs, não edições manuais. A Ferova Agency implementa GEO em escala para operações VTEX, integrando com seu catálogo mestre e sua equipe técnica interna.',
    featuresTitle: 'O que fazemos na sua operação VTEX',
    features: [
      { icon: Layers, title: 'Schema em escala', desc: 'Geração automatizada de JSON-LD Product/Offer conectada ao seu catálogo mestre VTEX, não por SKU manual.' },
      { icon: Building2, title: 'Arquitetura headless', desc: 'Implementação de dados estruturados compatível com VTEX IO e frontends headless/FastStore.' },
      { icon: Database, title: 'Feeds enterprise', desc: 'Sincronização do seu feed VTEX com as fontes que os LLMs consomem, sem duplicar trabalho da equipe de catálogo.' },
      { icon: Bot, title: 'Governança de conteúdo', desc: 'Diretrizes de citabilidade para que a equipe interna mantenha o padrão GEO ao publicar novos produtos.' },
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'Vocês trabalham com equipes técnicas internas da VTEX?', a: 'Sim. Este serviço é desenhado para se coordenar com sua equipe de desenvolvimento ou parceiro VTEX existente, não para substituí-lo.' },
      { q: 'Funciona com VTEX IO e arquiteturas headless?', a: 'Sim, é um dos casos que mais trabalhamos dado o volume de operações enterprise na VTEX que usam frontends headless na LATAM.' },
      { q: 'Qual é o ticket deste serviço?', a: 'Por ser um serviço enterprise, o escopo e preço são definidos após uma chamada de diagnóstico com sua equipe técnica e de marketing.' },
    ],
    cta: 'Agendar diagnóstico enterprise VTEX', ctaSub: 'Chamada de 30 minutos com sua equipe técnica e de marketing.',
  },
  en: {
    seoTitle: 'GEO for VTEX: AI citability for enterprise LATAM e-commerce | Ferova Agency',
    seoDesc: 'Enterprise GEO for VTEX operations in LATAM: large catalogs, VTEX IO, headless architecture and structured data at scale.',
    eyebrow: 'GEO for VTEX · Enterprise',
    h1: 'GEO for VTEX operations',
    answer: 'VTEX dominates enterprise e-commerce in LATAM, but its large catalogs and headless/VTEX IO architectures need a different approach than a small store: automated Schema.org at the scale of thousands of SKUs, not manual edits. Ferova Agency implements GEO at scale for VTEX operations, integrating with your master catalog and internal technical team.',
    featuresTitle: 'What we do on your VTEX operation',
    features: [
      { icon: Layers, title: 'Schema at scale', desc: 'Automated JSON-LD Product/Offer generation connected to your VTEX master catalog, not manual per-SKU edits.' },
      { icon: Building2, title: 'Headless architecture', desc: 'Structured data implementation compatible with VTEX IO and headless/FastStore frontends.' },
      { icon: Database, title: 'Enterprise feeds', desc: 'Syncing your VTEX feed with the sources LLMs consume, without duplicating your catalog team\'s work.' },
      { icon: Bot, title: 'Content governance', desc: 'Citability guidelines so your internal team maintains the GEO standard when publishing new products.' },
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Do you work with internal VTEX technical teams?', a: 'Yes. This service is designed to coordinate with your existing development team or VTEX partner, not replace them.' },
      { q: 'Does it work with VTEX IO and headless architectures?', a: 'Yes, it\'s one of the cases we work with most given the volume of enterprise VTEX operations using headless frontends in LATAM.' },
      { q: 'What\'s the price range for this service?', a: 'Being an enterprise service, scope and price are defined after a diagnosis call with your technical and marketing team.' },
    ],
    cta: 'Book an enterprise VTEX diagnosis', ctaSub: '30-minute call with your technical and marketing team.',
  },
};

const GeoParaVtex = ({ lang = 'es' }: Props) => {
  const t = T[lang];
  const path = lang === 'en' ? '/en/geo-for-vtex' : lang === 'pt' ? '/pt/geo-para-vtex' : '/geo-para-vtex';

  useEffect(() => { trackEvent('page_view', { page: 'geo_para_vtex', lang }); }, [lang]);

  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: t.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <>
      <SEO title={t.seoTitle} description={t.seoDesc} path={path} lang={lang} jsonLd={faqLd} />
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-16 md:py-24 relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
            <span className="inline-block px-3 py-1 mb-6 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/30">{t.eyebrow}</span>
            <p className="text-xs text-muted-foreground/70 mb-4 uppercase tracking-wide">
              {lang === 'es' ? 'Actualizado julio 2026' : lang === 'pt' ? 'Atualizado julho 2026' : 'Updated July 2026'}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.h1}</h1>
            <AnswerBlock>{t.answer}</AnswerBlock>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2 mt-4">
              <MessageCircle className="w-5 h-5" /> {t.cta}
            </a>
          </div>
        </section>

        <section className="py-16 md:py-20 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16 text-gold">{t.featuresTitle}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {t.features.map((f, i) => (
                <div key={i} className="glass-card p-6 text-center hover:border-gold/30 transition-all">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                    <f.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2 text-foreground">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-10">{t.faqTitle}</h2>
            <Accordion type="single" collapsible className="w-full">
              {t.faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-20 text-center dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">{t.cta}</h2>
            <p className="text-muted-foreground mb-8">{t.ctaSub}</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> {t.cta}
            </a>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </>
  );
};

export default GeoParaVtex;
