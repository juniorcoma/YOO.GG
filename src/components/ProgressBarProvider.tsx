'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function ProgressProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ProgressBar color="#FFA100" options={{ showSpinner: false }} shallowRouting />
    </>
  );
}
