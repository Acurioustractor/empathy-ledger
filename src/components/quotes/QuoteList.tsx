import Link from 'next/link';
import { Quote } from '@/lib/airtable.types';

interface QuoteListProps {
  quotes: Quote[];
}

export default function QuoteList({ quotes }: QuoteListProps) {
  if (!quotes || quotes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No quotes found.</p>
        <Link
          href="/quotes/new"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Quote
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Link
          href="/quotes/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Quote
        </Link>
      </div>
      <ul className="space-y-4">
        {quotes.map(quote => (
          <li key={quote.id} className="border rounded p-4 hover:shadow">
            <Link href={`/quotes/${quote.id}`} className="text-lg font-medium hover:underline">
              {quote.text || 'Untitled Quote'}
            </Link>
            {quote.author && (
              <div className="text-sm text-gray-700 mt-1">Author: {quote.author}</div>
            )}
            {quote.theme && <div className="text-sm text-gray-700 mt-1">Theme: {quote.theme}</div>}
            {quote.story && <div className="text-sm text-gray-700 mt-1">Story: {quote.story}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
