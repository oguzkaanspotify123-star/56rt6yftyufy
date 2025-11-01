import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: 'user' | 'admin';
  created_at: string;
};

export type Account = {
  id: string;
  title: string;
  game: string;
  price: number;
  level: number;
  rank: string | null;
  wins: number;
  rating: number;
  description: string | null;
  image_url: string | null;
  status: 'available' | 'sold' | 'reserved';
  seller_id: string | null;
  created_at: string;
};

export type Purchase = {
  id: string;
  account_id: string;
  buyer_id: string;
  purchase_date: string;
  delivery_status: 'pending' | 'delivered' | 'completed';
  account_details: Record<string, unknown> | null;
};

export type Message = {
  id: string;
  sender_id: string;
  recipient_id: string;
  purchase_id: string | null;
  content: string;
  read: boolean;
  created_at: string;
};
