import { STATIC_DATA_HOST } from '@/constant/API';
import { ChampPositionType } from '@/types';
import Image from 'next/image';
import { PositionIconRender } from './ChampionListTable';

interface ChampionProfileProps {
  img: string;
  name: string;
  position: ChampPositionType;
  title: string;
}

export default function ChampionProfile({ img, name, position, title }: ChampionProfileProps) {
  return (
    <div className="flex gap-[1.2rem]">
      <div className="w-[12.8rem] h-[12.8rem] relative rounded-[1.2rem] overflow-hidden">
        <Image
          src={`${STATIC_DATA_HOST.CHAMPION_SQUARE_IMG}${img}`}
          fill
          alt={`${name} 이미지`}
          className="scale-110"
        />
      </div>
      <div className="flex flex-col gap-[0.8rem] pt-[0.4rem]">
        <h1 className="text-[2.8rem] font-bold">{name}</h1>
        <p className="text-[2rem] leading-[1.2]">{title}</p>
        <div className="flex">
          <PositionIconRender position={position} />
          <span>asdasd</span>
        </div>
      </div>
    </div>
  );
}
