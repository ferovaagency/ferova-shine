import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { SITE_ORIGIN } from "@/config/routes";
import "./white-label-landing.css";
import {
  WL_HERO, WL_STATS, WL_INTRO, WL_SCOPE, WL_COST, WL_RISK, WL_MODELS,
  WL_BRAND, WL_FEROVA, WL_FRAMEWORK, WL_CHANNELS, WL_RELATED, WL_FINAL, WL_SEO,
  type Frag,
} from "@/content/whiteLabelVsInHouse";

const LINKEDIN = "https://www.linkedin.com/in/maria-fer-calderon/";

/** Renderiza un párrafo con enlaces internos sobre el texto literal. */
function P({ frags, className }: { frags: Frag[]; className?: string }) {
  return (
    <p className={className}>
      {frags.map((f, i) =>
        typeof f === "string" ? (
          f
        ) : (
          <Link key={i} to={f.to} className="wl-il">
            {f.text}
          </Link>
        ),
      )}
    </p>
  );
}

const SECTIONS = ["top", "scope", "cost", "risk", "models", "brand", "ferova", "reach"];

/**
 * Landing /en/white-label-seo-vs-in-house.
 *
 * No usa PositioningPage: la maquetación es de una sola pieza. El texto es
 * literal del documento aprobado (src/content/whiteLabelVsInHouse.ts) y todo el
 * movimiento es presentación: aparición al scroll, barra de progreso, parallax
 * suave del hero y raíl de secciones. Todo respeta prefers-reduced-motion.
 */
export default function WhiteLabelVsInHouse() {
  const progRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Aparición al entrar en viewport.
    const els = Array.from(document.querySelectorAll<HTMLElement>(".wl-rv, .wl-rung"));
    let io: IntersectionObserver | undefined;
    if (reduce) {
      els.forEach((el) => el.classList.add("is-in"));
    } else {
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io?.unobserve(e.target);
            }
          }),
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
      );
      els.forEach((el) => io!.observe(el));
    }

    // Progreso + parallax.
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (progRef.current) progRef.current.style.width = `${pct * 100}%`;
      if (heroBgRef.current && !reduce) {
        heroBgRef.current.style.transform = `scale(1.06) translateY(${h.scrollTop * 0.14}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Punto activo del raíl.
    const dots = Array.from(document.querySelectorAll<HTMLAnchorElement>(".wl-rail a"));
    const secs = SECTIONS.map((id) => document.getElementById(id));
    const io2 = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = secs.indexOf(e.target as HTMLElement);
          dots.forEach((d, j) => d.classList.toggle("is-on", j === i));
        }),
      { threshold: 0.2, rootMargin: "-25% 0px -55% 0px" },
    );
    secs.forEach((s) => s && io2.observe(s));

    return () => {
      io?.disconnect();
      io2.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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

  return (
    <div className="wl seo-brand min-h-screen">
      <SEO
        title={WL_SEO.title}
        description={WL_SEO.description}
        path={WL_SEO.path}
        lang="en"
        type="article"
        jsonLd={[articleLd, personLd]}
        breadcrumbs={[
          { name: "Home", path: "/en" },
          { name: "White label vs in-house", path: WL_SEO.path },
        ]}
      />
      <Header lang="en" />

      <div className="wl-prog" ref={progRef} aria-hidden="true" />
      <nav className="wl-rail" aria-label="Sections">
        {SECTIONS.map((id, i) => (
          <a key={id} href={`#${id}`} className={i === 0 ? "is-on" : undefined} aria-label={id} />
        ))}
      </nav>

      <main id="contenido-principal">
        {/* ---------- hero ---------- */}
        <header className="wl-hero" id="top">
          {WL_HERO.heroImage && (
            <div
              className="wl-hero-bg"
              ref={heroBgRef}
              style={{ backgroundImage: `url('${WL_HERO.heroImage}')` }}
              aria-hidden="true"
            />
          )}
          <div className="wl-hero-veil" aria-hidden="true" />
          <div className="wl-wrap">
            <p className="wl-eyebrow wl-rv">{WL_HERO.eyebrow}</p>
            <h1 className="wl-rv wl-d1">
              {WL_HERO.h1a}
              <em>{WL_HERO.h1b}</em>
            </h1>
            <p className="wl-lede wl-rv wl-d2">{WL_HERO.lede}</p>
            <div className="wl-cta-row wl-rv wl-d3">
              <a href="#reach" className="seo-primary-button" data-cta="hero">
                {WL_HERO.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#cost" className="seo-secondary-button">
                {WL_HERO.ctaSecondary}
              </a>
            </div>
          </div>
        </header>

        {/* ---------- tira de cifras ---------- */}
        <section className="wl-strip">
          <div className="wl-wrap">
            {WL_STATS.map((s, i) => (
              <div key={s.n} className={`wl-stat wl-rv wl-d${i}`}>
                <p className="n">{s.n}</p>
                <p className="l">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- intro ---------- */}
        <section className="wl-s">
          <div className="wl-wrap wl-two">
            <div className="wl-rv">
              <p className="wl-kick">{WL_INTRO.kick}</p>
              <h2>{WL_INTRO.h2}</h2>
            </div>
            <div className="wl-rv wl-d1">
              <P frags={WL_INTRO.p1} />
              <P frags={WL_INTRO.p2} className="wl-p" />
            </div>
          </div>
        </section>

        {/* ---------- alcance ---------- */}
        <section className="wl-s wl-s--white" id="scope">
          <div className="wl-wrap">
            <div className="wl-rv">
              <p className="wl-kick">{WL_SCOPE.kick}</p>
              <h2>{WL_SCOPE.h2}</h2>
              <p className="wl-p wl-col">{WL_SCOPE.lead}</p>
            </div>
            {WL_SCOPE.subs.map((s) => (
              <div className="wl-sub wl-rv" key={s.tag}>
                <p className="wl-tag">{s.tag}</p>
                <div>
                  <h3>{s.h3}</h3>
                  <P frags={s.body} className="wl-p" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- costo ---------- */}
        <section className="wl-s wl-s--ink" id="cost">
          <div className="wl-wrap">
            <div className="wl-rv">
              <p className="wl-kick">{WL_COST.kick}</p>
              <h2>{WL_COST.h2}</h2>
              <p className="wl-p wl-col">{WL_COST.lead}</p>
            </div>

            <div className="wl-face wl-rv wl-d1">
              <div className="a">
                <h3>{WL_COST.inHouse.h3}</h3>
                <p>{WL_COST.inHouse.intro}</p>
                <div className="wl-ladder">
                  {WL_COST.inHouse.rungs.map((r, i) => (
                    <div
                      key={r.label}
                      className={`wl-rung wl-rv wl-d${i}`}
                      style={{ ["--wl-bar" as string]: r.bar }}
                    >
                      <span>{r.label}</span>
                      <span className="v">{r.value}</span>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: 20 }}>{WL_COST.inHouse.outro}</p>
              </div>
              <div className="b">
                <h3>{WL_COST.wholesale.h3}</h3>
                <P frags={WL_COST.wholesale.body} />
                <div className="wl-ladder">
                  {WL_COST.wholesale.rungs.map((r, i) => (
                    <div
                      key={r.label}
                      className={`wl-rung wl-rv wl-d${i}`}
                      style={{ ["--wl-bar" as string]: r.bar }}
                    >
                      <span>{r.label}</span>
                      <span className="v">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="wl-mid wl-rv">
              <p>{WL_COST.mid.text}</p>
              <a href="#reach" className="seo-primary-button" data-cta="mid">
                {WL_COST.mid.label} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ---------- riesgo ---------- */}
        <section className="wl-s" id="risk">
          <div className="wl-wrap wl-two">
            <div className="wl-rv">
              <p className="wl-kick">{WL_RISK.kick}</p>
              <h2>{WL_RISK.h2}</h2>
            </div>
            <div className="wl-rv wl-d1">
              <p>{WL_RISK.lead}</p>
            </div>
          </div>
          <div className="wl-wrap">
            {WL_RISK.subs.map((s) => (
              <div className="wl-sub wl-rv" key={s.tag}>
                <p className="wl-tag">{s.tag}</p>
                <div>
                  <h3>{s.h3}</h3>
                  <p className="wl-p">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- modalidades ---------- */}
        <section className="wl-s wl-s--sand" id="models">
          <div className="wl-wrap">
            <div className="wl-rv">
              <p className="wl-kick">{WL_MODELS.kick}</p>
              <h2>{WL_MODELS.h2}</h2>
              <P frags={WL_MODELS.lead} className="wl-p wl-col" />
            </div>
            <div className="wl-cards">
              {WL_MODELS.cards.map((c, i) => (
                <div className={`wl-card wl-rv wl-d${i}`} key={c.num}>
                  <p className="num">{c.num}</p>
                  <h3>{c.h3}</h3>
                  <p>{c.p}</p>
                </div>
              ))}
            </div>
            {WL_MODELS.subs.map((s) => (
              <div className="wl-sub wl-rv" key={s.tag}>
                <p className="wl-tag">{s.tag}</p>
                <div>
                  <h3>{s.h3}</h3>
                  <P frags={s.body} className="wl-p" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- integración ---------- */}
        <section className="wl-s wl-s--white" id="brand">
          <div className="wl-wrap">
            <div className="wl-rv">
              <p className="wl-kick">{WL_BRAND.kick}</p>
              <h2>{WL_BRAND.h2}</h2>
              <p className="wl-p wl-col">{WL_BRAND.lead}</p>
            </div>
            <div className="wl-steps">
              {WL_BRAND.steps.map((s, i) => (
                <div className={`wl-step wl-rv wl-d${i}`} key={s.n}>
                  <p className="n">{s.n}</p>
                  <div>
                    <h3>{s.h3}</h3>
                    <p>{s.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- en la práctica ---------- */}
        <section className="wl-s wl-s--dark" id="ferova">
          <div className="wl-wrap">
            <div className="wl-rv">
              <p className="wl-kick">{WL_FEROVA.kick}</p>
              <h2>{WL_FEROVA.h2}</h2>
              <p className="wl-p wl-col">{WL_FEROVA.lead}</p>
            </div>
            <div className="wl-face wl-rv wl-d1">
              <div className="a">
                <h3>{WL_FEROVA.left.h3}</h3>
                <P frags={WL_FEROVA.left.body} />
              </div>
              <div className="b">
                <h3>{WL_FEROVA.right.h3}</h3>
                <P frags={WL_FEROVA.right.body} />
              </div>
            </div>
          </div>
        </section>

        {/* ---------- marco de decisión ---------- */}
        <section className="wl-s">
          <div className="wl-wrap wl-two">
            <div className="wl-rv">
              <p className="wl-kick">{WL_FRAMEWORK.kick}</p>
              <h2>{WL_FRAMEWORK.h2}</h2>
            </div>
            <div className="wl-rv wl-d1">
              <p>{WL_FRAMEWORK.p1}</p>
              <P frags={WL_FRAMEWORK.p2} className="wl-p" />
            </div>
          </div>
        </section>

        {/* ---------- canales + relacionados ---------- */}
        <section className="wl-s wl-s--sand" id="reach">
          <div className="wl-wrap">
            <div className="wl-rv">
              <p className="wl-kick">{WL_CHANNELS.kick}</p>
              <h2>{WL_CHANNELS.h2}</h2>
            </div>
            <div className="wl-ch-grid">
              {WL_CHANNELS.items.map((c, i) => {
                const isMail = c.href.startsWith("mailto:");
                return (
                  <a
                    key={c.n}
                    className={`wl-ch wl-rv wl-d${i}`}
                    href={c.href}
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                    data-cta={`channel-${c.n.toLowerCase()}`}
                  >
                    <p className="n">{c.n}</p>
                    <p className="dd">{c.dd}</p>
                    <span className="go">{c.go} →</span>
                  </a>
                );
              })}
            </div>

            <p className="wl-kick wl-rv" style={{ marginTop: 52 }}>
              Related
            </p>
            <ul className="wl-rel wl-rv">
              {WL_RELATED.map((r) => (
                <li key={r.to}>
                  <Link to={r.to}>{r.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- cierre ---------- */}
        <section className="wl-final">
          <div className="wl-wrap">
            <div className="wl-rv">
              <p className="wl-eyebrow">{WL_FINAL.eyebrow}</p>
              <h2 style={{ marginTop: 14 }}>{WL_FINAL.h2}</h2>
            </div>
            <a href="#reach" className="seo-primary-button wl-rv wl-d1" data-cta="final">
              {WL_FINAL.label} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </div>
  );
}
