'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MysticalBackground } from '@/components';
import { useRealtimePulse } from '@/hooks/useRealtimePulse';
import { supabase } from '@/lib/supabase';
import { triggerVibration } from '@/lib/vibration';
import type { Portrait, Message, PulseEvent } from '@/lib/database.types';

function DashboardContent() {
  const searchParams = useSearchParams();
  const accessCode = searchParams.get('code') || '';

  const [portrait, setPortrait] = useState<Portrait | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isToggling, setIsToggling] = useState(false);
  const [recentPulses, setRecentPulses] = useState<PulseEvent[]>([]);
  const [codeInput, setCodeInput] = useState('');
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  // Fetch portrait by access code
  const fetchPortrait = useCallback(async () => {
    if (!accessCode) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('portraits')
        .select('*')
        .eq('access_code', accessCode)
        .single();

      if (fetchError || !data) throw new Error('Portrait not found');

      // Type cast needed due to Supabase type inference limitations
      const portrait = data as Portrait;
      setPortrait(portrait);

      // Fetch messages for this portrait
      const { data: messagesData } = await supabase
        .from('messages')
        .select('*')
        .eq('portrait_id', portrait.id)
        .order('created_at', { ascending: false });

      setMessages(messagesData || []);
    } catch (err) {
      setError('Portrait not found. Check your access code.');
    } finally {
      setLoading(false);
    }
  }, [accessCode]);

  useEffect(() => {
    fetchPortrait();
  }, [fetchPortrait]);

  // Real-time pulse subscription
  const handlePulse = useCallback((event: PulseEvent) => {
    setRecentPulses((prev) => [...prev.slice(-10), event]);

    // Trigger vibration based on event type
    if (vibrationEnabled) {
      if (event.event_type === 'message') {
        triggerVibration('message');
      } else if (event.event_type === 'click') {
        triggerVibration('click');
      } else {
        triggerVibration('hover');
      }
    }

    // If it's a message, refresh messages
    if (event.event_type === 'message') {
      fetchPortrait();
    }
  }, [vibrationEnabled, fetchPortrait]);

  useRealtimePulse({
    portraitId: portrait?.id,
    onPulse: handlePulse,
    enableVibration: vibrationEnabled,
  });

  // Toggle visibility
  const handleToggleVisibility = async () => {
    if (!portrait) return;

    setIsToggling(true);
    try {
      const { error: updateError } = await (supabase as any)
        .from('portraits')
        .update({ visible: !portrait.visible })
        .eq('id', portrait.id);

      if (updateError) throw updateError;

      setPortrait({ ...portrait, visible: !portrait.visible });
      triggerVibration(portrait.visible ? 'withdrawn' : 'visible');
    } catch (err) {
      console.error('Failed to update visibility:', err);
    } finally {
      setIsToggling(false);
    }
  };

  // Mark message as read
  const handleMarkRead = async (messageId: string) => {
    await (supabase as any).from('messages').update({ read: true }).eq('id', messageId);
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, read: true } : m))
    );
  };

  // Access code entry screen
  if (!accessCode) {
    return (
      <main className="min-h-screen bg-void-deep relative overflow-hidden">
        <MysticalBackground particleCount={40} speed={0.2} />

        <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
          <div className="max-w-md w-full text-center animate-fade-in-up">
            <h1 className="text-2xl text-text-primary font-serif mb-4">
              storyteller portal
            </h1>
            <p className="text-text-muted text-sm font-serif mb-8">
              enter your access code to view your story
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (codeInput.trim()) {
                  window.location.href = `/dashboard?code=${codeInput.trim()}`;
                }
              }}
              className="space-y-4"
            >
              <input
                type="text"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="access code"
                className="w-full bg-transparent border-0 border-b border-text-faint text-text-primary text-center py-4 text-lg font-serif outline-none transition-colors focus:border-accent"
              />
              <button
                type="submit"
                disabled={!codeInput.trim()}
                className="px-8 py-3 text-sm font-serif transition-all disabled:opacity-50"
                style={{
                  color: codeInput.trim() ? '#e8c47c' : '#4a4540',
                }}
              >
                enter
              </button>
            </form>

            <Link
              href="/"
              className="inline-block mt-12 text-text-faint text-xs font-serif hover:text-text-muted transition-colors"
            >
              ← return to the ledger
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-void-deep flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-3 h-3 rounded-full bg-accent mx-auto mb-4 animate-breathe" />
          <p className="text-text-muted text-sm font-serif">finding your story...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !portrait) {
    return (
      <main className="min-h-screen bg-void-deep relative overflow-hidden">
        <MysticalBackground particleCount={40} speed={0.2} />

        <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
          <div className="text-center animate-fade-in">
            <p className="text-text-muted text-sm font-serif mb-6">
              {error || 'Story not found'}
            </p>
            <Link
              href="/dashboard"
              className="text-accent text-sm font-serif hover:opacity-80 transition-opacity"
            >
              try another code
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <main className="min-h-screen bg-void-deep relative overflow-hidden">
      <MysticalBackground particleCount={40} speed={0.2} />

      <div className="relative z-10 px-8 py-12">
        {/* Header */}
        <header className="max-w-2xl mx-auto mb-12">
          <Link
            href="/"
            className="text-text-faint text-xs font-serif hover:text-text-muted transition-colors"
          >
            ← return to the ledger
          </Link>
          <h1 className="text-xl text-text-primary font-serif mt-6 mb-2">
            your sacred story
          </h1>
          <p className="text-text-muted text-sm font-serif">
            access code: <span className="text-text-faint">{accessCode}</span>
          </p>
        </header>

        {/* Main content */}
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-xl p-8 animate-fade-in-up"
            style={{
              background: 'linear-gradient(145deg, #12100e 0%, #0a0908 100%)',
              border: '1px solid rgba(232, 196, 124, 0.1)',
            }}
          >
            {/* Portrait and stats */}
            <div className="flex gap-8 mb-8">
              {/* Portrait preview */}
              <div
                className="w-32 flex-shrink-0 rounded"
                style={{
                  background: 'linear-gradient(145deg, #1a1816 0%, #0d0c0a 100%)',
                  padding: '6px 6px 20px 6px',
                  border: '1px solid rgba(232, 196, 124, 0.1)',
                  opacity: isToggling ? 0.3 : 1,
                  transition: 'opacity 0.8s ease',
                }}
              >
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-void-deep">
                  <Image
                    src={portrait.image_url}
                    alt=""
                    fill
                    className="object-cover"
                    style={{
                      filter: portrait.visible ? 'none' : 'grayscale(0.6) brightness(0.6)',
                      transition: 'filter 0.5s ease',
                    }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted font-serif">witnessed</span>
                  <span className="text-text-primary font-serif">{portrait.views}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted font-serif">held</span>
                  <span className="text-text-primary font-serif">{portrait.clicks}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted font-serif">words received</span>
                  <span className="text-text-primary font-serif">
                    {messages.length}
                    {unreadCount > 0 && (
                      <span className="text-accent ml-2">({unreadCount} new)</span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            {messages.length > 0 && (
              <div className="mb-8">
                <p className="text-text-faint text-xs uppercase tracking-wider mb-4">
                  words carried to you
                </p>
                <div className="flex flex-wrap gap-2">
                  {messages.map((msg) => (
                    <button
                      key={msg.id}
                      onClick={() => !msg.read && handleMarkRead(msg.id)}
                      className="px-4 py-2 rounded-full text-sm font-serif transition-all"
                      style={{
                        backgroundColor: msg.read
                          ? 'rgba(232, 196, 124, 0.1)'
                          : 'rgba(232, 196, 124, 0.2)',
                        color: '#e8c47c',
                        border: msg.read
                          ? '1px solid transparent'
                          : '1px solid rgba(232, 196, 124, 0.3)',
                      }}
                    >
                      {msg.word}
                      {!msg.read && <span className="ml-1">·</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Visibility control */}
            <div className="border-t border-accent/10 pt-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-primary text-sm font-serif">
                    {portrait.visible
                      ? 'your story breathes in the void'
                      : 'your story rests in shadow'}
                  </p>
                  <p className="text-text-faint text-xs font-serif mt-1">
                    {portrait.visible
                      ? 'others may find you'
                      : 'you are held in private'}
                  </p>
                </div>
                <button
                  onClick={handleToggleVisibility}
                  disabled={isToggling}
                  className="px-6 py-3 rounded-md text-sm font-serif transition-all disabled:opacity-50"
                  style={{
                    backgroundColor: portrait.visible
                      ? 'rgba(232, 196, 124, 0.1)'
                      : 'rgba(232, 196, 124, 0.2)',
                    color: '#e8c47c',
                  }}
                >
                  {isToggling
                    ? portrait.visible
                      ? 'retreating...'
                      : 'emerging...'
                    : portrait.visible
                    ? 'retreat to shadow'
                    : 'emerge to light'}
                </button>
              </div>
            </div>

            {/* Vibration toggle */}
            <div className="mt-6 pt-6 border-t border-accent/10">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-text-muted text-sm font-serif">
                  pulse vibrations
                </span>
                <button
                  onClick={() => setVibrationEnabled(!vibrationEnabled)}
                  className="w-12 h-6 rounded-full transition-colors relative"
                  style={{
                    backgroundColor: vibrationEnabled
                      ? 'rgba(232, 196, 124, 0.3)'
                      : 'rgba(74, 69, 64, 0.3)',
                  }}
                >
                  <div
                    className="absolute top-1 w-4 h-4 rounded-full transition-all"
                    style={{
                      backgroundColor: vibrationEnabled ? '#e8c47c' : '#4a4540',
                      left: vibrationEnabled ? '26px' : '4px',
                    }}
                  />
                </button>
              </label>
              <p className="text-text-faint text-xs font-serif mt-2">
                feel when someone witnesses your story
              </p>
            </div>

            {/* Recent pulses */}
            {recentPulses.length > 0 && (
              <div className="mt-6 pt-6 border-t border-accent/10">
                <p className="text-text-faint text-xs uppercase tracking-wider mb-3">
                  recent pulses
                </p>
                <div className="space-y-2">
                  {recentPulses.slice(-5).map((pulse) => (
                    <div key={pulse.id} className="flex items-center gap-3 text-sm">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            pulse.event_type === 'message' ? '#e8c47c' : '#7a756f',
                          boxShadow:
                            pulse.event_type === 'message'
                              ? '0 0 8px rgba(232, 196, 124, 0.4)'
                              : 'none',
                        }}
                      />
                      <span className="text-text-muted font-serif">
                        {pulse.event_type === 'message'
                          ? `word received: "${(pulse.metadata as { word?: string })?.word || ''}"`
                          : pulse.event_type === 'click'
                          ? 'someone held your story'
                          : 'a soul drew near'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <p className="text-center text-text-faint text-xs font-serif italic mt-8">
            this story remains yours · always · eternally
          </p>
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-void-deep flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-accent animate-breathe" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
