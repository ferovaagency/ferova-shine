import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/**
 * Primitivas del sistema de diseño Ferova (mismo vocabulario que ferova.com.co:
 * src/components/site/primitives.tsx). Estilos en src/styles/ferova-system.css.
 * Toda página pública se arma con estas piezas dentro de <FxPage>.
 */

export type FxLang = "es" | "en" | "pt";

/** Abre Fera (el chat de cotización) con un mensaje inicial opcional. */
export function openFera(prompt?: string, source = "fx") {
  trackEvent("quote_requested", { source });
  window.dispatchEvent(new CustomEvent("open-fera-quote", { detail: prompt ? { prompt } : {} }));
}

export function Section({
  children,
  className = "",
  tone = "default",
  id,
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "surface" | "ink";
  id?: string;
  narrow?: boolean;
}) {
  const tones = { default: "", surface: "fx-bg-surface", ink: "fx-bg-ink on-dark grid-field" } as const;
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className={`mx-auto w-full ${narrow ? "max-w-4xl" : "max-w-7xl"} px-5 py-16 sm:px-8 sm:py-24`}>{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow-pill ${className}`}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className={intro ? "grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16" : "max-w-3xl"}>
      <div>
        {eyebrow ? <p className="eyebrow-pill mb-5">{eyebrow}</p> : null}
        <As className="max-w-[22ch] text-3xl leading-tight sm:text-4xl lg:text-5xl lg:leading-[1.15]">{title}</As>
      </div>
      {intro ? <p className="fx-muted text-base leading-relaxed sm:text-lg">{intro}</p> : null}
    </div>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`panel-card ${className}`}>{children}</div>;
}

export function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="icon-tile">
      <Icon aria-hidden="true" strokeWidth={1.5} />
    </span>
  );
}

export function StatusBadge({ children }: { children: ReactNode }) {
  return <span className="status-badge">{children}</span>;
}

export function CheckList({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`grid gap-3 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="check-item">{item}</li>
      ))}
    </ul>
  );
}

type BtnVariant = "primary" | "outline";

/** Enlace con forma de botón. Rutas internas con <Link>, externas con <a>. */
export function FxLink({
  to,
  children,
  variant = "primary",
  className = "",
  arrow = true,
  onClick,
}: {
  to: string;
  children: ReactNode;
  variant?: BtnVariant;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
}) {
  const cls = `fx-btn ${variant === "outline" ? "fx-btn--outline" : ""} ${className}`;
  const inner = (
    <>
      {children}
      {arrow ? <ArrowUpRight aria-hidden="true" /> : null}
    </>
  );
  if (/^(https?:|mailto:|tel:)/.test(to)) {
    const external = to.startsWith("http");
    return (
      <a href={to} className={cls} onClick={onClick} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to} className={cls} onClick={onClick}>
      {inner}
    </Link>
  );
}

/** Botón que abre Fera. */
export function FeraButton({
  children,
  prompt,
  source,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  prompt?: string;
  source?: string;
  variant?: BtnVariant;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => openFera(prompt, source)}
      className={`fx-btn ${variant === "outline" ? "fx-btn--outline" : ""} ${className}`}
    >
      {children}
      <ArrowUpRight aria-hidden="true" />
    </button>
  );
}

export function Breadcrumbs({ items, lang = "es" }: { items: { name: string; path: string }[]; lang?: FxLang }) {
  const home = lang === "en" ? "/en" : "/";
  return (
    <nav aria-label={lang === "en" ? "Breadcrumb" : "Ruta de navegación"} className="mb-6">
      <ol className="fx-muted flex flex-wrap items-center gap-2 text-sm">
        <li>
          <Link to={home} className="hover:underline">{lang === "en" ? "Home" : "Inicio"}</Link>
        </li>
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {index === items.length - 1 ? (
              <span style={{ color: "var(--fx-foreground)" }}>{item.name}</span>
            ) : (
              <Link to={item.path} className="hover:underline">{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Héroe interior: índigo con retícula, centrado (como las páginas de ferova.com.co). */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  lang = "es",
  children,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs?: { name: string; path: string }[];
  lang?: FxLang;
  children?: ReactNode;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <section className="page-hero on-dark grid-field">
      <div
        className={`mx-auto flex w-full max-w-5xl flex-col px-5 py-16 sm:px-8 sm:py-24 ${centered ? "items-center text-center" : "items-start"}`}
      >
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} lang={lang} /> : null}
        {eyebrow ? <p className="eyebrow-pill mb-5">{eyebrow}</p> : null}
        <h1 className="max-w-4xl text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">{title}</h1>
        {intro ? <p className="fx-muted mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">{intro}</p> : null}
        {children ? (
          <div className={`mt-8 flex flex-wrap items-center gap-3 ${centered ? "justify-center" : ""}`}>{children}</div>
        ) : null}
      </div>
    </section>
  );
}

/** Banda final vino con círculos concéntricos. */
export function CtaBand({ title, body, children }: { title: ReactNode; body?: ReactNode; children?: ReactNode }) {
  return (
    <section className="cta-band on-dark">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-28">
        <h2 className="text-4xl leading-[1.15] sm:text-5xl">{title}</h2>
        {body ? <p className="fx-muted mt-6 max-w-2xl text-lg leading-relaxed">{body}</p> : null}
        {children ? <div className="mt-10 flex flex-wrap justify-center gap-3">{children}</div> : null}
      </div>
    </section>
  );
}

/** Preguntas frecuentes con <details> (el schema FAQPage lo arma cada página). */
export function FaqList({ items }: { items: [string, ReactNode][] }) {
  return (
    <div className="faq-list">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <div>{a}</div>
        </details>
      ))}
    </div>
  );
}

/** Pasos numerados en acordeón (como "Cómo trabajamos" de ferova.com.co). */
export function ProcessSteps({ steps }: { steps: { title: string; body: ReactNode }[] }) {
  return (
    <div className="process">
      {steps.map((step, i) => (
        <details key={step.title} open={i === 0}>
          <summary>
            <span className="process__number">{String(i + 1).padStart(2, "0")}</span>
            {step.title}
          </summary>
          <div className="process__panel">{step.body}</div>
        </details>
      ))}
    </div>
  );
}

/** Schema FAQPage a partir de pares pregunta/respuesta en texto. */
export function faqSchema(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}
