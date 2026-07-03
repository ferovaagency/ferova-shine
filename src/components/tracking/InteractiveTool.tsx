import { useEffect, useState, ReactNode, cloneElement, isValidElement, FormEvent } from 'react';
import { pushDataLayer } from './utils';

export interface ToolTrackingApi {
  trackUse: (result?: any) => void;
  trackCalculate: (result?: any) => void;
  trackDownload: () => void;
}

export interface InteractiveToolProps {
  toolName: string;
  toolTitle: string;
  children?: ReactNode | ((api: ToolTrackingApi) => ReactNode);
  showEmailCapture?: boolean;
  className?: string;
}

export function InteractiveTool({
  toolName,
  toolTitle,
  children,
  showEmailCapture = false,
  className = '',
}: InteractiveToolProps) {
  const [email, setEmail] = useState('');
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    pushDataLayer({
      event: 'tool_interaction',
      tool_name: toolName,
      tool_action: 'open',
    });
  }, [toolName]);

  const api: ToolTrackingApi = {
    trackUse: (result?: any) =>
      pushDataLayer({
        event: 'tool_interaction',
        tool_name: toolName,
        tool_action: 'use',
        tool_result: result,
      }),
    trackCalculate: (result?: any) =>
      pushDataLayer({
        event: 'tool_interaction',
        tool_name: toolName,
        tool_action: 'calculate',
        tool_result: result,
      }),
    trackDownload: () =>
      pushDataLayer({
        event: 'tool_interaction',
        tool_name: toolName,
        tool_action: 'download',
      }),
  };

  const handleEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    pushDataLayer({
      event: 'tool_lead_capture',
      tool_name: toolName,
      email_captured: email,
      lead_source: 'tool_' + toolName,
    });
    setCaptured(true);
  };

  const rendered =
    typeof children === 'function'
      ? (children as (api: ToolTrackingApi) => ReactNode)(api)
      : isValidElement(children)
      ? cloneElement(children as any, { tracking: api })
      : children;

  return (
    <div className={`rounded-2xl border border-border/60 bg-card p-6 ${className}`}>
      <h3 className="text-xl font-bold text-foreground mb-4">{toolTitle}</h3>
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
            Recibir resultado
          </button>
        </form>
      )}
      {captured && <p className="mt-4 text-sm text-muted-foreground">✅ Enviado. Revisa tu correo.</p>}
    </div>
  );
}

export default InteractiveTool;
