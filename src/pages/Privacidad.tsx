import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { PageHero, Panel, Section } from '@/components/fx/primitives';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const purposesEs = [
  ['Responder consultas y preparar cotizaciones', 'Nombre, contacto, agencia y alcance solicitado', 'Medidas precontractuales y autorización'],
  ['Prestar y administrar servicios contratados', 'Contacto, facturación, accesos e información del proyecto', 'Ejecución del contrato y obligaciones legales'],
  ['Comunicaciones comerciales solicitadas', 'Nombre y correo', 'Consentimiento revocable'],
  ['Analítica opcional y mejora del sitio', 'Identificadores, dispositivo y navegación', 'Consentimiento mediante el panel de cookies'],
  ['Seguridad y prevención de abuso', 'IP, registros técnicos e incidentes', 'Interés legítimo y deber de seguridad'],
];

const providers = [
  ['Supabase', 'Backend, formularios y funciones de servidor', 'Región contratada y subencargados declarados por el proveedor'],
  ['Lovable AI Gateway / Google Gemini', 'Procesar las respuestas de Fera', 'Infraestructura internacional bajo condiciones contractuales del proveedor'],
  ['Brevo', 'Correo transaccional o comercial autorizado', 'Unión Europea y subencargados declarados'],
  ['Google', 'Analítica y gestión de etiquetas, solo con consentimiento', 'Infraestructura internacional y mecanismos contractuales aplicables'],
  ['Sortlist Radar', 'Analítica opcional del sitio', 'Solo se carga tras consentimiento analítico'],
];

const Privacidad = ({ lang = 'es' }: Props) => {
  const en = lang === 'en';
  const path = en ? '/en/privacy' : '/privacidad';
  const title = en ? 'Privacy and AI transparency policy' : 'Política de privacidad y transparencia de IA';
  const crumbs = [{ name: en ? 'Privacy' : 'Privacidad', path }];
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
    <SEO title={en ? 'Privacy and AI transparency | Ferova' : 'Privacidad y transparencia de IA | Ferova'} description={en ? 'How Ferova handles personal data, optional cookies and information sent through Fera.' : 'Cómo Ferova trata datos personales, cookies opcionales y la información enviada a Fera.'} path={path} lang={en ? 'en' : 'es'} noindex={lang === 'pt'} jsonLd={pageLd} breadcrumbs={[{ name: en ? 'Home' : 'Inicio', path: en ? '/en' : '/' }, ...crumbs]} />
    <Header lang={en ? 'en' : 'es'} />
    <main id="contenido-principal" className="pt-20">
      <PageHero align="left" eyebrow={en ? 'Version 2.0 · August 8, 2026' : 'Versión 2.0 · 8 de agosto de 2026'} title={title} intro={en ? 'This page explains, in practical terms, what we collect, why we use it, which providers help us and how you can exercise your rights.' : 'Esta página explica, de forma práctica, qué recopilamos, para qué lo usamos, qué proveedores intervienen y cómo puedes ejercer tus derechos.'} breadcrumbs={crumbs} lang={en ? 'en' : 'es'} />
      <Section narrow>
        <article className="fx-prose">
          <h2 className="!mt-0">{en ? '1. Controller and contact' : '1. Responsable y contacto'}</h2>
          <p>{en ? 'María Fernanda Calderón Pinilla, trading as Ferova Agency, NIT 1000502437-0. Calle 74 #15-80, Bogotá D.C., Colombia.' : 'María Fernanda Calderón Pinilla, persona natural comerciante que opera como Ferova Agency, NIT 1000502437-0. Calle 74 #15-80, Bogotá D.C., Colombia.'}<br />Email: <a href="mailto:gerencia@seoparaecommerce.co">gerencia@seoparaecommerce.co</a> · WhatsApp: <a href="https://wa.me/17866894686">+1 786 689 4686</a>.</p>

          <h2>{en ? '2. Legal framework' : '2. Marco aplicable'}</h2>
          <p>{en ? 'We apply Colombian Law 1581 of 2012 and its regulatory rules. Where the GDPR applies, we also observe Regulation (EU) 2016/679, applicable ePrivacy rules and the AI transparency duties relevant to this service.' : 'Aplicamos la Ley 1581 de 2012 y sus normas reglamentarias en Colombia. Cuando corresponda, también observamos el Reglamento (UE) 2016/679, las reglas ePrivacy y los deberes de transparencia de IA aplicables al servicio.'}</p>

          <h2>{en ? '3. Purposes and legal grounds' : '3. Finalidades y bases jurídicas'}</h2>
          {en ? <ul><li>Quotes and enquiries: pre-contractual steps and consent.</li><li>Contracted services: contract performance and legal duties.</li><li>Requested marketing: revocable consent.</li><li>Optional analytics and marketing cookies: prior consent.</li><li>Security: legitimate interest and security duties.</li></ul> : <div className="mt-4 overflow-x-auto rounded-2xl border border-[#dfdcea]"><table className="fx-table min-w-[680px]"><thead><tr><th>Finalidad</th><th>Datos</th><th>Base</th></tr></thead><tbody>{purposesEs.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell} className="fx-muted">{cell}</td>)}</tr>)}</tbody></table></div>}

          <h2>{en ? '4. Data we receive' : '4. Datos que recibimos'}</h2>
          <p>{en ? 'Identification and contact details, agency and project information, billing details when a contract exists, authorized platform access, form content and optional navigation information after consent. Please do not send passwords, payment-card data, health data or other sensitive information through Fera.' : 'Datos de identificación y contacto, información de la agencia y del proyecto, facturación cuando existe contrato, accesos autorizados a plataformas, contenido de formularios y datos opcionales de navegación tras el consentimiento. No envíes contraseñas, tarjetas, datos de salud ni información sensible a Fera.'}</p>

          <h2 id={en ? 'ai' : 'ia'} className="scroll-mt-28">{en ? '5. Fera and artificial intelligence' : '5. Fera e inteligencia artificial'}</h2>
          <Panel className="mt-4"><p className="!mt-0 text-base font-semibold leading-relaxed">{en ? 'Fera is an AI system, not a person. It can make mistakes and only gathers information to prepare a quote. It does not make decisions with legal or economic effects.' : 'Fera es un sistema de IA, no una persona. Puede equivocarse y solo recopila información para preparar una cotización. No toma decisiones con efectos jurídicos o económicos.'}</p></Panel>
          <p>{en ? 'The necessary conversation context is sent through a Supabase Edge Function and Lovable AI Gateway to Google Gemini. Ferova does not use conversations to train its own models or authorize reuse beyond delivering the service. Fera is probabilistic; a human reviews scope and pricing. Type “AGENTE” or contact us to request human assistance.' : 'El contexto necesario de la conversación se transmite mediante una función de Supabase y Lovable AI Gateway a Google Gemini. Ferova no usa las conversaciones para entrenar modelos propios ni autoriza su reutilización fuera de la prestación. Fera es probabilística; una persona revisa alcance y precio. Escribe “AGENTE” o usa nuestros canales para pedir atención humana.'}</p>

          <h2>{en ? '6. Providers and international processing' : '6. Proveedores y tratamiento internacional'}</h2>
          <p>{en ? 'We use only the providers needed for each purpose. International processing is governed by the provider agreement and, where required, appropriate safeguards such as Standard Contractual Clauses. We do not claim that the EU–US Data Privacy Framework directly covers Ferova.' : 'Usamos únicamente los proveedores necesarios para cada finalidad. El tratamiento internacional se rige por el contrato del proveedor y, cuando corresponde, salvaguardas como Cláusulas Contractuales Tipo. No afirmamos que el Data Privacy Framework UE–EE. UU. cubra directamente a Ferova.'}</p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-[#dfdcea]"><table className="fx-table min-w-[720px]"><thead><tr><th>{en ? 'Provider' : 'Proveedor'}</th><th>{en ? 'Purpose' : 'Finalidad'}</th><th>{en ? 'Location / safeguard' : 'Ubicación / garantía'}</th></tr></thead><tbody>{providers.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell} className="fx-muted">{cell}</td>)}</tr>)}</tbody></table></div>

          <h2>{en ? '7. Retention and security' : '7. Conservación y seguridad'}</h2>
          <p>{en ? 'We retain quote and client records only for the commercial, contractual and legal periods that apply. Fera does not deliberately save chat history in the browser between sessions; technical providers may retain limited security logs under their agreements. We use HTTPS, least-privilege access and revocable credentials.' : 'Conservamos solicitudes y registros de clientes solo durante los plazos comerciales, contractuales y legales aplicables. Fera no guarda deliberadamente el historial del chat entre sesiones del navegador; los proveedores pueden conservar registros técnicos limitados conforme a sus contratos. Usamos HTTPS, acceso mínimo y credenciales revocables.'}</p>

          <h2>{en ? '8. Your rights' : '8. Tus derechos'}</h2>
          <p>{en ? 'You may request access, correction, deletion, restriction, objection, portability where applicable, proof of consent or withdrawal of consent. Write to the email above. You may also complain to Colombia’s SIC or, in the EEA, your national supervisory authority.' : 'Puedes solicitar acceso, actualización, rectificación, supresión, oposición, portabilidad cuando aplique, prueba de autorización o revocar el consentimiento. Escríbenos al correo indicado. También puedes acudir a la SIC en Colombia o a la autoridad de control de tu país en el EEE.'}</p>

          <h2>{en ? '9. Cookies, minors and updates' : '9. Cookies, menores y cambios'}</h2>
          <p>{en ? <>Optional cookies remain off until you choose. See the <a href="/en/cookies">cookie policy</a>. The service is not directed to children. Material policy changes will update the version and date shown above.</> : <>Las cookies opcionales permanecen apagadas hasta que elijas. Consulta la <a href="/cookies">política de cookies</a>. El servicio no está dirigido a menores. Los cambios sustanciales actualizarán la versión y fecha visibles arriba.</>}</p>
        </article>
      </Section>
    </main>
    <Footer lang={en ? 'en' : 'es'} />
  </div>;
};

export default Privacidad;
