import { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import {
  pushDataLayer,
  getScrollDepth,
  getDeviceType,
  isReturningVisitor,
  getCurrentServiceContext,
} from './utils';

type QuoteType = 'main_cta' | 'proposal' | 'sticky' | 'modal';

export interface QuoteButtonProps {
  quoteType: QuoteType;
  text?: string;
  className?: string;
  onClick?: () => void;
}

export function QuoteButton({
  quoteType,
  text = 'Solicitar Cotización',
  className = '',
  onClick,
}: QuoteButtonProps) {
  const handleClick = () => {
    pushDataLayer({
      event: 'quote_request_click',
      quote_type: quoteType,
      service_context: getCurrentServiceContext() || 'none',
      scroll_depth: getScrollDepth(),
      is_returning_visitor: isReturningVisitor(),
      device: getDeviceType(),
    });
    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gold text-background font-semibold hover:brightness-110 transition-all ${className}`}
      style={{ background: 'hsl(43, 86%, 40%)', color: '#0b0b1a' }}
    >
      {text}
    </button>
  );
}

const SERVICES = [
  { value: 'web_design', label: 'Web Design' },
  { value: 'seo', label: 'SEO' },
  { value: 'ia_integration', label: 'IA Integration' },
  { value: 'whatsapp_automation', label: 'WhatsApp Automation' },
  { value: 'otro', label: 'Otro' },
];

const BUDGETS = [
  { value: 'under_5k', label: '<$5K' },
  { value: '5k_15k', label: '$5K - $15K' },
  { value: '15k_50k', label: '$15K - $50K' },
  { value: 'over_50k', label: '>$50K' },
  { value: 'not_sure', label: 'No estoy seguro' },
];

const TIMELINES = [
  { value: 'asap', label: 'ASAP' },
  { value: '1month', label: '1 mes' },
  { value: '2months', label: '2-3 meses' },
  { value: 'flexible', label: 'Flexible' },
];

export interface QuoteFormProps {
  onSubmitted?: () => void;
  onClose?: () => void;
}

export function QuoteForm({ onSubmitted, onClose }: QuoteFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState('');
  const [timeline, setTimeline] = useState('');

  const toggleService = (v: string) =>
    setServices((prev) => (prev.includes(v) ? prev.filter((s) => s !== v) : [...prev, v]));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    pushDataLayer({
      event: 'quote_request_submit',
      quote_type: 'form_complete',
      services_selected: services,
      estimated_budget_range: budgetRange || 'not_disclosed',
      timeline: timeline || 'not_specified',
      lead_source: 'quote_form',
    });
    onSubmitted?.();
  };

  const input =
    'w-full px-4 py-2.5 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(43,86%,50%)]/40';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg rounded-2xl border border-[hsl(43,86%,40%)]/30 bg-card p-8 max-h-[90vh] overflow-y-auto"
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <h3 className="text-xl font-bold mb-6 text-foreground">Solicitar Cotización</h3>

        <div className="space-y-4">
          <input required placeholder="Nombre completo" value={name} onChange={(e) => setName(e.target.value)} className={input} />
          <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Servicios</label>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <button
                  type="button"
                  key={s.value}
                  onClick={() => toggleService(s.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                    services.includes(s.value)
                      ? 'bg-[hsl(43,86%,45%)] text-black border-transparent'
                      : 'border-border/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <select required value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)} className={input}>
            <option value="" disabled>Presupuesto estimado</option>
            {BUDGETS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>

          <select required value={timeline} onChange={(e) => setTimeline(e.target.value)} className={input}>
            <option value="" disabled>Timeline</option>
            {TIMELINES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-black"
            style={{ background: 'hsl(43, 86%, 45%)' }}
          >
            Enviar Solicitud
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuoteButton;
