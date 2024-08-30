import { QUEUEID_KR_TYPE } from '@/constant';
import { STATIC_DATA_HOST } from '@/constant/API';
import { ParticipantDtoType, PerkStyleDtoType } from '@/types/response';
import { calculateGameCreation, calculateGameDuration } from '@/utils/calculateRecordTime';
import devideParticipants from '@/utils/devideParticipants';
import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

import Image from 'next/image';
import Link from 'next/link';

function CardLayer({ children, isWin, key }: { children: React.ReactNode; isWin: boolean; key: string }) {
  return (
    <div
      key={key}
      className={`${isWin ? 'bg-color-primary-100' : 'bg-color-red-100'} rounded-[0.8rem] overflow-hidden flex`}
    >
      <div className={`w-[0.8rem] ${isWin ? 'bg-color-primary-500' : 'bg-color-red-500'}`} />
      <div className="flex py-[0.8rem] pl-[1.2rem] pr-[0.4rem] flex-1 gap-[1.2rem]">{children}</div>
      <button className={`w-[4.7rem] ${isWin ? 'bg-color-primary-200' : 'bg-color-red-200'}`} type="button"></button>
    </div>
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

function DetailInfo({ participant }: { participant: ParticipantDtoType }) {
  const { item0, item1, item2, item3, item4, item5, item6 } = participant;
  return (
    <div className="flex flex-col gap-[0.8rem] flex-1">
      <div className="flex gap-[1.2rem]">
        <div className="flex gap-[0.4rem] h-[5.8rem] items-center">
          <Link
            href={`/champions/${participant.championName}/info`}
            className="h-[4.8rem] w-[4.8rem] rounded-[50%] overflow-hidden relative block"
          >
            <Image
              src={`${STATIC_DATA_HOST.CHAMPION_SQUARE_IMG}${participant.championName}.png`}
              fill
              alt={`${participant.championName} 이미지`}
            />
          </Link>
          <div className="flex gap-[0.2rem]">
            <div className="flex flex-col gap-[0.2rem]">
              <SummonerSpellImgRender summonerSpells={[participant.summoner1Id, participant.summoner2Id]} />
            </div>
            <div className="flex flex-col gap-[0.2rem]">
              <SummonerRunesImgRender summonerRunes={participant.perks.styles} />
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
        <ItemImgRender isWin={participant.win} itemsArr={[item0, item1, item2, item3, item4, item5, item6]} />
      </div>
    </div>
  );
}

function SummonerSpellImgRender({ summonerSpells }: { summonerSpells: [number, number] }) {
  const { data } = useSuspenseQuery({
    queryKey: ['summonerSpells'],
    queryFn: async () => {
      const { data } = await axios.get(`${STATIC_DATA_HOST.SUMMONER_SPELLS_DATA}`);
      return data;
    },
    select: ({ data }) => {
      const dataArr = Object.values(data);
      return summonerSpells.map(id => dataArr.find((spell: any) => id === Number(spell.key)));
    },
    staleTime: Infinity,
  });

  return (
    <>
      {data.map((spell: any) => (
        <Image
          key={spell.key}
          src={`${STATIC_DATA_HOST.SUMMONER_SPELL_IMG}${spell.image.full}`}
          width={22}
          height={22}
          alt={`${spell.name} 스펠 이미지`}
          className="rounded-[0.4rem]"
        />
      ))}
    </>
  );
}

function SummonerRunesImgRender({ summonerRunes }: { summonerRunes: PerkStyleDtoType[] }) {
  const { data } = useSuspenseQuery({
    queryKey: ['summonerRunes'],
    queryFn: async () => {
      const { data } = await axios.get(`${STATIC_DATA_HOST.RUNES_DATA}`);
      return data;
    },

    staleTime: Infinity,
  });

  const runeImgUrlList = summonerRunes.map((rune, index) => {
    const matchRuneStyle = data.find((data: any) => data.id === rune.style);
    if (index === 0) {
      const mainRune = matchRuneStyle.slots[0].runes.find((data: any) => data.id === rune.selections[0].perk);
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
            src={`${STATIC_DATA_HOST.RUNES_IMG}${rune}`}
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

function ItemImgRender({ isWin, itemsArr }: { isWin: boolean; itemsArr: (number | undefined)[] }) {
  const { data: itemsData } = useSuspenseQuery({
    queryKey: ['item'],
    queryFn: async () => {
      const { data } = await axios.get(`${STATIC_DATA_HOST.ITEMS_DATA}`);
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
            src={`${STATIC_DATA_HOST.ITEM_IMG}${item.image.full}`}
            width={22}
            height={22}
            alt={`${item.name}`}
            className="rounded-[0.4rem]"
          />
        );
      })}
    </div>
  );
}

function ParticipantsList({ participants, puuid }: { participants: ParticipantDtoType[]; puuid: string }) {
  const { team1, team2 } = devideParticipants(participants);
  return (
    <div className="flex gap-[0.4rem] text-[1.2rem] text-color-gray-500">
      <div className="participant-list">
        {team1.map(team => {
          return (
            <div className="flex gap-[0.2rem] items-center" key={team.puuid}>
              <div className="w-[1.6rem] h-[1.6rem] relative overflow-hidden rounded-[0.4rem]">
                <Image
                  src={`${STATIC_DATA_HOST.CHAMPION_SQUARE_IMG}${team.championName}.png`}
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
      <div className="participant-list">
        {team2.map(team => {
          return (
            <div className="flex gap-[0.2rem] items-center" key={team.puuid}>
              <div className="w-[1.6rem] h-[1.6rem] relative overflow-hidden rounded-[0.4rem]">
                <Image
                  src={`${STATIC_DATA_HOST.CHAMPION_SQUARE_IMG}${team.championName}.png`}
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
