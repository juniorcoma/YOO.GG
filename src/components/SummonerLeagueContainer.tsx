import ContentBox from './common/ContentBox';

import { getSummonerLeagueData } from '@/service/requestJsonData.api';
import SummonerTierBox from './contentboxinner/SummonerTierBox';
import { LeagueDataType } from '@/types/response';
import { useTranslations } from 'next-intl';

interface SummonerLeagueContainerProps {
  summonerId: string;
}

export default async function SummonerLeagueContainer({ summonerId }: SummonerLeagueContainerProps) {
  const summonerLeagueData = await getSummonerLeagueData(summonerId);
  console.log(summonerLeagueData);
  return (
    <section className="flex flex-col gap-[1.6rem] w-[38.1rem]">
      <SummonerLeague summonerLeagueData={summonerLeagueData} />
    </section>
  );
}

function SummonerLeague({ summonerLeagueData }: { summonerLeagueData: LeagueDataType[] }) {
  const t = useTranslations('summonerLeagueContent');
  return (
    <>
      <ContentBox titleText={t('contentBox1Title')}>
        <SummonerTierBox
          summonerLeagueData={
            summonerLeagueData.length !== 0 && summonerLeagueData.find(data => data.queueType === 'RANKED_SOLO_5x5')
          }
        />
      </ContentBox>
      <ContentBox titleText={t('contentBox2Title')}>
        <SummonerTierBox
          summonerLeagueData={
            summonerLeagueData.length !== 0 && summonerLeagueData.find(data => data.queueType === 'RANKED_FLEX_SR')
          }
        />
      </ContentBox>
    </>
  );
}
