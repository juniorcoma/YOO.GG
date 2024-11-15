'use client';

import useGetChampionsData from '@/hook/query/useGetChampionsData';
import { LanguageParamsType } from '@/types';
import { ChampionsDataType } from '@/types/staticData';
import imgSrcVersionLoader from '@/utils/imgSrcVersionLoader';
import Image from 'next/image';
import Link from 'next/link';

interface ChampionsImgRenderProps {
  size: number;
  version: string;
  championId: number;
  locale: LanguageParamsType;
}

export default function ChampionsImgRender({ size, version, championId, locale }: ChampionsImgRenderProps) {
  const { data: championsData } = useGetChampionsData(version, 'ko');

  const matchChapion = championsData.data.find(champ => Number(champ.key) === Number(championId)) as ChampionsDataType;

  if (!matchChapion) {
    return <div style={{ width: `${size}px`, aspectRatio: `1/1` }} className="bg-color-gray-300 rounded-[0.8rem]" />;
  }

  return (
    <Link href={`/${locale}/champions/${matchChapion.id}/info`} className="w-[3.4rem] h-[3.4rem] overflow-hidden block">
      <Image
        src={`${imgSrcVersionLoader(version, 'CHAMPION_SQUARE')}${matchChapion.id}.png`}
        width={size}
        height={size}
        unoptimized
        alt="champion squre image"
        className="rounded-[0.8rem] scale-110"
      />
    </Link>
  );
}
