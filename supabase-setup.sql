-- Coffee Bean Passport - Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Create profiles table (linked to auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  profile_picture_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coffee_entries table
CREATE TABLE coffee_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  origin_country TEXT NOT NULL,
  roast_level TEXT,
  brew_method TEXT,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_coffee_entries_user_id ON coffee_entries(user_id);
CREATE INDEX idx_coffee_entries_created_at ON coffee_entries(created_at DESC);

-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE coffee_entries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for coffee_entries
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
