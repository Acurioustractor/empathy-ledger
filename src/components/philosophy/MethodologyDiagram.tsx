'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResearchMethodology } from './ResearchMethodology';

interface MethodologyDiagramProps {
  variant: 'traditional' | 'transformative';
}

export const MethodologyDiagram: React.FC<MethodologyDiagramProps> = ({ variant }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showLegend, setShowLegend] = useState(true);

  const colors = {
    traditional: {
      primary: 'text-blue-900',
      secondary: 'text-blue-600',
      accent: 'border-blue-200',
      bg: 'bg-blue-50',
      hover: 'hover:bg-blue-100',
    },
    transformative: {
      primary: 'text-rose-900',
      secondary: 'text-rose-600',
      accent: 'border-rose-200',
      bg: 'bg-rose-50',
      hover: 'hover:bg-rose-100',
    },
  };

  const currentColors = colors[variant];

  const steps = {
    traditional: [
      {
        title: 'Researcher (R)',
        description: 'The central authority figure who designs and controls the research process.',
        highlight: ['researcher'],
      },
      {
        title: 'Subjects (S)',
        description:
          'People whose experiences are converted into data points for institutional study.',
        highlight: ['subjects'],
      },
      {
        title: 'One-Way Flow',
        description:
          'Information flows downward, from researcher to repository, with subjects having no control over their narratives.',
        highlight: ['connections'],
      },
      {
        title: 'Repository',
        description: 'Institutional storage where experiences become decontextualized data points.',
        highlight: ['repository'],
      },
      {
        title: 'Hierarchical Structure',
        description:
          'A rigid, top-down approach where value accumulates at the institutional level.',
        highlight: ['all'],
      },
    ],
    transformative: [
      {
        title: 'Storyteller (S)',
        description: 'The central figure who maintains sovereignty over their narrative.',
        highlight: ['central'],
      },
      {
        title: 'Network Nodes',
        description:
          'Other participants in the ecosystem, each contributing to and benefiting from the exchange.',
        highlight: ['nodes'],
      },
      {
        title: 'Reciprocal Connections',
        description:
          'Bidirectional flows of information, value, and understanding between all participants.',
        highlight: ['connections'],
      },
      {
        title: 'Dynamic Ecosystem',
        description: 'A living network where insights evolve through ongoing engagement.',
        highlight: ['all'],
      },
    ],
  };

  const currentSteps = steps[variant];
  const currentStep = currentSteps[activeStep];

  return (
    <div className="space-y-6">
      {/* Legend and Diagram stacked with flex-col */}
      <div className="relative flex flex-col items-start">
        {/* Interactive Legend (z-10, always clickable) */}
        <AnimatePresence>
          {showLegend && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`z-10 mb-2 p-4 rounded-lg ${currentColors.bg} border ${currentColors.accent} shadow-sm`}
              style={{ position: 'relative' }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-semibold ${currentColors.primary}`}>Diagram Key</h4>
                <button
                  onClick={() => setShowLegend(false)}
                  className={`text-sm ${currentColors.secondary} ${currentColors.hover} rounded p-1`}
                >
                  Hide
                </button>
              </div>
              <div className="space-y-2">
                {variant === 'traditional' ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                        R
                      </div>
                      <span className="text-sm">Researcher</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white text-sm font-bold">
                        S
                      </div>
                      <span className="text-sm">Subject</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-1 bg-blue-400"></div>
                      <span className="text-sm">One-way Information Flow</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-4 bg-gray-800 rounded"></div>
                      <span className="text-sm">Institutional Repository</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-white text-sm font-bold">
                        S
                      </div>
                      <span className="text-sm">Storyteller</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-amber-400"></div>
                      <span className="text-sm">Network Participant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-1 bg-rose-400"></div>
                      <span className="text-sm">Reciprocal Exchange</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show Legend Button */}
        {!showLegend && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`z-10 mb-2 px-3 py-1 rounded ${currentColors.bg} ${currentColors.hover} ${currentColors.secondary} text-sm`}
            style={{ position: 'relative' }}
            onClick={() => setShowLegend(true)}
          >
            Show Key
          </motion.button>
        )}

        {/* Diagram only, no overlays */}
        <div className="w-full relative">
          <ResearchMethodology
            variant={variant}
            highlightedElements={currentStep.highlight}
            pulseHighlight
          />
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="flex items-center justify-center space-x-4 mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-100 text-gray-600 font-medium disabled:opacity-50"
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {currentSteps.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border ${idx === activeStep ? currentColors.primary + ' bg-opacity-80' : 'bg-gray-200'} ${idx === activeStep ? 'bg-blue-500' : ''}`}
              style={{
                backgroundColor:
                  idx === activeStep
                    ? variant === 'traditional'
                      ? '#3b82f6'
                      : '#e11d48'
                    : undefined,
              }}
              onClick={() => setActiveStep(idx)}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>
        <button
          className="px-3 py-1 rounded bg-gray-100 text-gray-600 font-medium disabled:opacity-50"
          onClick={() => setActiveStep(Math.min(currentSteps.length - 1, activeStep + 1))}
          disabled={activeStep === currentSteps.length - 1}
        >
          Next
        </button>
      </div>

      {/* Walkthrough Explanation Card always below */}
      <div className="flex justify-center mt-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={`bg-white border ${currentColors.accent} shadow-lg rounded-lg px-6 py-4 max-w-xl w-full text-sm z-20 pointer-events-auto`}
          style={{ pointerEvents: 'auto' }}
        >
          <h5 className={`font-semibold mb-1 text-base md:text-lg ${currentColors.primary}`}>
            {currentStep.title}
          </h5>
          <p className="text-gray-700 whitespace-normal break-words text-sm md:text-base">
            {currentStep.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
