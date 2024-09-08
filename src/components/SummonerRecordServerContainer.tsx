import {
  getChampionsData,
  getInitialRecordData,
  getItemsData,
  getRunesData,
  getSummonerSpellsData,
  getVersionsData,
} from '@/service/requestJsonData.api';
import { GameType } from '@/types';
import SummonerRecordClientContainer from './SummonerRecordClientContainer';

export default async function SummonerRecordServerContainer({
  puuid,
  gameType,
}: {
  puuid: string;
  gameType: GameType;
}) {
  try {
    // 비동기 요청들을 병렬로 실행
    const [championsData, versionsData, runesDataArr, initialRecordData, itemsData, summonerSpellsData] =
      await Promise.all([
        getChampionsData(),
        getVersionsData(),
        getRunesData(),
        getInitialRecordData(puuid, gameType),
        getItemsData(),
        getSummonerSpellsData(),
      ]);

    const [latestVersion] = versionsData;

    return (
      <SummonerRecordClientContainer
        data={{
          champions: championsData,
          runesArr: runesDataArr,
          summonerSpells: summonerSpellsData,
          items: itemsData,
        }}
        puuid={puuid}
        initialRecordData={initialRecordData}
        latestVersion={latestVersion}
      />
    );
  } catch (error) {
    console.error('Error fetching data:', error);

    return <div>Error loading summoner data.</div>;
  }
}
