import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import ProposalModal from '@/components/ui/proposal-modal';
import { AnimatedSection, StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import {
  Rocket, Clock, Code2, Smartphone, Bot, CheckCircle, X,
  Palette, Search, MessageCircle, Zap, Shield, FileText,
  Monitor, Globe, Database, ArrowRight
} from 'lucide-react';

interface Props { lang?: 'es' | 'en'; }

const DiseneoWeb = ({ lang = 'es' }: Props) => {
  const [currency, setCurrency] = useState<'usd' | 'cop'>('usd');
  const [proposalOpen, setProposalOpen] = useState(false);
  const [proposalService, setProposalService] = useState('');

  const formatPrice = (usd: number, cop: number) => {
    if (currency === 'cop') return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(cop);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usd);
  };

  const openProposal = (service: string) => {
    setProposalService(service);
    setProposalOpen(true);
  };

  const whatsappUrl = (plan: string) =>
    `https://wa.me/17865787671?text=${encodeURIComponent(
      lang === 'es'
        ? `Hola Ferova, me interesa el plan ${plan} de Diseño Web.`
        : `Hi Ferova, I'm interested in the ${plan} Web Design plan.`
    )}`;

  const t = lang === 'es' ? {
    heroTitle: 'Tu sitio web debería vender mientras duermes',
    heroSub: 'Construimos Web Apps modernas en React con entrega en 1 semana. No WordPress genérico. Código tuyo, rápido, seguro y optimizado para Google desde el día 1.',
    heroCta: 'Solicitar Propuesta',
    diffTitle: '¿Por qué elegir Ferova?',
    differentiators: [
      { icon: Rocket, title: 'Entrega en 1 semana', desc: 'Tu sitio listo en 7 días. Sin meses de espera.' },
      { icon: Code2, title: 'Código tuyo en GitHub', desc: 'Eres dueño de cada línea de código. Sin dependencias.' },
      { icon: Smartphone, title: 'Mobile-first siempre', desc: 'Diseñado primero para móvil, perfecto en todas las pantallas.' },
      { icon: Bot, title: 'IA integrada opcional', desc: 'Chatbots, generadores de contenido y automatizaciones con IA.' },
    ],
    includesTitle: 'Lo que incluye cada proyecto',
    includes: [
      { icon: Palette, text: 'Diseño con tu marca aplicada desde el día 1' },
      { icon: Search, text: 'SEO técnico desde la estructura' },
      { icon: MessageCircle, text: 'WhatsApp flotante integrado' },
      { icon: FileText, text: 'Formularios con notificación automática' },
      { icon: Smartphone, text: 'Responsive total en todos los dispositivos' },
      { icon: Database, text: 'Conexión a backend moderno' },
    ],
    plansTitle: 'Planes y Precios',
    plans: [
      {
        name: 'Express SaaS',
        tagline: 'Para quienes necesitan presencia profesional rápida.',
        usd: 400, cop: 1600000,
        monthly: false,
        monthlyUsd: 0, monthlyCop: 0,
        features: [
          'Landing profesional (1 página)',
          'Diseño de marca aplicado',
          'WhatsApp flotante',
          'Formulario de contacto',
          'SEO básico on-page',
          'Hosting incluido 1 año',
        ],
        excludes: ['Blog', 'Bot de IA', 'Panel admin', 'Tienda virtual'],
      },
      {
        name: 'Business Pro',
        tagline: 'Para negocios que necesitan escalar su presencia digital.',
        usd: 625, cop: 2500000,
        monthly: true,
        monthlyUsd: 35, monthlyCop: 140000,
        popular: true,
        features: [
          'Todo Express SaaS incluido',
          'Hasta 8 páginas',
          'Bot IA básico integrado',
          'Blog optimizado para SEO',
          'Panel de administración',
          'Soporte mensual incluido',
        ],
        excludes: ['Tienda virtual', 'Pasarela de pagos', 'Bot IA avanzado'],
      },
      {
        name: 'Full Commerce',
        tagline: 'E-commerce completo listo para vender desde el día 1.',
        usd: 1125, cop: 4500000,
        monthly: true,
        monthlyUsd: 50, monthlyCop: 200000,
        features: [
          'Todo Business Pro incluido',
          'Tienda virtual completa',
          'Pasarela de pagos (Wompi/Stripe)',
          'Bot IA avanzado personalizado',
          'Generador de fichas con IA',
          'SEO Schema.org estructurado',
        ],
        excludes: [],
      },
    ],
    processTitle: 'Tu Web App en 7 días',
    process: [
      { day: '1', title: 'Kickoff', desc: 'Reunión de inicio, definición de objetivos y briefing creativo.' },
      { day: '2', title: 'Fundación', desc: 'Arquitectura del sitio, setup técnico y estructura de navegación.' },
      { day: '3', title: 'Páginas', desc: 'Diseño y desarrollo de todas las páginas con tu marca.' },
      { day: '4', title: 'Funcionalidades', desc: 'Formularios, WhatsApp, integraciones y funcionalidades clave.' },
      { day: '5', title: 'SEO', desc: 'Optimización técnica, meta tags, velocidad y Core Web Vitals.' },
      { day: '6', title: 'Pruebas', desc: 'Testing en todos los dispositivos, QA y correcciones finales.' },
      { day: '7', title: 'Entrega', desc: 'Deploy final, capacitación y entrega del código en GitHub.' },
    ],
    ctaTitle: '¿Listo para tener un sitio que trabaje por ti?',
    ctaSub: 'Agenda una llamada y recibe tu propuesta personalizada en menos de 24 horas.',
    ctaBtn: 'Solicitar propuesta personalizada',
    noInclude: 'No incluye:',
    monthLabel: '/mes',
    oneTime: '/ pago único',
    proposalBtn: 'Solicitar propuesta personalizada',
  } : {
    heroTitle: 'Your website should sell while you sleep',
    heroSub: "We build modern React Web Apps delivered in 1 week. No generic WordPress. Your code, fast, secure and Google-optimized from day 1.",
    heroCta: 'Request Proposal',
    diffTitle: 'Why choose Ferova?',
    differentiators: [
      { icon: Rocket, title: '1-week delivery', desc: 'Your site ready in 7 days. No months of waiting.' },
      { icon: Code2, title: 'Your code on GitHub', desc: "You own every line of code. No vendor lock-in." },
      { icon: Smartphone, title: 'Always mobile-first', desc: 'Designed mobile-first, perfect on every screen.' },
      { icon: Bot, title: 'Optional AI integration', desc: 'Chatbots, content generators and AI automations.' },
    ],
    includesTitle: 'What every project includes',
    includes: [
      { icon: Palette, text: 'Design with your brand applied from day 1' },
      { icon: Search, text: 'Technical SEO from the ground up' },
      { icon: MessageCircle, text: 'Floating WhatsApp widget' },
      { icon: FileText, text: 'Forms with automatic notifications' },
      { icon: Smartphone, text: 'Fully responsive across all devices' },
      { icon: Database, text: 'Modern backend connection' },
    ],
    plansTitle: 'Plans & Pricing',
    plans: [
      {
        name: 'Express SaaS',
        tagline: 'For those who need a professional presence fast.',
        usd: 400, cop: 1600000,
        monthly: false,
        monthlyUsd: 0, monthlyCop: 0,
        features: [
          'Professional landing (1 page)',
          'Brand design applied',
          'Floating WhatsApp',
          'Contact form',
          'Basic on-page SEO',
          'Hosting included 1 year',
        ],
        excludes: ['Blog', 'AI bot', 'Admin panel', 'Online store'],
      },
      {
        name: 'Business Pro',
        tagline: 'For businesses ready to scale their digital presence.',
        usd: 625, cop: 2500000,
        monthly: true,
        monthlyUsd: 35, monthlyCop: 140000,
        popular: true,
        features: [
          'Everything in Express SaaS',
          'Up to 8 pages',
          'Basic AI bot integrated',
          'SEO-optimized blog',
          'Admin panel',
          'Monthly support included',
        ],
        excludes: ['Online store', 'Payment gateway', 'Advanced AI bot'],
      },
      {
        name: 'Full Commerce',
        tagline: 'Complete e-commerce ready to sell from day 1.',
        usd: 1125, cop: 4500000,
        monthly: true,
        monthlyUsd: 50, monthlyCop: 200000,
        features: [
          'Everything in Business Pro',
          'Complete online store',
          'Payment gateway (Wompi/Stripe)',
          'Advanced custom AI bot',
          'AI product sheet generator',
          'Schema.org structured SEO',
        ],
        excludes: [],
      },
    ],
    processTitle: 'Your Web App in 7 days',
    process: [
      { day: '1', title: 'Kickoff', desc: 'Kickoff meeting, goal definition and creative brief.' },
      { day: '2', title: 'Foundation', desc: 'Site architecture, technical setup and navigation structure.' },
      { day: '3', title: 'Pages', desc: 'Design and development of all pages with your brand.' },
      { day: '4', title: 'Features', desc: 'Forms, WhatsApp, integrations and key functionalities.' },
      { day: '5', title: 'SEO', desc: 'Technical optimization, meta tags, speed and Core Web Vitals.' },
      { day: '6', title: 'Testing', desc: 'Testing on all devices, QA and final fixes.' },
      { day: '7', title: 'Delivery', desc: 'Final deploy, training and code delivery on GitHub.' },
    ],
    ctaTitle: 'Ready for a site that works for you?',
    ctaSub: 'Book a call and get your custom proposal in under 24 hours.',
    ctaBtn: 'Request custom proposal',
    noInclude: 'Does not include:',
    monthLabel: '/mo',
    oneTime: '/ one-time',
    proposalBtn: 'Request custom proposal',
  };

  return (
    <PageTransition>
      <Header currentLang={lang} />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm font-medium mb-8">
                <Rocket className="w-4 h-4" />
                {lang === 'es' ? 'Entrega en 7 días' : '7-day delivery'}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 max-w-4xl mx-auto">
                {t.heroTitle}
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                {t.heroSub}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => openProposal(lang === 'es' ? 'Diseño Web / Web Apps' : 'Web Design / Web Apps')}
                  className="btn-gold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.heroCta}
                </motion.button>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link to={lang === 'es' ? '/casos-de-exito' : '/en/case-studies'} className="btn-outline-gold text-center block">
                    {lang === 'es' ? 'Ver casos de éxito' : 'View case studies'}
                  </Link>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Differentiators */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gold">{t.diffTitle}</h2>
            </AnimatedSection>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {t.differentiators.map((d, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <div className="glass-card p-6 text-center hover:border-gold/30 transition-all h-full">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                        <d.icon className="w-7 h-7 text-gold" />
                      </div>
                      <h3 className="text-lg font-display font-bold mb-2 text-foreground">{d.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* What's included */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold">{t.includesTitle}</h2>
            </AnimatedSection>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {t.includes.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-4 p-5 glass-card hover:border-gold/30 transition-all">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{t.plansTitle}</h2>
            </AnimatedSection>
            <div className="flex items-center justify-center gap-1 p-1 rounded-full border border-border w-fit mx-auto mb-14">
              <button onClick={() => setCurrency('usd')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'usd' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>USD</button>
              <button onClick={() => setCurrency('cop')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'cop' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>COP</button>
            </div>

            <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {t.plans.map((plan, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <div className={`glass-card p-8 relative h-full flex flex-col transition-all duration-300 ${(plan as any).popular ? 'border-gold/50 gold-glow' : ''}`}>
                      {(plan as any).popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-gold text-primary-foreground">
                          {lang === 'es' ? 'Más popular' : 'Most popular'}
                        </div>
                      )}
                      <h3 className="text-xl font-display font-bold mb-2 text-foreground">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">{plan.tagline}</p>
                      <div className="mb-2">
                        <span className="text-3xl font-display font-bold text-foreground">
                          {formatPrice(plan.usd, plan.cop)}
                        </span>
                        <span className="text-muted-foreground text-sm ml-1">{t.oneTime}</span>
                      </div>
                      {plan.monthly && (
                        <p className="text-gold text-sm font-medium mb-6">
                          + {formatPrice(plan.monthlyUsd, plan.monthlyCop)}{t.monthLabel}
                        </p>
                      )}
                      {!plan.monthly && <div className="mb-6" />}

                      <ul className="space-y-3 mb-6 flex-1">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-foreground">
                            <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> {f}
                          </li>
                        ))}
                      </ul>

                      {plan.excludes.length > 0 && (
                        <div className="mb-6 pt-4 border-t border-border">
                          <p className="text-xs font-semibold text-muted-foreground mb-2">{t.noInclude}</p>
                          <ul className="space-y-1.5">
                            {plan.excludes.map((ex, j) => (
                              <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <X className="w-3 h-3 flex-shrink-0 opacity-50" /> {ex}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="space-y-3 mt-auto">
                        <a
                          href={whatsappUrl(plan.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${(plan as any).popular ? 'btn-gold !px-0' : 'border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground'}`}
                        >
                          <MessageCircle className="w-4 h-4" />
                          {lang === 'es' ? 'Empezar ahora' : 'Start now'}
                        </a>
                        <button
                          onClick={() => openProposal(plan.name)}
                          className="w-full py-2.5 rounded-full text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:border-gold/40 transition-all"
                        >
                          {t.proposalBtn}
                        </button>
                      </div>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* 7-day process */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold">{t.processTitle}</h2>
            </AnimatedSection>
            <div className="max-w-3xl mx-auto">
              {t.process.map((step, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="flex gap-6 mb-8 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary-foreground">{step.day}</span>
                      </div>
                      {i < t.process.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border/50 mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <h3 className="text-lg font-display font-bold text-foreground mb-1">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28 relative overflow-hidden bg-surface">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, hsla(45, 86%, 40%, 0.06), transparent 70%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">{t.ctaTitle}</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">{t.ctaSub}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openProposal(lang === 'es' ? 'Diseño Web / Web Apps' : 'Web Design / Web Apps')}
                className="btn-gold inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                {t.ctaBtn}
              </motion.button>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
      <ProposalModal
        open={proposalOpen}
        onClose={() => setProposalOpen(false)}
        lang={lang}
        defaultService={proposalService}
      />
    </PageTransition>
  );
};

export default DiseneoWeb;
