import { useState } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

interface ChatWidgetProps {
  lang?: 'es' | 'en';
}

const ChatWidget = ({ lang = 'es' }: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    es: {
      title: 'Hablemos de tu proyecto',
      whatsapp: 'WhatsApp',
      sms: 'SMS',
      call: 'Llamada',
      close: 'Cerrar'
    },
    en: {
      title: 'Let\'s talk about your project',
      whatsapp: 'WhatsApp',
      sms: 'SMS',
      call: 'Call',
      close: 'Close'
    }
  };

  const data = content[lang];
  
  const whatsappUrl = "https://wa.me/57XXXXXXXXXX?text=Hola%20Ferova%2C%20me%20gustaría%20agendar%20una%20llamada.";
  const smsUrl = "sms:+57XXXXXXXXXX?&body=Hola%20Ferova%2C%20me%20gustaría%20agendar%20una%20llamada.";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Options */}
      {isOpen && (
        <div className="mb-4 p-4 glass-card rounded-2xl min-w-[280px] animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-foreground">{data.title}</h4>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label={data.close}
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          
          <div className="space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-lg transition-colors group"
            >
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-foreground group-hover:text-gold transition-colors">
                {data.whatsapp}
              </span>
            </a>
            
            <a
              href={smsUrl}
              className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-lg transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-foreground group-hover:text-gold transition-colors">
                {data.sms}
              </span>
            </a>
            
            <button className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-lg transition-colors group w-full">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-gold-contrast" />
              </div>
              <span className="text-foreground group-hover:text-gold transition-colors">
                {data.call}
              </span>
            </button>
          </div>
        </div>
      )}
      
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-gold hover:bg-gold-dark rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen ? 'rotate-45' : ''
        }`}
        aria-label="Chat"
      >
        <MessageCircle className="w-6 h-6 text-gold-contrast" />
      </button>
    </div>
  );
};

export default ChatWidget;