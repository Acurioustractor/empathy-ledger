'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

interface PulseLogEntry {
  id: string;
  type: 'view' | 'hover' | 'click' | 'message';
  content?: string;
  time: number;
}

interface PulseLogProps {
  logs: PulseLogEntry[];
}

// Stable poetic messages - use hash of id to pick consistently
const getPoetryFor = (log: PulseLogEntry): string => {
  if (log.type === 'message' && log.content) {
    return `"${log.content}"`;
  }

  const poetry = {
    hover: ['a presence lingers', 'someone pauses', 'eyes rest here', 'attention drawn'],
    click: ['a soul enters', 'deeper curiosity', 'connection sought', 'a moment begins'],
    view: ['being witnessed', 'gaze received'],
    message: ['a word arrives'],
  };

  const options = poetry[log.type];
  // Use the log id to pick consistently (not random)
  const hash = log.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return options[hash % options.length];
};

export function PulseLog({ logs }: PulseLogProps) {
  const [visible, setVisible] = useState(false);

  // Only show the last 3 logs, memoized
  const recentLogs = useMemo(() => logs.slice(-3), [logs]);
  const hasActivity = recentLogs.length > 0;
  const hasMessage = recentLogs.some((l) => l.type === 'message');

  // Show when new logs arrive, hide after delay
  useEffect(() => {
    if (logs.length > 0) {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 10000);
      return () => clearTimeout(timeout);
    }
  }, [logs.length]); // Only trigger on length change, not content

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Storyteller link - always visible */}
      <Link
        href="/admin"
        className="block mb-4 text-right text-text-muted/60 text-[11px] font-serif tracking-wider hover:text-accent transition-colors duration-500"
      >
        storyteller →
      </Link>

      {/* Pulse panel - only show when there's activity */}
      {hasActivity && (
        <div
          className="transition-all duration-1000 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(8px)',
            background: 'linear-gradient(145deg, rgba(18, 16, 14, 0.95) 0%, rgba(10, 9, 8, 0.98) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: '12px',
            padding: '16px 20px',
            minWidth: '180px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            border: '1px solid rgba(232, 196, 124, 0.08)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                backgroundColor: hasMessage ? '#e8c47c' : 'rgba(232, 196, 124, 0.6)',
                boxShadow: hasMessage
                  ? '0 0 8px rgba(232, 196, 124, 0.4)'
                  : '0 0 4px rgba(232, 196, 124, 0.2)',
              }}
            />
            <span className="text-text-muted/70 text-[10px] uppercase tracking-[0.15em]">
              pulse
            </span>
          </div>

          {/* Activity feed - static text */}
          <div className="space-y-2.5">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0"
                  style={{
                    backgroundColor:
                      log.type === 'message'
                        ? '#e8c47c'
                        : log.type === 'click'
                          ? 'rgba(232, 196, 124, 0.7)'
                          : 'rgba(122, 117, 111, 0.5)',
                  }}
                />
                <span
                  className="text-[12px] font-serif italic leading-relaxed"
                  style={{
                    color:
                      log.type === 'message'
                        ? '#e8c47c'
                        : 'rgba(200, 195, 188, 0.85)',
                  }}
                >
                  {getPoetryFor(log)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Minimal dot when hidden */}
      {hasActivity && !visible && (
        <div className="flex justify-end">
          <div
            className="w-2 h-2 rounded-full cursor-pointer animate-pulse"
            onClick={() => setVisible(true)}
            style={{
              backgroundColor: hasMessage ? '#e8c47c' : 'rgba(232, 196, 124, 0.4)',
              boxShadow: '0 0 6px rgba(232, 196, 124, 0.3)',
            }}
          />
        </div>
      )}
    </div>
  );
}
