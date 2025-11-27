'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Portrait, Message } from '@/lib/database.types';

/**
 * Hook to fetch and manage portraits from the database
 */
export function usePortraits() {
  const [portraits, setPortraits] = useState<Portrait[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortraits = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('portraits')
        .select('*')
        .eq('visible', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Type cast since Supabase client has type inference issues
      const typedPortraits = (data || []) as Portrait[];
      setPortraits(typedPortraits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portraits');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortraits();
  }, [fetchPortraits]);

  return { portraits, loading, error, refetch: fetchPortraits };
}

/**
 * Hook for storyteller to manage their own portrait
 */
export function useStorytellerPortrait(accessCode: string) {
  const [portrait, setPortrait] = useState<Portrait | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortrait = useCallback(async () => {
    if (!accessCode) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('portraits')
        .select('*')
        .eq('access_code', accessCode)
        .single();

      if (error) throw error;

      // Type cast since Supabase client has type inference issues
      const typedPortrait = data as Portrait | null;
      setPortrait(typedPortrait);

      // Fetch messages for this portrait
      if (typedPortrait) {
        const { data: messagesData } = await supabase
          .from('messages')
          .select('*')
          .eq('portrait_id', typedPortrait.id)
          .order('created_at', { ascending: false });

        // Type cast messages data
        const typedMessages = (messagesData || []) as Message[];
        setMessages(typedMessages);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Portrait not found');
    } finally {
      setLoading(false);
    }
  }, [accessCode]);

  const toggleVisibility = useCallback(async () => {
    if (!portrait) return;

    try {
      // @ts-expect-error - Client-side Supabase type inference issue
      const { error } = await supabase
        .from('portraits')
        .update({ visible: !portrait.visible })
        .eq('id', portrait.id);

      if (error) throw error;

      setPortrait({ ...portrait, visible: !portrait.visible });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update visibility');
    }
  }, [portrait]);

  const markMessageRead = useCallback(async (messageId: string) => {
    try {
      // @ts-expect-error - Client-side Supabase type inference issue
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId);

      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, read: true } : m))
      );
    } catch (err) {
      console.error('Failed to mark message read:', err);
    }
  }, []);

  useEffect(() => {
    fetchPortrait();
  }, [fetchPortrait]);

  return {
    portrait,
    messages,
    loading,
    error,
    toggleVisibility,
    markMessageRead,
    refetch: fetchPortrait,
  };
}
