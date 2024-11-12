import GameTypeControlBar from '@/components/GameTypeControlBar';
import SummonerProfile from '@/components/SummonerProfile';

import { getSummonerData } from '@/service/requestJsonData.api';
import { LanguageParamsType } from '@/types';
import { notFound } from 'next/navigation';

export default async function SummonerLayout({
  children,
  params: { summoner, locale },
}: Readonly<{
  children: React.ReactElement;
  params: { summoner: string; locale: LanguageParamsType };
}>) {
  const [name, tag] = decodeURIComponent(summoner).split('-');
  const summonerData = (await getSummonerData(name, tag)) as any;

  if (summonerData.error) {
    return notFound();
  }

  return (
    <>
      <div className="content-header">
        <div>
          <SummonerProfile summonerData={summonerData} language={locale} />
        </div>
      </div>
      <GameTypeControlBar />
      <main className="w-[108rem] m-auto pt-[3.2rem] flex gap-[1.6rem]">{children}</main>
    </>
  );
}
