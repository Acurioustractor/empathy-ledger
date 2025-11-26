'use client';

import { useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { triggerVibration, VibrationEvent } from '@/lib/vibration';
import type { PulseEvent } from '@/lib/database.types';

interface UsRealtimePulseOptions {
  portraitId?: string;
  storytellerId?: string;
  onPulse?: (event: PulseEvent) => void;
  enableVibration?: boolean;
}

/**
 * Hook to subscribe to real-time pulse events
 * Used by storytellers to receive notifications when their portrait is viewed
 */
export function useRealtimePulse({
  portraitId,
  storytellerId,
  onPulse,
  enableVibration = true,
}: UsRealtimePulseOptions) {
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const handlePulseEvent = useCallback(
    (payload: { new: PulseEvent }) => {
      const event = payload.new;

      // Trigger vibration based on event type
      if (enableVibration) {
        const vibrationMap: Record<string, VibrationEvent> = {
          view: 'view',
          hover: 'hover',
          click: 'click',
          message: 'message',
        };
        const vibrationEvent = vibrationMap[event.event_type];
        if (vibrationEvent) {
          triggerVibration(vibrationEvent);
        }
      }

      // Call custom handler
      if (onPulse) {
        onPulse(event);
      }
    },
    [enableVibration, onPulse]
  );

  useEffect(() => {
    if (!portraitId && !storytellerId) return;

    // Create a unique channel name
    const channelName = portraitId
      ? `pulse-portrait-${portraitId}`
      : `pulse-storyteller-${storytellerId}`;

    // Subscribe to pulse events
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'pulse_events',
          filter: portraitId ? `portrait_id=eq.${portraitId}` : undefined,
        },
        handlePulseEvent
      )
      .subscribe((status) => {
        console.log(`[Pulse] Subscription status: ${status}`);
      });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [portraitId, storytellerId, handlePulseEvent]);

  return {
    isConnected: channelRef.current !== null,
  };
}
