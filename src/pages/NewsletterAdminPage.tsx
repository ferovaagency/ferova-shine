import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Download, FileText, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Subscriber {
  id: string; name: string; email: string; plan: string | null; lang: string | null; created_at: string;
}

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
      const { error } = await supabase.from('newsletter_editions').insert(buildPayload(published));
      if (error) throw error;
      toast.success(published ? `Edición #${editionNumber} publicada` : `Borrador #${editionNumber} guardado`);
      resetForm();
    } catch (err: any) {
      toast.error(err?.message || 'Error al guardar');
    } finally { setSaving(false); }
  };

  const resetForm = () => {
    setTitle(''); setSubjectLine(''); setTopic1(''); setTopic2(''); setTopic3('');
    setNews(''); setTip(''); setToolName(''); setToolDesc(''); setToolUrl('');
    setCaseStudy(''); setAnalysis(''); setResourceName(''); setResourceDesc(''); setResourceUrl(''); setQuestion('');
    setEditionNumber(prev => prev + 1);
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
    <PageTransition>
      <Header lang="es" />
      <div className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>Admin — Newsletter</h1>

          <Tabs defaultValue="new" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="new" className="flex items-center gap-2"><FileText className="h-4 w-4" />Nueva edición</TabsTrigger>
              <TabsTrigger value="subs" onClick={loadSubscribers} className="flex items-center gap-2"><Users className="h-4 w-4" />Suscriptores</TabsTrigger>
            </TabsList>

            {/* TAB: New edition */}
            <TabsContent value="new">
              <div className="glass-card p-6 space-y-6">
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
                <h3 className="font-bold text-sm" style={{ color: 'hsl(45 86% 52%)' }}>Contenido Gratis</h3>

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
                    <h3 className="font-bold text-sm" style={{ color: 'hsl(45 86% 52%)' }}>Contenido Pro</h3>
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

                <div className="flex gap-4 pt-4">
                  <button onClick={() => handleSave(true)} disabled={saving} className="btn-gold flex-1">{saving ? '...' : 'Publicar edición'}</button>
                  <button onClick={() => handleSave(false)} disabled={saving} className="btn-outline-gold flex-1">{saving ? '...' : 'Guardar borrador'}</button>
                </div>
              </div>
            </TabsContent>

            {/* TAB: Subscribers */}
            <TabsContent value="subs">
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-muted-foreground">{freeCount} suscriptores gratis · {proCount} pro</p>
                  <button onClick={exportCSV} className="btn-outline-gold text-sm py-2 px-4 flex items-center gap-2">
                    <Download className="h-4 w-4" />Exportar CSV
                  </button>
                </div>
                {subsLoading ? (
                  <p className="text-center text-muted-foreground py-10">Cargando...</p>
                ) : subscribers.length === 0 ? (
                  <p className="text-center text-muted-foreground py-10">No hay suscriptores aún.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b border-border text-left"><th className="py-2 pr-4">Nombre</th><th className="py-2 pr-4">Email</th><th className="py-2 pr-4">Plan</th><th className="py-2 pr-4">Idioma</th><th className="py-2">Fecha</th></tr></thead>
                      <tbody>
                        {subscribers.map(s => (
                          <tr key={s.id} className="border-b border-border/50">
                            <td className="py-2 pr-4">{s.name}</td>
                            <td className="py-2 pr-4 text-muted-foreground">{s.email}</td>
                            <td className="py-2 pr-4"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.plan === 'pro' ? '' : 'bg-green-500/20 text-green-400'}`} style={s.plan === 'pro' ? { background: 'hsla(45,86%,40%,0.2)', color: 'hsl(45 86% 52%)' } : undefined}>{s.plan || 'free'}</span></td>
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
      </div>
      <Footer lang="es" />
    </PageTransition>
  );
};

export default NewsletterAdminPage;
