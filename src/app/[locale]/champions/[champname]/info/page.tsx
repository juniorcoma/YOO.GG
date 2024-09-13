import ChampionProfile from '@/components/ChampionProfile';

import ChampionStatContainer from '@/components/ChampionStatContainer';

import ChampionInfoContainer from '@/components/container/ChampionInfoContainer';

import { CHAMPION_POSITION_DATA } from '@/constant';
import { getChampionData, getCommunityChampionData, getVersionsData } from '@/service/requestJsonData.api';
import { LanguageParamsType } from '@/types';

export async function generateMetadata({
  params: { champname, locale },
}: {
  params: { champname: string; locale: LanguageParamsType };
}) {
  const champDetailData = await getChampionData(champname, locale);
  return {
    title: {
      absolute: `챔피언 정보-${champDetailData.name}`,
    },
  };
}

export default async function ChampInfoPage({
  params: { locale, champname },
}: {
  params: { champname: string; locale: LanguageParamsType };
}) {
  const champDetailData = await getChampionData(champname, locale);
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
              language={locale}
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
