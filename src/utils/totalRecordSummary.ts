import { MatchDtoType, ParticipantDtoType } from '@/types/response';
import filterMatchData from './filterMatchData';

export default function totalRecordSummary(filterData: MatchDtoType[], puuid: string) {
  const summonerRecordData = filterMatchData(filterData, puuid);
  const summonerData = {
    win: 0,
    lose: 0,
    kill: 0,
    death: 0,
    assists: 0,
    avgKill: 0,
    avgDeath: 0,
    avgAssists: 0,
    totalAvg: 0,
  };

  summonerRecordData.forEach(item => {
    if (item.win) {
      summonerData.win += 1;
    } else {
      summonerData.lose += 1;
    }

    summonerData.kill += item.kills;
    summonerData.death += item.deaths;
    summonerData.assists += item.assists;
  });
  const totalGameCount = summonerData.win + summonerData.lose;
  summonerData.avgKill = Number((summonerData.kill / totalGameCount).toFixed(2));
  summonerData.avgDeath = Number((summonerData.death / totalGameCount).toFixed(2));
  summonerData.avgAssists = Number((summonerData.assists / totalGameCount).toFixed(2));
  summonerData.totalAvg = Number(((summonerData.avgKill + summonerData.avgAssists) / summonerData.avgDeath).toFixed(2));
  return summonerData;
}
