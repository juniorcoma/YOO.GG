import {
  getChampionsData,
  getItemsData,
  getRunesData,
  getSummonerGameRecordData,
  getSummonerSpellsData,
  getVersionsData,
} from '@/service/requestJsonData.api';
import { GameType, LanguageParamsType } from '@/types';
import SummonerRecordClientContainer from './SummonerRecordClientContainer';

export default async function SummonerRecordServerContainer({
  puuid,
  gameType,
  language,
}: {
  puuid: string;
  gameType: GameType;
  language: LanguageParamsType;
}) {
  const championsData = await getChampionsData(language);
  const [latestVersion] = await getVersionsData();
  const runesDataArr = await getRunesData(language);
  const itemsData = await getItemsData(language);
  const summonerSpellsData = await getSummonerSpellsData(language);
  const summonerGameRecordData = await getSummonerGameRecordData(puuid, gameType);

  return (
    <SummonerRecordClientContainer
      data={{ champions: championsData, runesArr: runesDataArr, summonerSpells: summonerSpellsData, items: itemsData }}
      puuid={puuid}
      latestVersion={latestVersion}
      gameType={gameType}
      initialData={summonerGameRecordData}
    />
  );
}
