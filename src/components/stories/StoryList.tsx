import React from 'react';
import StoryCard from './StoryCard';

interface Story {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  createdAt: string;
  engagement?: {
    views: number;
    likes: number;
    comments: number;
  };
}

interface StoryListProps {
  stories: Story[];
  title?: string;
  description?: string;
  showFilters?: boolean;
}

const StoryList = ({
  stories,
  title,
  description,
  showFilters = false,
}: StoryListProps) => {
  return (
    <div className="space-y-8">
      {(title || description) && (
        <div className="text-center">
          {title && (
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      {showFilters && (
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-full hover:bg-primary-100">
            All Stories
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600">
            Most Recent
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600">
            Most Popular
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600">
            By Category
          </button>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <StoryCard key={story.id} {...story} />
        ))}
      </div>
    </div>
  );
};

export default StoryList; 