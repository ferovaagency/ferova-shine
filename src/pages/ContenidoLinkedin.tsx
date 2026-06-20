import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Linkedin, CheckCircle, MessageCircle, PenSquare, TrendingUp, Users, Calendar } from 'lucide-react';
import { formatPrice, type Lang } from '@/lib/pricing';

interface Props { lang?: Lang; }

const ContenidoLinkedin = ({ lang = 'es' }: Props) => {
  const t = lang === 'es' ? {
    title: 'Creación de Contenido para LinkedIn',
    sub: 'Posicionamos tu marca personal o B2B con contenido editorial publicado de forma consistente.',
    planName: 'LinkedIn Content Pro',
    planDesc: 'Estrategia + redacción + diseño + publicación mensual.',
    features: [
      '12 posts editoriales al mes',
      '2 carruseles premium diseñados',
      'Calendario editorial estratégico',
      'Optimización de copy con IA',
      'Engagement asistido (comentarios estratégicos)',
      'Reporte mensual de métricas',
    ],
    perks: [
      { icon: PenSquare, title: 'Voz editorial cuidada', desc: 'Tu tono, tus ideas, sin sonar a plantilla.' },
      { icon: TrendingUp, title: 'Crecimiento orgánico', desc: 'Más impresiones, más perfil, más conversaciones.' },
      { icon: Users, title: 'Audiencia cualificada', desc: 'Atraemos al perfil B2B que decide compras.' },
      { icon: Calendar, title: 'Publicación consistente', desc: 'Nosotros sostenemos el ritmo cada semana.' },
    ],
    cta: 'Empezar este mes',
    period: 'monthly' as const,
  } : lang === 'pt' ? {
    title: 'Criação de Conteúdo para LinkedIn',
    sub: 'Posicionamos sua marca pessoal ou B2B com conteúdo editorial publicado de forma consistente.',
    planName: 'LinkedIn Content Pro',
    planDesc: 'Estratégia + copy + design + publicação mensal.',
    features: [
      '12 posts editoriais por mês',
      '2 carrosséis premium desenhados',
      'Calendário editorial estratégico',
      'Otimização de copy com IA',
      'Engajamento assistido (comentários estratégicos)',
      'Relatório mensal de métricas',
    ],
    perks: [
      { icon: PenSquare, title: 'Voz editorial cuidada', desc: 'Seu tom, suas ideias, sem soar genérico.' },
      { icon: TrendingUp, title: 'Crescimento orgânico', desc: 'Mais impressões, mais perfil, mais conversas.' },
      { icon: Users, title: 'Audiência qualificada', desc: 'Atraímos o perfil B2B que decide compras.' },
      { icon: Calendar, title: 'Publicação consistente', desc: 'Nós mantemos o ritmo toda semana.' },
    ],
    cta: 'Começar este mês',
    period: 'monthly' as const,
  } : {
    title: 'LinkedIn Content Creation',
    sub: 'We position your personal or B2B brand with consistently published editorial content.',
    planName: 'LinkedIn Content Pro',
    planDesc: 'Strategy + copywriting + design + monthly publishing.',
    features: [
      '12 editorial posts per month',
      '2 premium designed carousels',
      'Strategic editorial calendar',
      'AI-assisted copy optimization',
      'Assisted engagement (strategic comments)',
      'Monthly metrics report',
    ],
    perks: [
      { icon: PenSquare, title: 'Crafted editorial voice', desc: 'Your tone, your ideas, never template-y.' },
      { icon: TrendingUp, title: 'Organic growth', desc: 'More impressions, more profile views, more conversations.' },
      { icon: Users, title: 'Qualified audience', desc: 'We attract the B2B buyer who decides.' },
      { icon: Calendar, title: 'Consistent publishing', desc: 'We hold the cadence every week.' },
    ],
    cta: 'Start this month',
    period: 'monthly' as const,
  };

  const whatsappUrl = 'https://wa.link/jvbd4j?text=' + encodeURIComponent(
    lang === 'es' ? 'Hola Ferova, quiero el plan de Creación de Contenido LinkedIn.'
    : lang === 'pt' ? 'Olá Ferova, quero o plano de Criação de Conteúdo LinkedIn.'
    : 'Hi Ferova, I want the LinkedIn Content Creation plan.'
  );

  return (
    <>
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 bg-[#0A66C2]/10">
              <Linkedin className="w-10 h-10 text-[#0A66C2]" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.sub}</p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {t.perks.map((b, i) => (
                <div key={i} className="glass-card p-8 text-center hover:border-gold/30 transition-all h-full">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gold/10">
                    <b.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2 text-foreground">{b.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-surface">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-lg mx-auto glass-card p-10 text-center border-gold/30 gold-glow">
              <h3 className="text-xl font-display font-bold mb-2">{t.planName}</h3>
              <p className="text-muted-foreground text-sm mb-6">{t.planDesc}</p>
              <div className="mb-8">
                <span className="text-4xl font-display font-bold text-foreground">
                  {formatPrice(400, lang, 'monthly')}
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
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="btn-gold w-full flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" /> {t.cta}
              </motion.a>
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </>
  );
};

export default ContenidoLinkedin;
