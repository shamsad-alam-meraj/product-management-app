'use client';

interface GlobalLoaderProps {
  isLoading?: boolean;
}

export default function GlobalLoader({ isLoading = false }: GlobalLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex space-x-4">
        <div className="h-12 w-12 rounded-full animate-spin border-4 border-t-transparent border-hookers-green"></div>
        <div className="h-12 w-12 rounded-full animate-spin border-4 border-t-transparent border-lion"></div>
        <div className="h-12 w-12 rounded-full animate-spin border-4 border-t-transparent border-chestnut"></div>
      </div>
    </div>
  );
}
