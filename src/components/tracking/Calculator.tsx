import { useEffect, useState, ReactNode, cloneElement, isValidElement, FormEvent } from 'react';
import { pushDataLayer } from './utils';

export interface CalculatorTrackingApi {
  trackCalculate: (resultValue: any, resultCategory?: string) => void;
  trackShare: (resultValue: any) => void;
  trackDownload: (resultValue: any) => void;
}

export interface CalculatorProps {
  calculatorName: string;
  calculatorTitle: string;
  children?: ReactNode | ((api: CalculatorTrackingApi) => ReactNode);
  showEmailCapture?: boolean;
  className?: string;
}

export function Calculator({
  calculatorName,
  calculatorTitle,
  children,
  showEmailCapture = false,
  className = '',
}: CalculatorProps) {
  const [email, setEmail] = useState('');
  const [lastResult, setLastResult] = useState<any>(null);
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    pushDataLayer({
      event: 'calculator_interaction',
      calculator_name: calculatorName,
      calc_action: 'start',
    });
  }, [calculatorName]);

  const api: CalculatorTrackingApi = {
    trackCalculate: (resultValue, resultCategory) => {
      setLastResult(resultValue);
      pushDataLayer({
        event: 'calculator_interaction',
        calculator_name: calculatorName,
        calc_action: 'calculate',
        calc_result_value: resultValue,
        calc_result_category: resultCategory,
      });
    },
    trackShare: (resultValue) =>
      pushDataLayer({
        event: 'calculator_interaction',
        calculator_name: calculatorName,
        calc_action: 'share',
        calc_result_value: resultValue,
      }),
    trackDownload: (resultValue) =>
      pushDataLayer({
        event: 'calculator_interaction',
        calculator_name: calculatorName,
        calc_action: 'download',
        calc_result_value: resultValue,
      }),
  };

  const handleEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    pushDataLayer({
      event: 'calculator_lead_capture',
      calculator_name: calculatorName,
      email_captured: email,
      lead_source: 'calculator_' + calculatorName,
      calc_result_value: lastResult,
    });
    setCaptured(true);
  };

  const rendered =
    typeof children === 'function'
      ? (children as (api: CalculatorTrackingApi) => ReactNode)(api)
      : isValidElement(children)
      ? cloneElement(children as any, { tracking: api })
      : children;

  return (
    <div className={`rounded-2xl border border-border/60 bg-card p-6 ${className}`}>
      <h3 className="text-xl font-bold text-foreground mb-4">{calculatorTitle}</h3>
      {rendered}

      {showEmailCapture && !captured && (
        <form onSubmit={handleEmail} className="mt-6 flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg bg-background border border-border/50 text-sm text-foreground"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg font-semibold text-black"
            style={{ background: 'hsl(43, 86%, 45%)' }}
          >
            Recibir por email
          </button>
        </form>
      )}
      {captured && <p className="mt-4 text-sm text-muted-foreground">✅ Enviado.</p>}
    </div>
  );
}

export default Calculator;
