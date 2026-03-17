import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { AnimatedSection, StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Heart, BookOpen, Users, Handshake, Eye, MessageCircle, Rocket, Linkedin, ExternalLink } from 'lucide-react';

interface Props { lang?: 'es' | 'en'; }

const SobreNosotros = ({ lang = 'es' }: Props) => {
  const t = lang === 'es' ? {
    badge: 'Agencia Boutique de SEO para Ecommerce',
    title: 'Sobre Ferova Agency',
    sub: 'Nacimos en septiembre de 2025 para aumentar las ventas de los Ecommerce con SEO especializado.',
    identity: 'Somos una Agencia Boutique de SEO para Ecommerce con un modelo de éxito compartido. Tu crecimiento es nuestro crecimiento.',
    missionTitle: 'Misión',
    mission: 'Aumentar las ventas de los Ecommerce con SEO especializado.',
    visionTitle: 'Visión',
    vision: 'Para 2027, ser la firma boutique de SEO referente en Colombia y Florida (EE. UU.).',
    valuesTitle: 'Nuestros valores',
    values: [
      { icon: Target, title: 'Claridad', desc: 'Comunicamos de manera simple y directa. Nada de jerga técnica innecesaria.' },
      { icon: TrendingUp, title: 'Impacto', desc: 'Nos enfocamos en métricas que realmente importan: tráfico y ventas.' },
      { icon: Heart, title: 'Partnership', desc: 'Trabajamos como una extensión de tu equipo, no como un proveedor externo.' },
      { icon: BookOpen, title: 'Aprendizaje constante', desc: 'El SEO evoluciona cada día. Nosotros también. Innovación continua.' },
    ],
    diffTitle: 'Lo que hace diferente a Ferova Agency',
    diffSub: 'No creemos en soluciones genéricas. Trabajamos con estrategias personalizadas; ganamos si tú ganas.',
    differentiators: [
      { icon: Target, title: 'Modelo basado en resultados', desc: 'Nuestro éxito se mide por el tuyo. Alineamos nuestros objetivos con los de tu negocio.' },
      { icon: Users, title: 'Involucramiento total', desc: 'Trabajamos como una extensión de tu equipo con dedicación completa.' },
      { icon: Handshake, title: 'Aliados estratégicos', desc: 'Más que proveedores, somos socios en tu crecimiento digital.' },
      { icon: Eye, title: 'Transparencia sin tecnicismos', desc: 'Comunicación clara. Entenderás cada decisión y cada resultado.' },
    ],
    linkedinTitle: 'Conoce a Maria Fer Calderón',
    linkedinSub: 'Fundadora y estratega SEO de Ferova Agency',
    linkedinRole: 'SEO Strategist & Founder',
    linkedinBio: 'Especialista en SEO para E-commerce con experiencia en posicionamiento orgánico, pauta digital y diseño web. Apasionada por transformar negocios digitales con estrategias basadas en datos.',
    linkedinBtn: 'Ver perfil en LinkedIn',
    ctaTitle: '¿Listo para hacer crecer tu e-commerce?',
    ctaSub: 'Agenda una asesoría gratuita y descubre cuánto puede crecer tu tienda online.',
    ctaBtn: 'Agendar Asesoría',
  } : {
    badge: 'Boutique E-commerce SEO Agency',
    title: 'About Ferova Agency',
    sub: 'We were born in September 2025 to increase E-commerce sales through specialized SEO.',
    identity: 'We are a Boutique E-commerce SEO Agency with a shared success model. Your growth is our growth.',
    missionTitle: 'Mission',
    mission: 'Increase E-commerce sales through specialized SEO.',
    visionTitle: 'Vision',
    vision: 'By 2027, become the leading boutique SEO firm in Colombia and Florida (USA).',
    valuesTitle: 'Our values',
    values: [
      { icon: Target, title: 'Clarity', desc: 'We communicate simply and directly. No unnecessary jargon.' },
      { icon: TrendingUp, title: 'Impact', desc: 'We focus on metrics that truly matter: traffic and sales.' },
      { icon: Heart, title: 'Partnership', desc: 'We work as an extension of your team, not as an external vendor.' },
      { icon: BookOpen, title: 'Continuous learning', desc: 'SEO evolves every day. So do we. Continuous innovation.' },
    ],
    diffTitle: 'What makes Ferova Agency different',
    diffSub: "We don't believe in generic solutions. We work with personalized strategies; we win if you win.",
    differentiators: [
      { icon: Target, title: 'Results-based model', desc: 'Our success is measured by yours. We align our goals with your business.' },
      { icon: Users, title: 'Total involvement', desc: 'We work as an extension of your team with complete dedication.' },
      { icon: Handshake, title: 'Strategic allies', desc: 'More than providers, we are partners in your digital growth.' },
      { icon: Eye, title: 'Transparency without jargon', desc: 'Clear communication. You will understand every decision and result.' },
    ],
    linkedinTitle: 'Meet Maria Fer Calderón',
    linkedinSub: 'Founder & SEO Strategist at Ferova Agency',
    linkedinRole: 'SEO Strategist & Founder',
    linkedinBio: 'E-commerce SEO specialist with experience in organic positioning, digital advertising and web design. Passionate about transforming digital businesses with data-driven strategies.',
    linkedinBtn: 'View LinkedIn Profile',
    ctaTitle: 'Ready to grow your e-commerce?',
    ctaSub: 'Book a free consultation and discover how much your online store can grow.',
    ctaBtn: 'Book a Consultation',
  };

  const whatsappUrl = 'https://wa.me/17865787671?text=' + encodeURIComponent(
    lang === 'es' ? 'Hola Ferova, quiero agendar una asesoría.' : 'Hi Ferova, I want to book a consultation.'
  );

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
                {t.badge}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.title}</h1>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">{t.sub}</p>
              <p className="text-foreground text-lg max-w-2xl mx-auto font-medium">{t.identity}</p>
            </AnimatedSection>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 md:py-28 bg-surface">
          <div className="container mx-auto px-4 md:px-6">
            <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <StaggerItem>
                <div className="glass-card p-8 md:p-10 h-full border-l-4 border-l-gold">
                  <h2 className="text-xl font-display font-bold mb-4 text-gold">{t.missionTitle}</h2>
                  <p className="text-foreground text-lg leading-relaxed">{t.mission}</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="glass-card p-8 md:p-10 h-full border-l-4 border-l-wine">
                  <h2 className="text-xl font-display font-bold mb-4 text-wine-light">{t.visionTitle}</h2>
                  <p className="text-foreground text-lg leading-relaxed">{t.vision}</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">{t.valuesTitle}</h2>
            </AnimatedSection>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {t.values.map((v, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <div className="glass-card p-8 text-center hover:border-gold/30 transition-all h-full">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gold/10">
                        <v.icon className="w-8 h-8 text-gold" />
                      </div>
                      <h3 className="text-xl font-display font-semibold mb-3 text-foreground">{v.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Differentiators */}
        <section className="py-20 md:py-28 bg-surface">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">{t.diffTitle}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic">{t.diffSub}</p>
            </AnimatedSection>
            <StaggerContainer className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {t.differentiators.map((d, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <div className="glass-card p-8 hover:border-gold/30 transition-all h-full flex gap-5">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-navy/20">
                        <d.icon className="w-7 h-7 text-gold" />
                      </div>
                      <div>
                        <h3 className="text-lg font-display font-semibold mb-2 text-foreground">{d.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
                      </div>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* LinkedIn Profile Widget */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.linkedinTitle}</h2>
              <p className="text-muted-foreground text-lg">{t.linkedinSub}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="max-w-lg mx-auto glass-card p-8 border-[#0A66C2]/20 hover:border-[#0A66C2]/40 transition-all">
                {/* LinkedIn-style card */}
                <div className="relative mb-6">
                  <div className="h-24 rounded-xl bg-gradient-to-r from-[#0A66C2]/20 to-gold/10" />
                  <div className="w-20 h-20 rounded-full bg-gold/10 border-4 border-background flex items-center justify-center absolute -bottom-10 left-6">
                    <span className="text-gold font-display font-bold text-2xl">MF</span>
                  </div>
                </div>
                <div className="pt-8 pl-2">
                  <h3 className="text-xl font-display font-bold text-foreground">Maria Fer Calderón</h3>
                  <p className="text-gold text-sm font-medium mb-1">{t.linkedinRole}</p>
                  <p className="text-muted-foreground text-xs mb-4">Bogotá, Colombia · Ferova Agency</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{t.linkedinBio}</p>
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href="https://www.linkedin.com/in/maria-fer-calderon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all bg-[#0A66C2] text-white hover:bg-[#004182]"
                  >
                    <Linkedin className="w-4 h-4" />
                    {t.linkedinBtn}
                    <ExternalLink className="w-3 h-3" />
                  </motion.a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 relative overflow-hidden bg-surface">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, hsla(45, 86%, 40%, 0.06), transparent 70%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">{t.ctaTitle}</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">{t.ctaSub}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center justify-center gap-2"
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

export default SobreNosotros;
