// app/layout.tsx
import type { Metadata } from 'next';
import { Space_Grotesk, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { Navbar } from '@/app/components';
import { CustomCursor } from '@/app/components/CustomCursor';
import { ChatbotWidget } from '@/app/components/ChatbotWidget';
import SchemaOrg from '@/app/components/SchemaOrg';
import { Analytics } from '@vercel/analytics/next';
import '@/app/styles/globals.css';

const GA_ID = 'G-WNNNJCTFS1';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.invisigent.ai'),
  title: {
    default: 'Invisigent — Enterprise AI Systems Architecture',
    template: '%s | Invisigent',
  },
  description:
    'Invisigent architects sovereign, multi-agent AI systems for enterprise workflow automation, governance, and execution. Strategic AI retainers for EU, India, and US markets.',
  keywords: [
    'Enterprise AI Architecture',
    'Agentic Orchestration',
    'Multi-Agent Governance',
    'Sovereign AI Infrastructure',
    'AI Workflow Automation',
    'AI Consulting',
    'GDPR Compliant AI',
    'DPDP AI Compliance',
    'EU AI Act Compliance',
    'SOC2 AI',
    'AI systems Jaipur',
    'AI consulting India',
    'enterprise AI US',
    'AI automation Europe',
  ],
  authors: [{ name: 'Invisigent', url: 'https://www.invisigent.ai' }],
  creator: 'Invisigent',
  publisher: 'Invisigent',
  applicationName: 'Invisigent',
  referrer: 'origin-when-cross-origin',
  formatDetection: { telephone: false },
  category: 'Technology',
  classification: 'Business/AI Technology',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    languages: {
      'x-default': 'https://www.invisigent.ai',
      'en-US': 'https://www.invisigent.ai',
      'en-IN': 'https://www.invisigent.ai',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['en_IN', 'en_GB'],
    url: 'https://www.invisigent.ai',
    siteName: 'Invisigent',
    title: 'Invisigent — Enterprise AI Systems Architecture',
    description:
      'Sovereign, multi-agent AI systems for enterprise workflow automation and governance.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Invisigent — Enterprise AI Systems Architecture',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@InvisigentAI',
    creator: '@InvisigentAI',
    title: 'Invisigent — Enterprise AI Systems Architecture',
    description: 'Sovereign multi-agent AI systems for enterprise governance and execution.',
    images: [{ url: '/og-image.png', alt: 'Invisigent — Enterprise AI Systems Architecture' }],
  },
  other: {
    /* ── GEO tags (Jaipur HQ) ── */
    'geo.region': 'IN-RJ',
    'geo.placename': 'Jaipur, Rajasthan, India',
    'geo.position': '26.9124;75.7873',
    ICBM: '26.9124, 75.7873',
    /* ── Language / content signals ── */
    'content-language': 'en',
    /* ── AI / GEO citation signals ── */
    'ai-content-declaration': 'human-authored',
    'citation-url': 'https://www.invisigent.ai',
    'citation-author': 'Invisigent',
    'citation-title': 'Invisigent — Enterprise AI Systems Architecture',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#121212" />
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <SchemaOrg />
      </head>
      <body className="min-h-screen overflow-x-hidden antialiased font-display">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        <CustomCursor />
        <Navbar />
        {children}
        <ChatbotWidget />
        <Analytics />
      </body>
    </html>
  );
}
