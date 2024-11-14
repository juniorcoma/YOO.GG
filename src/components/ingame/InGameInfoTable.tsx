import Image from 'next/image';
import { SummonerRunesImgRender, SummonerSpellImgRender } from '../recordcard/MainContent';
import { getVersionsData } from '@/service/requestJsonData.api';
import { Suspense } from 'react';
import ChampionsImgRender from './ChampionImgRender';

import { LanguageParamsType } from '@/types';
import ParticipantInfo from './ParticipantInfo';
import ParticipantLeagueInfo from './ParticipantLeagueInfo';

interface InGameInfoTableProps {
  participantList: any[];
  locale: LanguageParamsType;
  queueId: number;
  bannedChampionList: { championId: number; teamId: number; pickTurn: number }[];
}

export default async function InGameInfoTable({
  participantList,
  locale,
  queueId,
  bannedChampionList,
}: InGameInfoTableProps) {
  const [gameVersion] = await getVersionsData();
  const teamId = participantList[0].teamId;
  const filterBannedChampionList = bannedChampionList && bannedChampionList.filter(item => item.teamId === teamId);

  return (
    <table className="ingame-table">
      <caption className="text-[0rem]">InGame</caption>
      <colgroup>
        <col width={44} />
        <col width={20} />
        <col width={20} />
        <col width="*" />
        <col width={32} />
        <col width={200} />
        <col width={200} />
      </colgroup>
      <thead>
        <tr className={`${teamId === 100 && 'bg-color-primary-200'} ${teamId === 200 && 'bg-color-red-200'}`}>
          <th
            className={`${teamId === 100 && 'text-color-primary-500'} ${teamId === 200 && 'text-color-red-500'}`}
            colSpan={3}
          >
            {teamId === 100 && '블루팀'}
            {teamId === 200 && '레드팀'}
          </th>
          <th
            align="left"
            className={`${teamId === 100 && 'text-color-primary-500'} ${teamId === 200 && 'text-color-red-500'}`}
          >
            {filterBannedChampionList && (
              <div className="flex items-center gap-[0.8rem]">
                <span>밴</span>
                <div className="inline-flex gap-[0.4rem]">
                  {filterBannedChampionList.map((champ, index) => (
                    <Suspense fallback={null} key={index}>
                      <ChampionsImgRender
                        size={32}
                        version={gameVersion}
                        locale={locale}
                        championId={champ.championId}
                      />
                    </Suspense>
                  ))}
                </div>
              </div>
            )}
          </th>
          <th></th>
          <th>티어</th>
          <th>랭크승률</th>
        </tr>
      </thead>
      <tbody>
        {participantList.map(participant => (
          <tr key={participant.puuid} className="h-[5.8rem] participant">
            <td
              className={`border-l-[0.2rem] ${teamId === 100 && 'border-color-primary-500'} ${
                teamId === 200 && 'border-color-red-500'
              } px-[0.4rem]`}
            >
              <Suspense fallback={null}>
                <ChampionsImgRender
                  championId={participant.championId}
                  version={gameVersion}
                  size={34}
                  locale={locale}
                />
              </Suspense>
            </td>
            <td className="px-[0.2rem]">
              <Suspense fallback={null}>
                <SummonerSpellImgRender
                  size={16}
                  summonerSpells={[participant.spell1Id, participant.spell2Id]}
                  gameVersion={gameVersion}
                />
              </Suspense>
            </td>
            <td className="px-[0.2rem]">
              <div className="flex flex-col gap-[0.2rem]">
                <Suspense fallback={null}>
                  <SummonerRunesImgRender
                    inGameSummonerRune={[
                      [participant.perks.perkStyle, participant.perks.perkIds[0]],
                      [participant.perks.perkSubStyle],
                    ]}
                    gameVersion={gameVersion}
                    size={16}
                  />
                </Suspense>
              </div>
            </td>
            <td className="indent-[0.8rem]">
              <ParticipantInfo summonerId={participant.riotId} locale={locale} />
            </td>
            <ParticipantLeagueInfo summonerId={participant.summonerId} queueId={queueId} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
