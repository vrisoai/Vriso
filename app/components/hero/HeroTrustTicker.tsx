'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/app/lib/animations';

const ITEMS = [
  'ENTERPRISE_AI_SYSTEMS',
  'AGENTIC_AUTOMATION',
  'INTELLIGENT_INFRASTRUCTURE',
  'SECURE_AI_DEPLOYMENT',
];

const SEPARATOR = '·';

function TickerSet() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-6 whitespace-nowrap">
          <span>{item}</span>
          <span className="text-text-micro">{SEPARATOR}</span>
        </span>
      ))}
    </>
  );
}

export function HeroTrustTicker() {
  return (
    <motion.div
      className="hero-trust-ticker w-full overflow-hidden border-t border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
      aria-label="Trust indicators"
    >
      <div
        className="hero-ticker-track font-mono text-xs tracking-[0.12em] text-text-tertiary"
      >
        <TickerSet />
        <TickerSet />
      </div>
    </motion.div>
  );
}
