import { STATIC_DATA_HOST } from '@/constant/API';
import Image from 'next/image';
import ChampionMasteryContainer from './ChampionMasteryContainer';

interface SummonerProfileProps {
  summonerData: {
    puuid: string;
    gameName: string;
    tagLine: string;
    id: string;
    accountId: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
  };
  champData: any;
}

export default async function SummonerProfile({ summonerData, champData }: SummonerProfileProps) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-[1.6rem]">
        <div className="profile-img-box">
          <Image
            src={`${STATIC_DATA_HOST.PROFILE_ICON_IMG}${summonerData.profileIconId}.png`}
            width={128}
            height={128}
            alt="프로필 이미지"
            className="rounded-[0.8rem]"
          />
          <span className="absolute bottom-[-8%] left-[50%] translate-x-[-50%] bg-color-primary-500 leading-[1] px-[0.8rem] py-[0.4rem] text-[1.4rem] rounded-[0.4rem] text-[#fff]">
            {summonerData.summonerLevel}
          </span>
        </div>
        <div>
          <h1 className="text-[2.8rem] font-bold">{summonerData.gameName}</h1>
          <span className="text-[2.4rem] text-color-gray-500">#{summonerData.tagLine}</span>
        </div>
      </div>
      <ChampionMasteryContainer puuid={summonerData.puuid} champData={champData} />
    </div>
  );
}
