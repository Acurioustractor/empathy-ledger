import Link from 'next/link';
import { Gallery } from '@/lib/airtable.types';

interface GalleryListProps {
  galleries: Gallery[];
}

export default function GalleryList({ galleries }: GalleryListProps) {
  if (!galleries || galleries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No galleries found.</p>
        <Link
          href="/galleries/new"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Link
          href="/galleries/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Gallery
        </Link>
      </div>
      <ul className="space-y-4">
        {galleries.map(gallery => (
          <li key={gallery.id} className="border rounded p-4 hover:shadow">
            <Link
              href={`/galleries/${gallery.id}`}
              className="text-xl font-semibold hover:underline"
            >
              {gallery.name || 'Unnamed Gallery'}
            </Link>
            {gallery.description && (
              <div className="text-sm text-gray-500 mt-1">{gallery.description}</div>
            )}
            {gallery.media && gallery.media.length > 0 && (
              <div className="text-sm text-gray-700 mt-1">Media Count: {gallery.media.length}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
