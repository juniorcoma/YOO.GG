'use client';

import LanguageEn from '@/assets/icons/LanguageEn';
import LanguageKo from '@/assets/icons/LanguageKo';
import { useContext, useState } from 'react';
import { ModuleStateContext } from '../providers/ModuleStateProviders';
import { useParams } from 'next/navigation';

export default function LanguageControlBtn() {
  const { handleOpenModule } = useContext(ModuleStateContext);
  const { locale } = useParams();
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseOver = (e: React.MouseEvent) => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setIsMouseOver(false);
  };
  return (
    <button
      type="button"
      onClick={handleOpenModule}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className="p-[0.8rem] rounded-[0.4rem] hover:bg-[rgba(255,255,255,.2)]"
    >
      {locale === 'ko' ? <LanguageKo isMouseOver={isMouseOver} /> : <LanguageEn isMouseOver={isMouseOver} />}
    </button>
  );
}
