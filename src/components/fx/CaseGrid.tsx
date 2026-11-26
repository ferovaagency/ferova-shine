import { PORTFOLIO_CASES, portfolioUrl } from "@/data/portfolio";

/**
 * Casos del portafolio de Ferova (mismo componente que ferova.com.co:
 * src/components/cases/case-grid.tsx). Cada tarjeta abre su caso en el
 * portafolio. Úsese en la portada y en /casos-de-exito (/en/case-studies).
 */
export function CaseGrid({ lang = "es" }: { lang?: "es" | "en" | "pt" }) {
  const l = lang === "en" ? "en" : "es";
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {PORTFOLIO_CASES.map((item) => {
        const copy = item.copy[l];
        return (
          <li key={item.id}>
            <a href={portfolioUrl(l, item.id)} className="post-card group" target="_blank" rel="noopener">
              {item.image ? (
                <img
                  src={item.image}
                  alt={l === "en" ? `${item.name[l]} website home page` : `Página de inicio del sitio de ${item.name[l]}`}
                  width={1500}
                  height={797}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[15/8] w-full object-cover object-top"
                />
              ) : (
                <span className="post-card__cover !aspect-[15/8] text-4xl" aria-hidden="true">
                  {copy.stat}
                </span>
              )}
              <span className="flex flex-1 flex-col p-7 sm:p-9">
                <span className="fx-muted text-sm">{copy.sector}</span>
                <span className="mt-1 text-2xl font-semibold" style={{ fontFamily: "Poppins, system-ui, sans-serif" }}>
                  {item.name[l]}
                </span>
                <span className="mt-4 text-3xl font-semibold text-[#541014]" style={{ fontFamily: "Poppins, system-ui, sans-serif" }}>
                  {copy.stat}
                </span>
                <span className="fx-muted text-sm">{copy.statLabel}</span>
                <span className="mt-4 leading-relaxed">{copy.summary}</span>
                <span className="fx-muted mt-3 font-mono text-xs tracking-wide">{copy.stack}</span>
                <span className="mt-auto pt-6 font-semibold text-[#541014] group-hover:underline">
                  {l === "en" ? "See the case" : "Ver el caso"} →
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
