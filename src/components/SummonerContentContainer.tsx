import { getSummonerData } from '@/service/requestJsonData.api';
import { GameType, LanguageParamsType } from '@/types';
import SummonerLeagueContainer from './SummonerLeagueContainer';

import SummonerRecordServerContainer from './SummonerRecordServerContainer';

interface SummonerContentContainerProps {
  summonerName: string;
  gameType: GameType;
  language: LanguageParamsType;
}

export default async function SummonerContentContainer({
  summonerName,
  gameType,
  language,
}: SummonerContentContainerProps) {
  const [name, tag] = summonerName.split('-');
  const { id, puuid } = await getSummonerData(name, tag);
  return (
    <>
      <SummonerLeagueContainer summonerId={id} />
      <div className="flex-1 min-h-[60rem]">
        <SummonerRecordServerContainer puuid={puuid} gameType={gameType} language={language} />
      </div>
    </>
  );
}
