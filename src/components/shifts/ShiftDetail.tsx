import { Shift } from '@/lib/airtable.types';

interface ShiftDetailProps {
  shift: Shift;
}

export default function ShiftDetail({ shift }: ShiftDetailProps) {
  return (
    <div className="border rounded p-6 shadow">
      <h1 className="text-2xl font-bold mb-2">{shift.name || 'Unnamed Shift'}</h1>
      {shift.date && (
        <div className="mb-2">
          <span className="font-semibold">Date:</span> {shift.date}
        </div>
      )}
      {shift.day && (
        <div className="mb-2">
          <span className="font-semibold">Day:</span> {shift.day}
        </div>
      )}
      {shift.state && (
        <div className="mb-2">
          <span className="font-semibold">State:</span> {shift.state}
        </div>
      )}
      {shift.address && (
        <div className="mb-2">
          <span className="font-semibold">Address:</span> {shift.address}
        </div>
      )}
      {shift.contactPerson && (
        <div className="mb-2">
          <span className="font-semibold">Contact Person:</span> {shift.contactPerson}
        </div>
      )}
      {shift.contactPersonEmail && (
        <div className="mb-2">
          <span className="font-semibold">Contact Email:</span> {shift.contactPersonEmail}
        </div>
      )}
      {shift.contactPersonPhoneNumber && (
        <div className="mb-2">
          <span className="font-semibold">Contact Phone:</span> {shift.contactPersonPhoneNumber}
        </div>
      )}
      {shift.notes && (
        <div className="mb-2">
          <span className="font-semibold">Notes:</span> {shift.notes}
        </div>
      )}
      {/* Add more fields as needed */}
    </div>
  );
}
