'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function ProgressProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ProgressBar color="#FFA100" height="4px" options={{ showSpinner: false }} shallowRouting />
    </>
  );
}
