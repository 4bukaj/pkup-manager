-- Set default values for department and supervisor_name
ALTER TABLE public.user_settings
    ALTER COLUMN department SET DEFAULT 'AIOps',
    ALTER COLUMN supervisor_name SET DEFAULT 'Sławomir Nowak';
