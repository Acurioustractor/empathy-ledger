import { Theme } from '@/lib/airtable.types';

interface ThemeDetailProps {
  theme: Theme;
}

export default function ThemeDetail({ theme }: ThemeDetailProps) {
  return (
    <div className="border rounded p-6 shadow">
      <h1 className="text-2xl font-bold mb-2">{theme.themeName || 'Untitled Theme'}</h1>
      {theme.description && (
        <div className="mb-2">
          <span className="font-semibold">Description:</span> {theme.description}
        </div>
      )}
      {theme.relatedMedia && theme.relatedMedia.length > 0 && (
        <div className="mb-2">
          <span className="font-semibold">Related Media:</span>
          <ul className="list-disc ml-6">
            {theme.relatedMedia.map((media, idx) => (
              <li key={idx}>{media}</li>
            ))}
          </ul>
        </div>
      )}
      {theme.quotesFromRelatedMedia && theme.quotesFromRelatedMedia.length > 0 && (
        <div className="mb-2">
          <span className="font-semibold">Quotes (from Related Media):</span>
          <ul className="list-disc ml-6">
            {theme.quotesFromRelatedMedia.map((quote, idx) => (
              <li key={idx}>{quote}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Add more fields as needed */}
    </div>
  );
}
