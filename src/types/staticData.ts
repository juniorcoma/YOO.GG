interface ImageDataType {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

type ChampTagType = 'Marksman' | 'Assassin' | 'Fighter' | 'Mage' | 'Tank' | 'Support';

interface StatsType {
  hp: number;
  hpperlevel: number;
  mp?: number;
  mpperlevel?: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen?: number;
  mpregenperlevel?: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed?: number;
  [key: string]: number | undefined;
}

export interface ChampionsDataType {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  image: ImageDataType;
  tags: ChampTagType[];
  partype: string;
  stats: StatsType;
}

export interface SummonerSpellDataType {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  key: string;
  summonerLevel: number;
  image: ImageDataType;
}

export interface ChampionDataType {
  id: string;
  key: string;
  name: string;
  title: string;
  image: ImageDataType;
  skins: {
    id: string;
    num: number;
    name: string;
    chromas: boolean;
  }[];
  lore: string;
  blurb: string;
  allytips: string[] | [];
  enemytips: string[] | [];
  tags: ChampTagType[];
  partype: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  stats: StatsType;
  spells: {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    cooldownBurn: string;
    costBurn: string;
    rangeBurn: string;
    image: ImageDataType;
  }[];
  passive: {
    name: string;
    description: string;
    image: ImageDataType;
  };
}

export interface ItemsDataType {
  [key: string]: {
    name: string;
    description: string;
    plaintext: string;
    image: ImageDataType;
    gold: {
      base: number;
      purchasable: boolean;
      total: number;
      sell: number;
    };
    tags: string[];
  };
}

export interface CommunityChampionDataType {
  passive: {
    abilityVideoPath: string;
  };
  spells: {
    abilityVideoPath: string;
  }[];
}

export interface RunesDataType {
  [key: string]: RuneDataType[];
}

export interface RuneDataType {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: RuneDetailDataType[];
}

interface RuneDetailDataType {
  runes: {
    id: number;
    key: string;
    icon: string;
    name: string;
    shortDesc: string;
  }[];
}
