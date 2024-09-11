'use client';
import DarkmodeMoon from '@/assets/icons/DarkmodeMoon';
import DarkmodeSun from '@/assets/icons/DarkmodeSun';
import { useContext, useEffect, useState } from 'react';
import { BackgroundColorState } from '../providers/BackgroundProvider';

export default function DarkmodeControlBtn() {
  const darkState = useContext(BackgroundColorState);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseOver = (e: React.MouseEvent) => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setIsMouseOver(false);
  };

  useEffect(() => {
    const html = document.querySelector('html') as HTMLHtmlElement;

    if (darkState?.state) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkState?.state]);

  return (
    <button
      type="button"
      onClick={darkState?.setState}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className="p-[0.8rem] rounded-[0.4rem] hover:bg-[rgba(255,255,255,.2)]"
    >
      {darkState?.state ? <DarkmodeMoon isMouseOver={isMouseOver} /> : <DarkmodeSun isMouseOver={isMouseOver} />}
    </button>
  );
}
