import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { SITE_ORIGIN } from "@/config/routes";
import { FeraButton, PageHero, Panel, Section, SectionHeading } from "@/components/fx/primitives";
import {
  WL_HERO, WL_STATS, WL_INTRO, WL_SCOPE, WL_COST, WL_RISK, WL_MODELS,
  WL_BRAND, WL_FEROVA, WL_FRAMEWORK, WL_CHANNELS, WL_RELATED, WL_FINAL, WL_SEO,
  type Frag, type Rung,
} from "@/content/whiteLabelVsInHouse";

const LINKEDIN = "https://www.linkedin.com/in/maria-fer-calderon/";
const MONO = { fontFamily: '"IBM Plex Mono", ui-monospace, monospace' };
const POPPINS = { fontFamily: "Poppins, system-ui, sans-serif" };

/** Renderiza un párrafo con enlaces internos sobre el texto literal. */
function P({ frags, className }: { frags: Frag[]; className?: string }) {
  return (
    <p className={className}>
      {frags.map((f, i) =>
        typeof f === "string" ? (
          f
        ) : (
          <Link key={i} to={f.to} className="font-semibold text-[var(--fx-primary)] underline decoration-[#c0930e] underline-offset-[0.2em]">
            {f.text}
          </Link>
        ),
      )}
    </p>
  );
}

/** Subapartado: etiqueta a la izquierda, H3 y texto a la derecha. */
function Sub({ tag, title, children }: { tag: string; title: string; children: ReactNode }) {
  return (
    <div className="grid gap-3 border-t pt-8 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10" style={{ borderColor: "var(--fx-border)" }}>
      <p className="text-sm font-semibold uppercase tracking-[0.06em] text-[var(--fx-accent)]" style={POPPINS}>
        {tag}
      </p>
      <div>
        <h3 className="text-xl sm:text-2xl">{title}</h3>
        <div className="fx-muted mt-3 leading-relaxed sm:text-lg">{children}</div>
      </div>
    </div>
  );
}

/** Escalera de costos: la barra es proporcional al rango y solo decorativa. */
function Ladder({ rungs }: { rungs: Rung[] }) {
  return (
    <div className="mt-6 grid gap-3">
      {rungs.map((r) => (
        <div
          key={r.label}
          className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl px-5 py-4"
          style={{
            background: `linear-gradient(90deg, rgb(255 255 255 / 16%) ${r.bar}, rgb(255 255 255 / 6%) ${r.bar})`,
          }}
        >
          <span>{r.label}</span>
          <span className="whitespace-nowrap font-semibold tabular-nums" style={POPPINS}>
            {r.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Banda vino de cierre (misma pieza visual que CtaBand) con etiqueta sobre el titular. */
function ClosingBand({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <section className="cta-band on-dark">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="eyebrow-pill mb-6">{eyebrow}</p>
        <h2 className="max-w-[22ch] text-4xl leading-[1.15] sm:text-5xl">{title}</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </section>
  );
}

/**
 * Landing /en/white-label-seo-vs-in-house con el sistema de diseño de Ferova.
 *
 * No usa PositioningPage: el texto es literal del documento aprobado
 * (src/content/whiteLabelVsInHouse.ts). Se compone con las piezas del sistema:
 * héroe índigo, cifras en case-card, secciones alternas, un bloque oscuro para
 * los costos y banda vino de cierre.
 */
export default function WhiteLabelVsInHouse() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: WL_HERO.h1a + WL_HERO.h1b,
    description: WL_SEO.description,
    inLanguage: "en",
    mainEntityOfPage: `${SITE_ORIGIN}${WL_SEO.path}`,
    author: { "@type": "Person", name: "María Fer Calderón" },
  };
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "María Fer Calderón",
    jobTitle: "Senior technical SEO consultant",
    worksFor: { "@type": "Organization", name: "Ferova Agency" },
    address: { "@type": "PostalAddress", addressLocality: "Bogotá", addressCountry: "CO" },
    sameAs: [LINKEDIN],
  };
  const crumbs = [{ name: "White label vs in-house", path: WL_SEO.path }];

  return (
    <div className="fx-site min-h-screen">
      <SEO
        title={WL_SEO.title}
        description={WL_SEO.description}
        path={WL_SEO.path}
        lang="en"
        type="article"
        jsonLd={[articleLd, personLd]}
        breadcrumbs={[{ name: "Home", path: "/en" }, ...crumbs]}
      />
      <Header lang="en" />

      <main id="contenido-principal" className="pt-20">
        {/* ---------- hero ---------- */}
        <div id="top">
          <PageHero
            align="left"
            lang="en"
            breadcrumbs={crumbs}
            eyebrow={WL_HERO.eyebrow}
            title={
              <>
                {WL_HERO.h1a}
                <em className="not-italic text-[#ffe7a3]">{WL_HERO.h1b}</em>
              </>
            }
            intro={WL_HERO.lede}
          >
            <a href="#reach" className="fx-btn" data-cta="hero">
              {WL_HERO.ctaPrimary} <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="#cost" className="fx-btn fx-btn--outline">
              {WL_HERO.ctaSecondary}
            </a>
          </PageHero>
        </div>

        {/* ---------- tira de cifras ---------- */}
        <Section tone="surface">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WL_STATS.map((s) => (
              <div key={s.n} className="case-card">
                <strong className="!mt-0">{s.n}</strong>
                <p className="fx-muted mt-3 text-sm leading-relaxed">{s.l}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- intro ---------- */}
        <Section>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <SectionHeading eyebrow={WL_INTRO.kick} title={WL_INTRO.h2} />
            <div className="fx-muted space-y-4 leading-relaxed sm:text-lg">
              <P frags={WL_INTRO.p1} />
              <P frags={WL_INTRO.p2} />
            </div>
          </div>
        </Section>

        {/* ---------- alcance ---------- */}
        <Section tone="surface" id="scope">
          <SectionHeading eyebrow={WL_SCOPE.kick} title={WL_SCOPE.h2} />
          <p className="fx-muted mt-6 max-w-3xl leading-relaxed sm:text-lg">{WL_SCOPE.lead}</p>
          <div className="mt-12 grid gap-10">
            {WL_SCOPE.subs.map((s) => (
              <Sub key={s.tag} tag={s.tag} title={s.h3}>
                <P frags={s.body} />
              </Sub>
            ))}
          </div>
        </Section>

        {/* ---------- costo (bloque oscuro de énfasis) ---------- */}
        <Section tone="ink" id="cost">
          <SectionHeading eyebrow={WL_COST.kick} title={WL_COST.h2} />
          <p className="fx-muted mt-6 max-w-3xl leading-relaxed sm:text-lg">{WL_COST.lead}</p>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Panel>
              <h3>{WL_COST.inHouse.h3}</h3>
              <p className="fx-muted mt-3 leading-relaxed">{WL_COST.inHouse.intro}</p>
              <Ladder rungs={WL_COST.inHouse.rungs} />
              <p className="fx-muted mt-5 leading-relaxed">{WL_COST.inHouse.outro}</p>
            </Panel>
            <Panel>
              <h3>{WL_COST.wholesale.h3}</h3>
              <P frags={WL_COST.wholesale.body} className="fx-muted mt-3 leading-relaxed" />
              <Ladder rungs={WL_COST.wholesale.rungs} />
            </Panel>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-[1.25rem] border p-8" style={{ borderColor: "var(--fx-border)" }}>
            <p className="max-w-[40ch] text-xl font-semibold md:text-2xl" style={POPPINS}>
              {WL_COST.mid.text}
            </p>
            <a href="#reach" className="fx-btn shrink-0" data-cta="mid">
              {WL_COST.mid.label} <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </Section>

        {/* ---------- riesgo ---------- */}
        <Section id="risk">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <SectionHeading eyebrow={WL_RISK.kick} title={WL_RISK.h2} />
            <p className="fx-muted leading-relaxed sm:text-lg lg:self-end">{WL_RISK.lead}</p>
          </div>
          <div className="mt-12 grid gap-10">
            {WL_RISK.subs.map((s) => (
              <Sub key={s.tag} tag={s.tag} title={s.h3}>
                <p>{s.body}</p>
              </Sub>
            ))}
          </div>
        </Section>

        {/* ---------- modalidades ---------- */}
        <Section tone="surface" id="models">
          <SectionHeading eyebrow={WL_MODELS.kick} title={WL_MODELS.h2} />
          <P frags={WL_MODELS.lead} className="fx-muted mt-6 max-w-3xl leading-relaxed sm:text-lg" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {WL_MODELS.cards.map((c) => (
              <Panel key={c.num}>
                <p className="mb-6 text-sm text-[var(--fx-accent)]" style={MONO}>
                  {c.num}
                </p>
                <h3>{c.h3}</h3>
                <p className="fx-muted mt-3 leading-relaxed">{c.p}</p>
              </Panel>
            ))}
          </div>
          <div className="mt-14 grid gap-10">
            {WL_MODELS.subs.map((s) => (
              <Sub key={s.tag} tag={s.tag} title={s.h3}>
                <P frags={s.body} />
              </Sub>
            ))}
          </div>
        </Section>

        {/* ---------- integración ---------- */}
        <Section id="brand">
          <SectionHeading eyebrow={WL_BRAND.kick} title={WL_BRAND.h2} />
          <p className="fx-muted mt-6 max-w-3xl leading-relaxed sm:text-lg">{WL_BRAND.lead}</p>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {WL_BRAND.steps.map((s) => (
              <Panel key={s.n} className="flex gap-5">
                <span className="process__number" aria-hidden="true">
                  {s.n}
                </span>
                <div>
                  <h3>{s.h3}</h3>
                  <p className="fx-muted mt-3 leading-relaxed">{s.p}</p>
                </div>
              </Panel>
            ))}
          </div>
        </Section>

        {/* ---------- en la práctica ---------- */}
        <Section tone="surface" id="ferova">
          <SectionHeading eyebrow={WL_FEROVA.kick} title={WL_FEROVA.h2} />
          <p className="fx-muted mt-6 max-w-3xl leading-relaxed sm:text-lg">{WL_FEROVA.lead}</p>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Panel>
              <h3>{WL_FEROVA.left.h3}</h3>
              <P frags={WL_FEROVA.left.body} className="fx-muted mt-3 leading-relaxed" />
            </Panel>
            <Panel>
              <h3>{WL_FEROVA.right.h3}</h3>
              <P frags={WL_FEROVA.right.body} className="fx-muted mt-3 leading-relaxed" />
            </Panel>
          </div>
        </Section>

        {/* ---------- marco de decisión ---------- */}
        <Section>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <SectionHeading eyebrow={WL_FRAMEWORK.kick} title={WL_FRAMEWORK.h2} />
            <div className="fx-muted space-y-4 leading-relaxed sm:text-lg">
              <p>{WL_FRAMEWORK.p1}</p>
              <P frags={WL_FRAMEWORK.p2} />
            </div>
          </div>
        </Section>

        {/* ---------- canales + relacionados ---------- */}
        <Section tone="surface" id="reach">
          <SectionHeading eyebrow={WL_CHANNELS.kick} title={WL_CHANNELS.h2} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WL_CHANNELS.items.map((c) => {
              const isMail = c.href.startsWith("mailto:");
              return (
                <a
                  key={c.n}
                  className="link-tile"
                  href={c.href}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener noreferrer"}
                  data-cta={`channel-${c.n.toLowerCase()}`}
                >
                  <p className="text-lg font-semibold" style={POPPINS}>
                    {c.n}
                  </p>
                  <p className="fx-muted mt-2 break-words text-sm leading-6">{c.dd}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">{c.go} →</span>
                </a>
              );
            })}
          </div>

          <p className="eyebrow-pill mb-6 mt-14">Related</p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WL_RELATED.map((r) => (
              <li key={r.to}>
                <Link to={r.to} className="link-tile flex items-center justify-between gap-4 font-semibold">
                  {r.label}
                  <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------- cierre ---------- */}
        <ClosingBand eyebrow={WL_FINAL.eyebrow} title={WL_FINAL.h2}>
          <a href="#reach" className="fx-btn" data-cta="final">
            {WL_FINAL.label} <ArrowUpRight aria-hidden="true" />
          </a>
          <FeraButton variant="outline" source="wl_vs_inhouse_final">
            Talk to Fera
          </FeraButton>
        </ClosingBand>
      </main>
      <Footer lang="en" />
    </div>
  );
}
