import Link from 'next/link';
import { Theme } from '@/lib/airtable.types';

interface ThemeListProps {
  themes: Theme[];
}

export default function ThemeList({ themes }: ThemeListProps) {
  if (!themes || themes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No themes found.</p>
        <Link
          href="/themes/new"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Theme
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Link
          href="/themes/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Theme
        </Link>
      </div>
      <ul className="space-y-4">
        {themes.map(theme => (
          <li key={theme.id} className="border rounded p-4 hover:shadow">
            <Link href={`/themes/${theme.id}`} className="text-xl font-semibold hover:underline">
              {theme.themeName || 'Unnamed Theme'}
            </Link>
            {theme.description && (
              <div className="text-sm text-gray-500 mt-1">{theme.description}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
