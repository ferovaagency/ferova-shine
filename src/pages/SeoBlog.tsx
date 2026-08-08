import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Clock, Search } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { SEO_CATEGORIES, SEO_EDITORIAL, type SeoEditorialItem } from "@/content/seoEditorial";
import { trackEvent } from "@/lib/analytics";

type DbPost = SeoEditorialItem & { publishedAt?: string };

const categoryFromDb = (value?: string | null): SeoEditorialItem["category"] => {
  const v = (value ?? "").toLowerCase();
  if (v.includes("technical") || v.includes("técnic")) return "Technical SEO";
  if (v.includes("agenc")) return "SEO for Agencies";
  if (v.includes("migration") || v.includes("migraci")) return "SEO Migrations";
  if (v.includes("ai") || v.includes("geo") || v.includes("ia")) return "AI Search";
  return "Ecommerce SEO";
};

const readTime = (content: string) => `${Math.max(1, Math.round(content.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length / 200))} min`;

export default function SeoBlog() {
  const [params] = useSearchParams();
  const initialCategory = params.get("categoria");
  const [category, setCategory] = useState(SEO_CATEGORIES.includes(initialCategory as typeof SEO_CATEGORIES[number]) ? initialCategory! : "Todos");
  const [search, setSearch] = useState("");
  const [dbPosts, setDbPosts] = useState<DbPost[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase.from("blog_posts").select("slug, title, excerpt, category, content, published_at").eq("active", true).lte("published_at", new Date().toISOString()).order("published_at", { ascending: false }).limit(50);
      if (!active || !data) return;
      setDbPosts(data.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt || "Artículo del archivo editorial SEO.", category: categoryFromDb(p.category), readTime: readTime(p.content || ""), publishedAt: p.published_at || undefined })));
    };
    void load();
    return () => { active = false; };
  }, []);

  const posts = useMemo(() => {
    const merged = new Map<string, DbPost>();
    SEO_EDITORIAL.forEach((p) => merged.set(p.slug, p));
    dbPosts.forEach((p) => merged.set(p.slug, p));
    return [...merged.values()].filter((p) => {
      const matchesCategory = category === "Todos" || p.category === category;
      const q = search.trim().toLowerCase();
      return matchesCategory && (!q || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q));
    });
  }, [category, dbPosts, search]);

  return <div className="min-h-screen bg-white text-slate-950"><SEO title="Blog de SEO técnico, ecommerce y AI Search | Ferova" description="Análisis y guías sobre SEO técnico, ecommerce, trabajo con agencias, migraciones y preparación para nuevas interfaces de búsqueda." path="/blog" lang="es" breadcrumbs={[{ name: "Inicio", path: "/" }, { name: "Blog", path: "/blog" }]} /><Header lang="es" /><main className="pt-20">
    <section className="bg-[#071a2f] py-16 text-white md:py-24"><div className="container mx-auto max-w-6xl px-4 md:px-6"><p className="text-xs font-semibold uppercase tracking-[.22em] text-cyan-300">Archivo editorial</p><div className="mt-5 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end"><div><h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">SEO explicado con método, contexto y evidencia.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Contenido mantenido por intención. Cada nueva pieza debe aportar experiencia, datos, código, capturas, análisis o una metodología reutilizable.</p></div><label className="relative block"><span className="sr-only">Buscar artículos</span><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por tema o problema" className="w-full rounded-xl border border-white/15 bg-white/10 py-3 pl-12 pr-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-300" /></label></div></div></section>
    <section className="border-b border-slate-200 bg-slate-50 py-7"><div className="container mx-auto flex max-w-6xl flex-wrap gap-2 px-4 md:px-6">{SEO_CATEGORIES.map((item) => <button key={item} type="button" onClick={() => { setCategory(item); trackEvent("blog_category_selected", { category: item, language: "es" }); }} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${category === item ? "bg-blue-700 text-white" : "border border-slate-300 bg-white text-slate-700 hover:border-blue-400"}`}>{item}</button>)}</div></section>
    <section className="py-16 md:py-24"><div className="container mx-auto max-w-6xl px-4 md:px-6">{posts.length ? <div className="grid gap-5 md:grid-cols-2">{posts.map((post) => <Link key={post.slug} to={`/blog/${post.slug}`} className="group rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"><div className="flex items-center justify-between gap-4"><span className="text-xs font-bold uppercase tracking-wider text-blue-700">{post.category}</span><span className="flex items-center gap-1 text-xs text-slate-500"><Clock className="h-3.5 w-3.5" />{post.readTime}</span></div><h2 className="mt-5 font-display text-2xl font-bold group-hover:text-blue-700">{post.title}</h2><p className="mt-3 line-clamp-3 leading-7 text-slate-600">{post.excerpt}</p><span className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-700">Leer análisis <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>)}</div> : <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center"><h2 className="font-display text-2xl font-bold">No encontramos artículos con esos criterios.</h2><button type="button" onClick={() => { setSearch(""); setCategory("Todos"); }} className="mt-5 font-semibold text-blue-700">Limpiar filtros</button></div>}</div></section>
  </main><Footer lang="es" /></div>;
}
