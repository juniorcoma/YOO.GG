import GameTypeControlBar from '@/components/GameTypeControlBar';
import SummonerProfile from '@/components/SummonerProfile';

import { getSummonerData } from '@/service/requestJsonData.api';
import { notFound } from 'next/navigation';

export default async function SummonerLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactElement;
  params: { summoner: string };
}>) {
  const [name, tag] = decodeURIComponent(params.summoner).split('-');
  const summonerData = await getSummonerData(name, tag);

  if (summonerData.error) {
    return notFound();
  }

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
