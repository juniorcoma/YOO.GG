import GameTypeControlBar from '@/components/GameTypeControlBar';
import SummonerProfile from '@/components/SummonerProfile';

import { getSummonerData } from '@/service/requestJsonData.api';

import React from 'react';

export default async function SummonerLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactElement;
  params: { summoner: string };
}>) {
  const [name, tag] = decodeURIComponent(params.summoner).split('-');
  const summonerData = await getSummonerData(name, tag);

  return (
    <>
      <div className="content-header">
        <div>
          <SummonerProfile summonerData={summonerData} />
        </div>
      </div>
      <GameTypeControlBar />
      <div className="w-[108rem] m-auto pt-[3.2rem] flex gap-[1.6rem]">{children}</div>
    </>
  );
}
