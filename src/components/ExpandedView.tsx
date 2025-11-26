'use client';

import { useState, useEffect, useRef } from 'react';
import type { Portrait } from '@/lib/database.types';

interface ExpandedViewProps {
  portrait: Portrait;
  onClose: () => void;
  onSendMessage: (portraitId: string, word: string) => Promise<void>;
}

// Calculate days since creation
function daysSince(dateString: string): number {
  const created = new Date(dateString);
  const now = new Date();
  return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
}

export function ExpandedView({
  portrait,
  onClose,
  onSendMessage,
}: ExpandedViewProps) {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [breathPhase, setBreathPhase] = useState(0);
  const [entered, setEntered] = useState(false);
  const [wordAscending, setWordAscending] = useState(false);
  const [sentWord, setSentWord] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const daysPresent = daysSince(portrait.created_at);

  // Entry animation
  useEffect(() => {
    setTimeout(() => setEntered(true), 50);
  }, []);

  // Breathing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathPhase((p) => (p + 0.025) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Focus input on load
  useEffect(() => {
    if (entered && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 600);
    }
  }, [entered]);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSend = async () => {
    if (!message.trim() || message.includes(' ') || sending) return;

    const word = message.trim().toLowerCase();
    setSending(true);
    setSentWord(word);

    try {
      await onSendMessage(portrait.id, word);
      setWordAscending(true);

      // Show ascending animation, then confirmation
      setTimeout(() => {
        setSent(true);
        setWordAscending(false);
      }, 1500);

      // Reset after showing confirmation
      setTimeout(() => {
        setSent(false);
        setMessage('');
        setSentWord('');
      }, 4000);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const breathScale = 1 + Math.sin(breathPhase) * 0.006;
  const glowIntensity = 0.25 + Math.sin(breathPhase) * 0.1;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-8 transition-all duration-700 ${entered ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundColor: 'rgba(8, 7, 6, 0.97)',
        backdropFilter: 'blur(24px)',
      }}
      onClick={onClose}
    >
      {/* Ambient glow - the alcove of light */}
      <div
        className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-1000"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(232, 196, 124, 0.12) 0%, rgba(232, 196, 124, 0.04) 40%, transparent 70%)',
          opacity: entered ? glowIntensity : 0,
          transform: `scale(${entered ? 1 : 0.9})`,
        }}
      />

      {/* Ascending word animation */}
      {wordAscending && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 pointer-events-none z-50"
          style={{
            animation: 'wordAscend 1.5s ease-out forwards',
          }}
        >
          <span
            className="text-accent text-lg font-serif italic"
            style={{
              textShadow: '0 0 20px rgba(232, 196, 124, 0.6)',
            }}
          >
            {sentWord}
          </span>
        </div>
      )}

      <div
        className={`relative max-w-[420px] w-full transition-all duration-700 ${entered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        style={{
          transform: `scale(${breathScale})`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close hint - poetic */}
        <div
          className={`absolute -top-16 left-0 right-0 text-center transition-all duration-500 ${entered ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <span className="text-text-muted/70 text-[12px] font-serif tracking-wider">
            touch the darkness to return
          </span>
        </div>

        {/* Sacred frame */}
        <div
          className="rounded-md overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a1816 0%, #0d0c0a 100%)',
            padding: '16px 16px 20px 16px',
            boxShadow: `0 50px 120px rgba(0,0,0,0.7), 0 0 80px rgba(232, 196, 124, ${glowIntensity * 0.4})`,
            border: '1px solid rgba(232, 196, 124, 0.15)',
          }}
        >
          {/* Portrait image */}
          <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-void-deep">
            <img
              src={portrait.image_url}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
              style={{
                filter: 'brightness(1.02) saturate(1.02)',
              }}
            />

            {/* Subtle vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10, 9, 8, 0.25) 100%)',
              }}
            />

            {/* Film grain */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Soul indicator */}
            <div
              className="absolute top-4 right-4 w-3 h-3 rounded-full"
              style={{
                backgroundColor: '#e8c47c',
                boxShadow: `0 0 ${16 + Math.sin(breathPhase) * 8}px ${8 + Math.sin(breathPhase) * 4}px rgba(232, 196, 124, ${0.4 + Math.sin(breathPhase) * 0.2})`,
                transform: `scale(${1 + Math.sin(breathPhase) * 0.15})`,
              }}
            />
          </div>

          {/* Presence duration - below image */}
          <div className="mt-4 text-center">
            <span
              className="text-[11px] font-serif tracking-[0.15em] uppercase"
              style={{ color: 'rgba(232, 196, 124, 0.75)' }}
            >
              {daysPresent === 0 ? 'arrived today' : daysPresent === 1 ? 'sharing for 1 day' : `sharing for ${daysPresent} days`}
            </span>
          </div>
        </div>

        {/* Message interface - the sacred act */}
        <div
          className={`mt-12 text-center transition-all duration-500 ${entered ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '500ms' }}
        >
          {!sent ? (
            <>
              {/* Poetic invitation */}
              <p className="text-text-primary/90 text-[15px] mb-8 font-serif italic leading-relaxed">
                if you wish, leave a single word
                <br />
                <span className="text-[13px] text-text-primary/60">
                  — it will reach only them —
                </span>
              </p>

              {/* Input and send */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!val.includes(' ')) {
                        setMessage(val);
                      }
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="one word"
                    maxLength={24}
                    disabled={sending}
                    className="bg-transparent border-0 border-b text-text-primary text-center py-3 px-4 text-[16px] font-serif w-48 outline-none transition-all duration-300 placeholder:text-text-primary/40 placeholder:italic"
                    style={{
                      borderColor: message ? 'rgba(232, 196, 124, 0.5)' : 'rgba(180, 175, 168, 0.4)',
                      letterSpacing: '0.05em',
                    }}
                  />

                  {/* Typing indicator line */}
                  {message && (
                    <div
                      className="absolute -bottom-1 left-1/2 h-px bg-accent transition-all duration-300"
                      style={{
                        width: `${Math.min(message.length * 8, 100)}%`,
                        transform: 'translateX(-50%)',
                        opacity: 0.6,
                      }}
                    />
                  )}
                </div>

                <button
                  onClick={handleSend}
                  disabled={!message.trim() || sending}
                  className="text-[13px] py-3 px-5 font-serif transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    color: message.trim() ? '#e8c47c' : '#4a4540',
                  }}
                >
                  {sending ? (
                    <span className="inline-block animate-pulse">···</span>
                  ) : (
                    'send'
                  )}
                </button>
              </div>

              {/* Sacred note */}
              <p className="text-text-primary/50 text-[12px] mt-8 font-serif tracking-wide">
                sacred · private · theirs alone
              </p>
            </>
          ) : (
            /* Confirmation - the word was carried */
            <div className="flex flex-col items-center gap-4 py-4">
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{
                  backgroundColor: '#e8c47c',
                  boxShadow: '0 0 20px 10px rgba(232, 196, 124, 0.35)',
                }}
              />
              <p className="text-accent text-[14px] font-serif italic">
                your word has been carried
              </p>
              <p className="text-text-muted/70 text-[12px] font-serif">
                they will feel its arrival
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CSS for word ascending animation */}
      <style jsx>{`
        @keyframes wordAscend {
          0% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -120px) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
}
