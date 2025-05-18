import React from 'react';

// Define Storyteller structure (should align with what StorytellerExplorerView provides)
export interface Storyteller {
  rawMediaIds: string[];
  id: string;
  name: string;
  color: string; // Color assigned to the storyteller
  avatarUrl?: string; // Optional avatar URL
  description?: string; // e.g., Bio
  // Add other relevant fields that might be used by the legend or selector
  themes: Theme[];
  quotes: VisualQuote[];
  themeCount?: number;
  quoteCount?: number;
  mediaCount?: number;
  storyCount?: number;
}

// New Theme type for clarity if themes are also directly visualized or listed
export interface Theme {
  id: string;
  name: string;
  color: string;
  description?: string;
  stories?: number;
}

export interface VisualQuote {
  id: string;
  name: string;
  color: string;
}

interface StorytellerLegendProps {
  storytellers: Storyteller[];
}

export const StorytellerLegend: React.FC<StorytellerLegendProps> = ({ storytellers }) => {
  if (!storytellers || storytellers.length === 0) {
    return null;
  }

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-gray-900/80 backdrop-blur-md rounded-lg p-4 border border-gray-700 z-50 shadow-lg max-h-[70vh] overflow-y-auto">
      <h3 className="text-sm font-semibold text-amber-400 mb-3 sticky top-0 bg-gray-900/80 py-2">
        Storyteller Legend
      </h3>
      <ul className="space-y-2">
        {storytellers.map(storyteller => (
          <li key={storyteller.id} className="flex items-center text-xs text-gray-200">
            {storyteller.avatarUrl ? (
              <img
                src={storyteller.avatarUrl}
                alt={storyteller.name}
                className="w-4 h-4 rounded-full mr-2 border border-white/30 object-cover"
              />
            ) : (
              <span
                className="w-4 h-4 rounded-full mr-2 border border-white/30 flex-shrink-0"
                style={{ backgroundColor: storyteller.color }}
              />
            )}
            {storyteller.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
