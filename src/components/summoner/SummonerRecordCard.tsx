import { QUEUEID_KR_TYPE } from '@/constant';
import { DDRAGON_DATA_URL, DDRAGON_IMG_URL } from '@/constant/API';
import { ParticipantDtoType, PerksDtoType, PerkStyleDtoType } from '@/types/response';
import { calculateGameCreation, calculateGameDuration } from '@/utils/calculateRecordTime';
import devideParticipants from '@/utils/devideParticipants';
import imgSrcVersionLoader from '@/utils/imgSrcVersionLoader';
import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

import Image from 'next/image';
import Link from 'next/link';
import SummonerCardBtnIcon from './SummonerCardBtnIcon';
import { useState } from 'react';
import RecordDetailContainer from './RecordDetailContainer';

function CardLayer({
  children,
  isWin,
  gameVersion,
  perks,
  runesDataArr,
}: {
  children: React.ReactNode;
  isWin: boolean;
  gameVersion: string;
  perks: PerksDtoType;
  runesDataArr: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={`${isWin ? 'bg-color-primary-100' : 'bg-color-red-100'} rounded-[0.8rem] overflow-hidden flex`}>
        <div className={`w-[0.8rem] ${isWin ? 'bg-color-primary-500' : 'bg-color-red-500'}`} />
        <div className="flex py-[0.8rem] pl-[1.2rem] pr-[0.4rem] flex-1 gap-[1.2rem]">{children}</div>
        <button
          className={`w-[4.7rem] py-[1.2rem] ${
            isWin ? 'bg-color-primary-200' : 'bg-color-red-200'
          } flex justify-center items-end`}
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span className={isOpen ? 'arrow rotate' : 'arrow'}>
            <SummonerCardBtnIcon iswin={isWin} />
          </span>
        </button>
      </div>
      <RecordDetailContainer isOpen={isOpen} gameVersion={gameVersion} perks={perks} runesDataArr={runesDataArr} />
    </>
  );
}

function KeySummary({
  isWin,
  queueId,
  tiemInfo,
}: {
  isWin: boolean;
  queueId: number;
  tiemInfo: { gameCreation: number; gameDuration: number };
}) {
  return (
    <div className="flex w-[10.8rem] flex-col gap-[0.8rem] text-[1.2rem] text-color-gray-500">
      <div>
        <div className={`mb-[0.4rem] ${isWin ? 'text-color-primary-600' : 'text-color-red-600'} text-[1.4rem]`}>
          {QUEUEID_KR_TYPE[queueId]}
        </div>
        <div>{calculateGameCreation(tiemInfo.gameCreation)}</div>
      </div>
      <div className={`h-[0.1rem] ${isWin ? 'bg-color-primary-200' : 'bg-color-red-200'} w-[60%]`} />
      <div>
        <div className="mb-[0.4rem]">{isWin ? '승리' : '패배'}</div>
        <div>{calculateGameDuration(tiemInfo.gameDuration)}</div>
      </div>
    </div>
  );
}

function DetailInfo({
  participant,
  version,
  gameVersion,
  championsData,
}: {
  participant: ParticipantDtoType;
  version: string;
  gameVersion: string;
  championsData: any;
}) {
  const { item0, item1, item2, item3, item4, item5, item6 } = participant;
  const championData = championsData.find((champion: any) => participant.championId === Number(champion.key));

  return (
    <div className="flex flex-col gap-[0.8rem] flex-1">
      <div className="flex gap-[1.2rem]">
        <div className="flex gap-[0.4rem] h-[5.8rem] items-center">
          <Link
            href={`/champions/${championData.id}/info`}
            className="h-[4.8rem] w-[4.8rem] rounded-[50%] overflow-hidden relative block"
          >
            <Image
              src={`${imgSrcVersionLoader(version, 'CHAMPION_SQUARE')}${championData.id}.png`}
              fill
              alt={`${participant.championName} 이미지`}
            />
          </Link>
          <div className="flex gap-[0.2rem]">
            <div className="flex flex-col gap-[0.2rem]">
              <SummonerSpellImgRender
                summonerSpells={[participant.summoner1Id, participant.summoner2Id]}
                version={version}
              />
            </div>
            <div className="flex flex-col gap-[0.2rem]">
              <SummonerRunesImgRender summonerRunes={participant.perks.styles} gameVersion={gameVersion} />
            </div>
          </div>
        </div>
        <div className="w-[10.8rem] self-center">
          <div className="text-[1.6rem]">
            <strong>
              <span>{participant.kills}</span> / <span className="text-color-red-600">{participant.deaths}</span> /{' '}
              <span>{participant.assists}</span>
            </strong>
          </div>
          <div className="text-[1.2rem] text-color-gray-500">{participant.challenges.kda.toFixed(2)} : 1 평점</div>
        </div>
        <div className="pl-[0.8rem] border-l border-color-primary-300 flex flex-col text-[1.2rem]">
          <div>스킬 사용횟수</div>
          <div>
            Q : {participant.spell1Casts} W : {participant.spell2Casts}
          </div>
          <div>
            E : {participant.spell3Casts} R : {participant.spell4Casts}
          </div>
        </div>
      </div>
      <div className="flex gap-[1.6rem]">
        <ItemImgRender
          isWin={participant.win}
          itemsArr={[item0, item1, item2, item3, item4, item5, item6]}
          version={version}
        />
      </div>
    </div>
  );
}

function SummonerSpellImgRender({ summonerSpells, version }: { summonerSpells: [number, number]; version: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ['summonerSpells', version],
    queryFn: async () => {
      const requestUrl = DDRAGON_DATA_URL.SUMMONER_SPELLS.replace('{VERSION}', version);
      const { data } = await axios.get(requestUrl);
      return data;
    },
    select: ({ data }) => {
      return Object.values(data);
    },
    staleTime: Infinity,
  });

  const renderImgList = summonerSpells.map(id => data.find((spell: any) => id === Number(spell.key)));

  return (
    <>
      {renderImgList.map((spell: any) => (
        <Image
          key={spell.key}
          src={`${imgSrcVersionLoader(version, 'SPELL')}${spell.image.full}`}
          width={22}
          height={22}
          alt={`${spell.name} 스펠 이미지`}
          className="rounded-[0.4rem]"
        />
      ))}
    </>
  );
}

function SummonerRunesImgRender({
  summonerRunes,
  gameVersion,
}: {
  summonerRunes: PerkStyleDtoType[];
  gameVersion: string;
}) {
  const dataVersion = gameVersion.split('.').slice(0, 2).join('.');
  const { data } = useSuspenseQuery({
    queryKey: ['summonerRunes', dataVersion],
    queryFn: async () => {
      const requestUrl = DDRAGON_DATA_URL.RUNES.replace('{VERSION}', `${dataVersion}.1`);
      const { data } = await axios.get(requestUrl);
      return data;
    },

    staleTime: Infinity,
  });

  const runeImgUrlList = summonerRunes.map((rune, index) => {
    const matchRuneStyle = data.find((data: any) => data.id === rune.style);
    if (index === 0) {
      const mainRune = matchRuneStyle.slots[0].runes?.find((data: any) => data.id === rune.selections[0].perk);
      return mainRune?.icon || null;
    }
    return matchRuneStyle?.icon || null;
  });

  return (
    <>
      {runeImgUrlList.map((rune: string, index) => {
        if (!rune) return <span key={index} className="w-[2.2rem] h-[2.2rem]"></span>;
        return (
          <Image
            key={rune}
            src={`${DDRAGON_IMG_URL.RUNE}${rune}`}
            width={22}
            height={22}
            alt={`룬 이미지`}
            className={`${!index ? 'rounded-[50%] bg-color-gray-900' : ''}`}
          />
        );
      })}
    </>
  );
}

function ItemImgRender({
  isWin,
  itemsArr,
  version,
}: {
  isWin: boolean;
  itemsArr: (number | undefined)[];
  version: string;
}) {
  const { data: itemsData } = useSuspenseQuery({
    queryKey: ['items', version],
    queryFn: async () => {
      const reqeustUrl = DDRAGON_DATA_URL.ITEMS.replace('{VERSION}', version);
      const { data } = await axios.get(reqeustUrl);
      return data;
    },

    select: ({ data }) => data,

    staleTime: Infinity,
  });

  const renderItemsArr = itemsArr.map(itemId => {
    if (!itemId) return undefined;
    return itemsData[itemId];
  });

  return (
    <div className="flex gap-[0.2rem]">
      {renderItemsArr.map((item, index) => {
        if (!item)
          return (
            <span
              key={index}
              className={`${
                isWin ? 'bg-color-primary-200' : 'bg-color-red-200'
              } w-[2.2rem] h-[2.2rem] rounded-[0.4rem]`}
            ></span>
          );
        return (
          <Image
            key={item.name}
            src={`${imgSrcVersionLoader(version, 'ITEM')}${item.image.full}`}
            width={22}
            height={22}
            unoptimized
            alt={`${item.name}`}
            className="rounded-[0.4rem]"
          />
        );
      })}
    </div>
  );
}

function ParticipantsList({
  participants,
  puuid,
  version,
  championsData,
}: {
  participants: ParticipantDtoType[];
  puuid: string;
  version: string;
  championsData: any;
}) {
  const { team1, team2 } = devideParticipants(participants);
  return (
    <div className="flex gap-[0.4rem] text-[1.2rem] text-color-gray-500">
      <div className="participant-list">
        {team1.map(team => {
          const championData = championsData.find((champion: any) => team.championId === Number(champion.key));
          return (
            <div className="flex gap-[0.2rem] items-center" key={team.puuid}>
              <div className="w-[1.6rem] h-[1.6rem] relative overflow-hidden rounded-[0.4rem]">
                <Image
                  unoptimized
                  fill
                  src={`${imgSrcVersionLoader(version, 'CHAMPION_SQUARE')}${championData.id}.png`}
                  alt={`${team.championName} image`}
                  className="scale-110"
                />
              </div>
              {team.puuid === puuid || !team.riotIdGameName ? (
                <span className="text-color-gray-900">{team.riotIdGameName || '알 수 없음'}</span>
              ) : (
                <Link href={`/summoner/kr/${team.riotIdGameName}-${team.riotIdTagline}`} scroll={false}>
                  {team.riotIdGameName}
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <div className="participant-list">
        {team2.map(team => {
          const championData = championsData.find((champion: any) => team.championId === Number(champion.key));
          return (
            <div className="flex gap-[0.2rem] items-center" key={team.puuid}>
              <div className="w-[1.6rem] h-[1.6rem] relative overflow-hidden rounded-[0.4rem]">
                <Image
                  src={`${imgSrcVersionLoader(version, 'CHAMPION_SQUARE')}${championData.id}.png`}
                  fill
                  alt={`${team.championName} image`}
                  className="scale-110"
                />
              </div>
              {team.puuid === puuid || !team.riotIdGameName ? (
                <span className="text-color-gray-900">{team.riotIdGameName || '알 수 없음'}</span>
              ) : (
                <Link href={`/summoner/kr/${team.riotIdGameName}-${team.riotIdTagline}`} scroll={false}>
                  {team.riotIdGameName}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const SummonerRecordCard = {
  CardLayer,
  KeySummary,
  DetailInfo,
  ParticipantsList,
};

export default SummonerRecordCard;
