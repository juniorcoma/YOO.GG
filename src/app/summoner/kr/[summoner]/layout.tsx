import GameTypeControlBar from '@/components/GameTypeControlBar';
import SummonerProfile from '@/components/SummonerProfile';
import { SERVER_REQUEST_HOST } from '@/constant/API';
import { backendRequest } from '@/service/axios';
import { getSummonerInfoData } from '@/service/server.api';
import React from 'react';

export default async function SummonerLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactElement;
  params: { summoner: string };
}>) {
  const decodedStr = decodeURIComponent(params.summoner);
  const summonerData = await getSummonerInfoData(decodedStr);
  const { data: championData } = await backendRequest.get(`${SERVER_REQUEST_HOST.CHAMPION_DATA}`);
  console.log(summonerData);
  return (
    <>
      <div className="content-header">
        <div>
          <SummonerProfile summonerData={summonerData} champData={championData} />
        </div>
      </div>
      <GameTypeControlBar />
      <div className="w-[108rem] m-auto pt-[3.2rem] flex gap-[1.6rem]">{children}</div>
    </>
  );
}
