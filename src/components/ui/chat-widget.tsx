import { MessageCircle } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ChatWidgetProps {
  lang?: 'es' | 'en' | 'pt';
}

const ChatWidget = ({ lang = 'es' }: ChatWidgetProps) => {
  const { trackWhatsApp } = useAnalytics();
  const whatsappUrl = "https://wa.me/17865787671?text=" + encodeURIComponent(
    lang === 'pt'
      ? 'Olá Ferova, gostaria de saber mais sobre seus serviços.'
      : lang === 'en'
      ? 'Hi Ferova, I would like to learn more about your services.'
      : 'Hola Ferova, me gustaría saber más sobre sus servicios.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsApp('floating_button')}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        style={{ background: '#25D366' }}
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};

export default ChatWidget;
