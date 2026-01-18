-- Coffee Bean Passport - Complete Supabase Setup
-- Run this entire SQL in your Supabase SQL Editor
-- This script is idempotent - safe to run multiple times

-- ============================================
-- 1. CREATE TABLES
-- ============================================

-- Create profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  profile_picture_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coffee_entries table
CREATE TABLE IF NOT EXISTS coffee_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  origin_country TEXT NOT NULL,
  roast_level TEXT,
  brew_method TEXT,
  note TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_coffee_entries_user_id ON coffee_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_coffee_entries_created_at ON coffee_entries(created_at DESC);

-- ============================================
-- 2. AUTO-CREATE PROFILE TRIGGER
-- ============================================

-- Function to auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 3. ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE coffee_entries ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. RLS POLICIES FOR PROFILES
-- ============================================

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- 5. RLS POLICIES FOR COFFEE_ENTRIES
-- ============================================

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own coffee entries" ON coffee_entries;
DROP POLICY IF EXISTS "Users can insert own coffee entries" ON coffee_entries;
DROP POLICY IF EXISTS "Users can update own coffee entries" ON coffee_entries;
DROP POLICY IF EXISTS "Users can delete own coffee entries" ON coffee_entries;

-- Create policies
CREATE POLICY "Users can view own coffee entries"
  ON coffee_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own coffee entries"
  ON coffee_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own coffee entries"
  ON coffee_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own coffee entries"
  ON coffee_entries FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 6. STORAGE BUCKETS
-- ============================================

-- Create coffee-photos bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'coffee-photos',
  'coffee-photos',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

-- Create avatars bucket for profile pictures
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

-- ============================================
-- 7. STORAGE POLICIES FOR COFFEE-PHOTOS
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can upload coffee photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can view own coffee photos" ON storage.objects;
DROP POLICY IF EXISTS "Public can view coffee photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own coffee photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view coffee photos" ON storage.objects;

-- Allow authenticated users to upload to coffee-photos
CREATE POLICY "Authenticated users can upload coffee photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'coffee-photos');

-- Allow anyone to view coffee photos (public bucket)
CREATE POLICY "Anyone can view coffee photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'coffee-photos');

-- Allow users to update their own photos
CREATE POLICY "Users can update own coffee photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'coffee-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow users to delete their own photos
CREATE POLICY "Users can delete own coffee photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'coffee-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

-- ============================================
-- 8. STORAGE POLICIES FOR AVATARS
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own avatar" ON storage.objects;

-- Allow authenticated users to upload avatars
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- Allow anyone to view avatars (public bucket)
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Allow users to update their own avatar
CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = 'profile-pictures');

-- Allow users to delete their own avatar
CREATE POLICY "Users can delete own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = 'profile-pictures');

-- ============================================
-- DONE! Your database is now set up.
-- ============================================
