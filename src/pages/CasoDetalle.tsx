import { useEffect, useState, type ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { casesData } from './CasosDeExito';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import type { CaseResultHighlight } from '@/integrations/supabase/cms-types';
import { getCaseCms } from '@/integrations/supabase/lazy';
import { SITE_ORIGIN } from '@/config/routes';
import { CtaBand, FeraButton, FxLink, Panel, Section } from '@/components/fx/primitives';
import { PORTFOLIO_CASES, portfolioUrl } from '@/data/portfolio';

interface Props { lang?: 'es' | 'en' | 'pt'; }

/** Héroe índigo alineado a la izquierda con enlace de vuelta (como el artículo del blog). */
function DetailHero({ backPath, backLabel, eyebrow, title, intro }: { backPath: string; backLabel: string; eyebrow?: string; title: string; intro?: ReactNode }) {
  return (
    <section className="page-hero on-dark grid-field">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <Link to={backPath} className="fx-muted mb-6 flex w-fit items-center gap-2 text-sm hover:text-white">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> {backLabel}
        </Link>
        {eyebrow ? <p className="eyebrow-pill mb-5">{eyebrow}</p> : null}
        <h1 className="max-w-4xl text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">{title}</h1>
        {intro ? <p className="fx-muted mt-6 max-w-3xl text-lg leading-relaxed">{intro}</p> : null}
      </div>
    </section>
  );
}

const CasoDetalle = ({ lang = 'es' }: Props) => {
  const { id } = useParams();
  const [dynamicCase, setDynamicCase] = useState<{ slug: string; client_public_name: string | null; sector: string; country: string | null; summary: string; challenge: string; diagnosis: string; intervention: string; learnings: string; limitations: string | null; result_highlights: CaseResultHighlight[] } | null>(null);
  const [cmsChecked, setCmsChecked] = useState(lang !== 'es');
  const cases = casesData[lang];
  const caso = cases.find(c => c.id === id);
  const backPath = lang === 'es' ? '/casos-de-exito' : '/en/case-studies';
  const listName = lang === 'es' ? 'Casos de éxito' : lang === 'pt' ? 'Casos de sucesso' : 'Case studies';

  useEffect(() => {
    if (lang !== 'es' || !id) return;
    void (async () => {
      const caseCms = await getCaseCms();
      const { data } = await caseCms.from('case_studies').select('slug,client_public_name,sector,country,summary,challenge,diagnosis,intervention,learnings,limitations,result_highlights').eq('slug', id).eq('status', 'published').maybeSingle();
      setDynamicCase(data as typeof dynamicCase);
      setCmsChecked(true);
    })();
  }, [id, lang]);

  // Los casos de éxito son los del portafolio: si el id coincide, se pinta ese caso.
  const portfolioCase = PORTFOLIO_CASES.find((item) => item.id === id);
  if (portfolioCase) {
    const l = lang === 'en' ? 'en' : 'es';
    const copy = portfolioCase.copy[l];
    const name = portfolioCase.name[l];
    const listPath = lang === 'en' ? '/en/case-studies' : lang === 'pt' ? '/pt/casos-de-sucesso' : '/casos-de-exito';
    const path = `${listPath}/${portfolioCase.id}`;
    const caseUrl = portfolioUrl(l, portfolioCase.id);
    const articleLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: name,
      description: copy.summary,
      inLanguage: lang,
      url: `${SITE_ORIGIN}${path}`,
      ...(portfolioCase.image ? { image: portfolioCase.image } : {}),
      author: { '@type': 'Person', name: 'María Fer Calderón' },
      publisher: { '@type': 'Organization', name: 'Ferova', url: SITE_ORIGIN },
      about: copy.sector,
      sameAs: caseUrl,
    };
    const ui = l === 'en'
      ? { back: 'All cases', result: 'Result', stack: 'Stack', more: 'See the full case in the portfolio', alt: `${name} website home page`, closeTitle: 'Tell me what your agency needs to deliver.', cta: 'Talk to Fera' }
      : { back: 'Todos los casos', result: 'Resultado', stack: 'Stack', more: 'Ver el caso completo en el portafolio', alt: `Página de inicio del sitio de ${name}`, closeTitle: 'Cuéntame qué necesita entregar tu agencia.', cta: 'Hablar con Fera' };
    return (
      <div className="fx-site min-h-screen">
        <SEO
          title={`${name}: ${copy.stat} — Ferova`}
          description={`${copy.summary} ${copy.stat} ${copy.statLabel}.`.slice(0, 160)}
          path={path}
          lang={lang}
          type="article"
          image={portfolioCase.image}
          jsonLd={articleLd}
          alternates={{ es: `/casos-de-exito/${portfolioCase.id}`, en: `/en/case-studies/${portfolioCase.id}` }}
          breadcrumbs={[{ name: lang === 'en' ? 'Home' : lang === 'pt' ? 'Início' : 'Inicio', path: lang === 'en' ? '/en' : lang === 'pt' ? '/pt' : '/' }, { name: listName, path: listPath }, { name, path }]}
        />
        <Header currentLang={lang} />
        <main id="contenido-principal" className="pt-20">
          <DetailHero backPath={listPath} backLabel={ui.back} eyebrow={copy.sector} title={name} intro={copy.summary} />
          <Section>
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-16">
              {portfolioCase.image ? (
                <div className="offset-visual">
                  <img src={portfolioCase.image} alt={ui.alt} width={1500} height={797} fetchPriority="high" className="aspect-[15/8] w-full object-cover object-top" />
                </div>
              ) : (
                <div className="post-card__cover !aspect-[15/8] rounded-[1.25rem] text-4xl sm:text-5xl" aria-hidden="true">{copy.stat}</div>
              )}
              <div className="grid gap-6">
                <div className="case-card">
                  <small>{ui.result}</small>
                  <strong className="text-[#541014]">{copy.stat}</strong>
                  <span className="fx-muted mt-2">{copy.statLabel}</span>
                </div>
                <Panel>
                  <p className="fx-muted text-sm font-semibold">{ui.stack}</p>
                  <p className="mt-2 font-mono text-sm tracking-wide">{copy.stack}</p>
                </Panel>
                <FxLink to={caseUrl} className="w-full">{ui.more}</FxLink>
              </div>
            </div>
          </Section>
          <CtaBand title={ui.closeTitle}>
            <FeraButton source={`case_detail_${portfolioCase.id}`}>{ui.cta}</FeraButton>
          </CtaBand>
        </main>
        <Footer currentLang={lang} />
      </div>
    );
  }

  if (!cmsChecked) {
    return (
      <div className="fx-site min-h-screen">
        <Header currentLang={lang} />
        <main id="contenido-principal" className="pt-20">
          <section className="page-hero on-dark grid-field">
            <div className="mx-auto flex min-h-[50vh] w-full max-w-7xl items-center justify-center px-5 py-16 sm:px-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
              <span className="sr-only">Cargando</span>
            </div>
          </section>
        </main>
        <Footer currentLang={lang} />
      </div>
    );
  }

  if (dynamicCase) {
    const title = dynamicCase.client_public_name || `Caso de ${dynamicCase.sector}`;
    const path = `/casos-de-exito/${dynamicCase.slug}`;
    const articleLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: dynamicCase.summary.slice(0, 155),
      inLanguage: 'es',
      url: `${SITE_ORIGIN}${path}`,
      author: { '@type': 'Person', name: 'María Fer Calderón' },
      publisher: { '@type': 'Organization', name: 'Ferova', url: SITE_ORIGIN },
      about: dynamicCase.sector,
    };
    return (
      <div className="fx-site min-h-screen">
        <SEO title={`${title} — Ferova Agency`} description={dynamicCase.summary.slice(0, 155)} path={path} lang="es" type="article" jsonLd={articleLd} breadcrumbs={[{ name: 'Inicio', path: '/' }, { name: 'Casos de éxito', path: backPath }, { name: title, path }]} />
        <Header currentLang="es" />
        <main id="contenido-principal" className="pt-20">
          <DetailHero backPath={backPath} backLabel="Todos los casos" eyebrow={`${dynamicCase.sector}${dynamicCase.country ? ` · ${dynamicCase.country}` : ''}`} title={title} intro={dynamicCase.summary} />

          {dynamicCase.result_highlights.length > 0 && (
            <Section tone="surface">
              <h2 className="text-3xl sm:text-4xl">Resultados</h2>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {dynamicCase.result_highlights.map((result) => (
                  <li key={`${result.label}-${result.value}`} className="case-card">
                    <small>{result.label}</small>
                    <strong>{result.value}</strong>
                    {result.context && <p className="fx-muted mt-3 text-sm leading-relaxed">{result.context}</p>}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section narrow>
            <div className="grid gap-6">
              {[["El reto", dynamicCase.challenge], ["Diagnóstico", dynamicCase.diagnosis], ["Intervención", dynamicCase.intervention], ["Aprendizajes", dynamicCase.learnings]].map(([heading, body]) => (
                <Panel key={heading}>
                  <h2 className="text-2xl">{heading}</h2>
                  <p className="fx-muted mt-4 whitespace-pre-line leading-relaxed">{body}</p>
                </Panel>
              ))}
              {dynamicCase.limitations && (
                <section className="rounded-[1.25rem] border border-[#c0930e]/40 bg-[#c0930e]/5 p-7">
                  <h2 className="flex items-center gap-2 text-lg"><AlertTriangle aria-hidden="true" className="h-5 w-5 text-[#c0930e]" /> Alcance y limitaciones</h2>
                  <p className="fx-muted mt-3 text-sm leading-relaxed">{dynamicCase.limitations}</p>
                </section>
              )}
            </div>
          </Section>

          <CtaBand title="¿Quieres resultados similares?">
            <FxLink to="https://wa.me/17866894686">Solicitar cotización</FxLink>
          </CtaBand>
        </main>
        <Footer currentLang="es" />
      </div>
    );
  }

  if (!caso) {
    return (
      <div className="fx-site min-h-screen">
        <Header currentLang={lang} />
        <main id="contenido-principal" className="pt-20">
          <section className="page-hero on-dark grid-field">
            <div className="mx-auto flex min-h-[50vh] w-full max-w-5xl flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
              <h1 className="text-4xl leading-[1.15] sm:text-5xl">{lang === 'es' ? 'Caso no encontrado' : 'Case not found'}</h1>
              <Link to={backPath} className="fx-btn mt-8"><ArrowLeft aria-hidden="true" /> {lang === 'es' ? 'Volver' : 'Go back'}</Link>
            </div>
          </section>
        </main>
        <Footer currentLang={lang} />
      </div>
    );
  }

  const detailPath = lang === 'en' ? `/en/case-studies/${caso.id}` : lang === 'pt' ? `/pt/casos-de-sucesso/${caso.id}` : `/casos-de-exito/${caso.id}`;
  const listPath = lang === 'en' ? '/en/case-studies' : lang === 'pt' ? '/pt/casos-de-sucesso' : '/casos-de-exito';
  const seoDesc = (caso.challenge || '').slice(0, 155);
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caso.title,
    description: seoDesc,
    inLanguage: lang,
    url: `${SITE_ORIGIN}${detailPath}`,
    author: { '@type': 'Person', name: 'María Fer Calderón' },
    publisher: { '@type': 'Organization', name: 'Ferova', url: SITE_ORIGIN },
    contentLocation: { '@type': 'Place', name: caso.country },
  };
  const pl = lang === 'en' ? 'en' : 'es';

  // Caso heredado (fuera del portafolio): solo la narrativa. Sus cifras no se
  // publican porque no están en el portafolio ni tienen evidencia registrada.
  return (
    <div className="fx-site min-h-screen">
      <SEO
        title={`${caso.title} — Ferova Agency`}
        description={seoDesc}
        path={detailPath}
        lang={lang}
        type="article"
        jsonLd={articleLd}
        breadcrumbs={[{ name: lang === 'en' ? 'Home' : lang === 'pt' ? 'Início' : 'Inicio', path: lang === 'en' ? '/en' : lang === 'pt' ? '/pt' : '/' }, { name: listName, path: listPath }, { name: caso.title, path: detailPath }]}
      />
      <Header currentLang={lang} />
      <main id="contenido-principal" className="pt-20">
        <DetailHero backPath={listPath} backLabel={lang === 'es' ? 'Todos los casos' : 'All cases'} eyebrow={caso.country} title={caso.title} />

        <Section narrow>
          <div className="grid gap-6">
            <Panel>
              <h2 className="text-2xl">{lang === 'es' ? 'El reto' : 'The challenge'}</h2>
              <p className="fx-muted mt-4 leading-relaxed">{caso.challenge}</p>
            </Panel>
            <Panel>
              <h2 className="text-2xl">{lang === 'es' ? 'La solución' : 'The solution'}</h2>
              <p className="fx-muted mt-4 leading-relaxed">{caso.solution}</p>
            </Panel>
            <section className="rounded-[1.25rem] border border-[#c0930e]/40 bg-white p-7">
              <div className="flex items-start gap-3">
                <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#c0930e]" />
                <div>
                  <h2 className="text-lg">{lang === 'es' ? 'Métricas en validación documental' : 'Figures pending documentation'}</h2>
                  <p className="fx-muted mt-2 text-sm leading-relaxed">
                    {lang === 'es'
                      ? 'Las cifras históricas de este caso no se muestran hasta reconciliar fuente, fecha de corte, definición y permiso de publicación. La narrativa permanece disponible como contexto del trabajo realizado.'
                      : 'The historical figures for this case are not shown until their source, cut-off date, definition and publishing consent are reconciled. The narrative stays available as context for the work done.'}
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <FxLink to={portfolioUrl(pl)}>{pl === 'en' ? 'See the documented cases in the portfolio' : 'Ver los casos documentados del portafolio'}</FxLink>
          </div>
        </Section>

        <CtaBand title={lang === 'es' ? '¿Quieres resultados similares?' : 'Want similar results?'}>
          <FeraButton source={`case_detail_legacy_${caso.id}`}>{lang === 'en' ? 'Talk to Fera' : 'Hablar con Fera'}</FeraButton>
          <FxLink to="https://wa.me/17866894686" variant="outline">{lang === 'es' ? 'Solicitar cotización' : 'Request a quote'}</FxLink>
        </CtaBand>
      </main>
      <Footer currentLang={lang} />
    </div>
  );
};

export default CasoDetalle;
