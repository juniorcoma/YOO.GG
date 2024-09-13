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

export async function getVersionsData(): Promise<string[]> {
  const versionResponse = await fetch(`${DDRAGON_DATA_URL.VERSION}`);

  const versionsData = await versionResponse.json();
  return versionsData;
}

export async function getChampionsData(lang: LanguageParamsType): Promise<ChampionsDataType[]> {
  const [latestVersion] = await getVersionsData();
  const language = REQUEST_LANGUAGE_MATCHER[lang];
  const requestUrl = DDRAGON_DATA_URL.CHAMPIONS.replace('{VERSION}', latestVersion).replace('{LANGUAGE}', language);

  const championsResponse = await fetch(requestUrl, {
    next: { revalidate: false, tags: ['champions'] },
  });
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

  const summonerSpellsResponse = await fetch(requestUrl, {
    next: { revalidate: false, tags: ['summonerSpells'] },
  });

  const { data } = await summonerSpellsResponse.json();

  return Object.values(data);
}

export async function getChampionData(champName: string, lang: LanguageParamsType): Promise<ChampionDataType> {
  const [latestVersion] = await getVersionsData();
  const language = REQUEST_LANGUAGE_MATCHER[lang];
  const requestUrl = DDRAGON_DATA_URL.CHAMPION.replace('{VERSION}', latestVersion)
    .replace('{LANGUAGE}', language)
    .replace('{CHAMPNAME}', champName);

  const championResponse = await fetch(requestUrl, {
    cache: 'no-store',
  });

  const { data } = await championResponse.json();

  return data[champName];
}

export async function getItemsData(lang: LanguageParamsType): Promise<ItemsDataType> {
  const [latestVersion] = await getVersionsData();
  const language = REQUEST_LANGUAGE_MATCHER[lang];
  const requestUrl = DDRAGON_DATA_URL.ITEMS.replace('{VERSION}', latestVersion).replace('{LANGUAGE}', language);

  const itemsResponse = await fetch(requestUrl, {
    next: { revalidate: false, tags: ['items'] },
  });

  const { data } = await itemsResponse.json();

  return data;
}

export async function getCommunityChampionData(id: string): Promise<CommunityChampionDataType> {
  const requestUrl = COMMUNITY_DRAGON_DATA_URL.CHAMPION.replace('{CHAMPID}', id);

  const championResponse = await fetch(requestUrl, {
    cache: 'no-store',
  });

  const championData = await championResponse.json();

  return championData;
}

export async function getRotationsChampionsData(): Promise<RotationsDataType> {
  const rotationsResponse = await fetch(`${SERVER_REQUEST_URL.ROTATIONS}`);
  const rotationsData = await rotationsResponse.json();

  return rotationsData;
}

export async function getSummonerData(name: string, tag: string): Promise<AccountType & SummonerDataType> {
  const requestUrl = `${SERVER_REQUEST_URL.SUMMONER}${name}/${tag}`;

  const summonerResponse = await fetch(requestUrl, {
    cache: 'no-store',
  });

  const summonerData = await summonerResponse.json();

  return summonerData;
}

export async function getChampionMasteryData(puuid: string): Promise<ChampionMasteryDataType[]> {
  const requestUrl = `${SERVER_REQUEST_URL.CHAMPION_MASTERY}${puuid}`;

  const championMasteryResponse = await fetch(requestUrl, {
    cache: 'no-store',
  });

  const championMasteryData = await championMasteryResponse.json();

  return championMasteryData;
}

export async function getSummonerLeagueData(summonerId: string): Promise<LeagueDataType[]> {
  const requestUrl = `${SERVER_REQUEST_URL.SUMMONER_LEAGUE}${summonerId}`;

  const summonerLeagueResponse = await fetch(requestUrl, {
    cache: 'no-cache',
  });

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

export async function getInitialRecordData(puuid: string, type: GameType | undefined) {
  const gameType = type || 'TOTAL';
  const requestUrl = `${SERVER_REQUEST_URL.SUMMONER_RECORD_DATA}${puuid}?type=${gameType}`;
  const initialRecordResponse = await fetch(requestUrl);

  const initialRecordData = await initialRecordResponse.json();

  return initialRecordData;
}
