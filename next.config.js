/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

const nextConfig = {
  output: 'export', // Enables static exports
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Add domains for external images
  },
  experimental: {
    // Enable modern features
    optimizeCss: true,
    scrollRestoration: true,
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Add basePath and assetPrefix if deploying to a subdirectory on GitHub Pages
  // Replace 'empathy-ledger' with your repository name if it's different
  ...(isGithubActions && {
    basePath: '/empathy-ledger',
    assetPrefix: '/empathy-ledger/',
  })
};

module.exports = nextConfig; 