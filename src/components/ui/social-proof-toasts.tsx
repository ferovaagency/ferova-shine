import { useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

const cities = ['Bogotá', 'Medellín', 'Miami', 'Cali', 'Barranquilla', 'Orlando', 'Ciudad de México', 'Lima', 'Buenos Aires', 'Cartagena', 'São Paulo', 'Rio de Janeiro'];

const messagesEs = [
  { title: '📍 Nueva asesoría agendada', tpl: (city: string) => `Un founder en ${city} acaba de agendar una Asesoría Estratégica 1a1.` },
  { title: '🧠 Mentoría mensual contratada', tpl: (city: string) => `Una empresa en ${city} acaba de activar su Mentoría Mensual con Ferova.` },
  { title: '🎓 Capacitación IA in-company', tpl: (city: string) => `Un equipo en ${city} acaba de reservar una Capacitación IA in-company.` },
  { title: '🚀 Nueva Web App contratada', tpl: (city: string) => `Un e-commerce en ${city} acaba de contratar el desarrollo de su Web App.` },
  { title: '🔍 SEO + GEO + IAO activado', tpl: (city: string) => `Una marca en ${city} acaba de activar su plan SEO + GEO + IAO mensual.` },
  { title: '💼 LinkedIn optimizado', tpl: (city: string) => `Un founder en ${city} acaba de optimizar su perfil de LinkedIn B2B.` },
  { title: '📝 Contenido LinkedIn iniciado', tpl: (city: string) => `Una empresa en ${city} acaba de activar su plan mensual de Contenido LinkedIn.` },
];

const messagesEn = [
  { title: '📍 New advisory booked', tpl: (city: string) => `A founder in ${city} just booked a 1-on-1 Strategy Advisory.` },
  { title: '🧠 Monthly mentorship started', tpl: (city: string) => `A company in ${city} just activated their Monthly Mentorship with Ferova.` },
  { title: '🎓 In-company AI Training', tpl: (city: string) => `A team in ${city} just booked an In-company AI Training program.` },
  { title: '🚀 New Web App ordered', tpl: (city: string) => `An e-commerce in ${city} just ordered their Web App build.` },
  { title: '🔍 SEO + GEO + AIO activated', tpl: (city: string) => `A brand in ${city} just activated their monthly SEO + GEO + AIO plan.` },
  { title: '💼 LinkedIn profile optimized', tpl: (city: string) => `A founder in ${city} just optimized their B2B LinkedIn profile.` },
  { title: '📝 LinkedIn Content started', tpl: (city: string) => `A company in ${city} just activated their monthly LinkedIn Content plan.` },
];

const messagesPt = [
  { title: '📍 Nova consultoria agendada', tpl: (city: string) => `Um fundador em ${city} acabou de agendar uma Consultoria Estratégica 1a1.` },
  { title: '🧠 Mentoria mensal contratada', tpl: (city: string) => `Uma empresa em ${city} acabou de ativar sua Mentoria Mensal com a Ferova.` },
  { title: '🎓 Treinamento IA in-company', tpl: (city: string) => `Uma equipe em ${city} acabou de reservar um Treinamento IA in-company.` },
  { title: '🚀 Nova Web App contratada', tpl: (city: string) => `Um e-commerce em ${city} acabou de contratar o desenvolvimento da sua Web App.` },
  { title: '🔍 SEO + GEO + IAO ativado', tpl: (city: string) => `Uma marca em ${city} acabou de ativar seu plano mensal de SEO + GEO + IAO.` },
  { title: '💼 LinkedIn otimizado', tpl: (city: string) => `Um fundador em ${city} acabou de otimizar seu perfil B2B no LinkedIn.` },
  { title: '📝 Conteúdo LinkedIn iniciado', tpl: (city: string) => `Uma empresa em ${city} acabou de ativar seu plano mensal de Conteúdo LinkedIn.` },
];

interface Props {
  lang?: 'es' | 'en' | 'pt';
}

const SocialProofToasts = ({ lang = 'es' }: Props) => {
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const messages = lang === 'pt' ? messagesPt : lang === 'en' ? messagesEn : messagesEs;
    let lastIndex = -1;

    const firstTimeout = setTimeout(() => {
      showToast();
      intervalRef.current = setInterval(showToast, 30000 + Math.random() * 30000);
    }, 15000);

    function showToast() {
      const city = cities[Math.floor(Math.random() * cities.length)];
      let idx: number;
      do { idx = Math.floor(Math.random() * messages.length); } while (idx === lastIndex && messages.length > 1);
      lastIndex = idx;
      const msg = messages[idx];
      toast({ title: msg.title, description: msg.tpl(city), duration: 4000 });
    }

    return () => {
      clearTimeout(firstTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [lang]);

  return null;
};

export default SocialProofToasts;
