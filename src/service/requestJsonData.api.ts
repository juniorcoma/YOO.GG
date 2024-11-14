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

export async function getChampionsData(lang?: LanguageParamsType): Promise<ChampionsDataType[]> {
  const [latestVersion] = await getVersionsData();
  const language = lang ? REQUEST_LANGUAGE_MATCHER[lang] : REQUEST_LANGUAGE_MATCHER['ko'];
  const requestUrl = DDRAGON_DATA_URL.CHAMPIONS.replace('{VERSION}', latestVersion).replace('{LANGUAGE}', language);

  const championsResponse = await fetch(requestUrl);
  const championsData = await championsResponse.json();

  return Object.values(championsData.data);
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

  const summonerResponse = await fetch(requestUrl, { cache: 'no-store' });

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

export async function getInGameData(summonerName: string, tag: string): Promise<{ ingame: boolean; data?: any }> {
  const { puuid } = await getSummonerData(summonerName, tag);

  const responseData = await fetch(`${SERVER_REQUEST_URL.SPECTATOR}${puuid}`);

  const inGameData = await responseData.json();

  return inGameData;
}
