'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { MysticalBackground, PortraitCard, ExpandedView, PulseLog } from '@/components';
import { supabase } from '@/lib/supabase';
import type { Portrait } from '@/lib/database.types';

// Demo portraits for initial testing (before database is set up)
const DEMO_PORTRAITS: Portrait[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face',
    name: 'Soul 1',
    storyteller_id: 'demo-1',
    visible: true,
    views: 47,
    clicks: 12,
    rotation: -1.2,
    offset_x: 3,
    offset_y: -2,
    access_code: 'demo1',
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
    name: 'Soul 2',
    storyteller_id: 'demo-2',
    visible: true,
    views: 23,
    clicks: 8,
    rotation: 0.8,
    offset_x: -2,
    offset_y: 4,
    access_code: 'demo2',
  },
  {
    id: '3',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face',
    name: 'Soul 3',
    storyteller_id: 'demo-3',
    visible: false,
    views: 31,
    clicks: 5,
    rotation: -0.5,
    offset_x: 1,
    offset_y: -3,
    access_code: 'demo3',
  },
  {
    id: '4',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face',
    name: 'Soul 4',
    storyteller_id: 'demo-4',
    visible: true,
    views: 89,
    clicks: 34,
    rotation: 1.5,
    offset_x: -4,
    offset_y: 2,
    access_code: 'demo4',
  },
  {
    id: '5',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face',
    name: 'Soul 5',
    storyteller_id: 'demo-5',
    visible: true,
    views: 15,
    clicks: 3,
    rotation: -0.3,
    offset_x: 2,
    offset_y: 1,
    access_code: 'demo5',
  },
  {
    id: '6',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=500&fit=crop&crop=face',
    name: 'Soul 6',
    storyteller_id: 'demo-6',
    visible: true,
    views: 56,
    clicks: 19,
    rotation: 0.9,
    offset_x: -1,
    offset_y: -4,
    access_code: 'demo6',
  },
  {
    id: '7',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face',
    name: 'Soul 7',
    storyteller_id: 'demo-7',
    visible: false,
    views: 42,
    clicks: 11,
    rotation: -1.8,
    offset_x: 3,
    offset_y: 3,
    access_code: 'demo7',
  },
  {
    id: '8',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face',
    name: 'Soul 8',
    storyteller_id: 'demo-8',
    visible: true,
    views: 67,
    clicks: 28,
    rotation: 0.4,
    offset_x: -3,
    offset_y: -1,
    access_code: 'demo8',
  },
  {
    id: '9',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face',
    name: 'Soul 9',
    storyteller_id: 'demo-9',
    visible: true,
    views: 34,
    clicks: 9,
    rotation: -0.7,
    offset_x: 0,
    offset_y: 2,
    access_code: 'demo9',
  },
  {
    id: '10',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face',
    name: 'Soul 10',
    storyteller_id: 'demo-10',
    visible: true,
    views: 78,
    clicks: 22,
    rotation: 0.3,
    offset_x: 2,
    offset_y: -1,
    access_code: 'demo10',
  },
  {
    id: '11',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=face',
    name: 'Soul 11',
    storyteller_id: 'demo-11',
    visible: false,
    views: 19,
    clicks: 4,
    rotation: -1.1,
    offset_x: -2,
    offset_y: 3,
    access_code: 'demo11',
  },
  {
    id: '12',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop&crop=face',
    name: 'Soul 12',
    storyteller_id: 'demo-12',
    visible: true,
    views: 103,
    clicks: 41,
    rotation: 0.6,
    offset_x: 1,
    offset_y: -2,
    access_code: 'demo12',
  },
];

interface PulseLogEntry {
  id: string;
  type: 'view' | 'hover' | 'click' | 'message';
  content?: string;
  time: number;
}

export default function Home() {
  const [portraits, setPortraits] = useState<Portrait[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedPortrait, setSelectedPortrait] = useState<Portrait | null>(null);
  const [pulseLog, setPulseLog] = useState<PulseLogEntry[]>([]);
  const [useDemo, setUseDemo] = useState(false);

  // Throttle refs for hover events
  const lastHoverPulseRef = useRef<number>(0);
  const lastHoveredIdRef = useRef<string | null>(null);

  // Fetch portraits from database
  useEffect(() => {
    async function fetchPortraits() {
      try {
        console.log('[Empathy Ledger] Fetching portraits from Supabase...');
        const { data, error } = await supabase
          .from('portraits')
          .select('*')
          .order('created_at', { ascending: false });

        console.log('[Empathy Ledger] Fetch result:', { data, error });

        if (error) {
          console.error('[Empathy Ledger] Supabase error:', error);
          throw error;
        }

        // Type cast since Supabase client has type inference issues
        const typedData = (data || []) as Portrait[];

        // Debug: log image URLs
        if (typedData.length > 0) {
          typedData.forEach((p, i) => {
            console.log(`[Empathy Ledger] Portrait ${i + 1} image URL:`, p.image_url);
          });
        }

        // Use real data from database (even if empty)
        setPortraits(typedData);
        setUseDemo(false);
      } catch (err) {
        console.error('[Empathy Ledger] Fetch failed, using demo:', err);
        setPortraits(DEMO_PORTRAITS);
        setUseDemo(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPortraits();
  }, []);

  // Track hover events - throttled to prevent spam
  const handleHover = useCallback(async (id: string) => {
    setHoveredId(id);

    const now = Date.now();
    const timeSinceLastPulse = now - lastHoverPulseRef.current;
    const isSamePortrait = id === lastHoveredIdRef.current;

    // Only log if: different portrait OR at least 3 seconds since last pulse
    if (!isSamePortrait || timeSinceLastPulse > 3000) {
      lastHoverPulseRef.current = now;
      lastHoveredIdRef.current = id;

      // Add to pulse log
      setPulseLog((prev) => [
        ...prev.slice(-10),
        { id: `${id}-${Date.now()}`, type: 'hover', time: Date.now() },
      ]);

      // Send pulse event to API (skip if demo mode)
      if (!useDemo) {
        try {
          await fetch('/api/pulse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ portraitId: id, eventType: 'hover' }),
          });
        } catch (err) {
          console.error('Failed to send pulse:', err);
        }
      }
    }
  }, [useDemo]);

  // Track click events
  const handleClick = useCallback(async (portrait: Portrait) => {
    setSelectedPortrait(portrait);

    // Add to pulse log
    setPulseLog((prev) => [
      ...prev.slice(-10),
      { id: `${portrait.id}-click-${Date.now()}`, type: 'click', time: Date.now() },
    ]);

    // Send pulse event
    if (!useDemo) {
      try {
        await fetch('/api/pulse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ portraitId: portrait.id, eventType: 'click' }),
        });
      } catch (err) {
        console.error('Failed to send pulse:', err);
      }
    }
  }, [useDemo]);

  // Send message
  const handleSendMessage = useCallback(async (portraitId: string, word: string) => {
    // Add to pulse log
    setPulseLog((prev) => [
      ...prev.slice(-10),
      { id: `${portraitId}-msg-${Date.now()}`, type: 'message', content: word, time: Date.now() },
    ]);

    // Send to API
    if (!useDemo) {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portraitId, word }),
      });
    }
  }, [useDemo]);

  // All portraits (visible and hidden placeholders)
  const displayPortraits = portraits;

  if (loading) {
    return (
      <div className="min-h-screen bg-void-deep flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-3 h-3 rounded-full bg-accent mx-auto mb-4 animate-breathe" />
          <p className="text-text-muted text-sm font-serif">awakening...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-void-deep relative overflow-hidden">
      <MysticalBackground particleCount={60} speed={0.2} />

      {/* Main content */}
      <div className="relative z-10 px-6 md:px-8 py-12 md:py-20">
        {/* Header - poetic and intentional */}
        <header className="max-w-3xl mx-auto mb-16 md:mb-24 text-center">
          {/* Title with breathing glow */}
          <h1
            className="text-2xl md:text-4xl text-text-primary font-serif font-normal tracking-[0.12em] mb-6"
            style={{
              textShadow: '0 0 60px rgba(232, 196, 124, 0.3)',
              letterSpacing: '0.12em',
            }}
          >
            the empathy ledger
          </h1>

          {/* Poetic subtitle - multi-line for intimacy */}
          <div className="space-y-1">
            <p className="text-text-muted text-[13px] md:text-sm font-serif italic">
              these stories are here by choice
            </p>
            <p className="text-text-muted/70 text-[11px] md:text-xs font-serif">
              they may leave at any time
            </p>
          </div>

          {/* Decorative breathing divider */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent via-accent/40 to-accent/60" />
            <div
              className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
              style={{ boxShadow: '0 0 16px 6px rgba(232, 196, 124, 0.25)' }}
            />
            <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent via-accent/40 to-accent/60" />
          </div>

          {/* Demo mode - subtle */}
          {useDemo && (
            <p className="mt-8 text-text-faint/40 text-[10px] tracking-wider">
              · demo mode ·
            </p>
          )}
        </header>

        {/* Portrait grid - generous spacing for intimacy */}
        <section className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-14 px-4">
            {displayPortraits.map((portrait) => (
              <PortraitCard
                key={portrait.id}
                portrait={portrait}
                isHovered={hoveredId === portrait.id}
                onHover={handleHover}
                onLeave={() => setHoveredId(null)}
                onClick={handleClick}
              />
            ))}
          </div>

          {/* Subtle count - only if there are portraits */}
          {displayPortraits.length > 0 && (
            <p className="text-text-muted/50 text-[11px] mt-16 text-center font-serif tracking-widest">
              {displayPortraits.filter(p => p.visible).length} {displayPortraits.filter(p => p.visible).length === 1 ? 'story' : 'stories'} present
            </p>
          )}
        </section>
      </div>

      {/* Pulse log - ambient activity */}
      <PulseLog logs={pulseLog} />

      {/* Expanded view modal */}
      {selectedPortrait && (
        <ExpandedView
          portrait={selectedPortrait}
          onClose={() => setSelectedPortrait(null)}
          onSendMessage={handleSendMessage}
        />
      )}
    </main>
  );
}
