import { STATIC_DATA_HOST } from '@/constant/API';
import { getSummonerChampMastery } from '@/service/server.api';
import Image from 'next/image';

interface ChampionMasteryContainerProps {
  puuid: string;
  champData: any;
}

export default async function ChampionMasteryContainer({ puuid, champData }: ChampionMasteryContainerProps) {
  const championMasteryData = await getSummonerChampMastery(puuid);

  return (
    <ul className="flex gap-[3.2rem]">
      {championMasteryData.map((item: any) => {
        const matchChampData = champData.find((champ: any) => item.championId === Number(champ.key));

        return (
          <li key={item.championId} className="flex flex-col gap-[0.4rem]">
            <div className="relative w-[6.8rem] h-[12rem] overflow-hidden rounded-[0.4rem]">
              <Image
                src={`${STATIC_DATA_HOST.CHAMPION_LOADING_IMG}${matchChampData.id}_0.jpg`}
                fill
                alt={`${matchChampData.name} 로딩 이미지`}
                className="scale-110"
              />
            </div>
            <div className="text-center">
              <strong className="text-[1.6rem]">{matchChampData.name}</strong>
              <span className="text-[1.2rem] text-color-gray-500">
                {item.championPoints.toLocaleString()} <br /> 포인트
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
