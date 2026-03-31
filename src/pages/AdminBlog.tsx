import { useMemo, useState, useRef } from 'react';
import { Loader2, Save, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';
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

const emptyForm = {
  title: '',
  keyword: '',
  category: '',
  ideas: '',
};

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
    author: getSafeString(source.author) || 'AnnovaSoft',
    active: source.active === false ? false : true,
  };

  if (!article.title || !article.slug || !article.excerpt || !article.content || !article.meta_title || !article.meta_description) {
    throw new Error('La respuesta del generador llegó incompleta.');
  }

  return article;
};

const AdminBlog = ({ lang = 'es' }: Props) => {
  const { toast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState<ArticleDraft | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validation, setValidation] = useState<{ pass: boolean; reason: string } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const copy = useMemo(() => lang === 'es' ? {
    title: 'Generador de Blog',
    sub: 'Genera artículos SEO con la Guía Editorial Ferova 2025. Revisa, valida y guarda.',
    generator: 'Datos del artículo',
    generatorSub: 'Completa los campos y la IA generará un artículo siguiendo la guía editorial.',
    articleTitle: 'Título base',
    keyword: 'Keyword principal',
    category: 'Categoría',
    ideas: 'Ideas principales',
    ideasPlaceholder: 'Escribe las ideas clave que debe cubrir el artículo. Ej:\n- Beneficios del SEO local para negocios físicos\n- Cómo Google My Business impacta el posicionamiento\n- Estrategias de contenido local',
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
  } : lang === 'pt' ? {
    title: 'Gerador de Blog',
    sub: 'Gere artigos SEO com o Guia Editorial Ferova 2025. Revise, valide e salve.',
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
  } : {
    title: 'Blog Generator',
    sub: 'Generate SEO articles with the Ferova Editorial Guide 2025. Review, validate and save.',
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
        body: {
          action: 'generate',
          payload: {
            title: form.title,
            keyword: form.keyword,
            category: form.category,
            ideas: form.ideas,
            lang,
          },
        },
      });

      if (error) throw error;

      const result = data as { article?: unknown; validation?: { pass: boolean; reason: string } } | null;
      const article = normalizeArticle(result?.article);
      setPreview(article);
      if (result?.validation) setValidation(result.validation);
      toast({ title: copy.generatedOk });

      setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth' }), 200);
    } catch (error) {
      toast({
        title: copy.generator,
        description: error instanceof Error ? error.message : 'Error',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!preview) {
      toast({ title: copy.saveFirst, variant: 'destructive' });
      return;
    }

    setIsSaving(true);

    try {
      const { data, error } = await supabase.functions.invoke('blog-article-generator', {
        body: {
          action: 'save',
          payload: { article: preview },
        },
      });

      if (error) throw error;

      const savedSlug = getSafeString((data as { post?: { slug?: string } } | null)?.post?.slug);
      toast({
        title: copy.savedOk,
        description: savedSlug ? `${copy.slug}: ${savedSlug}` : undefined,
      });
      setForm(emptyForm);
      setPreview(null);
      setValidation(null);
    } catch (error) {
      toast({
        title: copy.generator,
        description: error instanceof Error ? error.message : 'Error',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const wordCount = preview ? preview.content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length : 0;

  return (
    <PageTransition>
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="border-b border-border/50 py-12 md:py-16">
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

        <section className="py-10 md:py-14">
          <div className="container mx-auto grid gap-8 px-4 md:px-6 lg:grid-cols-[420px,1fr]">
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
                      <Input
                        id="article-title"
                        value={form.title}
                        onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))}
                        placeholder={lang === 'es' ? 'Ej. SEO local para clínicas odontológicas' : 'E.g. Local SEO for dental clinics'}
                        disabled={isGenerating}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="article-keyword">{copy.keyword}</Label>
                      <Input
                        id="article-keyword"
                        value={form.keyword}
                        onChange={(e) => setForm((c) => ({ ...c, keyword: e.target.value }))}
                        placeholder={lang === 'es' ? 'seo local odontología' : 'local seo dentistry'}
                        disabled={isGenerating}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="article-category">{copy.category}</Label>
                      <Input
                        id="article-category"
                        value={form.category}
                        onChange={(e) => setForm((c) => ({ ...c, category: e.target.value }))}
                        placeholder="SEO"
                        disabled={isGenerating}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="article-ideas">{copy.ideas}</Label>
                      <Textarea
                        id="article-ideas"
                        value={form.ideas}
                        onChange={(e) => setForm((c) => ({ ...c, ideas: e.target.value }))}
                        placeholder={copy.ideasPlaceholder}
                        rows={5}
                        disabled={isGenerating}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isGenerating}>
                      {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      {isGenerating ? copy.generating : copy.generate}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div ref={previewRef}>
              <Card>
                <CardHeader>
                  <CardTitle>{copy.preview}</CardTitle>
                  <CardDescription>{copy.previewSub}</CardDescription>
                </CardHeader>
                <CardContent>
                  {preview ? (
                    <div className="space-y-6">
                      {validation && (
                        <div className={`flex items-start gap-3 rounded-xl border p-4 ${validation.pass ? 'border-green-500/30 bg-green-500/5' : 'border-yellow-500/30 bg-yellow-500/5'}`}>
                          {validation.pass
                            ? <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            : <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />}
                          <div>
                            <p className="text-sm font-medium text-foreground">{validation.pass ? copy.validationPass : copy.validationFail}</p>
                            <p className="text-xs text-muted-foreground mt-1">{validation.reason}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{copy.wordCount}: <strong className="text-foreground">{wordCount}</strong></span>
                        <span>Meta Title: <strong className="text-foreground">{preview.meta_title.length}/60</strong></span>
                        <span>Meta Desc: <strong className="text-foreground">{preview.meta_description.length}/160</strong></span>
                      </div>

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

                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">{copy.metaTitle}</p>
                        <div className="rounded-xl border border-border bg-background p-4 text-sm text-foreground">{preview.meta_title}</div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">{copy.metaDescription}</p>
                        <div className="rounded-xl border border-border bg-background p-4 text-sm text-foreground">{preview.meta_description}</div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">{copy.content}</p>
                        <article
                          className="prose prose-sm max-w-none rounded-2xl border border-border bg-background p-5 text-foreground dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground"
                          dangerouslySetInnerHTML={{ __html: preview.content }}
                        />
                      </div>

                      <Button type="button" onClick={handleSave} disabled={isSaving} className="w-full">
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
