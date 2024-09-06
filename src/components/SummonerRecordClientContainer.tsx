'use client';

import { MatchDtoType } from '@/types/response';
import { ChampionsDataType, RunesDataType } from '@/types/staticData';
import ContentBox from './common/ContentBox';
import Image from 'next/image';
import useInfinityRecordData from '@/hook/useInfinityRecordData';

interface SummonerRecordClientContainerProps {
  data: {
    championsData: ChampionsDataType[];
    latestVersion: string;
    runesDataArr: RunesDataType[];
    initialRecordData: MatchDtoType[];
  };
  puuid: string;
}

export default function SummonerRecordClientContainer({ data, puuid }: SummonerRecordClientContainerProps) {
  const { championsData, latestVersion, runesDataArr, initialRecordData } = data;
  const {
    data: refetchData,
    isFetching,
    refetchNextPage,
  } = useInfinityRecordData({ initialData: initialRecordData, puuid });

  if (!initialRecordData.length) {
    return (
      <ContentBox titleText="최근 게임">
        <div className="px-[1.6rem] flex justify-center items-center pt-[3.2rem] pb-[6.4rem]">
          <div className="flex flex-col items-center gap-[1.6rem]">
            <Image src={'/images/em_bee_sad.png'} width={128} height={128} alt="슬픈 벌꿀 이미지" />
            <div className="text-[1.6rem]">최근 기록된 전적이 없습니다.</div>
          </div>
        </div>
      </ContentBox>
    );
  }
  console.log(refetchData);
  return (
    <>
      <button type="button" onClick={() => refetchNextPage()}>
        다음
      </button>
      {refetchData.map((item, index) => (
        <div key={index}>{index}</div>
      ))}
    </>
  );
}
