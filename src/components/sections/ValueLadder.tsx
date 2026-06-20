import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wrench, Compass, Building2, ArrowRight } from "lucide-react";
import { formatPrice, type Lang } from "@/lib/pricing";

interface Props {
  lang: Lang;
}

const T = {
  es: {
    title: "Tres formas de trabajar con nosotros",
    sub: "Una escalera diseñada para que cualquier fundador B2B encuentre el siguiente paso correcto.",
    tools: { name: "Herramientas IA", desc: "Recursos y plantillas para acelerar tu marketing.", cta: "Ver recursos" },
    consulting: { name: "Consultoría Estratégica", desc: "Asesoría 1 a 1 y mentoría mensual para fundadores.", a: "Asesoría 1 a 1", b: "Mentoría Mensual", cta: "Agendar diagnóstico" },
    agency: { name: "Agencia (Ejecución)", desc: "Implementamos por ti: WebApps y SEO/AIO en piloto automático.", a: "Web E-commerce", b: "SEO/AIO Mensual", cta: "Ver servicios" },
  },
  en: {
    title: "Three ways to work with us",
    sub: "A ladder designed so any B2B founder finds the right next step.",
    tools: { name: "AI Tools", desc: "Resources and templates to accelerate your marketing.", cta: "View resources" },
    consulting: { name: "Strategy Advisory", desc: "1:1 advisory and monthly mentorship for founders.", a: "1:1 Advisory", b: "Monthly Mentorship", cta: "Book diagnostic" },
    agency: { name: "Agency (Execution)", desc: "We implement for you: WebApps and SEO/AIO on autopilot.", a: "E-commerce WebApp", b: "Monthly SEO/AIO", cta: "View services" },
  },
  pt: {
    title: "Três formas de trabalhar conosco",
    sub: "Uma escada pensada para que qualquer fundador B2B encontre o próximo passo certo.",
    tools: { name: "Ferramentas IA", desc: "Recursos e modelos para acelerar seu marketing.", cta: "Ver recursos" },
    consulting: { name: "Consultoria Estratégica", desc: "Assessoria 1 a 1 e mentoria mensal para fundadores.", a: "Assessoria 1 a 1", b: "Mentoria Mensal", cta: "Agendar diagnóstico" },
    agency: { name: "Agência (Execução)", desc: "Nós implementamos por você: WebApps e SEO/AIO no piloto automático.", a: "WebApp E-commerce", b: "SEO/AIO Mensal", cta: "Ver serviços" },
  },
};

export default function ValueLadder({ lang }: Props) {
  const t = T[lang];
  const prefix = lang === "en" ? "/en" : lang === "pt" ? "/pt" : "";
  const consultoriaPath =
    lang === "en" ? "/en/strategy-advisory" : lang === "pt" ? "/pt/consultoria-estrategica" : "/consultoria-estrategica";
  const recursosPath = lang === "en" ? "/en/resources" : lang === "pt" ? "/pt/recursos" : "/recursos";
  const serviciosPath =
    lang === "en" ? "/en/services" : lang === "pt" ? "/pt/servicos" : "/servicios";

  const cards = [
    {
      icon: Wrench,
      tag: "01",
      name: t.tools.name,
      desc: t.tools.desc,
      price: formatPrice(19, lang, "from"),
      lines: [],
      cta: t.tools.cta,
      to: recursosPath,
      accent: "from-gold/15 to-transparent",
    },
    {
      icon: Compass,
      tag: "02",
      name: t.consulting.name,
      desc: t.consulting.desc,
      price: "",
      lines: [
        { l: t.consulting.a, p: formatPrice(150, lang) },
        { l: t.consulting.b, p: formatPrice(500, lang, "monthly") },
      ],
      cta: t.consulting.cta,
      to: consultoriaPath,
      accent: "from-wine/20 to-transparent",
      featured: true,
    },
    {
      icon: Building2,
      tag: "03",
      name: t.agency.name,
      desc: t.agency.desc,
      price: "",
      lines: [
        { l: t.agency.a, p: formatPrice(1200, lang) },
        { l: t.agency.b, p: formatPrice(500, lang, "monthly") },
      ],
      cta: t.agency.cta,
      to: serviciosPath,
      accent: "from-purple-deep/30 to-transparent",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground">{t.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.tag}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative glass-card p-6 md:p-8 flex flex-col ${
                  (card as any).featured ? "border-gold/40 ring-1 ring-gold/20" : ""
                }`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.accent} pointer-events-none opacity-60`} />
                <div className="relative flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{card.tag}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-2">{card.name}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{card.desc}</p>

                  {card.price && (
                    <p className="text-2xl md:text-3xl font-bold text-gradient-gold mb-5">{card.price}</p>
                  )}

                  {card.lines.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {card.lines.map((line) => (
                        <li key={line.l} className="flex items-baseline justify-between gap-3 text-sm">
                          <span className="text-muted-foreground">{line.l}</span>
                          <span className="font-semibold text-foreground">{line.p}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    to={card.to}
                    className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-foreground hover:bg-gold/10 hover:border-gold/40 hover:text-gold transition-colors"
                  >
                    {card.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
