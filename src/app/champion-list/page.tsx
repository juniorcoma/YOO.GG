import ChampionListContainer from '@/components/ChampionListContainer';
import ChampionSearchBar from '@/components/ChmapionSearchBar';
import FavoriteChampionBox from '@/components/FavoriteChampionBox';
import HomeContentBox from '@/components/homecontent/HomeContentBox';
import { CHAMPION_POSITION_DATA } from '@/constant';
import { SERVER_REQUEST_HOST } from '@/constant/API';
import { backendRequest } from '@/service/axios';

export default async function ChmapionListPage() {
  const { data: championData } = await backendRequest.get(`${SERVER_REQUEST_HOST.CHAMPION_DATA}`);

  const positionChampData = championData.map((champ: any) => ({
    ...champ,
    position: CHAMPION_POSITION_DATA[champ.id],
  }));

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
          <ChampionSearchBar championData={championData} />
        </div>
      </div>
      <div className="w-[108rem] pt-[3.2rem] m-auto flex gap-[1.6rem]">
        <HomeContentBox titleText="즐겨찾기" css="w-[36rem]">
          <FavoriteChampionBox />
        </HomeContentBox>
        <ChampionListContainer championData={positionChampData} />
      </div>
    </>
  );
}
