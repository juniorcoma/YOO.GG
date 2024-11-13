'use server';

import {
  COMMUNITY_DRAGON_DATA_URL,
  DDRAGON_DATA_URL,
  REQUEST_LANGUAGE_MATCHER,
  SERVER_REQUEST_URL,
} from '@/constant/API';
import { GameType, LanguageParamsType } from '@/types';
import {
  AccountType,
  ChampionMasteryDataType,
  LeagueDataType,
  MatchDtoType,
  RotationsDataType,
  SummonerDataType,
} from '@/types/response';
import {
  ChampionDataType,
  ChampionsDataType,
  CommunityChampionDataType,
  ItemsDataType,
  RunesDataType,
  SummonerSpellDataType,
} from '@/types/staticData';
import { revalidateTag } from 'next/cache';

export async function getVersionsData(): Promise<string[]> {
  const versionResponse = await fetch(`${DDRAGON_DATA_URL.VERSION}`, { next: { tags: ['version'] } });

  const versionsData = await versionResponse.json();
  return versionsData;
}

export async function getChampionsData(lang: LanguageParamsType): Promise<ChampionsDataType[]> {
  const [latestVersion] = await getVersionsData();
  const language = REQUEST_LANGUAGE_MATCHER[lang];
  const requestUrl = DDRAGON_DATA_URL.CHAMPIONS.replace('{VERSION}', latestVersion).replace('{LANGUAGE}', language);

  const championsResponse = await fetch(requestUrl);
  const championsData = await championsResponse.json();

  return Object.values(championsData.data);
}

export async function getSummonerSpellsData(lang: LanguageParamsType): Promise<SummonerSpellDataType[]> {
  const [latestVersion] = await getVersionsData();
  const language = REQUEST_LANGUAGE_MATCHER[lang];
  const requestUrl = DDRAGON_DATA_URL.SUMMONER_SPELLS.replace('{VERSION}', latestVersion).replace(
    '{LANGUAGE}',
    language,
  );

  const summonerSpellsResponse = await fetch(requestUrl);

  const { data } = await summonerSpellsResponse.json();

  return Object.values(data);
}

export async function getChampionData(champName: string, lang: LanguageParamsType): Promise<ChampionDataType> {
  const [latestVersion] = await getVersionsData();
  const language = REQUEST_LANGUAGE_MATCHER[lang];
  const requestUrl = DDRAGON_DATA_URL.CHAMPION.replace('{VERSION}', latestVersion)
    .replace('{LANGUAGE}', language)
    .replace('{CHAMPNAME}', champName);

  const championResponse = await fetch(requestUrl);

  const { data } = await championResponse.json();

  return data[champName];
}

export async function getItemsData(lang: LanguageParamsType): Promise<ItemsDataType> {
  const [latestVersion] = await getVersionsData();
  const language = REQUEST_LANGUAGE_MATCHER[lang];
  const requestUrl = DDRAGON_DATA_URL.ITEMS.replace('{VERSION}', latestVersion).replace('{LANGUAGE}', language);

  const itemsResponse = await fetch(requestUrl);

  const { data } = await itemsResponse.json();

  return data;
}

export async function getCommunityChampionData(id: string): Promise<CommunityChampionDataType> {
  const requestUrl = COMMUNITY_DRAGON_DATA_URL.CHAMPION.replace('{CHAMPID}', id);

  const championResponse = await fetch(requestUrl);

  const championData = await championResponse.json();

  return championData;
}

export async function getRotationsChampionsData(): Promise<RotationsDataType> {
  const rotationsResponse = await fetch(`${SERVER_REQUEST_URL.ROTATIONS}`, { next: { tags: ['rotationChampData'] } });
  revalidateTag('rotationChampData');
  const rotationsData = await rotationsResponse.json();

  return rotationsData;
}

export async function getSummonerData(name: string, tag: string): Promise<AccountType & SummonerDataType> {
  const requestUrl = `${SERVER_REQUEST_URL.SUMMONER}${name}/${tag}`;

  const summonerResponse = await fetch(requestUrl);

  const summonerData = await summonerResponse.json();

  return summonerData;
}

export async function getChampionMasteryData(puuid: string): Promise<ChampionMasteryDataType[]> {
  const requestUrl = `${SERVER_REQUEST_URL.CHAMPION_MASTERY}${puuid}`;

  const championMasteryResponse = await fetch(requestUrl);

  const championMasteryData = await championMasteryResponse.json();

  return championMasteryData;
}

export async function getSummonerLeagueData(summonerId: string): Promise<LeagueDataType[]> {
  const requestUrl = `${SERVER_REQUEST_URL.SUMMONER_LEAGUE}${summonerId}`;

  const summonerLeagueResponse = await fetch(requestUrl);

  const summonerLeagueData = await summonerLeagueResponse.json();

  return summonerLeagueData;
}

export async function getRunesData(lang: LanguageParamsType): Promise<RunesDataType[]> {
  const versionData = await getVersionsData();
  const versionSliceArr = versionData.slice(0, 5);
  const language = REQUEST_LANGUAGE_MATCHER[lang];
  const runeDataArr = await Promise.all(
    versionSliceArr.map(async (version: string) => {
      const requestUrl = DDRAGON_DATA_URL.RUNES.replace('{VERSION}', version).replace('{LANGUAGE}', language);
      const responseData = await fetch(requestUrl);
      const runesData = await responseData.json();
      return { [version]: runesData };
    }),
  );
  return runeDataArr;
}

export async function getSummonerGameRecordData(puuid: string, gameType?: GameType): Promise<MatchDtoType[]> {
  const dataResponse = await fetch(
    `${SERVER_REQUEST_URL.SUMMONER_RECORD_DATA}${puuid}${gameType ? `?type=${gameType}` : ''} `,
    { next: { tags: ['record', puuid] } },
  );

  const recordData = await dataResponse.json();
  return recordData;
}
