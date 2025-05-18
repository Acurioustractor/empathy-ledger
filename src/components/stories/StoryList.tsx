import React from 'react';
import StoryCard from './StoryCard';
import Link from 'next/link';
import { AirtableStory } from '@/lib/airtable-types';

interface StoryForList extends AirtableStory {
  storytellerName?: string;
}

interface StoryListProps {
  stories: StoryForList[];
  title?: string;
  description?: string;
  showFilters?: boolean;
}

const StoryList = ({ stories }: StoryListProps) => {
  if (!stories || stories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No stories found.</p>
        <Link
          href="/stories/new"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Share Your Story
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Link
          href="/stories/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Share Your Story
        </Link>
      </div>
      <ul className="space-y-4">
        {stories.map(story => (
          <li key={story.id}>
            <StoryCard story={story} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoryList;
