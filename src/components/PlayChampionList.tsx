import { ParticipantDtoType } from '@/types/response';
import descPlayChampionList from '@/utils/descPlayChampionList';
import imgSrcVersionLoader from '@/utils/imgSrcVersionLoader';
import Image from 'next/image';

interface PlayChampionListProps {
  filterData: ParticipantDtoType[];
  championData: any;
  version: string;
}

export default function PlayChampionList({ filterData, championData, version }: PlayChampionListProps) {
  const descPlayChampList = descPlayChampionList(filterData, championData);

  return (
    <ul className="flex flex-col gap-[0.8rem]">
      {descPlayChampList.map(list => (
        <li key={list[0]} className="flex gap-[0.8rem] items-center text-[1.4rem] text-color-gray-500">
          <div className="w-[2.8rem] h-[2.8rem] relative overflow-hidden rounded-[50%]">
            <img
              src={`${imgSrcVersionLoader(version, 'CHAMPION_SQUARE')}${list[1].name}.png`}
              alt={`${list[1].name} 이미지`}
              className="scale-110"
            />
          </div>
          <div>
            {list[1].win}승 {list[1].lose}패{'  '}
            <span className="text-color-primary-500">
              {Math.floor((list[1].win / (list[1].win + list[1].lose)) * 100)}%
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
