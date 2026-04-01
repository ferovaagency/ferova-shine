
-- Move unaccent to extensions schema
ALTER EXTENSION unaccent SET SCHEMA extensions;

-- Fix search_path on blog_slugify
CREATE OR REPLACE FUNCTION public.blog_slugify(v text)
RETURNS text
LANGUAGE sql IMMUTABLE
SET search_path = public, extensions
AS $$
  SELECT trim(both '-' from regexp_replace(lower(extensions.unaccent(coalesce(v, ''))), '[^a-z0-9]+', '-', 'g'))
$$;
