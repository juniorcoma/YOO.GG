'use client';

import { MatchDtoType, ParticipantDtoType } from '@/types/response';
import { ChampionsDataType, ItemsDataType, RunesDataType, SummonerSpellDataType } from '@/types/staticData';
import ContentBox from './common/ContentBox';
import Image from 'next/image';

import DoughnutChartBox from './DoughnutChartBox';
import PlayChampionList from './PlayChampionList';
import totalRecordSummary from '@/utils/totalRecordSummary';
import filterMatchData from '@/utils/filterMatchData';
import CardLayer from './recordcard/CardLayer';
import GameSummary from './recordcard/SummaryContent';
import MainContent from './recordcard/MainContent';
import ParticipantsListContent from './recordcard/ParticipantsListContent';
import Loading from '@/assets/icons/loading.svg';
import useGetSummonerRecordList from '@/hook/query/useGetSummonerRecordList';
import { GameType, LanguageParamsType } from '@/types';
import { useTranslations } from 'next-intl';
import SummonerRecordSkeleton from './skeleton/SummonerRecord.skeleton';
import useGetChampionsData from '@/hook/query/useGetChampionsData';
import { useParams } from 'next/navigation';

interface SummonerRecordClientContainerProps {
  puuid: string;
  latestVersion: string;
  gameType: GameType;
}

export default function SummonerRecordClientContainer({
  puuid,
  latestVersion,
  gameType,
}: SummonerRecordClientContainerProps) {
  const {
    data: summonerRecordList,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isPending,
  } = useGetSummonerRecordList(puuid, gameType);
  const t = useTranslations('summonerRecordContainer');
  const recordListData = summonerRecordList?.pages.flat();
  const { locale }: { locale: LanguageParamsType } = useParams();
  const { data: championsData } = useGetChampionsData(latestVersion, locale);
  if (isPending) {
    return <SummonerRecordSkeleton />;
  }

  if (!recordListData?.length) {
    return (
      <ContentBox titleText={t('recordSummaryText')}>
        <div className="px-[1.6rem] flex justify-center items-center pt-[3.2rem] pb-[6.4rem]">
          <div className="flex flex-col items-center gap-[1.6rem]">
            <Image src={'/images/em_bee_sad.png'} width={128} height={128} alt="슬픈 벌꿀 이미지" />
            <div className="text-[1.6rem]">{t('noRecordBoxText')}</div>
          </div>
        </div>
      </ContentBox>
    );
  }

  const recordSummaryData = totalRecordSummary(recordListData, puuid);
  return (
    <>
      <ContentBox titleText={t('recordSummaryText')} css="mb-[2.4rem]">
        <div className="py-[1.2rem] px-[1.6rem] flex gap-[4.8rem] text-[1.4rem] text-color-gray-500">
          <DoughnutChartBox win={recordSummaryData.win} lose={recordSummaryData.lose} />
          <div className="self-center">
            <div className="text-[1.2rem] text-color-gray-500">
              <span>{recordSummaryData.avgKill}</span> /{' '}
              <span className="text-color-red-600">{recordSummaryData.avgDeath}</span> /{' '}
              <span>{recordSummaryData.avgAssists}</span>
            </div>
            <div className="text-[2.4rem] text-color-gray-900">
              <strong>{recordSummaryData.totalAvg} : 1</strong>
            </div>
          </div>
          <div>
            <div className="mb-[1.6rem]">
              {t('manyPlayChampText')} ({recordListData.length}
              {t('gameCount')})
            </div>
            <PlayChampionList
              filterData={filterMatchData(recordListData, puuid)}
              version={latestVersion}
              championsData={championsData.data}
            />
          </div>
        </div>
      </ContentBox>
      <div className="flex flex-col gap-[0.8rem] mb-[1.6rem]">
        {recordListData.map((record, index) => {
          const summonerGameInfo = record.info.participants.find(
            participant => participant.puuid === puuid,
          ) as ParticipantDtoType;
          return (
            <div key={index} className="flex flex-col gap-[0.8rem]">
              <CardLayer
                isWin={summonerGameInfo.win}
                gameVersion={record.info.gameVersion}
                perks={summonerGameInfo.perks}
              >
                <GameSummary
                  isWin={summonerGameInfo.win}
                  queueId={Number(record.info.queueId)}
                  timeInfo={{ gameCreation: record.info.gameCreation, gameDuration: record.info.gameDuration }}
                />
                <MainContent
                  participant={summonerGameInfo}
                  version={latestVersion}
                  gameVersion={record.info.gameVersion}
                />
                <ParticipantsListContent
                  participants={record.info.participants}
                  puuid={puuid}
                  version={latestVersion}
                  championsData={championsData.data}
                />
              </CardLayer>
            </div>
          );
        })}
      </div>
      {hasNextPage ? (
        <button
          className={`h-[5rem] text-[1.6rem] bg-color-gray-00 border border-color-gray-300 w-full rounded-[0.4rem]`}
          onClick={() => fetchNextPage()}
          disabled={isFetching}
        >
          {isFetching ? (
            <div className="loader">
              <Loading />
            </div>
          ) : (
            t('moreBtnText')
          )}
        </button>
      ) : (
        <div className="text-[1.6rem] text-center">
          {t('lastRecordText1')}
          <br />
          <span className="text-[1.4rem] text-color-gray-400">{t('lastRecordText2')}</span>
        </div>
      )}
    </>
  );
}
