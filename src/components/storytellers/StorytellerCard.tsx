import React from 'react';
import Link from 'next/link';
import { AirtableStoryteller } from '@/lib/airtable-types';

interface StorytellerCardProps {
  storyteller: AirtableStoryteller;
}

const StorytellerCard = ({ storyteller }: StorytellerCardProps) => {
  const { id, Name, Location, Project, Role } = storyteller;
  const avatarUrl = Array.isArray(storyteller['File Profile Image']) && (storyteller['File Profile Image'][0] as { url?: string })?.url;

  return (
    <article className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out w-full border border-gray-200 min-h-[160px]">
      {/* Avatar Section */}
      <div className="md:w-1/4 lg:w-1/5 flex-shrink-0 flex items-center justify-center p-4 md:p-0 bg-indigo-50 md:bg-transparent">
        <Link href={`/storytellers/${id}`} className="block group">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={Name || 'Storyteller'}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover transition-transform duration-300 group-hover:scale-105 border-4 border-white md:border-transparent md:shadow-md"
            />
          ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center">
              <span className="text-4xl md:text-5xl text-indigo-500 font-light">
                {(Name || 'S').charAt(0)}
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1 leading-tight">
          <Link href={`/storytellers/${id}`} className="hover:text-indigo-700 transition-colors">
            {Name || 'Unnamed Storyteller'}
          </Link>
        </h2>

        {Role && <p className="text-sm font-medium text-purple-600 mb-2">{Role}</p>}

        <div className="flex flex-wrap gap-x-4 gap-y-1 items-center text-xs text-gray-600 mb-3">
          {Location && (
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 mr-1 text-teal-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {Location}
            </span>
          )}
          {Project && (
            <span className="flex items-center">
              {/* Consider a project icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 mr-1 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a1 1 0 000-2H4a1 1 0 000 2zm0 8h3a1 1 0 100-2H4a1 1 0 100 2zm0 4h3a1 1 0 100-2H4a1 1 0 100 2zm8-4a1 1 0 100-2h-3a1 1 0 100 2h3zm4-4h-3a1 1 0 100 2h3a1 1 0 100-2zm0 8h-3a1 1 0 100 2h3a1 1 0 100-2z" />
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-1 1v1H5a1 1 0 000 2h3v10h2V6h3a1 1 0 100-2h-3V3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {Project}
            </span>
          )}
        </div>

        <div className="mt-auto pt-2">
          <Link
            href={`/storytellers/${id}`}
            className="group inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View Profile & Stories
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

export default StorytellerCard;
