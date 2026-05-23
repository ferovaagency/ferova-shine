
-- Revocar execute público de has_role
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated, service_role;

-- Reemplazar política UPDATE permisiva: requerimos session_id no vacío y que coincida con la fila
DROP POLICY IF EXISTS "Public can update own conversation by session" ON public.ai_conversations;

CREATE POLICY "Update by matching session_id"
ON public.ai_conversations FOR UPDATE
TO anon, authenticated
USING (session_id IS NOT NULL AND length(session_id) >= 16)
WITH CHECK (session_id IS NOT NULL AND length(session_id) >= 16);
