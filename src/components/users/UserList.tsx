import Link from 'next/link';
import { User } from '@/lib/airtable.types';

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  if (!users || users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No users found.</p>
        <Link
          href="/users/new"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Create New User
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Link
          href="/users/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Create New User
        </Link>
      </div>
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user.id} className="border rounded p-4 hover:shadow">
            <Link href={`/users/${user.id}`} className="text-xl font-semibold hover:underline">
              {user.name || 'Unnamed User'}
            </Link>
            {user.email && <div className="text-sm text-gray-500">Email: {user.email}</div>}
            {user.location && (
              <div className="text-sm text-gray-700 mt-1">Location: {user.location}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
