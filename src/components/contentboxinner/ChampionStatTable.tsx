import { MATCHING_STAT_ARR } from '@/constant';
import { LanguageParamsType } from '@/types';
import { ChampionDataType } from '@/types/staticData';
import { useTranslations } from 'next-intl';

interface ChampionStatTableProps {
  stat: ChampionDataType['stats'];
  partype: string;
  language: LanguageParamsType;
}
export default function ChampionStatTable({ stat, partype, language }: ChampionStatTableProps) {
  const championStatsInfo = formatChampionStat(stat);
  const t = useTranslations('championStatTable');
  return (
    <table className="table">
      <colgroup>
        <col width="*" />
        <col width={200} />
        <col width={200} />
      </colgroup>
      <thead className="bg-color-gray-100 text-[1.2rem] text-color-gray-500">
        <tr>
          <th align="left">{t('cell1')}</th>
          <th>{t('cell2')}</th>
          <th>{t('cell3')}</th>
        </tr>
      </thead>
      <tbody className="text-[1.4rem]">
        {championStatsInfo.map(stat => (
          <tr key={stat.value} className="border-b border-color-gray-200">
            <td className="py-[1.2rem] pl-[1.6rem]">{stat.name[language]}</td>
            <td align="center">
              <strong>{stat.value}</strong>
            </td>
            <td align="center" className="text-color-red-500">
              {stat.level ? stat.level : '-'}
            </td>
          </tr>
        ))}
        {(partype === '기력' || partype === '마나' || partype === 'Mana' || partype === 'Energy') && (
          <>
            <tr className="border-b border-color-gray-200 partype">
              <td className="py-[1.2rem] pl-[1.6rem]">{partype}</td>
              <td align="center">
                <strong>{stat.mp}</strong>
              </td>
              <td align="center" className="text-color-red-500">
                {stat.mpperlevel}
              </td>
            </tr>
            <tr className="border-b border-color-gray-200 partype">
              <td className="py-[1.2rem] pl-[1.6rem]">
                {partype} {t('regen')}
              </td>
              <td align="center">
                <strong>{stat.mpregen}</strong>
              </td>
              <td align="center" className="text-color-red-500">
                {stat.mpregenperlevel}
              </td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
}

function formatChampionStat(stats: ChampionDataType['stats']) {
  const matchStatArr = MATCHING_STAT_ARR.map(stat => {
    if (stat.level) {
      return { ...stat, value: stats[stat.value], level: stats[stat.level] };
    } else {
      return { ...stat, value: stats[stat.value] };
    }
  });

  return matchStatArr;
}
