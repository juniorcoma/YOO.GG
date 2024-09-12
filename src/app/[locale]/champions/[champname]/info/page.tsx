import ChampionProfile from '@/components/ChampionProfile';

import ChampionSkinControlContainer from '@/components/ChampionSkinControlContainer';
import ChampionStatContainer from '@/components/ChampionStatContainer';

import ContentBox from '@/components/common/ContentBox';
import ChampionSkillBox from '@/components/contentboxinner/ChampionSkillBox';
import ChampionStatTable from '@/components/contentboxinner/ChampionStatTable';

import { CHAMPION_POSITION_DATA } from '@/constant';
import { getChampionData, getCommunityChampionData, getVersionsData } from '@/service/requestJsonData.api';

export async function generateMetadata({ params }: { params: { champname: string } }) {
  const { champname } = params;
  const champDetailData = await getChampionData(champname);
  return {
    title: {
      absolute: `챔피언 정보-${champDetailData.name}`,
    },
  };
}

export default async function ChampInfoPage({ params }: { params: { champname: string } }) {
  const { champname } = params;
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
        <div className="flex-1 flex flex-col gap-[1.6rem]">
          <section>
            <ContentBox
              titleText={`${champDetailData.name} 스킬 정보`}
              SubTitleComponent={
                <div className="text-[1.2rem] text-color-gray-500">자세히 볼려면 스킬 클릭하세요!</div>
              }
            >
              <ChampionSkillBox
                skill={[champDetailData.passive, ...champDetailData.spells]}
                communitySkillData={[passive, ...spells]}
                version={latestVersion}
              />
            </ContentBox>
          </section>
          <section>
            <ContentBox
              titleText={`${champDetailData.name} 기본 스탯 정보`}
              SubTitleComponent={
                <span className="text-[1.2rem] text-color-primary-500">메커니즘 : {champDetailData.partype}</span>
              }
            >
              <ChampionStatTable stat={champDetailData.stats} partype={champDetailData.partype} />
            </ContentBox>
          </section>
          <section>
            <ChampionSkinControlContainer
              titleName={champDetailData.name}
              name={params.champname}
              skinRenderList={champDetailData.skins}
            />
          </section>
        </div>
        <div className="w-[39.1rem] flex flex-col gap-[1.6rem]">
          <section>
            <ContentBox titleText="스토리">
              <div className="px-[1.6rem] pt-[1.6rem] pb-[2.4rem] text-[1.6rem]">
                <p>{champDetailData.lore}</p>
              </div>
            </ContentBox>
          </section>
          <section>
            <ContentBox titleText="챔피언 TIP">
              <div className="px-[1.6rem] pt-[1.6rem] pb-[2.4rem] text-[1.6rem]">
                <p className="text-color-primary-500 mb-[1.2rem]">아군일 때</p>
                {champDetailData.allytips.map((tip: string, index: number) => (
                  <p key={index} className="text-[1.4rem] mb-[0.8rem]">
                    {tip}
                  </p>
                ))}
                <p className="text-color-red-500 mb-[1.2rem]">적군일 때</p>
                {champDetailData.enemytips.map((tip: string, index: number) => (
                  <p key={index} className="text-[1.4rem] mb-[0.8rem]">
                    {tip}
                  </p>
                ))}
              </div>
            </ContentBox>
          </section>
        </div>
      </main>
    </>
  );
}
