import { Storyteller } from '@/lib/airtable.types';

interface StorytellerDetailProps {
  storyteller: Storyteller;
}

export default function StorytellerDetail({ storyteller }: StorytellerDetailProps) {
  return (
    <div className="border rounded p-6 shadow">
      <h1 className="text-2xl font-bold mb-2">{storyteller.name || 'Unnamed Storyteller'}</h1>
      {storyteller.location && (
        <div className="mb-2">
          <span className="font-semibold">Location:</span> {storyteller.location}
        </div>
      )}
      {storyteller.role && (
        <div className="mb-2">
          <span className="font-semibold">Role:</span> {storyteller.role}
        </div>
      )}
      {storyteller.organisation && (
        <div className="mb-2">
          <span className="font-semibold">Organisation:</span> {storyteller.organisation}
        </div>
      )}
      {storyteller.summaryFromMedia && storyteller.summaryFromMedia.length > 0 && (
        <div className="mb-2">
          <span className="font-semibold">Summary (from Media):</span>
          <ul className="list-disc ml-6">
            {storyteller.summaryFromMedia.map((summary, idx) => (
              <li key={idx}>{summary}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Add more fields as needed */}
    </div>
  );
}
