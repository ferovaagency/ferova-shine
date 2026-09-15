import "./redesign-case-story.css";
import type { CaseStory as CaseStoryData } from "@/content/personalHome";

/**
 * Un caso de prueba, en cualquier idioma.
 *
 * Sustituye a RedesignCaseStory / RecoveryCaseStory / MaintenanceCaseStory,
 * que eran tres componentes con el mismo marcado y el texto incrustado en
 * español. El contenido vive ahora en src/content/personalHome.ts.
 *
 * El iframe sólo se renderiza si hay interactivo en ESE idioma (`embedSrc`).
 * En inglés todavía no lo hay, así que la página muestra el titular, la tabla
 * de cifras y las notas —que es lo verificable y lo que citan los motores de
 * IA— sin incrustar una animación en español dentro de una página en inglés.
 */
export default function CaseStory({ data }: { data: CaseStoryData }) {
  return (
    <section className="redesign-case" aria-label={data.ariaLabel}>
      <div className="redesign-case-heading">
        <h2>{data.heading}</h2>
        <p>{data.intro}</p>
      </div>

      {data.embedSrc && (
        <iframe src={data.embedSrc} title={data.embedTitle} loading="lazy" className="redesign-case-frame" />
      )}

      <details className="redesign-case-data">
        <summary>{data.summary}</summary>
        {data.paragraphs.map((p) => <p key={p}>{p}</p>)}

        {data.bullets && (
          <ul>
            {data.bullets.map((b) => (
              <li key={b.label}><strong>{b.label}</strong> {b.text}</li>
            ))}
          </ul>
        )}

        {data.table && (
          <table>
            <caption>{data.table.caption}</caption>
            <thead>
              <tr>{data.table.head.map((h) => <th scope="col" key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.table.rows.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  {row.slice(1).map((cell, i) => <td key={i}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {data.notes.map((n) => <p key={n}>{n}</p>)}
      </details>
    </section>
  );
}
