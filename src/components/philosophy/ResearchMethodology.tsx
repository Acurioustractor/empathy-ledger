'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MethodologyProps {
  variant: 'traditional' | 'transformative';
  highlightedElements?: string[];
  pulseHighlight?: boolean;
}

export const ResearchMethodology: React.FC<MethodologyProps> = ({
  variant,
  highlightedElements = [],
  pulseHighlight = false,
}) => {
  const isTraditional = variant === 'traditional';

  const colors = {
    traditional: {
      primary: '#3b82f6',
      secondary: '#1d4ed8',
      bg: 'from-blue-50 to-indigo-50',
      text: 'text-blue-900',
      accent: 'border-blue-100',
    },
    transformative: {
      primary: '#e11d48',
      secondary: '#f97316',
      bg: 'from-rose-50 to-orange-50',
      text: 'text-rose-900',
      accent: 'border-rose-100',
    },
  };

  const currentColors = colors[variant];

  const isHighlighted = (element: string) => {
    return highlightedElements.includes(element) || highlightedElements.includes('all');
  };

  const getOpacity = (element: string) => {
    if (highlightedElements.length === 0) return 1;
    return isHighlighted(element) ? 1 : 0.2;
  };

  // Animation variants for nodes
  const nodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.1,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  };

  // Animation variants for connections
  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div
      className={`relative aspect-square bg-gradient-to-br ${currentColors.bg} rounded-xl p-4 overflow-hidden group`}
    >
      <div className="absolute inset-0 opacity-50 mix-blend-overlay">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <motion.svg
        viewBox="0 0 400 400"
        className="w-full h-full relative z-10"
        initial="initial"
        animate="animate"
      >
        <defs>
          <filter id={`${variant}-glow`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id={`${variant}-connection-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={currentColors.primary} stopOpacity="0.3" />
            <stop offset="100%" stopColor={currentColors.secondary} stopOpacity="0.3" />
          </linearGradient>

          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={currentColors.primary} />
          </marker>
        </defs>

        {isTraditional ? (
          // Traditional Methodology Visualization
          <>
            {/* Connections */}
            <g style={{ opacity: getOpacity('connections') }}>
              {/* Researcher to Subjects */}
              <motion.path
                d="M 200 110 L 120 180"
                stroke={currentColors.primary}
                strokeWidth="2"
                fill="none"
                variants={pathVariants}
                markerEnd="url(#arrowhead)"
                className={pulseHighlight && isHighlighted('connections') ? 'animate-pulse' : ''}
              />
              <motion.path
                d="M 200 110 L 200 180"
                stroke={currentColors.primary}
                strokeWidth="2"
                fill="none"
                variants={pathVariants}
                markerEnd="url(#arrowhead)"
                className={pulseHighlight && isHighlighted('connections') ? 'animate-pulse' : ''}
              />
              <motion.path
                d="M 200 110 L 280 180"
                stroke={currentColors.primary}
                strokeWidth="2"
                fill="none"
                variants={pathVariants}
                markerEnd="url(#arrowhead)"
                className={pulseHighlight && isHighlighted('connections') ? 'animate-pulse' : ''}
              />

              {/* Subjects to Repository */}
              <motion.path
                d="M 120 220 L 160 300"
                stroke={currentColors.primary}
                strokeWidth="2"
                fill="none"
                variants={pathVariants}
                markerEnd="url(#arrowhead)"
                className={pulseHighlight && isHighlighted('connections') ? 'animate-pulse' : ''}
              />
              <motion.path
                d="M 200 220 L 200 300"
                stroke={currentColors.primary}
                strokeWidth="2"
                fill="none"
                variants={pathVariants}
                markerEnd="url(#arrowhead)"
                className={pulseHighlight && isHighlighted('connections') ? 'animate-pulse' : ''}
              />
              <motion.path
                d="M 280 220 L 240 300"
                stroke={currentColors.primary}
                strokeWidth="2"
                fill="none"
                variants={pathVariants}
                markerEnd="url(#arrowhead)"
                className={pulseHighlight && isHighlighted('connections') ? 'animate-pulse' : ''}
              />
            </g>

            {/* Researcher Node */}
            <motion.g
              variants={nodeVariants}
              whileHover="hover"
              style={{ opacity: getOpacity('researcher') }}
              className={pulseHighlight && isHighlighted('researcher') ? 'animate-pulse' : ''}
            >
              <motion.circle
                cx="200"
                cy="80"
                r="30"
                fill={currentColors.primary}
                filter={`url(#${variant}-glow)`}
                className={pulseHighlight && isHighlighted('researcher') ? 'animate-pulse' : ''}
              />
              <text x="200" y="88" textAnchor="middle" className="fill-white text-lg font-bold">
                R
              </text>
            </motion.g>

            {/* Subject Nodes */}
            <g style={{ opacity: getOpacity('subjects') }}>
              {[
                { x: 120, y: 200 },
                { x: 200, y: 200 },
                { x: 280, y: 200 },
              ].map((pos, i) => (
                <motion.g key={i} variants={nodeVariants} whileHover="hover">
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="20"
                    fill={currentColors.primary}
                    opacity={0.8}
                    className={
                      pulseHighlight && isHighlighted(`subject-${i}`) ? 'animate-pulse' : ''
                    }
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 8}
                    textAnchor="middle"
                    className="fill-white text-sm font-bold"
                  >
                    S
                  </text>
                </motion.g>
              ))}
            </g>

            {/* Repository */}
            <motion.g
              variants={nodeVariants}
              style={{ opacity: getOpacity('repository') }}
              className={pulseHighlight && isHighlighted('repository') ? 'animate-pulse' : ''}
            >
              <rect x="140" y="300" width="120" height="40" rx="8" className="fill-gray-800" />
              <text x="200" y="325" textAnchor="middle" className="fill-white text-xs font-bold">
                REPOSITORY
              </text>
            </motion.g>
          </>
        ) : (
          // Transformative Methodology Visualization
          <>
            {/* Connecting Arc */}
            <motion.path
              d="M 200,80 A 120,120 0 1,1 200,320 A 120,120 0 1,1 200,80"
              fill="none"
              stroke={currentColors.primary}
              strokeWidth="1"
              opacity={0.2}
              variants={pathVariants}
              style={{ opacity: getOpacity('connections') * 0.2 }}
              className={pulseHighlight && isHighlighted('connections') ? 'animate-pulse' : ''}
            />

            {/* Radial Connections */}
            <g style={{ opacity: getOpacity('connections') }}>
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * Math.PI * 2) / 8;
                const radius = 120;
                const x = 200 + radius * Math.cos(angle);
                const y = 200 + radius * Math.sin(angle);

                return (
                  <motion.path
                    key={i}
                    d={`M 200 200 L ${x} ${y}`}
                    stroke={currentColors.primary}
                    strokeWidth="2"
                    fill="none"
                    variants={pathVariants}
                    className={
                      pulseHighlight && isHighlighted(`connection-${i}`) ? 'animate-pulse' : ''
                    }
                  />
                );
              })}
            </g>

            {/* Central Node */}
            <motion.g
              variants={nodeVariants}
              whileHover="hover"
              style={{ opacity: getOpacity('central') }}
              className={pulseHighlight && isHighlighted('central') ? 'animate-pulse' : ''}
            >
              <motion.circle
                cx="200"
                cy="200"
                r="40"
                fill={currentColors.primary}
                filter={`url(#${variant}-glow)`}
              />
              <text x="200" y="208" textAnchor="middle" className="fill-white text-lg font-bold">
                S
              </text>
            </motion.g>

            {/* Surrounding Nodes */}
            <g style={{ opacity: getOpacity('nodes') }}>
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * Math.PI * 2) / 8;
                const radius = 120;
                const x = 200 + radius * Math.cos(angle);
                const y = 200 + radius * Math.sin(angle);

                return (
                  <motion.g key={i} variants={nodeVariants} whileHover="hover">
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={i % 2 === 0 ? 15 : 12}
                      fill="#fbbf24"
                      opacity={i % 2 === 0 ? 0.8 : 0.6}
                      className={
                        pulseHighlight && isHighlighted(`node-${i}`) ? 'animate-pulse' : ''
                      }
                    />
                  </motion.g>
                );
              })}
            </g>
          </>
        )}
      </motion.svg>
    </div>
  );
};
