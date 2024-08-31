export const BOTTOM_NAV_RENDER_LIST = [
  {
    id: 1,
    innerText: '홈',
    path: '/',
  },
  {
    id: 2,
    innerText: '챔피언 분석',
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
    text: '전체',
    setValue: 'all',
  },
  {
    id: 2,
    text: '탑',
    setValue: 'top',
  },
  {
    id: 3,
    text: '정글',
    setValue: 'jungle',
  },
  {
    id: 4,
    text: '미드',
    setValue: 'mid',
  },
  {
    id: 5,
    text: '바텀',
    setValue: 'bottom',
  },
  {
    id: 6,
    text: '서포터',
    setValue: 'support',
  },
];

export const GAME_TYPE_RENDER_LIST = [
  {
    id: 1,
    text: '전체',
    query: 'TOTAL',
  },
  {
    id: 2,
    text: '솔로랭크',
    query: 'SOLORANKED',
  },
  {
    id: 3,
    text: '자유랭크',
    query: 'FLEXRANKED',
  },
  {
    id: 4,
    text: '무작위 총력전',
    query: 'ARAM',
  },
];

export const LOL_WORLDS_RENDER_LIST: {
  id: number;
  year: '2014' | '2015' | '2016' | '2017' | '2018' | '2019' | '2020' | '2021' | '2022' | '2023';
}[] = Array.from({ length: 10 }, (_, index) => ({
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
    | '2023',
}));
