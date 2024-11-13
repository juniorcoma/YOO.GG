import useGetChampionsData from '@/hook/query/useGetChampionsData';
import { LanguageParamsType } from '@/types';
import { ParticipantDtoType } from '@/types/response';
import { ChampionsDataType } from '@/types/staticData';
import devideParticipants from '@/utils/devideParticipants';
import imgSrcVersionLoader from '@/utils/imgSrcVersionLoader';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface ParticipantsListContentProps {
  participants: ParticipantDtoType[];
  puuid: string;
  version: string;
  locale: LanguageParamsType;
}

export default function ParticipantsListContent({
  participants,
  puuid,
  version,
  locale,
}: ParticipantsListContentProps) {
  const { team1, team2 } = devideParticipants(participants);
  const { data: championsData } = useGetChampionsData(version, locale);

  return (
    <div className="flex gap-[0.4rem] text-[1.2rem] text-color-gray-500">
      <div className="participant-list">
        {team1.map(team => {
          const championData = championsData.data.find(
            champion => team.championId === Number(champion.key),
          ) as ChampionsDataType;
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
                <Link href={`/${locale}/summoner/kr/${team.riotIdGameName}-${team.riotIdTagline}`} scroll={false}>
                  {team.riotIdGameName}
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <div className="participant-list">
        {team2.map(team => {
          const championData = championsData.data.find(
            champion => team.championId === Number(champion.key),
          ) as ChampionsDataType;
          return (
            <div className="flex gap-[0.2rem] items-center" key={team.puuid}>
              <div className="w-[1.6rem] h-[1.6rem] relative overflow-hidden rounded-[0.4rem]">
                <Image
                  unoptimized
                  src={`${imgSrcVersionLoader(version, 'CHAMPION_SQUARE')}${championData.id}.png`}
                  fill
                  alt={`${team.championName} image`}
                  className="scale-110"
                />
              </div>
              {team.puuid === puuid || !team.riotIdGameName ? (
                <span className="text-color-gray-900">{team.riotIdGameName || '알 수 없음'}</span>
              ) : (
                <Link href={`/${locale}/summoner/kr/${team.riotIdGameName}-${team.riotIdTagline}`} scroll={false}>
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
