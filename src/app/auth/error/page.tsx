import Link from 'next/link';
import { MysticalBackground } from '@/components';

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen bg-void-deep relative overflow-hidden">
      <MysticalBackground particleCount={40} speed={0.2} />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="max-w-md text-center animate-fade-in">
          <h1 className="text-2xl text-text-primary font-serif mb-3">
            Authentication Failed
          </h1>

          <p className="text-text-muted text-sm font-serif mb-8">
            Your magic link has expired or is invalid. Please request a new one.
          </p>

          <Link
            href="/"
            className="inline-block px-6 py-3 bg-accent/20 text-accent rounded-md font-serif text-sm hover:bg-accent/30 transition-colors"
          >
            Return to Ledger
          </Link>
        </div>
      </div>
    </main>
  );
}
