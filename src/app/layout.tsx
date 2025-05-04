import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Empathy Ledger',
  description: 'Transforming how stories create impact through dignity, agency, and ethical value exchange',
  keywords: ['storytelling', 'empathy', 'social impact', 'ethical technology', 'narrative exchange'],
  authors: [{ name: 'Empathy Ledger Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#5c6bc0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
} 