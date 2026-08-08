import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2, Save, Send } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { caseCms, type CaseResultHighlight, type CmsCaseStudy, type ContentStatus } from "@/integrations/supabase/cms-types";

type FormState = Pick<CmsCaseStudy, "slug" | "client_public_name" | "sector" | "country" | "summary" | "challenge" | "diagnosis" | "intervention" | "learnings" | "limitations" | "service_keys" | "result_highlights" | "started_at" | "last_observation_at">;

const EMPTY_FORM: FormState = {
  slug: "",
  client_public_name: "",
  sector: "",
  country: "Colombia",
  summary: "",
  challenge: "",
  diagnosis: "",
  intervention: "",
  learnings: "",
  limitations: "",
  service_keys: [],
  result_highlights: [],
  started_at: null,
  last_observation_at: null,
};

const fieldClass = "mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold/60";

export default function AdminCaseEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<ContentStatus>("draft");
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [migrationPending, setMigrationPending] = useState(false);
  const [consentName, setConsentName] = useState("");
  const [consentConfirmed, setConsentConfirmed] = useState(false);

  useEffect(() => {
    if (!id) return;
    let active = true;
    const load = async () => {
      const { data, error } = await caseCms.from("case_studies").select("*").eq("id", id).single();
      if (!active) return;
      if (error || !data) {
        setMigrationPending(true);
      } else {
        setForm({
          slug: data.slug,
          client_public_name: data.client_public_name,
          sector: data.sector,
          country: data.country,
          summary: data.summary,
          challenge: data.challenge,
          diagnosis: data.diagnosis,
          intervention: data.intervention,
          learnings: data.learnings,
          limitations: data.limitations,
          service_keys: data.service_keys,
          result_highlights: data.result_highlights ?? [],
          started_at: data.started_at,
          last_observation_at: data.last_observation_at,
        });
        setStatus(data.status);
      }
      setLoading(false);
    };
    void load();
    return () => { active = false; };
  }, [id]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((current) => ({ ...current, [key]: value }));

  const save = async (nextStatus: "draft" | "in_review") => {
    if (!form.slug.trim() || !form.sector.trim() || !form.summary.trim()) {
      toast.error("Completa slug, sector y resumen antes de guardar.");
      return;
    }
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      toast.error("Tu sesión expiró. Inicia sesión de nuevo.");
      setSaving(false);
      return;
    }

    const payload = {
      ...form,
      slug: form.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      client_public_name: form.client_public_name?.trim() || null,
      country: form.country?.trim() || null,
      limitations: form.limitations?.trim() || null,
      service_keys: form.service_keys.map((key) => key.trim()).filter(Boolean),
      status: nextStatus,
      owner_id: session.user.id,
    };

    const result = id
      ? await caseCms.from("case_studies").update(payload).eq("id", id).select("id").single()
      : await caseCms.from("case_studies").insert(payload).select("id").single();

    if (result.error) {
      const missingTable = result.error.code === "42P01" || result.error.code === "PGRST205";
      setMigrationPending(missingTable);
      toast.error(missingTable ? "El CMS aún no está activado en la base de datos." : result.error.message);
    } else {
      toast.success(nextStatus === "in_review" ? "Caso enviado a revisión." : "Borrador guardado.");
      navigate(`/admin/casos/${result.data.id}/editar`, { replace: !id });
      setStatus(nextStatus);
    }
    setSaving(false);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void save("draft");
  };

  const publish = async () => {
    if (!id) { toast.error("Guarda primero el caso para poder publicarlo."); return; }
    if (!consentName.trim() || !consentConfirmed) { toast.error("Confirma el consentimiento y registra quién autorizó la publicación."); return; }
    if (form.result_highlights.length === 0) { toast.error("Agrega al menos un resultado verificable."); return; }
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) { toast.error("Tu sesión expiró."); setSaving(false); return; }
    const { data: consent, error: consentError } = await caseCms.from("consents").insert({
      client_or_representative: consentName.trim(), publication_scope: "Publicación del caso de éxito y sus resultados en seoparaecommerce.co", permitted_data: ["identidad autorizada", "narrativa", "resultados destacados"], granted_at: new Date().toISOString().slice(0, 10), created_by: session.user.id,
    }).select("id").single();
    if (consentError || !consent) { toast.error(consentError?.message || "No fue posible registrar el consentimiento."); setSaving(false); return; }
    const approval = await caseCms.from("case_studies").update({ ...form, status: "approved", consent_id: consent.id, approved_by: session.user.id, approved_at: new Date().toISOString(), owner_id: session.user.id }).eq("id", id);
    if (approval.error) { toast.error(approval.error.message); setSaving(false); return; }
    const publication = await caseCms.from("case_studies").update({ status: "published", published_at: new Date().toISOString(), consent_id: consent.id, approved_by: session.user.id, approved_at: new Date().toISOString() }).eq("id", id);
    if (publication.error) toast.error(publication.error.message); else { setStatus("published"); toast.success("Caso y resultados publicados."); }
    setSaving(false);
  };

  if (loading) return <AdminLayout title="Caso de éxito"><div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin" /></div></AdminLayout>;

  return (
    <AdminLayout title={id ? "Editar caso" : "Nuevo caso"}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link to="/admin/casos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Volver a casos</Link>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Estado: {status.replace("_", " ")}</span>
      </div>

      {migrationPending && <div className="glass-card mb-6 flex items-start gap-3 border border-amber-500/30 p-4 text-sm"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" /><p>La interfaz está lista, pero la migración del CMS debe aplicarse antes de guardar este caso.</p></div>}

      <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="glass-card p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold">Identidad y contexto</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Slug *"><input className={fieldClass} value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="seo-ecommerce-marca" /></Field>
              <Field label="Cliente público"><input className={fieldClass} value={form.client_public_name ?? ""} onChange={(e) => update("client_public_name", e.target.value)} placeholder="Déjalo vacío si es confidencial" /></Field>
              <Field label="Sector *"><input className={fieldClass} value={form.sector} onChange={(e) => update("sector", e.target.value)} /></Field>
              <Field label="País"><input className={fieldClass} value={form.country ?? ""} onChange={(e) => update("country", e.target.value)} /></Field>
              <Field label="Servicios" hint="Separados por comas"><input className={fieldClass} value={form.service_keys.join(", ")} onChange={(e) => update("service_keys", e.target.value.split(","))} placeholder="seo-ecommerce, auditoria-tecnica" /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Inicio"><input type="date" className={fieldClass} value={form.started_at ?? ""} onChange={(e) => update("started_at", e.target.value || null)} /></Field>
                <Field label="Última medición"><input type="date" className={fieldClass} value={form.last_observation_at ?? ""} onChange={(e) => update("last_observation_at", e.target.value || null)} /></Field>
              </div>
            </div>
          </section>

          <section className="glass-card space-y-5 p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold">Narrativa verificable</h2>
            <Field label="Resumen *"><textarea rows={3} className={fieldClass} value={form.summary} onChange={(e) => update("summary", e.target.value)} /></Field>
            <Field label="Reto"><textarea rows={4} className={fieldClass} value={form.challenge} onChange={(e) => update("challenge", e.target.value)} /></Field>
            <Field label="Diagnóstico"><textarea rows={4} className={fieldClass} value={form.diagnosis} onChange={(e) => update("diagnosis", e.target.value)} /></Field>
            <Field label="Intervención"><textarea rows={5} className={fieldClass} value={form.intervention} onChange={(e) => update("intervention", e.target.value)} /></Field>
            <Field label="Aprendizajes"><textarea rows={4} className={fieldClass} value={form.learnings} onChange={(e) => update("learnings", e.target.value)} /></Field>
            <Field label="Limitaciones"><textarea rows={3} className={fieldClass} value={form.limitations ?? ""} onChange={(e) => update("limitations", e.target.value)} placeholder="Aclara atribución, periodos incompletos o factores externos." /></Field>
          </section>

          <section className="glass-card p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold">Resultados publicados</h2>
            <p className="mt-2 text-sm text-muted-foreground">Un resultado por línea, en formato: indicador | valor | contexto.</p>
            <textarea rows={7} className={`${fieldClass} font-mono`} value={form.result_highlights.map((item) => `${item.label} | ${item.value} | ${item.context ?? ""}`).join("\n")} onChange={(e) => update("result_highlights", e.target.value.split("\n").filter(Boolean).map((line): CaseResultHighlight => { const [label = "", value = "", context = ""] = line.split("|").map((part) => part.trim()); return { label, value, context }; }).filter((item) => item.label && item.value))} placeholder="Tráfico orgánico | +48 % | Comparación interanual\nErrores críticos | 0 | Tras la migración" />
          </section>
        </div>

        <aside className="space-y-5">
          <section className="glass-card p-5">
            <h2 className="font-semibold">Flujo editorial</h2>
            <p className="mt-2 text-sm text-muted-foreground">Guardar no publica. El caso necesita consentimiento válido, evidencia y aprobación.</p>
            <div className="mt-5 space-y-2">
              <button type="submit" disabled={saving || migrationPending} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent disabled:opacity-50"><Save className="h-4 w-4" /> Guardar borrador</button>
              <button type="button" disabled={saving || migrationPending} onClick={() => void save("in_review")} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />} Enviar a revisión</button>
            </div>
          </section>
          <section className="glass-card p-5">
            <h2 className="font-semibold">Consentimiento y publicación</h2>
            <Field label="Persona que autoriza"><input className={fieldClass} value={consentName} onChange={(e) => setConsentName(e.target.value)} placeholder="Nombre del cliente o representante" /></Field>
            <label className="mt-4 flex items-start gap-3 text-sm text-muted-foreground"><input type="checkbox" className="mt-1" checked={consentConfirmed} onChange={(e) => setConsentConfirmed(e.target.checked)} /><span>Confirmo que existe autorización para publicar la narrativa y los resultados incluidos.</span></label>
            <button type="button" disabled={saving || migrationPending || !id || status === "published"} onClick={() => void publish()} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"><Send className="h-4 w-4" /> {status === "published" ? "Publicado" : "Aprobar y publicar"}</button>
          </section>
        </aside>
      </form>
    </AdminLayout>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-foreground">{label}{hint && <span className="ml-2 text-xs font-normal text-muted-foreground">{hint}</span>}{children}</label>;
}
