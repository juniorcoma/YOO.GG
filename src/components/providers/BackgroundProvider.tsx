'use client';

import { usePathname } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

export const BackgroundColorState = createContext<{ state: boolean; setState: () => void } | null>(null);

export default function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('isDark') as ('true' | 'false') | undefined;
    if (isDark) {
      setIsDark(JSON.parse(isDark));
    }
  }, []);

  useEffect(() => {
    const html = document.querySelector('html') as HTMLHtmlElement;

    if (html.classList.contains('dark')) {
      html.style.backgroundColor = 'var(--color-gray-200)';
    } else if (pathName !== '/') {
      html.style.backgroundColor = 'var(--color-gray-200)';
    } else if (pathName === '/') {
      html.style.backgroundColor = 'var(--color-primary-500)';
    }
  }, [pathName, isDark]);

  const setIsDarkmode = () => {
    setIsDark(prev => !prev);
    const isDarkState = JSON.stringify(!isDark);
    localStorage.setItem('isDark', isDarkState);
  };
  return (
    <BackgroundColorState.Provider value={{ state: isDark, setState: setIsDarkmode }}>
      {children};
    </BackgroundColorState.Provider>
  );
}
