import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import { ChampPositionType, ExtendedChampionDataType, LanguageParamsType } from '@/types';
import imgSrcVersionLoader from '@/utils/imgSrcVersionLoader';
import PositionIconRender from './render/PositionIconRender';
import { useTranslations } from 'next-intl';

interface ChampionListTableProps {
  championsData: ExtendedChampionDataType[];
  currentPosition: 'all' | ChampPositionType;
  version: string;
  language: LanguageParamsType;
}

export default function ChampionListTable({
  championsData,
  currentPosition,
  version,
  language,
}: ChampionListTableProps) {
  const tableRenderData = useMemo(() => {
    return filterPositionChampion(championsData, currentPosition);
  }, [championsData, currentPosition]);
  const t = useTranslations('championListTable');
  return (
    <table className="table">
      <colgroup>
        <col width={50} />
        <col width="*" />
        <col width={100} />
        <col width={150} />
        <col width={100} />
      </colgroup>
      <thead className="bg-color-gray-100 text-[1.2rem] text-color-gray-500">
        <tr>
          <th>{t('cell1')}</th>
          <th align="left">{t('cell2')}</th>
          <th>{t('cell3')}</th>
          <th>{t('cell4')}</th>
          <th>{t('cell5')}</th>
        </tr>
      </thead>
      <tbody>
        {tableRenderData.map((champ, index) => (
          <tr
            key={champ.key}
            className="text-[1.2rem] border-b border-color-gray-200 hover:bg-color-gray-100 py-[0.8rem]"
          >
            <td className="py-[1.2rem] pl-[1.6rem] text-color-gray-400">{index + 1}</td>
            <td>
              <Link href={`/${language}/champions/${champ.id}/info`} className="flex gap-[0.8rem] items-center">
                <div className="overflow-hidden rounded-[0.4rem]">
                  <Image
                    src={`${imgSrcVersionLoader(version, 'CHAMPION_SQUARE')}${champ.image.full}`}
                    width={32}
                    height={32}
                    alt={`${champ.name} 이미지`}
                    className="scale-110"
                    unoptimized
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
  championsData: ExtendedChampionDataType[],
  currentPosition: 'all' | 'top' | 'jungle' | 'mid' | 'bottom' | 'support',
) {
  if (currentPosition === 'all') return championsData;
  else return championsData.filter(champ => champ.position === currentPosition);
}
