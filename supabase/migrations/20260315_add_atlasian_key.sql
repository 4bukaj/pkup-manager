-- Migration to add atlasian_key column to user_settings table
ALTER TABLE public.user_settings 
ADD COLUMN IF NOT EXISTS atlasian_key TEXT;
