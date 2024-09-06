import ContentBox from './common/ContentBox';

import { getSummonerLeagueData } from '@/service/requestJsonData.api';
import SummonerTierBox from './contentboxinner/SummonerTierBox';

interface SummonerLeagueContainerProps {
  summonerId: string;
}

export default async function SummonerLeagueContainer({ summonerId }: SummonerLeagueContainerProps) {
  const summonerLeagueData = await getSummonerLeagueData(summonerId);

  return (
    <section className="flex flex-col gap-[1.6rem] w-[38.1rem]">
      <ContentBox titleText="솔로랭크">
        <SummonerTierBox summonerLeagueData={summonerLeagueData.find(data => data.queueType === 'RANKED_SOLO_5x5')} />
      </ContentBox>
      <ContentBox titleText="자유랭크">
        <SummonerTierBox summonerLeagueData={summonerLeagueData.find(data => data.queueType === 'RANKED_FLEX_SR')} />
      </ContentBox>
    </section>
  );
}
