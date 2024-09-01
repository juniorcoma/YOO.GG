'use client';

import { EMOTES_ICON_IMG_URL } from '@/constant';
import Image from 'next/image';
import { useState } from 'react';

export default function FavoriteChampionBox() {
  const [favoriteChamp, setFavoriteChamp] = useState();
  if (!favoriteChamp)
    return (
      <div className="min-h-[32.4rem] flex justify-center items-center">
        <div className="flex flex-col gap-[0.8rem] items-center">
          <Image src={EMOTES_ICON_IMG_URL.blitzcrank} width={128} height={128} alt="블리츠 이모티콘" />
          <span className="text-[1.6rem] text-color-gray-400">즐겨찾기 한 챔피언이 없어요!</span>
        </div>
      </div>
    );
  return <div className=""></div>;
}
