'use client';

import Link from 'next/link';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* Error Code / Icon */}
      <h1 className="text-8xl font-extrabold text-hookers-green animate-pulse">⚠</h1>

      {/* Error Message */}
      <h2 className="mt-4 text-3xl font-bold text-lion">Something went wrong</h2>
      <p className="mt-2 max-w-md text-chestnut">
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <button
          onClick={reset}
          className="rounded-lg bg-hookers-green px-6 py-3 text-lg font-semibold text-black transition-colors hover:bg-lion"
        >
          Retry
        </button>
        <Link
          href="/"
          className="rounded-lg border border-hookers-green px-6 py-3 text-lg font-semibold text-hookers-green transition-colors hover:bg-hookers-green hover:text-black"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
