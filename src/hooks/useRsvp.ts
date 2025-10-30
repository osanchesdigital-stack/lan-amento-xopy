import { useState, useEffect } from 'react';
import { supabase, type RsvpConfirmation, type RsvpStats } from '../lib/supabase';

export function useRsvp() {
  const [confirmations, setConfirmations] = useState<RsvpConfirmation[]>([]);
  const [stats, setStats] = useState<RsvpStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar todas as confirmações
  const fetchConfirmations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('rsvp_confirmations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConfirmations(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar confirmações');
    } finally {
      setLoading(false);
    }
  };

  // Buscar estatísticas
  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('rsvp_stats')
        .select('*')
        .single();

      if (error) throw error;
      setStats(data);
    } catch (err) {
      console.error('Erro ao buscar estatísticas:', err);
    }
  };

  // Criar nova confirmação
  const createConfirmation = async (name: string, rsvp: 'yes' | 'no', reason?: string) => {
    try {
      const { data, error } = await supabase
        .from('rsvp_confirmations')
        .insert([{ name, rsvp, reason: reason || null }])
        .select()
        .single();

      if (error) throw error;
      
      // Atualizar lista local
      await fetchConfirmations();
      await fetchStats();
      
      return { success: true, data };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar confirmação';
      setError(message);
      return { success: false, error: message };
    }
  };

  // Buscar confirmados
  const getConfirmed = () => confirmations.filter(c => c.rsvp === 'yes');

  // Buscar ausentes
  const getAbsent = () => confirmations.filter(c => c.rsvp === 'no');

  // Carregar dados iniciais
  useEffect(() => {
    fetchConfirmations();
    fetchStats();
  }, []);

  return {
    confirmations,
    stats,
    loading,
    error,
    createConfirmation,
    getConfirmed,
    getAbsent,
    refresh: () => {
      fetchConfirmations();
      fetchStats();
    },
  };
}
