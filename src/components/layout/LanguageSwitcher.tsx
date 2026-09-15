import { Link, useLocation } from "react-router-dom";
import { alternatesForAnyPath, LANGS, type Lang } from "@/config/routes";
import { trackEvent } from "@/lib/analytics";

const LABEL: Record<Lang, string> = { es: "ES", en: "EN", pt: "PT" };
const FULL: Record<Lang, string> = { es: "Español", en: "English", pt: "Português" };

interface Props {
  /** Idioma de la página actual. */
  lang: Lang;
  /** `header` usa texto compacto; `footer` añade el nombre completo del idioma. */
  variant?: "header" | "footer";
  className?: string;
  onNavigate?: () => void;
}

/**
 * Selector de idioma.
 *
 * REGLA CENTRAL: sólo se muestra cuando la ruta actual tiene equivalente REAL
 * en el otro idioma, según el registro de rutas. Si no lo tiene, no se
 * renderiza nada.
 *
 * Por qué: un selector que, al no haber traducción, te manda al home es peor
 * que no tener selector. El usuario cree que perdió la página y se va. Hoy hay
 * 5 rutas sin versión en inglés (/seo-para-agencias, /auditoria-seo-tecnica,
 * /migraciones-seo, /sobre-nosotros y el evaluador de AI Search); en esas, esto
 * devuelve null a propósito.
 *
 * Los enlaces son <Link> reales y navegables, no botones con JS: así el
 * rastreador los sigue y refuerzan las mismas equivalencias que declara el
 * hreflang de SEO.tsx.
 */
export default function LanguageSwitcher({ lang, variant = "header", className = "", onNavigate }: Props) {
  const { pathname } = useLocation();
  const alternates = alternatesForAnyPath(pathname);
  if (!alternates) return null;

  // Sólo mercados mantenidos (LANGS excluye pt, que es legado).
  const available = LANGS.filter((l) => alternates[l]);
  if (available.length < 2) return null;

  const isFooter = variant === "footer";

  return (
    <nav
      aria-label={lang === "en" ? "Language" : "Idioma"}
      className={`inline-flex items-center gap-1 ${className}`}
    >
      {available.map((l, i) => {
        const href = alternates[l] as string;
        const current = l === lang;
        return (
          <span key={l} className="inline-flex items-center">
            {i > 0 && <span aria-hidden="true" className="px-1.5 text-muted-foreground/50">/</span>}
            {current ? (
              <span aria-current="true" className="text-sm font-bold">
                {isFooter ? FULL[l] : LABEL[l]}
              </span>
            ) : (
              <Link
                to={href}
                hrefLang={l}
                onClick={() => {
                  trackEvent("language_switched", { from: lang, to: l, path: pathname });
                  onNavigate?.();
                }}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                title={FULL[l]}
              >
                {isFooter ? FULL[l] : LABEL[l]}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
