import {
  getChampionsData,
  getInitialRecordData,
  getRunesData,
  getSummonerData,
  getVersionsData,
} from '@/service/requestJsonData.api';
import { GameType } from '@/types';
import SummonerLeagueContainer from './SummonerLeagueContainer';
import SummonerRecordClientContainer from './SummonerRecordClientContainer';

interface SummonerContentContainerProps {
  summonerName: string;
  gameType: GameType;
}

export default async function SummonerContentContainer({ summonerName, gameType }: SummonerContentContainerProps) {
  const [name, tag] = summonerName.split('-');
  const { id, puuid } = await getSummonerData(name, tag);
  return (
    <>
      <SummonerLeagueContainer summonerId={id} />
      <div className="flex-1 min-h-[60rem]">
        <SummonerRecordServerContainer puuid={puuid} gameType={gameType} />
      </div>
    </>
  );
}

async function SummonerRecordServerContainer({ puuid, gameType }: { puuid: string; gameType: GameType }) {
  const championsData = await getChampionsData();
  const [latestVersion] = await getVersionsData();
  const runesDataArr = await getRunesData();
  const initialRecordData = await getInitialRecordData(puuid, gameType);
  return (
    <SummonerRecordClientContainer
      data={{ championsData, latestVersion, runesDataArr, initialRecordData }}
      puuid={puuid}
    />
  );
}
