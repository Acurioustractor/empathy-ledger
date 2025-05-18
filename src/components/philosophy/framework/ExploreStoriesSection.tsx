import React, { useState } from 'react';
import { StorytellerWithStory } from '@/lib/airtable-wrappers';

interface ExploreStoriesSectionProps {
  heroes: StorytellerWithStory[];
}

export const ExploreStoriesSection: React.FC<ExploreStoriesSectionProps> = ({ heroes }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full max-w-3xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-indigo-900">
        Explore the Stories
      </h3>
      <div className="space-y-6">
        {heroes.map((h, idx) => {
          const story = h.story;
          if (!story) return null;
          const shift = Array.isArray(story['Shifts (from Storytellers)'])
            ? story['Shifts (from Storytellers)'][0]
            : story['Shifts (from Storytellers)'];
          return (
            <div key={h.id} className="border border-gray-200 rounded-xl shadow-sm bg-white">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-lg font-semibold text-left focus:outline-none focus:ring"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span>{story['Title'] || 'Untitled Story'}</span>
                {shift && (
                  <span className="ml-4 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                    {shift}
                  </span>
                )}
                <span className="ml-auto text-gray-400">{openIndex === idx ? '▲' : '▼'}</span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6">
                  {/* Video Embed */}
                  {story['Video Embed Code'] && (
                    <div
                      className="w-full mb-4 rounded overflow-hidden max-w-md mx-auto"
                      style={{ minHeight: 200 }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: story['Video Embed Code'] }} />
                    </div>
                  )}
                  {/* Transcript */}
                  {story['Story Transcript'] && (
                    <div className="bg-gray-50 border border-gray-200 rounded p-4 text-sm text-gray-700 whitespace-pre-line">
                      {story['Story Transcript']}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
