-- Create reports table to store generated PKUP report metadata
CREATE TABLE public.reports (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name          TEXT        NOT NULL, -- e.g. "March 2026"
  report_period TEXT        NOT NULL, -- e.g. "2026-02-19 - 2026-03-18"
  storage_path  TEXT        NOT NULL, -- path inside the "reports" storage bucket
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reports"
  ON public.reports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reports"
  ON public.reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- NOTE: also create a private Supabase Storage bucket named "reports"
-- via the Supabase dashboard or: supabase storage create reports
