export const RIOT_REGIONAL_HOST = {
  AMERICAS: 'https://americas.api.riotgames.com',
  ASIA: 'https://asia.api.riotgames.com',
  EUROPE: 'https://europe.api.riotgames.com',
  SEA: 'https://sea.api.riotgames.com',
};

export const RIOT_PLATFORM_HOST = {
  BR1: 'https://br1.api.riotgames.com',
  EUN1: 'https://eun1.api.riotgames.com',
  EUW1: 'https://euw1.api.riotgames.com',
  JP1: 'https://jp1.api.riotgames.com',
  KR: 'https://kr.api.riotgames.com',
  LA1: 'https://la1.api.riotgames.com',
  LA2: 'https://la2.api.riotgames.com',
  NA1: 'https://na1.api.riotgames.com',
  OC1: 'https://oc1.api.riotgames.com',
  TR1: 'https://tr1.api.riotgames.com',
  RU: 'https://ru.api.riotgames.com',
  PH2: 'https://ph2.api.riotgames.com',
  SG2: 'https://sg2.api.riotgames.com',
  TH2: 'https://th2.api.riotgames.com',
  TW2: 'https://tw2.api.riotgames.com',
  VN2: 'https://vn2.api.riotgames.com',
};

export const RIOT_REQUEST_ENDPOINT = {
  ACCOUNT: '/riot/account/v1/accounts/by-riot-id/', // {gamename}/{tagid}
  ACCOUNT_DETAIL: '/lol/summoner/v4/summoners/by-puuid/', // {puuid}
  CHAMP_MASTERY: '/lol/champion-mastery/v4/champion-masteries/by-puuid/', // {puuid}/top
  CHAMP_ROTATIONS: '/lol/platform/v3/champion-rotations',
  SUMMONER_LEAGUE: '/lol/league/v4/entries/by-summoner/', // {summonerid}
  MATCH_ID_LIST: '/lol/match/v5/matches/by-puuid/', // {puuid}/ids
  MATCH_DETAIL_INFO: '/lol/match/v5/matches/', // {matchId}
  SPECTATOR: '/lol/spectator/v5/active-games/by-summoner/', // {puuid}
  RANK: '/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I',
};

const VERSION = '14.16.1';

export const STATIC_DATA_HOST = {
  CHAMPION_DATA: `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/champion.json`,
  CHAMPION_DETAIL_DATA: `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/champion/`,
  CHAMPION_SPLASH_IMG: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/`,
  CHAMPION_LOADING_IMG: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/`,
  CHAMPION_SQUARE_IMG: `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/champion/`,
  CHAMPION_PASSIVE_IMG: `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/passive/`,
  CHAMPION_ABILITY_IMG: `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/spell/`,
  OTHER_CHAMPION_DATA:
    'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/',
  SKILL_VIDEO_HOST: ' https://d28xe8vt774jo5.cloudfront.net/',
};

export const SERVER_REQUEST_HOST = {
  CHAMPION_DATA: '/api/v1/riot/lol/champion',
  CHAMPION_DETAIL_DATA: '/api/v1/riot/lol/champion/detail',
  ROTATIONS_INFO: '/api/v1/riot/lol/rotations',
  CHAMPION_OTHER_DATA: '/api/v1/riot/lol/champion/other',
};
