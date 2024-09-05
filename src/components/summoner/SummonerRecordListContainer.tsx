'use client';

import useGetSummonerRecordList from '@/hook/query/useGetSummonerRecordList';
import ContentBox from '../ContentBox';
import SummonerRecordCard from './SummonerRecordCard';
import { useSearchParams } from 'next/navigation';
import { GameType } from '@/types';

import DoughnutChartBox from '../DoughnutChartBox';
import filterMatchData from '@/utils/filterMatchData';
import totalRecordSummary from '@/utils/totalRecordSummary';
import { MatchDtoType, ParticipantDtoType } from '@/types/response';
import PlayChampionList from '../PlayChampionList';
import SsummonerRecordListContainer from '../skeleton/SummonerRecordListContainer.skeleton';
import Loading from '@/assets/icons/loading.svg';
import Image from 'next/image';

interface SummonerRecordListContainerProps {
  puuid: string;
  championsData: any;
  version: string;
  runesDataArr: any;
}

export default function SummonerRecordListContainer({
  puuid,
  championsData,
  version,
  runesDataArr,
}: SummonerRecordListContainerProps) {
  const searchParams = useSearchParams();
  const type = (searchParams.get('queue_type') as GameType | undefined) || 'TOTAL';
  const { data, fetchNextPage, isPending, isFetchingNextPage, hasNextPage } = useGetSummonerRecordList(puuid, type);

  if (isPending) return <SsummonerRecordListContainer />;

  if (!data) return <div>데이터 없다</div>;
  const recordList: MatchDtoType[] = data.pages.flat();
  const filterSummonerData = filterMatchData(recordList, puuid) as ParticipantDtoType[];

  if (!filterSummonerData.length)
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
  const summaryData = totalRecordSummary(filterSummonerData);

  return (
    <>
      <ContentBox titleText="최근 게임" css="mb-[2.4rem]">
        <div className="py-[1.2rem] px-[1.6rem] flex gap-[4.8rem] text-[1.4rem] text-color-gray-500">
          <DoughnutChartBox win={summaryData.win} lose={summaryData.lose} />
          <div className="self-center">
            <div className="text-[1.2rem] text-color-gray-500">
              <span>{summaryData.avgKill}</span> / <span className="text-color-red-600">{summaryData.avgDeath}</span> /{' '}
              <span>{summaryData.avgAssists}</span>
            </div>
            <div className="text-[2.4rem] text-color-gray-900">
              <strong>{summaryData.totalAvg} : 1</strong>
            </div>
          </div>
          <div>
            <div className="mb-[1.6rem]">많이 플레이한 챔피언 TOP 3 ({recordList.length}게임)</div>
            <PlayChampionList filterData={filterSummonerData} championData={championsData} version={version} />
          </div>
        </div>
      </ContentBox>
      <div className="flex flex-col gap-[0.8rem] mb-[1.6rem]">
        {filterSummonerData.map((record, index) => (
          <div key={index} className="flex flex-col gap-[0.8rem]">
            <SummonerRecordCard.CardLayer
              isWin={record.win}
              gameVersion={recordList[index].info.gameVersion}
              perks={record.perks}
              runesDataArr={runesDataArr}
            >
              <SummonerRecordCard.KeySummary
                isWin={record.win}
                queueId={Number(recordList[index].info.queueId)}
                timeInfo={{
                  gameCreation: recordList[index].info.gameCreation,
                  gameDuration: recordList[index].info.gameDuration,
                }}
              />
              <SummonerRecordCard.DetailInfo
                runesDataArr={runesDataArr}
                participant={record}
                version={version}
                gameVersion={recordList[index].info.gameVersion}
                championsData={championsData}
              />
              <SummonerRecordCard.ParticipantsList
                participants={recordList[index].info.participants}
                puuid={record.puuid}
                version={version}
                championsData={championsData}
              />
            </SummonerRecordCard.CardLayer>
          </div>
        ))}
      </div>
      {hasNextPage ? (
        <button
          className={`h-[5rem] text-[1.6rem] bg-color-gray-00 border border-color-gray-300 w-full rounded-[0.4rem]`}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <div className="loader">
              <Loading />
            </div>
          ) : (
            '더보기'
          )}
        </button>
      ) : (
        <div className="text-[1.6rem] text-center">
          마지막 전적입니다. <br />
          <span className="text-[1.4rem] text-color-gray-400">
            (YOO.GG는 LOL최신 버전에서 이전5버전까지 제공합니다 )
          </span>
        </div>
      )}
    </>
  );
}
