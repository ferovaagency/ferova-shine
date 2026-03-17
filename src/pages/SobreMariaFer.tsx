import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Mail, Phone, Calendar, Linkedin, Instagram, Twitter, MessageCircle, CheckCircle, TrendingUp, ShoppingCart, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WaveSeparator from '@/components/ui/wave-separator';

interface SobreMariaFerProps {
  lang?: 'es' | 'en';
}

const SobreMariaFer = ({ lang = 'es' }: SobreMariaFerProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const content = {
    es: {
      nav: {
        inicio: 'Inicio',
        sobreMi: 'Sobre mí',
        servicios: 'Servicios',
        anuncios: 'Anuncios',
        testimonios: 'Testimonios',
        contenido: 'Contenido',
        contacto: 'Contacto',
        cta: 'Agendar llamada'
      },
      hero: {
        name: 'Maria Fer Calderón',
        subtitle: 'Estrategia de marketing y SEO para tiendas online, con foco en resultados simples de entender.',
        bullets: [
          '6+ años liderando marketing digital',
          'SEO para Ecommerce',
          'Sitios en WordPress'
        ],
        primaryCta: 'Escríbeme por WhatsApp',
        secondaryCta: 'Enviar un correo'
      },
      about: {
        title: 'Sobre mí',
        description: 'Profesional en marketing y estrategia comercial. 6 años dirigiendo equipos de marketing digital y proyectos SEO. Me enfoco en crear experiencias web útiles y agradables para las personas y en que cada acción sea clara y medible. Trabajo contigo como aliada estratégica, no solo como proveedora.',
        values: [
          { icon: CheckCircle, text: 'Transparencia en cada proyecto' },
          { icon: Users, text: 'Cercanía y comunicación directa' },
          { icon: TrendingUp, text: 'Prioridad en ventas y resultados' }
        ]
      },
      services: {
        title: 'Servicios que ofrezco',
        items: [
          {
            title: 'SEO para Ecommerce',
            description: 'Atrae más clientes y vende más con un plan sencillo de entender.',
            cta: 'Ver servicio',
            link: '/servicios/seo-ecommerce'
          },
          {
            title: 'Diseño de páginas web',
            description: 'Sitios bonitos, rápidos y fáciles de usar en cualquier dispositivo. WordPress + Divi.',
            cta: 'Ver servicio',
            link: '/servicios/diseno-web'
          },
          {
            title: 'Pauta digital',
            description: 'Campañas en Google, Shopping, Meta, TikTok y LinkedIn para generar ventas.',
            cta: 'Ver servicio',
            link: '/servicios/ads'
          }
        ],
        allServices: 'Ver todos los servicios'
      },
      banners: {
        title: 'Anuncios y colaboraciones',
        note: 'Trabajamos solo con marcas alineadas a nuestros valores.',
        sponsored: 'Patrocinado'
      },
      results: {
        title: 'Resultados',
        kpis: [
          { value: '50+', label: 'Clientes satisfechos' },
          { value: '+150%', label: 'Aumento del tráfico orgánico' },
          { value: '+200%', label: 'Más ventas en la tienda online' },
          { value: '100+', label: 'Nuevos clientes cada mes' }
        ],
        cta: 'Ver casos de éxito'
      },
      testimonials: {
        title: 'Lo que dicen de mi trabajo',
        items: [
          {
            text: 'Maria Fer transformó nuestra estrategia de SEO. En 6 meses duplicamos nuestras ventas orgánicas y el equipo entiende perfectamente qué estamos haciendo y por qué.',
            author: 'Carlos Mendoza',
            role: 'Director Comercial',
            company: 'Tienda Fashion LatAm'
          },
          {
            text: 'Su capacidad para explicar conceptos complejos de forma simple es excepcional. Nuestro sitio web ahora es rápido, bonito y funcional. Los resultados llegaron más rápido de lo esperado.',
            author: 'Ana Gutiérrez',
            role: 'CEO',
            company: 'Ecommerce Beauty'
          },
          {
            text: 'Trabajar con Maria Fer es como tener un aliado estratégico en tu equipo. Siempre está disponible, es transparente con los números y se enfoca en lo que realmente importa: vender más.',
            author: 'Roberto Silva',
            role: 'Fundador',
            company: 'Tech Store Online'
          }
        ]
      },
      blog: {
        title: 'Contenido y guías',
        cta: 'Ver todo el blog',
        posts: [
          {
            title: 'Cómo hacer SEO para tu tienda online sin complicarte',
            excerpt: 'Guía práctica para empezar con SEO en ecommerce sin necesidad de ser experto técnico.',
            date: '15 Mar 2024',
            image: '/placeholder.svg'
          },
          {
            title: 'WordPress vs Shopify: ¿cuál elegir para tu negocio?',
            excerpt: 'Comparación simple entre las dos plataformas más populares para crear tu tienda online.',
            date: '8 Mar 2024',
            image: '/placeholder.svg'
          },
          {
            title: 'Pauta en Google Ads: inversión mínima para empezar',
            excerpt: 'Todo lo que necesitas saber para lanzar tu primera campaña de Google Shopping.',
            date: '1 Mar 2024',
            image: '/placeholder.svg'
          }
        ]
      },
      contact: {
        title: 'Hablemos',
        form: {
          name: 'Nombre',
          email: 'Correo electrónico',
          message: 'Mensaje',
          consent: 'Acepto la política de privacidad y el tratamiento de mis datos',
          submit: 'Enviar mensaje'
        },
        quickLinks: {
          title: 'Contacto rápido',
          whatsapp: 'WhatsApp',
          email: 'Email',
          calendly: 'Agendar llamada',
          linkedin: 'LinkedIn',
          instagram: 'Instagram',
          twitter: 'X (Twitter)'
        }
      }
    },
    en: {
      nav: {
        inicio: 'Home',
        sobreMi: 'About me',
        servicios: 'Services',
        anuncios: 'Ads',
        testimonios: 'Testimonials',
        contenido: 'Content',
        contacto: 'Contact',
        cta: 'Schedule call'
      },
      hero: {
        name: 'Maria Fer Calderón',
        subtitle: 'Marketing strategy and SEO for online stores, focused on results that are easy to understand.',
        bullets: [
          '6+ years leading digital marketing',
          'Ecommerce SEO',
          'WordPress Sites'
        ],
        primaryCta: 'Message me on WhatsApp',
        secondaryCta: 'Send an email'
      },
      about: {
        title: 'About me',
        description: 'Marketing and commercial strategy professional. 6 years leading digital marketing teams and SEO projects. I focus on creating useful and enjoyable web experiences for people and ensuring that every action is clear and measurable. I work with you as a strategic partner, not just a provider.',
        values: [
          { icon: CheckCircle, text: 'Transparency in every project' },
          { icon: Users, text: 'Close and direct communication' },
          { icon: TrendingUp, text: 'Priority on sales and results' }
        ]
      },
      services: {
        title: 'Services I offer',
        items: [
          {
            title: 'Ecommerce SEO',
            description: 'Attract more customers and sell more with a simple plan to understand.',
            cta: 'View service',
            link: '/en/services/ecommerce-seo'
          },
          {
            title: 'Web design',
            description: 'Beautiful, fast and easy-to-use sites on any device. WordPress + Divi.',
            cta: 'View service',
            link: '/en/services/web-design'
          },
          {
            title: 'Digital advertising',
            description: 'Campaigns on Google, Shopping, Meta, TikTok and LinkedIn to generate sales.',
            cta: 'View service',
            link: '/en/services/ads'
          }
        ],
        allServices: 'View all services'
      },
      banners: {
        title: 'Ads and collaborations',
        note: 'We only work with brands aligned with our values.',
        sponsored: 'Sponsored'
      },
      results: {
        title: 'Results',
        kpis: [
          { value: '50+', label: 'Satisfied clients' },
          { value: '+150%', label: 'Increase in organic traffic' },
          { value: '+200%', label: 'More online store sales' },
          { value: '100+', label: 'New customers every month' }
        ],
        cta: 'View case studies'
      },
      testimonials: {
        title: 'What they say about my work',
        items: [
          {
            text: 'Maria Fer transformed our SEO strategy. In 6 months we doubled our organic sales and the team perfectly understands what we are doing and why.',
            author: 'Carlos Mendoza',
            role: 'Commercial Director',
            company: 'Fashion Store LatAm'
          },
          {
            text: 'Her ability to explain complex concepts simply is exceptional. Our website is now fast, beautiful and functional. The results came faster than expected.',
            author: 'Ana Gutiérrez',
            role: 'CEO',
            company: 'Ecommerce Beauty'
          },
          {
            text: 'Working with Maria Fer is like having a strategic partner on your team. She is always available, transparent with numbers and focuses on what really matters: selling more.',
            author: 'Roberto Silva',
            role: 'Founder',
            company: 'Tech Store Online'
          }
        ]
      },
      blog: {
        title: 'Content and guides',
        cta: 'View all blog',
        posts: [
          {
            title: 'How to do SEO for your online store without complications',
            excerpt: 'Practical guide to start with ecommerce SEO without needing to be a technical expert.',
            date: 'Mar 15, 2024',
            image: '/placeholder.svg'
          },
          {
            title: 'WordPress vs Shopify: which one to choose for your business?',
            excerpt: 'Simple comparison between the two most popular platforms to create your online store.',
            date: 'Mar 8, 2024',
            image: '/placeholder.svg'
          },
          {
            title: 'Google Ads: minimum investment to start',
            excerpt: 'Everything you need to know to launch your first Google Shopping campaign.',
            date: 'Mar 1, 2024',
            image: '/placeholder.svg'
          }
        ]
      },
      contact: {
        title: "Let's talk",
        form: {
          name: 'Name',
          email: 'Email',
          message: 'Message',
          consent: 'I accept the privacy policy and the processing of my data',
          submit: 'Send message'
        },
        quickLinks: {
          title: 'Quick contact',
          whatsapp: 'WhatsApp',
          email: 'Email',
          calendly: 'Schedule call',
          linkedin: 'LinkedIn',
          instagram: 'Instagram',
          twitter: 'X (Twitter)'
        }
      }
    }
  };

  const t = content[lang];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % t.testimonials.items.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + t.testimonials.items.length) % t.testimonials.items.length);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Nexa', 'Inter', sans-serif" }}>
      {/* SEO Meta Tags */}
      <title>{lang === 'es' ? 'Maria Fer Calderón – Autora y contacto | Ferova Agency' : 'Maria Fer Calderón – Author and contact | Ferova Agency'}</title>
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Maria Fer Calderón",
          "jobTitle": "Digital Marketing & SEO Specialist",
          "image": "/img/maria-fer.jpg",
          "email": "contacto@ferova.agency",
          "url": "https://ferova.agency/sobre-maria-fer",
          "sameAs": [
            "https://www.linkedin.com/in/mariafer-calderon",
            "https://www.instagram.com/ferova.agency",
            "https://twitter.com/ferova_agency"
          ]
        })}
      </script>

      {/* Header Local */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold" style={{ color: '#541014' }}>
              Ferova
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <button onClick={() => scrollToSection('inicio')} className="text-neutral-700 hover:text-[#541014] transition-colors">
                {t.nav.inicio}
              </button>
              <button onClick={() => scrollToSection('sobre-mi')} className="text-neutral-700 hover:text-[#541014] transition-colors">
                {t.nav.sobreMi}
              </button>
              <button onClick={() => scrollToSection('servicios')} className="text-neutral-700 hover:text-[#541014] transition-colors">
                {t.nav.servicios}
              </button>
              <button onClick={() => scrollToSection('anuncios')} className="text-neutral-700 hover:text-[#541014] transition-colors">
                {t.nav.anuncios}
              </button>
              <button onClick={() => scrollToSection('testimonios')} className="text-neutral-700 hover:text-[#541014] transition-colors">
                {t.nav.testimonios}
              </button>
              <button onClick={() => scrollToSection('contenido')} className="text-neutral-700 hover:text-[#541014] transition-colors">
                {t.nav.contenido}
              </button>
              <button onClick={() => scrollToSection('contacto')} className="text-neutral-700 hover:text-[#541014] transition-colors">
                {t.nav.contacto}
              </button>
              
              <a
                href="https://calendly.com/tu-enlace"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C0930E] text-black rounded-full px-6 py-3 font-semibold shadow-md hover:opacity-90 focus:ring-2 focus:ring-[#C0930E]/40 transition-all"
              >
                {t.nav.cta}
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-[#541014]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-neutral-200">
              <div className="flex flex-col gap-4">
                <button onClick={() => scrollToSection('inicio')} className="text-left text-neutral-700 hover:text-[#541014] py-2">
                  {t.nav.inicio}
                </button>
                <button onClick={() => scrollToSection('sobre-mi')} className="text-left text-neutral-700 hover:text-[#541014] py-2">
                  {t.nav.sobreMi}
                </button>
                <button onClick={() => scrollToSection('servicios')} className="text-left text-neutral-700 hover:text-[#541014] py-2">
                  {t.nav.servicios}
                </button>
                <button onClick={() => scrollToSection('anuncios')} className="text-left text-neutral-700 hover:text-[#541014] py-2">
                  {t.nav.anuncios}
                </button>
                <button onClick={() => scrollToSection('testimonios')} className="text-left text-neutral-700 hover:text-[#541014] py-2">
                  {t.nav.testimonios}
                </button>
                <button onClick={() => scrollToSection('contenido')} className="text-left text-neutral-700 hover:text-[#541014] py-2">
                  {t.nav.contenido}
                </button>
                <button onClick={() => scrollToSection('contacto')} className="text-left text-neutral-700 hover:text-[#541014] py-2">
                  {t.nav.contacto}
                </button>
                <a
                  href="https://calendly.com/tu-enlace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C0930E] text-black text-center rounded-full px-6 py-3 font-semibold"
                >
                  {t.nav.cta}
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 md:pt-32 pb-12 md:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Mobile: Photo First */}
          <div className="flex justify-center mb-8 md:hidden">
            <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 shadow-xl" style={{ borderColor: '#C0930E' }}>
              <img 
                src="/img/maria-fer.jpg" 
                alt="Maria Fer Calderón" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center">
            {/* Left Column - Content */}
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-center md:text-left" style={{ color: '#541014' }}>
                {t.hero.name}
              </h1>
              <p className="text-base md:text-xl text-neutral-700 mb-6 md:mb-8 leading-relaxed text-center md:text-left">
                {t.hero.subtitle}
              </p>
              
              {/* Contact & Social Links - Prominent */}
              <div className="mb-6 md:mb-8 p-4 md:p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
                <p className="text-sm font-semibold text-neutral-600 mb-3 text-center md:text-left">
                  {lang === 'es' ? 'Contacto directo' : 'Direct contact'}
                </p>
                
                {/* Contact buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                  <a
                    href="https://wa.me/57XXXXXXXXXX?text=Hola%20Maria%20Fer%2C%20me%20gustaría%20hablar%20contigo."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#C0930E] text-black rounded-full px-4 py-2.5 font-semibold shadow-sm hover:opacity-90 transition-all inline-flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                  <a
                    href="mailto:contacto@ferova.agency"
                    className="flex-1 border-2 border-[#2F2D56] text-[#2F2D56] rounded-full px-4 py-2.5 font-semibold hover:bg-neutral-100 transition-all inline-flex items-center justify-center gap-2 text-sm"
                  >
                    <Mail size={18} />
                    Email
                  </a>
                  <a
                    href="https://calendly.com/tu-enlace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border-2 border-[#C0930E] text-[#C0930E] rounded-full px-4 py-2.5 font-semibold hover:bg-[#C0930E]/10 transition-all inline-flex items-center justify-center gap-2 text-sm"
                  >
                    <Calendar size={18} />
                    {lang === 'es' ? 'Agendar' : 'Schedule'}
                  </a>
                </div>

                {/* Social Media */}
                <div className="flex justify-center md:justify-start gap-3">
                  <a
                    href="https://www.linkedin.com/in/mariafer-calderon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white rounded-full border border-neutral-200 hover:border-[#C0930E] hover:bg-[#C0930E]/10 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} style={{ color: '#541014' }} />
                  </a>
                  <a
                    href="https://www.instagram.com/ferova.agency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white rounded-full border border-neutral-200 hover:border-[#C0930E] hover:bg-[#C0930E]/10 transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} style={{ color: '#541014' }} />
                  </a>
                  <a
                    href="https://twitter.com/ferova_agency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white rounded-full border border-neutral-200 hover:border-[#C0930E] hover:bg-[#C0930E]/10 transition-all"
                    aria-label="X (Twitter)"
                  >
                    <Twitter size={20} style={{ color: '#541014' }} />
                  </a>
                </div>
              </div>

              {/* Bullets */}
              <div className="space-y-2 md:space-y-3">
                {t.hero.bullets.map((bullet, index) => (
                  <div key={index} className="flex items-center gap-2 md:gap-3">
                    <CheckCircle size={18} className="flex-shrink-0" style={{ color: '#C0930E' }} />
                    <span className="text-sm md:text-base text-neutral-700">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Photo (Desktop only) */}
            <div className="hidden md:flex justify-center">
              <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden border-4 shadow-xl" style={{ borderColor: '#C0930E' }}>
                <img 
                  src="/img/maria-fer.jpg" 
                  alt="Maria Fer Calderón" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveSeparator color="white" />

      {/* About Section */}
      <section id="sobre-mi" className="py-12 md:py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#541014' }}>
            {t.about.title}
          </h2>
          <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-8 md:mb-12 text-center px-4">
            {t.about.description}
          </p>
          
          {/* Values */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {t.about.values.map((value, index) => (
              <Card key={index} className="border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 md:p-6 text-center">
                  <value.icon size={28} className="mx-auto mb-3 md:mb-4" style={{ color: '#C0930E' }} />
                  <p className="text-sm md:text-base text-neutral-700 font-medium">{value.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <WaveSeparator color="white" flip />

      {/* Services Section */}
      <section id="servicios" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center" style={{ color: '#541014' }}>
            {t.services.title}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
            {t.services.items.map((service, index) => (
              <Card key={index} className="rounded-xl md:rounded-2xl border-neutral-200 shadow-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: '#2F2D56' }}>
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-700 mb-4 md:mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 text-[#C0930E] font-semibold hover:underline text-sm md:text-base"
                  >
                    {service.cta}
                    <ArrowRight size={16} />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/servicios"
              className="bg-[#C0930E] text-black rounded-full px-6 md:px-8 py-3 md:py-4 font-semibold shadow-md hover:opacity-90 focus:ring-2 focus:ring-[#C0930E]/40 transition-all inline-block text-sm md:text-base"
            >
              {t.services.allServices}
            </Link>
          </div>
        </div>
      </section>

      <WaveSeparator color="white" />

      {/* Banners Section - Subtle */}
      <section id="anuncios" className="py-12 md:py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-6">
            <p className="text-xs md:text-sm text-neutral-500 mb-1">
              {t.banners.note}
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            {/* Banner 1 - Horizontal (Mobile optimized) */}
            <div className="relative rounded-xl overflow-hidden shadow-sm border border-neutral-200">
              <div className="aspect-[16/5] md:aspect-[4/1] bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-xs text-neutral-400 mb-1">{t.banners.sponsored}</p>
                  <p className="text-xs md:text-sm text-neutral-500">{lang === 'es' ? 'Espacio publicitario' : 'Ad space'}</p>
                </div>
              </div>
            </div>

            {/* Banners 2 & 3 - Mobile: Single column, Desktop: Two columns */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="relative rounded-xl overflow-hidden shadow-sm border border-neutral-200">
                <div className="aspect-[16/9] md:aspect-[1/2] bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center">
                  <div className="text-center p-4">
                    <p className="text-xs text-neutral-400 mb-1">{t.banners.sponsored}</p>
                    <p className="text-xs md:text-sm text-neutral-500">{lang === 'es' ? 'Espacio publicitario' : 'Ad space'}</p>
                  </div>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-sm border border-neutral-200">
                <div className="aspect-[16/9] md:aspect-[1/2] bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center">
                  <div className="text-center p-4">
                    <p className="text-xs text-neutral-400 mb-1">{t.banners.sponsored}</p>
                    <p className="text-xs md:text-sm text-neutral-500">{lang === 'es' ? 'Espacio publicitario' : 'Ad space'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveSeparator color="white" flip />

      {/* Results Section */}
      <section className="py-12 md:py-20" style={{ backgroundColor: '#2F2D56' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-white">
            {t.results.title}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
            {t.results.kpis.map((kpi, index) => (
              <div key={index} className="text-center p-4 md:p-0">
                <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2" style={{ color: '#C0930E' }}>
                  {kpi.value}
                </div>
                <p className="text-white text-xs md:text-lg">{kpi.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/casos-de-exito"
              className="inline-flex items-center gap-2 text-[#C0930E] font-semibold text-base md:text-lg hover:underline"
            >
              {t.results.cta}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <WaveSeparator color="white" />

      {/* Testimonials Section */}
      <section id="testimonios" className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center" style={{ color: '#541014' }}>
            {t.testimonials.title}
          </h2>

          <div className="relative">
            <Card className="rounded-xl md:rounded-2xl border-neutral-200 shadow-lg">
              <CardContent className="p-6 md:p-12">
                <p className="text-base md:text-xl text-neutral-700 leading-relaxed mb-6 md:mb-8 italic">
                  "{t.testimonials.items[currentTestimonial].text}"
                </p>
                <div>
                  <p className="font-bold text-base md:text-lg" style={{ color: '#2F2D56' }}>
                    {t.testimonials.items[currentTestimonial].author}
                  </p>
                  <p className="text-sm md:text-base text-neutral-600">
                    {t.testimonials.items[currentTestimonial].role} · {t.testimonials.items[currentTestimonial].company}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Arrows */}
            <div className="flex justify-center gap-3 md:gap-4 mt-6 md:mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 md:p-3 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors focus:ring-2 focus:ring-[#C0930E]/40"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} className="md:w-6 md:h-6" style={{ color: '#541014' }} />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 md:p-3 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors focus:ring-2 focus:ring-[#C0930E]/40"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} className="md:w-6 md:h-6" style={{ color: '#541014' }} />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4 md:mt-6">
              {t.testimonials.items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-[#C0930E] w-8' : 'bg-neutral-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaveSeparator color="white" />

      {/* Blog Section */}
      <section id="contenido" className="py-12 md:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center" style={{ color: '#541014' }}>
            {t.blog.title}
          </h2>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
            {t.blog.posts.map((post, index) => (
              <Card key={index} className="rounded-xl md:rounded-2xl border-neutral-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video bg-neutral-200">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4 md:p-6">
                  <p className="text-xs md:text-sm text-neutral-500 mb-2">{post.date}</p>
                  <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3" style={{ color: '#2F2D56' }}>
                    {post.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/blog"
              className="bg-[#C0930E] text-black rounded-full px-6 md:px-8 py-3 md:py-4 font-semibold shadow-md hover:opacity-90 focus:ring-2 focus:ring-[#C0930E]/40 transition-all inline-block text-sm md:text-base"
            >
              {t.blog.cta}
            </Link>
          </div>
        </div>
      </section>

      <WaveSeparator color="white" flip />

      {/* Contact Section */}
      <section id="contacto" className="py-12 md:py-20" style={{ backgroundColor: '#541014' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-white">
            {t.contact.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Quick Links Column */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-white">
                {t.contact.quickLinks.title}
              </h3>
              
              <div className="space-y-3 md:space-y-4">
                <a
                  href="https://wa.me/57XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <MessageCircle size={28} className="flex-shrink-0 text-white" />
                  <div>
                    <p className="text-white font-semibold text-sm md:text-base">{t.contact.quickLinks.whatsapp}</p>
                    <p className="text-neutral-200 text-xs md:text-sm">+57 XXX XXX XXXX</p>
                  </div>
                </a>

                <a
                  href="mailto:contacto@ferova.agency"
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <Mail size={28} className="flex-shrink-0 text-white" />
                  <div>
                    <p className="text-white font-semibold text-sm md:text-base">{t.contact.quickLinks.email}</p>
                    <p className="text-neutral-200 text-xs md:text-sm">contacto@ferova.agency</p>
                  </div>
                </a>

                <a
                  href="https://calendly.com/tu-enlace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <Calendar size={28} className="flex-shrink-0 text-white" />
                  <div>
                    <p className="text-white font-semibold text-sm md:text-base">{t.contact.quickLinks.calendly}</p>
                    <p className="text-neutral-200 text-xs md:text-sm">Reserva un espacio</p>
                  </div>
                </a>

                {/* Social Links */}
                <div className="flex gap-3 md:gap-4 pt-2 md:pt-4">
                  <a
                    href="https://www.linkedin.com/in/mariafer-calderon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 md:p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} className="md:w-6 md:h-6 text-white" />
                  </a>
                  <a
                    href="https://www.instagram.com/ferova.agency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 md:p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} className="md:w-6 md:h-6 text-white" />
                  </a>
                  <a
                    href="https://twitter.com/ferova_agency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 md:p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="X (Twitter)"
                  >
                    <Twitter size={20} className="md:w-6 md:h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div>
              <form className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2 text-sm md:text-base">
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-neutral-300 focus:border-[#C0930E] focus:ring-2 focus:ring-[#C0930E]/40 transition-colors text-sm md:text-base"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2 text-sm md:text-base">
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-neutral-300 focus:border-[#C0930E] focus:ring-2 focus:ring-[#C0930E]/40 transition-colors text-sm md:text-base"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2 text-sm md:text-base">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-neutral-300 focus:border-[#C0930E] focus:ring-2 focus:ring-[#C0930E]/40 transition-colors resize-none text-sm md:text-base"
                    placeholder="Cuéntame sobre tu proyecto..."
                  />
                </div>

                <div className="flex items-start gap-2 md:gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    className="mt-1 w-4 h-4 md:w-5 md:h-5 flex-shrink-0 rounded border-white/20 bg-white/10 text-[#C0930E] focus:ring-2 focus:ring-[#C0930E]/40"
                  />
                  <label htmlFor="consent" className="text-xs md:text-sm text-neutral-200">
                    {t.contact.form.consent}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C0930E] text-black rounded-full px-6 py-3 md:py-4 font-semibold shadow-md hover:opacity-90 focus:ring-2 focus:ring-[#C0930E]/40 transition-all text-sm md:text-base"
                >
                  {t.contact.form.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Floating Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 shadow-lg">
        <div className="grid grid-cols-2 gap-px bg-neutral-200">
          <a
            href="https://wa.me/57XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white py-4 hover:bg-neutral-50 transition-colors"
            style={{ color: '#541014' }}
          >
            <MessageCircle size={20} />
            <span className="font-semibold">WhatsApp</span>
          </a>
          <a
            href="https://calendly.com/tu-enlace"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-4 font-semibold transition-colors"
            style={{ backgroundColor: '#C0930E', color: '#000000' }}
          >
            <Calendar size={20} />
            <span>{lang === 'es' ? 'Agendar' : 'Schedule'}</span>
          </a>
        </div>
      </div>

      {/* Spacing for mobile floating bar */}
      <div className="lg:hidden h-16" />
    </div>
  );
};

export default SobreMariaFer;
