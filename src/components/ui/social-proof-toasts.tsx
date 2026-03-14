import { useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

const cities = ['Bogotá', 'Medellín', 'Miami', 'Cali', 'Barranquilla', 'Orlando', 'Ciudad de México', 'Lima', 'Buenos Aires', 'Cartagena'];

const messagesEs = [
  { title: '📍 Nueva asesoría agendada', tpl: (city: string) => `Alguien en ${city} acaba de agendar una asesoría.` },
  { title: '🚀 Nueva Web App contratada', tpl: (city: string) => `Alguien en ${city} acaba de contratar una Web App.` },
  { title: '🎨 Nuevo diseño de logo', tpl: (city: string) => `Alguien en ${city} acaba de solicitar un diseño de logo.` },
  { title: '🔍 SEO & GEO Local activado', tpl: (city: string) => `Alguien en ${city} acaba de activar su plan SEO Local.` },
  { title: '💼 LinkedIn optimizado', tpl: (city: string) => `Alguien en ${city} acaba de optimizar su perfil de LinkedIn.` },
  { title: '📢 Pauta digital iniciada', tpl: (city: string) => `Alguien en ${city} acaba de iniciar su pauta digital.` },
  { title: '🎓 Asesoría Impacto agendada', tpl: (city: string) => `Alguien en ${city} acaba de agendar una Asesoría Impacto.` },
];

const messagesEn = [
  { title: '📍 New consultation booked', tpl: (city: string) => `Someone in ${city} just booked a consultation.` },
  { title: '🚀 New Web App ordered', tpl: (city: string) => `Someone in ${city} just ordered a Web App.` },
  { title: '🎨 New logo design requested', tpl: (city: string) => `Someone in ${city} just requested a logo design.` },
  { title: '🔍 SEO & GEO Local activated', tpl: (city: string) => `Someone in ${city} just activated their Local SEO plan.` },
  { title: '💼 LinkedIn profile optimized', tpl: (city: string) => `Someone in ${city} just optimized their LinkedIn profile.` },
  { title: '📢 Digital ads campaign started', tpl: (city: string) => `Someone in ${city} just started a digital ads campaign.` },
  { title: '🎓 Impact Consulting booked', tpl: (city: string) => `Someone in ${city} just booked an Impact Consulting session.` },
];

interface Props {
  lang?: 'es' | 'en';
}

const SocialProofToasts = ({ lang = 'es' }: Props) => {
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const messages = lang === 'es' ? messagesEs : messagesEn;
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
