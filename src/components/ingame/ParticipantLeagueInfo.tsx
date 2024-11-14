import { getSummonerLeagueData } from '@/service/requestJsonData.api';
import { LeagueDataType } from '@/types/response';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import RankMiniIconRender from './RankMiniIconRender';

interface ParticipantLeagueInfoProps {
  summonerId: string;
  queueId: number;
}

export default async function ParticipantLeagueInfo({ summonerId, queueId }: ParticipantLeagueInfoProps) {
  const summonerLeagueData = await getSummonerLeagueData(summonerId);
  if (summonerLeagueData.length === 0) {
    return (
      <>
        <td>
          <RankMiniIconRender tier="unranked" />
        </td>
        <td align="center">
          <div className="text-color-gray-600">UnRanked</div>
        </td>
        <td align="center">-</td>
      </>
    );
  }

  const matchLeagueData = summonerLeagueData.find(league => {
    const leagueType = QUEUET_TYPE[queueId] || 'RANKED_SOLO_5x5';
    return league.queueType === leagueType;
  }) as LeagueDataType;
  return (
    <>
      <td>
        <RankMiniIconRender tier={matchLeagueData.tier} />
      </td>
      <td align="center" className="text-color-gray-600">
        {capitalizeFirstLetter(matchLeagueData?.tier as string)} {matchLeagueData?.rank} (
        {matchLeagueData?.leaguePoints}LP)
      </td>
      <td align="center">
        <div>
          <span>
            {Math.floor((matchLeagueData?.wins / (matchLeagueData?.wins + matchLeagueData?.losses)) * 100)}%승률
          </span>
          <span className="text-color-gray-600 ml-[0.4rem]">
            ({matchLeagueData?.wins + matchLeagueData?.losses}게임)
          </span>
        </div>
        <div className="w-[15rem] h-[1rem] bg-color-gray-300 relative">
          <div
            style={{
              width: `${Math.floor(
                15 * (matchLeagueData?.wins / (matchLeagueData?.wins + matchLeagueData?.losses)),
              )}rem`,
            }}
            className="absolute h-full left-0 top-0 bg-color-primary-400"
          />
        </div>
      </td>
    </>
  );
}

const QUEUET_TYPE: { [key: number]: string } = {
  420: 'RANKED_SOLO_5x5',
  440: 'RANKED_FLEX_SR',
};