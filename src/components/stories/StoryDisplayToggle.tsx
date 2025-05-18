'use client';

import React, { useState } from 'react';
import StoryList from './StoryList'; // Uses StoryCard (image-left)
import FeaturedStoryCard from './FeaturedStoryCard'; // Image-top card for grid
import { AirtableStory } from '@/lib/airtable-types'; // Assuming StoryWithDetails is compatible or use a broader type

// Define a more specific type for stories passed, including potentially fetched details
interface StoryWithDetails extends AirtableStory {
  storytellerName?: string;
  displayQuoteText?: string;
  displayShiftName?: string;
}

interface StoryDisplayToggleProps {
  stories: StoryWithDetails[];
}

// Basic SVG Icons for Toggle (Consider using a library like Heroicons or Lucide for better icons)
const ListIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const GridIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

export default function StoryDisplayToggle({ stories }: StoryDisplayToggleProps) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  return (
    <div>
      <div className="flex justify-end items-center mb-4 pr-1">
        <p className="text-sm text-gray-600 mr-3">View as:</p>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 text-sm font-medium rounded-l-md border transition-colors 
              ${
                viewMode === 'list'
                  ? 'bg-indigo-600 text-white border-indigo-600 z-10'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            aria-pressed={viewMode === 'list'}
          >
            <ListIcon />
            <span className="sr-only">List view</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 text-sm font-medium rounded-r-md border border-l-0 transition-colors 
              ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white border-indigo-600 z-10'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            aria-pressed={viewMode === 'grid'}
          >
            <GridIcon />
            <span className="sr-only">Grid view</span>
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <StoryList stories={stories} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {stories.map(story => (
            <FeaturedStoryCard story={story} key={story.id} />
          ))}
        </div>
      )}
    </div>
  );
}
