import { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, TrendingUp } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { logLead } from "@/lib/adminInbox";
import { trackEvent } from "@/lib/analytics";
import type { Lang } from "@/config/routes";

interface Props { lang?: Lang }

const CURRENCIES = ["USD", "COP", "MXN", "EUR", "BRL", "ARS", "CLP", "PEN"] as const;
const SYMBOL: Record<string, string> = { USD: "$", COP: "$", MXN: "$", EUR: "€", BRL: "R$", ARS: "$", CLP: "$", PEN: "S/" };

interface Inputs {
  desiredIncome: number; personalExpenses: number; businessExpenses: number; taxPct: number;
  hoursPerWeek: number; billablePct: number; vacationDays: number; nonBillableDays: number;
  marginPct: number; currency: string;
}

const DEFAULTS: Inputs = {
  desiredIncome: 3000, personalExpenses: 1500, businessExpenses: 500, taxPct: 20,
  hoursPerWeek: 40, billablePct: 60, vacationDays: 15, nonBillableDays: 10, marginPct: 20, currency: "USD",
};

function compute(i: Inputs) {
  const hoursPerDay = i.hoursPerWeek / 5;
  const availableDays = Math.max(1, 260 - i.vacationDays - i.nonBillableDays);
  const billableHoursMonth = Math.max(1, (availableDays * hoursPerDay * (i.billablePct / 100)) / 12);
  const grossUp = 1 / Math.max(0.05, 1 - i.taxPct / 100);
  const monthlyCosts = i.personalExpenses + i.businessExpenses;
  const monthlyNeed = monthlyCosts + i.desiredIncome;
  const minRate = (monthlyCosts * grossUp) / billableHoursMonth;
  const profitRate = (monthlyNeed * grossUp) / billableHoursMonth;
  const recommended = profitRate * (1 + i.marginPct / 100);
  const dailyBillableHours = hoursPerDay * (i.billablePct / 100);
  const valorDiario = recommended * dailyBillableHours;
  const valorMensual = recommended * billableHoursMonth;
  const horasMeta = (monthlyNeed * grossUp) / Math.max(1, recommended);
  return { minRate, profitRate, recommended, valorDiario, valorMensual, horasMeta, billableHoursMonth };
}

/** Número que transiciona al cambiar (SSR-safe: en el server renderiza el valor real). */
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const raf = useRef<number>();
  useEffect(() => {
    const from = display;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    const dur = 400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setDisplay(Math.round(from + (to - from) * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <>{display.toLocaleString("es-CO")}</>;
}

const CalculadoraValorHora = ({ lang = "es" }: Props) => {
  const [inp, setInp] = useState<Inputs>(DEFAULTS);
  const [touched, setTouched] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const r = useMemo(() => compute(inp), [inp]);
  const sym = SYMBOL[inp.currency] ?? "$";

  useEffect(() => { trackEvent("result_shown", { tool: "valor-hora", language: lang }); }, [lang]);

  const set = (k: keyof Inputs, v: string) => {
    if (!touched) { setTouched(true); trackEvent("tool_started", { tool: "valor-hora", language: lang }); }
    setInp((p) => ({ ...p, [k]: k === "currency" ? v : Number(v) || 0 }));
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    trackEvent("report_requested", { tool: "valor-hora", language: lang });
    await logLead({
      source: "tool", name, email,
      summary: `${t.results.recommended}: ${sym}${Math.round(r.recommended)}/h`,
      payload: { tool: "calculadora-valor-hora", inputs: inp, recommended: Math.round(r.recommended), minRate: Math.round(r.minRate), profitRate: Math.round(r.profitRate), language: lang },
    });
    trackEvent("lead_submitted", { source: "tool", tool: "valor-hora", language: lang });
    setSending(false);
    setDone(true);
  };

  const t = COPY[lang];
  const inputCls = "w-full px-3 py-2.5 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all border border-border/50 bg-background";
  const meterMax = Math.max(r.recommended * 1.25, 1);
  const pct = (v: number) => `${Math.min(100, Math.max(0, (v / meterMax) * 100))}%`;

  const fields: { k: keyof Inputs; label: string; suffix?: string }[] = [
    { k: "desiredIncome", label: t.inputs.desiredIncome, suffix: t.inputs.perMonth },
    { k: "personalExpenses", label: t.inputs.personalExpenses, suffix: t.inputs.perMonth },
    { k: "businessExpenses", label: t.inputs.businessExpenses, suffix: t.inputs.perMonth },
    { k: "taxPct", label: t.inputs.taxPct, suffix: "%" },
    { k: "hoursPerWeek", label: t.inputs.hoursPerWeek, suffix: t.inputs.perWeek },
    { k: "billablePct", label: t.inputs.billablePct, suffix: "%" },
    { k: "vacationDays", label: t.inputs.vacationDays, suffix: t.inputs.perYear },
    { k: "nonBillableDays", label: t.inputs.nonBillableDays, suffix: t.inputs.perYear },
    { k: "marginPct", label: t.inputs.marginPct, suffix: "%" },
  ];

  const tool = (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* Formulario */}
      <div className="lg:col-span-2 glass-card p-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {fields.map((f) => (
            <label key={f.k} className="text-xs text-muted-foreground">
              <span className="block mb-1">{f.label}</span>
              <div className="relative">
                <input type="number" inputMode="decimal" value={inp[f.k] as number} onChange={(e) => set(f.k, e.target.value)} className={inputCls} />
                {f.suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground pointer-events-none">{f.suffix}</span>}
              </div>
            </label>
          ))}
          <label className="text-xs text-muted-foreground col-span-2">
            <span className="block mb-1">{t.inputs.currency}</span>
            <select value={inp.currency} onChange={(e) => set("currency", e.target.value)} className={inputCls}>
              {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        </div>
      </div>

      {/* Resultado */}
      <div className="lg:col-span-3 glass-card p-6 md:p-8 gold-glow flex flex-col">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{t.results.recommendedLabel}</p>
        <p className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-1">
          {sym}<AnimatedNumber value={Math.round(r.recommended)} /><span className="text-2xl text-muted-foreground">/h</span>
        </p>

        {/* Medidor de 3 zonas */}
        <div className="mt-5 mb-2">
          <div className="relative h-3 rounded-full overflow-hidden bg-border/40">
            <div className="absolute inset-y-0 left-0 bg-red-500/60" style={{ width: pct(r.minRate) }} />
            <div className="absolute inset-y-0 bg-amber-500/60" style={{ left: pct(r.minRate), width: `calc(${pct(r.profitRate)} - ${pct(r.minRate)})` }} />
            <div className="absolute inset-y-0 bg-emerald-500/60" style={{ left: pct(r.profitRate), right: 0 }} />
            <motion.div className="absolute -top-1 w-1 h-5 bg-gold rounded-full shadow" animate={{ left: pct(r.recommended) }} transition={{ type: "spring", stiffness: 120, damping: 18 }} />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5">
            <span>{t.zones.unsustainable}</span><span>{t.zones.sustainable}</span><span>{t.zones.profitable}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
          <Metric label={t.results.minimum} value={`${sym}${Math.round(r.minRate)}/h`} />
          <Metric label={t.results.profitable} value={`${sym}${Math.round(r.profitRate)}/h`} />
          <Metric label={t.results.daily} value={`${sym}${Math.round(r.valorDiario)}`} />
          <Metric label={t.results.monthlyEq} value={`${sym}${Math.round(r.valorMensual).toLocaleString("es-CO")}`} />
          <Metric label={t.results.hoursNeeded} value={`${Math.round(r.horasMeta)} h`} />
          <Metric label={t.inputs.billableHours} value={`${Math.round(r.billableHoursMonth)} h`} />
        </div>

        {/* Captura de lead (el resultado ya se mostró: no bloquea) */}
        <div className="mt-6 pt-5 border-t border-border/40">
          {done ? (
            <div className="flex items-center gap-2 text-sm text-emerald-400"><CheckCircle2 className="w-5 h-5" /> {t.lead.done}</div>
          ) : (
            <form onSubmit={submitLead} className="space-y-2">
              <p className="text-sm font-medium text-foreground">{t.lead.title}</p>
              <p className="text-xs text-muted-foreground mb-2">{t.lead.text}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input placeholder={t.lead.name} value={name} onChange={(e) => setName(e.target.value)} className={inputCls + " flex-1"} />
                <input type="email" required placeholder={t.lead.email} value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls + " flex-1"} />
                <button type="submit" disabled={sending} className="btn-gold inline-flex items-center justify-center gap-1.5 disabled:opacity-60 shrink-0">
                  <Send className="w-4 h-4" /> {sending ? t.lead.sending : t.lead.button}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      lang={lang}
      path={t.path}
      seoTitle={t.seoTitle}
      seoDesc={t.seoDesc}
      appName={t.appName}
      h1={t.h1}
      intro={t.intro}
      breadcrumbs={t.breadcrumbs}
      formulaTitle={t.formulaTitle}
      formula={t.formula.map((p, i) => <p key={i}>{p}</p>)}
      exampleTitle={t.exampleTitle}
      example={t.example.map((p, i) => <p key={i}>{p}</p>)}
      faqTitle={t.faqTitle}
      faq={t.faq}
      relatedTitle={t.relatedTitle}
      related={t.related}
      cta={t.cta}
    >
      {tool}
    </ToolLayout>
  );
};

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl bg-background/60 border border-border/40 px-3 py-2">
    <p className="text-[11px] text-muted-foreground leading-tight">{label}</p>
    <p className="font-display font-bold text-foreground flex items-center gap-1"><TrendingUp className="w-3 h-3 text-gold" />{value}</p>
  </div>
);

// ── Contenido (es/en/pt) ────────────────────────────────────────────────────
interface Copy {
  path: string; seoTitle: string; seoDesc: string; appName: string; h1: string; intro: string;
  breadcrumbs: { name: string; path: string }[];
  inputs: Record<"desiredIncome" | "personalExpenses" | "businessExpenses" | "taxPct" | "hoursPerWeek" | "billablePct" | "vacationDays" | "nonBillableDays" | "marginPct" | "currency" | "perMonth" | "perWeek" | "perYear" | "billableHours", string>;
  results: Record<"recommendedLabel" | "recommended" | "minimum" | "profitable" | "daily" | "monthlyEq" | "hoursNeeded", string>;
  zones: Record<"unsustainable" | "sustainable" | "profitable", string>;
  lead: Record<"title" | "text" | "name" | "email" | "button" | "sending" | "done", string>;
  formulaTitle: string; formula: string[]; exampleTitle: string; example: string[];
  faqTitle: string; faq: { q: string; a: string }[];
  relatedTitle: string; related: { label: string; href: string }[];
  cta: { title: string; text: string; label: string; href: string };
}

const COPY: Record<Lang, Copy> = {
  es: {
    path: "/recursos/herramientas/calculadora-valor-hora-freelancer",
    seoTitle: "Calculadora de valor por hora para freelancers | Ferova",
    seoDesc: "Calcula cuánto cobrar por hora considerando tus gastos, impuestos, horas no facturables, vacaciones y margen. Resultado gratis, sin registro.",
    appName: "Calculadora de valor por hora para freelancers",
    h1: "Calculadora de valor por hora para freelancers",
    intro: "Calcula cuánto debes cobrar por hora considerando tus gastos, impuestos, horas no facturables, vacaciones y margen de utilidad. Sin registrarte para ver el resultado.",
    breadcrumbs: [
      { name: "Recursos", path: "/recursos" },
      { name: "Herramientas", path: "/recursos/herramientas" },
      { name: "Valor por hora", path: "/recursos/herramientas/calculadora-valor-hora-freelancer" },
    ],
    inputs: { desiredIncome: "Ingreso neto deseado", personalExpenses: "Gastos personales", businessExpenses: "Gastos del negocio", taxPct: "Impuestos estimados", hoursPerWeek: "Horas por semana", billablePct: "% horas facturables", vacationDays: "Días de vacaciones", nonBillableDays: "Días no facturables", marginPct: "Margen de utilidad", currency: "Moneda", perMonth: "/mes", perWeek: "/sem", perYear: "/año", billableHours: "Horas facturables/mes" },
    results: { recommendedLabel: "Tu tarifa recomendada", recommended: "Tarifa recomendada", minimum: "Mínimo por hora", profitable: "Rentable por hora", daily: "Valor por día", monthlyEq: "Equivalente mensual", hoursNeeded: "Horas para tu meta" },
    zones: { unsustainable: "Insostenible", sustainable: "Sostenible", profitable: "Rentable" },
    lead: { title: "Recibe el informe completo y guarda tu cálculo", text: "Te enviamos el desglose y escenarios. Tus datos solo se usan para contactarte.", name: "Nombre (opcional)", email: "Tu email", button: "Recibir informe", sending: "Enviando...", done: "¡Listo! Te enviaremos el informe completo." },
    formulaTitle: "¿Cómo se calcula el valor por hora?",
    formula: [
      "Primero calculamos tus horas facturables reales al mes: partimos de tus horas por semana, restamos vacaciones y días no facturables, y aplicamos tu porcentaje de horas realmente facturables. Casi nadie factura el 100% de su jornada.",
      "Luego sumamos lo que necesitas cubrir cada mes (gastos personales + gastos del negocio) y le sumamos tu ingreso neto deseado. Ajustamos por impuestos dividiendo entre (1 − % de impuestos), porque debes facturar más para que te quede lo neto.",
      "La tarifa mínima cubre solo tus costos e impuestos. La tarifa rentable añade tu ingreso deseado. La recomendada añade además tu margen de utilidad como colchón.",
    ],
    exampleTitle: "Ejemplo real",
    example: [
      "Si quieres $3.000 netos al mes, tienes $2.000 de gastos, pagas 20% de impuestos, trabajas 40 h/semana facturando el 60%, con 15 días de vacaciones y 20% de margen: tu tarifa mínima ronda los $27/h, la rentable $67/h y la recomendada unos $80/h.",
      "El número cambia en tiempo real a medida que ajustas tus datos, así puedes comparar escenarios.",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Cómo se calcula el valor por hora?", a: "Se toman tus costos, impuestos e ingreso deseado y se dividen entre tus horas facturables reales al mes. La calculadora ajusta por vacaciones, días no facturables y margen." },
      { q: "¿Qué diferencia hay entre tarifa mínima y rentable?", a: "La mínima solo cubre tus costos e impuestos: por debajo de ahí pierdes dinero. La rentable cubre además el ingreso que quieres ganar. La recomendada agrega un margen de seguridad." },
      { q: "¿Cuántas horas puede facturar realmente un freelancer?", a: "Rara vez el 100%. Entre reuniones, propuestas, administración y prospección, un rango realista es 50-70% de las horas trabajadas. Por eso el % de horas facturables es clave." },
      { q: "¿Cómo incluyo vacaciones, impuestos y herramientas?", a: "Las vacaciones y días no facturables reducen tus horas disponibles; los impuestos suben la tarifa (divides entre 1 − % de impuestos); las herramientas van dentro de los gastos del negocio." },
      { q: "¿Cuándo debería subir mi tarifa?", a: "Cuando estás cerca de tu capacidad máxima, cuando tu tarifa está por debajo de la recomendada, o cuando tu propuesta de valor creció. Subir precio suele ser más rentable que trabajar más horas." },
    ],
    relatedTitle: "Recursos relacionados",
    related: [
      { label: "Calculadora de precio de servicio", href: "/recursos/herramientas" },
      { label: "Consultoría estratégica", href: "/consultoria-estrategica" },
      { label: "Ferova One", href: "/productos" },
    ],
    cta: { title: "Configura tu tarifa y tu rentabilidad en Ferova One", text: "Ferova One calcula tu costo por hora y la rentabilidad real de tus servicios, con finanzas y CRM en un solo lugar.", label: "Conocer Ferova One", href: "/productos" },
  },
  en: {
    path: "/en/resources/tools/freelance-hourly-rate-calculator",
    seoTitle: "Freelance hourly rate calculator | Ferova",
    seoDesc: "Calculate how much to charge per hour accounting for your expenses, taxes, non-billable hours, vacation and margin. Free result, no sign-up.",
    appName: "Freelance hourly rate calculator",
    h1: "Freelance hourly rate calculator",
    intro: "Calculate how much you should charge per hour accounting for your expenses, taxes, non-billable hours, vacation and profit margin. No sign-up to see the result.",
    breadcrumbs: [
      { name: "Resources", path: "/en/resources" },
      { name: "Tools", path: "/en/resources/tools" },
      { name: "Hourly rate", path: "/en/resources/tools/freelance-hourly-rate-calculator" },
    ],
    inputs: { desiredIncome: "Desired net income", personalExpenses: "Personal expenses", businessExpenses: "Business expenses", taxPct: "Estimated taxes", hoursPerWeek: "Hours per week", billablePct: "% billable hours", vacationDays: "Vacation days", nonBillableDays: "Non-billable days", marginPct: "Profit margin", currency: "Currency", perMonth: "/mo", perWeek: "/wk", perYear: "/yr", billableHours: "Billable hours/mo" },
    results: { recommendedLabel: "Your recommended rate", recommended: "Recommended rate", minimum: "Minimum per hour", profitable: "Profitable per hour", daily: "Value per day", monthlyEq: "Monthly equivalent", hoursNeeded: "Hours for your goal" },
    zones: { unsustainable: "Unsustainable", sustainable: "Sustainable", profitable: "Profitable" },
    lead: { title: "Get the full report and save your calculation", text: "We'll send the breakdown and scenarios. Your data is only used to contact you.", name: "Name (optional)", email: "Your email", button: "Get report", sending: "Sending...", done: "Done! We'll send you the full report." },
    formulaTitle: "How is the hourly rate calculated?",
    formula: [
      "First we compute your real billable hours per month: we start from your hours per week, subtract vacation and non-billable days, and apply your percentage of actually billable hours. Almost no one bills 100% of their day.",
      "Then we add what you need to cover each month (personal + business expenses) plus your desired net income. We adjust for taxes by dividing by (1 − tax %), because you must bill more to keep your net.",
      "The minimum rate covers only your costs and taxes. The profitable rate adds your desired income. The recommended one also adds your profit margin as a buffer.",
    ],
    exampleTitle: "Real example",
    example: [
      "If you want $3,000 net per month, have $2,000 in expenses, pay 20% tax, work 40 h/week billing 60%, with 15 vacation days and a 20% margin: your minimum rate is around $27/h, profitable $67/h and recommended about $80/h.",
      "The number updates in real time as you adjust your inputs, so you can compare scenarios.",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "How is the hourly rate calculated?", a: "We take your costs, taxes and desired income and divide by your real billable hours per month. The calculator adjusts for vacation, non-billable days and margin." },
      { q: "What's the difference between minimum and profitable rate?", a: "The minimum only covers costs and taxes: below it you lose money. The profitable rate also covers the income you want. The recommended adds a safety margin." },
      { q: "How many hours can a freelancer really bill?", a: "Rarely 100%. Between meetings, proposals, admin and prospecting, a realistic range is 50-70% of worked hours. That's why the billable % matters." },
      { q: "How do I include vacation, taxes and tools?", a: "Vacation and non-billable days reduce your available hours; taxes raise the rate (divide by 1 − tax %); tools go inside business expenses." },
      { q: "When should I raise my rate?", a: "When you're near max capacity, when your rate is below the recommended, or when your value proposition grew. Raising prices is usually more profitable than working more hours." },
    ],
    relatedTitle: "Related resources",
    related: [
      { label: "Service pricing calculator", href: "/en/resources/tools" },
      { label: "Strategic advisory", href: "/en/strategy-advisory" },
      { label: "Ferova One", href: "/en/products" },
    ],
    cta: { title: "Set your rate and profitability in Ferova One", text: "Ferova One calculates your cost per hour and the real profitability of your services, with finance and CRM in one place.", label: "Discover Ferova One", href: "/en/products" },
  },
  pt: {
    path: "/pt/recursos/ferramentas/calculadora-valor-hora-freelancer",
    seoTitle: "Calculadora de valor por hora para freelancers | Ferova",
    seoDesc: "Calcule quanto cobrar por hora considerando gastos, impostos, horas não faturáveis, férias e margem. Resultado grátis, sem cadastro.",
    appName: "Calculadora de valor por hora para freelancers",
    h1: "Calculadora de valor por hora para freelancers",
    intro: "Calcule quanto você deve cobrar por hora considerando seus gastos, impostos, horas não faturáveis, férias e margem de lucro. Sem cadastro para ver o resultado.",
    breadcrumbs: [
      { name: "Recursos", path: "/pt/recursos" },
      { name: "Ferramentas", path: "/pt/recursos/ferramentas" },
      { name: "Valor por hora", path: "/pt/recursos/ferramentas/calculadora-valor-hora-freelancer" },
    ],
    inputs: { desiredIncome: "Renda líquida desejada", personalExpenses: "Gastos pessoais", businessExpenses: "Gastos do negócio", taxPct: "Impostos estimados", hoursPerWeek: "Horas por semana", billablePct: "% horas faturáveis", vacationDays: "Dias de férias", nonBillableDays: "Dias não faturáveis", marginPct: "Margem de lucro", currency: "Moeda", perMonth: "/mês", perWeek: "/sem", perYear: "/ano", billableHours: "Horas faturáveis/mês" },
    results: { recommendedLabel: "Sua tarifa recomendada", recommended: "Tarifa recomendada", minimum: "Mínimo por hora", profitable: "Rentável por hora", daily: "Valor por dia", monthlyEq: "Equivalente mensal", hoursNeeded: "Horas para sua meta" },
    zones: { unsustainable: "Insustentável", sustainable: "Sustentável", profitable: "Rentável" },
    lead: { title: "Receba o relatório completo e salve seu cálculo", text: "Enviamos o detalhamento e cenários. Seus dados só são usados para contato.", name: "Nome (opcional)", email: "Seu email", button: "Receber relatório", sending: "Enviando...", done: "Pronto! Enviaremos o relatório completo." },
    formulaTitle: "Como se calcula o valor por hora?",
    formula: [
      "Primeiro calculamos suas horas faturáveis reais por mês: partimos das horas por semana, subtraímos férias e dias não faturáveis, e aplicamos sua porcentagem de horas realmente faturáveis. Quase ninguém fatura 100% do dia.",
      "Depois somamos o que você precisa cobrir por mês (gastos pessoais + do negócio) mais sua renda líquida desejada. Ajustamos pelos impostos dividindo por (1 − % de impostos), porque você precisa faturar mais para sobrar o líquido.",
      "A tarifa mínima cobre só custos e impostos. A rentável adiciona a renda desejada. A recomendada adiciona ainda sua margem de lucro como colchão.",
    ],
    exampleTitle: "Exemplo real",
    example: [
      "Se você quer $3.000 líquidos por mês, tem $2.000 de gastos, paga 20% de impostos, trabalha 40 h/semana faturando 60%, com 15 dias de férias e 20% de margem: sua tarifa mínima fica em torno de $27/h, a rentável $67/h e a recomendada uns $80/h.",
      "O número muda em tempo real conforme você ajusta os dados, para comparar cenários.",
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
      { q: "Como se calcula o valor por hora?", a: "Pegamos seus custos, impostos e renda desejada e dividimos pelas suas horas faturáveis reais por mês. A calculadora ajusta por férias, dias não faturáveis e margem." },
      { q: "Qual a diferença entre tarifa mínima e rentável?", a: "A mínima só cobre custos e impostos: abaixo dela você perde dinheiro. A rentável cobre também a renda que você quer. A recomendada adiciona uma margem de segurança." },
      { q: "Quantas horas um freelancer realmente fatura?", a: "Raramente 100%. Entre reuniões, propostas, administração e prospecção, um intervalo realista é 50-70% das horas trabalhadas. Por isso o % faturável importa." },
      { q: "Como incluo férias, impostos e ferramentas?", a: "Férias e dias não faturáveis reduzem suas horas disponíveis; impostos aumentam a tarifa (divide por 1 − % de impostos); ferramentas entram nos gastos do negócio." },
      { q: "Quando devo aumentar minha tarifa?", a: "Quando está perto da capacidade máxima, quando sua tarifa está abaixo da recomendada, ou quando sua proposta de valor cresceu. Subir preço costuma ser mais rentável que trabalhar mais horas." },
    ],
    relatedTitle: "Recursos relacionados",
    related: [
      { label: "Calculadora de preço de serviço", href: "/pt/recursos/ferramentas" },
      { label: "Consultoria estratégica", href: "/pt/consultoria-estrategica" },
      { label: "Ferova One", href: "/pt/produtos" },
    ],
    cta: { title: "Configure sua tarifa e rentabilidade no Ferova One", text: "O Ferova One calcula seu custo por hora e a rentabilidade real dos seus serviços, com finanças e CRM em um só lugar.", label: "Conhecer o Ferova One", href: "/pt/produtos" },
  },
};

export default CalculadoraValorHora;
