import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { AnswerBlock } from '@/components/ui/answer-block';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Bot, Database, Network, BarChart3, MessageCircle, type LucideIcon } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import type { Lang } from '@/lib/pricing';

interface Props { lang?: Lang }

const WHATSAPP_URL = 'https://wa.link/jvbd4j';

const T: Record<Lang, {
  seoTitle: string; seoDesc: string; h1: string; answer: string;
  pillarsTitle: string; pillars: { icon: LucideIcon; title: string; desc: string }[];
  notTitle: string; not: string[];
  faqTitle: string; faqs: { q: string; a: string }[];
  cta: string; ctaSub: string;
}> = {
  es: {
    seoTitle: '¿Qué es GEO? Generative Engine Optimization explicado | Ferova Agency',
    seoDesc: 'GEO (Generative Engine Optimization) es la optimización de una marca para que la citen ChatGPT, Perplexity, Gemini y Claude. Definición, pilares y diferencias con el SEO.',
    h1: '¿Qué es GEO?',
    answer: 'GEO (Generative Engine Optimization) es la disciplina que optimiza la presencia de una marca en las respuestas generadas por motores de IA como ChatGPT, Perplexity, Gemini y Claude. A diferencia del SEO, que persigue posiciones en una lista de enlaces, el GEO trabaja entidades, datos estructurados y citabilidad para que el modelo mencione tu marca dentro de su respuesta.',
    pillarsTitle: 'Los 4 pilares del GEO',
    pillars: [
      { icon: Bot, title: 'Citabilidad', desc: 'Contenido estructurado en párrafos extraíbles que un LLM puede citar textualmente como fuente.' },
      { icon: Database, title: 'Entidades y schema', desc: 'Marcado Schema.org (Organization, Product, FAQPage) que le dice al modelo quién eres, no solo qué escribes.' },
      { icon: Network, title: 'Distribución multifuente', desc: 'Presencia consistente en Reddit, LinkedIn, directorios y prensa: las fuentes de las que se nutren los LLM.' },
      { icon: BarChart3, title: 'Medición de menciones', desc: 'Tracking de cuántas veces y en qué contexto un modelo de IA menciona tu marca frente a la competencia.' },
    ],
    notTitle: 'GEO no es lo mismo que...',
    not: [
      'GEO no es "geolocalización" ni SEO local (Google Business Profile, mapas). Eso es SEO Local, un servicio distinto.',
      'GEO no reemplaza al SEO tradicional: lo complementa. Buen SEO técnico es la base sobre la que se construye la citabilidad.',
      'GEO no garantiza apariciones en IA: los modelos son probabilísticos. Se trabajan señales, no posiciones fijas.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Quién inventó el término GEO?', a: 'El término "Generative Engine Optimization" aparece formalizado en investigación académica de 2023-2024 sobre cómo optimizar contenido para motores de respuesta generativa, y se popularizó en la industria del marketing digital durante 2024-2025.' },
      { q: '¿GEO reemplaza al SEO?', a: 'No. El SEO sigue siendo la base técnica (velocidad, indexación, arquitectura). El GEO se construye encima: mismas señales de calidad, optimizadas además para citabilidad por IA.' },
      { q: '¿Cómo sé si mi marca ya aparece en respuestas de IA?', a: 'Pregúntale directamente a ChatGPT, Perplexity o Gemini sobre tu categoría de producto sin mencionar tu marca, y observa si aparece. Ferova Agency ofrece un diagnóstico gratuito de esto.' },
      { q: '¿Cuánto tiempo toma ver resultados de GEO?', a: 'Los primeros cambios en citabilidad suelen notarse entre 4-8 semanas, más rápido que el SEO tradicional porque los LLM re-indexan contenido con mayor frecuencia que Google.' },
    ],
    cta: 'Solicitar diagnóstico de GEO', ctaSub: 'Te decimos en qué motores de IA ya apareces y en cuáles no.',
  },
  pt: {
    seoTitle: 'O que é GEO? Generative Engine Optimization explicado | Ferova Agency',
    seoDesc: 'GEO (Generative Engine Optimization) é a otimização de uma marca para ser citada por ChatGPT, Perplexity, Gemini e Claude. Definição, pilares e diferenças com o SEO.',
    h1: 'O que é GEO?',
    answer: 'GEO (Generative Engine Optimization) é a disciplina que otimiza a presença de uma marca nas respostas geradas por motores de IA como ChatGPT, Perplexity, Gemini e Claude. Diferente do SEO, que busca posições numa lista de links, o GEO trabalha entidades, dados estruturados e citabilidade para que o modelo mencione sua marca dentro da resposta.',
    pillarsTitle: 'Os 4 pilares do GEO',
    pillars: [
      { icon: Bot, title: 'Citabilidade', desc: 'Conteúdo estruturado em parágrafos extraíveis que um LLM pode citar textualmente como fonte.' },
      { icon: Database, title: 'Entidades e schema', desc: 'Marcação Schema.org (Organization, Product, FAQPage) que diz ao modelo quem você é, não só o que você escreve.' },
      { icon: Network, title: 'Distribuição multifonte', desc: 'Presença consistente no Reddit, LinkedIn, diretórios e imprensa: as fontes de onde os LLMs se abastecem.' },
      { icon: BarChart3, title: 'Medição de menções', desc: 'Rastreamento de quantas vezes e em que contexto um modelo de IA menciona sua marca frente à concorrência.' },
    ],
    notTitle: 'GEO não é o mesmo que...',
    not: [
      'GEO não é "geolocalização" nem SEO local (Google Business Profile, mapas). Isso é SEO Local, um serviço diferente.',
      'GEO não substitui o SEO tradicional: complementa. Um bom SEO técnico é a base sobre a qual se constrói a citabilidade.',
      'GEO não garante aparições em IA: os modelos são probabilísticos. Trabalhamos sinais, não posições fixas.',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'Quem inventou o termo GEO?', a: 'O termo "Generative Engine Optimization" aparece formalizado em pesquisa acadêmica de 2023-2024 sobre como otimizar conteúdo para motores de resposta generativa, e se popularizou na indústria de marketing digital durante 2024-2025.' },
      { q: 'GEO substitui o SEO?', a: 'Não. O SEO continua sendo a base técnica (velocidade, indexação, arquitetura). O GEO se constrói em cima: mesmos sinais de qualidade, otimizados também para citabilidade por IA.' },
      { q: 'Como sei se minha marca já aparece em respostas de IA?', a: 'Pergunte diretamente ao ChatGPT, Perplexity ou Gemini sobre sua categoria de produto sem mencionar sua marca, e observe se ela aparece. A Ferova Agency oferece um diagnóstico gratuito disso.' },
      { q: 'Quanto tempo leva para ver resultados de GEO?', a: 'As primeiras mudanças em citabilidade costumam ser notadas entre 4-8 semanas, mais rápido que o SEO tradicional porque os LLMs reindexam conteúdo com mais frequência que o Google.' },
    ],
    cta: 'Solicitar diagnóstico de GEO', ctaSub: 'Dizemos em quais motores de IA você já aparece e em quais não.',
  },
  en: {
    seoTitle: 'What is GEO? Generative Engine Optimization explained | Ferova Agency',
    seoDesc: 'GEO (Generative Engine Optimization) is optimizing a brand to be cited by ChatGPT, Perplexity, Gemini and Claude. Definition, pillars and how it differs from SEO.',
    h1: 'What is GEO?',
    answer: 'GEO (Generative Engine Optimization) is the discipline that optimizes a brand\'s presence in the answers generated by AI engines like ChatGPT, Perplexity, Gemini and Claude. Unlike SEO, which chases positions in a list of links, GEO works entities, structured data and citability so the model mentions your brand inside its answer.',
    pillarsTitle: 'The 4 pillars of GEO',
    pillars: [
      { icon: Bot, title: 'Citability', desc: 'Content structured in extractable paragraphs that an LLM can quote verbatim as a source.' },
      { icon: Database, title: 'Entities & schema', desc: 'Schema.org markup (Organization, Product, FAQPage) that tells the model who you are, not just what you write.' },
      { icon: Network, title: 'Multi-source distribution', desc: 'Consistent presence on Reddit, LinkedIn, directories and press: the sources LLMs draw from.' },
      { icon: BarChart3, title: 'Mention tracking', desc: 'Tracking how often and in what context an AI model mentions your brand versus competitors.' },
    ],
    notTitle: 'GEO is not the same as...',
    not: [
      'GEO is not "geolocation" or local SEO (Google Business Profile, maps). That\'s Local SEO, a separate service.',
      'GEO doesn\'t replace traditional SEO: it complements it. Solid technical SEO is the foundation citability is built on.',
      'GEO doesn\'t guarantee AI appearances: models are probabilistic. We work signals, not fixed positions.',
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Who coined the term GEO?', a: 'The term "Generative Engine Optimization" was formalized in 2023-2024 academic research on optimizing content for generative answer engines, and became popular in the digital marketing industry during 2024-2025.' },
      { q: 'Does GEO replace SEO?', a: 'No. SEO remains the technical foundation (speed, indexing, architecture). GEO builds on top: same quality signals, additionally optimized for AI citability.' },
      { q: 'How do I know if my brand already appears in AI answers?', a: 'Ask ChatGPT, Perplexity or Gemini directly about your product category without mentioning your brand, and see if it comes up. Ferova Agency offers a free diagnosis for this.' },
      { q: 'How long does it take to see GEO results?', a: 'First changes in citability are usually noticeable within 4-8 weeks, faster than traditional SEO because LLMs re-index content more frequently than Google.' },
    ],
    cta: 'Request a GEO diagnosis', ctaSub: 'We tell you which AI engines already mention you and which don\'t.',
  },
};

const QueEsGeo = ({ lang = 'es' }: Props) => {
  const t = T[lang];
  const path = lang === 'en' ? '/en/what-is-geo' : lang === 'pt' ? '/pt/o-que-e-geo' : '/que-es-geo';

  useEffect(() => { trackEvent('page_view', { page: 'que_es_geo', lang }); }, [lang]);

  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: t.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  const definedLd = { '@context': 'https://schema.org', '@type': 'DefinedTerm', name: 'GEO (Generative Engine Optimization)', description: t.answer, inDefinedTermSet: 'https://seoparaecommerce.co/que-es-geo' };

  return (
    <>
      <SEO title={t.seoTitle} description={t.seoDesc} path={path} lang={lang} jsonLd={[faqLd, definedLd]} />
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

        <section className="py-16 md:py-20 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16 text-gold">{t.pillarsTitle}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {t.pillars.map((p, i) => (
                <div key={i} className="glass-card p-6 text-center hover:border-gold/30 transition-all">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                    <p.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2 text-foreground">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">{t.notTitle}</h2>
            <ul className="space-y-4">
              {t.not.map((n, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                  <span className="text-gold mt-1">✕</span> {n}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              {lang === 'es' ? 'Relacionado: ' : lang === 'pt' ? 'Relacionado: ' : 'Related: '}
              <Link to={lang === 'en' ? '/en/geo-vs-seo' : lang === 'pt' ? '/pt/geo-vs-seo' : '/geo-vs-seo'} className="text-gold hover:underline">
                {lang === 'es' ? 'GEO vs SEO: tabla comparativa' : lang === 'pt' ? 'GEO vs SEO: tabela comparativa' : 'GEO vs SEO: comparison table'}
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

export default QueEsGeo;
