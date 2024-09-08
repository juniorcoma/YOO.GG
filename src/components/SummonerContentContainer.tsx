import { getSummonerData } from '@/service/requestJsonData.api';
import { GameType } from '@/types';
import SummonerLeagueContainer from './SummonerLeagueContainer';

import { Suspense } from 'react';
import SsummonerRecordListContainer from './skeleton/SummonerRecordListContainer.skeleton';
import SummonerRecordServerContainer from './SummonerRecordServerContainer';

interface SummonerContentContainerProps {
  summonerName: string;
  gameType: GameType;
}

export const revalidate = 0;

export default async function SummonerContentContainer({ summonerName, gameType }: SummonerContentContainerProps) {
  const [name, tag] = summonerName.split('-');
  const { id, puuid } = await getSummonerData(name, tag);
  return (
    <>
      <SummonerLeagueContainer summonerId={id} />
      <div className="flex-1 min-h-[60rem]">
        <Suspense fallback={<SsummonerRecordListContainer />}>
          <SummonerRecordServerContainer puuid={puuid} gameType={gameType} />
        </Suspense>
      </div>
    </>
  );
}
