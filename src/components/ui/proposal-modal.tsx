import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProposalModalProps {
  open: boolean;
  onClose: () => void;
  lang?: 'es' | 'en' | 'pt';
  defaultService?: string;
}

const services = {
  es: [
    'SEO para E-commerce',
    'Diseño Web / Web Apps',
    'Pauta Digital',
    'Diseño de Logos',
    'Optimización de LinkedIn',
    'Asesoría de Marketing',
    'Descuentos en Herramientas',
  ],
  en: [
    'E-commerce SEO',
    'Web Design / Web Apps',
    'Digital Ads',
    'Logo Design',
    'LinkedIn Optimization',
    'Marketing Consulting',
    'Tool Discounts',
  ],
};

const ProposalModal = ({ open, onClose, lang = 'es', defaultService = '' }: ProposalModalProps) => {
  const [form, setForm] = useState({
    name: '',
    company: '',
    service: defaultService,
    budget: '',
    message: '',
  });

  const t = lang === 'es' ? {
    title: 'Solicitar Propuesta Personalizada',
    name: 'Nombre completo',
    company: 'Empresa',
    service: 'Servicio de interés',
    selectService: 'Selecciona un servicio',
    budget: 'Presupuesto aproximado',
    budgetOptions: ['Selecciona un rango', 'Menos de $500 USD', '$500 - $1,500 USD', '$1,500 - $3,000 USD', 'Más de $3,000 USD'],
    message: 'Cuéntanos sobre tu proyecto',
    send: 'Enviar por WhatsApp',
  } : {
    title: 'Request a Custom Proposal',
    name: 'Full name',
    company: 'Company',
    service: 'Service of interest',
    selectService: 'Select a service',
    budget: 'Approximate budget',
    budgetOptions: ['Select a range', 'Under $500 USD', '$500 - $1,500 USD', '$1,500 - $3,000 USD', 'Over $3,000 USD'],
    message: 'Tell us about your project',
    send: 'Send via WhatsApp',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = lang === 'es'
      ? `Hola Ferova, solicito una propuesta personalizada.\n\n👤 *Nombre:* ${form.name}\n🏢 *Empresa:* ${form.company}\n📋 *Servicio:* ${form.service}\n💰 *Presupuesto:* ${form.budget}\n💬 *Mensaje:* ${form.message}`
      : `Hi Ferova, I'm requesting a custom proposal.\n\n👤 *Name:* ${form.name}\n🏢 *Company:* ${form.company}\n📋 *Service:* ${form.service}\n💰 *Budget:* ${form.budget}\n💬 *Message:* ${form.message}`;
    const url = `https://wa.me/17865787671?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const inputCls = "w-full px-4 py-3 rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all border border-border/50 bg-background";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg rounded-2xl p-8 border bg-card overflow-y-auto max-h-[90vh]"
            style={{ borderColor: 'hsla(45, 86%, 40%, 0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-display font-bold mb-6 text-foreground">{t.title}</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder={t.name}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
              />
              <input
                type="text"
                required
                placeholder={t.company}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className={inputCls}
              />
              <select
                required
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className={inputCls}
              >
                <option value="" disabled>{t.selectService}</option>
                {services[lang].map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>
              <select
                required
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className={inputCls}
              >
                {t.budgetOptions.map((opt, i) => (
                  <option key={i} value={i === 0 ? '' : opt} disabled={i === 0}>{opt}</option>
                ))}
              </select>
              <textarea
                required
                rows={3}
                placeholder={t.message}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={inputCls + ' resize-none'}
              />
              <button type="submit" className="btn-gold w-full !py-3.5 flex items-center justify-center gap-2 text-sm">
                <Send className="w-4 h-4" /> {t.send}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProposalModal;
