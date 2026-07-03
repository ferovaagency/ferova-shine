import { useState, FormEvent } from 'react';
import { pushDataLayer } from './utils';

export type ContactFormType = 'general' | 'quote' | 'callback';
export type ContactMethod = 'email' | 'whatsapp' | 'call';

export interface ContactFormProps {
  formType?: ContactFormType;
  onSubmitted?: () => void;
  className?: string;
}

const SERVICES = [
  { value: 'web_design', label: 'Web Design' },
  { value: 'seo', label: 'SEO' },
  { value: 'ia_integration', label: 'IA Integration' },
  { value: 'whatsapp_automation', label: 'WhatsApp Automation' },
];

const BUDGETS = [
  { value: 'under_5k', label: '<$5K' },
  { value: '5k_15k', label: '$5K - $15K' },
  { value: '15k_50k', label: '$15K - $50K' },
  { value: 'over_50k', label: '>$50K' },
  { value: 'not_sure', label: 'No estoy seguro' },
];

export function ContactForm({ formType = 'general', onSubmitted, className = '' }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [preferredMethod, setPreferredMethod] = useState<ContactMethod>('email');
  const [services, setServices] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState('');

  const toggleService = (v: string) =>
    setServices((prev) => (prev.includes(v) ? prev.filter((s) => s !== v) : [...prev, v]));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    pushDataLayer({
      event: 'contact_form_submit',
      form_type: formType,
      contact_method: preferredMethod,
      services_interested: services,
      budget_range: budgetRange || 'not_disclosed',
      lead_source: 'contact_form',
    });
    onSubmitted?.();
  };

  const input =
    'w-full px-4 py-2.5 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(43,86%,50%)]/40';

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 rounded-2xl border border-border/60 bg-card p-6 ${className}`}>
      <input required placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} className={input} />
      <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
      <textarea
        required
        placeholder="Cuéntanos sobre tu proyecto"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        className={input + ' resize-none'}
      />

      <div>
        <label className="block text-sm text-muted-foreground mb-2">Método preferido de contacto</label>
        <div className="flex gap-2">
          {(['email', 'whatsapp', 'call'] as ContactMethod[]).map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => setPreferredMethod(m)}
              className={`px-3 py-1.5 rounded-lg text-xs border capitalize ${
                preferredMethod === m
                  ? 'bg-[hsl(43,86%,45%)] text-black border-transparent'
                  : 'border-border/60 text-muted-foreground'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-muted-foreground mb-2">Servicios de interés</label>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <button
              type="button"
              key={s.value}
              onClick={() => toggleService(s.value)}
              className={`px-3 py-1.5 rounded-lg text-xs border ${
                services.includes(s.value)
                  ? 'bg-[hsl(43,86%,45%)] text-black border-transparent'
                  : 'border-border/60 text-muted-foreground'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <select value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)} className={input}>
        <option value="">Presupuesto (opcional)</option>
        {BUDGETS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
      </select>

      <button type="submit" className="w-full py-3 rounded-xl font-semibold text-black" style={{ background: 'hsl(43, 86%, 45%)' }}>
        Enviar
      </button>
    </form>
  );
}

export default ContactForm;
