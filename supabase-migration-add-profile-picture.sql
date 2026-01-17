-- Migration: Add profile_picture_url to existing profiles table
-- Run this SQL in your Supabase SQL Editor if you already have the profiles table

-- Add profile_picture_url column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'profile_picture_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN profile_picture_url TEXT;
  END IF;
END $$;

-- Create storage bucket for profile pictures (if it doesn't exist)
-- Note: You may need to create this bucket manually in Supabase Dashboard > Storage
-- Bucket name: 'avatars'
-- Public: true
-- File size limit: 5MB
-- Allowed MIME types: image/*
