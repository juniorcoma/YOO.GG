import SummonerRecordListContainer from '@/components/summoner/SummonerRecordListContainer';
import SummonerContentContainer from '@/components/SummonerContentContainer';
import SummonerLeagueContainer from '@/components/SummonerLeagueContainer';

import {
  getChampionsData,
  getInitialRecordData,
  getRunesData,
  getSummonerData,
  getVersionsData,
} from '@/service/requestJsonData.api';
import { GameType } from '@/types';

export async function generateMetadata({ params }: { params: { summoner: string } }) {
  const summoner = params.summoner.replace('-', '#');
  const summonerName = decodeURIComponent(summoner);
  return {
    title: `${summonerName} 전적 검색`,
  };
}

export default async function SummonerPage({
  params,
  searchParams,
}: {
  params: { summoner: string };
  searchParams: { [key: string]: GameType };
}) {
  const { queue_type } = searchParams;
  const [name, tag] = decodeURIComponent(params.summoner).split('-');
  const { id, puuid } = await getSummonerData(name, tag);
  const championsData = await getChampionsData();
  const [latestVersion] = await getVersionsData();
  const runesDataArr = await getRunesData();

  return (
    <>
      <SummonerLeagueContainer summonerId={id} />
      <div className="flex-1 min-h-[60rem]">
        {/* <SummonerRecordListContainer
          puuid={puuid}
          championsData={championsData}
          version={latestVersion}
          runesDataArr={runesDataArr}
        /> */}
      </div>
      <SummonerContentContainer summonerName={decodeURIComponent(params.summoner)} gameType={queue_type} />
    </>
  );
}
