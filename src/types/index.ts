import { ChampionsDataType } from './staticData';

export type ChampPositionType = 'top' | 'jungle' | 'mid' | 'bottom' | 'support';

export interface ChampPositionDataType {
  [key: string]: ChampPositionType;
}

export type SpellKeyType = 'P' | 'Q' | 'W' | 'E' | 'R';

export interface ChampionStatType {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
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
  attackspeed: number;
}

export interface MatchingStatArrType {
  name: string;
  value: keyof ChampionStatType;
  level?: keyof ChampionStatType;
}

export type GameType = 'TOTAL' | 'SOLORANKED' | 'FLEXRANKED' | 'ARAM';

export interface ExtendedChampionDataType extends ChampionsDataType {
  position: ChampPositionType;
}
