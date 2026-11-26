import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import "@/styles/admin.css";

interface Props {
  onAuthed: () => void;
}

export default function AdminLogin({ onAuthed }: Props) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) throw result.error;
      if (result.redirected) return;
      onAuthed();
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "No se pudo iniciar sesión con Google",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      onAuthed();
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "No se pudo iniciar sesión",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-world grid place-items-center px-4 py-10">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Acceso · Ferova Admin</title>
      </Helmet>
      <div className="admin-card w-full max-w-md !p-7 sm:!p-10">
        <div className="admin-brand !p-0">
          <strong>Ferova Admin</strong>
          <span>seoparaecommerce.co</span>
        </div>
        <h1 className="mt-7 text-2xl">Entra a tu panel</h1>
        <p className="admin-sub mt-2 leading-relaxed">Usa la cuenta autorizada del CMS editorial.</p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <label className="admin-label" htmlFor="email">
            Correo
            <input
              id="email"
              type="email"
              className="admin-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label className="admin-label" htmlFor="password">
            Contraseña
            <input
              id="password"
              type="password"
              className="admin-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          <button type="submit" className="admin-btn admin-btn--block !min-h-[2.75rem]" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" aria-label="Entrando" /> : "Entrar"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground" aria-hidden="true">
          <span className="h-px flex-1 bg-border" />o<span className="h-px flex-1 bg-border" />
        </div>

        <button type="button" className="admin-btn admin-btn--ghost admin-btn--block !min-h-[2.75rem]" onClick={handleGoogle} disabled={googleLoading}>
          {googleLoading ? (
            <Loader2 className="animate-spin" aria-label="Conectando con Google" />
          ) : (
            <>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.27-4.74 3.27-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51z" />
              </svg>
              Continuar con Google
            </>
          )}
        </button>
      </div>
    </main>
  );
}
