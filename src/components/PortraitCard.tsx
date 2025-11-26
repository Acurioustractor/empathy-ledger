'use client';

import { useState, useRef, useEffect } from 'react';
import type { Portrait } from '@/lib/database.types';

interface PortraitCardProps {
  portrait: Portrait;
  onHover?: (id: string) => void;
  onLeave?: () => void;
  onClick?: (portrait: Portrait) => void;
  isHovered?: boolean;
}

// Calculate days since creation
function daysSince(dateString: string): number {
  const created = new Date(dateString);
  const now = new Date();
  return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
}

export function PortraitCard({
  portrait,
  onHover,
  onLeave,
  onClick,
  isHovered = false,
}: PortraitCardProps) {
  const [breathPhase, setBreathPhase] = useState(Math.random() * Math.PI * 2);
  const [revealed, setRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Gentle breathing animation - only when hovered for performance
  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      setBreathPhase((p) => (p + 0.02) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Reveal animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100 + Math.random() * 400);
    return () => clearTimeout(timer);
  }, []);

  const breathScale = 1 + Math.sin(breathPhase) * 0.003;
  const breathGlow = 0.15 + Math.sin(breathPhase) * 0.05;
  const daysPresent = daysSince(portrait.created_at);

  // Withdrawn portrait - beautiful absence (static, no animation for performance)
  if (!portrait.visible) {
    return (
      <div
        ref={cardRef}
        className={`relative aspect-[3/4] transition-all duration-1000 ${revealed ? 'opacity-100' : 'opacity-0'}`}
        style={{
          transform: `rotate(${portrait.rotation}deg) translate(${portrait.offset_x}px, ${portrait.offset_y}px)`,
        }}
      >
        {/* The void where a story once lived */}
        <div
          className="absolute inset-0 rounded-sm"
          style={{
            background: 'linear-gradient(145deg, rgba(26, 24, 22, 0.6) 0%, rgba(13, 12, 10, 0.8) 100%)',
            border: '1px solid rgba(232, 196, 124, 0.08)',
          }}
        >
          {/* Ghost frame lines */}
          <div className="absolute inset-3 border border-dashed border-text-faint/20 rounded-sm" />

          {/* Ember - memory of presence */}
          <div
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{
              backgroundColor: 'rgba(232, 196, 124, 0.4)',
              boxShadow: '0 0 12px 6px rgba(232, 196, 124, 0.15)',
            }}
          />

          {/* Poetic absence text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <p className="text-text-muted/60 text-[11px] font-serif italic text-center leading-relaxed tracking-wide">
              a story
              <br />
              <span className="text-[10px]">once lived here</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={`relative aspect-[3/4] cursor-pointer transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{
        transform: `rotate(${portrait.rotation}deg) translate(${portrait.offset_x}px, ${portrait.offset_y}px) scale(${isHovered ? 1.04 : breathScale})`,
        zIndex: isHovered ? 10 : 1,
      }}
      onMouseEnter={() => onHover?.(portrait.id)}
      onMouseLeave={onLeave}
      onClick={() => onClick?.(portrait)}
    >
      {/* Ethereal glow - the alcove of light */}
      <div
        className="absolute -inset-8 rounded-2xl transition-all duration-700 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(ellipse at center, rgba(232, 196, 124, ${isHovered ? 0.25 : breathGlow}) 0%, transparent 70%)`,
          transform: `scale(${isHovered ? 1.1 : 1})`,
        }}
      />

      {/* Film grain overlay - warmth through imperfection */}
      <div
        className="absolute inset-0 rounded-sm pointer-events-none z-20 mix-blend-overlay opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Sacred frame - the alcove */}
      <div
        className="absolute inset-0 rounded-sm transition-all duration-500"
        style={{
          background: 'linear-gradient(145deg, #1a1816 0%, #0d0c0a 100%)',
          padding: '10px 10px 32px 10px',
          boxShadow: isHovered
            ? '0 25px 80px rgba(0,0,0,0.6), 0 0 60px rgba(232, 196, 124, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
            : `0 10px 30px rgba(0,0,0,0.4), 0 0 ${20 + Math.sin(breathPhase) * 10}px rgba(232, 196, 124, ${breathGlow * 0.3})`,
          border: `1px solid rgba(232, 196, 124, ${isHovered ? 0.25 : 0.1})`,
        }}
      >
        {/* Image container */}
        <div className="w-full h-full rounded-[2px] overflow-hidden relative bg-void-deep">
          <img
            src={portrait.image_url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            style={{
              filter: isHovered
                ? 'brightness(1.08) saturate(1.05) contrast(1.02)'
                : 'brightness(0.92) saturate(0.95)',
            }}
            onError={(e) => {
              console.error('[Image Error]', portrait.image_url);
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* Vignette - depth and intimacy */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10, 9, 8, 0.5) 100%)',
              opacity: isHovered ? 0.3 : 0.6,
            }}
          />

          {/* Warm overlay on hover - the connection moment */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-500"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(232, 196, 124, 0.15) 0%, transparent 70%)',
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Soul indicator - breathing light */}
          <div
            className="absolute top-3 right-3 transition-all duration-500"
            style={{
              opacity: isHovered ? 1 : 0.6,
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: '#e8c47c',
                boxShadow: `0 0 ${8 + Math.sin(breathPhase) * 4}px ${4 + Math.sin(breathPhase) * 2}px rgba(232, 196, 124, ${0.4 + Math.sin(breathPhase) * 0.2})`,
                transform: `scale(${1 + Math.sin(breathPhase) * 0.2})`,
              }}
            />
          </div>
        </div>

        {/* Presence indicator - time shared */}
        <div
          className="absolute bottom-2 left-0 right-0 text-center transition-all duration-500"
          style={{
            opacity: isHovered ? 1 : 0.7,
          }}
        >
          <span
            className="text-[10px] font-serif tracking-widest uppercase"
            style={{
              color: 'rgba(232, 196, 124, 0.8)',
              letterSpacing: '0.12em',
            }}
          >
            {daysPresent === 0 ? 'arrived today' : daysPresent === 1 ? 'present 1 day' : `present ${daysPresent} days`}
          </span>
        </div>
      </div>

      {/* Hover invitation */}
      <div
        className="absolute -bottom-8 left-0 right-0 text-center transition-all duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: `translateY(${isHovered ? 0 : -4}px)`,
        }}
      >
        <span className="text-[11px] text-accent font-serif italic">
          enter this story
        </span>
      </div>
    </div>
  );
}
