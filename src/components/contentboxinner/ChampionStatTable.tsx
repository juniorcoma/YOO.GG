import { MATCHING_STAT_ARR } from '@/constant';
import { ChampionDataType } from '@/types/staticData';

interface ChampionStatTableProps {
  stat: ChampionDataType['stats'];
  partype: string;
}
export default function ChampionStatTable({ stat, partype }: ChampionStatTableProps) {
  const championStatsInfo = formatChampionStat(stat);

  return (
    <table className="table">
      <colgroup>
        <col width="*" />
        <col width={200} />
        <col width={200} />
      </colgroup>
      <thead className="bg-color-gray-100 text-[1.2rem] text-color-gray-500">
        <tr>
          <th align="left">항목</th>
          <th>수치</th>
          <th>레벨당 증가율</th>
        </tr>
      </thead>
      <tbody className="text-[1.4rem]">
        {championStatsInfo.map(stat => (
          <tr key={stat.name} className="border-b border-color-gray-200">
            <td className="py-[1.2rem] pl-[1.6rem]">{stat.name}</td>
            <td align="center">
              <strong>{stat.value}</strong>
            </td>
            <td align="center" className="text-color-red-500">
              {stat.level ? stat.level : '-'}
            </td>
          </tr>
        ))}
        {(partype === '기력' || partype === '마나') && (
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
              <td className="py-[1.2rem] pl-[1.6rem]">{partype} 재생</td>
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
