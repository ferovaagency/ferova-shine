
-- Add published_at column for scheduling
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS published_at timestamptz NOT NULL DEFAULT now();

-- Enable unaccent for slug generation
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Slug normalization function
CREATE OR REPLACE FUNCTION public.blog_slugify(v text)
RETURNS text
LANGUAGE sql IMMUTABLE
AS $$
  SELECT trim(both '-' from regexp_replace(lower(unaccent(coalesce(v, ''))), '[^a-z0-9]+', '-', 'g'))
$$;

-- Trigger function to auto-set slug
CREATE OR REPLACE FUNCTION public.blog_posts_biu()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.slug := public.blog_slugify(coalesce(nullif(NEW.slug, ''), NEW.title));
  RETURN NEW;
END;
$$;

-- Attach trigger
DROP TRIGGER IF EXISTS trg_blog_posts_biu ON public.blog_posts;
CREATE TRIGGER trg_blog_posts_biu
  BEFORE INSERT OR UPDATE OF title, slug ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.blog_posts_biu();

-- Unique slug constraint
CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_uq ON public.blog_posts(slug);
