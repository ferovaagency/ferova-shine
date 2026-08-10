CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO anon, authenticated, service_role;

DROP POLICY IF EXISTS "Admins can view all conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Admins can delete conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Admins can insert conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Admins can update conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Admins can list blog images" ON storage.objects;
DROP POLICY IF EXISTS "admins manage consents" ON public.consents;
DROP POLICY IF EXISTS "admins read all cases" ON public.case_studies;
DROP POLICY IF EXISTS "admins insert cases" ON public.case_studies;
DROP POLICY IF EXISTS "admins update cases" ON public.case_studies;
DROP POLICY IF EXISTS "admins delete cases" ON public.case_studies;

CREATE POLICY "Admins can view all conversations" ON public.ai_conversations FOR SELECT USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete conversations" ON public.ai_conversations FOR DELETE USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can insert conversations" ON public.ai_conversations FOR INSERT WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update conversations" ON public.ai_conversations FOR UPDATE USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can list blog images" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images' AND private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "admins manage consents" ON public.consents FOR ALL USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "admins read all cases" ON public.case_studies FOR SELECT USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "admins insert cases" ON public.case_studies FOR INSERT WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "admins update cases" ON public.case_studies FOR UPDATE USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "admins delete cases" ON public.case_studies FOR DELETE USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);