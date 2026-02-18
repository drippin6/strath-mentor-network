import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './constants';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface MentorData {
  user_id?: string;
  full_name: string;
  email: string;
  expertise: string;
  company?: string;
  role?: string;
  years_of_experience?: number;
  linkedin_url?: string;
  bio?: string;
}

export const registerMentor = async (mentorData: MentorData) => {
  const { data, error } = await supabase
    .from('mentors')
    .insert([mentorData])
    .select()
    .single();

  if (error) {
    console.error('Error registering mentor:', error);
    throw error;
  }

  return data;
};