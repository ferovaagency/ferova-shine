import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import WaveSeparator from '@/components/ui/wave-separator';
import { Users, Target, Lightbulb, Award, TrendingUp, Globe, Heart, Zap } from 'lucide-react';

interface SobreNosotrosProps {
  lang?: 'es' | 'en';
}

const SobreNosotros = ({ lang = 'es' }: SobreNosotrosProps) => {
  const content = {
    es: {
      title: 'Sobre nosotros',
      subtitle: 'Somos Ferova Agency, una agencia boutique especializada en SEO para e-commerce. Trabajamos con equipos pequeños para generar un impacto grande.',
      breadcrumb: 'Sobre nosotros',
      cta: 'Conozcamos tu tienda',
      story: {
        title: 'Nuestra historia',
        content: 'Ferova Agency nació de la necesidad de ofrecer servicios de SEO realmente especializados en e-commerce. Después de años trabajando con tiendas online en Latinoamérica y Estados Unidos, Maria Fer Calderon decidió crear una agencia boutique que se enfoca en resultados medibles y crecimiento sostenible.'
      },
      founder: {
        name: 'Maria Fer Calderon',
        title: 'Founder & SEO Strategist',
        bio: 'Con más de 8 años de experiencia en SEO y marketing digital, Maria Fer ha ayudado a decenas de e-commerces a crecer de forma orgánica. Su expertise abarca desde startups hasta empresas consolidadas en mercados competitivos como Estados Unidos, Colombia, México y Argentina.',
        experience: [
          'Más de 50 proyectos de SEO para e-commerce',
          'Especialista en mercados LatAm y USA',
          'Certificada en Google Analytics y Search Console',
          'Speaker en eventos de marketing digital'
        ]
      },
      values: [
        {
          icon: Target,
          title: 'Claridad',
          description: 'Comunicamos de manera simple y directa. Nada de jerga técnica innecesaria.'
        },
        {
          icon: TrendingUp,
          title: 'Impacto',
          description: 'Nos enfocamos en métricas que realmente importan para tu negocio: tráfico y ventas.'
        },
        {
          icon: Heart,
          title: 'Partnership',
          description: 'Trabajamos como una extensión de tu equipo, no como un proveedor externo.'
        },
        {
          icon: Zap,
          title: 'Agilidad',
          description: 'Equipo pequeño, decisiones rápidas, implementación ágil.'
        }
      ],
      methodology: {
        title: 'Nuestra metodología',
        description: 'Un enfoque probado que combina análisis profundo, estrategia personalizada y ejecución meticulosa.',
        steps: [
          {
            title: 'Customer Journey Mapping',
            description: 'Analizamos cada etapa del recorrido del cliente para identificar oportunidades de optimización y puntos de fricción.'
          },
          {
            title: 'Auditoría SEO Integral',
            description: 'Evaluación técnica completa que incluye crawlabilidad, indexación, Core Web Vitals y arquitectura de información.'
          },
          {
            title: 'Implementación & Monitoreo',
            description: 'Ejecución de optimizaciones on-page, creación de contenido estratégico y construcción de autoridad mediante link building.'
          }
        ]
      },
      stats: [
        { number: '50+', label: 'Proyectos completados' },
        { number: '128%', label: 'Crecimiento promedio en revenue' },
        { number: '6', label: 'Países donde operamos' },
        { number: '95%', label: 'Clientes que recomiendan' }
      ]
    },
    en: {
      title: 'About us',
      subtitle: 'We are Ferova Agency, a boutique agency specialized in SEO for e-commerce. We work with small teams to generate a big impact.',
      breadcrumb: 'About us',
      cta: 'Let\'s get to know your store',
      story: {
        title: 'Our story',
        content: 'Ferova Agency was born from the need to offer truly specialized SEO services in e-commerce. After years working with online stores in Latin America and the United States, Maria Fer Calderon decided to create a boutique agency that focuses on measurable results and sustainable growth.'
      },
      founder: {
        name: 'Maria Fer Calderon',
        title: 'Founder & SEO Strategist',
        bio: 'With more than 8 years of experience in SEO and digital marketing, Maria Fer has helped dozens of e-commerces grow organically. Her expertise spans from startups to established companies in competitive markets like the United States, Colombia, Mexico and Argentina.',
        experience: [
          'More than 50 e-commerce SEO projects',
          'Specialist in LatAm and USA markets',
          'Google Analytics and Search Console certified',
          'Speaker at digital marketing events'
        ]
      },
      values: [
        {
          icon: Target,
          title: 'Clarity',
          description: 'We communicate in a simple and direct way. No unnecessary technical jargon.'
        },
        {
          icon: TrendingUp,
          title: 'Impact',
          description: 'We focus on metrics that really matter for your business: traffic and sales.'
        },
        {
          icon: Heart,
          title: 'Partnership',
          description: 'We work as an extension of your team, not as an external provider.'
        },
        {
          icon: Zap,
          title: 'Agility',
          description: 'Small team, quick decisions, agile implementation.'
        }
      ],
      methodology: {
        title: 'Our methodology',
        description: 'A proven approach that combines deep analysis, personalized strategy and meticulous execution.',
        steps: [
          {
            title: 'Customer Journey Mapping',
            description: 'We analyze each stage of the customer journey to identify optimization opportunities and friction points.'
          },
          {
            title: 'Comprehensive SEO Audit',
            description: 'Complete technical evaluation that includes crawlability, indexation, Core Web Vitals and information architecture.'
          },
          {
            title: 'Implementation & Monitoring',
            description: 'Execution of on-page optimizations, strategic content creation and authority building through link building.'
          }
        ]
      },
      stats: [
        { number: '50+', label: 'Completed projects' },
        { number: '128%', label: 'Average revenue growth' },
        { number: '6', label: 'Countries where we operate' },
        { number: '95%', label: 'Clients who recommend us' }
      ]
    }
  };

  const data = content[lang];

  return (
    <>
      <Header currentLang={lang} />
      <main className="min-h-screen">
        {/* Breadcrumbs */}
        <section className="pt-24 pb-8 bg-background">
          <div className="container mx-auto px-6">
            <nav className="text-sm text-muted-foreground mb-4">
              <Link to={lang === 'es' ? '/' : '/en'} className="hover:text-gold transition-colors">
                {lang === 'es' ? 'Inicio' : 'Home'}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{data.breadcrumb}</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up">
                {data.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed animate-fade-up">
                {data.subtitle}
              </p>
            </div>
          </div>
        </section>

        <WaveSeparator className="text-surface" />

        {/* Stats Section */}
        <section className="py-16 bg-surface">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {data.stats.map((stat, index) => (
                <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WaveSeparator className="text-background" flip />

        {/* Story Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {data.story.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {data.story.content}
                </p>
              </div>
              
              <div className="animate-fade-up">
                <div className="glass-card p-8 rounded-2xl">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-12 h-12 text-gold-contrast" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {lang === 'es' ? 'Agencia Boutique' : 'Boutique Agency'}
                    </h3>
                    <p className="text-muted-foreground">
                      {lang === 'es' 
                        ? 'Equipo especializado, atención personalizada'
                        : 'Specialized team, personalized attention'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WaveSeparator className="text-surface" />

        {/* Founder Section */}
        <section className="py-24 bg-surface">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-up">
                <div className="aspect-square bg-gradient-subtle rounded-2xl flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-gold rounded-full flex items-center justify-center">
                    <Users className="w-16 h-16 text-gold-contrast" />
                  </div>
                </div>
              </div>
              
              <div className="animate-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {data.founder.name}
                </h2>
                <h3 className="text-gold text-lg font-semibold mb-6">
                  {data.founder.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {data.founder.bio}
                </p>
                
                <ul className="space-y-3">
                  {data.founder.experience.map((item, index) => (
                    <li key={index} className="flex items-center text-foreground">
                      <Award className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <WaveSeparator className="text-background" flip />

        {/* Values Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {lang === 'es' ? 'Nuestros valores' : 'Our values'}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={index}
                    className="glass-card p-6 hover-lift text-center animate-fade-up rounded-2xl"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-gold-contrast" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <WaveSeparator className="text-surface" />

        {/* Methodology Section */}
        <section className="py-24 bg-surface">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {data.methodology.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {data.methodology.description}
              </p>
            </div>

            <div className="space-y-12">
              {data.methodology.steps.map((step, index) => (
                <div
                  key={index}
                  className="glass-card p-8 hover-lift animate-fade-up rounded-2xl"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-gold-contrast">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WaveSeparator className="text-background" flip />

        {/* CTA Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {lang === 'es' ? '¿Trabajamos juntos?' : 'Shall we work together?'}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {lang === 'es' 
                ? 'Agenda una llamada para conocer tu proyecto y ver cómo podemos ayudarte a crecer.'
                : 'Schedule a call to learn about your project and see how we can help you grow.'
              }
            </p>
            <button className="btn-gold">
              {data.cta}
            </button>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default SobreNosotros;