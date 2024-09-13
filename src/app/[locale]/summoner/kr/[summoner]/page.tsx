import SummonerContentContainer from '@/components/SummonerContentContainer';

import { GameType } from '@/types';
import { Suspense } from 'react';

export async function generateMetadata({ params }: { params: { summoner: string } }) {
  const summoner = params.summoner.replace('-', '#');
  const summonerName = decodeURIComponent(summoner);
  return {
    title: `${summonerName} 전적 검색`,
  };
}

export default async function SummonerPage({
  params,
  searchParams,
}: {
  params: { summoner: string };
  searchParams: { [key: string]: GameType };
}) {
  const { queue_type } = searchParams;

  return <SummonerContentContainer summonerName={decodeURIComponent(params.summoner)} gameType={queue_type} />;
}
