/**
 * Perfil de María Fernanda Calderón: credenciales, directorios y resultados.
 *
 * Fuente: página de Notion "Datos para ferova.com.co y seoparaecommerce.co"
 * (Centro De Control > Tareas), llenada por Mafe, y las capturas de su perfil
 * de LinkedIn subidas ahí. No añadir nada que no esté en esa fuente.
 *
 * ferova.com.co (repo ferova-core-platform, src/data/founder.ts) tiene una
 * copia con el mismo contenido factual y enfoque de producto; si cambia una
 * credencial, cambia en los dos.
 */

export const FOUNDER = {
  name: "María Fernanda Calderón",
  alternateName: "María Fer Calderón",
  email: "gerencia@seoparaecommerce.co",
  linkedin: "https://www.linkedin.com/in/maria-fer-calderon/",
  ferovaProfile: "https://ferova.com.co/sobre-ferova/maria-fernanda-calderon",
  portfolio: "https://ferova.com.co/portafolio",
  yearsExperience: 7,
};

type Localized = { es: string; en: string };

export type Credential = {
  name: Localized;
  detail?: Localized;
  issuer: string;
  /** AAAA-MM */
  issued: string;
  /** AAAA-MM, solo si la credencial vence. */
  expires?: string;
  kind: "profesional" | "diplomado" | "certificado";
};

/** Orden: título profesional y luego lo más reciente primero. */
export const CREDENTIALS: Credential[] = [
  {
    // Confirmado por Mafe (nov 2026): graduada en junio de 2025.
    name: {
      es: "Profesional en Mercadeo y Estrategia Comercial",
      en: "Bachelor's degree in Marketing and Commercial Strategy",
    },
    issuer: "Universidad EAN",
    issued: "2025-06",
    kind: "profesional",
  },
  {
    name: { es: "Creación de Sistemas en Notion", en: "Building Systems in Notion" },
    detail: { es: "Notion Academy: Workflows y Essentials", en: "Notion Academy: Workflows and Essentials" },
    issuer: "Notion",
    issued: "2026-11",
    kind: "certificado",
  },
  {
    name: { es: "AI For You", en: "AI For You" },
    detail: { es: "Oracle University", en: "Oracle University" },
    issuer: "Oracle",
    issued: "2026-09",
    kind: "certificado",
  },
  {
    name: { es: "Estrategias de Marketing en LinkedIn", en: "LinkedIn Marketing Strategies" },
    detail: {
      es: "Curso de optimización de perfil en LinkedIn para emprendedores",
      en: "LinkedIn profile optimisation course for entrepreneurs",
    },
    issuer: "Platzi",
    issued: "2025-06",
    kind: "certificado",
  },
  {
    name: { es: "Diplomado en Innovación Empresarial", en: "Diploma in Business Innovation" },
    issuer: "Universidad Distrital Francisco José de Caldas",
    issued: "2024-07",
    kind: "diplomado",
  },
  {
    name: { es: "Especialista SEO", en: "SEO Specialist" },
    detail: { es: "Curso de Estrategia de SEO", en: "SEO Strategy course" },
    issuer: "Platzi",
    issued: "2023-11",
    expires: "2025-06",
    kind: "certificado",
  },
];

export type Directory = {
  name: string;
  url: string;
  badge?: { src: string; alt: string; width: number; height: number };
  status: Localized;
};

export const DIRECTORIES: Directory[] = [
  {
    name: "TechBehemoths",
    url: "https://techbehemoths.com/company/ferova",
    badge: {
      src: "https://cdn.techbehemoths.com/public/static/validation/tb-verified-logo.svg",
      alt: "TechBehemoths Verification",
      width: 160,
      height: 48,
    },
    status: { es: "Perfil de empresa verificado", en: "Verified company profile" },
  },
];

const MONTHS: Record<"es" | "en", string[]> = {
  es: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sept.", "oct.", "nov.", "dic."],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

/** "2024-07" → "jul. 2024" / "Jul 2024" */
export function monthLabel(value: string, lang: "es" | "en"): string {
  const [year, month] = value.split("-");
  return `${MONTHS[lang][Number(month) - 1] ?? ""} ${year}`.trim();
}
