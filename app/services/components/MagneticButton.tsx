'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';

interface MagneticButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export function MagneticButton({
  children,
  primary = false,
  onClick,
  type = 'button',
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const hasHover = useMediaQuery('(hover: hover)');

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!hasHover || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setPos({ x, y });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.button
      type={type}
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: hasHover ? pos.x : 0, y: hasHover ? pos.y : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="w-full sm:w-auto"
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
        fontSize: 'clamp(0.8125rem, 0.75vw, 1.25rem)',
        letterSpacing: '0.04em',
        padding: 'clamp(0.875rem, 0.8vw, 1.5rem) clamp(2rem, 2.5vw, 3.5rem)',
        borderRadius: '9999px',
        cursor: 'pointer',
        outline: 'none',
        background: primary ? '#0F0F0F' : 'transparent',
        border: primary ? '1px solid #374151' : '1px solid var(--color-border)',
        color: primary ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
      }}
      whileHover={
        primary
          ? {
              borderColor: 'var(--color-action-accent)',
              boxShadow: '0 0 24px rgba(45,91,255,0.25)',
            }
          : {
              borderColor: 'var(--color-trust-amber)',
              color: 'var(--color-trust-amber)',
              boxShadow: '0 0 24px rgba(251,191,36,0.15)',
            }
      }
    >
      {children}
    </motion.button>
  );
}

