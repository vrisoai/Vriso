'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function PerformancePillar() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (inView) {
      controls.start({
        width: '98.4%',
        transition: { duration: 1.4, ease: 'easeOut', delay: 0.8 },
      });
    }
  }, [inView, controls]);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-md border border-border backdrop-blur-[12px]"
      style={{
        width: 180,
        height: 110,
        paddingLeft: 20,
        paddingRight: 16,
        paddingTop: 14,
        paddingBottom: 14,
        background: 'rgba(31, 31, 31, 0.80)',
        borderTop: '1px solid #3B5BDB',
      }}
    >
      <p
        className="text-[#E5E7EB]"
        style={{
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          margin: 0,
          marginBottom: 6,
        }}
      >
        AGENTIC_WORK_UNITS
      </p>
      <p
        className="text-[#E5E7EB]"
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: 13,
          fontWeight: 700,
          margin: 0,
          marginBottom: 8,
        }}
      >
        98.4% TASK_AUTONOMY
        <span
          style={{
            color: '#FBBF24',
            opacity: cursorVisible ? 1 : 0,
            transition: 'opacity 0.15s',
          }}
        >
          ▮
        </span>
      </p>
      <div
        className="rounded-sm"
        style={{
          width: '100%',
          height: 4,
          background: '#1A1A1A',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <motion.div
          className="h-full rounded-sm"
          style={{
            width: 0,
            background: '#3B5BDB',
            borderRadius: 2,
          }}
          initial={{ width: 0 }}
          animate={controls}
        />
      </div>
    </div>
  );
}
