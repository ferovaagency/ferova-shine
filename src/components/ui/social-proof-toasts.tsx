import { useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

const cities = ['Bogotá', 'Medellín', 'Miami', 'Cali', 'Barranquilla', 'Orlando', 'Ciudad de México', 'Lima', 'Buenos Aires', 'Cartagena'];

interface Props {
  lang?: 'es' | 'en';
}

const SocialProofToasts = ({ lang = 'es' }: Props) => {
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    // First toast after 15s, then every 30-60s
    const firstTimeout = setTimeout(() => {
      showToast();
      intervalRef.current = setInterval(showToast, 30000 + Math.random() * 30000);
    }, 15000);

    function showToast() {
      const city = cities[Math.floor(Math.random() * cities.length)];
      toast({
        title: lang === 'es' ? '📍 Nueva asesoría agendada' : '📍 New consultation booked',
        description: lang === 'es'
          ? `Alguien en ${city} acaba de agendar una asesoría.`
          : `Someone in ${city} just booked a consultation.`,
        duration: 4000,
      });
    }

    return () => {
      clearTimeout(firstTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [lang]);

  return null;
};

export default SocialProofToasts;
