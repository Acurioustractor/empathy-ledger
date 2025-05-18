import React from 'react';
import Image from 'next/image';
import { Storyteller } from './StorytellerLegend'; // Reuse the Storyteller type

interface FullStorytellerListProps {
  allStorytellers: Storyteller[];
}

export const FullStorytellerList: React.FC<FullStorytellerListProps> = ({ allStorytellers }) => {
  if (!allStorytellers || allStorytellers.length === 0) {
    return null;
  }

  return (
    <div className="my-16 mx-4 md:mx-auto max-w-6xl bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-sky-400">
        Complete Storyteller Directory
      </h2>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-x-6 gap-y-4">
        {allStorytellers.map(storyteller => (
          <div
            key={storyteller.id}
            className="flex items-center bg-gray-800/50 rounded-md p-3 mb-3 break-inside-avoid-column shadow hover:bg-gray-700/50 transition-colors duration-200"
          >
            {storyteller.avatarUrl ? (
              <Image
                src={storyteller.avatarUrl}
                alt={storyteller.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full mr-3 flex-shrink-0 border border-white/20 object-cover"
                unoptimized
              />
            ) : (
              <span
                className="w-8 h-8 rounded-full mr-3 flex-shrink-0 border border-white/30 flex items-center justify-center text-sm font-semibold text-white/80"
                style={{ backgroundColor: storyteller.color }}
                title={`Color: ${storyteller.color}`}
              >
                {storyteller.name.charAt(0)}
              </span>
            )}
            <div className="flex-grow">
              <span className="text-sm text-gray-200 font-medium block">{storyteller.name}</span>
              <div className="text-xs text-gray-400 flex flex-wrap gap-x-2">
                <span>{storyteller.mediaCount || 0} media</span>
                <span>{storyteller.themeCount || 0} themes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
