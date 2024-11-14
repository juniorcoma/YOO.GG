'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function ReactQueryProviders({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: {} }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <div className="text-[1.6rem]">
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}
