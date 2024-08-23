import ChampionProfile from '@/components/ChampionProfile';
import ChampionStatContainer from '@/components/ChampionStatContainer';

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
    </>
  );
}
