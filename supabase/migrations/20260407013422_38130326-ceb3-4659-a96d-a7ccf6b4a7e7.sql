
CREATE TABLE public.newsletter_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  plan text DEFAULT 'free',
  lang text DEFAULT 'es',
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_insert" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "public_read" ON public.newsletter_subscribers
  FOR SELECT USING (true);

CREATE TABLE public.newsletter_editions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  edition_number integer UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subject_line text,
  topics text[],
  plan text DEFAULT 'free',
  reading_time integer DEFAULT 5,
  free_content jsonb,
  pro_content jsonb,
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.newsletter_editions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_editions" ON public.newsletter_editions
  FOR SELECT USING (published = true);

CREATE POLICY "public_insert_editions" ON public.newsletter_editions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "public_update_editions" ON public.newsletter_editions
  FOR UPDATE USING (true);

CREATE POLICY "public_delete_editions" ON public.newsletter_editions
  FOR DELETE USING (true);
