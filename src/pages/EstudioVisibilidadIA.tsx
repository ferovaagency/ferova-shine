import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { AnswerBlock } from '@/components/ui/answer-block';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, Database, BarChart3, Bot, MessageCircle, type LucideIcon } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import type { Lang } from '@/lib/pricing';

interface Props { lang?: Lang }

const WHATSAPP_URL = 'https://wa.me/17865787671?text=' + encodeURIComponent('Hola Ferova, quiero que mi tienda participe en el Estudio de Visibilidad IA 2026.');

const T: Record<Lang, {
  seoTitle: string; seoDesc: string; eyebrow: string; h1: string; answer: string;
  methodTitle: string; methodSub: string; method: { icon: LucideIcon; title: string; desc: string }[];
  honestyTitle: string; honestyBody: string;
  faqTitle: string; faqs: { q: string; a: string }[];
  cta: string; ctaSub: string;
}> = {
  es: {
    seoTitle: 'Estudio de Visibilidad IA en Ecommerce Hispano 2026 | Ferova Agency',
    seoDesc: 'Ferova Agency mide cuántas tiendas online hispanohablantes son citadas por ChatGPT, Perplexity y Gemini. Metodología abierta y resultados públicos.',
    eyebrow: 'Estudio 2026',
    h1: 'Estudio de Visibilidad IA en Ecommerce Hispano',
    answer: 'Este es un estudio en curso de Ferova Agency que audita cuántas tiendas online hispanohablantes de Colombia, LATAM, Miami y España aparecen citadas cuando se le pregunta a ChatGPT, Perplexity, Gemini y Claude por categorías de producto específicas, sin mencionar la marca. Publicamos la metodología completa y actualizamos los resultados a medida que se cierra cada ronda de medición.',
    methodTitle: 'Metodología',
    methodSub: 'Así medimos, para que cualquiera pueda auditar o replicar el estudio.',
    method: [
      { icon: Search, title: 'Panel de tiendas', desc: 'Muestra de tiendas online hispanohablantes en Colombia, México, LATAM, Miami y España, segmentadas por categoría de producto.' },
      { icon: Bot, title: 'Consultas a 4 LLM', desc: 'Preguntas en lenguaje natural (no branded) a ChatGPT, Perplexity, Gemini y Claude, replicadas mensualmente por categoría.' },
      { icon: Database, title: 'Registro de citaciones', desc: 'Anotamos si la marca aparece, en qué posición de la respuesta, y si cita la URL de la tienda.' },
      { icon: BarChart3, title: 'Resultados públicos', desc: 'Los hallazgos de cada ronda se publican en esta página con fecha, sin editar retroactivamente los datos.' },
    ],
    honestyTitle: 'Por qué publicamos esto',
    honestyBody: 'Todavía estamos cerrando la primera ronda de medición del panel 2026. En lugar de inventar cifras para que esta página se vea más impresionante, preferimos ser transparentes: la metodología ya está definida y activa, y los resultados se publican tan pronto se validan. Si tu tienda quiere ser parte del panel (gratis, sin compromiso comercial), escríbenos.',
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Cuándo se publican los primeros resultados?', a: 'Publicamos resultados por categoría a medida que cada ronda de medición se completa y valida. Esta página se actualiza con cada nueva ronda.' },
      { q: '¿Puedo incluir mi tienda en el panel?', a: 'Sí, sin costo. Escríbenos por WhatsApp con el link de tu tienda y la categoría de producto principal.' },
      { q: '¿Cómo evitan sesgar los resultados hacia sus propios clientes?', a: 'El panel incluye tiendas que no son clientes de Ferova Agency. La metodología y las preguntas usadas se publican junto con los resultados para que cualquiera pueda auditar el proceso.' },
    ],
    cta: 'Sumar mi tienda al estudio', ctaSub: 'Participación gratuita, sin compromiso comercial.',
  },
  pt: {
    seoTitle: 'Estudo de Visibilidade IA no E-commerce Hispânico 2026 | Ferova Agency',
    seoDesc: 'A Ferova Agency mede quantas lojas online hispanofalantes são citadas por ChatGPT, Perplexity e Gemini. Metodologia aberta e resultados públicos.',
    eyebrow: 'Estudo 2026',
    h1: 'Estudo de Visibilidade IA no E-commerce Hispânico',
    answer: 'Este é um estudo em andamento da Ferova Agency que audita quantas lojas online hispanofalantes da Colômbia, LATAM, Miami e Espanha aparecem citadas quando se pergunta ao ChatGPT, Perplexity, Gemini e Claude por categorias de produto específicas, sem mencionar a marca. Publicamos a metodologia completa e atualizamos os resultados conforme cada rodada de medição é fechada.',
    methodTitle: 'Metodologia',
    methodSub: 'É assim que medimos, para que qualquer um possa auditar ou replicar o estudo.',
    method: [
      { icon: Search, title: 'Painel de lojas', desc: 'Amostra de lojas online hispanofalantes na Colômbia, México, LATAM, Miami e Espanha, segmentadas por categoria de produto.' },
      { icon: Bot, title: 'Consultas a 4 LLMs', desc: 'Perguntas em linguagem natural (não branded) ao ChatGPT, Perplexity, Gemini e Claude, replicadas mensalmente por categoria.' },
      { icon: Database, title: 'Registro de citações', desc: 'Anotamos se a marca aparece, em que posição da resposta, e se cita a URL da loja.' },
      { icon: BarChart3, title: 'Resultados públicos', desc: 'Os achados de cada rodada são publicados nesta página com data, sem editar retroativamente os dados.' },
    ],
    honestyTitle: 'Por que publicamos isso',
    honestyBody: 'Ainda estamos fechando a primeira rodada de medição do painel 2026. Em vez de inventar números para esta página parecer mais impressionante, preferimos ser transparentes: a metodologia já está definida e ativa, e os resultados são publicados assim que validados. Se sua loja quiser fazer parte do painel (grátis, sem compromisso comercial), fale conosco.',
    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'Quando os primeiros resultados são publicados?', a: 'Publicamos resultados por categoria conforme cada rodada de medição é concluída e validada. Esta página é atualizada a cada nova rodada.' },
      { q: 'Posso incluir minha loja no painel?', a: 'Sim, sem custo. Fale conosco pelo WhatsApp com o link da sua loja e a categoria de produto principal.' },
      { q: 'Como vocês evitam enviesar os resultados para seus próprios clientes?', a: 'O painel inclui lojas que não são clientes da Ferova Agency. A metodologia e as perguntas usadas são publicadas junto com os resultados para que qualquer um possa auditar o processo.' },
    ],
    cta: 'Somar minha loja ao estudo', ctaSub: 'Participação gratuita, sem compromisso comercial.',
  },
  en: {
    seoTitle: 'AI Visibility Study of Spanish-Speaking E-commerce 2026 | Ferova Agency',
    seoDesc: 'Ferova Agency measures how many Spanish-speaking online stores get cited by ChatGPT, Perplexity and Gemini. Open methodology, public results.',
    eyebrow: '2026 Study',
    h1: 'AI Visibility Study of Spanish-Speaking E-commerce',
    answer: 'This is an ongoing Ferova Agency study auditing how many Spanish-speaking online stores from Colombia, LATAM, Miami and Spain get cited when ChatGPT, Perplexity, Gemini and Claude are asked about specific product categories, without naming the brand. We publish the full methodology and update results as each measurement round closes.',
    methodTitle: 'Methodology',
    methodSub: 'How we measure, so anyone can audit or replicate the study.',
    method: [
      { icon: Search, title: 'Store panel', desc: 'Sample of Spanish-speaking online stores in Colombia, Mexico, LATAM, Miami and Spain, segmented by product category.' },
      { icon: Bot, title: 'Queries to 4 LLMs', desc: 'Natural-language, non-branded questions to ChatGPT, Perplexity, Gemini and Claude, replicated monthly per category.' },
      { icon: Database, title: 'Citation logging', desc: 'We log whether the brand appears, at what position in the answer, and whether the store URL is cited.' },
      { icon: BarChart3, title: 'Public results', desc: 'Findings from each round are published on this page with a date, without retroactively editing the data.' },
    ],
    honestyTitle: 'Why we\'re publishing this',
    honestyBody: 'We\'re still closing the first measurement round of the 2026 panel. Rather than inventing numbers to make this page look more impressive, we\'d rather be transparent: the methodology is already defined and active, and results are published as soon as they\'re validated. If your store wants to join the panel (free, no commercial commitment), message us.',
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'When are the first results published?', a: 'We publish results by category as each measurement round is completed and validated. This page is updated with every new round.' },
      { q: 'Can I include my store in the panel?', a: 'Yes, at no cost. Message us on WhatsApp with your store link and main product category.' },
      { q: 'How do you avoid biasing results toward your own clients?', a: 'The panel includes stores that are not Ferova Agency clients. The methodology and questions used are published alongside the results so anyone can audit the process.' },
    ],
    cta: 'Add my store to the study', ctaSub: 'Free participation, no commercial commitment.',
  },
};

const EstudioVisibilidadIA = ({ lang = 'es' }: Props) => {
  const t = T[lang];
  const path = lang === 'en' ? '/en/ai-visibility-study-hispanic-ecommerce-2026' : lang === 'pt' ? '/pt/estudo-visibilidade-ia-ecommerce-hispano-2026' : '/estudio-visibilidad-ia-ecommerce-hispano-2026';

  useEffect(() => { trackEvent('page_view', { page: 'estudio_visibilidad_ia', lang }); }, [lang]);

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
          </div>
        </section>

        <section className="py-16 md:py-20 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3 text-gold">{t.methodTitle}</h2>
            <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">{t.methodSub}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {t.method.map((m, i) => (
                <div key={i} className="glass-card p-6 text-center hover:border-gold/30 transition-all">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                    <m.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2 text-foreground">{m.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">{t.honestyTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.honestyBody}</p>
          </div>
        </section>

        <section className="py-16 md:py-24 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-10 text-gold">{t.faqTitle}</h2>
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

        <section className="py-20 text-center">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.cta}</h2>
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

export default EstudioVisibilidadIA;
