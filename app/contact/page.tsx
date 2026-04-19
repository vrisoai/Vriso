import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: "Let's Talk",
  description:
    'Start a conversation with Invisigent about enterprise AI systems, automation workflows, and intelligent infrastructure for your business.',
  alternates: {
    canonical: 'https://vriso.ai/contact',
  },
  openGraph: {
    title: "Let's Talk | Invisigent",
    description:
      'Start a conversation with Invisigent about enterprise AI systems, automation workflows, and intelligent infrastructure.',
    url: 'https://vriso.ai/contact',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "Let's Talk — Invisigent",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Let's Talk | Invisigent",
    description:
      'Start a conversation with Invisigent about enterprise AI systems and intelligent infrastructure.',
    images: ['/og-image.png'],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
