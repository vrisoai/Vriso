import type { Metadata } from 'next';
import { Space_Grotesk, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import { Navbar } from '@/app/components';
import SchemaOrg from '@/app/components/SchemaOrg';
import '@/app/styles/globals.css';

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
  metadataBase: new URL('https://vriso.ai'),
  title: {
    default: 'VRISO — Enterprise AI Systems Architecture',
    template: '%s | VRISO',
  },
  description:
    'VRISO architects sovereign, multi-agent AI systems for enterprise workflow automation, governance, and execution. Strategic AI retainers for EU, India, and US markets.',
  keywords: [
    'Enterprise AI Architecture',
    'Agentic Orchestration',
    'Multi-Agent Governance',
    'Sovereign AI Infrastructure',
    'AI Workflow Automation',
    'AI Consulting',
    'GDPR Compliant AI',
    'DPDP AI Compliance',
  ],
  authors: [{ name: 'VRISO', url: 'https://vriso.ai' }],
  creator: 'VRISO',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vriso.ai',
    siteName: 'VRISO',
    title: 'VRISO — Enterprise AI Systems Architecture',
    description:
      'Sovereign, multi-agent AI systems for enterprise workflow automation and governance.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VRISO — Enterprise AI Systems Architecture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VRISO — Enterprise AI Systems Architecture',
    description: 'Sovereign multi-agent AI systems for enterprise governance and execution.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://vriso.ai',
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
        <SchemaOrg />
      </head>
      <body className="min-h-screen antialiased font-display">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
