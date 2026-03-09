'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-bg-primary px-6 py-24">
      <h1 className="font-serif text-2xl font-semibold text-text-primary">
        Something went wrong
      </h1>
      <p className="mt-3 text-text-secondary">
        We couldn’t load this page. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full border border-border bg-bg-card px-6 py-3 font-medium text-text-primary transition-colors hover:border-action-accent hover:bg-bg-section"
      >
        Try again
      </button>
    </main>
  );
}
