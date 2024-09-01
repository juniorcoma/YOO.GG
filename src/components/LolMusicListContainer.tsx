'use client';

import { useState } from 'react';
import ContentBox from './ContentBox';
import LolMusicList from './LolMusicList';

export default function LolMusicListContainer() {
  const [contentType, setContentType] = useState<'worlds' | 'cinematic'>('worlds');

  const handleWorlds = () => {
    setContentType('worlds');
  };

  const handleCinematic = () => {
    setContentType('cinematic');
  };

  return (
    <ContentBox
      titleText={contentType === 'worlds' ? 'LOL WORLDS MUSIC' : 'LOL CINEMATIC MUSIC'}
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
  return (
    <div className="flex gap-[0.8rem] text-[1.2rem]">
      <button className={`content-controller ${contentType === 'worlds' && 'active'}`} onClick={handleWorlds}>
        월즈
      </button>
      <button className={`content-controller ${contentType === 'cinematic' && 'active'}`} onClick={handleCinematic}>
        시네마틱
      </button>
    </div>
  );
}
