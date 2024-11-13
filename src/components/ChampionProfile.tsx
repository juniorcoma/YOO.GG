import { ChampPositionType, LanguageParamsType } from '@/types';

import { CHAMPION_TAG_INFO } from '@/constant';
import { getVersionsData } from '@/service/requestJsonData.api';
import imgSrcVersionLoader from '@/utils/imgSrcVersionLoader';
import FavoriteBtn from './FavoriteBtn';
import { ChampionDataType } from '@/types/staticData';
import PositionIconRender from './render/PositionIconRender';

interface ChampionProfileProps {
  id: string;
  img: string;
  name: string;
  position: ChampPositionType;
  title: string;
  tags: ChampionDataType['tags'];
  language: LanguageParamsType;
}

export default async function ChampionProfile({
  id,
  img,
  name,
  position,
  title,
  tags,
  language,
}: ChampionProfileProps) {
  const [latestVersion] = await getVersionsData();
  return (
    <div className="flex gap-[1.2rem]">
      <div className="w-[12.8rem] h-[12.8rem] relative rounded-[1.2rem] overflow-hidden">
        <img
          src={`${imgSrcVersionLoader(latestVersion, 'CHAMPION_SQUARE')}${img}`}
          alt={`${name} 이미지`}
          className="scale-110"
        />
      </div>
      <div className="flex flex-col gap-[0.8rem] pt-[0.4rem]">
        <div className="flex items-center gap-[1.6rem] leading-[1]">
          <h1 className="text-[2.8rem] font-bold">{name}</h1>
          <FavoriteBtn champId={id} />
        </div>
        <p className="text-[2rem] leading-[1.2]">{title}</p>
        <div className="flex gap-[0.8rem] items-center text-[1.6rem]">
          <PositionIconRender position={position} />
          <span>{tags.map(tag => CHAMPION_TAG_INFO[tag][language]).join(' | ')}</span>
        </div>
      </div>
    </div>
  );
}
