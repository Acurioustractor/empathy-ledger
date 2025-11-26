import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Empathy Ledger',
  description: 'These stories are here by choice. They may leave at any time.',
  keywords: ['art', 'exhibition', 'empathy', 'portraits', 'consent', 'stories'],
  authors: [{ name: 'The Empathy Ledger' }],
  openGraph: {
    title: 'The Empathy Ledger',
    description: 'These stories are here by choice. They may leave at any time.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0908',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
