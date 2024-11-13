import { getVersionsData } from '@/service/requestJsonData.api';
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
  const [latestVersion] = await getVersionsData();

  return <SummonerRecordClientContainer puuid={puuid} latestVersion={latestVersion} gameType={gameType} />;
}
