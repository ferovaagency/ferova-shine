export type SeoEditorialItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Technical SEO" | "Ecommerce SEO" | "SEO for Agencies" | "AI Search" | "SEO Migrations";
  readTime: string;
};

export const SEO_EDITORIAL: SeoEditorialItem[] = [
  { slug: "seo-shopify-colombia", title: "SEO para Shopify en Colombia", excerpt: "Arquitectura, colecciones, productos y decisiones técnicas para tiendas Shopify que necesitan crecer orgánicamente.", category: "Ecommerce SEO", readTime: "10 min" },
  { slug: "seo-ecommerce-colombia-estrategia", title: "Estrategia SEO para ecommerce en Colombia", excerpt: "Cómo conectar demanda, catálogo, arquitectura y prioridades comerciales en una estrategia orgánica sostenible.", category: "Ecommerce SEO", readTime: "12 min" },
  { slug: "ia-seo-ecommerce-2026", title: "IA y SEO para ecommerce en 2026", excerpt: "Qué cambia con las respuestas generativas y qué fundamentos técnicos, editoriales y de autoridad siguen vigentes.", category: "AI Search", readTime: "11 min" },
  { slug: "como-encontrar-palabras-clave-ecommerce", title: "Cómo encontrar palabras clave para ecommerce", excerpt: "Un proceso para investigar demanda y convertirla en categorías, páginas de producto y contenido útil.", category: "Ecommerce SEO", readTime: "9 min" },
  { slug: "seo-para-tiendas-online", title: "SEO para tiendas online: prioridades reales", excerpt: "Los componentes técnicos y comerciales que conviene ordenar antes de multiplicar tareas o contenidos.", category: "Technical SEO", readTime: "10 min" },
  { slug: "bigcommerce-seo-guia-completa-posicionar-tienda-google", title: "Guía SEO para BigCommerce", excerpt: "Decisiones de indexación, arquitectura y contenido para posicionar una tienda construida sobre BigCommerce.", category: "Ecommerce SEO", readTime: "13 min" },
  { slug: "trafico-sin-ventas-tienda-diagnostico-solucion", title: "Por qué una tienda recibe tráfico pero no vende", excerpt: "Cómo distinguir un problema de intención, experiencia, oferta o medición antes de responsabilizar al canal orgánico.", category: "Ecommerce SEO", readTime: "8 min" },
  { slug: "agencia-seo-ecommerce-preguntas-contratar", title: "Preguntas para contratar una agencia o consultor SEO", excerpt: "Criterios para evaluar experiencia, metodología, evidencia y capacidad de implementación antes de elegir un partner.", category: "SEO for Agencies", readTime: "9 min" },
];

export const SEO_CATEGORIES = ["Todos", "Technical SEO", "Ecommerce SEO", "SEO for Agencies", "AI Search", "SEO Migrations"] as const;
