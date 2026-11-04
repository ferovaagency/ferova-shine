import { ArrowUpRight } from "lucide-react";
import highlights from "@/content/portfolioHighlights.json";
import type { Lang } from "@/config/routes";

const labels = {
  es: ["Proyectos seleccionados", "De la búsqueda a la venta", "Explorar el portafolio", "Ver el caso"],
  en: ["Selected projects", "From search to sale", "Explore the portfolio", "View case"],
  pt: ["Projetos selecionados", "Da busca à venda", "Explorar o portfólio", "Ver o caso"],
};

export default function PortfolioHighlights({ lang = "es" }: { lang?: Lang }) {
  const [eyebrow, title, explore, view] = labels[lang];
  const href = `/portafolio/?lang=${lang}`;
  return (
    <section className="portfolio-highlights">
      <div className="portfolio-heading">
        <div><p className="personal-eyebrow">{eyebrow}</p><h2>{title}</h2></div>
        <a href={href}>{explore} <ArrowUpRight aria-hidden="true" size={17} /></a>
      </div>
      <div className="portfolio-grid">
        {highlights[lang].map((item, index) => (
          <a className="portfolio-tile" href={href + "#" + item.id} key={item.id}>
            <small>0{index + 1} / 04</small>
            <h3>{item.name}</h3>
            <strong>{item.value}</strong>
            <p>{item.desc}</p>
            <span>{view} <ArrowUpRight aria-hidden="true" size={15} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}
