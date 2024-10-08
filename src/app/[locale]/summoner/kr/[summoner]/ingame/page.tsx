import { useTranslations } from 'next-intl';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: { summoner: string } }) {
  const summoner = params.summoner.replace('-', '#');
  const summonerName = decodeURIComponent(summoner);
  return {
    title: `${summonerName} 인게임 정보`,
  };
}
export default function SummonerIngamePage() {
  const t = useTranslations('ingamePage');
  return (
    <div className="w-[108rem] m-auto bg-color-gray-00 rounded-[0.8rem] min-h-[35rem] flex justify-center items-center">
      <div className="flex flex-col gap-[1.6rem] text-[2.4rem] items-center">
        <div className="w-[12.8rem] aspect-square relative">
          <Image src={'/images/em_bee_sad.png'} fill alt="벌꿀 이미지" unoptimized />
        </div>
        <p>{t('title')}</p>
      </div>
    </div>
  );
}
