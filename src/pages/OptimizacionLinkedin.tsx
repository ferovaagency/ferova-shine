import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { AnimatedSection, StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import {
  Linkedin, CheckCircle, Star, Users, TrendingUp, Eye,
  FileText, MessageCircle, Briefcase, Award
} from 'lucide-react';

interface Props { lang?: 'es' | 'en'; }

const OptimizacionLinkedin = ({ lang = 'es' }: Props) => {
  const t = lang === 'es' ? {
    badge: 'Nuevo Servicio',
    title: 'Optimización de Perfil de LinkedIn',
    sub: 'Potencia tu marca personal y atrae oportunidades profesionales con un perfil optimizado estratégicamente.',
    planName: 'LinkedIn Pro',
    planPrice: { usd: 197, cop: 790000 },
    planDesc: 'Optimización completa de tu perfil profesional de LinkedIn.',
    features: [
      'Auditoría completa de tu perfil actual',
      'Redacción estratégica de headline y about',
      'Optimización SEO de keywords profesionales',
      'Diseño de banner profesional personalizado',
      'Estrategia de contenido (plan de 30 días)',
      'Optimización de experiencia y logros',
      'Recomendaciones de networking',
      'Sesión de seguimiento a 30 días',
    ],
    benefits: [
      { icon: Eye, title: 'Mayor visibilidad', desc: 'Aparece en más búsquedas de reclutadores y clientes potenciales.' },
      { icon: Users, title: 'Networking estratégico', desc: 'Atrae conexiones de valor que impulsen tu carrera o negocio.' },
      { icon: TrendingUp, title: 'Marca personal sólida', desc: 'Posiciónate como referente en tu industria con contenido estratégico.' },
      { icon: Briefcase, title: 'Más oportunidades', desc: 'Genera leads, ofertas laborales y alianzas de negocio.' },
    ],
    ctaBtn: 'Agendar Asesoría',
    ctaTitle: '¿Listo para potenciar tu LinkedIn?',
    ctaSub: 'Agenda una asesoría gratuita y descubre cómo transformar tu perfil profesional.',
  } : {
    badge: 'New Service',
    title: 'LinkedIn Profile Optimization',
    sub: 'Boost your personal brand and attract professional opportunities with a strategically optimized profile.',
    planName: 'LinkedIn Pro',
    planPrice: { usd: 197, cop: 790000 },
    planDesc: 'Complete optimization of your professional LinkedIn profile.',
    features: [
      'Full audit of your current profile',
      'Strategic headline and about copywriting',
      'Professional keyword SEO optimization',
      'Custom professional banner design',
      'Content strategy (30-day plan)',
      'Experience and achievements optimization',
      'Networking recommendations',
      '30-day follow-up session',
    ],
    benefits: [
      { icon: Eye, title: 'Greater visibility', desc: 'Show up in more recruiter and potential client searches.' },
      { icon: Users, title: 'Strategic networking', desc: 'Attract valuable connections that boost your career or business.' },
      { icon: TrendingUp, title: 'Solid personal brand', desc: 'Position yourself as an industry leader with strategic content.' },
      { icon: Briefcase, title: 'More opportunities', desc: 'Generate leads, job offers and business partnerships.' },
    ],
    ctaBtn: 'Book a Consultation',
    ctaTitle: 'Ready to boost your LinkedIn?',
    ctaSub: 'Book a free consultation and discover how to transform your professional profile.',
  };

  const whatsappUrl = 'https://wa.me/17865787671?text=' + encodeURIComponent(
    lang === 'es' ? 'Hola Ferova, me interesa la optimización de LinkedIn.' : 'Hi Ferova, I\'m interested in LinkedIn optimization.'
  );

  return (
    <PageTransition>
      <Header currentLang={lang} />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm font-medium mb-8">
                <Award className="w-4 h-4" />
                {t.badge}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 bg-[#0A66C2]/10">
                <Linkedin className="w-10 h-10 text-[#0A66C2]" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.title}</h1>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.sub}</p>
            </AnimatedSection>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {t.benefits.map((b, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <div className="glass-card p-8 text-center hover:border-gold/30 transition-all h-full">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gold/10">
                        <b.icon className="w-8 h-8 text-gold" />
                      </div>
                      <h3 className="text-lg font-display font-semibold mb-2 text-foreground">{b.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Plan */}
        <section className="py-20 md:py-28 bg-surface">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <div className="max-w-lg mx-auto glass-card p-10 text-center border-gold/30 gold-glow">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gold/20 text-gold mb-6">
                  <Star className="w-3 h-3 fill-gold" /> Plan Único
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">{t.planName}</h3>
                <p className="text-muted-foreground text-sm mb-6">{t.planDesc}</p>
                <div className="mb-8">
                  <span className="text-4xl font-display font-bold text-foreground">${t.planPrice.usd} USD</span>
                  <span className="text-muted-foreground text-sm block mt-1">
                    ({new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(t.planPrice.cop)})
                  </span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  {t.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.ctaBtn}
                </motion.a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, hsla(45, 86%, 40%, 0.06), transparent 70%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">{t.ctaTitle}</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">{t.ctaSub}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                {t.ctaBtn}
              </motion.a>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </PageTransition>
  );
};

export default OptimizacionLinkedin;
