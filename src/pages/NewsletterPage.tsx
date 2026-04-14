import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { AnimatedSection, PageTransition } from '@/components/ui/motion';
import { Check, ArrowRight, MessageCircle, Mail, Star, Shield, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useAnalytics } from '@/hooks/useAnalytics';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const t = {
  es: {
    badge: 'Newsletter semanal · Cada lunes',
    h1: 'La información de SEO e IA que tu ecommerce necesita cada semana',
    sub: 'Más de 500 emprendedores latinoamericanos ya lo reciben. Gratis o Pro, tú decides.',
    ctaFree: 'Suscribirme gratis',
    ctaPro: 'Quiero el Pro · $9 USD',
    freeBadge: 'GRATIS',
    freeTitle: 'Lo esencial, cada semana',
    freeItems: [
      '1 noticia clave de SEO con análisis breve',
      '1 tip accionable para tu ecommerce',
      '1 herramienta gratuita de la semana',
      'Teaser del contenido Pro',
    ],
    namePlaceholder: 'Tu nombre',
    emailPlaceholder: 'Tu email',
    freeBtn: 'Suscribirme gratis',
    noSpam: 'Sin spam · Cancelas cuando quieras',
    proBadge: 'PRO',
    proTitle: 'El análisis que te da ventaja',
    proItems: [
      'Todo lo del plan Gratis',
      'Caso de estudio real con datos',
      'Análisis profundo de cambios de Google',
      'Recurso descargable semanal (plantilla, prompt o checklist)',
      'Respuesta a pregunta de suscriptor',
      'Acceso al archivo completo de ediciones anteriores',
    ],
    proBtn: 'Quiero el Pro',
    proNote: 'Pagas por MercadoPago · Cancelas cuando quieras',
    testimonialsTitle: 'Lo que dicen nuestros suscriptores',
    faqTitle: 'Preguntas frecuentes',
    successToast: '¡Listo! Revisa tu bandeja de entrada.',
    errorToast: 'Hubo un error. Intenta de nuevo.',
    duplicateToast: 'Ya estás suscrito. ¡Gracias!',
    metaTitle: 'Newsletter SEO para Ecommerce — Gratis y Pro',
    metaDesc: 'Newsletter semanal de SEO e IA para ecommerce. Cada lunes en tu bandeja. Gratis o Pro.',
    faqs: [
      { q: '¿Con qué frecuencia se envía?', a: 'Cada lunes por la mañana. Puntual, sin excepciones.' },
      { q: '¿Qué diferencia al Pro del Gratis?', a: 'El plan Pro incluye el análisis profundo, casos de estudio reales con datos, recursos descargables y acceso al archivo completo de todas las ediciones.' },
      { q: '¿Cómo cancelo mi suscripción Pro?', a: 'Escribes por WhatsApp y listo. Sin formularios, sin burocracia.' },
      { q: '¿Puedo leer ediciones anteriores?', a: 'Los suscriptores Pro tienen acceso al archivo completo. Los suscriptores gratis pueden ver el resumen de cada edición.' },
    ],
  },
  en: {
    badge: 'Weekly newsletter · Every Monday',
    h1: 'The SEO and AI information your ecommerce needs every week',
    sub: 'Over 500 Latin American entrepreneurs already receive it. Free or Pro, you decide.',
    ctaFree: 'Subscribe free',
    ctaPro: 'I want Pro · $9 USD',
    freeBadge: 'FREE',
    freeTitle: 'The essentials, every week',
    freeItems: [
      '1 key SEO news with brief analysis',
      '1 actionable tip for your ecommerce',
      '1 free tool of the week',
      'Teaser of Pro content',
    ],
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Your email',
    freeBtn: 'Subscribe free',
    noSpam: 'No spam · Cancel anytime',
    proBadge: 'PRO',
    proTitle: 'The analysis that gives you an edge',
    proItems: [
      'Everything in the Free plan',
      'Real case study with data',
      'Deep analysis of Google changes',
      'Weekly downloadable resource (template, prompt or checklist)',
      'Subscriber question answered',
      'Full access to the archive of past editions',
    ],
    proBtn: 'I want Pro',
    proNote: 'Pay via MercadoPago · Cancel anytime',
    testimonialsTitle: 'What our subscribers say',
    faqTitle: 'Frequently asked questions',
    successToast: 'Done! Check your inbox.',
    errorToast: 'There was an error. Try again.',
    duplicateToast: 'You are already subscribed. Thanks!',
    metaTitle: 'SEO for Ecommerce Newsletter — Free and Pro',
    metaDesc: 'Weekly SEO and AI newsletter for ecommerce. Every Monday in your inbox.',
    faqs: [
      { q: 'How often is it sent?', a: 'Every Monday morning. On time, no exceptions.' },
      { q: "What's the difference between Pro and Free?", a: 'The Pro plan includes deep analysis, real case studies with data, downloadable resources and full access to the archive of all editions.' },
      { q: 'How do I cancel my Pro subscription?', a: 'Just message us on WhatsApp. No forms, no bureaucracy.' },
      { q: 'Can I read past editions?', a: 'Pro subscribers have full archive access. Free subscribers can see a summary of each edition.' },
    ],
  },
  pt: {
    badge: 'Newsletter semanal · Toda segunda-feira',
    h1: 'A informação de SEO e IA que seu ecommerce precisa toda semana',
    sub: 'Mais de 500 empreendedores latino-americanos já recebem. Grátis ou Pro, você decide.',
    ctaFree: 'Assinar grátis',
    ctaPro: 'Quero o Pro · $9 USD',
    freeBadge: 'GRÁTIS',
    freeTitle: 'O essencial, toda semana',
    freeItems: [
      '1 notícia chave de SEO com análise breve',
      '1 dica acionável para seu ecommerce',
      '1 ferramenta gratuita da semana',
      'Teaser do conteúdo Pro',
    ],
    namePlaceholder: 'Seu nome',
    emailPlaceholder: 'Seu email',
    freeBtn: 'Assinar grátis',
    noSpam: 'Sem spam · Cancele quando quiser',
    proBadge: 'PRO',
    proTitle: 'A análise que te dá vantagem',
    proItems: [
      'Tudo do plano Grátis',
      'Caso de estudo real com dados',
      'Análise profunda das mudanças do Google',
      'Recurso semanal para download (template, prompt ou checklist)',
      'Resposta à pergunta de assinante',
      'Acesso ao arquivo completo de edições anteriores',
    ],
    proBtn: 'Quero o Pro',
    proNote: 'Pague por MercadoPago · Cancele quando quiser',
    testimonialsTitle: 'O que dizem nossos assinantes',
    faqTitle: 'Perguntas frequentes',
    successToast: 'Pronto! Verifique sua caixa de entrada.',
    errorToast: 'Houve um erro. Tente novamente.',
    duplicateToast: 'Você já está inscrito. Obrigado!',
    metaTitle: 'Newsletter SEO para Ecommerce — Grátis e Pro',
    metaDesc: 'Newsletter semanal de SEO e IA para ecommerce. Toda segunda na sua caixa.',
    faqs: [
      { q: 'Com que frequência é enviado?', a: 'Toda segunda-feira de manhã. Pontualmente, sem exceções.' },
      { q: 'Qual a diferença entre Pro e Grátis?', a: 'O plano Pro inclui análise profunda, casos de estudo reais com dados, recursos para download e acesso completo ao arquivo de todas as edições.' },
      { q: 'Como cancelo minha assinatura Pro?', a: 'Escreva por WhatsApp e pronto. Sem formulários, sem burocracia.' },
      { q: 'Posso ler edições anteriores?', a: 'Assinantes Pro têm acesso completo ao arquivo. Assinantes grátis podem ver o resumo de cada edição.' },
    ],
  },
};

const testimonials = [
  { text: 'Cada lunes empiezo la semana con el newsletter. El análisis de Google es el mejor que he leído en español.', name: 'Diego R.', role: 'Dueño de tienda de moda, México' },
  { text: 'El caso de estudio de la semana pasada me ayudó a subir mi tráfico orgánico un 40% en 3 semanas.', name: 'Valentina M.', role: 'Ecommerce de cosméticos, Colombia' },
  { text: 'Vale cada peso. La sección de recursos descargables sola ya justifica el Pro.', name: 'Andrés K.', role: 'Agencia de marketing, Argentina' },
];

const NewsletterPage = ({ lang = 'es' }: Props) => {
  const l = t[lang] || t.es;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState<'usd' | 'cop' | 'brl'>('usd');
  const { trackNewsletter, trackCurrencyChange } = useAnalytics();

  useEffect(() => { trackNewsletter('view_plans'); }, []);

  useEffect(() => { document.title = l.metaTitle; }, [l.metaTitle]);
  const proPrices = { usd: '$9/mes', cop: '$5.000/mes', brl: 'R$9/mês' };
  const proWaMsg = {
    usd: 'Hola, quiero suscribirme al newsletter PRO de SEO para Ecommerce. Plan: USD $9/mes',
    cop: 'Hola, quiero suscribirme al newsletter PRO de SEO para Ecommerce. Plan: COP $5.000/mes',
    brl: 'Olá, quero assinar o newsletter PRO de SEO para Ecommerce. Plano: BRL R$9/mês',
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    try {
      // Save to database
      await supabase.from('newsletter_subscribers').upsert(
        { name: name.trim(), email: email.trim().toLowerCase(), plan: 'free', lang, active: true },
        { onConflict: 'email' }
      );

      // Send to Brevo
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email: email.trim(), name: name.trim(), listId: 11 },
      });

      if (error) throw error;

      if (data?.message === 'Ya estás suscrito') {
        toast.info(l.duplicateToast);
      } else {
        toast.success(l.successToast);
        trackNewsletter('subscribe_free', 'gratuito');
        setName(''); setEmail('');
      }
    } catch (err) {
      toast.error(l.errorToast);
    } finally { setLoading(false); }
  };

  const scrollToPlans = () => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <PageTransition>
      {/* SEO meta tags set via useEffect */}
      <Header lang={lang} />

      {/* Hero */}
      <section className="dark-section relative pt-28 pb-20 md:pt-36 md:pb-28" style={{ background: 'linear-gradient(135deg, hsl(243 31% 10%), hsl(243 31% 16%))' }}>
        <div className="grid-pattern absolute inset-0 opacity-40" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <AnimatedSection>
            <span className="inline-block mb-6 px-4 py-2 rounded-full text-sm font-semibold" style={{ background: 'hsla(45,86%,40%,0.15)', color: 'hsl(45 86% 52%)' }}>
              <Mail className="inline h-4 w-4 mr-1 -mt-0.5" />{l.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Outfit', sans-serif", color: 'hsl(0 0% 95%)' }}>{l.h1}</h1>
            <p className="text-lg mb-8" style={{ color: 'hsl(0 0% 70%)' }}>{l.sub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={scrollToPlans} className="btn-outline-gold">{l.ctaFree}</button>
              <button onClick={scrollToPlans} className="btn-gold">{l.ctaPro}</button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <AnimatedSection>
            {/* Currency toggle */}
            <div className="flex justify-center gap-2 mb-12">
              {(['usd', 'cop', 'brl'] as const).map(c => (
                <button key={c} onClick={() => { setCurrency(c); trackCurrencyChange(c); }} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${currency === c ? 'btn-gold' : 'border border-border text-muted-foreground hover:text-foreground'}`}>
                  {c.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Free plan */}
              <div className="glass-card p-8">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 bg-green-500/20 text-green-400">{l.freeBadge}</span>
                <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>{l.freeTitle}</h3>
                <ul className="space-y-3 mb-8">
                  {l.freeItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder={l.namePlaceholder} required className="bg-background" />
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={l.emailPlaceholder} required className="bg-background" />
                  <button type="submit" disabled={loading} onClick={() => trackNewsletter('subscribe_free', 'gratuito')} className="btn-outline-gold w-full">{loading ? '...' : l.freeBtn}</button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-3">{l.noSpam}</p>
              </div>

              {/* Pro plan */}
              <div className="glass-card p-8 gold-glow relative" style={{ borderColor: 'hsl(45 86% 40%)' }}>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 animate-pulse" style={{ background: 'hsla(45,86%,40%,0.2)', color: 'hsl(45 86% 52%)' }}>{l.proBadge}</span>
                <p className="text-2xl font-bold mb-1" style={{ color: 'hsl(45 86% 52%)' }}>{proPrices[currency]}</p>
                <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>{l.proTitle}</h3>
                <ul className="space-y-3 mb-8">
                  {l.proItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Star className="h-5 w-5 shrink-0 mt-0.5" style={{ color: 'hsl(45 86% 52%)' }} />{item}
                    </li>
                  ))}
                </ul>
                <a href={`https://wa.me/17865787671?text=${encodeURIComponent(proWaMsg[currency])}`} target="_blank" rel="noopener noreferrer" onClick={() => trackNewsletter('subscribe_paid', 'pro')} className="btn-gold w-full block text-center">
                  <MessageCircle className="inline h-4 w-4 mr-2 -mt-0.5" />{l.proBtn} — {proPrices[currency]}
                </a>
                <p className="text-xs text-muted-foreground text-center mt-3">{l.proNote}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="dark-section py-20" style={{ background: 'linear-gradient(135deg, hsl(243 31% 12%), hsl(243 31% 8%))' }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ fontFamily: "'Outfit', sans-serif", color: 'hsl(0 0% 95%)' }}>{l.testimonialsTitle}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="glass-card p-6">
                  <p className="text-sm italic mb-4" style={{ color: 'hsl(0 0% 70%)' }}>"{t.text}"</p>
                  <p className="font-semibold text-sm" style={{ color: 'hsl(0 0% 95%)' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: 'hsl(0 0% 50%)' }}>{t.role}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ fontFamily: "'Outfit', sans-serif" }}>{l.faqTitle}</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {l.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6">
                  <AccordionTrigger className="text-sm font-semibold">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      <Footer lang={lang} />
      <ChatWidget />
    </PageTransition>
  );
};

export default NewsletterPage;
