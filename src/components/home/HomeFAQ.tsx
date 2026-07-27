import { CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HOME, type Lang } from "@/content/home";

/**
 * FAQ (They Ask, You Answer). Se emite además FAQPage JSON-LD para que Google
 * y los crawlers de IA puedan citar las respuestas.
 */
const HomeFAQ = ({ lang }: { lang: Lang }) => {
  const c = HOME[lang].faq;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6" style={{ background: "hsl(var(--surface))" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{c.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground">{c.sub}</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {c.items.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="glass-card border px-5 md:px-6 !border-border">
              <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:no-underline py-5">
                <span className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span>{f.q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pb-5 pl-8">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default HomeFAQ;
