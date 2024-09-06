import { COMMUNITY_DRAGON_IMG_URL } from '@/constant/API';
import { LeagueDataType } from '@/types/response';
import Image from 'next/image';

interface SummonerTierBoxProps {
  summonerLeagueData?: LeagueDataType;
}

export default function SummonerTierBox({ summonerLeagueData }: SummonerTierBoxProps) {
  const odds =
    summonerLeagueData &&
    Math.floor((summonerLeagueData.wins / (summonerLeagueData.wins + summonerLeagueData.losses)) * 100);
  return (
    <div className="py-[2.4rem] px-[1.6rem] flex gap-[1.6rem]">
      <div className="bg-color-gray-200 w-[8.8rem] h-[8.8rem] rounded-[50%] relative flex justify-center items-center">
        <Image
          src={
            summonerLeagueData
              ? `${COMMUNITY_DRAGON_IMG_URL.TIER}${summonerLeagueData?.tier.toLowerCase()}.png`
              : '/images/unranked_img.png'
          }
          width={70}
          height={70}
          alt={`${summonerLeagueData?.tier} 이미지`}
          unoptimized
        />
      </div>
      {summonerLeagueData ? (
        <div className="pt-[1.6rem]">
          <div className="font-bold text-[2em] mb-[0.8rem]">
            {summonerLeagueData.tier} {summonerLeagueData.rank}{' '}
            <span className="font-[400] text-[1.6rem] text-color-gray-500">{summonerLeagueData.leaguePoints}P</span>
          </div>
          <div className="text-[1.4rem] text-color-gray-500">
            {summonerLeagueData.wins}승 {summonerLeagueData.losses}패{' '}
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
