-- ReplyAI Database Schema

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  monthly_reply_count INT DEFAULT 0,
  reply_count_reset_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Replies table
CREATE TABLE IF NOT EXISTS replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  review_text TEXT NOT NULL,
  reply_text TEXT NOT NULL,
  tone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admin can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- Replies policies
CREATE POLICY "Users can read own replies"
  ON replies FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own replies"
  ON replies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own replies"
  ON replies FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS replies_user_id_idx ON replies(user_id);
CREATE INDEX IF NOT EXISTS replies_created_at_idx ON replies(created_at DESC);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, monthly_reply_count)
  VALUES (NEW.id, NEW.email, 0);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
