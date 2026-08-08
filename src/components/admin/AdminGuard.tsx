import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLogin from "./AdminLogin";
import { Loader2 } from "lucide-react";
import { caseCms } from "@/integrations/supabase/cms-types";

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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (status === "unauth") {
    return <AdminLogin onAuthed={check} />;
  }

  if (status === "forbidden") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-semibold">Acceso restringido</h1>
        <p className="text-muted-foreground max-w-md">
          Tu cuenta no tiene permisos de administración editorial. Contacta al propietario del sitio si crees que es un error.
        </p>
        <button
          className="text-sm underline text-muted-foreground"
          onClick={async () => {
            await supabase.auth.signOut();
            check();
          }}
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
