import ContentBox from '@/components/common/ContentBox';
import RotationsList from '@/components/contentboxinner/RotationsList';
import LolMusicListContainer from '@/components/LolMusicListContainer';

import SummonerSearchForm from '@/components/summonersearchform/SummonerSearchForm';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

export default function Home({ params }: { params: { locale: 'en' | 'ko' } }) {
  const t = useTranslations('homePage');
  return (
    <div className="layout-container">
      <div className="content-wrapper ">
        <main>
          <div className="mt-[6.4rem] mb-[4.8rem]">
            <img
              className="m-auto"
              src={'/images/home_main_img.png'}
              width={316}
              height={224}
              alt="YOO.GG 메인 이미지"
            />
          </div>
          <div className="w-[80rem] m-auto">
            <SummonerSearchForm inputId="main-home-search-input" />
          </div>
          <div className="flex flex-col py-[6.4rem] gap-[3.2rem]">
            <div className="flex gap-[3.2rem] h-[30rem]">
              <section>
                <LolMusicListContainer />
              </section>
              <section>
                <ContentBox titleText={t('rotationsContentBox')} css="flex-1">
                  <RotationsList language={params.locale} />
                </ContentBox>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
