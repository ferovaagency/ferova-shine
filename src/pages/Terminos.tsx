import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';

interface Props { lang?: 'es' | 'en'; }

const Terminos = ({ lang = 'es' }: Props) => {
  return (
    <>
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto prose prose-sm dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">

              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 text-foreground">
                {lang === 'es' ? 'Términos y Condiciones de Prestación de Servicios Digitales' : 'Terms and Conditions for Digital Services'}
              </h1>
              <p className="text-muted-foreground text-sm mb-12">Versión 1.0 · 2026 — FEROVA AGENCY</p>

              <hr className="border-border/30 my-8" />

              {/* 1. Partes */}
              <h2 className="text-xl font-bold mt-10 mb-4">1. Partes del Acuerdo</h2>
              <p>Ferova Agency opera actualmente como persona natural bajo la dirección de María Fernanda Calderón Arias, con correo electrónico de contacto <a href="mailto:maria.fer@ferova.com.co" className="text-gold">maria.fer@ferova.com.co</a>. La empresa se encuentra en proceso de constitución como LLC en Estados Unidos.</p>
              <p>El "Cliente" es cualquier persona natural o jurídica, empresa o emprendimiento que acepte una propuesta comercial o realice un pago a Ferova Agency por cualquiera de sus servicios.</p>
              <p>Las confirmaciones realizadas por WhatsApp, correo electrónico u otros medios digitales escritos tienen valor vinculante para ambas partes y se consideran aceptación formal de las condiciones establecidas.</p>

              <hr className="border-border/30 my-8" />

              {/* 2. Servicios */}
              <h2 className="text-xl font-bold mt-10 mb-4">2. Servicios Ofrecidos</h2>
              <ul>
                <li>SEO técnico y estratégico para e-commerce</li>
                <li>Diseño web y desarrollo de Web Apps</li>
                <li>Pauta digital en Meta (Facebook e Instagram) y Google Ads</li>
                <li>Automatización de procesos y CRM</li>
                <li>Consultoría y asesoría de marketing digital</li>
                <li>Diseño de logos y branding</li>
                <li>Optimización de perfiles de LinkedIn</li>
              </ul>

              <hr className="border-border/30 my-8" />

              {/* 3. Naturaleza */}
              <h2 className="text-xl font-bold mt-10 mb-4">3. Naturaleza del Servicio: Método, No Resultado</h2>
              <p>Todos los servicios prestados por Ferova Agency son de naturaleza metodológica. Esto significa que nos comprometemos a aplicar las mejores prácticas, estrategias probadas y metodologías profesionales para lograr los objetivos acordados.</p>
              <p><strong>No se garantizan ventas, ingresos ni resultados comerciales específicos.</strong> Los resultados finales dependen de múltiples factores externos fuera del control de Ferova Agency, incluyendo pero no limitado a: condiciones del mercado, competencia, calidad del producto o servicio del cliente, presupuesto disponible y cambios en algoritmos de plataformas.</p>

              <hr className="border-border/30 my-8" />

              {/* 4. Web App Económico */}
              <h2 className="text-xl font-bold mt-10 mb-4">4. Plan Web App Económico — Condiciones Especiales</h2>
              <ul>
                <li>El dominio y hosting se alojan en servidores de Ferova Agency mientras el plan mensual esté activo.</li>
                <li>Si el cliente desea migrar su sitio a un servidor propio, esto generará un costo adicional y requiere un aviso mínimo de 10 días hábiles de anticipación.</li>
                <li>Al cancelar el servicio, se entregarán todos los archivos y materiales del proyecto al cliente en un plazo máximo de 5 días hábiles.</li>
              </ul>

              <hr className="border-border/30 my-8" />

              {/* 5. Proceso de Inicio */}
              <h2 className="text-xl font-bold mt-10 mb-4">5. Proceso de Inicio</h2>
              <p>El servicio inicia formalmente cuando se cumplen las siguientes condiciones:</p>
              <ul>
                <li>El cliente acepta la propuesta por escrito (correo electrónico, WhatsApp) o realiza el pago correspondiente.</li>
                <li>Se recibe el anticipo acordado según las condiciones de la propuesta.</li>
                <li>El cliente entrega los materiales necesarios (accesos, contenido, información de marca).</li>
              </ul>
              <p>Si el cliente tarda más de 5 días hábiles en entregar los materiales necesarios después del pago, los tiempos de entrega del proyecto se ajustarán proporcionalmente.</p>

              <hr className="border-border/30 my-8" />

              {/* 6. Comunicación */}
              <h2 className="text-xl font-bold mt-10 mb-4">6. Comunicación y Reuniones</h2>
              <ul>
                <li>Las reuniones deben agendarse con mínimo 24 horas de anticipación.</li>
                <li>Las solicitudes de trabajo y cambios deben realizarse por WhatsApp o correo electrónico a <a href="mailto:maria.fer@ferova.com.co" className="text-gold">maria.fer@ferova.com.co</a>.</li>
                <li>Cualquier cambio en el alcance del proyecto debe solicitarse y aprobarse por escrito.</li>
              </ul>

              <hr className="border-border/30 my-8" />

              {/* 7. Facturación */}
              <h2 className="text-xl font-bold mt-10 mb-4">7. Facturación y Pagos</h2>
              <ul>
                <li>La facturación se realiza el día 25 de cada mes.</li>
                <li>El cobro automático se ejecuta el día 3 del mes siguiente a través de Mercado Pago (para pagos en COP) o Lemon (para pagos en USD).</li>
                <li>Si el cobro automático falla, el cliente tiene hasta el día 7 del mes para regularizar el pago sin consecuencias.</li>
              </ul>

              <hr className="border-border/30 my-8" />

              {/* 8. Inflación */}
              <h2 className="text-xl font-bold mt-10 mb-4">8. Ajuste de Precios por Inflación</h2>
              <p>Los precios de los servicios de suscripción mensual se ajustarán anualmente el 1 de enero de cada año, basándose en:</p>
              <ul>
                <li>IPC (Índice de Precios al Consumidor) de Colombia para pagos en COP.</li>
                <li>CPI (Consumer Price Index) de Estados Unidos para pagos en USD.</li>
              </ul>
              <p>La notificación del nuevo precio se realizará antes del 1 de diciembre del año anterior. El cliente puede cancelar el servicio sin penalización si no acepta el nuevo precio ajustado.</p>

              <hr className="border-border/30 my-8" />

              {/* 9. Comunicaciones Comerciales */}
              <h2 className="text-xl font-bold mt-10 mb-4">9. Comunicaciones Comerciales</h2>
              <p>Al contratar cualquier servicio de Ferova Agency, el cliente acepta recibir comunicaciones comerciales a través de WhatsApp, SMS y correo electrónico, incluyendo información sobre servicios, promociones y contenido de valor.</p>
              <p>El cliente puede cancelar estas comunicaciones en cualquier momento escribiendo a <a href="mailto:maria.fer@ferova.com.co" className="text-gold">maria.fer@ferova.com.co</a>.</p>

              <hr className="border-border/30 my-8" />

              {/* 10. Finalización */}
              <h2 className="text-xl font-bold mt-10 mb-4">10. Finalización y Renuncia a Reclamaciones</h2>
              <p>Al aprobar los entregables finales de un proyecto, el cliente renuncia a reclamaciones sobre el trabajo realizado, excepto en casos de errores técnicos comprobables que se encuentren dentro del período de garantía especificado en la propuesta.</p>

              <hr className="border-border/30 my-8" />

              {/* 11. Obligaciones Ferova */}
              <h2 className="text-xl font-bold mt-10 mb-4">11. Obligaciones de Ferova Agency</h2>
              <ul>
                <li>Ejecutar los servicios contratados con profesionalismo y diligencia.</li>
                <li>Comunicar avances del proyecto de manera regular.</li>
                <li>Mantener la confidencialidad de la información del cliente.</li>
                <li>Proveer evidencia del trabajo realizado (reportes, entregables, grabaciones).</li>
              </ul>

              <hr className="border-border/30 my-8" />

              {/* 12. Obligaciones Cliente */}
              <h2 className="text-xl font-bold mt-10 mb-4">12. Obligaciones del Cliente</h2>
              <ul>
                <li>Pagar según las condiciones acordadas en la propuesta.</li>
                <li>Entregar materiales, accesos y contenido necesarios a tiempo.</li>
                <li>Solicitar cambios al alcance del proyecto por escrito.</li>
                <li>Designar un punto de contacto principal para la comunicación del proyecto.</li>
              </ul>

              <hr className="border-border/30 my-8" />

              {/* 13. Propiedad Intelectual */}
              <h2 className="text-xl font-bold mt-10 mb-4">13. Propiedad Intelectual</h2>
              <ul>
                <li>Los entregables finales son propiedad del cliente una vez se salde el pago total del servicio.</li>
                <li>Ferova Agency se reserva el derecho de incluir los trabajos realizados en su portafolio con fines promocionales.</li>
                <li>Las metodologías internas, frameworks, plantillas y herramientas desarrolladas por Ferova Agency son y seguirán siendo propiedad exclusiva de Ferova Agency.</li>
              </ul>

              <hr className="border-border/30 my-8" />

              {/* 14. Limitación */}
              <h2 className="text-xl font-bold mt-10 mb-4">14. Limitación de Responsabilidad</h2>
              <p>La responsabilidad máxima de Ferova Agency ante cualquier reclamación relacionada con los servicios prestados se limita al valor total pagado por el cliente por el servicio específico objeto de la reclamación.</p>

              <hr className="border-border/30 my-8" />

              {/* 15. Disputas */}
              <h2 className="text-xl font-bold mt-10 mb-4">15. Resolución de Disputas</h2>
              <ul>
                <li>Cualquier disputa deberá ser notificada por escrito a la otra parte.</li>
                <li>La parte notificada tendrá 5 días hábiles para responder.</li>
                <li>Ambas partes se comprometen a buscar un acuerdo amistoso dentro de los 15 días calendario siguientes a la notificación.</li>
              </ul>

              <hr className="border-border/30 my-8" />

              {/* 16. Modificaciones */}
              <h2 className="text-xl font-bold mt-10 mb-4">16. Modificaciones</h2>
              <p>Ferova Agency se reserva el derecho de modificar estos términos y condiciones con un aviso previo de 15 días de anticipación. Las modificaciones serán comunicadas por correo electrónico o WhatsApp a los clientes activos.</p>

              <hr className="border-border/30 my-12" />

              {/* POLÍTICA DE PRECIOS */}
              <h2 className="text-xl font-bold mt-12 mb-4 text-gold">Política de Precios</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Retainer Mensual</h3>
              <ul>
                <li>Facturación el día 25 de cada mes.</li>
                <li>Cobro automático el día 3 del mes siguiente.</li>
                <li>Plataformas de pago: Mercado Pago (COP) / Lemon (USD).</li>
                <li>Ajuste anual por inflación (IPC Colombia / CPI EE.UU.).</li>
                <li>Los gastos externos (publicidad, herramientas, licencias) no están incluidos en el retainer.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Proyecto Cerrado</h3>
              <ul>
                <li>Precio fijo establecido en la propuesta comercial.</li>
                <li>Esquema de pago: 50% anticipo + 50% contra entrega final.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Política de Mora</h3>
              <ul>
                <li><strong>Días 1-3:</strong> Notificación de cobro pendiente.</li>
                <li><strong>Días 4-7:</strong> Período para regularizar sin consecuencias.</li>
                <li><strong>Días 8-15:</strong> Pausa de entregas y servicios activos.</li>
                <li><strong>Día 16+:</strong> Suspensión total del servicio.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Descuentos</h3>
              <p>Los descuentos solo son válidos si están documentados expresamente en la propuesta comercial aceptada por ambas partes.</p>

              <hr className="border-border/30 my-12" />

              {/* POLÍTICA DE CANCELACIÓN */}
              <h2 className="text-xl font-bold mt-12 mb-4 text-gold">Política de Cancelación</h2>
              <ul>
                <li>El contrato mínimo será el especificado en la propuesta comercial de cada servicio.</li>
                <li>La cancelación de servicios mensuales requiere un aviso por escrito con 15 días de anticipación a <a href="mailto:maria.fer@ferova.com.co" className="text-gold">maria.fer@ferova.com.co</a>.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Retención en Proyectos Cerrados</h3>
              <ul>
                <li><strong>Antes de iniciar:</strong> Retención del 20% del anticipo.</li>
                <li><strong>Fase inicial (1-30% de avance):</strong> Retención del 50%.</li>
                <li><strong>Fase media (31-60% de avance):</strong> Retención del 70%.</li>
                <li><strong>Fase avanzada (61-90% de avance):</strong> Retención del 100%.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Pausas y Entregas</h3>
              <ul>
                <li>El cliente puede solicitar una pausa del servicio de hasta 30 días sin costo adicional (una vez por contrato).</li>
                <li>Al solicitar el cierre del servicio, Ferova Agency entregará todos los materiales y archivos del proyecto en un plazo máximo de 5 días hábiles.</li>
              </ul>

              <hr className="border-border/30 my-12" />

              {/* POLÍTICA DE DATOS */}
              <h2 className="text-xl font-bold mt-12 mb-4 text-gold">Política de Tratamiento de Datos Personales</h2>
              <p>Esta política está alineada con el GDPR (Reglamento General de Protección de Datos de la Unión Europea), la CCPA (California Consumer Privacy Act) y la Ley 1581 de 2012 de Colombia.</p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Datos Recopilados</h3>
              <ul>
                <li>Nombre completo y datos de contacto (correo electrónico, teléfono).</li>
                <li>Datos de empresa (nombre, sitio web, industria).</li>
                <li>Información de facturación (dirección, NIT o identificación fiscal).</li>
                <li>Accesos necesarios para la prestación del servicio (CMS, analytics, redes sociales).</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Uso de Datos</h3>
              <p><strong>Ferova Agency no vende ni comparte datos personales con terceros.</strong> Los datos se utilizan exclusivamente para la prestación de los servicios contratados, la comunicación con el cliente y la facturación.</p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Derechos del Titular</h3>
              <p>El titular de los datos puede ejercer los siguientes derechos escribiendo a <a href="mailto:maria.fer@ferova.com.co" className="text-gold">maria.fer@ferova.com.co</a>:</p>
              <ul>
                <li>Acceso a sus datos personales.</li>
                <li>Rectificación de datos inexactos o incompletos.</li>
                <li>Eliminación de datos personales.</li>
                <li>Oposición al tratamiento de datos.</li>
                <li>Portabilidad de datos.</li>
                <li>Revocación del consentimiento.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Retención de Datos</h3>
              <ul>
                <li><strong>Clientes activos:</strong> Mientras dure la relación comercial.</li>
                <li><strong>Clientes inactivos:</strong> Hasta 5 años después de la última interacción.</li>
                <li><strong>Prospectos:</strong> Hasta 2 años desde el último contacto.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Datos Financieros</h3>
              <p>Los datos financieros y de pago son procesados exclusivamente por las plataformas Mercado Pago y Lemon. Ferova Agency no almacena números de tarjetas de crédito, débito ni datos bancarios en sus sistemas.</p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Autoridades Competentes</h3>
              <ul>
                <li><strong>Colombia:</strong> Superintendencia de Industria y Comercio (SIC).</li>
                <li><strong>España:</strong> Agencia Española de Protección de Datos (AEPD).</li>
                <li><strong>Estados Unidos:</strong> Federal Trade Commission (FTC).</li>
              </ul>

              <hr className="border-border/30 my-12" />

              <p className="text-xs text-muted-foreground text-center mt-12">
                © {new Date().getFullYear()} Ferova Agency. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default Terminos;
