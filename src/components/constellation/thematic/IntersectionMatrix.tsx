import React from 'react';
import { Storyteller, Theme } from './StorytellerLegend'; // Assuming Storyteller and Theme types are here

export interface StorytellerThemeIntersection {
  storytellerId: string; // ID of the storyteller
  theme: Theme; // Full theme object
  count: number; // Number of media items linking this storyteller to this theme
}

interface IntersectionMatrixProps {
  intersections: StorytellerThemeIntersection[];
  activeStoryteller: Storyteller | null; // Pass the full active storyteller object
}

export const IntersectionMatrix: React.FC<IntersectionMatrixProps> = ({
  intersections,
  activeStoryteller,
}) => {
  if (!activeStoryteller) {
    return (
      <div className="my-16 p-8 bg-gray-800/30 rounded-lg text-center text-gray-400">
        Select a storyteller to see their theme connections.
      </div>
    );
  }

  // Filter intersections for the currently active storyteller
  const relevantIntersections = intersections
    .filter(i => i.storytellerId === activeStoryteller.id)
    .sort((a, b) => b.count - a.count); // Sort by count for this storyteller

  if (!relevantIntersections || relevantIntersections.length === 0) {
    return (
      <div className="my-16 p-8 bg-gray-800/30 rounded-lg text-center text-gray-400">
        No direct theme connections found for {activeStoryteller.name}.
      </div>
    );
  }

  return (
    <div className="my-16 mx-4 md:mx-auto max-w-6xl bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-amber-400">
        Theme Connections for{' '}
        <span style={{ color: activeStoryteller.color }}>{activeStoryteller.name}</span>
      </h2>
      <p className="text-center text-sm text-gray-400 mb-8">
        Themes most frequently associated with this storyteller through their media.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {relevantIntersections.slice(0, 9).map((intersection, index) => (
          <div
            key={`${activeStoryteller.id}-${intersection.theme.id}-${index}`}
            className="bg-gray-800/60 rounded-lg p-4 border border-gray-600/70 shadow-md hover:bg-gray-700/60 transition-colors duration-200 flex flex-col items-center"
          >
            <div className="text-sm text-center text-gray-200 leading-tight font-semibold">
              <span>{intersection.theme.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
