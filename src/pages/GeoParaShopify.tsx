import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { AnswerBlock } from '@/components/ui/answer-block';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Bot, Database, ShoppingBag, Tag, MessageCircle, type LucideIcon } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import type { Lang } from '@/lib/pricing';

interface Props { lang?: Lang }

const WHATSAPP_URL = 'https://wa.link/jvbd4j?text=' + encodeURIComponent('Hola Ferova, tengo una tienda Shopify y quiero GEO.');

const T: Record<Lang, {
  seoTitle: string; seoDesc: string; eyebrow: string; h1: string; answer: string;
  featuresTitle: string; features: { icon: LucideIcon; title: string; desc: string }[];
  faqTitle: string; faqs: { q: string; a: string }[];
  cta: string; ctaSub: string;
}> = {
  es: {
    seoTitle: 'GEO para Shopify: que ChatGPT recomiende tu tienda | Ferova Agency',
    seoDesc: 'Optimización GEO específica para tiendas Shopify: metafields, Schema Product/Offer y feeds estructurados para que los LLM citen tu catálogo.',
    eyebrow: 'GEO para Shopify',
    h1: 'GEO para tiendas Shopify',
    answer: 'Shopify expone tu catálogo con metafields y una API que facilita el marcado Schema.org de productos — pero por defecto no está optimizado para que un LLM lo cite. Ferova Agency configura tus metafields, feeds de producto y datos estructurados de Shopify para que ChatGPT, Perplexity y Gemini puedan recomendar tus productos específicos, no solo tu categoría genérica.',
    featuresTitle: 'Qué hacemos en tu tienda Shopify',
    features: [
      { icon: Database, title: 'Schema Product + Offer', desc: 'Marcado estructurado de cada ficha de producto vía metafields y theme.liquid, con precio, disponibilidad y reviews.' },
      { icon: ShoppingBag, title: 'Feed de catálogo optimizado', desc: 'Ajustamos tu feed de Shopify (usado por Google Shopping) para que también sirva como fuente de datos para LLM.' },
      { icon: Bot, title: 'Descripciones citables', desc: 'Reescribimos descripciones de producto en formato extraíble: respuesta directa antes del storytelling de marca.' },
      { icon: Tag, title: 'Reviews estructuradas', desc: 'Marcado de AggregateRating y Review para que la IA pueda citar tu reputación, no solo tu catálogo.' },
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Necesito una app de Shopify para hacer GEO?', a: 'No necesariamente. La mayoría del trabajo se hace vía metafields nativos y ajustes al theme. En catálogos grandes recomendamos apps de feed management para automatizar la sincronización.' },
      { q: '¿Funciona con temas personalizados de Shopify?', a: 'Sí. Trabajamos sobre cualquier tema (Dawn, temas de terceros o custom) inyectando el JSON-LD necesario sin romper el diseño.' },
      { q: '¿Cuánto cuesta el GEO para una tienda Shopify?', a: 'Depende del tamaño del catálogo. Escríbenos por WhatsApp con el link de tu tienda y te enviamos una cotización personalizada en menos de 24 horas.' },
    ],
    cta: 'Cotizar GEO para mi tienda Shopify', ctaSub: 'Auditoría inicial gratuita de tu catálogo y schema actual.',
  },
  pt: {
    seoTitle: 'GEO para Shopify: faça o ChatGPT recomendar sua loja | Ferova Agency',
    seoDesc: 'Otimização GEO específica para lojas Shopify: metafields, Schema Product/Offer e feeds estruturados para que os LLMs citem seu catálogo.',
    eyebrow: 'GEO para Shopify',
    h1: 'GEO para lojas Shopify',
    answer: 'O Shopify expõe seu catálogo com metafields e uma API que facilita a marcação Schema.org de produtos — mas por padrão não está otimizado para que um LLM o cite. A Ferova Agency configura seus metafields, feeds de produto e dados estruturados do Shopify para que ChatGPT, Perplexity e Gemini possam recomendar seus produtos específicos, não só sua categoria genérica.',
    featuresTitle: 'O que fazemos na sua loja Shopify',
    features: [
      { icon: Database, title: 'Schema Product + Offer', desc: 'Marcação estruturada de cada ficha de produto via metafields e theme.liquid, com preço, disponibilidade e reviews.' },
      { icon: ShoppingBag, title: 'Feed de catálogo otimizado', desc: 'Ajustamos seu feed do Shopify (usado pelo Google Shopping) para que também sirva como fonte de dados para LLMs.' },
      { icon: Bot, title: 'Descrições citáveis', desc: 'Reescrevemos descrições de produto em formato extraível: resposta direta antes do storytelling da marca.' },
      { icon: Tag, title: 'Reviews estruturadas', desc: 'Marcação de AggregateRating e Review para que a IA possa citar sua reputação, não só seu catálogo.' },
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'Preciso de um app do Shopify para fazer GEO?', a: 'Não necessariamente. A maior parte do trabalho é feita via metafields nativos e ajustes no theme. Em catálogos grandes recomendamos apps de feed management para automatizar a sincronização.' },
      { q: 'Funciona com temas personalizados do Shopify?', a: 'Sim. Trabalhamos em qualquer tema (Dawn, temas de terceiros ou custom) injetando o JSON-LD necessário sem quebrar o design.' },
      { q: 'Quanto custa o GEO para uma loja Shopify?', a: 'Depende do tamanho do catálogo. Fale conosco pelo WhatsApp com o link da sua loja e enviamos uma cotação personalizada em menos de 24 horas.' },
    ],
    cta: 'Cotar GEO para minha loja Shopify', ctaSub: 'Auditoria inicial gratuita do seu catálogo e schema atual.',
  },
  en: {
    seoTitle: 'GEO for Shopify: get ChatGPT to recommend your store | Ferova Agency',
    seoDesc: 'GEO optimization specific to Shopify stores: metafields, Product/Offer Schema and structured feeds so LLMs cite your catalog.',
    eyebrow: 'GEO for Shopify',
    h1: 'GEO for Shopify stores',
    answer: 'Shopify exposes your catalog through metafields and an API that makes Schema.org product markup easy — but it\'s not optimized by default for LLM citation. Ferova Agency configures your Shopify metafields, product feeds and structured data so ChatGPT, Perplexity and Gemini can recommend your specific products, not just your generic category.',
    featuresTitle: 'What we do on your Shopify store',
    features: [
      { icon: Database, title: 'Product + Offer schema', desc: 'Structured markup for every product page via metafields and theme.liquid, with price, availability and reviews.' },
      { icon: ShoppingBag, title: 'Optimized catalog feed', desc: 'We tune your Shopify feed (used by Google Shopping) so it also serves as a data source for LLMs.' },
      { icon: Bot, title: 'Citable descriptions', desc: 'We rewrite product descriptions in extractable format: direct answer before brand storytelling.' },
      { icon: Tag, title: 'Structured reviews', desc: 'AggregateRating and Review markup so AI can cite your reputation, not just your catalog.' },
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Do I need a Shopify app to do GEO?', a: 'Not necessarily. Most of the work happens via native metafields and theme adjustments. For large catalogs we recommend feed management apps to automate syncing.' },
      { q: 'Does it work with custom Shopify themes?', a: 'Yes. We work on any theme (Dawn, third-party or custom) injecting the necessary JSON-LD without breaking the design.' },
      { q: 'How much does GEO cost for a Shopify store?', a: 'It depends on catalog size. Message us on WhatsApp with your store link and we\'ll send a custom quote within 24 hours.' },
    ],
    cta: 'Get a quote for my Shopify store', ctaSub: 'Free initial audit of your catalog and current schema.',
  },
};

const GeoParaShopify = ({ lang = 'es' }: Props) => {
  const t = T[lang];
  const path = lang === 'en' ? '/en/geo-for-shopify' : lang === 'pt' ? '/pt/geo-para-shopify' : '/geo-para-shopify';

  useEffect(() => { trackEvent('page_view', { page: 'geo_para_shopify', lang }); }, [lang]);

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

export default GeoParaShopify;
