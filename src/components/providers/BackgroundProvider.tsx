'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  useEffect(() => {
    const html = document.querySelector('html');
    if (pathName !== '/' && html) {
      html.style.backgroundColor = 'var(--color-gray-200)';
    }
  }, [pathName]);
  return <>{children}</>;
}
