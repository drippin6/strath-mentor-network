-- Create mentors table
CREATE TABLE IF NOT EXISTS public.mentors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    expertise TEXT NOT NULL,
    company TEXT,
    role TEXT,
    years_of_experience INTEGER,
    linkedin_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to read mentors (publicly visible list)
CREATE POLICY "Mentors are viewable by everyone" 
ON public.mentors FOR SELECT 
USING (true);

-- Allow authenticated users to insert their own mentor profile
CREATE POLICY "Users can register as mentors" 
ON public.mentors FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own mentor profile" 
ON public.mentors FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS mentors_user_id_idx ON public.mentors(user_id);
CREATE INDEX IF NOT EXISTS mentors_expertise_idx ON public.mentors(expertise);