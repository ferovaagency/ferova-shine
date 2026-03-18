-- Create blog posts table for admin-generated articles
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  author TEXT NOT NULL DEFAULT 'AnnovaSoft',
  active BOOLEAN NOT NULL DEFAULT true,
  category TEXT,
  keyword TEXT,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Blog posts are publicly readable" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON public.blog_posts;

CREATE POLICY "Blog posts are publicly readable"
ON public.blog_posts
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert blog posts"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog posts"
ON public.blog_posts
FOR DELETE
TO authenticated
USING (true);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_active_created_at ON public.blog_posts (active, created_at DESC);

CREATE OR REPLACE FUNCTION public.set_blog_posts_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER set_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.set_blog_posts_updated_at();