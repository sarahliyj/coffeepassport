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
-- DONE! Your database is now set up.
-- ============================================
