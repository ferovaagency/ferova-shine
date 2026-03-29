import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import ProposalModal from '@/components/ui/proposal-modal';
import { AnimatedSection, StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from '@/components/ui/motion';
import { Check, X, Clock, Zap, MapPin, Palette, ArrowRight, MessageCircle, Timer, Stethoscope, Map, Paintbrush, Globe, ShoppingCart, Search, Rocket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getPaymentLink, type PaymentLinkKey } from '@/lib/payment-links';

interface Props { lang?: 'es' | 'en' | 'pt'; }

interface Plan {
  icon: React.ElementType;
  name: string;
  tagline: string;
  priceUsd: number;
  priceCop: number;
  priceBrl: number;
  recurring?: string;
  includes: { icon: React.ElementType; text: string }[];
  excludes: string[];
  cta: string;
  paymentKey: PaymentLinkKey;
  urgency?: string;
  popular?: boolean;
}

interface Category {
  title: string;
  plans: Plan[];
}

const Precios = ({ lang = 'es' }: Props) => {
  const [currency, setCurrency] = useState<'cop' | 'usd' | 'brl'>('usd');
  const [proposalOpen, setProposalOpen] = useState(false);
  const [proposalService, setProposalService] = useState('');
  const { toast } = useToast();

  const handleCta = (key: PaymentLinkKey) => {
    const link = getPaymentLink(key, currency);
    window.open(link, '_blank', 'noopener,noreferrer');
    toast({
      title: lang === 'pt' ? 'Confirmado!' : lang === 'es' ? '¡Confirmado!' : 'Confirmed!',
      description: lang === 'pt'
        ? 'Agendamento confirmado! Na Ferova Agency estamos prontos para começar.'
        : lang === 'es'
        ? '¡Cita confirmada! En Ferova Agency estamos listos para empezar.'
        : 'Appointment confirmed! At Ferova Agency we are ready to start.',
    });
  };

  const formatPrice = (amount: number) => {
    if (currency === 'brl') return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(amount);
    if (currency === 'cop') return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  const getPrice = (usd: number, cop: number, brl: number) => {
    if (currency === 'brl') return brl;
    if (currency === 'cop') return cop;
    return usd;
  };

  const categories: Category[] = lang === 'pt' ? [
    {
      title: 'Consultorias Virtuais',
      plans: [
        {
          icon: Timer, name: 'Consultoria Express',
          tagline: 'Tem dias que você fica dando voltas em um problema? A Ferova Agency entra no seu negócio para eliminar o ruído e dar a resposta exata.',
          priceUsd: 35, priceCop: 140000, priceBrl: 175,
          includes: [
            { icon: Zap, text: 'Diagnóstico rápido (30 min)' },
            { icon: Stethoscope, text: 'Solução para 1 bloqueio específico' },
            { icon: Clock, text: 'Gravação da sessão' },
          ],
          excludes: ['Implementação técnica', 'Acompanhamento posterior', 'Plano estratégico completo'],
          cta: 'Agendar meu espaço', paymentKey: 'asesoria30',
        },
        {
          icon: Stethoscope, name: 'Consultoria Impacto',
          tagline: 'Não é uma conversa, é uma cirurgia na sua estratégia. A Ferova Agency audita e reconstrói seu roadmap para gerar receita.',
          priceUsd: 55, priceCop: 220000, priceBrl: 275,
          includes: [
            { icon: Zap, text: 'Auditoria de estratégia (60 min)' },
            { icon: ArrowRight, text: 'Plano de ação imediato' },
            { icon: Palette, text: 'Guia de ferramentas recomendadas' },
          ],
          excludes: ['Implementação técnica', 'Gestão de campanhas', 'Design de ativos'],
          cta: 'Falar com um Consultor', paymentKey: 'asesoria60', popular: true,
        },
      ],
    },
    {
      title: 'WebApps',
      plans: [
        {
          icon: Globe, name: 'Web Econômica',
          tagline: 'Site em Lovable com IA integrada. Entrega em 1 semana, sem mensalidades.',
          priceUsd: 599, priceCop: 1800000, priceBrl: 2990,
          recurring: '/ano',
          includes: [
            { icon: Zap, text: 'Domínio incluído' },
            { icon: Globe, text: 'Hospedagem incluída' },
            { icon: MapPin, text: '5 páginas (Início/Serviços/Sobre/Contato)' },
            { icon: MessageCircle, text: 'Botão WhatsApp visível' },
            { icon: Palette, text: 'Formulário de contato' },
            { icon: Stethoscope, text: 'Consultor comercial IA integrado' },
          ],
          excludes: ['Painel de administração', 'Blog', 'Mais de 5 páginas', 'Suporte mensal'],
          cta: 'Solicitar proposta', paymentKey: 'webEconomico',
        },
        {
          icon: Rocket, name: 'WebApp Serviços',
          tagline: 'Web consultiva com IA e painel admin completo. Ideal para empresas de serviços.',
          priceUsd: 899, priceCop: 2800000, priceBrl: 4490,
          recurring: ' construção',
          includes: [
            { icon: Zap, text: 'Hospedagem 1 ano incluída' },
            { icon: Globe, text: '5 páginas principais + até 5 de serviços' },
            { icon: MessageCircle, text: 'Botão WhatsApp visível' },
            { icon: Stethoscope, text: 'Consultor IA integrado' },
            { icon: Palette, text: 'Painel admin com criação de blogs' },
            { icon: Clock, text: 'Suporte mensal R$320 / $65 USD / $200.000 COP' },
          ],
          excludes: ['Loja virtual', 'Mais de 10 páginas', 'Mudanças de estrutura completa'],
          cta: 'Solicitar proposta', paymentKey: 'webServicios', popular: true,
        },
        {
          icon: ShoppingCart, name: 'WebApp E-Commerce',
          tagline: 'Loja virtual completa com IA maximizada para conversão. Painel admin avançado.',
          priceUsd: 1490, priceCop: 4200000, priceBrl: 7490,
          recurring: ' construção',
          includes: [
            { icon: Zap, text: 'Hospedagem 1 ano incluída' },
            { icon: Globe, text: '5 páginas + até 300 produtos' },
            { icon: ShoppingCart, text: 'Filtros / categorias / carrinho / checkout / gateway de pagamento' },
            { icon: Stethoscope, text: 'Consultor IA de vendas' },
            { icon: Palette, text: 'Painel admin avançado (pedidos, produtos, gerador fichas e blogs)' },
            { icon: Clock, text: 'Suporte mensal R$570 / $119 USD / $400.000 COP' },
          ],
          excludes: ['Mudanças de estrutura completa'],
          cta: 'Solicitar proposta', paymentKey: 'webEcommerceFull',
        },
      ],
    },
    {
      title: 'SEO & GEO',
      plans: [
        {
          icon: Search, name: 'SEO WebApps',
          tagline: 'Posicionamento orgânico completo para WebApps em Lovable. Mínimo 6 meses.',
          priceUsd: 199, priceCop: 600000, priceBrl: 990,
          recurring: '/mês',
          includes: [
            { icon: Zap, text: 'Otimização técnica do site' },
            { icon: Globe, text: 'Até 8 blogs mensais otimizados para IAs e Google' },
            { icon: Search, text: 'Otimização On Page e Off Page' },
            { icon: MapPin, text: 'Análise de tráfego orgânico' },
            { icon: Palette, text: 'Tagueamento de eventos no Analytics' },
            { icon: Stethoscope, text: 'Conexão Search Console' },
            { icon: Clock, text: 'Relatório semanal e mensal' },
          ],
          excludes: ['Tráfego pago', 'Gestão de redes sociais', 'Design de ativos'],
          cta: 'Iniciar SEO', paymentKey: 'seoWebapps',
          urgency: 'Mínimo 6 meses de contrato para garantir resultados.',
        },
        {
          icon: Map, name: 'SEO CMS',
          tagline: 'SEO profissional para WordPress e outros CMS. Mínimo 6 meses.',
          priceUsd: 249, priceCop: 800000, priceBrl: 1290,
          recurring: '/mês',
          includes: [
            { icon: Zap, text: 'Tudo do plano SEO WebApps' },
            { icon: Globe, text: 'Adaptado para WordPress, Shopify e outros CMS' },
          ],
          excludes: ['Tráfego pago', 'Gestão de redes sociais'],
          cta: 'Iniciar SEO', paymentKey: 'seoCms',
          urgency: 'Mínimo 6 meses de contrato para garantir resultados.',
        },
      ],
    },
    {
      title: 'SEO & GEO Local',
      plans: [
        {
          icon: Map, name: 'SEO & GEO Local',
          tagline: 'Se você não está no mapa, não existe. A Ferova Agency transforma seu perfil do Google em uma máquina de atrair clientes.',
          priceUsd: 150, priceCop: 600000, priceBrl: 750,
          recurring: '/mês',
          includes: [
            { icon: MapPin, text: 'Otimização do Google Business Profile' },
            { icon: Zap, text: 'Estratégia de 5 keywords locais' },
            { icon: Stethoscope, text: 'Auditoria de visibilidade local' },
          ],
          excludes: ['Tráfego pago (Ads)', 'Criação de conteúdo para redes', 'Design web'],
          cta: 'Iniciar Otimização', paymentKey: 'seoGeoLocal',
          urgency: 'Apenas 3 vagas disponíveis por mês para garantir resultados.',
        },
      ],
    },
    {
      title: 'Branding',
      plans: [
        {
          icon: Paintbrush, name: 'Branding Essential',
          tagline: 'Sua marca é o que dizem de você quando você não está. A Ferova Agency cria uma identidade que projeta autoridade e profissionalismo.',
          priceUsd: 150, priceCop: 600000, priceBrl: 750,
          includes: [
            { icon: Palette, text: 'Logo principal + variações' },
            { icon: Zap, text: 'Paleta de cores + tipografia' },
            { icon: ArrowRight, text: 'Arquivos editáveis (AI/SVG)' },
          ],
          excludes: ['Registro legal de marca', 'Manual de marca estendido', 'Papelaria corporativa'],
          cta: 'Completar Briefing', paymentKey: 'brandingEssential',
        },
      ],
    },
  ] : lang === 'es' ? [
    {
      title: 'Asesorías Virtuales',
      plans: [
        {
          icon: Timer, name: 'Asesoría Express',
          tagline: '¿Llevas días dando vueltas a un problema? Ferova Agency entra en tu negocio para eliminar el ruido y darte la respuesta exacta.',
          priceUsd: 35, priceCop: 140000, priceBrl: 175,
          includes: [
            { icon: Zap, text: 'Diagnóstico rápido (30 min)' },
            { icon: Stethoscope, text: 'Solución a 1 bloqueo específico' },
            { icon: Clock, text: 'Grabación de la sesión' },
          ],
          excludes: ['Implementación técnica', 'Seguimiento posterior', 'Plan estratégico completo'],
          cta: 'Agendar mi espacio', paymentKey: 'asesoria30',
        },
        {
          icon: Stethoscope, name: 'Asesoría Impacto',
          tagline: 'No es una charla, es una cirugía a tu estrategia. Ferova Agency audita y reconstruye tu hoja de ruta para que traiga dinero.',
          priceUsd: 55, priceCop: 220000, priceBrl: 275,
          includes: [
            { icon: Zap, text: 'Auditoría de estrategia (60 min)' },
            { icon: ArrowRight, text: 'Plan de acción inmediato' },
            { icon: Palette, text: 'Guía de herramientas recomendadas' },
          ],
          excludes: ['Implementación técnica', 'Gestión de campañas', 'Diseño de activos'],
          cta: 'Hablar con un Consultor', paymentKey: 'asesoria60', popular: true,
        },
      ],
    },
    {
      title: 'WebApps',
      plans: [
        {
          icon: Globe, name: 'Web Económica',
          tagline: 'Sitio web en Lovable con IA integrada. Entrega en 1 semana, sin mensualidades.',
          priceUsd: 599, priceCop: 1800000, priceBrl: 2990,
          recurring: '/año',
          includes: [
            { icon: Zap, text: 'Dominio incluido' },
            { icon: Globe, text: 'Hosting incluido' },
            { icon: MapPin, text: '5 páginas (Inicio/Servicios/Nosotros/Contacto)' },
            { icon: MessageCircle, text: 'Botón WhatsApp visible' },
            { icon: Palette, text: 'Formulario de contacto' },
            { icon: Stethoscope, text: 'Asesor comercial IA integrado' },
          ],
          excludes: ['Panel de administración', 'Blog', 'Más de 5 páginas', 'Soporte mensual'],
          cta: 'Solicitar propuesta', paymentKey: 'webEconomico',
        },
        {
          icon: Rocket, name: 'WebApp Servicios',
          tagline: 'Web consultiva con funciones avanzadas, IA y panel de administrador.',
          priceUsd: 899, priceCop: 2800000, priceBrl: 4490,
          recurring: ' construcción',
          includes: [
            { icon: Zap, text: 'Hosting 1 año incluido' },
            { icon: Globe, text: '5 páginas principales + hasta 5 de servicios' },
            { icon: MessageCircle, text: 'Botón WhatsApp visible' },
            { icon: Stethoscope, text: 'Asesor IA integrado' },
            { icon: Palette, text: 'Panel admin con creación de blogs' },
            { icon: Clock, text: 'Soporte mensual $200.000 COP / $65 USD / R$320' },
          ],
          excludes: ['Tienda virtual', 'Más de 10 páginas', 'Cambios de estructura completa'],
          cta: 'Solicitar propuesta', paymentKey: 'webServicios', popular: true,
        },
        {
          icon: ShoppingCart, name: 'WebApp E-Commerce',
          tagline: 'Tienda virtual completa con IA maximizada para conversión. Panel admin avanzado.',
          priceUsd: 1490, priceCop: 4200000, priceBrl: 7490,
          recurring: ' construcción',
          includes: [
            { icon: Zap, text: 'Hosting 1 año incluido' },
            { icon: Globe, text: '5 páginas + hasta 300 productos' },
            { icon: ShoppingCart, text: 'Filtros / categorías / carrito / checkout / pasarela de pago' },
            { icon: Stethoscope, text: 'Asesor IA de ventas' },
            { icon: Palette, text: 'Panel admin avanzado (pedidos, productos, generador fichas y blogs)' },
            { icon: Clock, text: 'Soporte mensual $400.000 COP / $119 USD / R$570' },
          ],
          excludes: ['Cambios de estructura completa'],
          cta: 'Solicitar propuesta', paymentKey: 'webEcommerceFull',
        },
      ],
    },
    {
      title: 'SEO & GEO',
      plans: [
        {
          icon: Search, name: 'SEO WebApps',
          tagline: 'Posicionamiento orgánico completo para WebApps en Lovable. Mínimo 6 meses.',
          priceUsd: 199, priceCop: 600000, priceBrl: 990,
          recurring: '/mes',
          includes: [
            { icon: Zap, text: 'Optimización técnica del sitio' },
            { icon: Globe, text: 'Hasta 8 blogs mensuales optimizados para IAs y Google' },
            { icon: Search, text: 'Optimización On Page y Off Page' },
            { icon: MapPin, text: 'Análisis de tráfico orgánico' },
            { icon: Palette, text: 'Tageo de eventos en Analytics' },
            { icon: Stethoscope, text: 'Conexión Search Console' },
            { icon: Clock, text: 'Informe semanal y mensual' },
          ],
          excludes: ['Pauta publicitaria', 'Gestión de redes sociales', 'Diseño de activos'],
          cta: 'Iniciar SEO', paymentKey: 'seoWebapps',
          urgency: 'Mínimo 6 meses de contrato para garantizar resultados.',
        },
        {
          icon: Map, name: 'SEO CMS',
          tagline: 'SEO profesional para WordPress y otros CMS. Mínimo 6 meses.',
          priceUsd: 249, priceCop: 800000, priceBrl: 1290,
          recurring: '/mes',
          includes: [
            { icon: Zap, text: 'Todo lo del plan SEO WebApps' },
            { icon: Globe, text: 'Adaptado para WordPress, Shopify y otros CMS' },
          ],
          excludes: ['Pauta publicitaria', 'Gestión de redes sociales'],
          cta: 'Iniciar SEO', paymentKey: 'seoCms',
          urgency: 'Mínimo 6 meses de contrato para garantizar resultados.',
        },
      ],
    },
    {
      title: 'SEO & GEO Local',
      plans: [
        {
          icon: Map, name: 'SEO & GEO Local',
          tagline: 'Si no estás en el mapa, no existes. Ferova Agency convierte tu perfil de Google en una máquina de atraer clientes.',
          priceUsd: 150, priceCop: 600000, priceBrl: 750,
          recurring: '/mes',
          includes: [
            { icon: MapPin, text: 'Optimización de Google Business Profile' },
            { icon: Zap, text: 'Estrategia de 5 keywords locales' },
            { icon: Stethoscope, text: 'Auditoría de visibilidad local' },
          ],
          excludes: ['Pauta publicitaria (Ads)', 'Creación de contenido para redes', 'Diseño web'],
          cta: 'Iniciar Optimización', paymentKey: 'seoGeoLocal',
          urgency: 'Solo 3 cupos disponibles por mes para garantizar resultados.',
        },
      ],
    },
    {
      title: 'Branding',
      plans: [
        {
          icon: Paintbrush, name: 'Branding Essential',
          tagline: 'Tu marca es lo que dicen de ti cuando no estás. Ferova Agency crea una identidad que proyecta autoridad y profesionalismo.',
          priceUsd: 150, priceCop: 600000, priceBrl: 750,
          includes: [
            { icon: Palette, text: 'Logo principal + variaciones' },
            { icon: Zap, text: 'Paleta de colores + tipografía' },
            { icon: ArrowRight, text: 'Archivos editables (AI/SVG)' },
          ],
          excludes: ['Registro legal de marca', 'Manual de marca extendido', 'Papelería corporativa'],
          cta: 'Completar Briefing', paymentKey: 'brandingEssential',
        },
      ],
    },
  ] : [
    {
      title: 'Virtual Consulting',
      plans: [
        {
          icon: Timer, name: 'Express Consulting',
          tagline: 'Been going back and forth on a problem? Ferova Agency steps into your business to cut the noise and give you the exact answer.',
          priceUsd: 35, priceCop: 140000, priceBrl: 175,
          includes: [
            { icon: Zap, text: 'Quick diagnosis (30 min)' },
            { icon: Stethoscope, text: 'Solution to 1 specific blocker' },
            { icon: Clock, text: 'Session recording' },
          ],
          excludes: ['Technical implementation', 'Follow-up', 'Full strategic plan'],
          cta: 'Book my spot', paymentKey: 'asesoria30',
        },
        {
          icon: Stethoscope, name: 'Impact Consulting',
          tagline: 'It\'s not a chat, it\'s surgery on your strategy. Ferova Agency audits and rebuilds your roadmap to bring in revenue.',
          priceUsd: 55, priceCop: 220000, priceBrl: 275,
          includes: [
            { icon: Zap, text: 'Strategy audit (60 min)' },
            { icon: ArrowRight, text: 'Immediate action plan' },
            { icon: Palette, text: 'Recommended tools guide' },
          ],
          excludes: ['Technical implementation', 'Campaign management', 'Asset design'],
          cta: 'Talk to a Consultant', paymentKey: 'asesoria60', popular: true,
        },
      ],
    },
    {
      title: 'WebApps',
      plans: [
        {
          icon: Globe, name: 'Starter Web',
          tagline: 'Lovable website with integrated AI. 1-week delivery, no monthly fees.',
          priceUsd: 599, priceCop: 1800000, priceBrl: 2990,
          recurring: '/year',
          includes: [
            { icon: Zap, text: 'Domain included' },
            { icon: Globe, text: 'Hosting included' },
            { icon: MapPin, text: '5 pages (Home/Services/About/Contact)' },
            { icon: MessageCircle, text: 'Visible WhatsApp button' },
            { icon: Palette, text: 'Contact form' },
            { icon: Stethoscope, text: 'Integrated AI sales advisor' },
          ],
          excludes: ['Admin panel', 'Blog', 'More than 5 pages', 'Monthly support'],
          cta: 'Request proposal', paymentKey: 'webEconomico',
        },
        {
          icon: Rocket, name: 'Services WebApp',
          tagline: 'Consulting web with AI and full admin panel. Ideal for service businesses.',
          priceUsd: 899, priceCop: 2800000, priceBrl: 4490,
          recurring: ' build',
          includes: [
            { icon: Zap, text: '1-year hosting included' },
            { icon: Globe, text: '5 main pages + up to 5 service pages' },
            { icon: MessageCircle, text: 'Visible WhatsApp button' },
            { icon: Stethoscope, text: 'Integrated AI advisor' },
            { icon: Palette, text: 'Admin panel with blog creation' },
            { icon: Clock, text: 'Monthly support $65 USD / $200,000 COP / R$320' },
          ],
          excludes: ['Online store', 'More than 10 pages', 'Complete structure changes'],
          cta: 'Request proposal', paymentKey: 'webServicios', popular: true,
        },
        {
          icon: ShoppingCart, name: 'E-Commerce WebApp',
          tagline: 'Complete online store with AI maximized for conversion. Advanced admin panel.',
          priceUsd: 1490, priceCop: 4200000, priceBrl: 7490,
          recurring: ' build',
          includes: [
            { icon: Zap, text: '1-year hosting included' },
            { icon: Globe, text: '5 pages + up to 300 products' },
            { icon: ShoppingCart, text: 'Filters / categories / cart / checkout / payment gateway' },
            { icon: Stethoscope, text: 'AI sales advisor' },
            { icon: Palette, text: 'Advanced admin panel (orders, products, listing & blog generator)' },
            { icon: Clock, text: 'Monthly support $119 USD / $400,000 COP / R$570' },
          ],
          excludes: ['Complete structure changes'],
          cta: 'Request proposal', paymentKey: 'webEcommerceFull',
        },
      ],
    },
    {
      title: 'SEO & GEO',
      plans: [
        {
          icon: Search, name: 'SEO WebApps',
          tagline: 'Complete organic positioning for Lovable WebApps. Minimum 6 months.',
          priceUsd: 199, priceCop: 600000, priceBrl: 990,
          recurring: '/mo',
          includes: [
            { icon: Zap, text: 'Technical site optimization' },
            { icon: Globe, text: 'Up to 8 monthly blogs optimized for AIs and Google' },
            { icon: Search, text: 'On Page and Off Page optimization' },
            { icon: MapPin, text: 'Organic traffic analysis' },
            { icon: Palette, text: 'Analytics event tagging' },
            { icon: Stethoscope, text: 'Search Console connection' },
            { icon: Clock, text: 'Weekly and monthly report' },
          ],
          excludes: ['Paid advertising', 'Social media management', 'Asset design'],
          cta: 'Start SEO', paymentKey: 'seoWebapps',
          urgency: 'Minimum 6-month contract to guarantee results.',
        },
        {
          icon: Map, name: 'SEO CMS',
          tagline: 'Professional SEO for WordPress and other CMS. Minimum 6 months.',
          priceUsd: 249, priceCop: 800000, priceBrl: 1290,
          recurring: '/mo',
          includes: [
            { icon: Zap, text: 'Everything in SEO WebApps plan' },
            { icon: Globe, text: 'Adapted for WordPress, Shopify and other CMS' },
          ],
          excludes: ['Paid advertising', 'Social media management'],
          cta: 'Start SEO', paymentKey: 'seoCms',
          urgency: 'Minimum 6-month contract to guarantee results.',
        },
      ],
    },
    {
      title: 'SEO & GEO Local',
      plans: [
        {
          icon: Map, name: 'SEO & GEO Local',
          tagline: 'If you\'re not on the map, you don\'t exist. Ferova Agency turns your Google profile into a client-attracting machine.',
          priceUsd: 150, priceCop: 600000, priceBrl: 750,
          recurring: '/mo',
          includes: [
            { icon: MapPin, text: 'Google Business Profile optimization' },
            { icon: Zap, text: '5 local keyword strategy' },
            { icon: Stethoscope, text: 'Local visibility audit' },
          ],
          excludes: ['Ad spend (Ads)', 'Social media content', 'Web design'],
          cta: 'Start Optimization', paymentKey: 'seoGeoLocal',
          urgency: 'Only 3 spots available per month to guarantee results.',
        },
      ],
    },
    {
      title: 'Branding',
      plans: [
        {
          icon: Paintbrush, name: 'Branding Essential',
          tagline: 'Your brand is what people say about you when you\'re not in the room. Ferova Agency creates an identity that projects authority.',
          priceUsd: 150, priceCop: 600000, priceBrl: 750,
          includes: [
            { icon: Palette, text: 'Main logo + variations' },
            { icon: Zap, text: 'Color palette + typography' },
            { icon: ArrowRight, text: 'Editable files (AI/SVG)' },
          ],
          excludes: ['Legal trademark registration', 'Extended brand manual', 'Corporate stationery'],
          cta: 'Complete Briefing', paymentKey: 'brandingEssential',
        },
      ],
    },
  ];

  const t = lang === 'pt' ? {
    title: 'Planos e Preços',
    sub: 'Serviços desenhados para impulsionar seu negócio com estratégia, clareza e resultados mensuráveis.',
    noInclude: 'Não inclui:',
    faq: 'Perguntas frequentes',
    recommend: 'Recomendado',
    proposal: 'Solicitar proposta personalizada',
    faqs: [
      { q: 'Como agendo uma consultoria?', a: 'Ao clicar no botão, você será redirecionado ao WhatsApp onde coordenaremos data e horário.' },
      { q: 'O SEO Local é um pagamento mensal?', a: 'Sim, o serviço de SEO & GEO Local é uma assinatura mensal para manter seu posicionamento ativo.' },
      { q: 'Quais formatos recebo no Branding?', a: 'Você recebe arquivos editáveis em AI e SVG, além de versões PNG e JPG para uso digital.' },
      { q: 'Vocês oferecem reembolsos?', a: 'Sim, oferecemos garantia de satisfação em todos os nossos serviços.' },
      { q: 'Quanto tempo leva para ver resultados de SEO?', a: 'Os primeiros resultados visíveis aparecem entre 3-6 meses. Resultados significativos entre 6-12 meses.' },
      { q: 'As WebApps incluem domínio e hospedagem?', a: 'Os planos Pro e E-Commerce incluem hospedagem por 1 ano. O plano Web Econômica inclui domínio e hospedagem no preço anual.' },
    ],
  } : lang === 'es' ? {
    title: 'Planes y Precios',
    sub: 'Servicios diseñados para impulsar tu negocio con estrategia, claridad y resultados medibles.',
    noInclude: 'No incluye:',
    faq: 'Preguntas frecuentes',
    recommend: 'Recomendado',
    proposal: 'Solicitar propuesta personalizada',
    faqs: [
      { q: '¿Cómo agendo una asesoría?', a: 'Al hacer clic en el botón, serás redirigido a WhatsApp donde coordinaremos fecha y hora.' },
      { q: '¿El SEO Local es un pago mensual?', a: 'Sí, el servicio de SEO & GEO Local es una suscripción mensual para mantener tu posicionamiento activo.' },
      { q: '¿Qué formatos recibo en Branding?', a: 'Recibes archivos editables en AI y SVG, además de versiones PNG y JPG para uso digital.' },
      { q: '¿Ofrecen reembolsos?', a: 'Sí, ofrecemos garantía de satisfacción en todos nuestros servicios.' },
      { q: '¿Cuánto tarda en verse resultados el SEO?', a: 'Los primeros resultados visibles aparecen entre 3-6 meses. Resultados significativos entre 6-12 meses.' },
      { q: '¿Las WebApps incluyen dominio y hosting?', a: 'Los planes Pro y E-Commerce incluyen hosting por 1 año. El plan Web Económica incluye dominio y hosting en el precio anual.' },
    ],
  } : {
    title: 'Plans & Pricing',
    sub: 'Services designed to drive your business with strategy, clarity and measurable results.',
    noInclude: 'Does not include:',
    faq: 'FAQ',
    recommend: 'Recommended',
    proposal: 'Request custom proposal',
    faqs: [
      { q: 'How do I book a consultation?', a: 'Clicking the button redirects you to WhatsApp where we\'ll coordinate date and time.' },
      { q: 'Is Local SEO a monthly payment?', a: 'Yes, SEO & GEO Local is a monthly subscription to keep your positioning active.' },
      { q: 'What formats do I receive in Branding?', a: 'You receive editable AI and SVG files, plus PNG and JPG versions for digital use.' },
      { q: 'Do you offer refunds?', a: 'Yes, we offer a satisfaction guarantee on all our services.' },
      { q: 'How long does SEO take to show results?', a: 'First visible results appear between 3-6 months. Significant results between 6-12 months.' },
      { q: 'Do WebApps include domain and hosting?', a: 'Pro and E-Commerce plans include hosting for 1 year. The Starter Web plan includes domain and hosting in the annual price.' },
    ],
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
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">{t.sub}</p>
            </AnimatedSection>
            <div className="flex items-center justify-center gap-1 p-1 rounded-full border border-border w-fit mx-auto">
              <button onClick={() => setCurrency('usd')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'usd' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>USD</button>
              <button onClick={() => setCurrency('cop')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'cop' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>COP</button>
              <button onClick={() => setCurrency('brl')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'brl' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>BRL</button>
            </div>
          </div>
        </section>

        {/* Categories */}
        {categories.map((cat, ci) => (
          <section key={ci} className="py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
              <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-14">{cat.title}</h2>
              </AnimatedSection>
              <StaggerContainer className={`grid gap-8 max-w-5xl mx-auto ${cat.plans.length === 1 ? 'max-w-lg' : cat.plans.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                {cat.plans.map((plan, pi) => {
                  const IconComp = plan.icon;
                  return (
                    <StaggerItem key={pi}>
                      <ScaleOnHover>
                        <div className={`glass-card p-8 relative h-full flex flex-col transition-all duration-300 ${plan.popular ? 'border-gold/50 gold-glow' : ''}`}>
                          {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-gold text-primary-foreground whitespace-nowrap">
                              {t.recommend}
                            </div>
                          )}
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                            <IconComp className="w-7 h-7 text-gold" />
                          </div>
                          <h3 className="text-xl font-display font-bold mb-3 text-foreground">{plan.name}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-6">{plan.tagline}</p>
                          <div className="mb-6">
                            <span className="text-4xl font-display font-bold text-foreground">
                              {formatPrice(getPrice(plan.priceUsd, plan.priceCop, plan.priceBrl))}
                            </span>
                            <span className="text-muted-foreground text-sm ml-1">{plan.recurring || (lang === 'pt' ? '/ pagamento único' : lang === 'es' ? '/ pago único' : '/ one-time')}</span>
                          </div>
                          {plan.urgency && (
                            <div className="mb-6 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2" style={{ background: 'hsla(356, 68%, 20%, 0.15)', color: 'hsl(356, 68%, 55%)' }}>
                              <Clock className="w-3.5 h-3.5" /> {plan.urgency}
                            </div>
                          )}
                          <ul className="space-y-3 mb-6 flex-1">
                            {plan.includes.map((item, ii) => {
                              const ItemIcon = item.icon;
                              return (
                                <li key={ii} className="flex items-start gap-3 text-sm text-foreground">
                                  <ItemIcon className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> {item.text}
                                </li>
                              );
                            })}
                          </ul>
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
                          <button
                            onClick={() => handleCta(plan.paymentKey)}
                            className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${plan.popular ? 'btn-gold !px-0' : 'border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground'}`}
                          >
                            <MessageCircle className="w-4 h-4" /> {plan.cta}
                          </button>
                          <button
                            onClick={() => { setProposalService(plan.name); setProposalOpen(true); }}
                            className="w-full mt-3 py-2 rounded-full text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:border-gold/40 transition-all"
                          >
                            {t.proposal}
                          </button>
                        </div>
                      </ScaleOnHover>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16 text-gold">{t.faq}</h2>
            <div className="max-w-2xl mx-auto space-y-4">
              {t.faqs.map((faq, i) => (
                <details key={i} className="glass-card p-6 group">
                  <summary className="font-display font-semibold cursor-pointer list-none flex items-center justify-between text-foreground">
                    {faq.q}
                    <ArrowRight className="w-4 h-4 transition-transform group-open:rotate-90 text-gold" />
                  </summary>
                  <p className="text-sm mt-4 leading-relaxed text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
      <ProposalModal open={proposalOpen} onClose={() => setProposalOpen(false)} lang={lang} defaultService={proposalService} />
    </PageTransition>
  );
};

export default Precios;
