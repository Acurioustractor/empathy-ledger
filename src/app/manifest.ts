import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Empathy Ledger',
    short_name: 'Empathy',
    description: 'A mystical art exhibition - intimate portrait gallery with consent-based sharing',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0908',
    theme_color: '#e8c47c',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['art', 'photography', 'social'],
  };
}
