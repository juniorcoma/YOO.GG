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
  const championsData = await getChampionsData();
  const [latestVersion] = await getVersionsData();
  const runesDataArr = await getRunesData();
  const initialRecordData = await getInitialRecordData(puuid, gameType);
  const itemsData = await getItemsData();
  const summonerSpellsData = await getSummonerSpellsData();
  return (
    <SummonerRecordClientContainer
      data={{ champions: championsData, runesArr: runesDataArr, summonerSpells: summonerSpellsData, items: itemsData }}
      puuid={puuid}
      initialRecordData={initialRecordData}
      latestVersion={latestVersion}
    />
  );
}
