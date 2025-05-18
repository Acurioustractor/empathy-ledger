import React from 'react';
import { Storyteller, Theme } from './StorytellerLegend'; // Import Storyteller and Theme types
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface StorytellerInfoPanelProps {
  activeStoryteller: Storyteller | null;
  onClose: () => void;
}

export const StorytellerInfoPanel: React.FC<StorytellerInfoPanelProps> = ({
  activeStoryteller,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {activeStoryteller && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur"
        >
          <div className="relative w-full max-w-lg bg-gray-900/95 rounded-2xl shadow-2xl border border-gray-700 p-6 flex flex-col max-h-[90vh] overflow-y-auto">
            {/* Close button inside modal */}
            <button
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400/70 z-40"
              aria-label="Close panel"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Modal content */}
            <div className="flex items-start space-x-4 mb-4">
              {activeStoryteller.avatarUrl ? (
                <Image
                  src={activeStoryteller.avatarUrl}
                  alt={activeStoryteller.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-lg object-cover border-2 border-gray-700"
                />
              ) : (
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold text-white/90 border-2 border-gray-700"
                  style={{ backgroundColor: activeStoryteller.color }}
                >
                  {activeStoryteller.name.charAt(0)}
                </div>
              )}
              <div>
                <h3
                  className="text-2xl font-bold transition-colors duration-300"
                  style={{ color: activeStoryteller.color || '#fbbf24' }}
                >
                  {activeStoryteller.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                  {activeStoryteller.description || 'No biography available.'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-4">
              <div className="bg-white/5 p-3 rounded-md">
                <div className="text-xl font-bold text-emerald-400">
                  {activeStoryteller.mediaCount || 0}
                </div>
                <div className="text-xs text-gray-400">Media Items</div>
              </div>
              <div className="bg-white/5 p-3 rounded-md">
                <div className="text-xl font-bold text-cyan-400">
                  {activeStoryteller.themeCount || 0}
                </div>
                <div className="text-xs text-gray-400">Unique Themes</div>
              </div>
              <div className="bg-white/5 p-3 rounded-md">
                <div className="text-xl font-bold text-purple-400">
                  {activeStoryteller.quoteCount || 0}
                </div>
                <div className="text-xs text-gray-400">Quotes Shared</div>
              </div>
              <div className="bg-white/5 p-3 rounded-md">
                <div className="text-xl font-bold text-amber-400">
                  {activeStoryteller.storyCount || 0}
                </div>
                <div className="text-xs text-gray-400">Stories Contributed</div>
              </div>
            </div>
            {/* Display linked themes */}
            {activeStoryteller.themes && activeStoryteller.themes.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-700">
                <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Key Themes</h4>
                <div className="flex flex-wrap gap-2">
                  {activeStoryteller.themes.slice(0, 7).map(
                    (
                      theme: Theme // Show top 7 themes for brevity
                    ) => (
                      <span
                        key={theme.id}
                        className="text-xs px-2 py-1 rounded-full border"
                        style={{
                          backgroundColor: `${theme.color}33`,
                          borderColor: theme.color,
                          color: theme.color,
                        }}
                      >
                        {theme.name}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
