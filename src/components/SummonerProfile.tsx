import Image from 'next/image';
import ChampionMasteryContainer from './ChampionMasteryContainer';
import imgSrcVersionLoader from '@/utils/imgSrcVersionLoader';
import { getVersionsData } from '@/service/requestJsonData.api';
import { AccountType, SummonerDataType } from '@/types/response';
import { LanguageParamsType } from '@/types';
import RefetchRecordDataButton from './recordcard/RefetchRecordDataButton';

interface SummonerProfileProps {
  summonerData: AccountType & SummonerDataType;
  language: LanguageParamsType;
}

export default async function SummonerProfile({ summonerData, language }: SummonerProfileProps) {
  const [lastestVersion] = await getVersionsData();
  return (
    <div className="flex justify-between">
      <div className="flex gap-[1.6rem]">
        <div className="profile-img-box">
          <img
            src={`${imgSrcVersionLoader(lastestVersion, 'PROFILE')}${summonerData.profileIconId}.png`}
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
          <div className="text-[2.4rem] text-color-gray-500">#{summonerData.tagLine}</div>
          <RefetchRecordDataButton puuid={summonerData.puuid} />
        </div>
      </div>
      <ChampionMasteryContainer puuid={summonerData.puuid} language={language} />
    </div>
  );
}
