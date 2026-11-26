import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Chip } from '@/components/admin/Chip';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Download, FileText, Loader2, Newspaper, Pencil, Sparkles, Trash2, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Subscriber {
  id: string; name: string; email: string; plan: string | null; lang: string | null; created_at: string;
}
interface EditionContent { news?: string; tip?: string; tool?: { name?: string; desc?: string; url?: string } }
interface EditionProContent { case_study?: string; analysis?: string; resource?: { name?: string; desc?: string; url?: string }; question?: string }
interface Edition { id: string; edition_number: number; title: string; subject_line: string | null; topics: string[]; plan: 'free' | 'pro'; reading_time: number; free_content: EditionContent; pro_content: EditionProContent | null; published: boolean; published_at: string | null; created_at: string }
interface GeneratedNewsletter { title?: string; subject_line?: string; topics?: string[]; reading_time?: number; free_content?: EditionContent; pro_content?: EditionProContent }

const NewsletterAdminPage = () => {
  // Form state
  const [editionNumber, setEditionNumber] = useState<number>(1);
  const [pubDate, setPubDate] = useState<Date>(new Date());
  const [title, setTitle] = useState('');
  const [subjectLine, setSubjectLine] = useState('');
  const [plan, setPlan] = useState<'free' | 'pro'>('free');
  const [readingTime, setReadingTime] = useState(5);
  const [topic1, setTopic1] = useState('');
  const [topic2, setTopic2] = useState('');
  const [topic3, setTopic3] = useState('');

  // Free content
  const [news, setNews] = useState('');
  const [tip, setTip] = useState('');
  const [toolName, setToolName] = useState('');
  const [toolDesc, setToolDesc] = useState('');
  const [toolUrl, setToolUrl] = useState('');

  // Pro content
  const [caseStudy, setCaseStudy] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [resourceName, setResourceName] = useState('');
  const [resourceDesc, setResourceDesc] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [question, setQuestion] = useState('');

  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('editions');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editions, setEditions] = useState<Edition[]>([]);
  const [editionsLoading, setEditionsLoading] = useState(true);
  const [generatorIdeas, setGeneratorIdeas] = useState('');
  const [generating, setGenerating] = useState(false);

  // Subscribers
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subsLoading, setSubsLoading] = useState(false);

  const buildSlug = () => {
    const base = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 60);
    return `edicion-${String(editionNumber).padStart(3, '0')}-${base}`;
  };

  const buildPayload = (published: boolean) => ({
    edition_number: editionNumber,
    slug: buildSlug(),
    title,
    subject_line: subjectLine || null,
    topics: [topic1, topic2, topic3].filter(Boolean),
    plan,
    reading_time: readingTime,
    free_content: { news, tip, tool: { name: toolName, desc: toolDesc, url: toolUrl } },
    pro_content: plan === 'pro' ? { case_study: caseStudy, analysis, resource: { name: resourceName, desc: resourceDesc, url: resourceUrl }, question } : null,
    published,
    published_at: published ? pubDate.toISOString() : null,
  });

  const handleSave = async (published: boolean) => {
    if (!title.trim() || !editionNumber) { toast.error('Título y número de edición son requeridos.'); return; }
    setSaving(true);
    try {
      const request = editingId
        ? supabase.from('newsletter_editions').update(buildPayload(published)).eq('id', editingId)
        : supabase.from('newsletter_editions').insert(buildPayload(published));
      const { error } = await request;
      if (error) throw error;
      toast.success(published ? `Edición #${editionNumber} publicada` : `Borrador #${editionNumber} guardado`);
      resetForm();
      await loadEditions();
      setTab('editions');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error al guardar');
    } finally { setSaving(false); }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle(''); setSubjectLine(''); setTopic1(''); setTopic2(''); setTopic3('');
    setNews(''); setTip(''); setToolName(''); setToolDesc(''); setToolUrl('');
    setCaseStudy(''); setAnalysis(''); setResourceName(''); setResourceDesc(''); setResourceUrl(''); setQuestion('');
    setGeneratorIdeas('');
    setEditionNumber(prev => prev + 1);
  };

  const loadEditions = async () => {
    setEditionsLoading(true);
    const { data, error } = await supabase.from('newsletter_editions').select('*').order('edition_number', { ascending: false });
    if (error) toast.error(`No se pudieron cargar las ediciones: ${error.message}`);
    setEditions((data ?? []) as unknown as Edition[]);
    setEditionsLoading(false);
  };

  useEffect(() => { void loadEditions(); }, []);

  const editEdition = (edition: Edition) => {
    setEditingId(edition.id); setEditionNumber(edition.edition_number); setTitle(edition.title); setSubjectLine(edition.subject_line ?? ''); setPlan(edition.plan); setReadingTime(edition.reading_time ?? 5);
    setTopic1(edition.topics?.[0] ?? ''); setTopic2(edition.topics?.[1] ?? ''); setTopic3(edition.topics?.[2] ?? '');
    setNews(edition.free_content?.news ?? ''); setTip(edition.free_content?.tip ?? ''); setToolName(edition.free_content?.tool?.name ?? ''); setToolDesc(edition.free_content?.tool?.desc ?? ''); setToolUrl(edition.free_content?.tool?.url ?? '');
    setCaseStudy(edition.pro_content?.case_study ?? ''); setAnalysis(edition.pro_content?.analysis ?? ''); setResourceName(edition.pro_content?.resource?.name ?? ''); setResourceDesc(edition.pro_content?.resource?.desc ?? ''); setResourceUrl(edition.pro_content?.resource?.url ?? ''); setQuestion(edition.pro_content?.question ?? '');
    setPubDate(edition.published_at ? new Date(edition.published_at) : new Date()); setTab('new');
  };

  const deleteEdition = async (edition: Edition) => {
    if (!window.confirm(`¿Eliminar la edición #${edition.edition_number}? Esta acción no se puede deshacer.`)) return;
    const { error } = await supabase.from('newsletter_editions').delete().eq('id', edition.id);
    if (error) toast.error(`No se pudo eliminar: ${error.message}`); else { toast.success('Edición eliminada.'); await loadEditions(); }
  };

  const generateEdition = async () => {
    if (!title.trim() || !generatorIdeas.trim()) { toast.error('Agrega un título y la información base de la edición.'); return; }
    setGenerating(true);
    const { data, error } = await supabase.functions.invoke('blog-article-generator', { body: { action: 'generate_newsletter', payload: { editionNumber, title, subjectLine, plan, topics: [topic1, topic2, topic3].filter(Boolean), ideas: generatorIdeas } } });
    if (error || !data?.newsletter) toast.error(error?.message || 'El generador no devolvió la edición.');
    else {
      const generated = data.newsletter as GeneratedNewsletter;
      setTitle(generated.title || title); setSubjectLine(generated.subject_line || subjectLine); setReadingTime(generated.reading_time || readingTime);
      setTopic1(generated.topics?.[0] || topic1); setTopic2(generated.topics?.[1] || topic2); setTopic3(generated.topics?.[2] || topic3);
      setNews(generated.free_content?.news || news); setTip(generated.free_content?.tip || tip); setToolName(generated.free_content?.tool?.name || toolName); setToolDesc(generated.free_content?.tool?.desc || toolDesc); setToolUrl(generated.free_content?.tool?.url || toolUrl);
      if (plan === 'pro') { setCaseStudy(generated.pro_content?.case_study || caseStudy); setAnalysis(generated.pro_content?.analysis || analysis); setResourceName(generated.pro_content?.resource?.name || resourceName); setResourceDesc(generated.pro_content?.resource?.desc || resourceDesc); setResourceUrl(generated.pro_content?.resource?.url || resourceUrl); setQuestion(generated.pro_content?.question || question); }
      toast.success('Edición generada con la guía editorial. Revísala antes de publicar.');
    }
    setGenerating(false);
  };

  const loadSubscribers = async () => {
    setSubsLoading(true);
    const { data } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false });
    setSubscribers(data || []);
    setSubsLoading(false);
  };

  const exportCSV = () => {
    const headers = ['Nombre', 'Email', 'Plan', 'Idioma', 'Fecha'];
    const rows = subscribers.map(s => [s.name, s.email, s.plan || 'free', s.lang || 'es', s.created_at?.slice(0, 10) || '']);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `newsletter-subscribers-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const freeCount = subscribers.filter(s => s.plan !== 'pro').length;
  const proCount = subscribers.filter(s => s.plan === 'pro').length;

  return (
    <AdminLayout title="Newsletter" description="Crea una edición y administra la lista de suscriptores.">
      <div className="max-w-4xl">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-5 h-auto max-w-full justify-start gap-1 overflow-x-auto rounded-full bg-white p-1 shadow-[0_2px_8px_rgb(47_45_86_/_8%)]">
              <TabsTrigger value="editions" className="flex items-center gap-2 rounded-full px-4 py-2 data-[state=active]:bg-[#2f2d56] data-[state=active]:text-white data-[state=active]:shadow-none"><Newspaper className="h-4 w-4" />Ediciones</TabsTrigger>
              <TabsTrigger value="new" className="flex items-center gap-2 rounded-full px-4 py-2 data-[state=active]:bg-[#2f2d56] data-[state=active]:text-white data-[state=active]:shadow-none"><FileText className="h-4 w-4" />{editingId ? 'Editar' : 'Nueva edición'}</TabsTrigger>
              <TabsTrigger value="subs" onClick={loadSubscribers} className="flex items-center gap-2 rounded-full px-4 py-2 data-[state=active]:bg-[#2f2d56] data-[state=active]:text-white data-[state=active]:shadow-none"><Users className="h-4 w-4" />Suscriptores</TabsTrigger>
            </TabsList>

            <TabsContent value="editions">
              {editionsLoading ? <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin" aria-label="Cargando" /></div> : editions.length === 0 ? <div className="admin-empty">Aún no hay ediciones. Crea la primera y guárdala como borrador.</div> : <div className="admin-table-wrap"><table className="admin-table min-w-[620px]"><thead><tr><th scope="col">Edición</th><th scope="col">Plan</th><th scope="col">Estado</th><th scope="col" className="text-right">Acciones</th></tr></thead><tbody>{editions.map((edition) => <tr key={edition.id}><td><strong><span className="admin-mono">#{edition.edition_number}</span> · {edition.title}</strong><div className="admin-mono mt-1 text-xs text-muted-foreground">{edition.published_at ? format(new Date(edition.published_at), 'dd MMM yyyy') : format(new Date(edition.created_at), 'dd MMM yyyy')}</div></td><td><Chip tone={edition.plan === 'pro' ? 'brand' : 'idle'}>{edition.plan === 'pro' ? 'Pro' : 'Gratis'}</Chip></td><td><Chip tone={edition.published ? 'ok' : 'idle'}>{edition.published ? 'Publicada' : 'Borrador'}</Chip></td><td><div className="flex justify-end gap-1.5"><button type="button" onClick={() => editEdition(edition)} aria-label={`Editar edición ${edition.edition_number}`} title="Editar" className="admin-icon-btn"><Pencil aria-hidden="true" /></button><button type="button" onClick={() => void deleteEdition(edition)} aria-label={`Eliminar edición ${edition.edition_number}`} title="Eliminar" className="admin-icon-btn admin-icon-btn--danger"><Trash2 aria-hidden="true" /></button></div></td></tr>)}</tbody></table></div>}
            </TabsContent>

            {/* TAB: New edition */}
            <TabsContent value="new">
              <div className="admin-card space-y-6">
                {editingId && <div className="admin-alert admin-alert--info items-center justify-between"><span>Estás editando una edición existente.</span><button type="button" onClick={() => { resetForm(); setTab('editions'); }} className="font-semibold underline underline-offset-2">Cancelar</button></div>}
                <section className="rounded-2xl bg-[#f7f8fc] p-4">
                  <h2 className="admin-card__title flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#c0930e]" aria-hidden="true" /> Generador editorial</h2>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">Pega la noticia, enlaces, datos, experiencia o ideas que sí quieres usar. La IA aplicará la guía de Ferova sin inventar fuentes ni cifras.</p>
                  <Textarea rows={6} className="mt-3" value={generatorIdeas} onChange={(event) => setGeneratorIdeas(event.target.value)} placeholder="Información base de esta edición, enlaces verificados, enfoque para agencias y CTA…" />
                  <button type="button" onClick={() => void generateEdition()} disabled={generating} className="admin-btn admin-btn--ghost mt-3">{generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} Generar edición completa</button>
                </section>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Número de edición</label>
                    <Input type="number" value={editionNumber} onChange={e => setEditionNumber(Number(e.target.value))} min={1} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Fecha publicación</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className={cn("w-full flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm", !pubDate && "text-muted-foreground")}>
                          <CalendarIcon className="h-4 w-4" />{pubDate ? format(pubDate, 'PPP') : 'Seleccionar'}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={pubDate} onSelect={d => d && setPubDate(d)} className="p-3 pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Plan</label>
                    <select value={plan} onChange={e => setPlan(e.target.value as 'free' | 'pro')} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="free">Gratis</option>
                      <option value="pro">Pro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Título de la edición</label>
                  <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ej: Cómo el SGE de Google está cambiando las búsquedas de producto" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Asunto del email (referencia)</label>
                    <Input value={subjectLine} onChange={e => setSubjectLine(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Tiempo de lectura (min)</label>
                    <Input type="number" value={readingTime} onChange={e => setReadingTime(Number(e.target.value))} min={1} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div><label className="text-sm font-medium mb-1 block">Tema 1</label><Input value={topic1} onChange={e => setTopic1(e.target.value)} /></div>
                  <div><label className="text-sm font-medium mb-1 block">Tema 2</label><Input value={topic2} onChange={e => setTopic2(e.target.value)} /></div>
                  <div><label className="text-sm font-medium mb-1 block">Tema 3</label><Input value={topic3} onChange={e => setTopic3(e.target.value)} /></div>
                </div>

                <hr className="border-border" />
                <h3 className="admin-card__title flex items-center gap-2">Contenido <Chip tone="idle">Gratis</Chip></h3>

                <div><label className="text-sm font-medium mb-1 block">Noticia de la semana</label><Textarea rows={6} value={news} onChange={e => setNews(e.target.value)} /></div>
                <div><label className="text-sm font-medium mb-1 block">Tip accionable</label><Textarea rows={4} value={tip} onChange={e => setTip(e.target.value)} /></div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div><label className="text-sm font-medium mb-1 block">Nombre herramienta</label><Input value={toolName} onChange={e => setToolName(e.target.value)} /></div>
                  <div><label className="text-sm font-medium mb-1 block">Descripción herramienta</label><Input value={toolDesc} onChange={e => setToolDesc(e.target.value)} /></div>
                  <div><label className="text-sm font-medium mb-1 block">URL herramienta</label><Input value={toolUrl} onChange={e => setToolUrl(e.target.value)} /></div>
                </div>

                {plan === 'pro' && (
                  <>
                    <hr className="border-border" />
                    <h3 className="admin-card__title flex items-center gap-2">Contenido <Chip tone="brand">Pro</Chip></h3>
                    <div><label className="text-sm font-medium mb-1 block">Caso de estudio</label><Textarea rows={6} value={caseStudy} onChange={e => setCaseStudy(e.target.value)} /></div>
                    <div><label className="text-sm font-medium mb-1 block">Análisis Google</label><Textarea rows={6} value={analysis} onChange={e => setAnalysis(e.target.value)} /></div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div><label className="text-sm font-medium mb-1 block">Nombre recurso</label><Input value={resourceName} onChange={e => setResourceName(e.target.value)} /></div>
                      <div><label className="text-sm font-medium mb-1 block">Descripción recurso</label><Input value={resourceDesc} onChange={e => setResourceDesc(e.target.value)} /></div>
                      <div><label className="text-sm font-medium mb-1 block">URL recurso</label><Input value={resourceUrl} onChange={e => setResourceUrl(e.target.value)} /></div>
                    </div>
                    <div><label className="text-sm font-medium mb-1 block">Pregunta del suscriptor + respuesta</label><Textarea rows={4} value={question} onChange={e => setQuestion(e.target.value)} /></div>
                  </>
                )}

                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <button onClick={() => handleSave(true)} disabled={saving} className="admin-btn flex-1">{saving ? <Loader2 className="animate-spin" aria-label="Guardando" /> : 'Publicar edición'}</button>
                  <button onClick={() => handleSave(false)} disabled={saving} className="admin-btn admin-btn--ghost flex-1">{saving ? <Loader2 className="animate-spin" aria-label="Guardando" /> : 'Guardar borrador'}</button>
                </div>
              </div>
            </TabsContent>

            {/* TAB: Subscribers */}
            <TabsContent value="subs">
              <div className="admin-card">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground"><span className="admin-mono text-foreground">{freeCount}</span> suscriptores gratis · <span className="admin-mono text-foreground">{proCount}</span> pro</p>
                  <button onClick={exportCSV} className="admin-btn admin-btn--ghost admin-btn--sm">
                    <Download className="h-4 w-4" />Exportar CSV
                  </button>
                </div>
                {subsLoading ? (
                  <p className="text-center text-muted-foreground py-10">Cargando...</p>
                ) : subscribers.length === 0 ? (
                  <p className="text-center text-muted-foreground py-10">No hay suscriptores aún.</p>
                ) : (
                  <div className="-mx-1 overflow-x-auto">
                    <table className="admin-table min-w-[560px]">
                      <thead><tr><th scope="col">Nombre</th><th scope="col">Email</th><th scope="col">Plan</th><th scope="col">Idioma</th><th scope="col">Fecha</th></tr></thead>
                      <tbody>
                        {subscribers.map(s => (
                          <tr key={s.id} className="border-b border-border/50">
                            <td className="py-2 pr-4">{s.name}</td>
                            <td className="py-2 pr-4 text-muted-foreground">{s.email}</td>
                            <td><Chip tone={s.plan === 'pro' ? 'brand' : 'idle'}>{s.plan || 'free'}</Chip></td>
                            <td className="py-2 pr-4 text-muted-foreground">{s.lang || 'es'}</td>
                            <td className="py-2 text-muted-foreground">{s.created_at?.slice(0, 10)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
      </div>
    </AdminLayout>
  );
};

export default NewsletterAdminPage;
