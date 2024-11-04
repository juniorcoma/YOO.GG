import { LOL_CINEMATIC_INFO, LOL_WORLDS_INFO } from '.';

export const BOTTOM_NAV_RENDER_LIST = [
  {
    id: 1,
    innerText: {
      ko: '홈',
      en: 'Home',
    },
    path: '',
  },
  {
    id: 2,
    innerText: {
      ko: '챔피언 리스트',
      en: 'Champions',
    },
    path: '/champion-list',
  },
];

export const FOOTER_SNS_RENDER_LIST = [
  {
    id: 1,
    alt: 'instagram account',
    imgPath: '/images/insta_logo.png',
    link: 'https://www.instagram.com/pq120wal/',
    size: 32,
  },
  {
    id: 2,
    alt: 'github account',
    imgPath: '/images/github_logo.png',
    link: 'https://github.com/juniorcoma',
    size: 28,
  },
  {
    id: 3,
    alt: 'discord account',
    imgPath: '/images/discord_logo.png',
    link: '/',
    size: 28,
  },
];

export const POSITION_BTN_RENDER_LIST = [
  {
    id: 1,
    text: {
      ko: '전체',
      en: 'All',
    },
    setValue: 'all',
  },
  {
    id: 2,
    text: {
      ko: '탑',
      en: 'Top',
    },
    setValue: 'top',
  },
  {
    id: 3,
    text: {
      ko: '정글',
      en: 'Jungle',
    },
    setValue: 'jungle',
  },
  {
    id: 4,
    text: {
      ko: '미드',
      en: 'Mid',
    },
    setValue: 'mid',
  },
  {
    id: 5,
    text: {
      ko: '바텀',
      en: 'Bottom',
    },
    setValue: 'bottom',
  },
  {
    id: 6,
    text: {
      ko: '서포터',
      en: 'Support',
    },
    setValue: 'support',
  },
];

export const GAME_TYPE_RENDER_LIST = [
  {
    id: 1,
    text: { ko: '전체', en: 'All' },
    query: 'TOTAL',
  },
  {
    id: 2,
    text: { ko: '솔로랭크', en: 'Ranked Solo/Duo' },
    query: 'SOLORANKED',
  },
  {
    id: 3,
    text: { ko: '자유랭크', en: 'Ranked Flex' },
    query: 'FLEXRANKED',
  },
  {
    id: 4,
    text: { ko: '무작위 총력전', en: 'ARAM' },
    query: 'ARAM',
  },
];

export const LOL_WORLDS_RENDER_LIST: {
  id: number;
  year: '2014' | '2015' | '2016' | '2017' | '2018' | '2019' | '2020' | '2021' | '2022' | '2023' | '2024';
  info: {
    title: string;
    artist: string;
  };
}[] = Array.from({ length: 11 }, (_, index) => ({
  id: index + 1,
  year: (2014 + index).toString() as
    | '2014'
    | '2015'
    | '2016'
    | '2017'
    | '2018'
    | '2019'
    | '2020'
    | '2021'
    | '2022'
    | '2023'
    | '2024',
  info: LOL_WORLDS_INFO[index],
}));
export const LOL_CINEMATIC_RENDER_LIST: {
  id: number;
  year: '2019' | '2020' | '2021' | '2022' | '2023' | '2024';
  title: string;
}[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  year: (2019 + index).toString() as '2019' | '2020' | '2021' | '2022' | '2023' | '2024',
  title: LOL_CINEMATIC_INFO[index],
}));

export const LanguageRenderList = [
  {
    id: 1,
    text: '한국어',
    value: 'ko',
  },

  {
    id: 2,
    text: 'English',
    value: 'en',
  },
];
