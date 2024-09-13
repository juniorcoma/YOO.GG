import ChampionProfile from '@/components/ChampionProfile';

import ChampionSkinControlContainer from '@/components/ChampionSkinControlContainer';
import ChampionStatContainer from '@/components/ChampionStatContainer';

import ContentBox from '@/components/common/ContentBox';
import ChampionInfoContainer from '@/components/container/ChampionInfoContainer';
import ChampionSkillBox from '@/components/contentboxinner/ChampionSkillBox';
import ChampionStatTable from '@/components/contentboxinner/ChampionStatTable';

import { CHAMPION_POSITION_DATA } from '@/constant';
import { getChampionData, getCommunityChampionData, getVersionsData } from '@/service/requestJsonData.api';
import { LanguageParamsType } from '@/types';
import { useTranslations } from 'next-intl';

export async function generateMetadata({ params }: { params: { champname: string } }) {
  const { champname } = params;
  const champDetailData = await getChampionData(champname);
  return {
    title: {
      absolute: `챔피언 정보-${champDetailData.name}`,
    },
  };
}

export default async function ChampInfoPage({ params }: { params: { champname: string; locale: LanguageParamsType } }) {
  const { champname, locale } = params;
  const champDetailData = await getChampionData(champname);
  const { passive, spells } = await getCommunityChampionData(champDetailData.key);
  const [latestVersion] = await getVersionsData();

  return (
    <>
      <div className="content-header">
        <div>
          <div className="flex justify-between items-center">
            <ChampionProfile
              id={champDetailData.key}
              img={champDetailData.image.full}
              name={champDetailData.name}
              title={champDetailData.title}
              position={CHAMPION_POSITION_DATA[champDetailData.id]}
              tags={champDetailData.tags}
            />
            <ChampionStatContainer info={champDetailData.info} />
          </div>
        </div>
      </div>
      <main className="w-[108rem] pt-[3.2rem] m-auto flex gap-[1.6rem]">
        <ChampionInfoContainer
          champDetailData={champDetailData}
          latestVersion={latestVersion}
          passive={passive}
          spells={spells}
          champName={champname}
          language={locale}
        />
      </main>
    </>
  );
}
