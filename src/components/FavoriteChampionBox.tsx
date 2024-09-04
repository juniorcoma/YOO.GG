'use client';

import { EMOTES_ICON_IMG_URL } from '@/constant';
import imgSrcVersionLoader from '@/utils/imgSrcVersionLoader';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FavoriteChampionBoxProps {
  championsData: any;
  version: string;
}

export default function FavoriteChampionBox({ championsData, version }: FavoriteChampionBoxProps) {
  const [favoriteChamp, setFavoriteChamp] = useState<string[]>([]);

  useEffect(() => {
    const getItem = localStorage.getItem('favorite_champions');
    if (getItem) {
      const favoriteList = JSON.parse(getItem);
      setFavoriteChamp(favoriteList);
    }
  }, []);

  if (!favoriteChamp.length)
    return (
      <div className="min-h-[32.4rem] flex justify-center items-center">
        <div className="flex flex-col gap-[0.8rem] items-center">
          <img src={EMOTES_ICON_IMG_URL.blitzcrank} width={128} height={128} alt="블리츠 이모티콘" />
          <span className="text-[1.6rem] text-color-gray-400">즐겨찾기 한 챔피언이 없어요!</span>
        </div>
      </div>
    );

  return (
    <ul className="px-[1.6rem] py-[1.2rem] flex gap-[0.8rem] flex-wrap">
      {favoriteChamp.map((item: any) => {
        const championData = championsData.find((champ: any) => champ.key === item);
        return (
          <li key={championData.key}>
            <Link
              href={`/champions/${championData.id}/info`}
              className="flex flex-col gap-[0.4rem] text-[1.2rem] justify-center w-[4.8rem]"
            >
              <img
                src={`${imgSrcVersionLoader(version, 'CHAMPION_SQUARE')}${championData.image.full}`}
                width={48}
                height={48}
                alt={`${championData.name} 이미지`}
                className="rounded-[0.4rem]"
              />
              <span className="name">{championData.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
