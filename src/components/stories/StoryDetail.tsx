import React from 'react';
import { StoryWithDetails } from '@/lib/airtable-wrappers';
import Image from 'next/image';

interface StoryDetailProps {
  story: StoryWithDetails;
}

export default function StoryDetail({ story }: StoryDetailProps) {
  // Story info
  const rawTitle = story.Title;
  const title = typeof rawTitle === 'string' || typeof rawTitle === 'number' ? rawTitle : 'Untitled Story';
  const rawCreated = story.Created || story.createdTime;
  const created = typeof rawCreated === 'string' || typeof rawCreated === 'number' ? rawCreated : '';
  const location = Array.isArray(story['Location (from Media)']) ? story['Location (from Media)'][0] : '';
  const keyQuote =
    story.displayQuoteText && !story.displayQuoteText.startsWith('rec')
      ? story.displayQuoteText
      : '';
  const rawThemes = story.Themes;
  const themes = Array.isArray(rawThemes) ? rawThemes : [];
  const rawImages = story['Story Image'];
  const images = Array.isArray(rawImages) ? rawImages : [];
  const videoEmbed = story['Video Embed Code'] || '';

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* Title */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
        <div className="flex items-center gap-2">
          {created && (
            <span className="text-sm text-gray-500">{new Date(created).toLocaleDateString()}</span>
          )}
          {location && (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              📍 {location}
            </span>
          )}
        </div>
      </section>

      {/* Key Quote */}
      {keyQuote && (
        <blockquote className="mb-8 p-4 border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700 italic text-xl font-medium">
          “{keyQuote}”
        </blockquote>
      )}

      {/* Story Images */}
      {images.length > 0 && (
        <section className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {images.map((img: { url?: string; width?: number; height?: number } | string, idx: number) => {
              const src = typeof img === 'string' ? img : img.url || '';
              // Fallback width/height for static export safety
              const width = typeof img === 'object' && img.width ? img.width : 800;
              const height = typeof img === 'object' && img.height ? img.height : 600;
              return (
                <Image
                  key={idx}
                  src={src}
                  alt={title + ' image'}
                  width={width}
                  height={height}
                  className="rounded-lg shadow max-h-96 object-cover"
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Themes */}
      {themes.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Themes</h3>
          <div className="flex flex-wrap gap-2">
            {themes.map((theme: { id?: string; themeName?: string } | string) => (
              <span
                key={typeof theme === 'string' ? theme : theme.id || ''}
                className="px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full"
              >
                {typeof theme === 'string' ? theme : theme.themeName || ''}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Video Embed */}
      {videoEmbed && (
        <section className="mb-8">
          <div className="aspect-video w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow">
            <div dangerouslySetInnerHTML={{ __html: videoEmbed }} />
          </div>
        </section>
      )}
    </div>
  );
}
