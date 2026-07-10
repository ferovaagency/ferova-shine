import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { AnswerBlock } from '@/components/ui/answer-block';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, MessageCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import type { Lang } from '@/lib/pricing';

interface Props { lang?: Lang }

const WHATSAPP_URL = 'https://wa.link/jvbd4j';

const T: Record<Lang, {
  seoTitle: string; seoDesc: string; h1: string; answer: string;
  tableTitle: string; cols: string[]; rows: { label: string; seo: string; geo: string }[];
  faqTitle: string; faqs: { q: string; a: string }[];
  cta: string; ctaSub: string;
}> = {
  es: {
    seoTitle: 'GEO vs SEO: diferencias, tabla comparativa | Ferova Agency',
    seoDesc: 'GEO y SEO no son lo mismo. Compara objetivo, canal, señales y métricas de cada disciplina para saber cuál necesita tu ecommerce.',
    h1: 'GEO vs SEO: ¿en qué se diferencian?',
    answer: 'El SEO posiciona tu sitio en la lista de resultados de Google mediante keywords, backlinks y velocidad técnica. El GEO optimiza para que motores de IA como ChatGPT, Perplexity y Gemini citen tu marca dentro de su respuesta, trabajando entidades, datos estructurados y citabilidad semántica. No son excluyentes: el GEO se construye sobre una base sólida de SEO técnico.',
    tableTitle: 'Tabla comparativa',
    cols: ['Dimensión', 'SEO', 'GEO'],
    rows: [
      { label: 'Objetivo', seo: 'Posición en el ranking de resultados (SERP)', geo: 'Ser citado dentro de la respuesta generada por la IA' },
      { label: 'Canal', seo: 'Google, Bing', geo: 'ChatGPT, Perplexity, Gemini, Claude, AI Overviews' },
      { label: 'Señal principal', seo: 'Keywords, backlinks, autoridad de dominio', geo: 'Entidades, Schema.org, citabilidad, autoridad semántica' },
      { label: 'Formato de contenido', seo: 'Artículos largos optimizados por keyword', geo: 'Párrafos extraíbles con respuestas directas (40-60 palabras)' },
      { label: 'Métrica de éxito', seo: 'Posición, tráfico orgánico, CTR', geo: 'Frecuencia de mención en respuestas de IA, share of voice' },
      { label: 'Velocidad de cambio', seo: 'Re-indexación en semanas', geo: 'Re-entrenamiento/RAG en días' },
      { label: 'Datos estructurados', seo: 'Opcional, mejora rich snippets', geo: 'Crítico: es la principal señal de identidad de marca' },
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Necesito hacer GEO si ya hago SEO?', a: 'Si tu comprador investiga con IA antes de comprar (cada vez más frecuente en ecommerce), sí. El SEO te hace visible en Google; el GEO te hace citable en la conversación con IA que precede a la compra.' },
      { q: '¿El GEO usa las mismas keywords que el SEO?', a: 'No exactamente. El GEO prioriza preguntas en lenguaje natural (cómo las hace un usuario a ChatGPT) sobre keywords cortas de intención de búsqueda tradicional.' },
      { q: '¿Puedo hacer GEO sin haber hecho SEO antes?', a: 'Es posible pero menos eficiente. El SEO técnico (velocidad, indexación, arquitectura) es la base que le permite a los LLM rastrear e interpretar tu contenido en primer lugar.' },
    ],
    cta: 'Solicitar diagnóstico SEO + GEO', ctaSub: 'Auditamos ambas disciplinas en un solo diagnóstico gratuito.',
  },
  pt: {
    seoTitle: 'GEO vs SEO: diferenças, tabela comparativa | Ferova Agency',
    seoDesc: 'GEO e SEO não são a mesma coisa. Compare objetivo, canal, sinais e métricas de cada disciplina para saber qual seu e-commerce precisa.',
    h1: 'GEO vs SEO: qual a diferença?',
    answer: 'O SEO posiciona seu site na lista de resultados do Google via palavras-chave, backlinks e velocidade técnica. O GEO otimiza para que motores de IA como ChatGPT, Perplexity e Gemini citem sua marca dentro da resposta, trabalhando entidades, dados estruturados e citabilidade semântica. Não são excludentes: o GEO se constrói sobre uma base sólida de SEO técnico.',
    tableTitle: 'Tabela comparativa',
    cols: ['Dimensão', 'SEO', 'GEO'],
    rows: [
      { label: 'Objetivo', seo: 'Posição no ranking de resultados (SERP)', geo: 'Ser citado dentro da resposta gerada pela IA' },
      { label: 'Canal', seo: 'Google, Bing', geo: 'ChatGPT, Perplexity, Gemini, Claude, AI Overviews' },
      { label: 'Sinal principal', seo: 'Palavras-chave, backlinks, autoridade de domínio', geo: 'Entidades, Schema.org, citabilidade, autoridade semântica' },
      { label: 'Formato de conteúdo', seo: 'Artigos longos otimizados por palavra-chave', geo: 'Parágrafos extraíveis com respostas diretas (40-60 palavras)' },
      { label: 'Métrica de sucesso', seo: 'Posição, tráfego orgânico, CTR', geo: 'Frequência de menção em respostas de IA, share of voice' },
      { label: 'Velocidade de mudança', seo: 'Reindexação em semanas', geo: 'Retreinamento/RAG em dias' },
      { label: 'Dados estruturados', seo: 'Opcional, melhora rich snippets', geo: 'Crítico: é o principal sinal de identidade de marca' },
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'Preciso fazer GEO se já faço SEO?', a: 'Se seu comprador pesquisa com IA antes de comprar (cada vez mais comum em e-commerce), sim. O SEO te torna visível no Google; o GEO te torna citável na conversa com IA que precede a compra.' },
      { q: 'O GEO usa as mesmas palavras-chave que o SEO?', a: 'Não exatamente. O GEO prioriza perguntas em linguagem natural (como um usuário faz ao ChatGPT) em vez de palavras-chave curtas de intenção de busca tradicional.' },
      { q: 'Posso fazer GEO sem ter feito SEO antes?', a: 'É possível, mas menos eficiente. O SEO técnico (velocidade, indexação, arquitetura) é a base que permite aos LLMs rastrear e interpretar seu conteúdo em primeiro lugar.' },
    ],
    cta: 'Solicitar diagnóstico SEO + GEO', ctaSub: 'Auditamos as duas disciplinas em um único diagnóstico gratuito.',
  },
  en: {
    seoTitle: 'GEO vs SEO: differences, comparison table | Ferova Agency',
    seoDesc: 'GEO and SEO are not the same. Compare goal, channel, signals and metrics for each discipline to know which your e-commerce needs.',
    h1: 'GEO vs SEO: what\'s the difference?',
    answer: 'SEO ranks your site in Google\'s results list through keywords, backlinks and technical speed. GEO optimizes so AI engines like ChatGPT, Perplexity and Gemini cite your brand inside their answer, working entities, structured data and semantic citability. They\'re not mutually exclusive: GEO is built on a solid technical SEO foundation.',
    tableTitle: 'Comparison table',
    cols: ['Dimension', 'SEO', 'GEO'],
    rows: [
      { label: 'Goal', seo: 'Position in the results ranking (SERP)', geo: 'Being cited inside the AI-generated answer' },
      { label: 'Channel', seo: 'Google, Bing', geo: 'ChatGPT, Perplexity, Gemini, Claude, AI Overviews' },
      { label: 'Main signal', seo: 'Keywords, backlinks, domain authority', geo: 'Entities, Schema.org, citability, semantic authority' },
      { label: 'Content format', seo: 'Long articles optimized by keyword', geo: 'Extractable paragraphs with direct answers (40-60 words)' },
      { label: 'Success metric', seo: 'Ranking position, organic traffic, CTR', geo: 'Frequency of mention in AI answers, share of voice' },
      { label: 'Speed of change', seo: 'Re-indexing in weeks', geo: 'Retraining/RAG in days' },
      { label: 'Structured data', seo: 'Optional, improves rich snippets', geo: 'Critical: it\'s the main brand identity signal' },
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Do I need GEO if I already do SEO?', a: 'If your buyer researches with AI before purchasing (increasingly common in e-commerce), yes. SEO makes you visible on Google; GEO makes you citable in the AI conversation that precedes the purchase.' },
      { q: 'Does GEO use the same keywords as SEO?', a: 'Not exactly. GEO prioritizes natural-language questions (how a user asks ChatGPT) over short traditional search-intent keywords.' },
      { q: 'Can I do GEO without having done SEO first?', a: 'It\'s possible but less efficient. Technical SEO (speed, indexing, architecture) is the foundation that lets LLMs crawl and interpret your content in the first place.' },
    ],
    cta: 'Request a SEO + GEO diagnosis', ctaSub: 'We audit both disciplines in a single free diagnosis.',
  },
};

const GeoVsSeo = ({ lang = 'es' }: Props) => {
  const t = T[lang];
  const path = lang === 'en' ? '/en/geo-vs-seo' : lang === 'pt' ? '/pt/geo-vs-seo' : '/geo-vs-seo';

  useEffect(() => { trackEvent('page_view', { page: 'geo_vs_seo', lang }); }, [lang]);

  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: t.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <>
      <SEO title={t.seoTitle} description={t.seoDesc} path={path} lang={lang} jsonLd={faqLd} />
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-16 md:py-24 relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
            <p className="text-xs text-muted-foreground/70 mb-4 uppercase tracking-wide">
              {lang === 'es' ? 'Actualizado julio 2026' : lang === 'pt' ? 'Atualizado julho 2026' : 'Updated July 2026'}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.h1}</h1>
            <AnswerBlock>{t.answer}</AnswerBlock>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-10">{t.tableTitle}</h2>
            <div className="overflow-x-auto glass-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40">
                    {t.cols.map((c, i) => (
                      <th key={i} className={`text-left p-4 font-display font-bold ${i === 2 ? 'text-gold' : 'text-foreground'}`}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((r, i) => (
                    <tr key={i} className="border-b border-border/20 last:border-0">
                      <td className="p-4 font-semibold text-foreground align-top">{r.label}</td>
                      <td className="p-4 text-muted-foreground align-top">{r.seo}</td>
                      <td className="p-4 text-foreground align-top">
                        <span className="inline-flex items-start gap-1.5">
                          <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" /> {r.geo}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm text-muted-foreground text-center">
              {lang === 'es' ? '¿Nuevo en el tema? Empieza por ' : lang === 'pt' ? 'Novo no assunto? Comece por ' : 'New to the topic? Start with '}
              <Link to={lang === 'en' ? '/en/what-is-geo' : lang === 'pt' ? '/pt/o-que-e-geo' : '/que-es-geo'} className="text-gold hover:underline">
                {lang === 'es' ? '¿Qué es GEO?' : lang === 'pt' ? 'O que é GEO?' : 'What is GEO?'}
              </Link>
            </p>
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

export default GeoVsSeo;
