import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { AnswerBlock } from '@/components/ui/answer-block';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Bot, Database, Wrench, Tag, MessageCircle, type LucideIcon } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import type { Lang } from '@/lib/pricing';

interface Props { lang?: Lang }

const WHATSAPP_URL = 'https://wa.me/17865787671?text=' + encodeURIComponent('Hola Ferova, tengo una tienda WooCommerce y quiero GEO.');

const T: Record<Lang, {
  seoTitle: string; seoDesc: string; eyebrow: string; h1: string; answer: string;
  featuresTitle: string; features: { icon: LucideIcon; title: string; desc: string }[];
  faqTitle: string; faqs: { q: string; a: string }[];
  cta: string; ctaSub: string;
}> = {
  es: {
    seoTitle: 'GEO para WooCommerce: que la IA cite tu tienda WordPress | Ferova Agency',
    seoDesc: 'Optimización GEO específica para tiendas WooCommerce/WordPress: schema sin conflictos de plugins, feeds y contenido citable por IA.',
    eyebrow: 'GEO para WooCommerce',
    h1: 'GEO para tiendas WooCommerce',
    answer: 'WooCommerce corre sobre WordPress, donde los plugins de SEO (Yoast, RankMath) suelen generar Schema.org duplicado o conflictivo con el tema. Ferova Agency limpia y consolida el marcado estructurado de tu tienda WooCommerce, asegurando un único JSON-LD válido por producto, para que ChatGPT, Perplexity y Gemini lean una fuente de verdad clara, no señales contradictorias.',
    featuresTitle: 'Qué hacemos en tu tienda WooCommerce',
    features: [
      { icon: Wrench, title: 'Auditoría de plugins', desc: 'Detectamos y resolvemos conflictos de Schema.org entre tu tema, WooCommerce y plugins de SEO instalados.' },
      { icon: Database, title: 'Product + Offer consolidado', desc: 'Un único JSON-LD limpio por ficha de producto, sin duplicados ni datos desactualizados.' },
      { icon: Bot, title: 'Contenido citable', desc: 'Reescribimos descripciones de producto y categoría en formato extraíble para LLM.' },
      { icon: Tag, title: 'Feed de producto', desc: 'Configuramos o corregimos tu feed WooCommerce (Google Shopping / Meta Catalog) como fuente adicional para IA.' },
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Necesito desinstalar mi plugin de SEO actual?', a: 'No. Trabajamos con Yoast, RankMath o el que tengas, ajustando su configuración para evitar Schema duplicado en lugar de reemplazarlo.' },
      { q: '¿WooCommerce es peor que Shopify para GEO?', a: 'No es peor, pero requiere más limpieza técnica porque el ecosistema de plugins de WordPress genera más ruido en el marcado estructurado por defecto.' },
      { q: '¿Cuánto cuesta el GEO para una tienda WooCommerce?', a: 'Depende del número de plugins activos y el tamaño del catálogo. Escríbenos por WhatsApp con el link de tu tienda y te enviamos una cotización personalizada en menos de 24 horas.' },
    ],
    cta: 'Cotizar GEO para mi tienda WooCommerce', ctaSub: 'Auditoría inicial gratuita de plugins y schema actual.',
  },
  pt: {
    seoTitle: 'GEO para WooCommerce: faça a IA citar sua loja WordPress | Ferova Agency',
    seoDesc: 'Otimização GEO específica para lojas WooCommerce/WordPress: schema sem conflitos de plugins, feeds e conteúdo citável por IA.',
    eyebrow: 'GEO para WooCommerce',
    h1: 'GEO para lojas WooCommerce',
    answer: 'O WooCommerce roda sobre o WordPress, onde plugins de SEO (Yoast, RankMath) costumam gerar Schema.org duplicado ou conflitante com o tema. A Ferova Agency limpa e consolida a marcação estruturada da sua loja WooCommerce, garantindo um único JSON-LD válido por produto, para que ChatGPT, Perplexity e Gemini leiam uma fonte de verdade clara, não sinais contraditórios.',
    featuresTitle: 'O que fazemos na sua loja WooCommerce',
    features: [
      { icon: Wrench, title: 'Auditoria de plugins', desc: 'Detectamos e resolvemos conflitos de Schema.org entre seu tema, WooCommerce e plugins de SEO instalados.' },
      { icon: Database, title: 'Product + Offer consolidado', desc: 'Um único JSON-LD limpo por ficha de produto, sem duplicatas nem dados desatualizados.' },
      { icon: Bot, title: 'Conteúdo citável', desc: 'Reescrevemos descrições de produto e categoria em formato extraível para LLMs.' },
      { icon: Tag, title: 'Feed de produto', desc: 'Configuramos ou corrigimos seu feed WooCommerce (Google Shopping / Meta Catalog) como fonte adicional para IA.' },
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'Preciso desinstalar meu plugin de SEO atual?', a: 'Não. Trabalhamos com Yoast, RankMath ou o que você tiver, ajustando a configuração para evitar Schema duplicado em vez de substituí-lo.' },
      { q: 'O WooCommerce é pior que o Shopify para GEO?', a: 'Não é pior, mas exige mais limpeza técnica porque o ecossistema de plugins do WordPress gera mais ruído na marcação estruturada por padrão.' },
      { q: 'Quanto custa o GEO para uma loja WooCommerce?', a: 'Depende do número de plugins ativos e do tamanho do catálogo. Fale conosco pelo WhatsApp com o link da sua loja e enviamos uma cotação personalizada em menos de 24 horas.' },
    ],
    cta: 'Cotar GEO para minha loja WooCommerce', ctaSub: 'Auditoria inicial gratuita de plugins e schema atual.',
  },
  en: {
    seoTitle: 'GEO for WooCommerce: get AI to cite your WordPress store | Ferova Agency',
    seoDesc: 'GEO optimization specific to WooCommerce/WordPress stores: conflict-free schema, feeds and AI-citable content.',
    eyebrow: 'GEO for WooCommerce',
    h1: 'GEO for WooCommerce stores',
    answer: 'WooCommerce runs on WordPress, where SEO plugins (Yoast, RankMath) often generate duplicate or conflicting Schema.org markup with the theme. Ferova Agency cleans up and consolidates your WooCommerce store\'s structured markup, ensuring a single valid JSON-LD per product, so ChatGPT, Perplexity and Gemini read one clear source of truth instead of contradictory signals.',
    featuresTitle: 'What we do on your WooCommerce store',
    features: [
      { icon: Wrench, title: 'Plugin audit', desc: 'We detect and resolve Schema.org conflicts between your theme, WooCommerce and installed SEO plugins.' },
      { icon: Database, title: 'Consolidated Product + Offer', desc: 'A single clean JSON-LD per product page, with no duplicates or stale data.' },
      { icon: Bot, title: 'Citable content', desc: 'We rewrite product and category descriptions in extractable format for LLMs.' },
      { icon: Tag, title: 'Product feed', desc: 'We set up or fix your WooCommerce feed (Google Shopping / Meta Catalog) as an additional source for AI.' },
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Do I need to uninstall my current SEO plugin?', a: 'No. We work with Yoast, RankMath or whatever you have, adjusting its configuration to avoid duplicate schema rather than replacing it.' },
      { q: 'Is WooCommerce worse than Shopify for GEO?', a: 'It\'s not worse, but it requires more technical cleanup because WordPress\'s plugin ecosystem generates more noise in default structured markup.' },
      { q: 'How much does GEO cost for a WooCommerce store?', a: 'It depends on the number of active plugins and catalog size. Message us on WhatsApp with your store link and we\'ll send a custom quote within 24 hours.' },
    ],
    cta: 'Get a quote for my WooCommerce store', ctaSub: 'Free initial audit of plugins and current schema.',
  },
};

const GeoParaWooCommerce = ({ lang = 'es' }: Props) => {
  const t = T[lang];
  const path = lang === 'en' ? '/en/geo-for-woocommerce' : lang === 'pt' ? '/pt/geo-para-woocommerce' : '/geo-para-woocommerce';

  useEffect(() => { trackEvent('page_view', { page: 'geo_para_woocommerce', lang }); }, [lang]);

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

export default GeoParaWooCommerce;
