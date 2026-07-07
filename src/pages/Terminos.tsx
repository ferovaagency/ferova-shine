import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';


interface Props { lang?: 'es' | 'en' | 'pt'; }

const Terminos = ({ lang = 'es' }: Props) => {
  return (
    <>
      <SEO
        title={lang === 'es' ? 'Términos y Condiciones — Ferova Agency' : 'Terms and Conditions — Ferova Agency'}
        description={lang === 'es' ? 'Términos y condiciones de prestación de servicios digitales de Ferova Agency.' : 'Terms and conditions for digital services provided by Ferova Agency.'}
        path={lang === 'en' ? '/en/terms' : lang === 'pt' ? '/pt/termos' : '/terminos'}
        lang={lang}
      />
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto prose prose-sm dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">

              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 text-foreground">
                {lang === 'es' ? 'Términos y Condiciones de Prestación de Servicios Digitales' : 'Terms and Conditions for Digital Services'}
              </h1>
              <p className="text-muted-foreground text-sm mb-12">Versión 2.1 · 2026 — FEROVA AGENCY</p>

              <hr className="border-border/30 my-8" />

              {/* 1. Partes */}
              <h2 className="text-xl font-bold mt-10 mb-4">1. Partes del Acuerdo y Naturaleza Comercial (B2B)</h2>
              <p>Ferova Agency opera actualmente como persona natural bajo la dirección y responsabilidad de María Fernanda Calderón Osorio, con correo electrónico de contacto oficial <a href="mailto:gerencia@seoparaecommerce.co" className="text-gold">gerencia@seoparaecommerce.co</a>.</p>
              <p>El "Cliente" es cualquier persona natural o jurídica, empresa o emprendimiento que acepte una propuesta comercial o realice un pago a Ferova Agency.</p>
              <p><strong>Relación B2B:</strong> Los servicios ofrecidos por Ferova Agency están dirigidos exclusivamente a empresas, profesionales y negocios (Business to Business). Por tanto, la relación contractual es de índole comercial y corporativa, y no se rige bajo las normativas exclusivas de protección al consumidor final (Ley 1480 de 2011 en Colombia), salvo en los principios fundamentales de buena fe y equidad.</p>
              <p><strong>Formalización y Firma Electrónica:</strong> La aceptación de propuestas mediante correo electrónico corporativo, confirmación por plataformas de gestión, o el pago total o parcial de la primera factura, constituye una firma electrónica vinculante y la aceptación irrefutable de estos Términos y Condiciones.</p>

              <hr className="border-border/30 my-8" />

              {/* 2. Servicios */}
              <h2 className="text-xl font-bold mt-10 mb-4">2. Servicios Ofrecidos</h2>
              <p>Nuestros servicios principales se centran en la dirección estratégica, el acompañamiento directivo y la infraestructura digital de alto rendimiento:</p>
              <ul>
                <li><strong>Consultoría Estratégica y Dirección de Marketing (Fractional CMO):</strong> Asesoría y acompañamiento de alto nivel para alinear los objetivos comerciales con la ejecución digital.</li>
                <li><strong>Capacitación y Mentoría B2B:</strong> Formación especializada a equipos directivos, fundadores y emprendedores en estrategias de adquisición, Inteligencia Artificial y metodologías de crecimiento.</li>
                <li><strong>SEO Técnico y Estratégico:</strong> Optimización avanzada para e-commerce y negocios B2B.</li>
                <li><strong>Diseño y Desarrollo de Web Apps:</strong> Creación de infraestructuras de alta velocidad y ecosistemas enfocados en la conversión.</li>
                <li><strong>Pauta Digital y Automatización:</strong> Gestión técnica de anuncios (Meta, Google Ads) e integración de Asesores de Inteligencia Artificial (IA).</li>
              </ul>
              <p><em>Nota explícita: Ferova Agency se destaca por ofrecer un ecosistema integral, brindando tanto el acompañamiento consultivo, formativo y de mentoría, como la ejecución técnica de la infraestructura digital.</em></p>

              <hr className="border-border/30 my-8" />

              {/* 3. Naturaleza */}
              <h2 className="text-xl font-bold mt-10 mb-4">3. Naturaleza del Servicio: Medio y Método, No Resultado Comercial</h2>
              <p>Todos los servicios prestados por Ferova Agency, ya sean consultivos o de infraestructura, constituyen una <strong>obligación de medio y no de resultado</strong>. Nos comprometemos a aplicar metodologías avanzadas, mejores prácticas y estrategias técnicas probadas.</p>
              <p>No se garantizan cierres de ventas, ingresos financieros ni retornos de inversión (ROI) específicos. El resultado transaccional final depende de factores externos ajenos a Ferova Agency, tales como: condiciones macroeconómicas, viabilidad del producto/servicio del Cliente, y de manera crítica, la capacidad, seguimiento y habilidad de cierre del equipo comercial interno del Cliente.</p>

              <hr className="border-border/30 my-8" />

              {/* 4. Infraestructura */}
              <h2 className="text-xl font-bold mt-10 mb-4">4. Infraestructura Web, Hosting y Disponibilidad (SLA)</h2>
              <p>El dominio y hosting se alojan en servidores administrados por Ferova Agency (utilizando proveedores Cloud de primer nivel) mientras el plan acordado esté activo, apuntando a un <strong>SLA de disponibilidad del 99% (Uptime)</strong>. Ferova Agency no será responsable por intermitencias causadas por caídas globales de los proveedores de nube (Fuerza Mayor).</p>
              <ul>
                <li><strong>Migración y Extracción:</strong> Si el Cliente desea migrar su sitio a un servidor propio, deberá notificar con 10 días hábiles de anticipación. Ferova Agency entregará un archivo empaquetado (.zip) con la base de datos y los archivos del sitio.</li>
                <li><strong>Política de Retención post-cancelación:</strong> Al cancelar el servicio por mora o terminación de contrato, el Cliente dispondrá de un periodo de gracia de 30 días calendario para solicitar y descargar el respaldo de sus activos digitales. Vencido este plazo, Ferova Agency procederá a la eliminación definitiva de los datos de sus servidores por políticas de seguridad, eximiéndose de cualquier reclamación por pérdida de información.</li>
              </ul>

              <hr className="border-border/30 my-8" />

              {/* 5. Proceso de Inicio */}
              <h2 className="text-xl font-bold mt-10 mb-4">5. Proceso de Inicio y Retrasos Imputables al Cliente</h2>
              <p>El servicio inicia formalmente al recibir el anticipo acordado y la totalidad de los materiales base (accesos, marca, crudos).</p>
              <p><strong>Cláusula de Retraso:</strong> Si el Cliente demora más de 5 días hábiles en entregar los materiales necesarios tras haber realizado el pago, los cronogramas de entrega y agendas de consultoría de Ferova se pausarán y desplazarán proporcionalmente. Este retraso operativo imputable al Cliente no lo exime de sus obligaciones de pago en el siguiente ciclo de facturación mensual acordado.</p>

              <hr className="border-border/30 my-8" />

              {/* 6. Comunicación */}
              <h2 className="text-xl font-bold mt-10 mb-4">6. Comunicación Oficial y Aprobaciones</h2>
              <p>Las reuniones de mentoría, consultoría o control operativo se limitan a la cantidad estipulada en la propuesta, agendadas con 24h de anticipación. Toda solicitud de modificaciones, envío de archivos pesados y aprobaciones debe realizarse exclusivamente por correo electrónico o Google Chat. El uso de WhatsApp se limitará a comunicaciones de emergencia o logísticas menores, careciendo de validez para aprobaciones contractuales estructurales.</p>

              <hr className="border-border/30 my-8" />

              {/* 7. Facturación */}
              <h2 className="text-xl font-bold mt-10 mb-4">7. Facturación y Pagos</h2>
              <ul>
                <li><strong>Facturación:</strong> Día 25 del mes en curso.</li>
                <li><strong>Cobro y Pago:</strong> Día 1 al 3 del mes siguiente. Pagos 100% anticipados.</li>
                <li><strong>Métodos:</strong> Transferencia Bancaria (Cuenta Nu/Bancolombia), Mercado Pago (COP) o Paypal/Payoneer (USD).</li>
              </ul>

              <hr className="border-border/30 my-8" />

              {/* 8. Inflación */}
              <h2 className="text-xl font-bold mt-10 mb-4">8. Ajuste de Precios por Inflación</h2>
              <p>Los precios de los servicios de retención mensual (Retainers) y consultorías recurrentes se ajustarán anualmente el 1 de enero, tomando como base mínima:</p>
              <ul>
                <li>El <strong>IPC</strong> (Índice de Precios al Consumidor) de Colombia del año inmediatamente anterior (pagos COP).</li>
                <li>El <strong>CPI</strong> (Consumer Price Index) de Estados Unidos (pagos USD).</li>
              </ul>

              <hr className="border-border/30 my-8" />

              {/* 9. Garantía Técnica */}
              <h2 className="text-xl font-bold mt-10 mb-4">9. Garantía Técnica (Extensión a 30 Días)</h2>
              <p>Al aprobar la entrega final de un desarrollo de infraestructura (ej. Web App), el Cliente cuenta con un periodo de garantía de <strong>30 días calendario</strong> para reportar fallas técnicas, enlaces rotos o "bugs" de código imputables al desarrollo original. Ferova Agency los corregirá sin costo adicional. Esta garantía no cubre modificaciones de diseño o cambios de alcance no contemplados en la propuesta inicial.</p>

              <hr className="border-border/30 my-8" />

              {/* 10. Copyright */}
              <h2 className="text-xl font-bold mt-10 mb-4">10. Obligaciones y Declaraciones de Derechos (Copyright)</h2>
              <p>El Cliente declara y garantiza bajo la gravedad de juramento comercial que posee los derechos de autor, licencias de uso, o permisos necesarios de todas las imágenes, videos (crudos), logos, textos y bases de datos que entregue a Ferova Agency. El Cliente asumirá el 100% de la responsabilidad legal y patrimonial ante cualquier reclamación de terceros por infracción de derechos de autor o propiedad intelectual sobre los insumos entregados.</p>

              <hr className="border-border/30 my-8" />

              {/* 11. Propiedad Intelectual */}
              <h2 className="text-xl font-bold mt-10 mb-4">11. Propiedad Intelectual</h2>
              <ol>
                <li><strong>Del Cliente:</strong> Los entregables finales (Landing pages desplegadas, videos editados, piezas gráficas) y la base de datos de los leads generados son propiedad absoluta del Cliente una vez saldado el 100% del pago.</li>
                <li><strong>De Ferova Agency:</strong> El contenido impartido en capacitaciones, mentorías, las metodologías internas, prompts de configuración de Inteligencia Artificial (IA), estructuras de código fuente propietario, plantillas operativas y diagramas estratégicos son propiedad exclusiva de Ferova Agency. El Cliente adquiere una licencia de uso de los entregables o conocimientos para su negocio, pero no los derechos patrimoniales sobre los métodos de Ferova para revenderlos.</li>
              </ol>

              <hr className="border-border/30 my-8" />

              {/* 12. Limitación */}
              <h2 className="text-xl font-bold mt-10 mb-4">12. Limitación de Responsabilidad (Protección Legal B2B)</h2>
              <p><strong>Límite de Responsabilidad Civil:</strong> Salvo en casos comprobados judicialmente de dolo o culpa grave (en concordancia con el Artículo 1604 del Código Civil Colombiano), la responsabilidad máxima consolidada de Ferova Agency ante cualquier reclamación por daños directos se limitará estrictamente al equivalente del total pagado por el Cliente a Ferova Agency durante los <strong>tres (3) meses inmediatamente anteriores</strong> al hecho generador del daño. Quedan excluidos expresamente los daños indirectos, lucro cesante o daño emergente no previsible.</p>
              <p><strong>Exoneración Adicional:</strong></p>
              <ul>
                <li><strong>Plataformas de Terceros:</strong> Ferova Agency no responde por bloqueos, baneos o suspensiones de cuentas publicitarias dictaminados unilateralmente por Meta, Google, TikTok o LinkedIn, ni por fallas en pasarelas de pago o CRMs externos.</li>
                <li><strong>Respuestas de Inteligencia Artificial:</strong> Los Asesores IA (Bots) operan mediante modelos probabilísticos que pueden generar información imprecisa ("alucinaciones"). El Cliente acepta que es el único responsable legal, comercial y médico de validar la información que su Bot entrega a los usuarios finales.</li>
              </ul>

              <hr className="border-border/30 my-8" />

              {/* 13. Datos */}
              <h2 className="text-xl font-bold mt-10 mb-4">13. Tratamiento de Datos Personales (Ley 1581 de 2012)</h2>
              <p>Ferova Agency no vende, alquila ni comercializa datos. En el contexto de campañas digitales, el Cliente actúa como <strong>Responsable</strong> legal de la recolección de los datos de los usuarios finales (leads). Ferova Agency actúa únicamente como <strong>Encargado del Tratamiento</strong> temporal para la integración en CRMs o reportes, ciñéndose estrictamente a las políticas de privacidad dictadas por el Cliente.</p>

              <hr className="border-border/30 my-8" />

              {/* 14. Disputas */}
              <h2 className="text-xl font-bold mt-10 mb-4">14. Resolución de Disputas</h2>
              <p>Toda controversia que surja de este acuerdo deberá notificarse por escrito. La parte notificada tendrá <strong>diez (10) días hábiles</strong> para responder. Ambas partes buscarán un arreglo directo en un plazo de quince (15) días hábiles.</p>
              <p>En caso de no lograrse un acuerdo, la controversia se resolverá mediante un Tribunal de Arbitramento o Centro de Conciliación de la Cámara de Comercio de Bogotá, aplicando las leyes comerciales de la República de Colombia.</p>

              <hr className="border-border/30 my-8" />

              {/* 15. Pólizas */}
              <h2 className="text-xl font-bold mt-10 mb-4">15. Pólizas y Seguros (Opcional)</h2>
              <p>Si por políticas internas de contratación, el Cliente B2B exige la expedición de Pólizas de Cumplimiento, Responsabilidad Civil Profesional o similares, el costo de emisión de dichas primas será asumido en su totalidad por el Cliente y adicionado al valor del contrato.</p>

              <hr className="border-border/30 my-8" />

              {/* 16. Modificaciones */}
              <h2 className="text-xl font-bold mt-10 mb-4">16. Modificaciones</h2>
              <p>Ferova Agency se reserva el derecho de modificar estos términos con 15 días calendario de anticipación. Las modificaciones serán notificadas por correo a los clientes activos.</p>
              <p><em>(La contratación de los servicios de Ferova Agency implica la aceptación íntegra de este documento).</em></p>

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
                <li>La cancelación de servicios mensuales requiere un aviso por escrito con 15 días de anticipación a <a href="mailto:gerencia@seoparaecommerce.co" className="text-gold">gerencia@seoparaecommerce.co</a>.</li>
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
              <p>El titular de los datos puede ejercer los siguientes derechos escribiendo a <a href="mailto:gerencia@seoparaecommerce.co" className="text-gold">gerencia@seoparaecommerce.co</a>:</p>
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
    </>
  );
};

export default Terminos;
