'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MysticalBackground } from '@/components';

interface StorytellerData {
  id: string;
  email: string;
  name?: string;
  magicLink: string;
  qrCode: string;
  accessCode: string;
}

export default function AdminPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StorytellerData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/storytellers/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create storyteller');
      }

      setResult(data);
      // Clear form
      setName('');
      setEmail('');
      setPhone('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const downloadQR = () => {
    if (!result) return;

    const link = document.createElement('a');
    link.download = `storyteller-${result.accessCode}-qr.png`;
    link.href = result.qrCode;
    link.click();
  };

  const sendSMS = async () => {
    if (!result) return;
    // TODO: Implement SMS via Twilio
    alert('SMS feature coming soon!');
  };

  return (
    <main className="min-h-screen bg-void-deep relative overflow-hidden">
      <MysticalBackground particleCount={30} speed={0.15} />

      <div className="relative z-10 px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl text-text-primary font-serif mb-2">
            Artist Admin Panel
          </h1>
          <p className="text-text-muted text-sm font-serif mb-12">
            Create storyteller accounts and generate access links
          </p>

          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-text-muted text-sm font-serif mb-2">
                  Name (optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-void-deep border border-accent/20 rounded-md px-4 py-3 text-text-primary font-serif outline-none focus:border-accent transition-colors"
                  placeholder="Soul's name"
                />
              </div>

              <div>
                <label className="block text-text-muted text-sm font-serif mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-void-deep border border-accent/20 rounded-md px-4 py-3 text-text-primary font-serif outline-none focus:border-accent transition-colors"
                  placeholder="storyteller@example.com"
                />
              </div>

              <div>
                <label className="block text-text-muted text-sm font-serif mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-void-deep border border-accent/20 rounded-md px-4 py-3 text-text-primary font-serif outline-none focus:border-accent transition-colors"
                  placeholder="+1 234 567 8900"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                  <p className="text-red-400 text-sm font-serif">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full px-6 py-4 bg-accent text-void-deep rounded-md font-serif font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90"
              >
                {loading ? 'Creating...' : 'Generate Access'}
              </button>
            </form>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 bg-accent/5 border border-accent/20 rounded-lg">
                <h2 className="text-xl text-text-primary font-serif mb-4">
                  Storyteller Created
                </h2>

                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-text-faint text-xs font-serif">Email:</span>
                    <p className="text-text-primary font-serif">{result.email}</p>
                  </div>
                  {result.name && (
                    <div>
                      <span className="text-text-faint text-xs font-serif">Name:</span>
                      <p className="text-text-primary font-serif">{name}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-text-faint text-xs font-serif">Access Code:</span>
                    <p className="text-accent font-serif font-mono">{result.accessCode}</p>
                  </div>
                </div>

                {/* QR Code */}
                <div className="mb-6 p-4 bg-void-deep rounded-lg">
                  <Image
                    src={result.qrCode}
                    alt="QR Code"
                    width={300}
                    height={300}
                    className="mx-auto"
                  />
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={downloadQR}
                    className="w-full px-4 py-3 bg-accent text-void-deep rounded-md font-serif text-sm hover:bg-accent/90 transition-colors"
                  >
                    Download QR Code
                  </button>

                  <button
                    onClick={() => copyToClipboard(result.magicLink)}
                    className="w-full px-4 py-3 bg-accent/20 text-accent rounded-md font-serif text-sm hover:bg-accent/30 transition-colors"
                  >
                    Copy Magic Link
                  </button>

                  <button
                    onClick={sendSMS}
                    className="w-full px-4 py-3 bg-accent/10 text-accent rounded-md font-serif text-sm hover:bg-accent/20 transition-colors"
                  >
                    Send via SMS
                  </button>
                </div>
              </div>

              <button
                onClick={() => setResult(null)}
                className="w-full px-4 py-3 text-text-muted font-serif text-sm hover:text-text-primary transition-colors"
              >
                Create Another
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
