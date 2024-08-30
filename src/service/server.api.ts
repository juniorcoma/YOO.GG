import { RotationsDataType } from '@/types/response';
import { backendRequest } from './axios';
import { SERVER_REQUEST_HOST } from '@/constant/API';
import { SpellKeyType } from '@/types';

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

export async function getChampionOtherData(champkey: string, skillKey: SpellKeyType) {
  const { data } = await backendRequest.get(
    `${SERVER_REQUEST_HOST.CHAMPION_OTHER_DATA}/${champkey}?skillkey=${skillKey}`,
  );
  return data;
}

export async function getSummonerInfoData(summoner: string) {
  const [name, tag] = summoner.split('-');

  const { data } = await backendRequest.get(`${SERVER_REQUEST_HOST.SUMMONER_INFO}${name}/${tag}`);
  return data;
}

export async function getSummonerChampMastery(puuid: string) {
  const { data } = await backendRequest.get(`${SERVER_REQUEST_HOST.CHAMPION_MASTERY}/${puuid}`);
  return data;
}

export async function getSummonerLeagueInfo(summonerId: string) {
  const { data } = await backendRequest.get(`${SERVER_REQUEST_HOST.SUMMONER_LEAGUE}/${summonerId}`);
  return data;
}

export async function getSummonerRecordList({
  pageParam = 0,
  puuid,
  type,
}: {
  pageParam: number;
  puuid: string;
  type: string;
}) {
  const { data } = await backendRequest.get(
    `${SERVER_REQUEST_HOST.SUMMONER_RECORD_LIST}/${puuid}?start=${pageParam * 20}&type=${type}`,
  );
  return data;
}
