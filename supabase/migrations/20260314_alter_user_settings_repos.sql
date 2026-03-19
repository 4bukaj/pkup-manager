-- Migration to update github_repo to github_repos (TEXT to TEXT[])
ALTER TABLE public.user_settings 
RENAME COLUMN github_repo TO github_repos;

ALTER TABLE public.user_settings 
ALTER COLUMN github_repos TYPE TEXT[] 
USING ARRAY[github_repos];
