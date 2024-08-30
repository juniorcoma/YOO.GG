import { ParticipantDtoType } from '@/types/response';

export default function descPlayChampionList(filterData: ParticipantDtoType[], championData: any) {
  const object: { [key: number]: { count: number; win: number; lose: number; name: string } } = {};
  filterData.forEach(data => {
    if (object[data.championId]) {
      object[data.championId].count += 1;
      data.win ? (object[data.championId].win += 1) : (object[data.championId].lose += 1);
    } else {
      const champData = championData.find((champ: any) => Number(champ.key) === data.championId);
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
