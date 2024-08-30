'use client';

import { Suspense } from 'react';

interface SuspenseProviderProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export default function SuspenseProvider({ children, fallback }: SuspenseProviderProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
