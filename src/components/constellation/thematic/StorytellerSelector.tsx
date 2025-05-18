import React from 'react';
import { Storyteller } from './StorytellerLegend'; // Import the Storyteller type

interface StorytellerSelectorProps {
  storytellers: Storyteller[];
  activeStorytellerId: string | null;
  onSelectStoryteller: (storytellerId: string) => void;
}

export const StorytellerSelector: React.FC<StorytellerSelectorProps> = ({
  storytellers,
  activeStorytellerId,
  onSelectStoryteller,
}) => {
  if (!storytellers || storytellers.length === 0) {
    return <p className="text-xs text-gray-400 p-4 text-center">No storytellers to display.</p>;
  }

  return (
    <div className="flex flex-col space-y-2 p-2 max-h-[60vh] min-h-[200px] min-w-[220px] w-full overflow-y-auto">
      <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider px-2 pt-1">
        Select Storyteller
      </h4>
      {storytellers.map(storyteller => (
        <button
          key={storyteller.id}
          title={storyteller.name}
          onClick={() => onSelectStoryteller(storyteller.id)}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-400/70
            ${activeStorytellerId === storyteller.id ? 'bg-amber-500/30 border-2 border-amber-400 shadow text-amber-200' : 'bg-gray-800/60 border border-transparent hover:bg-gray-700/70 text-gray-200'}
          `}
        >
          {storyteller.avatarUrl ? (
            <img
              src={storyteller.avatarUrl}
              alt={storyteller.name}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-white/20"
            />
          ) : (
            <span
              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-base font-semibold text-white/90 border border-white/20"
              style={{ backgroundColor: storyteller.color }}
            >
              {storyteller.name.charAt(0)}
            </span>
          )}
          <span
            className={`text-sm truncate ${activeStorytellerId === storyteller.id ? 'font-bold' : ''}`}
          >
            {storyteller.name}
          </span>
        </button>
      ))}
    </div>
  );
};
