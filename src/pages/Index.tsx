import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { Link } from 'react-router-dom';
import {
  Zap, Shield, Search, BarChart3, ArrowRight, CheckCircle2,
  XCircle, Rocket, Star, ChevronLeft, ChevronRight,
  Code2, TrendingUp, Palette, Tag, GraduationCap, MessageCircle,
  Target, Handshake, FileText, Eye, Users, Lightbulb, BookOpen
} from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from '@/components/ui/motion';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface IndexProps {
  lang?: 'es' | 'en';
}

/* Animated counter component */
const AnimatedCounter = ({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(count, value, { duration: 2, ease: 'easeOut' });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [count, value]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
};

const Index = ({ lang = 'es' }: IndexProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const t = lang === 'es' ? {
    heroTitle1: 'Web Apps de',
    heroTitle2: 'Alto Rendimiento',
    heroTitle3: 'para E-commerce',
    heroSub: 'Más rápidas que WordPress. Más seguras. Mejor SEO. Diseñadas para convertir visitantes en clientes.',
    ctaPrimary: 'Agendar Asesoría',
    ctaSecondary: 'Escríbenos por WhatsApp',
    benefitsTitle: '¿Por qué una Web App?',
    benefitsSub: 'Las Web Apps modernas superan a WordPress en cada métrica que importa.',
    benefits: [
      { icon: Zap, title: 'Velocidad extrema', desc: 'Carga en menos de 1 segundo. Mejor experiencia de usuario y más conversiones.' },
      { icon: Shield, title: 'Seguridad total', desc: 'Sin plugins vulnerables. Sin hackeos. Tu tienda protegida 24/7.' },
      { icon: Search, title: 'SEO de nueva generación', desc: 'Estructura optimizada desde el código. Google te premia con mejor posicionamiento.' },
      { icon: BarChart3, title: 'Conversión real', desc: 'Cada elemento diseñado para guiar al usuario hacia la compra.' },
    ],
    compTitle: 'WordPress vs Web Apps Ferova',
    compSub: 'Descubre por qué las marcas líderes están migrando a Web Apps.',
    compHeaders: ['Característica', 'WordPress', 'Web App Ferova'],
    compRows: [
      ['Velocidad de carga', '3-8 segundos', '< 1 segundo'],
      ['Seguridad', 'Plugins vulnerables', 'Arquitectura segura'],
      ['SEO técnico', 'Limitado por plugins', 'Optimizado nativamente'],
      ['Mantenimiento', 'Actualizaciones constantes', 'Zero mantenimiento'],
      ['Escalabilidad', 'Se ralentiza con tráfico', 'Escala automáticamente'],
      ['Core Web Vitals', 'Difícil de aprobar', 'Aprobación garantizada'],
    ],
    servicesTitle: 'Servicios',
    servicesSub: 'Todo lo que necesitas para dominar el e-commerce.',
    services: [
      { icon: Search, title: 'SEO para E-commerce', desc: 'Posiciona tu tienda online en las primeras posiciones de Google.', href: '/servicios/seo-ecommerce' },
      { icon: Code2, title: 'Diseño Web / Web Apps', desc: 'Sitios ultra-rápidos, modernos y optimizados para convertir.', href: '/servicios/diseno-web' },
      { icon: TrendingUp, title: 'Pauta Digital', desc: 'Campañas en Google, Meta, TikTok y LinkedIn que generan ventas.', href: '/servicios/pauta-digital' },
      { icon: Palette, title: 'Diseño de Logos', desc: 'Identidad visual única que representa tu marca.', href: '/servicios/diseno-logos' },
      { icon: Tag, title: 'Descuentos en Herramientas', desc: 'Accede a herramientas premium a precios especiales.', href: '/servicios/descuentos-herramientas' },
      { icon: GraduationCap, title: 'Asesorías de Marketing', desc: 'Consultoría estratégica para escalar tu negocio.', href: '/servicios/asesorias-marketing' },
    ],
    statsTitle: 'Resultados que hablan por Ferova Agency',
    stats: [
      { value: 95, suffix: '%', prefix: '+', label: 'Tráfico Orgánico' },
      { value: 50, suffix: '%', prefix: '+', label: 'Ingresos Orgánicos' },
      { value: 30, suffix: '%', prefix: '+', label: 'Nuevos Clientes' },
      { value: 13, suffix: '', prefix: '', label: 'Marcas Impactadas' },
    ],
    statsNote: '*Datos basados en implementaciones de los últimos 12 meses.',
    diffTitle: 'Lo que hace diferente a Ferova Agency',
    diffSub: 'No creemos en soluciones genéricas. Trabajamos con estrategias personalizadas; ganamos si tú ganas.',
    differentiators: [
      { icon: Target, title: 'Modelo basado en resultados', desc: 'Nuestro éxito se mide por el tuyo. Alineamos nuestros objetivos con los de tu negocio.' },
      { icon: Lightbulb, title: 'Estrategias personalizadas', desc: 'Cada e-commerce es único. Diseñamos planes a la medida de tus necesidades.' },
      { icon: FileText, title: 'Reportes transparentes', desc: 'Sin letra pequeña. Reportes claros con métricas que entiendes y que importan.' },
    ],
    whyTitle: 'Por qué elegir a Ferova Agency',
    whyItems: [
      { icon: Users, title: 'Involucramiento total', desc: 'Trabajamos como una extensión de tu equipo, con dedicación completa a cada proyecto.' },
      { icon: Handshake, title: 'Aliados estratégicos', desc: 'Más que proveedores, somos socios en tu crecimiento digital.' },
      { icon: Eye, title: 'Transparencia sin tecnicismos', desc: 'Comunicación clara y directa. Entenderás cada decisión y cada resultado.' },
    ],
    testimonialsTitle: 'Lo que dicen nuestros clientes',
    testimonials: [
      { name: 'Carolina M.', role: 'CEO, Tienda de Moda', text: 'Desde que migramos a la Web App de Ferova, nuestras ventas se duplicaron en 4 meses. La velocidad del sitio es increíble.' },
      { name: 'Andrés P.', role: 'Director E-commerce', text: 'El equipo de Ferova entiende el e-commerce como nadie. Su enfoque en datos y resultados nos dio confianza desde el día uno.' },
      { name: 'Laura G.', role: 'Fundadora, Cosmética Natural', text: 'Ya no me preocupo por hackeos ni plugins. Mi tienda está segura y carga al instante. Recomendadísimos.' },
    ],
    ctaTitle: '¿Listo para hacer crecer tu e-commerce?',
    ctaSub: 'Agenda una asesoría gratuita y descubre cuánto puede crecer tu tienda online.',
    ctaBtn: 'Agendar Asesoría',
    ctaLink: 'Ver planes',
    viewAll: 'Ver todos los servicios',
  } : {
    heroTitle1: 'High-Performance',
    heroTitle2: 'Web Apps',
    heroTitle3: 'for E-commerce',
    heroSub: 'Faster than WordPress. More secure. Better SEO. Designed to convert visitors into customers.',
    ctaPrimary: 'Book a Consultation',
    ctaSecondary: 'Message us on WhatsApp',
    benefitsTitle: 'Why a Web App?',
    benefitsSub: 'Modern Web Apps outperform WordPress in every metric that matters.',
    benefits: [
      { icon: Zap, title: 'Blazing fast', desc: 'Loads in under 1 second. Better UX and more conversions.' },
      { icon: Shield, title: 'Total security', desc: 'No vulnerable plugins. No hacks. Your store protected 24/7.' },
      { icon: Search, title: 'Next-gen SEO', desc: 'Code-level optimization. Google rewards you with better rankings.' },
      { icon: BarChart3, title: 'Real conversion', desc: 'Every element designed to guide users to purchase.' },
    ],
    compTitle: 'WordPress vs Ferova Web Apps',
    compSub: 'Discover why leading brands are migrating to Web Apps.',
    compHeaders: ['Feature', 'WordPress', 'Ferova Web App'],
    compRows: [
      ['Load speed', '3-8 seconds', '< 1 second'],
      ['Security', 'Vulnerable plugins', 'Secure architecture'],
      ['Technical SEO', 'Limited by plugins', 'Natively optimized'],
      ['Maintenance', 'Constant updates', 'Zero maintenance'],
      ['Scalability', 'Slows with traffic', 'Auto-scales'],
      ['Core Web Vitals', 'Hard to pass', 'Guaranteed pass'],
    ],
    servicesTitle: 'Services',
    servicesSub: 'Everything you need to dominate e-commerce.',
    services: [
      { icon: Search, title: 'E-commerce SEO', desc: 'Rank your online store at the top of Google.', href: '/en/services/ecommerce-seo' },
      { icon: Code2, title: 'Web Design / Web Apps', desc: 'Ultra-fast, modern sites optimized to convert.', href: '/en/services/web-design' },
      { icon: TrendingUp, title: 'Digital Ads', desc: 'Campaigns on Google, Meta, TikTok & LinkedIn that drive sales.', href: '/en/services/digital-ads' },
      { icon: Palette, title: 'Logo Design', desc: 'Unique visual identity that represents your brand.', href: '/en/services/logo-design' },
      { icon: Tag, title: 'Tool Discounts', desc: 'Access premium tools at special prices.', href: '/en/services/tool-discounts' },
      { icon: GraduationCap, title: 'Marketing Consulting', desc: 'Strategic consulting to scale your business.', href: '/en/services/marketing-consulting' },
    ],
    statsTitle: 'Results that speak for Ferova Agency',
    stats: [
      { value: 95, suffix: '%', prefix: '+', label: 'Organic Traffic' },
      { value: 50, suffix: '%', prefix: '+', label: 'Organic Revenue' },
      { value: 30, suffix: '%', prefix: '+', label: 'New Clients' },
      { value: 13, suffix: '', prefix: '', label: 'Brands Impacted' },
    ],
    statsNote: '*Data based on implementations from the last 12 months.',
    diffTitle: 'What makes Ferova Agency different',
    diffSub: "We don't believe in generic solutions. We work with personalized strategies; we win if you win.",
    differentiators: [
      { icon: Target, title: 'Results-based model', desc: 'Our success is measured by yours. We align our goals with your business.' },
      { icon: Lightbulb, title: 'Personalized strategies', desc: 'Every e-commerce is unique. We design plans tailored to your needs.' },
      { icon: FileText, title: 'Transparent reports', desc: 'No fine print. Clear reports with metrics you understand and that matter.' },
    ],
    whyTitle: 'Why choose Ferova Agency',
    whyItems: [
      { icon: Users, title: 'Total involvement', desc: 'We work as an extension of your team, with complete dedication to each project.' },
      { icon: Handshake, title: 'Strategic allies', desc: 'More than providers, we are partners in your digital growth.' },
      { icon: Eye, title: 'Transparency without jargon', desc: 'Clear and direct communication. You will understand every decision and every result.' },
    ],
    testimonialsTitle: 'What our clients say',
    testimonials: [
      { name: 'Carolina M.', role: 'CEO, Fashion Store', text: "Since migrating to Ferova's Web App, our sales doubled in 4 months. Site speed is incredible." },
      { name: 'Andrés P.', role: 'E-commerce Director', text: "Ferova's team understands e-commerce like no one. Their data-driven approach gave us confidence from day one." },
      { name: 'Laura G.', role: 'Founder, Natural Cosmetics', text: 'No more worrying about hacks or plugins. My store is secure and loads instantly. Highly recommended.' },
    ],
    ctaTitle: 'Ready to grow your e-commerce?',
    ctaSub: 'Book a free consultation and discover how much your online store can grow.',
    ctaBtn: 'Book a Consultation',
    ctaLink: 'See plans',
    viewAll: 'View all services',
  };

  const whatsappUrl = 'https://wa.me/17865787671?text=' + encodeURIComponent(
    lang === 'es' ? 'Hola Ferova, quiero agendar una asesoría.' : 'Hi Ferova, I want to book a consultation.'
  );

  return (
    <PageTransition>
      <Header currentLang={lang} />
      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, hsla(356, 68%, 20%, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, hsla(45, 86%, 40%, 0.05) 0%, transparent 50%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <AnimatedSection delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm font-medium mb-8">
                  <Rocket className="w-4 h-4" />
                  {lang === 'es' ? 'Agencia Boutique de SEO para Ecommerce' : 'Boutique E-commerce SEO Agency'}
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
                  {t.heroTitle1}{' '}
                  <span className="text-gradient-gold">{t.heroTitle2}</span>
                  <br />{t.heroTitle3}
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                  {t.heroSub}
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold text-center flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t.ctaPrimary}
                  </motion.a>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Link to={lang === 'es' ? '/contacto' : '/en/contact'} className="btn-outline-gold text-center block">
                      {lang === 'es' ? 'Ver planes y precios' : 'See plans & pricing'}
                    </Link>
                  </motion.div>
                </div>
              </AnimatedSection>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, hsl(var(--background)), transparent)' }} />
        </section>

        {/* Benefits */}
        <section className="py-20 md:py-28 relative">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">{t.benefitsTitle}</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t.benefitsSub}</p>
            </AnimatedSection>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.benefits.map((b, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <div className="glass-card p-6 md:p-8 hover:border-gold/30 transition-all duration-300 group h-full">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gold/10">
                        <b.icon className="w-6 h-6 text-gold" />
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

        {/* Comparison Table */}
        <section className="py-20 md:py-28 relative bg-surface">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">{t.compTitle}</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t.compSub}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="max-w-4xl mx-auto overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      {t.compHeaders.map((h, i) => (
                        <th key={i} className={`py-4 px-4 md:px-6 text-left text-sm font-display font-semibold ${i === 2 ? 'text-gold' : 'text-muted-foreground'}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.compRows.map((row, i) => (
                      <motion.tr
                        key={i}
                        className="border-t border-border/30"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                      >
                        <td className="py-4 px-4 md:px-6 text-sm font-medium text-foreground">{row[0]}</td>
                        <td className="py-4 px-4 md:px-6 text-sm">
                          <span className="flex items-center gap-2 text-destructive">
                            <XCircle className="w-4 h-4 flex-shrink-0" /> {row[1]}
                          </span>
                        </td>
                        <td className="py-4 px-4 md:px-6 text-sm">
                          <span className="flex items-center gap-2 text-gold">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> {row[2]}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">{t.servicesTitle}</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t.servicesSub}</p>
            </AnimatedSection>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {t.services.map((s, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <Link to={s.href} className="glass-card p-8 hover:border-gold/30 transition-all duration-300 group block h-full">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gold/10">
                        <s.icon className="w-7 h-7 text-gold" />
                      </div>
                      <h3 className="text-xl font-display font-semibold mb-3 text-foreground">{s.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                      <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                        {lang === 'es' ? 'Ver servicio' : 'Learn more'} <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <AnimatedSection className="text-center mt-10">
              <Link to={lang === 'es' ? '/servicios' : '/en/services'} className="btn-outline-gold inline-flex items-center gap-2 !px-6 !py-3 text-sm">
                {t.viewAll} <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* Stats — Social Proof */}
        <section className="py-20 md:py-28 relative bg-surface">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-center mb-16">
                {t.statsTitle}
              </h2>
            </AnimatedSection>
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {t.stats.map((s, i) => (
                <StaggerItem key={i}>
                  <div className="text-center p-6">
                    <div className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-2">
                      <AnimatedCounter value={s.value} suffix={s.suffix} prefix={s.prefix} />
                    </div>
                    <div className="text-muted-foreground text-sm">{s.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <AnimatedSection delay={0.4}>
              <p className="text-center text-muted-foreground text-xs mt-8">{t.statsNote}</p>
            </AnimatedSection>
          </div>
        </section>

        {/* Differentiators */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">{t.diffTitle}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic">{t.diffSub}</p>
            </AnimatedSection>
            <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {t.differentiators.map((d, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <div className="glass-card p-8 text-center hover:border-gold/30 transition-all h-full">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gold/10">
                        <d.icon className="w-8 h-8 text-gold" />
                      </div>
                      <h3 className="text-xl font-display font-semibold mb-3 text-foreground">{d.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Why Choose Ferova */}
        <section className="py-20 md:py-28 bg-surface">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">{t.whyTitle}</h2>
            </AnimatedSection>
            <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {t.whyItems.map((w, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <div className="glass-card p-8 hover:border-wine/30 transition-all h-full">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-wine/10">
                        <w.icon className="w-7 h-7 text-wine-light" />
                      </div>
                      <h3 className="text-xl font-display font-semibold mb-3 text-foreground">{w.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{w.desc}</p>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">{t.testimonialsTitle}</h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="max-w-2xl mx-auto relative">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card p-8 md:p-12 text-center gold-glow"
                >
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-foreground text-lg md:text-xl leading-relaxed mb-8 italic">
                    &ldquo;{t.testimonials[currentTestimonial].text}&rdquo;
                  </p>
                  <div>
                    <p className="font-display font-semibold text-foreground">{t.testimonials[currentTestimonial].name}</p>
                    <p className="text-muted-foreground text-sm">{t.testimonials[currentTestimonial].role}</p>
                  </div>
                </motion.div>
                <div className="flex justify-center gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? t.testimonials.length - 1 : prev - 1))}
                    className="p-2 rounded-full border border-border hover:border-gold/50 hover:text-gold transition-colors"
                    aria-label={lang === 'es' ? 'Anterior' : 'Previous'}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <div className="flex items-center gap-2">
                    {t.testimonials.map((_, i) => (
                      <button key={i} onClick={() => setCurrentTestimonial(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === currentTestimonial ? 'bg-gold w-6' : 'bg-border'}`}
                        aria-label={`Testimonial ${i + 1}`} />
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentTestimonial((prev) => (prev === t.testimonials.length - 1 ? 0 : prev + 1))}
                    className="p-2 rounded-full border border-border hover:border-gold/50 hover:text-gold transition-colors"
                    aria-label={lang === 'es' ? 'Siguiente' : 'Next'}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.ctaBtn}
                </motion.a>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link to={lang === 'es' ? '/precios' : '/en/pricing'} className="btn-outline-gold text-center block">
                    {t.ctaLink}
                  </Link>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </PageTransition>
  );
};

export default Index;
