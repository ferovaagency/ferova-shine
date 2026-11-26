import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { PageHero, Section } from '@/components/fx/primitives';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const cookieRows = [
  ['cookie_consent', 'Ferova', 'Guardar elección y su fecha de vencimiento', 'Esencial', '12 meses'],
  ['_ga', 'Google Analytics', 'Distinguir navegadores para medición agregada', 'Analítica', 'Hasta 2 años'],
  ['_gid', 'Google Analytics', 'Distinguir navegadores a corto plazo', 'Analítica', '24 horas'],
  ['_gat', 'Google Analytics', 'Limitar solicitudes de medición', 'Analítica', '1 minuto'],
  ['_fbp', 'Meta', 'Medición y remarketing si existe una etiqueta activa en GTM', 'Marketing', 'Hasta 90 días'],
  ['_gcl_au', 'Google', 'Medición publicitaria si existe una etiqueta activa', 'Marketing', 'Hasta 90 días'],
];

const Cookies = ({ lang = 'es' }: Props) => {
  const en = lang === 'en';
  const openSettings = () => window.dispatchEvent(new CustomEvent('open-cookie-settings'));
  const path = en ? '/en/cookies' : '/cookies';
  const title = en ? 'Cookie policy and choices' : 'Política y preferencias de cookies';
  const crumbs = [{ name: 'Cookies', path }];
  const pageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url: `https://seoparaecommerce.co${path}`,
    inLanguage: en ? 'en' : 'es',
    version: '2.0',
    dateModified: '2026-08-08',
    publisher: { '@type': 'Organization', name: 'Ferova Agency' },
  };
  return <div className="fx-site min-h-screen">
    <SEO title={en ? 'Cookie choices | Ferova' : 'Preferencias de cookies | Ferova'} description={en ? 'Cookies used by Ferova, their duration and how to accept or reject optional categories.' : 'Cookies usadas por Ferova, su duración y cómo aceptar o rechazar categorías opcionales.'} path={path} lang={en ? 'en' : 'es'} noindex={lang === 'pt'} jsonLd={pageLd} breadcrumbs={[{ name: en ? 'Home' : 'Inicio', path: en ? '/en' : '/' }, ...crumbs]} />
    <Header lang={en ? 'en' : 'es'} />
    <main id="contenido-principal" className="pt-20">
      <PageHero align="left" eyebrow={en ? 'Version 2.0 · August 8, 2026' : 'Versión 2.0 · 8 de agosto de 2026'} title={title} intro={en ? 'The site works with essential storage. Analytics and marketing scripts remain off unless you allow them.' : 'El sitio funciona con almacenamiento esencial. Los scripts analíticos y de marketing permanecen apagados salvo que los autorices.'} breadcrumbs={crumbs} lang={en ? 'en' : 'es'}>
        <button type="button" onClick={openSettings} className="fx-btn">{en ? 'Review my choices' : 'Revisar mis preferencias'}</button>
      </PageHero>

      <Section narrow>
        <article className="fx-prose">
          <h2 className="!mt-0">{en ? 'Prior consent' : 'Consentimiento previo'}</h2>
          <p>{en ? 'On your first visit, only essential storage is used. Accepting and rejecting optional cookies have the same visual prominence. You can choose analytics, marketing and functional categories separately.' : 'En la primera visita solo usamos almacenamiento esencial. Aceptar y rechazar opcionales tienen el mismo peso visual. Puedes elegir por separado analítica, marketing y preferencias funcionales.'}</p>
          <h2>{en ? 'Cookies that may be used' : 'Cookies que pueden utilizarse'}</h2>
          <p>{en ? 'The exact optional cookies depend on which tags are active. They are never loaded before the matching category is accepted.' : 'Las cookies opcionales exactas dependen de las etiquetas activas. Nunca se cargan antes de aceptar la categoría correspondiente.'}</p>
        </article>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-[#dfdcea]"><table className="fx-table min-w-[760px]"><thead><tr>{(en ? ['Cookie', 'Provider', 'Purpose', 'Type', 'Duration'] : ['Cookie', 'Proveedor', 'Finalidad', 'Tipo', 'Duración']).map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{cookieRows.map((row) => <tr key={row[0]}>{row.map((cell, i) => <td key={cell} className={i === 0 ? 'font-mono text-sm' : 'fx-muted'}>{cell}</td>)}</tr>)}</tbody></table></div>
        <article className="fx-prose mt-10">
          <h2 className="!mt-0">{en ? 'Choice duration and withdrawal' : 'Vigencia y cambio de elección'}</h2>
          <p>{en ? 'Your choice expires after 12 months and the site will ask again. You can reopen the panel at any time from “Cookie settings” in the footer. Withdrawal stops future optional loading and attempts to remove first-party optional cookies already present.' : 'Tu elección vence después de 12 meses y el sitio volverá a preguntar. Puedes abrir el panel cuando quieras desde “Configurar cookies” en el pie de página. Revocar detiene futuras cargas opcionales e intenta borrar las cookies opcionales propias existentes.'}</p>
          <h2>{en ? 'Third parties and browser controls' : 'Terceros y controles del navegador'}</h2>
          <p>{en ? 'Optional providers include Google, Meta through GTM when configured, and Sortlist Radar. Their own policies also apply. Your browser can delete or block stored cookies, but doing so does not replace your choice in this panel.' : 'Los proveedores opcionales incluyen Google, Meta mediante GTM cuando esté configurado y Sortlist Radar. También aplican sus políticas. El navegador permite borrar o bloquear cookies, pero eso no sustituye tu elección en este panel.'}</p>
          <p><button type="button" onClick={openSettings} className="fx-btn fx-btn--outline">{en ? 'Review my choices' : 'Revisar mis preferencias'}</button></p>
        </article>
      </Section>
    </main>
    <Footer lang={en ? 'en' : 'es'} />
  </div>;
};

export default Cookies;
