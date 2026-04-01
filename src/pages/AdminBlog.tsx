import { useMemo, useState, useRef } from 'react';
import { Loader2, Save, Sparkles, AlertTriangle, CheckCircle2, List, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { PageTransition } from '@/components/ui/motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface Props {
  lang?: 'es' | 'en' | 'pt';
}

interface ArticleDraft {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_title: string;
  meta_description: string;
  category: string;
  keyword: string;
  cover_image: string | null;
  author: string;
  active: boolean;
}

const emptyForm = { title: '', keyword: '', category: '', ideas: '' };

const getSafeString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const normalizeArticle = (raw: unknown): ArticleDraft => {
  const source = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const article: ArticleDraft = {
    title: getSafeString(source.title),
    slug: getSafeString(source.slug),
    excerpt: getSafeString(source.excerpt),
    content: getSafeString(source.content),
    meta_title: getSafeString(source.meta_title),
    meta_description: getSafeString(source.meta_description),
    category: getSafeString(source.category),
    keyword: getSafeString(source.keyword),
    cover_image: getSafeString(source.cover_image) || null,
    author: getSafeString(source.author) || 'Maria Calderon',
    active: source.active === false ? false : true,
  };

  if (!article.title || !article.slug || !article.excerpt || !article.content || !article.meta_title || !article.meta_description) {
    throw new Error('La respuesta del generador llegó incompleta.');
  }

  return article;
};

/* ── SEO Heading Outline Extractor ── */
interface HeadingNode { level: number; text: string; }

const extractHeadings = (html: string): HeadingNode[] => {
  const regex = /<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi;
  const headings: HeadingNode[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1], 10),
      text: match[2].replace(/<[^>]*>/g, '').trim(),
    });
  }
  return headings;
};

const validateHierarchy = (headings: HeadingNode[]): string[] => {
  const errors: string[] = [];
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level - headings[i - 1].level > 1) {
      errors.push(`Salto de H${headings[i - 1].level} a H${headings[i].level} (no permitido)`);
    }
  }
  return errors;
};

const AdminBlog = ({ lang = 'es' }: Props) => {
  const { toast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState<ArticleDraft | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validation, setValidation] = useState<{ pass: boolean; reason: string } | null>(null);
  const [publishDate, setPublishDate] = useState<Date | undefined>(undefined);
  const previewRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const copy = useMemo(() => lang === 'es' ? {
    title: 'Generador de Blog',
    sub: 'Genera artículos SEO con la Guía Editorial Ferova 2025. Revisa, valida y guarda.',
    generator: 'Datos del artículo',
    generatorSub: 'Completa los campos y la IA generará un artículo siguiendo la guía editorial.',
    articleTitle: 'Título base',
    keyword: 'Keyword principal',
    category: 'Categoría',
    ideas: 'Ideas principales',
    ideasPlaceholder: 'Escribe las ideas clave que debe cubrir el artículo.',
    generate: 'Generar artículo',
    generating: 'Generando con IA...',
    save: 'Publicar artículo',
    saving: 'Guardando...',
    preview: 'Vista previa',
    previewSub: 'Revisa el artículo antes de publicar.',
    emptyPreview: 'Genera un artículo para ver la vista previa aquí.',
    slug: 'URL',
    excerpt: 'Extracto',
    metaTitle: 'Meta Title',
    metaDescription: 'Meta Description',
    content: 'Contenido',
    generatedOk: 'Artículo generado correctamente.',
    savedOk: 'Artículo publicado en el blog.',
    saveFirst: 'Primero genera un artículo.',
    requiredFields: 'Completa título, keyword e ideas principales.',
    validationPass: 'Validación editorial aprobada',
    validationFail: 'Validación editorial no aprobada',
    wordCount: 'Palabras',
    seoOutline: 'Esquema SEO',
    hierarchyError: 'Error de jerarquía',
    minWords: 'Mínimo 800 palabras requeridas para publicar.',
  } : lang === 'pt' ? {
    title: 'Gerador de Blog',
    sub: 'Gere artigos SEO com o Guia Editorial Ferova 2025.',
    generator: 'Dados do artigo',
    generatorSub: 'Preencha os campos e a IA gerará um artigo seguindo o guia editorial.',
    articleTitle: 'Título base',
    keyword: 'Palavra-chave principal',
    category: 'Categoria',
    ideas: 'Ideias principais',
    ideasPlaceholder: 'Escreva as ideias-chave que o artigo deve cobrir.',
    generate: 'Gerar artigo',
    generating: 'Gerando com IA...',
    save: 'Publicar artigo',
    saving: 'Salvando...',
    preview: 'Pré-visualização',
    previewSub: 'Revise o artigo antes de publicar.',
    emptyPreview: 'Gere um artigo para ver a pré-visualização aqui.',
    slug: 'URL',
    excerpt: 'Resumo',
    metaTitle: 'Meta Title',
    metaDescription: 'Meta Description',
    content: 'Conteúdo',
    generatedOk: 'Artigo gerado com sucesso.',
    savedOk: 'Artigo publicado no blog.',
    saveFirst: 'Primeiro gere um artigo.',
    requiredFields: 'Preencha título, palavra-chave e ideias principais.',
    validationPass: 'Validação editorial aprovada',
    validationFail: 'Validação editorial não aprovada',
    wordCount: 'Palavras',
    seoOutline: 'Esquema SEO',
    hierarchyError: 'Erro de hierarquia',
    minWords: 'Mínimo 800 palavras necessárias para publicar.',
  } : {
    title: 'Blog Generator',
    sub: 'Generate SEO articles with the Ferova Editorial Guide 2025.',
    generator: 'Article data',
    generatorSub: 'Fill in the fields and AI will generate an article following the editorial guide.',
    articleTitle: 'Base title',
    keyword: 'Primary keyword',
    category: 'Category',
    ideas: 'Key ideas',
    ideasPlaceholder: 'Write the key ideas the article should cover.',
    generate: 'Generate article',
    generating: 'Generating with AI...',
    save: 'Publish article',
    saving: 'Saving...',
    preview: 'Preview',
    previewSub: 'Review the article before publishing.',
    emptyPreview: 'Generate an article to see the preview here.',
    slug: 'URL',
    excerpt: 'Excerpt',
    metaTitle: 'Meta Title',
    metaDescription: 'Meta Description',
    content: 'Content',
    generatedOk: 'Article generated successfully.',
    savedOk: 'Article published to the blog.',
    saveFirst: 'Generate an article first.',
    requiredFields: 'Complete title, keyword and key ideas.',
    validationPass: 'Editorial validation passed',
    validationFail: 'Editorial validation failed',
    wordCount: 'Words',
    seoOutline: 'SEO Outline',
    hierarchyError: 'Hierarchy error',
    minWords: 'Minimum 800 words required to publish.',
  }, [lang]);

  const handleGenerate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim() || !form.keyword.trim() || !form.ideas.trim()) {
      toast({ title: copy.requiredFields, variant: 'destructive' });
      return;
    }
    setIsGenerating(true);
    setValidation(null);
    try {
      const { data, error } = await supabase.functions.invoke('blog-article-generator', {
        body: { action: 'generate', payload: { title: form.title, keyword: form.keyword, category: form.category, ideas: form.ideas, lang } },
      });
      if (error) throw error;
      const result = data as { article?: unknown; validation?: { pass: boolean; reason: string } } | null;
      const article = normalizeArticle(result?.article);
      setPreview(article);
      if (result?.validation) setValidation(result.validation);
      toast({ title: copy.generatedOk });
      setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth' }), 200);
    } catch (error) {
      toast({ title: copy.generator, description: error instanceof Error ? error.message : 'Error', variant: 'destructive' });
    } finally {
      setIsGenerating(false);
      inputRef.current?.focus();
    }
  };

  const wordCount = preview ? preview.content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length : 0;
  const headings = preview ? extractHeadings(preview.content) : [];
  const hierarchyErrors = validateHierarchy(headings);
  const canPublish = preview && wordCount >= 800 && hierarchyErrors.length === 0;

  const handleSave = async () => {
    if (!preview) { toast({ title: copy.saveFirst, variant: 'destructive' }); return; }
    if (wordCount < 800) { toast({ title: copy.minWords, variant: 'destructive' }); return; }
    if (hierarchyErrors.length > 0) { toast({ title: copy.hierarchyError, description: hierarchyErrors[0], variant: 'destructive' }); return; }

    setIsSaving(true);
    try {
      const articleWithDate = {
        ...preview,
        published_at: publishDate ? publishDate.toISOString() : new Date().toISOString(),
      };
      const { data, error } = await supabase.functions.invoke('blog-article-generator', {
        body: { action: 'save', payload: { article: articleWithDate } },
      });
      if (error) throw error;
      const savedSlug = getSafeString((data as { post?: { slug?: string } } | null)?.post?.slug);
      toast({ title: copy.savedOk, description: savedSlug ? `${copy.slug}: ${savedSlug}` : undefined });
      setForm(emptyForm);
      setPreview(null);
      setValidation(null);
      setPublishDate(undefined);
    } catch (error) {
      toast({ title: copy.generator, description: error instanceof Error ? error.message : 'Error', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PageTransition>
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="border-b border-border/50 py-10 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" /> {copy.title}
              </p>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">{copy.title}</h1>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">{copy.sub}</p>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container mx-auto grid gap-8 px-4 md:px-6 lg:grid-cols-[420px,1fr]">
            {/* Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{copy.generator}</CardTitle>
                  <CardDescription>{copy.generatorSub}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleGenerate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="article-title">{copy.articleTitle}</Label>
                      <Input ref={inputRef} id="article-title" value={form.title} onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))} placeholder={lang === 'es' ? 'Ej. SEO local para clínicas' : 'E.g. Local SEO for clinics'} disabled={isGenerating} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="article-keyword">{copy.keyword}</Label>
                      <Input id="article-keyword" value={form.keyword} onChange={(e) => setForm((c) => ({ ...c, keyword: e.target.value }))} placeholder={lang === 'es' ? 'seo local' : 'local seo'} disabled={isGenerating} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="article-category">{copy.category}</Label>
                      <Input id="article-category" value={form.category} onChange={(e) => setForm((c) => ({ ...c, category: e.target.value }))} placeholder="SEO" disabled={isGenerating} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="article-ideas">{copy.ideas}</Label>
                      <Textarea id="article-ideas" value={form.ideas} onChange={(e) => setForm((c) => ({ ...c, ideas: e.target.value }))} placeholder={copy.ideasPlaceholder} rows={5} disabled={isGenerating} />
                    </div>
                    <div className="space-y-2">
                      <Label>{lang === 'pt' ? 'Data de publicação' : lang === 'en' ? 'Publish date' : 'Fecha de publicación'}</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !publishDate && "text-muted-foreground")} disabled={isGenerating}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {publishDate ? format(publishDate, 'PPP') : (lang === 'es' ? 'Ahora (inmediato)' : lang === 'pt' ? 'Agora (imediato)' : 'Now (immediate)')}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={publishDate} onSelect={setPublishDate} className={cn("p-3 pointer-events-auto")} />
                        </PopoverContent>
                      </Popover>
                      <p className="text-xs text-muted-foreground">{lang === 'es' ? 'Deja vacío para publicar de inmediato.' : lang === 'pt' ? 'Deixe vazio para publicar imediatamente.' : 'Leave empty to publish immediately.'}</p>
                    </div>
                    <Button type="submit" className="w-full" disabled={isGenerating}>
                      {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      {isGenerating ? copy.generating : copy.generate}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div ref={previewRef}>
              <Card>
                <CardHeader>
                  <CardTitle>{copy.preview}</CardTitle>
                  <CardDescription>{copy.previewSub}</CardDescription>
                </CardHeader>
                <CardContent>
                  {preview ? (
                    <div className="space-y-6">
                      {/* Validation badge */}
                      {validation && (
                        <div className={`flex items-start gap-3 rounded-xl border p-4 ${validation.pass ? 'border-green-500/30 bg-green-500/5' : 'border-yellow-500/30 bg-yellow-500/5'}`}>
                          {validation.pass ? <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" /> : <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />}
                          <div>
                            <p className="text-sm font-medium text-foreground">{validation.pass ? copy.validationPass : copy.validationFail}</p>
                            <p className="text-xs text-muted-foreground mt-1">{validation.reason}</p>
                          </div>
                        </div>
                      )}

                      {/* Metrics bar */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span>{copy.wordCount}: <strong className={`${wordCount < 800 ? 'text-red-500' : 'text-foreground'}`}>{wordCount}</strong></span>
                        <span>Meta Title: <strong className={`${preview.meta_title.length > 60 ? 'text-red-500' : 'text-foreground'}`}>{preview.meta_title.length}/60</strong></span>
                        <span>Meta Desc: <strong className={`${preview.meta_description.length > 160 ? 'text-red-500' : 'text-foreground'}`}>{preview.meta_description.length}/160</strong></span>
                      </div>

                      {/* Word count alert */}
                      {wordCount < 800 && (
                        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-xs text-red-500">
                          <AlertTriangle className="h-4 w-4 shrink-0" /> {copy.minWords}
                        </div>
                      )}

                      {/* SEO Heading Outline */}
                      <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground flex items-center gap-1.5"><List className="h-3.5 w-3.5" /> {copy.seoOutline}</p>
                        {headings.length > 0 ? (
                          <ul className="space-y-1">
                            {headings.map((h, i) => (
                              <li key={i} className="text-sm text-foreground" style={{ paddingLeft: `${(h.level - 1) * 16}px` }}>
                                <span className="text-muted-foreground font-mono text-xs mr-1.5">H{h.level}</span>
                                {h.text}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-muted-foreground italic">No headings found</p>
                        )}
                        {hierarchyErrors.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {hierarchyErrors.map((err, i) => (
                              <p key={i} className="text-xs text-red-500 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {err}</p>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Slug & Excerpt */}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl border border-border bg-muted/30 p-4">
                          <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">{copy.slug}</p>
                          <p className="text-sm font-medium text-foreground">{preview.slug}</p>
                        </div>
                        <div className="rounded-xl border border-border bg-muted/30 p-4">
                          <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">{copy.excerpt}</p>
                          <p className="text-sm text-foreground">{preview.excerpt}</p>
                        </div>
                      </div>

                      {/* Meta fields */}
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">{copy.metaTitle}</p>
                        <div className="rounded-xl border border-border bg-background p-4 text-sm text-foreground">{preview.meta_title}</div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">{copy.metaDescription}</p>
                        <div className="rounded-xl border border-border bg-background p-4 text-sm text-foreground">{preview.meta_description}</div>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">{copy.content}</p>
                        <article
                          className="prose prose-sm max-w-none rounded-2xl border border-border bg-background p-5 text-foreground dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground"
                          dangerouslySetInnerHTML={{ __html: preview.content }}
                        />
                      </div>

                      {/* Publish */}
                      <Button type="button" onClick={handleSave} disabled={isSaving || !canPublish} className="w-full">
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {isSaving ? copy.saving : copy.save}
                      </Button>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center text-sm text-muted-foreground">
                      {copy.emptyPreview}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </PageTransition>
  );
};

export default AdminBlog;
