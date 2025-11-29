import Link from 'next/link';
import { MysticalBackground } from '@/components';

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-void-deep relative overflow-hidden">
      <MysticalBackground particleCount={20} speed={0.1} />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="max-w-md text-center animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
              />
            </svg>
          </div>

          <h1 className="text-2xl text-text-primary font-serif mb-3">
            You're offline
          </h1>

          <p className="text-text-muted text-sm font-serif mb-8">
            Your connection to the void has been severed. Reconnect to continue your journey.
          </p>

          <Link
            href="/"
            className="inline-block px-6 py-3 bg-accent/20 text-accent rounded-md font-serif text-sm hover:bg-accent/30 transition-colors"
          >
            Try again
          </Link>
        </div>
      </div>
    </main>
  );
}
