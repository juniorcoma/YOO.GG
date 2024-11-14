import { QUEUEID_KR_TYPE } from '@/constant';
import { LanguageParamsType } from '@/types';
import GameDurationTimer from './GameDurationTimer';

interface InGameHeaderProps {
  inGameData: any;
  locale: LanguageParamsType;
}

export default function InGameHeader({ inGameData, locale }: InGameHeaderProps) {
  const { gameQueueConfigId, gameStartTime, mapId } = inGameData;
  return (
    <div className="p-[1.6rem] border-b-[0.2rem] border-color-gray-200">
      <div className="flex items-center gap-[0.8rem] text-[1.2rem]">
        <span className="text-[1.4rem]">{QUEUEID_KR_TYPE[gameQueueConfigId][locale]}</span>
        <div className="divider" />
        <span>{MAPID_FORMAT[mapId as MapId][locale]}</span>
        <div className="divider" />
        <GameDurationTimer gameStartTime={gameStartTime} />
      </div>
    </div>
  );
}

type MapId = keyof typeof MAPID_FORMAT;

const MAPID_FORMAT = {
  1: { ko: '소환사의 협곡 (여름 버전)', en: "Summoner's Rift" },
  2: { ko: '소환사의 협곡 (가을 버전)', en: "Summoner's Rift" },
  11: { ko: '소환사의 협곡', en: "Summoner's Rift" },
  12: { ko: '칼바람 나락', en: 'Howling Abyss' },
  14: { ko: '학살의 다리', en: "Butcher's Bridge (Alternate ARAM map)" },
  16: { ko: '우주 폐허', en: 'Cosmic Ruins (Dark Star: Singularity map)' },
  18: { ko: '발로란 시티 파크', en: 'Valoran City Park (Star Guardian Invasion map)' },
  19: { ko: '서브스트럭처 43', en: 'Substructure 43 (PROJECT: Hunters map)' },
  20: { ko: '충돌 지점', en: 'Crash Site (Odyssey: Extraction map)' },
  21: { ko: '넥서스 블리츠', en: 'Nexus Blitz map' },
  22: { ko: '융합', en: 'Convergence (Teamfight Tactics map)' },
  30: { ko: '분노의 링', en: 'Rings of Wrath (Arena map)' },
};
