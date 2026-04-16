import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    // On the production domain (vriso.ai) VERCEL_ENV === 'production'.
    // On preview / vercel.app deployments it is 'preview' or 'development'.
    // Serve noindex headers everywhere except production so the vercel.app
    // URLs are never indexed (Screaming Frog "Non-Indexable Canonical" issue).
    if (process.env.VERCEL_ENV === 'production') return [];

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
