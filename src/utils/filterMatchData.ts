import { MatchDtoType } from '@/types/response';

export default function filterMatchData(matchData: MatchDtoType[], puuid: string) {
  return matchData.map(data => data.info.participants.find(participant => participant.puuid === puuid));
}
