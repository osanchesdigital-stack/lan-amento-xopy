import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltam as variáveis de ambiente do Supabase. Verifique o arquivo .env.local'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos do banco de dados
export interface Database {
  public: {
    Tables: {
      rsvp_confirmations: {
        Row: {
          id: string;
          name: string;
          rsvp: 'yes' | 'no';
          reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          rsvp: 'yes' | 'no';
          reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          rsvp?: 'yes' | 'no';
          reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      rsvp_stats: {
        Row: {
          confirmed_count: number;
          absent_count: number;
          total_responses: number;
        };
      };
    };
    Functions: {
      get_confirmed_participants: {
        Args: Record<string, never>;
        Returns: Array<{
          id: string;
          name: string;
          created_at: string;
        }>;
      };
      get_absent_participants: {
        Args: Record<string, never>;
        Returns: Array<{
          id: string;
          name: string;
          reason: string | null;
          created_at: string;
        }>;
      };
    };
  };
}

// Tipos auxiliares para facilitar o uso
export type RsvpConfirmation = Database['public']['Tables']['rsvp_confirmations']['Row'];
export type RsvpInsert = Database['public']['Tables']['rsvp_confirmations']['Insert'];
export type RsvpStats = Database['public']['Views']['rsvp_stats']['Row'];
