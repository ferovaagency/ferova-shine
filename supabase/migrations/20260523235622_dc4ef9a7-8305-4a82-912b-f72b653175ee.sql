-- Drop public SELECT policy on base table
DROP POLICY IF EXISTS "public_read_editions" ON public.newsletter_editions;

-- Add admin-only SELECT policy
CREATE POLICY "admins_read_editions"
  ON public.newsletter_editions
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create public view that excludes pro_content
DROP VIEW IF EXISTS public.newsletter_editions_public;
CREATE VIEW public.newsletter_editions_public AS
  SELECT
    id,
    edition_number,
    slug,
    title,
    subject_line,
    topics,
    plan,
    reading_time,
    published_at,
    created_at,
    free_content,
    published
  FROM public.newsletter_editions
  WHERE published = true;

GRANT SELECT ON public.newsletter_editions_public TO anon, authenticated;