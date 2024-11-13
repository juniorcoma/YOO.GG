import { DDRAGON_IMG_URL } from '@/constant/API';
import { getChampionMasteryData, getChampionsData } from '@/service/requestJsonData.api';
import { LanguageParamsType } from '@/types';
import { ChampionsDataType } from '@/types/staticData';
import Image from 'next/image';

interface ChampionMasteryContainerProps {
  puuid: string;
  language: LanguageParamsType;
}

export default async function ChampionMasteryContainer({ puuid, language }: ChampionMasteryContainerProps) {
  const championMasteryData = await getChampionMasteryData(puuid);
  const championsData = await getChampionsData(language);
  if ('error' in championMasteryData) {
    return;
  }
  return (
    <ul className="flex gap-[3.2rem]">
      {championMasteryData.map(item => {
        const matchChampData = championsData.find(champ => item.championId === Number(champ.key)) as ChampionsDataType;

        return (
          <li key={item.championId} className="flex flex-col gap-[0.4rem]">
            <div className="relative w-[6.8rem] h-[12rem] overflow-hidden rounded-[0.4rem]">
              <Image
                src={`${DDRAGON_IMG_URL.CHAMPION_LOADING}${matchChampData.id}_0.jpg`}
                alt={`${matchChampData.name} 로딩 이미지`}
                className="scale-110"
                fill
              />
            </div>
            <div className="text-center">
              <strong className="text-[1.6rem]">{matchChampData.name}</strong>
              <span className="text-[1.2rem] text-color-gray-500">
                {item.championPoints.toLocaleString()} <br /> {POINT_LANGUAGE[language]}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

const POINT_LANGUAGE = {
  ko: '포인트',
  en: 'Point',
};
