'use client';

import { makeStore, type AppStore } from '@/lib/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
import { useRef } from 'react';
import { Provider } from 'react-redux';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={storeRef.current}>{children}</Provider>
    </QueryClientProvider>
  );
}
