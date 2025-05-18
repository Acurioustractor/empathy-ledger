import { Quote } from '@/lib/airtable.types';

interface QuoteDetailProps {
  quote: Quote;
}

export default function QuoteDetail({ quote }: QuoteDetailProps) {
  return (
    <div className="border rounded p-6 shadow">
      <h1 className="text-2xl font-bold mb-2">Quote</h1>
      {quote.quoteText && (
        <div className="mb-2">
          <span className="font-semibold">Text:</span> {quote.quoteText}
        </div>
      )}
      {quote.theme && (
        <div className="mb-2">
          <span className="font-semibold">Theme:</span> {quote.theme}
        </div>
      )}
      {quote.transcriptReference && quote.transcriptReference.length > 0 && (
        <div className="mb-2">
          <span className="font-semibold">Transcript Reference:</span>
          <ul className="list-disc ml-6">
            {quote.transcriptReference.map((ref, idx) => (
              <li key={idx}>{ref}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Add more fields as needed */}
    </div>
  );
}
