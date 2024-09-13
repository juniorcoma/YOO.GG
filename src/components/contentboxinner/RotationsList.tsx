import { getChampionsData, getRotationsChampionsData, getVersionsData } from '@/service/requestJsonData.api';
import { LanguageParamsType } from '@/types';
import imgSrcVersionLoader from '@/utils/imgSrcVersionLoader';

import Image from 'next/image';
import Link from 'next/link';

interface RotationsListProps {
  language: LanguageParamsType;
}

export default async function RotationsList({ language }: RotationsListProps) {
  const championsData = await getChampionsData();
  const rotationsData = await getRotationsChampionsData();
  const [latestVersion] = await getVersionsData();
  const renderItemArr = rotationsData.freeChampionIds.map(ids => {
    return championsData?.find(champion => ids === Number(champion.key));
  });
  return (
    <ul className="px-[1.6rem] py-[1.2rem] flex flex-wrap gap-[1.2rem] justify-center">
      {renderItemArr.map((champ: any) => (
        <li key={champ.key} className="relative ">
          <Link href={`${language}/champions/${champ.id}/info`}>
            <img
              src={`${imgSrcVersionLoader(latestVersion, 'CHAMPION_SQUARE')}${champ.image.full}`}
              width={64}
              height={64}
              alt={`${champ.name} 이미지`}
            />
            <div className="champ-name">{champ.name}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
