import ChampionListContainer from '@/components/ChampionListContainer';
import ChampionSearchBar from '@/components/ChmapionSearchBar';
import ContentBox from '@/components/ContentBox';
import FavoriteChampionBox from '@/components/FavoriteChampionBox';

import { CHAMPION_POSITION_DATA } from '@/constant';

import { getChampionsData, getVersionsData } from '@/service/requestJsonData.api';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '챔피언 리스트',
};

export default async function ChmapionListPage() {
  const championsData: any = await getChampionsData(true);
  const positionChampData = championsData.map((champ: any) => ({
    ...champ,
    position: CHAMPION_POSITION_DATA[champ.id],
  }));

  const [latestVersion] = await getVersionsData();
  return (
    <>
      <div className="content-header">
        <div>
          <div className="flex flex-col gap-[0.4rem] mb-[1.2rem]">
            <h1 className="text-[2.4rem]">챔피언 분석</h1>
            <p className="font-bold text-[1.4rem] text-color-gray-500">
              롤 14.15패치의 챔피언 정보입니다.
              <br /> 협곡 챔피언 분석으로 챔피언의 새로운 점을 알아보세요!
            </p>
          </div>
          <ChampionSearchBar championsData={positionChampData} version={latestVersion} />
        </div>
      </div>
      <div className="w-[108rem] pt-[3.2rem] m-auto flex gap-[1.6rem]">
        <ContentBox titleText="즐겨찾기" css="w-[36rem]">
          <FavoriteChampionBox championsData={positionChampData} version={latestVersion} />
        </ContentBox>
        <ChampionListContainer championsData={positionChampData} version={latestVersion} />
      </div>
    </>
  );
}
