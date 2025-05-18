import Link from 'next/link';
import { Storyteller } from '@/lib/airtable.types';

interface StorytellerListProps {
  storytellers: Storyteller[];
}

export default function StorytellerList({ storytellers }: StorytellerListProps) {
  if (!storytellers || storytellers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No storytellers found.</p>
        <Link
          href="/storytellers/new"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Storyteller
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Link
          href="/storytellers/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Storyteller
        </Link>
      </div>
      <ul className="space-y-4">
        {storytellers.map(storyteller => (
          <li key={storyteller.id} className="border rounded p-4 hover:shadow">
            <Link
              href={`/storytellers/${storyteller.id}`}
              className="text-xl font-semibold hover:underline"
            >
              {storyteller.name || 'Unnamed Storyteller'}
            </Link>
            {storyteller.bio && <div className="text-sm text-gray-500 mt-1">{storyteller.bio}</div>}
            {storyteller.location && (
              <div className="text-sm text-gray-700 mt-1">Location: {storyteller.location}</div>
            )}
            {storyteller.website && (
              <div className="text-sm text-gray-700 mt-1">
                Website:{' '}
                <a
                  href={storyteller.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {storyteller.website}
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
