import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { AnswerBlock } from '@/components/ui/answer-block';
import { Calculator } from '@/components/tracking';
import { Check, MessageCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import type { Lang } from '@/lib/pricing';

interface Props { lang?: Lang }

const WHATSAPP_URL = 'https://wa.me/17865787671?text=';

type QId = 'schema' | 'content' | 'offsite' | 'faq' | 'known';

const T: Record<Lang, {
  seoTitle: string; seoDesc: string; h1: string; answer: string;
  questions: { id: QId; label: string }[];
  resultTitle: string;
  tiers: { min: number; label: string; desc: string }[];
  cta: string; ctaSub: string;
}> = {
  es: {
    seoTitle: 'Evaluador de preparación para AI Search | Ferova',
    seoDesc: 'Autoevalúa las bases técnicas, de contenido y autoridad de tu ecommerce para AI Search. Resultado orientativo; no mide menciones reales.',
    h1: '¿Qué tan preparada está tu marca para aparecer en respuestas de IA?',
    answer: 'Responde cinco preguntas para revisar las bases técnicas, de contenido y autoridad que pueden ayudar a que una marca sea comprendida por motores como ChatGPT, Perplexity y Gemini. Es una autoevaluación orientativa: no mide visibilidad, menciones reales ni garantiza apariciones.',
    questions: [
      { id: 'schema', label: '¿Tu web tiene datos estructurados Schema.org (Organization, Product, FAQPage)?' },
      { id: 'content', label: '¿Publicas contenido nuevo (blog, guías) al menos una vez al mes?' },
      { id: 'offsite', label: '¿Tu marca aparece en directorios, prensa o redes sociales fuera de tu propio sitio?' },
      { id: 'faq', label: '¿Tu web tiene una sección de FAQ con preguntas y respuestas directas?' },
      { id: 'known', label: '¿Sabes si ChatGPT o Perplexity mencionan tu marca hoy?' },
    ],
    resultTitle: 'Tu nivel de preparación para AI Search',
    tiers: [
      { min: 0, label: 'Base inicial', desc: 'Hay fundamentos por construir o validar. Este resultado orienta prioridades; no determina si una plataforma de IA conoce o menciona tu marca.' },
      { min: 41, label: 'Preparación en desarrollo', desc: 'Ya existen algunas bases, pero conviene revisar estructura, contenido, señales externas y medición antes de sacar conclusiones sobre visibilidad.' },
      { min: 81, label: 'Buenas bases', desc: 'Las respuestas indican una base favorable. El siguiente paso es medir menciones y brechas frente a competidores con un análisis específico.' },
    ],
    cta: 'Solicitar diagnóstico completo por WhatsApp', ctaSub: 'Enviamos tu resultado y una lectura personalizada.',
  },
  pt: {
    seoTitle: 'Calculadora de Visibilidade IA para E-commerce | Ferova Agency',
    seoDesc: 'Responda 5 perguntas e descubra o quão citável é sua loja online para ChatGPT, Perplexity e Gemini. Grátis, resultado imediato.',
    h1: 'Calculadora de Visibilidade IA',
    answer: 'Responda estas 5 perguntas sobre sua loja online e obtenha uma pontuação estimada de quão preparada sua marca está para ser citada por ChatGPT, Perplexity e Gemini. É uma estimativa rápida, não uma auditoria completa — para isso oferecemos um diagnóstico gratuito pelo WhatsApp.',
    questions: [
      { id: 'schema', label: 'Seu site tem dados estruturados Schema.org (Organization, Product, FAQPage)?' },
      { id: 'content', label: 'Você publica conteúdo novo (blog, guias) pelo menos uma vez por mês?' },
      { id: 'offsite', label: 'Sua marca aparece em diretórios, imprensa ou redes sociais fora do seu site?' },
      { id: 'faq', label: 'Seu site tem uma seção de FAQ com perguntas e respostas diretas?' },
      { id: 'known', label: 'Você sabe se o ChatGPT ou Perplexity mencionam sua marca hoje?' },
    ],
    resultTitle: 'Sua pontuação de visibilidade IA',
    tiers: [
      { min: 0, label: 'Invisível para a IA', desc: 'Os modelos de IA provavelmente ainda não conhecem sua marca. É o ponto de partida mais comum — pode ser resolvido com uma base sólida de GEO.' },
      { min: 41, label: 'Em construção', desc: 'Você tem alguns sinais, mas faltam peças-chave (schema, distribuição multifonte ou conteúdo citável) para a IA te citar consistentemente.' },
      { min: 81, label: 'Citável', desc: 'Sua marca tem bons sinais de citabilidade. O próximo passo é medir menções frente à concorrência e manter o ritmo de publicação.' },
    ],
    cta: 'Solicitar diagnóstico completo pelo WhatsApp', ctaSub: 'Enviamos seu resultado e uma leitura personalizada.',
  },
  en: {
    seoTitle: 'AI Visibility Calculator for E-commerce | Ferova Agency',
    seoDesc: 'Answer 5 questions and find out how citable your online store is for ChatGPT, Perplexity and Gemini. Free, instant result.',
    h1: 'AI Visibility Calculator',
    answer: 'Answer these 5 questions about your online store and get an estimated score of how ready your brand is to be cited by ChatGPT, Perplexity and Gemini. It\'s a quick estimate, not a full audit — for that we offer a free diagnosis over WhatsApp.',
    questions: [
      { id: 'schema', label: 'Does your site have Schema.org structured data (Organization, Product, FAQPage)?' },
      { id: 'content', label: 'Do you publish new content (blog, guides) at least once a month?' },
      { id: 'offsite', label: 'Does your brand appear in directories, press or social media outside your own site?' },
      { id: 'faq', label: 'Does your site have an FAQ section with direct questions and answers?' },
      { id: 'known', label: 'Do you know if ChatGPT or Perplexity mention your brand today?' },
    ],
    resultTitle: 'Your AI visibility score',
    tiers: [
      { min: 0, label: 'Invisible to AI', desc: 'AI models probably don\'t know your brand yet. It\'s the most common starting point — fixable with a solid GEO foundation.' },
      { min: 41, label: 'Under construction', desc: 'You have some signals, but key pieces are missing (schema, multi-source distribution or citable content) for AI to cite you consistently.' },
      { min: 81, label: 'Citable', desc: 'Your brand has good citability signals. The next step is measuring mentions against competitors and sustaining publishing pace.' },
    ],
    cta: 'Request a full diagnosis on WhatsApp', ctaSub: 'We\'ll send your result and a personalized read.',
  },
};

const CalculadoraVisibilidadIA = ({ lang = 'es' }: Props) => {
  const t = T[lang];
  const path = lang === 'en' ? '/en/tools/ai-visibility-calculator' : lang === 'pt' ? '/pt/ferramentas/calculadora-visibilidade-ia' : '/recursos/herramientas/evaluador-preparacion-ai-search';
  const [answers, setAnswers] = useState<Record<QId, boolean>>({ schema: false, content: false, offsite: false, faq: false, known: false });

  useEffect(() => { trackEvent('page_view', { page: 'calculadora_visibilidad_ia', lang }); }, [lang]);

  const score = Object.values(answers).filter(Boolean).length * 20;
  const tier = [...t.tiers].reverse().find((tr) => score >= tr.min) ?? t.tiers[0];

  const toggle = (id: QId) => setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));

  const waMsg = encodeURIComponent(
    lang === 'es' ? `Hola Ferova, hice el evaluador de preparación para AI Search y obtuve ${score}/100 (${tier.label}). Quiero revisar el resultado.`
    : lang === 'pt' ? `Olá Ferova, fiz a Calculadora de Visibilidade IA e obtive ${score}/100 (${tier.label}). Quero o diagnóstico completo.`
    : `Hi Ferova, I took the AI Visibility Calculator and got ${score}/100 (${tier.label}). I want the full diagnosis.`
  );

  return (
    <>
      <SEO title={t.seoTitle} description={t.seoDesc} path={path} lang={lang} />
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-16 md:py-24 relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-2xl">
            <p className="text-xs text-muted-foreground/70 mb-4 uppercase tracking-wide">
              {lang === 'es' ? 'Actualizado julio 2026' : lang === 'pt' ? 'Atualizado julho 2026' : 'Updated July 2026'}
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">{t.h1}</h1>
            <AnswerBlock>{t.answer}</AnswerBlock>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <Calculator calculatorName="ai_visibility_calculator" calculatorTitle={t.h1}>
              <div className="space-y-4 mb-6">
                {t.questions.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => toggle(q.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                      answers[q.id] ? 'border-gold/60 bg-gold/5' : 'border-border/40 hover:border-gold/30'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-md border shrink-0 mt-0.5 flex items-center justify-center ${answers[q.id] ? 'bg-gold border-gold' : 'border-muted-foreground/40'}`}>
                      {answers[q.id] && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                    </span>
                    <span className="text-sm text-foreground">{q.label}</span>
                  </button>
                ))}
              </div>

              <div className="glass-card p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">{t.resultTitle}</p>
                <p className="text-5xl font-display font-bold text-gold mb-2">{score}<span className="text-xl text-muted-foreground">/100</span></p>
                <p className="text-lg font-display font-bold text-foreground mb-2">{tier.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>
              </div>
            </Calculator>

            <div className="text-center mt-8">
              <a href={WHATSAPP_URL + waMsg} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> {t.cta}
              </a>
              <p className="text-xs text-muted-foreground mt-3">{t.ctaSub}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </>
  );
};

export default CalculadoraVisibilidadIA;
