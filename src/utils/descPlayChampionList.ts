import { ParticipantDtoType } from '@/types/response';
import { ChampionsDataType } from '@/types/staticData';

export default function descPlayChampionList(filterData: ParticipantDtoType[], championsData: ChampionsDataType[]) {
  const object: { [key: number]: { count: number; win: number; lose: number; name: string } } = {};
  filterData.forEach(data => {
    if (object[data.championId]) {
      object[data.championId].count += 1;
      data.win ? (object[data.championId].win += 1) : (object[data.championId].lose += 1);
    } else {
      const champData = championsData.find(champ => Number(champ.key) === data.championId) as ChampionsDataType;
      object[data.championId] = {
        count: 1,
        win: data.win ? 1 : 0,
        lose: data.win ? 0 : 1,
        name: champData.id,
      };
    }
  });

  const descArr = Object.entries(object)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 3);
  return descArr;
}
