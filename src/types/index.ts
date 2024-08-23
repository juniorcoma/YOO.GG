export type ChampPositionType = 'top' | 'jungle' | 'mid' | 'bottom' | 'support';

export interface ChampPositionDataType {
  [key: string]: ChampPositionType;
}
