import { ParticipantDtoType } from '@/types/response';

export default function devideParticipants(participants: ParticipantDtoType[]) {
  const team1Arr = participants.filter(participant => participant.teamId === 100);
  const team2Arr = participants.filter(participant => participant.teamId === 200);
  return {
    team1: team1Arr,
    team2: team2Arr,
  };
}
