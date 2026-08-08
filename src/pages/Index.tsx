import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { trackEvent } from "@/lib/analytics";
import { HOME, type Lang } from "@/content/home";

// Secciones de la portada (Sprint 3) — extraídas de este archivo a
// src/components/home/* + copy en src/content/home.ts para poder mantenerlas.
import HomeHero from "@/components/home/HomeHero";
import ProblemSelector from "@/components/home/ProblemSelector";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import FerovaMethodPreview from "@/components/home/FerovaMethodPreview";
import ResultsSection from "@/components/home/ResultsSection";
import HomeFAQ from "@/components/home/HomeFAQ";
import FinalCTA from "@/components/home/FinalCTA";
import SeoHome from "@/pages/SeoHome";

// Secciones ya existentes reutilizadas.
import ValueLadder from "@/components/sections/ValueLadder";
import TeamSection from "@/components/sections/TeamSection";

interface IndexProps {
  lang?: Lang;
}

const Index = ({ lang = "es" }: IndexProps) => {
  const c = HOME[lang];
  const path = lang === "en" ? "/en" : lang === "pt" ? "/pt" : "/";

  useEffect(() => {
    trackEvent("page_view", { page: "home", lang });
  }, [lang]);

  if (lang === "es") return <SeoHome />;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO title={c.seoTitle} description={c.seoDesc} path={path} lang={lang} />
      <Header lang={lang} />

      <main className="flex-1">
        <HomeHero lang={lang} />
        <ValueLadder lang={lang} />
        <ProblemSelector lang={lang} />
        <CapabilitiesSection lang={lang} />
        <FerovaMethodPreview lang={lang} />
        <ResultsSection lang={lang} />
        <HomeFAQ lang={lang} />
        <FinalCTA lang={lang} />
        <TeamSection lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default Index;
