'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { MysticalBackground } from '@/components';
import { PhotoUpload } from '@/components/PhotoUpload';
import { supabase } from '@/lib/supabase';
import type { Portrait } from '@/lib/database.types';

export default function AdminPage() {
  const [portraits, setPortraits] = useState<Portrait[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newPortrait, setNewPortrait] = useState({
    imageUrl: '',
    name: '',
    storytellerId: '',
  });
  const [createdPortrait, setCreatedPortrait] = useState<{
    accessCode: string;
    dashboardUrl: string;
  } | null>(null);

  // Fetch all portraits (including hidden)
  const fetchPortraits = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('portraits')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortraits(data || []);
    } catch (err) {
      console.error('Failed to fetch portraits:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortraits();
  }, [fetchPortraits]);

  // Create new portrait
  const handleCreatePortrait = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPortrait.imageUrl || !newPortrait.storytellerId) {
      alert('Image URL and Storyteller ID are required');
      return;
    }

    setUploading(true);
    try {
      const response = await fetch('/api/portraits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: newPortrait.imageUrl,
          name: newPortrait.name || null,
          storytellerId: newPortrait.storytellerId,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setCreatedPortrait({
        accessCode: data.accessCode,
        dashboardUrl: data.dashboardUrl,
      });

      setNewPortrait({ imageUrl: '', name: '', storytellerId: '' });
      fetchPortraits();
    } catch (err) {
      console.error('Failed to create portrait:', err);
      alert('Failed to create portrait');
    } finally {
      setUploading(false);
    }
  };

  // Toggle visibility
  const handleToggleVisibility = async (portrait: Portrait) => {
    try {
      await fetch('/api/portraits', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessCode: portrait.access_code,
          visible: !portrait.visible,
        }),
      });
      fetchPortraits();
    } catch (err) {
      console.error('Failed to toggle visibility:', err);
    }
  };

  return (
    <main className="min-h-screen bg-void-deep relative overflow-hidden">
      <MysticalBackground particleCount={30} speed={0.15} />

      <div className="relative z-10 px-8 py-12">
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-12">
          <Link
            href="/"
            className="text-text-faint text-xs font-serif hover:text-text-muted transition-colors"
          >
            ← return to the ledger
          </Link>
          <h1 className="text-2xl text-text-primary font-serif mt-6 mb-2">
            exhibition admin
          </h1>
          <p className="text-text-muted text-sm font-serif">
            manage portraits and storytellers
          </p>
        </header>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Add new portrait */}
          <div
            className="rounded-xl p-6"
            style={{
              background: 'linear-gradient(145deg, #12100e 0%, #0a0908 100%)',
              border: '1px solid rgba(232, 196, 124, 0.1)',
            }}
          >
            <h2 className="text-lg text-text-primary font-serif mb-6">
              add new portrait
            </h2>

            <form onSubmit={handleCreatePortrait} className="space-y-4">
              <div>
                <label className="block text-text-muted text-sm font-serif mb-2">
                  Portrait Photo *
                </label>
                {newPortrait.imageUrl ? (
                  <div className="flex items-center gap-4 p-3 bg-void-light rounded border border-accent/20">
                    <div className="relative w-16 h-20 rounded overflow-hidden bg-void-deep flex-shrink-0">
                      <img
                        src={newPortrait.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-accent text-sm font-serif">photo uploaded ✓</p>
                      <button
                        type="button"
                        onClick={() => setNewPortrait({ ...newPortrait, imageUrl: '' })}
                        className="text-text-faint text-xs hover:text-text-muted mt-1"
                      >
                        remove & upload different
                      </button>
                    </div>
                  </div>
                ) : (
                  <PhotoUpload
                    onUploadComplete={(url) =>
                      setNewPortrait({ ...newPortrait, imageUrl: url })
                    }
                  />
                )}
              </div>

              <div>
                <label className="block text-text-muted text-sm font-serif mb-2">
                  Name (private, for reference)
                </label>
                <input
                  type="text"
                  value={newPortrait.name}
                  onChange={(e) =>
                    setNewPortrait({ ...newPortrait, name: e.target.value })
                  }
                  placeholder="Soul name..."
                  className="w-full bg-void-light border border-accent/20 rounded px-4 py-3 text-text-primary text-sm font-serif outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-text-muted text-sm font-serif mb-2">
                  Storyteller ID * (email or unique identifier)
                </label>
                <input
                  type="text"
                  value={newPortrait.storytellerId}
                  onChange={(e) =>
                    setNewPortrait({ ...newPortrait, storytellerId: e.target.value })
                  }
                  placeholder="storyteller@email.com"
                  className="w-full bg-void-light border border-accent/20 rounded px-4 py-3 text-text-primary text-sm font-serif outline-none focus:border-accent transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full py-3 rounded text-sm font-serif transition-all disabled:opacity-50"
                style={{
                  backgroundColor: 'rgba(232, 196, 124, 0.2)',
                  color: '#e8c47c',
                }}
              >
                {uploading ? 'creating...' : 'create portrait'}
              </button>
            </form>

            {/* Success message with access code */}
            {createdPortrait && (
              <div
                className="mt-6 p-4 rounded-lg"
                style={{
                  backgroundColor: 'rgba(232, 196, 124, 0.1)',
                  border: '1px solid rgba(232, 196, 124, 0.2)',
                }}
              >
                <p className="text-accent text-sm font-serif mb-2">
                  Portrait created successfully!
                </p>
                <p className="text-text-muted text-xs font-serif mb-1">
                  Access code: <span className="text-text-primary">{createdPortrait.accessCode}</span>
                </p>
                <p className="text-text-muted text-xs font-serif">
                  Dashboard:{' '}
                  <Link href={createdPortrait.dashboardUrl} className="text-accent hover:underline">
                    {createdPortrait.dashboardUrl}
                  </Link>
                </p>
                <button
                  onClick={() => setCreatedPortrait(null)}
                  className="mt-3 text-text-faint text-xs hover:text-text-muted"
                >
                  dismiss
                </button>
              </div>
            )}
          </div>

          {/* Stats overview */}
          <div
            className="rounded-xl p-6"
            style={{
              background: 'linear-gradient(145deg, #12100e 0%, #0a0908 100%)',
              border: '1px solid rgba(232, 196, 124, 0.1)',
            }}
          >
            <h2 className="text-lg text-text-primary font-serif mb-6">
              exhibition stats
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-text-muted font-serif">total portraits</span>
                <span className="text-text-primary font-serif">{portraits.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted font-serif">visible</span>
                <span className="text-text-primary font-serif">
                  {portraits.filter((p) => p.visible).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted font-serif">withdrawn</span>
                <span className="text-text-primary font-serif">
                  {portraits.filter((p) => !p.visible).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted font-serif">total views</span>
                <span className="text-text-primary font-serif">
                  {portraits.reduce((sum, p) => sum + p.views, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted font-serif">total engagements</span>
                <span className="text-text-primary font-serif">
                  {portraits.reduce((sum, p) => sum + p.clicks, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* All portraits */}
        <div className="max-w-4xl mx-auto mt-8">
          <div
            className="rounded-xl p-6"
            style={{
              background: 'linear-gradient(145deg, #12100e 0%, #0a0908 100%)',
              border: '1px solid rgba(232, 196, 124, 0.1)',
            }}
          >
            <h2 className="text-lg text-text-primary font-serif mb-6">
              all portraits ({portraits.length})
            </h2>

            {loading ? (
              <p className="text-text-muted text-sm font-serif">loading...</p>
            ) : portraits.length === 0 ? (
              <p className="text-text-muted text-sm font-serif italic">
                no portraits yet
              </p>
            ) : (
              <div className="space-y-4">
                {portraits.map((portrait) => (
                  <div
                    key={portrait.id}
                    className="flex items-center gap-4 p-4 rounded-lg"
                    style={{
                      backgroundColor: 'rgba(26, 24, 22, 0.5)',
                      border: '1px solid rgba(232, 196, 124, 0.05)',
                    }}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-20 rounded overflow-hidden bg-void-deep flex-shrink-0">
                      <img
                        src={portrait.image_url}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                          filter: portrait.visible ? 'none' : 'grayscale(0.6) brightness(0.6)',
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary text-sm font-serif truncate">
                        {portrait.name || 'Unnamed'}
                      </p>
                      <p className="text-text-faint text-xs font-serif truncate">
                        {portrait.storyteller_id}
                      </p>
                      <div className="flex gap-4 mt-1 text-xs text-text-muted">
                        <span>{portrait.views} views</span>
                        <span>{portrait.clicks} clicks</span>
                      </div>
                    </div>

                    {/* Status & actions */}
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-serif px-2 py-1 rounded"
                        style={{
                          backgroundColor: portrait.visible
                            ? 'rgba(232, 196, 124, 0.1)'
                            : 'rgba(74, 69, 64, 0.2)',
                          color: portrait.visible ? '#e8c47c' : '#7a756f',
                        }}
                      >
                        {portrait.visible ? 'visible' : 'withdrawn'}
                      </span>
                      <button
                        onClick={() => handleToggleVisibility(portrait)}
                        className="text-xs text-text-muted hover:text-accent transition-colors"
                      >
                        toggle
                      </button>
                      <Link
                        href={`/dashboard?code=${portrait.access_code}`}
                        className="text-xs text-accent hover:opacity-80 transition-opacity"
                      >
                        dashboard →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
