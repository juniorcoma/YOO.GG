import SummonerRecordListContainer from '@/components/summoner/SummonerRecordListContainer';
import SummonerLeagueContainer from '@/components/SummonerLeagueContainer';

import { getChampionsData, getRunesData, getSummonerData, getVersionsData } from '@/service/requestJsonData.api';

export async function generateMetadata({ params }: { params: { summoner: string } }) {
  const summoner = params.summoner.replace('-', '#');
  const summonerName = decodeURIComponent(summoner);
  return {
    title: `${summonerName} 전적 검색`,
  };
}

export default async function SummonerPage({ params }: { params: { summoner: string } }) {
  const [name, tag] = decodeURIComponent(params.summoner).split('-');
  const { id, puuid } = await getSummonerData(name, tag);
  const championsData = await getChampionsData(true);
  const [latestVersion] = await getVersionsData();
  const runesDataArr = await getRunesData();

  return (
    <>
      <SummonerLeagueContainer summonerId={id} />
      <div className="flex-1 min-h-[60rem]">
        <SummonerRecordListContainer
          puuid={puuid}
          championsData={championsData}
          version={latestVersion}
          runesDataArr={runesDataArr}
        />
      </div>
    </>
  );
}
