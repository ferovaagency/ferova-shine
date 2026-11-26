/**
 * Casos de éxito: son los MISMOS del portafolio de Ferova.
 *
 * Copia de ferova-core-platform/src/data/portfolio.ts (fuente:
 * ferova.com.co/portafolio). Si un dato cambia allá, cambia aquí. No añadir
 * casos que no estén publicados en el portafolio. Las capturas se sirven
 * desde ferova.com.co.
 */
type Lang = "es" | "en";
type CaseCopy = { stat: string; statLabel: string; sector: string; summary: string; stack: string };

export type PortfolioCase = {
  id: string;
  name: Record<Lang, string>;
  /** El caso de preescolares no tiene captura: los nombres son confidenciales. */
  image?: string;
  copy: Record<Lang, CaseCopy>;
};

const FEROVA = "https://ferova.com.co";

export const PORTFOLIO_CASES: PortfolioCase[] = [
  {
    id: "netpower-it",
    name: { es: "Netpower IT", en: "Netpower IT" },
    image: `${FEROVA}/portafolio/netpower/home-desktop.webp`,
    copy: {
      es: {
        stat: "0 → 13 M",
        statLabel: "COP en ventas mensuales en tres meses",
        sector: "Tecnología B2B · Colombia",
        summary: "De una tienda PrestaShop sin ventas a un canal que vende y crece cada mes.",
        stack: "React · TypeScript · Supabase",
      },
      en: {
        stat: "0 → 13 M",
        statLabel: "COP in monthly sales within three months",
        sector: "B2B technology · Colombia",
        summary: "From a PrestaShop store with no sales to a channel that sells and grows every month.",
        stack: "React · TypeScript · Supabase",
      },
    },
  },
  {
    id: "all-for-all",
    name: { es: "All For All", en: "All For All" },
    image: `${FEROVA}/portafolio/allforall/home-desktop.webp`,
    copy: {
      es: {
        stat: "0 → ventas",
        statLabel: "de un WordPress sin tráfico a ventas web y por WhatsApp",
        sector: "Comercio electrónico de tecnología · Colombia",
        summary: "Una tienda nueva, construida desde cero, con inventario y precios sincronizados con el local físico.",
        stack: "React · Supabase · Openpay · IA",
      },
      en: {
        stat: "0 → sales",
        statLabel: "from a WordPress store with no traffic to web and WhatsApp sales",
        sector: "Technology e-commerce · Colombia",
        summary: "A new store, built from scratch, with inventory and prices synced to the physical shop.",
        stack: "React · Supabase · Openpay · AI",
      },
    },
  },
  {
    id: "preescolares-florida",
    name: { es: "Tres preescolares de Florida", en: "Three Florida preschools" },
    copy: {
      es: {
        stat: "5 % → 50 %",
        statLabel: "de visibilidad en respuestas de IA en tres meses",
        sector: "Educación preescolar · Florida, EE. UU.",
        summary:
          "En las consultas locales analizadas, la visibilidad en IA de uno de los tres preescolares pasó del 5 % al 50 % en tres meses.",
        stack: "WordPress · Webflow · SEO y GEO",
      },
      en: {
        stat: "5% → 50%",
        statLabel: "visibility in AI answers within three months",
        sector: "Early education · Florida, USA",
        summary:
          "For one of the three preschools, visibility in AI answers rose from 5% to 50% over three months for the local queries tracked.",
        stack: "WordPress · Webflow · SEO & GEO",
      },
    },
  },
  {
    id: "caro-color",
    name: { es: "Caro Color", en: "Caro Color" },
    image: `${FEROVA}/portafolio/carocolor/home-desktop.webp`,
    copy: {
      es: {
        stat: "≈100",
        statLabel: "reseñas positivas en menos de un mes",
        sector: "Belleza · Chapinero, Bogotá",
        summary: "Un salón de belleza con sitio propio para recibir reservas y vender los productos capilares que usa en el salón.",
        stack: "Lovable · Reservas · Tienda · WhatsApp",
      },
      en: {
        stat: "≈100",
        statLabel: "positive reviews in under a month",
        sector: "Beauty · Chapinero, Bogotá",
        summary: "A hair salon with its own site to take bookings and sell the professional hair products it uses in the salon.",
        stack: "Lovable · Booking · Shop · WhatsApp",
      },
    },
  },
];

/** Página del portafolio en ferova.com.co, en el idioma pedido y con el caso a la vista. */
export function portfolioUrl(lang: Lang, id?: string): string {
  return `${FEROVA}/portafolio?lang=${lang === "en" ? "en" : "es"}${id ? `#${id}` : ""}`;
}
