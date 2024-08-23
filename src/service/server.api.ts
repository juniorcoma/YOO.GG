import { RotationsDataType } from '@/types/response';
import { backendRequest } from './axios';
import { SERVER_REQUEST_HOST } from '@/constant/API';

export async function getRotationsChampion() {
  const { data: champData } = await backendRequest.get(`${SERVER_REQUEST_HOST.CHAMPION_DATA}`);
  const { data: rotationsChampData } = await backendRequest.get<RotationsDataType>(
    `${SERVER_REQUEST_HOST.ROTATIONS_INFO}`,
  );

  const resultData = champData.filter((champ: any) => {
    const { freeChampionIds } = rotationsChampData;
    return freeChampionIds.includes(Number(champ.key));
  });

  return resultData;
}

export async function getChampionDetailData(champname: string) {
  const { data: champDetailData } = await backendRequest.get(
    `${SERVER_REQUEST_HOST.CHAMPION_DETAIL_DATA}/${champname}`,
  );

  return champDetailData;
}
