import Link from 'next/link';
import { Media } from '@/lib/airtable.types';

interface MediaListProps {
  media: Media[];
}

export default function MediaList({ media }: MediaListProps) {
  if (!media || media.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No media found.</p>
        <Link
          href="/media/new"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Media
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Link
          href="/media/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Media
        </Link>
      </div>
      <ul className="space-y-4">
        {media.map(item => (
          <li key={item.id} className="border rounded p-4 hover:shadow">
            <Link href={`/media/${item.id}`} className="text-xl font-semibold hover:underline">
              {item.fileName || 'Untitled Media'}
            </Link>
            {item.summary && <div className="text-sm text-gray-500 mt-1">{item.summary}</div>}
            {item.type && <div className="text-sm text-gray-700 mt-1">Type: {item.type}</div>}
            {item.storytellers && item.storytellers.length > 0 && (
              <div className="text-sm text-gray-700 mt-1">
                Storyteller ID: {item.storytellers[0]}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
