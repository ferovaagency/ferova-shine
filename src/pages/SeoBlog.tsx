import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { getSupabase } from "@/integrations/supabase/lazy";
import { SEO_CATEGORIES, SEO_EDITORIAL, type SeoEditorialItem } from "@/content/seoEditorial";
import { trackEvent } from "@/lib/analytics";
import { BLOG_SITE_ORIGINS } from "@/lib/blog-i18n";
import { SITE_ORIGIN } from "@/config/routes";
import { CtaBand, FeraButton, FxLink, PageHero, Section } from "@/components/fx/primitives";

type DbPost = Pick<SeoEditorialItem, "slug" | "title" | "excerpt" | "category" | "readTime"> & { publishedAt?: string; cover?: string };

const categoryFromDb = (value?: string | null): SeoEditorialItem["category"] => {
  const v = (value ?? "").toLowerCase();
  if (v.includes("technical") || v.includes("técnic")) return "Technical SEO";
  if (v.includes("agenc")) return "SEO for Agencies";
  if (v.includes("migration") || v.includes("migraci")) return "SEO Migrations";
  if (v.includes("ai") || v.includes("geo") || v.includes("ia")) return "AI Search";
  return "Ecommerce SEO";
};

const readTime = (content: string) => `${Math.max(1, Math.round(content.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length / 200))} min`;
const categoryLabel: Record<string, string> = { Todos: "Todos", "Technical SEO": "SEO técnico", "Ecommerce SEO": "SEO para ecommerce", "SEO for Agencies": "SEO para agencias", "AI Search": "Búsqueda con IA", "SEO Migrations": "Migraciones SEO" };
const formatDate = (iso: string) => new Date(iso).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });

const BREADCRUMBS = [{ name: "Inicio", path: "/" }, { name: "Blog", path: "/blog" }];

function PostCard({ post }: { post: DbPost }) {
  const label = categoryLabel[post.category] ?? post.category;
  return (
    <Link to={`/blog/${post.slug}`} className="post-card group">
      {post.cover ? (
        <img src={post.cover} alt="" loading="lazy" width={1600} height={1000} className="aspect-[16/10] w-full object-cover" />
      ) : (
        <span className="post-card__cover" aria-hidden="true">{label}</span>
      )}
      <span className="flex flex-1 flex-col p-7">
        <span className="fx-muted text-sm">{[label, post.publishedAt ? formatDate(post.publishedAt) : null, post.readTime].filter(Boolean).join(" · ")}</span>
        <span className="mt-2 text-xl font-semibold leading-snug" style={{ fontFamily: "Poppins, system-ui, sans-serif" }}>{post.title}</span>
        <span className="fx-muted mt-3 line-clamp-3 leading-relaxed">{post.excerpt}</span>
        <span className="mt-auto pt-5 font-semibold text-[#541014] group-hover:underline">Leer análisis →</span>
      </span>
    </Link>
  );
}

export default function SeoBlog() {
  const [params] = useSearchParams();
  const initialCategory = params.get("categoria");
  const [category, setCategory] = useState(SEO_CATEGORIES.includes(initialCategory as typeof SEO_CATEGORIES[number]) ? initialCategory! : "Todos");
  const [search, setSearch] = useState("");
  const [dbPosts, setDbPosts] = useState<DbPost[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const supabase = await getSupabase();
      const { data } = await supabase.from("blog_posts").select("slug, title, excerpt, category, content, published_at, cover_image").eq("language", "es").eq("active", true).in("site_origin", [...BLOG_SITE_ORIGINS]).lte("published_at", new Date().toISOString()).order("published_at", { ascending: false }).limit(50);
      if (!active || !data) return;
      setDbPosts(data.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt || "Artículo del archivo editorial SEO.", category: categoryFromDb(p.category), readTime: readTime(p.content || ""), publishedAt: p.published_at || undefined, cover: p.cover_image || undefined })));
    };
    void load();
    return () => { active = false; };
  }, []);

  const allPosts = useMemo(() => {
    const merged = new Map<string, DbPost>();
    SEO_EDITORIAL.forEach((p) => merged.set(p.slug, p));
    dbPosts.forEach((p) => merged.set(p.slug, p));
    return [...merged.values()];
  }, [dbPosts]);

  const posts = useMemo(() => allPosts.filter((p) => {
    const matchesCategory = category === "Todos" || p.category === category;
    const q = search.trim().toLowerCase();
    return matchesCategory && (!q || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q));
  }), [allPosts, category, search]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_ORIGIN}/blog#blog`,
    name: "Blog de SEO técnico, ecommerce y búsqueda con IA",
    url: `${SITE_ORIGIN}/blog`,
    inLanguage: "es",
    publisher: { "@type": "Organization", name: "Ferova", url: SITE_ORIGIN },
    blogPost: allPosts.slice(0, 20).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_ORIGIN}/blog/${p.slug}`,
      ...(p.publishedAt ? { datePublished: p.publishedAt } : {}),
      ...(p.cover ? { image: p.cover } : {}),
    })),
  };

  return (
    <div className="fx-site min-h-screen">
      <SEO title="Blog de SEO técnico, ecommerce y búsqueda con IA | Ferova" description="Análisis y guías sobre SEO técnico, ecommerce, trabajo con agencias, migraciones y preparación para nuevas interfaces de búsqueda." path="/blog" lang="es" breadcrumbs={BREADCRUMBS} jsonLd={blogSchema} />
      <Header lang="es" />
      <main id="contenido-principal" className="pt-20">
        <PageHero
          eyebrow="Archivo editorial"
          title="SEO explicado con método, contexto y evidencia."
          intro="Contenido mantenido por intención. Cada nueva pieza debe aportar experiencia, datos, código, capturas, análisis o una metodología reutilizable."
          breadcrumbs={BREADCRUMBS.slice(1)}
        >
          <label className="flex min-h-12 w-full max-w-md items-center gap-3 rounded-full border border-white/25 bg-white/10 px-5 sm:min-w-[28rem]">
            <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-[#d3d0e4]" />
            <span className="sr-only">Buscar artículos</span>
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por tema o problema" className="min-h-12 w-full bg-transparent text-white outline-none placeholder:text-[#d3d0e4]" />
          </label>
        </PageHero>

        <Section>
          <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Categorías del blog">
            {SEO_CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => { setCategory(item); trackEvent("blog_category_selected", { category: item, language: "es" }); }}
                className="pill-filter"
              >
                {categoryLabel[item] ?? item}
              </button>
            ))}
          </div>

          {posts.length ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}><PostCard post={post} /></li>
              ))}
            </ul>
          ) : (
            <div className="panel-card text-center" role="status">
              <h2 className="text-2xl">No encontramos artículos con esos criterios.</h2>
              <button type="button" onClick={() => { setSearch(""); setCategory("Todos"); }} className="fx-text-link mt-5">Limpiar filtros</button>
            </div>
          )}
        </Section>

        <CtaBand title="¿Tu agencia tiene un caso así sobre la mesa?" body="Cuéntale a Fera el proyecto en dos líneas y prepara el alcance: por tarea, por horas o capacidad mensual. Una persona confirma precio y disponibilidad.">
          <FeraButton source="seo_blog_final">Hablar con Fera</FeraButton>
          <FxLink to="/seo-para-agencias" variant="outline">Ver SEO para agencias</FxLink>
        </CtaBand>
      </main>
      <Footer lang="es" />
    </div>
  );
}
