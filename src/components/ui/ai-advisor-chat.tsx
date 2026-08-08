import { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, X, Send, Sparkles, ArrowDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAnalytics } from '@/hooks/useAnalytics';
import { trackEvent } from '@/lib/analytics';

type Msg = { role: 'user' | 'assistant'; content: string };

interface AiAdvisorChatProps {
  lang?: 'es' | 'en' | 'pt';
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-sales-advisor`;

const t = {
  es: {
    title: 'Fera · Cotizaciones',
    subtitle: 'Asistente con IA para agencias',
    welcome: 'Soy **Fera**, el asistente con inteligencia artificial de Ferova. No soy una persona y puedo equivocarme; el alcance y el precio siempre los revisa una persona. No envíes datos sensibles. Puedes escribir **AGENTE** cuando quieras hablar con alguien del equipo. Consulta nuestra [política de privacidad](/privacidad#ia).\n\n¿Qué capacidad necesita tu agencia?',
    placeholder: 'Escribe tu mensaje...',
    badge: 'Cotizar con Fera',
    error: 'Fera no pudo conectar en este momento. Envía tu mensaje nuevamente o habla con una persona por [WhatsApp](https://wa.me/17865787671) o [correo](mailto:gerencia@seoparaecommerce.co).',
    suggestions: [
      'SEO técnico para un cliente',
      'Mantenimiento web mensual',
      'Necesito landing pages',
    ],
  },
  en: {
    title: 'Fera · Quotes',
    subtitle: 'AI assistant for agencies',
    welcome: "I'm **Fera**, Ferova's AI quoting assistant. I'm not a person and I can make mistakes; a person always reviews scope and pricing. Do not send sensitive data. Type **AGENT** whenever you want a team member. Read our [privacy policy](/en/privacy#ai).\n\nWhat capacity does your agency need?",
    placeholder: 'Type your message...',
    badge: 'Quote with Fera',
    error: 'Fera could not connect right now. Send your message again or contact a person through [WhatsApp](https://wa.me/17865787671) or [email](mailto:gerencia@seoparaecommerce.co).',
    suggestions: [
      'Technical SEO for a client',
      'Monthly website maintenance',
      'I need landing pages',
    ],
  },
  pt: {
    title: 'Fera · Orçamentos',
    subtitle: 'Assistente com IA para agências',
    welcome: 'Sou a **Fera**, assistente de orçamento com inteligência artificial da Ferova. Não sou uma pessoa e posso cometer erros; uma pessoa sempre revisa escopo e preço. Não envie dados sensíveis. Escreva **AGENTE** para falar com a equipe.\n\nDe qual capacidade sua agência precisa?',
    placeholder: 'Digite sua mensagem...',
    badge: 'Consultora IA',
    error: 'A Fera não conseguiu se conectar agora. Envie sua mensagem novamente ou fale com uma pessoa pelo [WhatsApp](https://wa.me/17865787671) ou [e-mail](mailto:gerencia@seoparaecommerce.co).',
    suggestions: [
      'SEO técnico para um cliente',
      'Manutenção web mensal',
      'Preciso de landing pages',
    ],
  },
};

const AiAdvisorChat = ({ lang = 'es' }: AiAdvisorChatProps) => {
  const txt = t[lang];
  const { trackAIChat } = useAnalytics();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: txt.welcome },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const openQuote = () => {
      setOpen(true);
      trackAIChat('open');
      trackEvent('ai_quote_assistant_opened', { source: 'page_cta' });
    };
    window.addEventListener('open-fera-quote', openQuote);
    return () => window.removeEventListener('open-fera-quote', openQuote);
  }, [trackAIChat]);

  // Auto-scroll
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Detect if user scrolled up
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScroll(scrollHeight - scrollTop - clientHeight > 80);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    trackAIChat('message_sent');
    trackEvent('ai_assistant_message_sent', { msg_number: messages.filter(m => m.role === 'user').length + 1 });
    const userMsg: Msg = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    let assistantContent = '';

    try {
      const requestAdvisor = () => fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          lang,
        }),
      });

      const transientStatuses = [429, 500, 502, 503, 504];
      let resp: Response | undefined;
      let requestError: unknown;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
          resp = await requestAdvisor();
          if (!transientStatuses.includes(resp.status)) break;
        } catch (error) {
          requestError = error;
        }
        if (attempt === 0) await new Promise(resolve => window.setTimeout(resolve, 800));
      }
      if (!resp) throw requestError instanceof Error ? requestError : new Error('Network error');

      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
      }

      if (!resp.body) throw new Error('No stream body');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') { streamDone = true; break; }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant' && prev.length > newMessages.length) {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: 'assistant', content: assistantContent }];
              });
            }
          } catch {
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }

      // Final flush
      if (buffer.trim()) {
        for (let raw of buffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const c = parsed.choices?.[0]?.delta?.content;
            if (c) {
              assistantContent += c;
              setMessages(prev =>
                prev.map((m, i) =>
                  i === prev.length - 1 && m.role === 'assistant'
                    ? { ...m, content: assistantContent }
                    : m
                )
              );
            }
          } catch { /* ignore */ }
        }
      }
    } catch (err) {
      console.error('AI advisor error:', err);
      setMessages(prev => [...prev, { role: 'assistant', content: txt.error }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating trigger — positioned above WhatsApp button on mobile, left side on desktop */}
      <button
        onClick={() => { const next = !open; setOpen(next); if (next) { trackAIChat('open'); trackEvent('ai_assistant_opened'); } }}
        className={`fixed z-50 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group
          ${open ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
          bottom-24 right-6 lg:bottom-8 lg:left-6 lg:right-auto
          w-14 h-14 lg:w-16 lg:h-16
          flex items-center justify-center`}
        style={{
          background: 'linear-gradient(135deg, hsl(45,86%,40%), hsl(45,86%,52%))',
        }}
        aria-label={txt.badge}
      >
        <Sparkles className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: 'hsl(45,86%,40%)' }} />
      </button>

      {/* Badge label — big, visible, eye-catching on mobile and desktop */}
      {!open && (
        <button
          onClick={() => { setOpen(true); trackAIChat('open'); trackEvent('ai_assistant_opened'); }}
          className="fixed z-50 flex items-center gap-2 rounded-full px-4 py-2.5 shadow-xl text-sm font-bold text-white animate-pulse
            bottom-[7rem] right-[5.5rem]
            lg:bottom-12 lg:left-[6rem] lg:right-auto lg:px-5 lg:py-3 lg:text-base"
          style={{
            background: 'linear-gradient(135deg, hsl(45,86%,40%), hsl(45,86%,52%))',
            boxShadow: '0 8px 24px hsla(45,86%,40%,0.45)',
          }}
          aria-label={txt.badge}
        >
          <Bot className="w-4 h-4 lg:w-5 lg:h-5" />
          <span>{txt.badge}</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed z-50 flex flex-col shadow-2xl border border-border/60 overflow-hidden
            bg-card backdrop-blur-xl
            inset-0 lg:inset-auto
            lg:bottom-8 lg:left-6 lg:w-[420px] lg:h-[600px] lg:max-h-[80vh]
            lg:rounded-2xl"
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-5 py-4 border-b border-border/40"
            style={{
              background: 'linear-gradient(135deg, #3c3c3b, #541014)',
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(45,86%,40%), hsl(45,86%,52%))' }}>
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{txt.title}</p>
              <p className="text-xs text-white/60">{txt.subtitle}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
            style={{ minHeight: 0 }}
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                    ${m.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                >
                  {m.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert [&_p]:my-1 [&_ul]:my-1 [&_li]:my-0.5 [&_strong]:text-gold">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}

            {loading && !messages[messages.length - 1]?.content && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {/* Quick suggestions after first message only */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-2">
                {txt.suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s)}
                    className="text-xs px-3 py-2 rounded-full border border-border bg-card hover:border-primary hover:text-primary transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Scroll-to-bottom */}
          {showScroll && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ArrowDown className="w-4 h-4 text-foreground" />
            </button>
          )}

          {/* Input */}
          <div className="border-t border-border/40 px-4 py-3 bg-card">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={txt.placeholder}
                rows={1}
                className="flex-1 resize-none bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 max-h-24 overflow-y-auto"
                style={{ minHeight: '40px' }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
                  disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: input.trim() && !loading
                    ? 'linear-gradient(135deg, hsl(45,86%,40%), hsl(45,86%,52%))'
                    : 'hsl(var(--muted))',
                }}
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              {lang === 'en' ? 'AI can make mistakes · Human review available' : lang === 'pt' ? 'A IA pode cometer erros · Revisão humana disponível' : 'La IA puede equivocarse · Revisión humana disponible'}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAdvisorChat;
