import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/motion';
import { Helmet } from 'react-helmet-async';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const Privacidad = ({ lang = 'es' }: Props) => {
  const lastUpdate = new Date().toISOString().slice(0, 10);

  return (
    <PageTransition>
      <Helmet>
        <title>Política de Privacidad — Ferova Agency</title>
        <meta name="description" content="Política de Tratamiento de Datos Personales de Ferova Agency conforme a la Ley 1581 de 2012, Decreto 1377 de 2013 y GDPR." />
        <link rel="canonical" href="https://seoparaecommerce.co/privacidad" />
      </Helmet>
      <Header lang={lang} />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-8 text-foreground">
            Política de Tratamiento de Datos Personales — Ferova Agency
          </h1>

          <article className="prose prose-invert prose-sm md:prose-base max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-gold">
            <h2>1. Responsable</h2>
            <p>
              Razón social: María Fernanda Calderón Pinilla (Ferova Agency).<br />
              Persona natural comerciante con RUT activo.<br />
              Dirección comercial: Bogotá D.C., Colombia.<br />
              Correo: <a href="mailto:gerencia@seoparaecommerce.co">gerencia@seoparaecommerce.co</a><br />
              WhatsApp: <a href="https://wa.link/jvbd4j" target="_blank" rel="noopener noreferrer">+1 786 578 7671</a><br />
              Sitio web: <a href="https://seoparaecommerce.co">https://seoparaecommerce.co</a>
            </p>

            <h2>2. Marco legal</h2>
            <ul>
              <li>Ley 1581 de 2012 (Colombia)</li>
              <li>Decreto 1377 de 2013 (Colombia)</li>
              <li>Resolución 76434 de 2012 (SIC)</li>
              <li>Reglamento General de Protección de Datos UE 2016/679 (GDPR) cuando aplique a residentes de la Unión Europea</li>
            </ul>

            <h2>3. Definiciones</h2>
            <ul>
              <li><strong>Titular:</strong> persona natural cuyos datos personales son tratados.</li>
              <li><strong>Tratamiento:</strong> cualquier operación sobre datos personales (recolección, uso, almacenamiento, transferencia, supresión).</li>
              <li><strong>Dato personal:</strong> cualquier información vinculada a una persona natural identificable.</li>
              <li><strong>Dato sensible:</strong> información que afecta la intimidad o cuyo uso indebido puede generar discriminación.</li>
            </ul>

            <h2>4. Finalidad del tratamiento</h2>
            <p>Ferova trata datos personales para:</p>
            <ol type="a">
              <li>Enviar newsletter, contenido educativo y promocional cuando el titular lo autorice.</li>
              <li>Atender solicitudes comerciales, cotizaciones y consultas.</li>
              <li>Prestar los servicios contratados (SEO/GEO/IAO, web apps, bots de WhatsApp, etc.).</li>
              <li>Cumplir obligaciones legales, tributarias y contractuales.</li>
              <li>Realizar análisis estadísticos internos.</li>
              <li>Comunicar novedades de productos y servicios.</li>
            </ol>

            <h2>5. Datos que recolectamos</h2>
            <ul>
              <li><strong>Identificación:</strong> nombre, apellido, cédula/NIT cuando aplique.</li>
              <li><strong>Contacto:</strong> correo, teléfono, dirección, país, ciudad.</li>
              <li><strong>Comerciales:</strong> empresa, cargo, sector, tamaño del negocio.</li>
              <li><strong>Navegación:</strong> dirección IP, dispositivo, navegador, comportamiento en el sitio (cookies).</li>
              <li>Conversaciones con el asesor IA y formularios.</li>
            </ul>

            <h2>6. Canales de recolección</h2>
            <ul>
              <li>Formularios del sitio web (newsletter, contacto, asesor IA, recursos)</li>
              <li>Conversaciones por WhatsApp</li>
              <li>Correo electrónico</li>
              <li>Eventos y webinars</li>
            </ul>

            <h2>7. Autorización</h2>
            <p>
              El titular autoriza expresamente el tratamiento al marcar la casilla correspondiente en cada formulario. La autorización es libre, previa, expresa e informada. El titular puede revocarla en cualquier momento escribiendo a <a href="mailto:gerencia@seoparaecommerce.co">gerencia@seoparaecommerce.co</a>.
            </p>

            <h2>8. Derechos del titular</h2>
            <p>Conforme al artículo 8 de la Ley 1581 y al GDPR, todo titular tiene derecho a:</p>
            <ol type="a">
              <li>Conocer, actualizar y rectificar sus datos.</li>
              <li>Solicitar prueba de la autorización otorgada.</li>
              <li>Ser informado del uso dado a sus datos.</li>
              <li>Presentar quejas ante la SIC (Superintendencia de Industria y Comercio) en Colombia o la autoridad de protección de datos competente en su país.</li>
              <li>Revocar la autorización y/o solicitar la supresión.</li>
              <li>Acceder gratuitamente a sus datos.</li>
              <li>Portabilidad de los datos (GDPR).</li>
              <li>Oposición al tratamiento con fines de marketing directo.</li>
            </ol>

            <h2>9. Procedimiento para ejercer derechos</h2>
            <p>
              Para conocer, actualizar, rectificar o suprimir datos, o revocar la autorización, el titular debe enviar una solicitud a <a href="mailto:gerencia@seoparaecommerce.co">gerencia@seoparaecommerce.co</a> indicando:
            </p>
            <ul>
              <li>Nombre completo y documento de identidad</li>
              <li>Descripción clara de la solicitud</li>
              <li>Datos de contacto para la respuesta</li>
            </ul>
            <p>Plazos:</p>
            <ul>
              <li>Consultas: 10 días hábiles (prorrogables 5 días más)</li>
              <li>Reclamos: 15 días hábiles (prorrogables 8 días más)</li>
            </ul>

            <h2>10. Transferencia de datos</h2>
            <p>
              Los datos pueden ser transferidos a proveedores tecnológicos (Brevo, plataforma propietaria de backend, Anthropic, Google) ubicados en EE. UU. y la UE, los cuales cumplen estándares internacionales de protección. La transferencia se realiza bajo cláusulas contractuales tipo y/o el marco Data Privacy Framework EE. UU.-UE.
            </p>

            <h2>11. Seguridad</h2>
            <p>
              Ferova implementa medidas técnicas y organizativas razonables: cifrado en tránsito (HTTPS), almacenamiento en proveedores certificados, control de accesos, copias de seguridad, registros de auditoría.
            </p>

            <h2>12. Retención</h2>
            <p>
              Los datos se conservan mientras exista una relación comercial activa o por el tiempo legalmente exigido (5 años para facturación). Después se anonimizan o eliminan.
            </p>

            <h2>13. Menores de edad</h2>
            <p>
              Ferova no recolecta intencionalmente datos de menores de 18 años. Si se detecta, se eliminan.
            </p>

            <h2>14. Cookies</h2>
            <p>
              El uso de cookies se rige por la <a href="/cookies">Política de Cookies</a>.
            </p>

            <h2>15. Cambios a esta política</h2>
            <p>
              Ferova puede actualizar esta política. Los cambios sustanciales se notifican por correo a los suscriptores.
            </p>

            <p className="mt-12 text-xs">
              Última actualización: {lastUpdate}<br />
              Versión: 1.0
            </p>
          </article>
        </div>
      </main>
      <Footer lang={lang} />
    </PageTransition>
  );
};

export default Privacidad;
