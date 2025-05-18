import Link from 'next/link';
import { Shift } from '@/lib/airtable.types';

interface ShiftListProps {
  shifts: Shift[];
}

export default function ShiftList({ shifts }: ShiftListProps) {
  if (!shifts || shifts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No shifts found.</p>
        <Link
          href="/shifts/new"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Shift
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Link
          href="/shifts/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Shift
        </Link>
      </div>
      <ul className="space-y-4">
        {shifts.map(shift => (
          <li key={shift.id} className="border rounded p-4 hover:shadow">
            <Link href={`/shifts/${shift.id}`} className="text-xl font-semibold hover:underline">
              {shift.name || 'Unnamed Shift'}
            </Link>
            {shift.date && <div className="text-sm text-gray-700 mt-1">Date: {shift.date}</div>}
            {shift.storyteller && (
              <div className="text-sm text-gray-700 mt-1">Storyteller: {shift.storyteller}</div>
            )}
            {shift.theme && <div className="text-sm text-gray-700 mt-1">Theme: {shift.theme}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
