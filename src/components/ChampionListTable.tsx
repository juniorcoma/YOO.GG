import { STATIC_DATA_HOST } from '@/constant/API';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import PositionBottom from '@/assets/icons/position_bottom.svg';
import PositionTop from '@/assets/icons/position_top.svg';
import PositionMid from '@/assets/icons/position_mid.svg';
import PositionJungle from '@/assets/icons/position_jungle.svg';
import PositionSupport from '@/assets/icons/position_support.svg';
import { ChampPositionType } from '@/types';

interface ChampionListTableProps {
  championData: any;
  currentPosition: 'all' | 'top' | 'jungle' | 'mid' | 'bottom' | 'support';
}

export default function ChampionListTable({ championData, currentPosition }: ChampionListTableProps) {
  const tableRenderData = useMemo(() => {
    return filterPositionChampion(championData, currentPosition);
  }, [championData, currentPosition]);
  return (
    <table className="w-full champ-table">
      <colgroup>
        <col width={50} />
        <col width="*" />
        <col width={100} />
        <col width={150} />
        <col width={100} />
      </colgroup>
      <thead className="bg-color-gray-100 text-[1.2rem] text-color-gray-500">
        <tr>
          <th>순번</th>
          <th align="left">챔피언</th>
          <th>포지션</th>
          <th>별명</th>
          <th>난이도</th>
        </tr>
      </thead>
      <tbody>
        {tableRenderData.map((champ: any, index: number) => (
          <tr
            key={champ.key}
            className="text-[1.2rem] border-b border-color-gray-200 hover:bg-color-gray-100 py-[0.8rem]"
          >
            <td className="py-[1.2rem] pl-[1.6rem] text-color-gray-400">{index + 1}</td>
            <td>
              <Link href={`/champions/${champ.id.toLowerCase()}/info`} className="flex gap-[0.8rem] items-center">
                <div className="overflow-hidden rounded-[0.4rem]">
                  <Image
                    src={`${STATIC_DATA_HOST.CHAMPION_SQUARE_IMG}${champ.image.full}`}
                    width={32}
                    height={32}
                    alt={`${champ.name} 이미지`}
                    className="scale-110"
                  />
                </div>
                <strong>{champ.name}</strong>
              </Link>
            </td>
            <td align="center">
              <PositionIconRender position={champ.position} />
            </td>
            <td align="center" className="text-color-gray-500">
              {champ.title}
            </td>
            <td align="center">{champ.info.difficulty}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function filterPositionChampion(
  championData: any,
  currentPosition: 'all' | 'top' | 'jungle' | 'mid' | 'bottom' | 'support',
) {
  if (currentPosition === 'all') return championData;
  else return championData.filter((champ: any) => champ.position === currentPosition);
}

export function PositionIconRender({ position }: { position: ChampPositionType }) {
  switch (position) {
    case 'top':
      return <PositionTop />;
    case 'bottom':
      return <PositionBottom />;
    case 'jungle':
      return <PositionJungle />;
    case 'mid':
      return <PositionMid />;
    case 'support':
      return <PositionSupport />;
  }
}
