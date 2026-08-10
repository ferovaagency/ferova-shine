import { Check, Clock3, FileCheck2, Layers3, ListChecks, ShieldCheck } from "lucide-react";

const modes = [
  { icon: ListChecks, label: "Tarea", detail: "Alcance cerrado" },
  { icon: Clock3, label: "Horas", detail: "Backlog variable" },
  { icon: Layers3, label: "Mensual", detail: "Ritmo continuo" },
];

export default function AgencyDeliveryConsole() {
  return (
    <figure className="agency-console" aria-label="Flujo de contratación flexible de Ferova">
      <div className="agency-console-panel">
        <div className="agency-console-bar">
          <span>Ferova · Distribuidor de capacidad</span>
          <span className="agency-console-live"><i aria-hidden="true" /> Disponible para cotizar</span>
        </div>

        <div className="agency-console-body">
          <section className="agency-console-brief">
            <span className="agency-console-label">01 · Backlog de la agencia</span>
            <h2>Trabajo que debe salir</h2>
            <ul>
              <li><Check aria-hidden="true" /> SEO técnico</li>
              <li><Check aria-hidden="true" /> Mantenimiento web</li>
              <li><Check aria-hidden="true" /> Landings y migraciones</li>
            </ul>
          </section>

          <div className="agency-console-route" aria-hidden="true">
            <span /><span /><span />
          </div>

          <section className="agency-console-modes">
            <span className="agency-console-label">02 · Unidad de contratación</span>
            <div>
              {modes.map(({ icon: Icon, label, detail }) => (
                <article key={label}>
                  <Icon aria-hidden="true" />
                  <span><strong>{label}</strong><small>{detail}</small></span>
                </article>
              ))}
            </div>
          </section>

          <section className="agency-console-output">
            <span className="agency-console-label">03 · Resultado acordado</span>
            <div><FileCheck2 aria-hidden="true" /><span><strong>Entrega lista para tu agencia</strong><small>Alcance · precio · fecha · QA</small></span></div>
          </section>
        </div>

        <div className="agency-console-footer">
          <span><ShieldCheck aria-hidden="true" /> White label si lo necesitas</span>
          <span>Sin sumar un cargo fijo</span>
        </div>
      </div>
      <figcaption>Del backlog a una entrega documentada, con la capacidad justa.</figcaption>
    </figure>
  );
}
