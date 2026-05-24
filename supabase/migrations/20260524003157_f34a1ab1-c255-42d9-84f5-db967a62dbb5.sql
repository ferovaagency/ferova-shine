
-- 1) Fix overly-permissive RLS on ai_conversations (unused from app; lock to admins)
DROP POLICY IF EXISTS "Public can insert conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Update by matching session_id" ON public.ai_conversations;

CREATE POLICY "Admins can insert conversations"
  ON public.ai_conversations FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update conversations"
  ON public.ai_conversations FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 2) Tighten newsletter_subscribers public_insert to validate input (no more WITH CHECK true)
DROP POLICY IF EXISTS public_insert ON public.newsletter_subscribers;
CREATE POLICY public_insert
  ON public.newsletter_subscribers FOR INSERT TO public
  WITH CHECK (
    email IS NOT NULL
    AND length(email) BETWEEN 5 AND 254
    AND email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]{2,}$'
    AND name IS NOT NULL
    AND length(name) BETWEEN 1 AND 120
    AND (plan IS NULL OR plan IN ('free','pro'))
    AND (lang IS NULL OR lang IN ('es','en','pt'))
  );

-- 3) Restrict blog-images storage writes to admins; drop broad listing SELECT policy
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog images" ON storage.objects;
DROP POLICY IF EXISTS "Blog images are publicly readable" ON storage.objects;

CREATE POLICY "Admins can upload blog images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update blog images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete blog images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can list blog images"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'::app_role));
-- Public access to image files continues via /storage/v1/object/public/blog-images/* (bucket is public)

-- 4) Make newsletter_editions_public view use SECURITY INVOKER (fixes security_definer_view)
ALTER VIEW public.newsletter_editions_public SET (security_invoker = true);
GRANT SELECT ON public.newsletter_editions_public TO anon, authenticated;

-- 5) Revoke EXECUTE on SECURITY DEFINER helper from client roles (still callable by RLS engine)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
