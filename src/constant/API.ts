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
  CHAMP_ROTATIONS: '/lol/platform/v3/champion-rotations',
  SUMMONER_LEAGUE: '/lol/league/v4/entries/by-summoner/', // {summonerid}
  MATCH_ID_LIST: '/lol/match/v5/matches/by-puuid/', // {puuid}/ids
  MATCH_DETAIL_INFO: '/lol/match/v5/matches/', // {matchId}
  SPECTATOR: '/lol/spectator/v5/active-games/by-summoner/', // {puuid}
  RANK: '/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I',
  CHAMPION_MASTERY: '/lol/champion-mastery/v4/champion-masteries/by-puuid/', // {puuid}/top
};

export const REQUEST_DATA_HOST = {
  DDRAGON: 'https://ddragon.leagueoflegends.com/',
  COMMUNITY_DRAGON: 'https://raw.communitydragon.org/',
  SKILL_VIDEO: 'https://d28xe8vt774jo5.cloudfront.net/',
  SERVER: `https://yoo-gg-git-main-parks-projects-c6ee1581.vercel.app/api/v1/riot/lol/`,
  YOUTUBE_VIDEO: 'https://www.youtube.com/embed/',
};

export const DDRAGON_DATA_URL = {
  VERSION: `${REQUEST_DATA_HOST.DDRAGON}api/versions.json`,
  CHAMPIONS: `${REQUEST_DATA_HOST.DDRAGON}cdn/{VERSION}/data/ko_KR/champion.json`,
  CHAMPION: `${REQUEST_DATA_HOST.DDRAGON}cdn/{VERSION}/data/ko_KR/champion/{CHAMPNAME}.json`,
  SUMMONER_SPELLS: `${REQUEST_DATA_HOST.DDRAGON}cdn/{VERSION}/data/ko_KR/summoner.json`,
  RUNES: `${REQUEST_DATA_HOST.DDRAGON}cdn/{VERSION}/data/ko_KR/runesReforged.json`,
  ITEMS: `${REQUEST_DATA_HOST.DDRAGON}cdn/{VERSION}/data/ko_KR/item.json`,
};

export const DDRAGON_IMG_URL = {
  CHAMPION_SPLASH: `${REQUEST_DATA_HOST.DDRAGON}cdn/img/champion/splash/`,
  CHAMPION_LOADING: `${REQUEST_DATA_HOST.DDRAGON}cdn/img/champion/loading/`,
  CHAMPION_SQUARE: `${REQUEST_DATA_HOST.DDRAGON}cdn/{VERSION}/img/champion/`,
  CHAMPION_PASSIVE: `${REQUEST_DATA_HOST.DDRAGON}cdn/{VERSION}/img/passive/`,
  CHAMPION_ABILITY: `${REQUEST_DATA_HOST.DDRAGON}cdn/{VERSION}/img/spell/`,
  PROFILE: `${REQUEST_DATA_HOST.DDRAGON}cdn/{VERSION}/img/profileicon/`,
  SPELL: `${REQUEST_DATA_HOST.DDRAGON}cdn/{VERSION}/img/spell/`,
  RUNE: `${REQUEST_DATA_HOST.DDRAGON}cdn/img/`,
  ITEM: `${REQUEST_DATA_HOST.DDRAGON}cdn/{VERSION}/img/item/`,
};

export const COMMUNITY_DRAGON_DATA_URL = {
  CHAMPION: `${REQUEST_DATA_HOST.COMMUNITY_DRAGON}latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/{CHAMPID}.json`,
};

export const COMMUNITY_DRAGON_IMG_URL = {
  TIER: `${REQUEST_DATA_HOST.COMMUNITY_DRAGON}latest/plugins/rcp-fe-lol-shared-components/global/default/`,
};

export const SERVER_REQUEST_URL = {
  ROTATIONS: `${REQUEST_DATA_HOST.SERVER}rotations`,
  SUMMONER: `${REQUEST_DATA_HOST.SERVER}account/`,
  CHAMPION_MASTERY: `${REQUEST_DATA_HOST.SERVER}champion/mastery/`,
  SUMMONER_LEAGUE: `${REQUEST_DATA_HOST.SERVER}summoner/league/`,
  SUMMONER_RECORD_DATA: `${REQUEST_DATA_HOST.SERVER}match/`,
};

export const LOL_WORLDS_MUSIC = {
  '2014': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}fmI_Ndrxy14?si=a70sCe1dpbDZuW3Y`,
  '2015': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}4Twd965VzX4?si=ne3swgq9cgtOvFaX`,
  '2016': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}Zasx9hjo4WY?si=XjbWnEZfjTCng0aM`,
  '2017': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}r6zIGXun57U?si=GWyA5gtDYK-MfO0t`,
  '2018': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}fB8TyLTD7EE?si=7e0eBiKG_t_SpJwj`,
  '2019': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}i1IKnWDecwA?si=W4epMXGdoaqN_qFO`,
  '2020': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}KbNL9ZyB49c?si=DHPhoTtyyGO9beWY`,
  '2021': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}1Z6CHioIn3s?si=2Ead09EDTjDxuhRg`,
  '2022': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}HYsz1hP0BFo?si=NorTip1v2aaiZEJo`,
  '2023': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}C3GouGa0noM?si=GKZqfI7HYu8sw3Ot`,
};

export const LOL_CINEMATIC_MUSIC = {
  '2019': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}zF5Ddo9JdpY?si=VF7ZlQY055EL9av8`,
  '2020': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}aR-KAldshAE?si=K4VD2peuMbpvD8aj`,
  '2021': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}lXWSn8lAn2k?si=wXhJKUiuYpfEuIPM`,
  '2022': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}mDYqT0_9VR4?si=UFj_OszBS9sDxnW0`,
  '2023': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}lZ17VxvlFi8?si=ZrcdPb3DmQmauz9b`,
  '2024': `${REQUEST_DATA_HOST.YOUTUBE_VIDEO}ZHhqwBwmRkI?si=r2SMDoEHVToYpcw3`,
};
