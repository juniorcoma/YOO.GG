import { DDRAGON_IMG_URL } from '@/constant/API';

type ImgType = 'CHAMPION_SQUARE' | 'CHAMPION_PASSIVE' | 'CHAMPION_ABILITY' | 'PROFILE' | 'SPELL' | 'ITEM';

export default function imgSrcVersionLoader(version: string, type: ImgType) {
  return DDRAGON_IMG_URL[type].replace('{VERSION}', version);
}
