import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { caseCms, type CmsCaseStudy, type ContentStatus } from "@/integrations/supabase/cms-types";

type FormState = Pick<CmsCaseStudy, "slug" | "client_public_name" | "sector" | "country" | "summary" | "challenge" | "diagnosis" | "intervention" | "learnings" | "limitations" | "service_keys" | "started_at" | "last_observation_at">;

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
            <h2 className="font-semibold">Antes de publicar</h2>
            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
              <li>○ Consentimiento vigente del cliente</li>
              <li>○ Métricas con línea base y fuente</li>
              <li>○ Evidencia vinculada y revisada</li>
              <li>○ Aprobación de Reviewer u Owner</li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">Estos módulos se habilitan después de crear el caso base.</p>
          </section>
        </aside>
      </form>
    </AdminLayout>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-foreground">{label}{hint && <span className="ml-2 text-xs font-normal text-muted-foreground">{hint}</span>}{children}</label>;
}
