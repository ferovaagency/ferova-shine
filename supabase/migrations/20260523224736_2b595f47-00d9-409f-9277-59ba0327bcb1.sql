
-- Newsletter editions: replace permissive write policies with admin-only
DROP POLICY IF EXISTS "public_insert_editions" ON public.newsletter_editions;
DROP POLICY IF EXISTS "public_update_editions" ON public.newsletter_editions;
DROP POLICY IF EXISTS "public_delete_editions" ON public.newsletter_editions;

CREATE POLICY "admins_insert_editions" ON public.newsletter_editions
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins_update_editions" ON public.newsletter_editions
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins_delete_editions" ON public.newsletter_editions
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Newsletter subscribers: restrict reads to admins only
DROP POLICY IF EXISTS "public_read" ON public.newsletter_subscribers;

CREATE POLICY "admins_read_subscribers" ON public.newsletter_subscribers
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Blog posts: restrict writes to admins only
DROP POLICY IF EXISTS "Authenticated users can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON public.blog_posts;

CREATE POLICY "admins_insert_blog" ON public.blog_posts
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins_update_blog" ON public.blog_posts
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins_delete_blog" ON public.blog_posts
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
