import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface RSVPData {
  name: string;
  rsvp: 'yes' | 'no';
  reason?: string;
}

interface RSVPStats {
  confirmed_count: number;
  absent_count: number;
  total_responses: number;
}

export const useRSVP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRSVP = async (data: RSVPData) => {
    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('rsvp_confirmations')
        .insert({
          name: data.name,
          rsvp: data.rsvp,
          reason: data.reason || null,
        });

      if (insertError) throw insertError;

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar confirmação';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getRSVPStats = async (): Promise<RSVPStats | null> => {
    try {
      const { data, error } = await supabase
        .from('rsvp_stats')
        .select('*')
        .single();

      if (error) throw error;

      return data;
    } catch (err) {
      console.error('Erro ao buscar estatísticas:', err);
      return null;
    }
  };

  const getAllRSVPs = async () => {
    try {
      const { data, error } = await supabase
        .from('rsvp_confirmations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data;
    } catch (err) {
      console.error('Erro ao buscar RSVPs:', err);
      return [];
    }
  };

  return {
    submitRSVP,
    getRSVPStats,
    getAllRSVPs,
    loading,
    error,
  };
};
