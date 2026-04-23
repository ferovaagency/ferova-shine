import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { AnimatedSection, StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { Mail, Newspaper, Star, Search, Rocket, ExternalLink, LucideIcon } from 'lucide-react';

interface Props { lang?: 'es' | 'en' | 'pt'; }

type Currency = 'usd' | 'cop' | 'brl';

interface Tool {
  id: string;
  icon: LucideIcon;
  isPaid: boolean;
  title: { es: string; en: string; pt: string };
  desc: { es: string; en: string; pt: string };
  cta: { es: string; en: string; pt: string };
  // Para herramientas de pago: precios y links por moneda
  prices?: Record<Currency, { amount: string; link: string }>;
  // Para herramientas gratuitas: link único
  freeLink?: string;
}

const tools: Tool[] = [
  {
    id: 'briefing',
    icon: Newspaper,
    isPaid: true,
    title: {
      es: 'Briefing de Newsletters',
      en: 'Newsletter Briefing',
      pt: 'Briefing de Newsletters',
    },
    desc: {
      es: 'Recibe las noticias más relevantes de tu sector organizadas para ti: las más importantes, las más relevantes y las que puedes usar directamente en tu estrategia de LinkedIn.',
      en: 'Get the most relevant news from your sector organized for you: the most important, the most relevant, and those you can use directly in your LinkedIn strategy.',
      pt: 'Receba as notícias mais relevantes do seu setor organizadas para você: as mais importantes, as mais relevantes e as que você pode usar diretamente na sua estratégia do LinkedIn.',
    },
    cta: { es: 'Suscribirse', en: 'Subscribe', pt: 'Assinar' },
    prices: {
      cop: {
        amount: '$5.000',
        link: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=dd350ce33a264d4591e12732a7397342',
      },
      usd: {
        amount: '$5',
        link: 'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-81M51707BX2112049NHVKSLQ',
      },
      brl: {
        amount: 'R$25',
        link: 'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-81M51707BX2112049NHVKSLQ',
      },
    },
  },
  {
    id: 'newsletter-pro',
    icon: Star,
    isPaid: true,
    title: {
      es: 'Newsletter Pro',
      en: 'Newsletter Pro',
      pt: 'Newsletter Pro',
    },
    desc: {
      es: 'Accede al newsletter premium semanal con estrategias avanzadas de SEO, e-commerce y marketing digital. Contenido exclusivo para negocios que quieren crecer en serio.',
      en: 'Access the weekly premium newsletter with advanced SEO, e-commerce and digital marketing strategies. Exclusive content for businesses serious about growth.',
      pt: 'Acesse o newsletter premium semanal com estratégias avançadas de SEO, e-commerce e marketing digital. Conteúdo exclusivo para negócios que querem crescer de verdade.',
    },
    cta: { es: 'Suscribirse', en: 'Subscribe', pt: 'Assinar' },
    prices: {
      cop: {
        amount: '$5.000',
        link: 'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-2KW71581AT851093LNHVKN7A',
      },
      usd: {
        amount: '$9',
        link: 'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-2KW71581AT851093LNHVKN7A',
      },
      brl: {
        amount: 'R$45',
        link: 'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-2KW71581AT851093LNHVKN7A',
      },
    },
  },
  {
    id: 'diagnostico',
    icon: Search,
    isPaid: false,
    title: {
      es: '¿Por qué no estás vendiendo online?',
      en: "Why aren't you selling online?",
      pt: 'Por que você não está vendendo online?',
    },
    desc: {
      es: 'Responde 8 preguntas rápidas y descubre exactamente qué está bloqueando las ventas de tu negocio online. Diagnóstico inmediato y personalizado.',
      en: "Answer 8 quick questions and discover exactly what's blocking your online business sales. Immediate and personalized diagnosis.",
      pt: 'Responda 8 perguntas rápidas e descubra exatamente o que está bloqueando as vendas do seu negócio online. Diagnóstico imediato e personalizado.',
    },
    cta: { es: 'Hacer diagnóstico', en: 'Start diagnosis', pt: 'Fazer diagnóstico' },
    freeLink: 'https://el-desbloqueador-digital.lovable.app/',
  },
  {
    id: 'plan-accion',
    icon: Rocket,
    isPaid: false,
    title: {
      es: 'Plan de acción para comenzar a vender online',
      en: 'Action plan to start selling online',
      pt: 'Plano de ação para começar a vender online',
    },
    desc: {
      es: 'Completa un formulario corto y recibe 5 acciones específicas y concretas para arrancar tu negocio online. Sin rodeos, sin teoría — solo pasos que puedes ejecutar hoy.',
      en: 'Fill out a short form and receive 5 specific and concrete actions to launch your online business. No fluff, no theory — just steps you can take today.',
      pt: 'Preencha um formulário curto e receba 5 ações específicas e concretas para lançar seu negócio online. Sem rodeios, sem teoria — apenas passos que você pode executar hoje.',
    },
    cta: { es: 'Obtener mi plan', en: 'Get my plan', pt: 'Obter meu plano' },
    freeLink: 'https://hola-plan-digital.lovable.app',
  },
];

// Herramientas de afiliados reales
const toolsData = {
  es: [
    {
      name: 'Divi',
      desc: 'El constructor visual de WordPress más poderoso. Crea sitios profesionales sin código con IA integrada. Usado por millones de diseñadores.',
      badge: 'Constructor Web',
      emoji: '🎨',
      link: 'https://www.elegantthemes.com/affiliates/idevaffiliate.php?id=81483',
      color: 'text-blue-400',
    },
    {
      name: 'Hostgator',
      desc: 'Hosting con servidores en Colombia, dominio gratis y planes con IA. La opción más confiable para sitios y tiendas en Colombia.',
      badge: 'Hosting Colombia',
      emoji: '🚀',
      link: 'https://www.hostgator.la/7531.html',
      color: 'text-orange-400',
    },
    {
      name: 'Brevo',
      desc: 'Email marketing, SMS y automatización con IA. La alternativa más completa y económica a Mailchimp para el mercado hispanohablante.',
      badge: 'Email Marketing',
      emoji: '📧',
      link: '#',
      color: 'text-green-400',
    },
    {
      name: 'Timelines.ai',
      desc: 'Gestión profesional de WhatsApp Business con CRM, automatización, inbox compartido y mensajería masiva. Ideal para equipos de ventas.',
      badge: 'WhatsApp CRM',
      emoji: '💬',
      link: 'https://timelines.ai/?red=ferova',
      color: 'text-teal-400',
    },
  ],
  en: [
    {
      name: 'Divi',
      desc: 'The most powerful WordPress visual builder. Create professional websites without code with built-in AI. Used by millions of designers.',
      badge: 'Web Builder',
      emoji: '🎨',
      link: 'https://www.elegantthemes.com/affiliates/idevaffiliate.php?id=81483',
      color: 'text-blue-400',
    },
    {
      name: 'Hostgator',
      desc: 'Hosting with servers in Colombia, free domain and AI-powered plans. The most reliable option for sites and stores in Colombia.',
      badge: 'Hosting Colombia',
      emoji: '🚀',
      link: 'https://www.hostgator.la/7531.html',
      color: 'text-orange-400',
    },
    {
      name: 'Brevo',
      desc: 'Email marketing, SMS and automation with AI. The most complete and affordable alternative to Mailchimp for the Spanish-speaking market.',
      badge: 'Email Marketing',
      emoji: '📧',
      link: '#',
      color: 'text-green-400',
    },
    {
      name: 'Timelines.ai',
      desc: 'Professional WhatsApp Business management with CRM, automation, shared inbox and bulk messaging. Ideal for sales teams.',
      badge: 'WhatsApp CRM',
      emoji: '💬',
      link: 'https://timelines.ai/?red=ferova',
      color: 'text-teal-400',
    },
  ],
};

const Recursos = ({ lang = 'es' }: Props) => {
  const [currency, setCurrency] = useState<Currency>(lang === 'es' ? 'cop' : lang === 'pt' ? 'brl' : 'usd');
  const [emailInput, setEmailInput] = useState('');

  const t = lang === 'es' ? {
    title: 'Biblioteca de Ferova',
    sub: 'Recursos gratuitos y premium para dominar el marketing digital, SEO y e-commerce.',
    sectionTitle: 'Nuestras herramientas',
    sectionSub: 'Herramientas creadas por Ferova Agency para ayudarte a crecer online.',
    toolsTitle: 'Herramientas que usamos y recomendamos',
    toolsSub: 'Al contratarlas por nuestro link de afiliado nos ayudas a seguir creando contenido gratuito — sin costo adicional para ti.',
    paidBadge: 'PAGO', freeBadge: 'GRATIS',
    perPeriod: '/mes', freeLabel: 'Gratis',
    subscribe: 'Suscribirme', emailPlaceholder: 'Tu correo electrónico',
    newsletterTitle: '¿Quieres recibir recursos exclusivos?',
    newsletterSub: 'Suscríbete y recibe contenido de valor cada semana.',
    getDiscount: 'Ver descuento →',
  } : lang === 'pt' ? {
    title: 'Biblioteca da Ferova',
    sub: 'Recursos gratuitos e premium para dominar marketing digital, SEO e e-commerce.',
    sectionTitle: 'Nossas ferramentas',
    sectionSub: 'Ferramentas criadas pela Ferova Agency para ajudar você a crescer online.',
    toolsTitle: 'Ferramentas que usamos e recomendamos',
    toolsSub: 'Ao contratá-las pelo nosso link de afiliado você nos ajuda a continuar criando conteúdo gratuito — sem custo adicional.',
    paidBadge: 'PAGO', freeBadge: 'GRÁTIS',
    perPeriod: '/mês', freeLabel: 'Grátis',
    subscribe: 'Assinar', emailPlaceholder: 'Seu e-mail',
    newsletterTitle: 'Quer receber recursos exclusivos?',
    newsletterSub: 'Assine e receba conteúdo de valor toda semana.',
    getDiscount: 'Ver desconto →',
  } : {
    title: 'Ferova Library',
    sub: 'Free and premium resources to master digital marketing, SEO and e-commerce.',
    sectionTitle: 'Our tools',
    sectionSub: 'Tools created by Ferova Agency to help you grow online.',
    toolsTitle: 'Tools we use and recommend',
    toolsSub: 'By purchasing through our affiliate link you help us keep creating free content — at no extra cost to you.',
    paidBadge: 'PAID', freeBadge: 'FREE',
    perPeriod: '/month', freeLabel: 'Free',
    subscribe: 'Subscribe', emailPlaceholder: 'Your email address',
    newsletterTitle: 'Want exclusive resources?',
    newsletterSub: 'Subscribe and receive valuable content every week.',
    getDiscount: 'Get discount →',
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(lang === 'es' ? '¡Gracias! Te enviamos el recurso pronto.' : lang === 'pt' ? 'Obrigado! Enviaremos o recurso em breve.' : 'Thanks! We\'ll send you the resource soon.');
    setEmailInput('');
  };

  return (
    <PageTransition>
      <Header currentLang={lang} />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.title}</h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">{t.sub}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="flex justify-center mb-4">
                <div className="flex items-center gap-1 p-1 rounded-full border border-border">
                  <button onClick={() => setCurrency('usd')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currency === 'usd' ? 'bg-gold text-black' : 'text-muted-foreground'}`}>USD</button>
                  <button onClick={() => setCurrency('cop')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currency === 'cop' ? 'bg-gold text-black' : 'text-muted-foreground'}`}>COP</button>
                  <button onClick={() => setCurrency('brl')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currency === 'brl' ? 'bg-gold text-black' : 'text-muted-foreground'}`}>BRL</button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Nuestras herramientas */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.sectionTitle}</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">{t.sectionSub}</p>
              </div>
            </AnimatedSection>

            <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const priceData = tool.isPaid ? tool.prices![currency] : null;
                const ctaLink = tool.isPaid ? priceData!.link : tool.freeLink!;
                const badgeText = tool.isPaid ? t.paidBadge : t.freeBadge;
                const badgeClass = tool.isPaid
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700';

                return (
                  <StaggerItem key={tool.id}>
                    <ScaleOnHover>
                      <div className="glass-card rounded-2xl p-6 card-hover flex flex-col gap-4 h-full">
                        {/* Badge + Ícono */}
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeClass}`}>
                            {badgeText}
                          </span>
                        </div>

                        {/* Título y descripción */}
                        <div className="flex-1">
                          <h3 className="font-display font-bold text-foreground text-lg mb-2">
                            {tool.title[lang]}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {tool.desc[lang]}
                          </p>
                        </div>

                        {/* Precio */}
                        {tool.isPaid ? (
                          <p className="text-2xl font-bold text-primary">
                            {priceData!.amount}
                            <span className="text-sm font-normal text-muted-foreground">
                              {t.perPeriod}
                            </span>
                          </p>
                        ) : (
                          <p className="text-2xl font-bold text-green-600">
                            {t.freeLabel}
                          </p>
                        )}

                        {/* CTA */}
                        <a
                          href={ctaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors text-sm"
                        >
                          {tool.cta[lang]}
                        </a>
                      </div>
                    </ScaleOnHover>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Herramientas que usamos y recomendamos */}
        <section className="py-20 md:py-28 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.toolsTitle}</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">{t.toolsSub}</p>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {toolsData[lang === 'pt' ? 'es' : lang].map((tool) => (
                <div key={tool.name} className="glass-card p-6 flex flex-col hover:border-gold/30 transition-all duration-300">
                  <div className="text-4xl mb-3">{tool.emoji}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-bold text-lg ${tool.color}`}>{tool.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tool.badge}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{tool.desc}</p>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full border border-gold/50 text-gold hover:bg-gold/10 text-sm font-semibold text-center transition flex items-center justify-center gap-1"
                  >
                    {t.getDiscount} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <div className="max-w-2xl mx-auto text-center">
                <Mail className="w-12 h-12 mx-auto mb-6 text-gold" />
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">{t.newsletterTitle}</h2>
                <p className="text-lg mb-8 text-muted-foreground">{t.newsletterSub}</p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input type="email" required placeholder={t.emailPlaceholder} value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    className="flex-grow px-5 py-3 rounded-full text-sm focus:outline-none focus:ring-2 transition-all border"
                    style={{ background: 'hsla(243, 28%, 18%, 0.8)', borderColor: 'hsla(243, 20%, 30%, 0.5)', color: 'hsl(0, 0%, 95%)' }}
                  />
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="btn-gold !px-8 !py-3 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" /> {t.subscribe}
                  </motion.button>
                </form>
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

export default Recursos;
