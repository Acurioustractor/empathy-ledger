import { Gallery } from '@/lib/airtable.types';

interface GalleryDetailProps {
  gallery: Gallery;
}

export default function GalleryDetail({ gallery }: GalleryDetailProps) {
  return (
    <div className="border rounded p-6 shadow">
      <h1 className="text-2xl font-bold mb-2">{gallery.galleryName || 'Untitled Gallery'}</h1>
      {gallery.shootDate && (
        <div className="mb-2">
          <span className="font-semibold">Shoot Date:</span> {gallery.shootDate}
        </div>
      )}
      {gallery.galleryType && (
        <div className="mb-2">
          <span className="font-semibold">Type:</span> {gallery.galleryType}
        </div>
      )}
      {gallery.link && (
        <div className="mb-2">
          <span className="font-semibold">Link:</span>{' '}
          <a
            href={gallery.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {gallery.link}
          </a>
        </div>
      )}
      {gallery.media && gallery.media.length > 0 && (
        <div className="mb-2">
          <span className="font-semibold">Media:</span>
          <ul className="list-disc ml-6">
            {gallery.media.map((media, idx) => (
              <li key={idx}>{media}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Add more fields as needed */}
    </div>
  );
}
