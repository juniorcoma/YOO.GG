import ChampionListContainer from '@/components/ChampionListContainer';
import ChampionSearchBar from '@/components/ChampionSearchBar';

import ContentBox from '@/components/common/ContentBox';
import FavoriteChampionBox from '@/components/contentboxinner/FavoriteChampionBox';

import { CHAMPION_POSITION_DATA } from '@/constant';

import { getChampionsData, getVersionsData } from '@/service/requestJsonData.api';
import { LanguageParamsType } from '@/types';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: '챔피언 리스트',
};

export default async function ChmapionListPage({ params: { locale } }: { params: { locale: LanguageParamsType } }) {
  const championsData = await getChampionsData(locale);
  const positionChampData = championsData.map(champ => ({
    ...champ,
    position: CHAMPION_POSITION_DATA[champ.id],
  }));

  const [latestVersion] = await getVersionsData();
  return (
    <>
      <div className="content-header">
        <div>
          <ContentHeaderTextBox />
          <ChampionSearchBar championsData={positionChampData} version={latestVersion} />
        </div>
      </div>
      <div className="w-[108rem] pt-[3.2rem] m-auto flex gap-[1.6rem]">
        <aside>
          <ContentBox titleText={locale === 'ko' ? '즐겨찾기' : 'Favorite'} css="w-[36rem]">
            <FavoriteChampionBox championsData={positionChampData} version={latestVersion} />
          </ContentBox>
        </aside>
        <ChampionListContainer championsData={positionChampData} version={latestVersion} />
      </div>
    </>
  );
}

function ContentHeaderTextBox() {
  const t = useTranslations('championListPage');
  return (
    <div className="flex flex-col gap-[0.4rem] mb-[1.2rem]">
      <h1 className="text-[2.4rem]">{t('contentHeaderTitle')}</h1>
      <p className="font-bold text-[1.4rem] text-color-gray-500">
        {t('contentHeaderDescription1')}
        <br /> {t('contentHeaderDescription2')}
      </p>
    </div>
  );
}
