// Multimoneda strict mapping: ES→COP, EN→USD, PT→BRL.
// Nunca mezclar monedas dentro del mismo idioma.

export type Lang = "es" | "en" | "pt";
export type Period = "once" | "monthly" | "from" | "fromMonthly";

export const TRM_USD_COP = 4000;
export const TRM_USD_BRL = 5.2;

const NF = {
  es: new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }),
  en: new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }),
  pt: new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }),
};

const LABELS: Record<Lang, { monthly: string; from: string; fromMonthly: string }> = {
  es: { monthly: "/mes", from: "Desde", fromMonthly: "Desde" },
  en: { monthly: "/mo", from: "From", fromMonthly: "From" },
  pt: { monthly: "/mês", from: "A partir de", fromMonthly: "A partir de" },
};

/**
 * Formatea un precio base en USD a la moneda local del idioma.
 * - es → COP ($X.XXX.XXX COP)
 * - en → USD ($X USD)
 * - pt → BRL (R$X BRL)
 */
export function formatPrice(usd: number, lang: Lang, period: Period = "once"): string {
  let value: number;
  let symbol: string;
  let code: string;

  if (lang === "es") {
    value = Math.round((usd * TRM_USD_COP) / 1000) * 1000;
    symbol = "$";
    code = "COP";
  } else if (lang === "pt") {
    value = Math.round(usd * TRM_USD_BRL);
    symbol = "R$";
    code = "BRL";
  } else {
    value = usd;
    symbol = "$";
    code = "USD";
  }

  const formatted = `${symbol}${NF[lang].format(value)} ${code}`;
  const L = LABELS[lang];

  switch (period) {
    case "monthly":
      return `${formatted}${L.monthly}`;
    case "from":
      return `${L.from} ${formatted}`;
    case "fromMonthly":
      return `${L.fromMonthly} ${formatted}${L.monthly}`;
    default:
      return formatted;
  }
}
