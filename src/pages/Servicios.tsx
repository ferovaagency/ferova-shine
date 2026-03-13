import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { AnimatedSection, StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { Search, Monitor, Target, ArrowRight, CheckCircle, Palette, Tag, GraduationCap, MessageCircle, Linkedin } from 'lucide-react';

interface ServiciosProps {
  lang?: 'es' | 'en';
}

const Servicios = ({ lang = 'es' }: ServiciosProps) => {
  const services = lang === 'es' ? [
    { icon: Search, title: 'SEO para E-commerce', description: 'Estrategia integral de posicionamiento orgánico diseñada para tiendas online.', features: ['Auditoría técnica SEO', 'Keyword research estratégico', 'Optimización on-page', 'Link building de calidad', 'Content marketing', 'Reporting mensual'], href: '/servicios/seo-ecommerce' },
    { icon: Monitor, title: 'Diseño de Web Apps', description: 'Web Apps de Alto Rendimiento para E-commerce. Más rápidas que WordPress. Más seguras. Mejor SEO.', features: ['Diseño UI/UX profesional', 'Desarrollo responsive', 'Core Web Vitals optimizados', 'Integración e-commerce', 'Mobile-first', 'Mantenimiento continuo'], href: '/servicios/diseno-web' },
    { icon: Target, title: 'Pauta Digital', description: 'Campañas publicitarias en Google, Meta, TikTok y LinkedIn que generan ventas reales.', features: ['Google Ads & Shopping', 'Facebook e Instagram Ads', 'TikTok Ads', 'LinkedIn Ads', 'Remarketing avanzado', 'Reporting en tiempo real'], href: '/servicios/pauta-digital' },
    { icon: Linkedin, title: 'Optimización de LinkedIn', description: 'Potencia tu marca personal y atrae oportunidades con un perfil optimizado estratégicamente.', features: ['Auditoría de perfil', 'Headline y About estratégico', 'SEO de keywords profesionales', 'Banner profesional', 'Estrategia de contenido', 'Sesión de seguimiento'], href: '/servicios/optimizacion-linkedin' },
    { icon: Palette, title: 'Diseño de Logos', description: 'Identidad visual única y profesional que posiciona tu marca en la mente de tus clientes.', features: ['Propuestas de diseño', 'Manual de marca', 'Archivos editables', 'Paleta de colores', 'Tipografías seleccionadas', 'Aplicaciones de marca'], href: '/servicios/diseno-logos' },
    { icon: Tag, title: 'Descuentos en Herramientas', description: 'Accede a herramientas premium de marketing, SEO y productividad a precios exclusivos.', features: ['SEMrush', 'Ahrefs', 'Surfer SEO', 'Envato Elements', 'Canva Pro', 'Y muchas más'], href: '/servicios/descuentos-herramientas' },
    { icon: GraduationCap, title: 'Asesorías de Marketing Virtual', description: 'Consultoría estratégica personalizada para escalar tu negocio digital.', features: ['Diagnóstico digital', 'Estrategia de crecimiento', 'Plan de acción', 'Sesiones 1-a-1', 'Seguimiento mensual', 'Soporte continuo'], href: '/servicios/asesorias-marketing' },
  ] : [
    { icon: Search, title: 'E-commerce SEO', description: 'Comprehensive organic positioning strategy designed for online stores.', features: ['Technical SEO audit', 'Strategic keyword research', 'On-page optimization', 'Quality link building', 'Content marketing', 'Monthly reporting'], href: '/en/services/ecommerce-seo' },
    { icon: Monitor, title: 'Web App Design', description: 'High-Performance Web Apps for E-commerce. Faster than WordPress. More secure. Better SEO.', features: ['Professional UI/UX design', 'Responsive development', 'Optimized Core Web Vitals', 'E-commerce integration', 'Mobile-first', 'Continuous maintenance'], href: '/en/services/web-design' },
    { icon: Target, title: 'Digital Ads', description: 'Advertising campaigns on Google, Meta, TikTok & LinkedIn that drive real sales.', features: ['Google Ads & Shopping', 'Facebook & Instagram Ads', 'TikTok Ads', 'LinkedIn Ads', 'Advanced remarketing', 'Real-time reporting'], href: '/en/services/digital-ads' },
    { icon: Linkedin, title: 'LinkedIn Optimization', description: 'Boost your personal brand and attract opportunities with a strategically optimized profile.', features: ['Profile audit', 'Strategic headline & about', 'Professional keyword SEO', 'Professional banner', 'Content strategy', 'Follow-up session'], href: '/en/services/linkedin-optimization' },
    { icon: Palette, title: 'Logo Design', description: 'Unique professional visual identity that positions your brand in customers\' minds.', features: ['Design proposals', 'Brand manual', 'Editable files', 'Color palette', 'Selected typography', 'Brand applications'], href: '/en/services/logo-design' },
    { icon: Tag, title: 'Tool Discounts', description: 'Access premium marketing, SEO and productivity tools at exclusive prices.', features: ['SEMrush', 'Ahrefs', 'Surfer SEO', 'Envato Elements', 'Canva Pro', 'And many more'], href: '/en/services/tool-discounts' },
    { icon: GraduationCap, title: 'Marketing Consulting', description: 'Personalized strategic consulting to scale your digital business.', features: ['Digital diagnosis', 'Growth strategy', 'Action plan', '1-on-1 sessions', 'Monthly follow-up', 'Continuous support'], href: '/en/services/marketing-consulting' },
  ];

  return (
    <>
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              {lang === 'es' ? 'Nuestros Servicios' : 'Our Services'}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {lang === 'es' ? 'Soluciones especializadas para hacer crecer tu e-commerce con estrategia, diseño y tecnología.' : 'Specialized solutions to grow your e-commerce with strategy, design and technology.'}
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((s, i) => (
                <Link key={i} to={s.href} className="glass-card p-8 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 group block">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                    <s.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3 text-foreground">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{s.description}</p>
                  <ul className="space-y-2 mb-6">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-gold flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1 text-gold text-sm font-semibold group-hover:gap-2 transition-all">
                    {lang === 'es' ? 'Ver detalles' : 'View details'} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              {lang === 'es' ? '¿Listo para impulsar tu e-commerce?' : 'Ready to boost your e-commerce?'}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              {lang === 'es' ? 'Escríbenos y diseñamos la estrategia perfecta para tu negocio.' : 'Contact us and we\'ll design the perfect strategy for your business.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/17865787671" target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <Link to={lang === 'es' ? '/contacto' : '/en/contact'} className="btn-outline-gold text-center">
                {lang === 'es' ? 'Formulario de contacto' : 'Contact form'}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default Servicios;
