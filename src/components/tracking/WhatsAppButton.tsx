import { MessageCircle } from 'lucide-react';
import { pushDataLayer, getScrollDepth, getTimeOnPage, getDeviceType } from './utils';

export interface WhatsAppButtonProps {
  placement: 'sticky' | 'hero' | 'cta' | 'modal';
  phoneNumber: string;
  message?: string;
  text?: string;
  className?: string;
}

export function WhatsAppButton({
  placement,
  phoneNumber,
  message = 'Hola, tengo una consulta sobre vuestros servicios',
  text = 'WhatsApp',
  className = '',
}: WhatsAppButtonProps) {
  const clean = phoneNumber.replace(/[^\d]/g, '');
  const url = `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    pushDataLayer({
      event: 'whatsapp_click',
      whatsapp_placement: placement,
      scroll_depth: getScrollDepth(),
      time_on_page: getTimeOnPage(),
      device: getDeviceType(),
    });
  };

  const base =
    placement === 'sticky'
      ? 'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center'
      : 'inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all hover:scale-[1.02]';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="WhatsApp"
      className={`${base} bg-[#25D366] text-white hover:brightness-110 ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      {placement !== 'sticky' && <span>{text}</span>}
    </a>
  );
}

export default WhatsAppButton;
