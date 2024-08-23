import ChampionProfile from '@/components/ChampionProfile';
import ChampionSkillBox from '@/components/ChampionSkillBox';
import ChampionStatContainer from '@/components/ChampionStatContainer';
import HomeContentBox from '@/components/homecontent/HomeContentBox';

import { CHAMPION_POSITION_DATA } from '@/constant';
import { getChampionDetailData } from '@/service/server.api';

export default async function ChampInfoPage({ params }: { params: { champname: string } }) {
  const champDetailData = await getChampionDetailData(params.champname);
  console.log(champDetailData);
  return (
    <>
      <div className="content-header">
        <div>
          <div className="flex justify-between items-center">
            <ChampionProfile
              img={champDetailData.image.full}
              name={champDetailData.name}
              title={champDetailData.title}
              position={CHAMPION_POSITION_DATA[champDetailData.id]}
            />
            <ChampionStatContainer info={champDetailData.info} />
          </div>
        </div>
      </div>
      <main className="w-[108rem] pt-[3.2rem] m-auto flex gap-[1.6rem]">
        <div className="flex-1 flex flex-col gap-[1.6rem]">
          <HomeContentBox titleText="스킬정보">
            <ChampionSkillBox passive={champDetailData.passive} skill={champDetailData.spells} />
          </HomeContentBox>
          <HomeContentBox titleText="스킬정보">
            <div>gd</div>
          </HomeContentBox>
          <HomeContentBox titleText="스킬정보">
            <div>gd</div>
          </HomeContentBox>
          <HomeContentBox titleText="스킬정보">
            <div>gd</div>
          </HomeContentBox>
        </div>
        <div className="w-[39.1rem] flex flex-col gap-[1.6rem]">
          <HomeContentBox titleText="스토리">
            <div className="px-[1.6rem] pt-[1.6rem] pb-[2.4rem] text-[1.6rem]">
              <p>{champDetailData.lore}</p>
            </div>
          </HomeContentBox>
          <HomeContentBox titleText="챔피언 TIP">
            <div className="px-[1.6rem] pt-[1.6rem] pb-[2.4rem] text-[1.6rem]">
              <p className="text-color-primary-500 mb-[1.2rem]">아군일 때</p>
              {champDetailData.allytips.map((tip: string[], index: number) => (
                <p key={index} className="text-[1.4rem] mb-[0.8rem]">
                  {tip}
                </p>
              ))}
              <p className="text-color-red-500 mb-[1.2rem]">적군일 때</p>
              {champDetailData.enemytips.map((tip: string[], index: number) => (
                <p key={index} className="text-[1.4rem] mb-[0.8rem]">
                  {tip}
                </p>
              ))}
            </div>
          </HomeContentBox>
        </div>
      </main>
    </>
  );
}
