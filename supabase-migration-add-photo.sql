-- Migration: Add photo support to coffee entries
-- Run this SQL in your Supabase SQL Editor

-- Add photo_url column to coffee_entries table
ALTER TABLE coffee_entries ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Create storage bucket for coffee photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('coffee-photos', 'coffee-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: Allow authenticated users to upload photos
CREATE POLICY "Users can upload coffee photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'coffee-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Storage policy: Allow users to view their own photos
CREATE POLICY "Users can view own coffee photos"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'coffee-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Storage policy: Allow public read access to coffee photos
CREATE POLICY "Public can view coffee photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'coffee-photos');

-- Storage policy: Allow users to delete their own photos
CREATE POLICY "Users can delete own coffee photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'coffee-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
