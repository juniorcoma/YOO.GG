'use client';

import { useState } from 'react';
import ContentBox from './common/ContentBox';
import LolMusicList from './contentboxinner/LolMusicList';
import { useTranslations } from 'next-intl';

export default function LolMusicListContainer() {
  const [contentType, setContentType] = useState<'worlds' | 'cinematic'>('worlds');
  const t = useTranslations('homePage');
  const handleWorlds = () => {
    setContentType('worlds');
  };

  const handleCinematic = () => {
    setContentType('cinematic');
  };

  return (
    <ContentBox
      titleText={contentType === 'worlds' ? t('wolrdsMusic') : t('cinematicMusic')}
      css="min-w-[36rem]"
      SubTitleComponent={
        <ContentTypeController
          contentType={contentType}
          handleWorlds={handleWorlds}
          handleCinematic={handleCinematic}
        />
      }
    >
      <LolMusicList contentType={contentType} />
    </ContentBox>
  );
}

function ContentTypeController({
  contentType,
  handleWorlds,
  handleCinematic,
}: {
  contentType: 'worlds' | 'cinematic';
  handleWorlds: () => void;
  handleCinematic: () => void;
}) {
  const t = useTranslations('homePage');
  return (
    <div className="flex gap-[0.8rem] text-[1.2rem]">
      <button className={`content-controller ${contentType === 'worlds' && 'active'}`} onClick={handleWorlds}>
        {t('worldControlBtn')}
      </button>
      <button className={`content-controller ${contentType === 'cinematic' && 'active'}`} onClick={handleCinematic}>
        {t('cinematicControlBtn')}
      </button>
    </div>
  );
}
