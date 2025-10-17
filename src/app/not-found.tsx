'use client';

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center ">
      <div className="text-center space-y-6 px-4">
        {/* Large error code */}
        <h1 className="text-8xl font-extrabold text-hookers-green animate-pulse">404</h1>

        {/* Message */}
        <h2 className="text-3xl font-bold text-lion">Page Not Found</h2>
        <p className="text-chestnut max-w-md mx-auto">
          The page you are looking for does not exist or has been moved. Maybe try going back to the
          homepage?
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="inline-block rounded-lg bg-hookers-green px-6 py-3 text-lg font-semibold text-black transition-colors hover:bg-lion border-2 border-hookers-green hover:border-lion"
        >
          Go to Homepage
        </Link>
      </div>

      {/* Optional decoration */}
      <div className="absolute bottom-10 animate-bounce">
        <span className="text-lion text-6xl">⏬</span>
      </div>
    </main>
  );
}
