'use client';

import { motion } from 'framer-motion';
import { headlineContainer, headlineWord } from '@/app/lib/animations';

const partA = 'We Architect Enterprise AI Systems for';
const partB = 'Durable Advantage';

export function AnimatedHeadline() {
  const wordsA = partA.split(' ');
  const wordsB = partB.split(' ');

  return (
    <h1 className="flex flex-col gap-0 leading-[1.1] tracking-[-0.04em]">
      <motion.span
        className="flex flex-wrap items-baseline gap-x-2 text-[#E5E7EB] text-[48px] font-extrabold md:text-[84px] md:font-extrabold"
        style={{ fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
        variants={headlineContainer}
        initial="hidden"
        animate="visible"
        aria-label={`${partA} ${partB}`}
      >
        {wordsA.map((word, i) => (
          <motion.span key={`a-${i}`} variants={headlineWord} className="inline-block">
            {word}
          </motion.span>
        ))}
      </motion.span>
      <motion.span
        className="inline-block w-fit bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] bg-clip-text text-[48px] font-black tracking-[-0.04em] text-transparent md:text-[84px]"
        style={{
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        variants={headlineContainer}
        initial="hidden"
        animate="visible"
      >
        {wordsB.map((word, i) => (
          <motion.span key={`b-${i}`} variants={headlineWord} className="mr-2 inline-block">
            {word}
          </motion.span>
        ))}
      </motion.span>
    </h1>
  );
}
