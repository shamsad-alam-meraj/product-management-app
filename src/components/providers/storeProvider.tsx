'use client';

import { persistor, store } from '@/lib/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import GlobalLoader from '../loaders/GlobalLoader';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const isLoading = useSelector((state: any) => state.ui.isLoading);
  return (
    <>
      <GlobalLoader isLoading={isLoading} />
      {children}
    </>
  );
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LoaderWrapper>{children}</LoaderWrapper>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </QueryClientProvider>
  );
}
