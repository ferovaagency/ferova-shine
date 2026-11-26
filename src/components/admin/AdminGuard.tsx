import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLogin from "./AdminLogin";
import { Loader2 } from "lucide-react";
import { caseCms } from "@/integrations/supabase/cms-types";
import "@/styles/admin.css";

interface Props {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: Props) {
  const [status, setStatus] = useState<"loading" | "unauth" | "forbidden" | "ok">("loading");

  const check = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      setStatus("unauth");
      return;
    }
    const [{ data: legacyRoles }, { data: cmsRoles }] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", session.user.id),
      caseCms.from("cms_user_roles").select("role").eq("user_id", session.user.id),
    ]);
    if (legacyRoles?.some((r) => r.role === "admin") || cmsRoles?.some((r) => ["owner", "editor", "reviewer"].includes(r.role))) {
      setStatus("ok");
    } else {
      setStatus("forbidden");
    }
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      check();
    });
    check();
    return () => sub.subscription.unsubscribe();
  }, []);

  if (status === "loading") {
    return (
      <main className="admin-world grid place-items-center text-muted-foreground" aria-busy="true">
        <span className="inline-flex items-center gap-2 text-sm"><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Verificando acceso…</span>
      </main>
    );
  }

  if (status === "unauth") {
    return <AdminLogin onAuthed={check} />;
  }

  if (status === "forbidden") {
    return (
      <main className="admin-world grid place-items-center px-4 py-10">
        <div className="admin-card w-full max-w-md text-center !p-8">
          <h1 className="text-2xl">Acceso restringido</h1>
          <p className="admin-sub mt-3 leading-relaxed">
            Tu cuenta no tiene permisos de administración editorial. Contacta al propietario del sitio si crees que es un error.
          </p>
          <button
            type="button"
            className="admin-btn admin-btn--ghost mt-6"
            onClick={async () => {
              await supabase.auth.signOut();
              check();
            }}
          >
            Cerrar sesión y usar otra cuenta
          </button>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
