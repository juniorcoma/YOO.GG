import InGameContainer from '@/components/ingame/InGameContainer';
import { getInGameData, getVersionsData } from '@/service/requestJsonData.api';
import { LanguageParamsType } from '@/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: { summoner: string } }) {
  const summoner = params.summoner.replace('-', '#');
  const summonerName = decodeURIComponent(summoner);
  return {
    title: `${summonerName} 인게임 정보`,
  };
}
export default async function SummonerIngamePage({
  params,
}: {
  params: { summoner: string; locale: LanguageParamsType };
}) {
  const [name, tag] = params.summoner.split('-');

  const inGameData = await getInGameData(name, tag);
  const [gameVersion] = await getVersionsData();
  return (
    <div
      className={`w-[108rem] m-auto bg-color-gray-00 rounded-[0.8rem] min-h-[35rem] ${
        !inGameData.ingame ? 'flex justify-center items-center' : ''
      }`}
    >
      <InGameContainer inGameData={inGameData} locale={params.locale} gameVersion={gameVersion} />
    </div>
  );
}
