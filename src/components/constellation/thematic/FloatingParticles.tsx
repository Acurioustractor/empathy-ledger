import React, { useEffect, useRef } from 'react';

export const FloatingParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particleCount = 50;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute w-0.5 h-0.5 bg-white/60 rounded-full'; // Tailwind classes
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`; // Start randomly positioned
      particle.style.animation = `float ${20 + Math.random() * 20}s linear infinite`;
      particle.style.animationDelay = `${Math.random() * -40}s`; // Start animation at different points
      container.appendChild(particle);
      particles.push(particle);
    }

    // Keyframes are defined in global CSS or a style tag if needed,
    // but the animation property is set here.
    // Ensure the @keyframes float is defined in your global CSS or styled-jsx

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden"></div>
  );
};

// Add this to your global CSS (e.g., globals.css) if it's not already there:
/*
@keyframes float {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0.1;
  }
  50% {
      opacity: 0.7;
  }
  100% {
    transform: translateY(-100vh) translateX(${Math.random() * 40 - 20}vw) rotate(360deg);
    opacity: 0.1;
  }
}
*/
