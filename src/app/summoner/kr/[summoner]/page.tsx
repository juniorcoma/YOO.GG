import GameTypeControlBar from '@/components/GameTypeControlBar';
import SummonerLeagueContainer from '@/components/SummonerLeagueContainer';
import SummonerProfile from '@/components/SummonerProfile';
import { SERVER_REQUEST_HOST } from '@/constant/API';
import { backendRequest } from '@/service/axios';
import { getSummonerInfoData } from '@/service/server.api';

export default async function SummonerPage({ params }: { params: { summoner: string } }) {
  const decodedStr = decodeURIComponent(params.summoner);
  const summonerData = await getSummonerInfoData(decodedStr);
  const { data: championData } = await backendRequest.get(`${SERVER_REQUEST_HOST.CHAMPION_DATA}`);

  return (
    <>
      <SummonerLeagueContainer summonerId={summonerData.id} />
    </>
  );
}
