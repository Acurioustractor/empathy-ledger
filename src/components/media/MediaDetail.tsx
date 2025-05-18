import { Media } from '@/lib/airtable.types';

interface MediaDetailProps {
  media: Media;
}

export default function MediaDetail({ media }: MediaDetailProps) {
  return (
    <div className="border rounded p-6 shadow">
      <h1 className="text-2xl font-bold mb-2">{media.fileName || 'Untitled Media'}</h1>
      {media.type && (
        <div className="mb-2">
          <span className="font-semibold">Type:</span> {media.type}
        </div>
      )}
      {media.createdAt && (
        <div className="mb-2">
          <span className="font-semibold">Created:</span> {media.createdAt}
        </div>
      )}
      {media.location && (
        <div className="mb-2">
          <span className="font-semibold">Location:</span> {media.location}
        </div>
      )}
      {media.transcript && (
        <div className="mb-2">
          <span className="font-semibold">Transcript:</span>
          <div className="whitespace-pre-line bg-gray-50 p-2 rounded mt-1">{media.transcript}</div>
        </div>
      )}
      {media.audio && media.audio.length > 0 && (
        <div className="mb-2">
          <span className="font-semibold">Audio:</span>
          <ul className="list-disc ml-6">
            {media.audio.map((audio, idx) => (
              <li key={idx}>
                <a
                  href={audio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Audio File {idx + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Add more fields as needed */}
    </div>
  );
}
