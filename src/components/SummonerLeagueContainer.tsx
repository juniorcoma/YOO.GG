import { getSummonerLeagueInfo } from '@/service/server.api';
import ContentBox from './ContentBox';
import Image from 'next/image';
import { STATIC_DATA_HOST } from '@/constant/API';
import { LeagueDataType } from '@/types/response';

interface SummonerLeagueContainerProps {
  summonerId: string;
}

export default async function SummonerLeagueContainer({ summonerId }: SummonerLeagueContainerProps) {
  const leagueData = await getSummonerLeagueInfo(summonerId);

  return (
    <div className="flex flex-col gap-[1.6rem] w-[38.1rem]">
      <ContentBox titleText="솔로랭크">
        <SummonerTierBox data={leagueData.find((data: LeagueDataType) => data.queueType === 'RANKED_SOLO_5x5')} />
      </ContentBox>
      <ContentBox titleText="자유랭크">
        <SummonerTierBox data={leagueData.find((data: LeagueDataType) => data.queueType === 'RANKED_FLEX_SR')} />
      </ContentBox>
    </div>
  );
}

interface SummonerTierBoxProps {
  data?: LeagueDataType;
}

function SummonerTierBox({ data }: SummonerTierBoxProps) {
  const odds = data && Math.floor((data.wins / (data.wins + data.losses)) * 100);
  return (
    <div className="py-[2.4rem] px-[1.6rem] flex gap-[1.6rem]">
      <div className="bg-color-gray-200 w-[8.8rem] h-[8.8rem] rounded-[50%] relative flex justify-center items-center">
        <Image
          src={data ? `${STATIC_DATA_HOST.TIER_IMG}${data?.tier.toLowerCase()}.png` : '/images/unranked_img.png'}
          width={70}
          height={70}
          alt={`${data?.tier} 이미지`}
        />
      </div>
      {data ? (
        <div className="pt-[1.6rem]">
          <div className="font-bold text-[2em] mb-[0.8rem]">
            {data.tier} {data.rank}{' '}
            <span className="font-[400] text-[1.6rem] text-color-gray-500">{data.leaguePoints}P</span>
          </div>
          <div className="text-[1.4rem] text-color-gray-500">
            {data.wins}승 {data.losses}패{' '}
            <span className="text-color-primary-500 text-[1.6rem] ml-[0.8rem]">승률 : {odds}%</span>
          </div>
        </div>
      ) : (
        <div className="self-center text-[2rem] text-color-gray-500">
          <strong>Unranked</strong>
        </div>
      )}
    </div>
  );
}