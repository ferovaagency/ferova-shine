import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import AdBanner from '@/components/ui/ad-banner';
import { useState } from 'react';
import { getPaymentLink } from '@/lib/payment-links';
import { useToast } from '@/hooks/use-toast';
import {
  MessageCircle, Check, X, Clock, Zap, Shield,
  Plus, ArrowRight, Star, Smartphone
} from 'lucide-react';

interface Props { lang?: 'es' | 'en'; }

const OptimizacionWhatsapp = ({ lang = 'es' }: Props) => {
  const [currency, setCurrency] = useState<'usd' | 'cop'>('usd');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { toast } = useToast();

  const handleCta = (key: 'whatsapp1' | 'whatsapp10' | 'whatsapp20') => {
    const link = getPaymentLink(key, currency);
    window.open(link, '_blank', 'noopener,noreferrer');
    toast({
      title: lang === 'es' ? '¡Confirmado!' : 'Confirmed!',
      description: lang === 'es'
        ? 'Te contactaremos en menos de 24h hábiles para iniciar.'
        : "We'll contact you within 24 business hours to get started.",
    });
  };

  const formatPrice = (usd: number, cop: number) => {
    if (currency === 'cop')
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(cop);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usd);
  };

  const t = lang === 'es' ? {
    badge: 'WhatsApp Business Profesional',
    title: 'Optimización de WhatsApp Business',
    sub: 'Convierte tu WhatsApp en una vitrina profesional. Perfil completo, catálogo optimizado y configuraciones que generan confianza y aumentan tus ventas desde el primer mensaje.',
    trustBadges: [
      { icon: Clock, text: 'Entrega en 24-96 hrs hábiles' },
      { icon: Shield, text: 'Resultado garantizado' },
      { icon: Zap, text: 'Proceso 100% remoto' },
    ],
    pricingTitle: 'Elige tu plan',
    pricingNote: 'Pago único. Sin mensualidades. Tu WhatsApp optimizado de por vida.',
    noInclude: 'No incluye:',
    plans: [
      {
        key: 'whatsapp1' as const,
        icon: Smartphone,
        name: 'Ficha + 1 producto',
        tagline: 'Ideal para emprendedores que quieren empezar a vender profesionalmente por WhatsApp Business.',
        usd: 19, cop: 50000,
        popular: false,
        includes: [
          'Configuración completa del perfil de empresa',
          'Foto de perfil optimizada para la marca',
          'Descripción del negocio con palabras clave',
          'Horario de atención configurado',
          'Dirección y sitio web vinculados',
          '1 producto en catálogo (foto, precio, descripción)',
          'Link directo de WhatsApp con mensaje prellenado',
        ],
        excludes: ['Respuestas rápidas', 'Mensaje de bienvenida automático', 'Guía de uso'],
        delivery: 'Entrega en 24-48 horas hábiles',
        cta: 'Empezar con 1 producto',
      },
      {
        key: 'whatsapp10' as const,
        icon: Star,
        name: 'Ficha + 10 productos',
        tagline: 'Perfecto para negocios con catálogo mediano que quieren mostrar sus mejores productos profesionalmente.',
        usd: 29, cop: 80000,
        popular: true,
        includes: [
          'Todo lo del plan anterior',
          'Hasta 10 productos en el catálogo',
          'Categorización de productos',
          'Copywriting para cada producto',
          'Imágenes optimizadas para WhatsApp',
          'Mensaje de bienvenida automático',
          'Respuestas rápidas configuradas (hasta 5)',
        ],
        excludes: ['Mensaje de ausencia', 'Etiquetas para contactos'],
        delivery: 'Entrega en 48-72 horas hábiles',
        cta: 'Elegir 10 productos',
      },
      {
        key: 'whatsapp20' as const,
        icon: Zap,
        name: 'Ficha + 20 productos',
        tagline: 'Para negocios con catálogo amplio que quieren presencia completa y profesional en WhatsApp Business.',
        usd: 39, cop: 120000,
        popular: false,
        includes: [
          'Todo lo del plan anterior',
          'Hasta 20 productos en el catálogo',
          'Colecciones y categorías organizadas',
          'Hasta 10 respuestas rápidas',
          'Mensaje de ausencia configurado',
          'Etiquetas para organizar contactos',
          'Guía de uso básica del catálogo',
        ],
        excludes: [],
        delivery: 'Entrega en 72-96 horas hábiles',
        cta: 'Elegir 20 productos',
      },
    ],
    howTitle: '¿Cómo funciona?',
    steps: [
      { n: '01', title: 'Elige tu plan', desc: 'Selecciona el plan que mejor se adapta a tu catálogo.' },
      { n: '02', title: 'Realiza el pago', desc: 'Pago seguro en línea. Recibes confirmación inmediata.' },
      { n: '03', title: 'Nos contactamos', desc: 'En menos de 24h hábiles te escribimos por WhatsApp.' },
      { n: '04', title: 'Entrega lista', desc: 'Tu perfil optimizado listo para generar ventas.' },
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Qué necesito para contratar el servicio?', a: 'Solo necesitas tener WhatsApp Business instalado y acceso a la cuenta. Si aún no lo tienes, te guiamos para descargarlo gratis.' },
      { q: '¿Cómo es el proceso después de pagar?', a: 'Te contactamos por WhatsApp en menos de 24 horas hábiles. Te pedimos acceso temporal o trabajamos juntos vía videollamada.' },
      { q: '¿Pueden subir imágenes de mis productos?', a: 'Sí, solo envíanos las fotos. Recomendamos imágenes con fondo blanco o neutro. Si no tienes fotos profesionales, te orientamos para tomarlas con tu celular.' },
      { q: '¿El servicio incluye publicidad o pauta?', a: 'No, es exclusivamente la optimización del perfil y catálogo de WhatsApp Business. Para pauta digital revisa nuestros planes de Pauta Digital.' },
      { q: '¿En cuánto tiempo ven resultados?', a: 'El impacto es inmediato. Los clientes encontrarán un negocio profesional con catálogo claro y respuestas automáticas desde el primer mensaje.' },
    ],
    ctaTitle: '¿Tienes dudas antes de contratar?',
    ctaSub: 'Escríbenos y te respondemos en minutos.',
    ctaBtn: 'Hablar por WhatsApp',
  } : {
    badge: 'Professional WhatsApp Business',
    title: 'WhatsApp Business Optimization',
    sub: "Turn your WhatsApp into a professional storefront. Complete profile, optimized catalog and configurations that build trust and increase sales from the first message.",
    trustBadges: [
      { icon: Clock, text: 'Delivery in 24-96 business hours' },
      { icon: Shield, text: 'Guaranteed results' },
      { icon: Zap, text: '100% remote process' },
    ],
    pricingTitle: 'Choose your plan',
    pricingNote: 'One-time payment. No monthly fees. Your optimized WhatsApp forever.',
    noInclude: 'Does not include:',
    plans: [
      {
        key: 'whatsapp1' as const,
        icon: Smartphone,
        name: 'Profile + 1 product',
        tagline: 'Ideal for entrepreneurs who want to start selling professionally on WhatsApp Business.',
        usd: 19, cop: 50000,
        popular: false,
        includes: [
          'Complete business profile setup',
          'Brand-optimized profile photo',
          'Business description with keywords',
          'Business hours configured',
          'Address and website linked',
          '1 catalog product (photo, price, description)',
          'Direct WhatsApp link with pre-filled message',
        ],
        excludes: ['Quick replies', 'Automatic welcome message', 'Usage guide'],
        delivery: 'Delivery in 24-48 business hours',
        cta: 'Start with 1 product',
      },
      {
        key: 'whatsapp10' as const,
        icon: Star,
        name: 'Profile + 10 products',
        tagline: 'Perfect for businesses with a medium catalog who want to showcase their best products professionally.',
        usd: 29, cop: 80000,
        popular: true,
        includes: [
          'Everything in previous plan',
          'Up to 10 catalog products',
          'Product categorization',
          'Copywriting for each product',
          'WhatsApp-optimized images',
          'Automatic welcome message',
          'Quick replies configured (up to 5)',
        ],
        excludes: ['Away message', 'Contact labels'],
        delivery: 'Delivery in 48-72 business hours',
        cta: 'Choose 10 products',
      },
      {
        key: 'whatsapp20' as const,
        icon: Zap,
        name: 'Profile + 20 products',
        tagline: 'For businesses with a large catalog who want complete and professional presence on WhatsApp Business.',
        usd: 39, cop: 120000,
        popular: false,
        includes: [
          'Everything in previous plan',
          'Up to 20 catalog products',
          'Collections and organized categories',
          'Up to 10 quick replies',
          'Away message configured',
          'Contact labels',
          'Basic catalog usage guide',
        ],
        excludes: [],
        delivery: 'Delivery in 72-96 business hours',
        cta: 'Choose 20 products',
      },
    ],
    howTitle: 'How does it work?',
    steps: [
      { n: '01', title: 'Choose your plan', desc: 'Select the plan that best fits your catalog.' },
      { n: '02', title: 'Make payment', desc: 'Secure online payment. Receive instant confirmation.' },
      { n: '03', title: 'We contact you', desc: "We'll reach out via WhatsApp within 24 business hours." },
      { n: '04', title: 'Delivery ready', desc: 'Your optimized profile ready to generate sales.' },
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'What do I need to hire the service?', a: "Just WhatsApp Business installed and account access. If you don't have it yet, we'll guide you to download it for free." },
      { q: 'What happens after payment?', a: "We contact you via WhatsApp within 24 business hours. We'll request temporary access or work together via video call." },
      { q: 'Can you upload product images?', a: "Yes, just send us the photos. We recommend white or neutral background images. If you don't have professional photos, we'll guide you." },
      { q: 'Does the service include advertising?', a: "No, it's exclusively profile and catalog optimization. For digital advertising check our Digital Advertising plans." },
      { q: 'How quickly will I see results?', a: 'Impact is immediate. Clients will find a professional business with a clear catalog and automatic replies from the first message.' },
    ],
    ctaTitle: 'Have questions before hiring?',
    ctaSub: "Write to us and we'll respond in minutes.",
    ctaBtn: 'Chat on WhatsApp',
  };

  return (
    <>
      <Header currentLang={lang} />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(120, 60%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4" />
              {t.badge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">{t.sub}</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {t.trustBadges.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <b.icon className="w-4 h-4 text-green-400" />
                  {b.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-foreground">{t.pricingTitle}</h2>
            <p className="text-muted-foreground text-center max-w-md mx-auto mb-8">{t.pricingNote}</p>
            <div className="flex items-center justify-center gap-1 p-1 rounded-full border border-border w-fit mx-auto mb-14">
              <button onClick={() => setCurrency('usd')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'usd' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>USD</button>
              <button onClick={() => setCurrency('cop')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'cop' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>COP</button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {t.plans.map((plan, i) => {
                const IconComp = plan.icon;
                return (
                  <div key={i} className={`glass-card p-8 relative flex flex-col transition-all duration-300 ${plan.popular ? 'border-green-500/50' : ''}`}
                    style={plan.popular ? { boxShadow: '0 0 30px hsla(120, 60%, 40%, 0.15)' } : {}}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-green-500 text-white whitespace-nowrap">
                        {lang === 'es' ? 'Más popular' : 'Most popular'}
                      </div>
                    )}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'hsla(120, 60%, 40%, 0.1)' }}>
                      <IconComp className="w-7 h-7 text-green-400" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-3">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{plan.tagline}</p>
                    <div className="mb-2">
                      <span className="text-4xl font-display font-bold text-green-400">{formatPrice(plan.usd, plan.cop)}</span>
                      <span className="text-muted-foreground text-sm ml-1">{lang === 'es' ? '/ pago único' : '/ one-time'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-6 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> {plan.delivery}
                    </p>
                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.includes.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-3 text-sm text-foreground">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {plan.excludes.length > 0 && (
                      <div className="mb-8 pt-4 border-t border-border">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">{t.noInclude}</p>
                        <ul className="space-y-1.5">
                          {plan.excludes.map((ex, ei) => (
                            <li key={ei} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <X className="w-3 h-3 flex-shrink-0 opacity-50" /> {ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {plan.excludes.length === 0 && <div className="mb-8" />}
                    <button
                      onClick={() => handleCta(plan.key)}
                      className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${plan.popular ? 'bg-green-500 hover:bg-green-600 text-white' : 'border border-green-500/40 text-green-400 hover:bg-green-500 hover:text-white'}`}
                    >
                      <MessageCircle className="w-4 h-4" /> {plan.cta}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">{t.howTitle}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {t.steps.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-green-500">
                    <span className="text-xl font-display font-bold text-white">{s.n}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-4">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16 text-green-400">{t.faqTitle}</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {t.faqs.map((faq, i) => (
                <div key={i} className="glass-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-green-500/5 transition-colors"
                  >
                    <h3 className="text-lg font-display font-semibold pr-4 text-foreground">{faq.q}</h3>
                    <Plus className={`w-5 h-5 text-green-400 transition-transform duration-200 flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6">
                      <p className="leading-relaxed text-muted-foreground">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 text-center">
          <div className="container mx-auto px-4 md:px-6">
            <MessageCircle className="w-12 h-12 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">{t.ctaTitle}</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">{t.ctaSub}</p>
            <a
              href="https://wa.me/17865787671?text=Hola%20Ferova%2C%20quiero%20información%20sobre%20Optimización%20WhatsApp%20Business"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold transition"
            >
              <MessageCircle className="w-5 h-5" />
              {t.ctaBtn} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        <AdBanner slot="service-whatsapp" className="max-w-4xl mx-auto mb-20" />
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default OptimizacionWhatsapp;
