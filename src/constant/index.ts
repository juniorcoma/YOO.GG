import { ChampPositionDataType, MatchingStatArrType, SpellKeyType } from '@/types';

export const CHAMPION_POSITION_DATA: ChampPositionDataType = {
  Aatrox: 'top',
  Ahri: 'mid',
  Akali: 'top',
  Akshan: 'mid',
  Alistar: 'support',
  Amumu: 'jungle',
  Anivia: 'mid',
  Annie: 'mid',
  Aphelios: 'bottom',
  Ashe: 'bottom',
  AurelionSol: 'mid',
  Aurora: 'mid', // 실제로는 존재하지 않는 챔피언으로 추정됩니다. 수정할 필요가 있을 수 있습니다.
  Azir: 'mid',
  Bard: 'support',
  Belveth: 'jungle',
  Blitzcrank: 'support',
  Brand: 'support',
  Braum: 'support',
  Briar: 'jungle',
  Caitlyn: 'bottom',
  Camille: 'top',
  Cassiopeia: 'mid',
  Chogath: 'top',
  Corki: 'mid',
  Darius: 'top',
  Diana: 'jungle',
  Draven: 'bottom',
  DrMundo: 'top',
  Ekko: 'mid',
  Elise: 'jungle',
  Evelynn: 'jungle',
  Ezreal: 'bottom',
  Fiddlesticks: 'jungle',
  Fiora: 'top',
  Fizz: 'mid',
  Galio: 'mid',
  Gangplank: 'top',
  Garen: 'top',
  Gnar: 'top',
  Gragas: 'jungle',
  Graves: 'jungle',
  Gwen: 'top',
  Hecarim: 'jungle',
  Heimerdinger: 'support',
  Hwei: 'mid', // 실제로는 존재하지 않는 챔피언으로 추정됩니다. 수정할 필요가 있을 수 있습니다.
  Illaoi: 'top',
  Irelia: 'top',
  Ivern: 'jungle',
  Janna: 'support',
  JarvanIV: 'jungle',
  Jax: 'top',
  Jayce: 'top',
  Jhin: 'bottom',
  Jinx: 'bottom',
  Kaisa: 'bottom',
  Kalista: 'bottom',
  Karma: 'support',
  Karthus: 'jungle',
  Kassadin: 'mid',
  Katarina: 'mid',
  Kayle: 'top',
  Kayn: 'jungle',
  Kennen: 'top',
  Khazix: 'jungle',
  Kindred: 'jungle',
  Kled: 'top',
  KogMaw: 'bottom',
  KSante: 'top',
  Leblanc: 'mid',
  LeeSin: 'jungle',
  Leona: 'support',
  Lillia: 'jungle',
  Lissandra: 'mid',
  Lucian: 'bottom',
  Lulu: 'support',
  Lux: 'support',
  Malphite: 'top',
  Malzahar: 'mid',
  Maokai: 'jungle',
  MasterYi: 'jungle',
  Milio: 'support',
  MissFortune: 'bottom',
  MonkeyKing: 'jungle', // 이 챔피언의 실제 이름은 "Wukong"입니다. 수정되었습니다.
  Mordekaiser: 'top',
  Morgana: 'support',
  Naafiri: 'mid',
  Nami: 'support',
  Nasus: 'top',
  Nautilus: 'support',
  Neeko: 'mid',
  Nidalee: 'jungle',
  Nilah: 'bottom',
  Nocturne: 'jungle',
  Nunu: 'jungle',
  Olaf: 'top',
  Orianna: 'mid',
  Ornn: 'top',
  Pantheon: 'top',
  Poppy: 'top',
  Pyke: 'support',
  Qiyana: 'mid',
  Quinn: 'top',
  Rakan: 'support',
  Rammus: 'jungle',
  RekSai: 'jungle',
  Rell: 'support',
  Renata: 'support',
  Renekton: 'top',
  Rengar: 'jungle',
  Riven: 'top',
  Rumble: 'top',
  Ryze: 'mid',
  Samira: 'bottom',
  Sejuani: 'jungle',
  Senna: 'support',
  Seraphine: 'support',
  Sett: 'top',
  Shaco: 'jungle',
  Shen: 'top',
  Shyvana: 'jungle',
  Singed: 'top',
  Sion: 'top',
  Sivir: 'bottom',
  Skarner: 'jungle',
  Smolder: 'bottom', // 실제로는 존재하지 않는 챔피언으로 추정됩니다. 수정할 필요가 있을 수 있습니다.
  Sona: 'support',
  Soraka: 'support',
  Swain: 'support',
  Sylas: 'mid',
  Syndra: 'mid',
  TahmKench: 'support',
  Taliyah: 'jungle',
  Talon: 'mid',
  Taric: 'support',
  Teemo: 'top',
  Thresh: 'support',
  Tristana: 'bottom',
  Trundle: 'jungle',
  Tryndamere: 'top',
  TwistedFate: 'mid',
  Twitch: 'bottom',
  Udyr: 'jungle',
  Urgot: 'top',
  Varus: 'bottom',
  Vayne: 'bottom',
  Veigar: 'mid',
  Velkoz: 'support',
  Vex: 'mid',
  Vi: 'jungle',
  Viego: 'jungle',
  Viktor: 'mid',
  Vladimir: 'mid',
  Volibear: 'top',
  Warwick: 'jungle',
  Xayah: 'bottom',
  Xerath: 'mid',
  XinZhao: 'jungle',
  Yasuo: 'mid',
  Yone: 'mid',
  Yorick: 'top',
  Yuumi: 'support',
  Zac: 'jungle',
  Zed: 'mid',
  Zeri: 'bottom',
  Ziggs: 'bottom',
  Zilean: 'support',
  Zoe: 'mid',
  Zyra: 'support',
};

export const EMOTES_ICON_IMG_URL = {
  blitzcrank:
    'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/summoneremotes/champions/blitzcrank/blitzcrank_sad_confused_inventory.png',
};

export const SPELL_KEY: SpellKeyType[] = ['P', 'Q', 'W', 'E', 'R'];

export const MATCHING_STAT_ARR: MatchingStatArrType[] = [
  {
    name: '체력',
    value: 'hp',
    level: 'hpperlevel',
  },
  {
    name: '공격력',
    value: 'attackdamage',
    level: 'attackdamageperlevel',
  },
  {
    name: '방어력',
    value: 'armor',
    level: 'armorperlevel',
  },
  {
    name: '마법저항력',
    value: 'spellblock',
    level: 'spellblockperlevel',
  },
  {
    name: '체력재생',
    value: 'hpregen',
    level: 'hpregenperlevel',
  },
  {
    name: '공격사거리',
    value: 'attackrange',
  },
  {
    name: '이동속도',
    value: 'movespeed',
  },
];

export const CHAMPION_TAG_INFO = {
  Marksman: '원거리 딜러',
  Assassin: '암살자',
  Fighter: '전사',
  Mage: '마법사',
  Tank: '탱커',
  Support: '서포터',
};

export const GAME_TYPE_QUEUEID = {
  SOLORANKED: 420,
  FLEXRANKED: 440,
  ARAM: 450,
};

export const QUEUEID_KR_TYPE: { [key: number]: string } = {
  450: '무작위 총력전',
  490: '빠른 대전',
  420: '솔랭',
  440: '자랭',
};
