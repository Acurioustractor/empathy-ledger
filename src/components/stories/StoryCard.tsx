import React from 'react';
import Link from 'next/link';
import { StoryWithDetails } from '@/lib/airtable-wrappers';
import Image from 'next/image';

interface StoryCardProps {
  story: StoryWithDetails;
}

const StoryCard = ({ story }: StoryCardProps) => {
  const {
    id,
    Title,
    storytellerName,
    displayQuoteText,
    Status,
    createdTime,
    Created,
    displayShiftName,
  } = story;

  // ---- START DEBUGGING IMAGE SOURCE ----
  const storyImageField = story['Story Image'];
  const storytellerAvatarField = story['File Profile Image (from Storytellers) (from Media)'];

  // **IMPORTANT**: Replace 'ID_OF_STORY_SHOWING_WRONG_IMAGE' with an actual story.id
  // value from a card that is displaying the incorrect image.
  // For example, if Freddy Wai's card (ID 'recPqX...') is wrong, use that.
  const targetDebugStoryId = 'ID_OF_STORY_SHOWING_WRONG_IMAGE'; // <--- REPLACE THIS ID

  if (id === targetDebugStoryId) {
    console.log(`--- Debugging Image for Story ID: ${id} ---`);
    console.log('Story["Story Image"]:', storyImageField);
    console.log(
      'Story["File Profile Image (from Storytellers) (from Media)"]:',
      storytellerAvatarField
    );
  }
  // ---- END DEBUGGING IMAGE SOURCE ----

  const cardImage =
    (Array.isArray(storyImageField) && (storyImageField[0] as { url?: string })?.url) ||
    (Array.isArray(storytellerAvatarField) && (storytellerAvatarField[0] as { url?: string })?.url);
  const imageAlt = Title || 'Empathy Ledger Story';

  const excerpt = story['Story copy']?.substring(0, 100) + '...' || '';
  const displayDate = createdTime || Created || '';
  const keyQuote = displayQuoteText || null;
  const location = Array.isArray(story['Location (from Media)']) ? story['Location (from Media)'][0] : null;
  const statusTag = Status || null;
  const shiftTag = displayShiftName || null;

  const contentToShow = keyQuote || excerpt;

  return (
    <article className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out w-full border border-gray-200 min-h-[240px] md:min-h-[200px]">
      {/* Image Section - md:w-1/3 */}
      <div className="md:w-1/3 flex-shrink-0 relative">
        <Link href={`/stories/${id}`} className="block w-full h-48 md:h-full group">
          {cardImage ? (
            <Image
              src={cardImage}
              alt={imageAlt}
              width={400}
              height={300}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
              <span className="text-5xl text-indigo-400 font-light opacity-75">
                {(Title || 'S').charAt(0)}
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Content Section - flex-1 takes remaining space */}
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
        <div>
          <div className="mb-2 md:mb-2.5">
            {storytellerName && storytellerName !== 'Unknown' && (
              <p className="text-xs sm:text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition-colors uppercase tracking-wider">
                {storytellerName}
              </p>
            )}
            {displayDate && (
              <p
                className={`text-xs text-gray-500 ${storytellerName && storytellerName !== 'Unknown' ? 'mt-0.5' : ''}`}
              >
                {new Date(displayDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 md:mb-3 leading-tight">
            <Link href={`/stories/${id}`} className="hover:text-purple-700 transition-colors">
              {Title || 'Untitled Story'}
            </Link>
          </h2>

          {contentToShow && (
            <p
              className={`mb-3 md:mb-4 text-sm ${keyQuote ? 'italic text-gray-700 border-l-4 border-purple-300 pl-3 py-1 bg-purple-50/50 rounded-r-md' : 'text-gray-600 line-clamp-3'}`}
            >
              {keyQuote ? `"${contentToShow}"` : contentToShow}
            </p>
          )}

          {(statusTag || location || shiftTag) && (
            <div className="flex flex-wrap gap-2 mb-3 md:mb-4 items-center text-xs">
              {statusTag && (
                <span
                  className={`px-2.5 py-1 font-medium rounded-full 
                    ${
                      statusTag === 'Published'
                        ? 'bg-green-100 text-green-800'
                        : statusTag === 'Draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-700'
                    }
                  `}
                >
                  {statusTag}
                </span>
              )}
              {location && (
                <span className="flex items-center px-2.5 py-1 font-medium text-teal-800 bg-teal-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {location}
                </span>
              )}
              {shiftTag && (
                <span className="flex items-center px-2.5 py-1 font-medium text-blue-800 bg-blue-100 rounded-full">
                  {shiftTag}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-auto pt-3 md:pt-4">
          <Link
            href={`/stories/${id}`}
            className="group inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Read Full Story
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default StoryCard;
