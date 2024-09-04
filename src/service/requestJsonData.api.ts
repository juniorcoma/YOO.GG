'use server';

import { COMMUNITY_DRAGON_DATA_URL, DDRAGON_DATA_URL, SERVER_REQUEST_URL } from '@/constant/API';
import { LeagueDataType, RotationsDataType } from '@/types/response';

export async function getVersionsData() {
  const versionResponse = await fetch(`${DDRAGON_DATA_URL.VERSION}`, {
    next: { revalidate: false, tags: ['versions'] },
  });

  const versionsData = await versionResponse.json();
  return versionsData;
}

export async function getChampionsData(isReturn?: boolean) {
  const [latestVersion] = await getVersionsData();

  const requestUrl = DDRAGON_DATA_URL.CHAMPIONS.replace('{VERSION}', latestVersion);

  const championsResponse = await fetch(requestUrl, {
    next: { revalidate: false, tags: ['champions'] },
  });
  const championsData = await championsResponse.json();
  if (isReturn) {
    return Object.values(championsData.data);
  }
}

export async function getSummonerSpellsData() {
  const [latestVersion] = await getVersionsData();

  const requestUrl = DDRAGON_DATA_URL.SUMMONER_SPELLS.replace('{VERSION}', latestVersion);

  const summonerSpellsResponse = await fetch(requestUrl, {
    next: { revalidate: false, tags: ['summonerSpells'] },
  });

  const { data } = await summonerSpellsResponse.json();

  return Object.values(data);
}

export async function getChampionData(champName: string) {
  const [latestVersion] = await getVersionsData();
  const requestUrl = DDRAGON_DATA_URL.CHAMPION.replace('{VERSION}', latestVersion).replace('{CHAMPNAME}', champName);

  const championResponse = await fetch(requestUrl, {
    cache: 'no-store',
  });

  const { data } = await championResponse.json();

  return data[champName];
}

export async function getItemsData() {
  const [latestVersion] = await getVersionsData();

  const requestUrl = DDRAGON_DATA_URL.ITEMS.replace('{VERSION}', latestVersion);

  const itemsResponse = await fetch(requestUrl, {
    next: { revalidate: false, tags: ['items'] },
  });

  const { data } = await itemsResponse.json();

  return data;
}

export async function getCommunityChampionData(id: string) {
  const requestUrl = COMMUNITY_DRAGON_DATA_URL.CHAMPION.replace('{CHAMPID}', id);

  const championResponse = await fetch(requestUrl, {
    cache: 'no-store',
  });

  const championData = await championResponse.json();

  return championData;
}

export async function getRotationsChampionsData() {
  const rotationsResponse = await fetch(`${SERVER_REQUEST_URL.ROTATIONS}`);
  const rotationsData: RotationsDataType = await rotationsResponse.json();

  return rotationsData;
}

export async function getSummonerData(name: string, tag: string) {
  const requestUrl = `${SERVER_REQUEST_URL.SUMMONER}${name}/${tag}`;

  const summonerResponse = await fetch(requestUrl, {
    cache: 'no-store',
  });

  const summonerData = await summonerResponse.json();

  return summonerData;
}

export async function getChampionMasteryData(puuid: string) {
  const requestUrl = `${SERVER_REQUEST_URL.CHAMPION_MASTERY}${puuid}`;

  const championMasteryResponse = await fetch(requestUrl, {
    cache: 'no-store',
  });

  const championMasteryData = await championMasteryResponse.json();

  return championMasteryData;
}

export async function getSummonerLeagueData(summonerId: string) {
  const requestUrl = `${SERVER_REQUEST_URL.SUMMONER_LEAGUE}${summonerId}`;

  const summonerLeagueResponse = await fetch(requestUrl, {
    cache: 'no-cache',
  });

  const summonerLeagueData: LeagueDataType[] = await summonerLeagueResponse.json();

  return summonerLeagueData;
}

export async function getRunesData() {
  const versionData = await getVersionsData();
  const versionSliceArr = versionData.slice(0, 5);

  const runeDataArr = await Promise.all(
    versionSliceArr.map(async (version: string) => {
      const requestUrl = DDRAGON_DATA_URL.RUNES.replace('{VERSION}', version);
      const responseData = await fetch(requestUrl);
      const runesData = await responseData.json();
      return { [version]: runesData };
    }),
  );
  return runeDataArr;
}
