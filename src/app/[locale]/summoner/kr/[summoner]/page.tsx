import SummonerContentContainer from '@/components/SummonerContentContainer';

import { GameType, LanguageParamsType } from '@/types';
import { Suspense } from 'react';

export async function generateMetadata({ params }: { params: { summoner: string } }) {
  const summoner = params.summoner.replace('-', '#');
  const summonerName = decodeURIComponent(summoner);
  return {
    title: `${summonerName} 전적 검색`,
  };
}

export default async function SummonerPage({
  params: { summoner, locale },
  searchParams,
}: {
  params: { summoner: string; locale: LanguageParamsType };
  searchParams: { [key: string]: GameType };
}) {
  const { queue_type } = searchParams;

  return (
    <SummonerContentContainer summonerName={decodeURIComponent(summoner)} gameType={queue_type} language={locale} />
  );
}
