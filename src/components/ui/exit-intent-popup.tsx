import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Linkedin, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface Props { lang?: "es" | "en" | "pt" }

const PROFILE = "https://www.linkedin.com/in/maria-fer-calderon/";

const COPY = {
  es: {
    title: "Sigue el trabajo detrás de cada entrega",
    body: "En LinkedIn comparto aprendizajes sobre SEO técnico, operaciones white label, mantenimiento web y producción digital para agencias.",
    button: "Seguir a María Fer en LinkedIn",
    dismiss: "Continuar en el sitio",
  },
  en: {
    title: "Follow the work behind every delivery",
    body: "On LinkedIn I share technical SEO, white-label operations and web delivery lessons for agencies.",
    button: "Follow María Fer on LinkedIn",
    dismiss: "Continue browsing",
  },
  pt: {
    title: "Acompanhe o trabalho por trás de cada entrega",
    body: "No LinkedIn compartilho aprendizados sobre SEO técnico, operações white label e produção web para agências.",
    button: "Seguir María Fer no LinkedIn",
    dismiss: "Continuar no site",
  },
};

export default function ExitIntentPopup({ lang = "es" }: Props) {
  const [show, setShow] = useState(false);
  const copy = COPY[lang];

  useEffect(() => {
    if (sessionStorage.getItem("linkedin-exit-shown")) return;
    const handler = (event: MouseEvent) => {
      if (event.clientY <= 5) {
        setShow(true);
        sessionStorage.setItem("linkedin-exit-shown", "true");
        trackEvent("popup_shown", { type: "linkedin_follow", lang });
      }
    };
    const timeout = window.setTimeout(() => document.addEventListener("mouseleave", handler), 7000);
    return () => { window.clearTimeout(timeout); document.removeEventListener("mouseleave", handler); };
  }, [lang]);

  const close = () => { setShow(false); trackEvent("popup_closed", { type: "linkedin_follow" }); };

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm" onClick={close}>
          <motion.div initial={{ opacity: 0, rotateX: -8, y: 24 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ type: "spring", stiffness: 220, damping: 22 }} className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#c0930e]/30 bg-[#fbf7ef] p-8 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#c0930e]/20 blur-3xl" />
            <button onClick={close} className="absolute right-4 top-4 rounded-full p-2 text-[#3c3c3b]/60 hover:bg-black/5 hover:text-[#3c3c3b]" aria-label="Cerrar"><X className="h-5 w-5" /></button>
            <div className="relative">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#541014] text-white shadow-lg"><Linkedin className="h-7 w-7" /></span>
              <h2 className="mt-6 font-display text-3xl font-bold text-[#3c3c3b]">{copy.title}</h2>
              <p className="mt-4 leading-7 text-[#3c3c3b]/70">{copy.body}</p>
              <a href={PROFILE} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("linkedin_follow_clicked", { source: "exit_popup", lang })} className="seo-primary-button mt-7 w-full">
                {copy.button} <ArrowUpRight className="h-4 w-4" />
              </a>
              <button onClick={close} className="mt-4 w-full text-sm text-[#3c3c3b]/60 underline underline-offset-4">{copy.dismiss}</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
