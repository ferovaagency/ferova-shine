import { MessageCircle, Bot, Sparkles } from "lucide-react";
import { HOME, WHATSAPP_URL, type Lang } from "@/content/home";
import { trackEvent } from "@/lib/analytics";

/** Abre el widget flotante de la Asesora IA (Fera), solo en cliente. */
function openAiAdvisor() {
  trackEvent("cta_clicked", { cta: "open_ai_advisor", section: "final" });
  const trigger = document.querySelector<HTMLButtonElement>('button[aria-label*="IA"], button[aria-label*="AI"]');
  trigger?.click();
}

const FinalCTA = ({ lang }: { lang: Lang }) => {
  const c = HOME[lang].finalCta;

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28 px-4 sm:px-6 dark-section"
      style={{ background: "linear-gradient(135deg, hsl(243,31%,10%) 0%, hsl(356,68%,20%) 100%)" }}
    >
      <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden />
      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-medium bg-gold/15 border border-gold/30 text-gold">
          <Sparkles className="w-3.5 h-3.5" />
          {c.badge}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white">{c.title}</h2>
        <p className="text-base md:text-xl text-white/75 mb-10 leading-relaxed">{c.sub}</p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_button_clicked", { section: "final", language: lang })}
            className="btn-gold w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            {c.ctaWa}
          </a>
          <button onClick={openAiAdvisor} className="btn-outline-gold w-full sm:w-auto inline-flex items-center justify-center gap-2">
            <Bot className="w-4 h-4" />
            {c.ctaAi}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
