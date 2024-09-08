import { SERVER_REQUEST_URL } from '@/constant/API';

import { GameType } from '@/types';
import { MatchDtoType } from '@/types/response';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

async function getSummonerRecordList({ pageParam = 0, puuid, type }: { pageParam: any; puuid: string; type: string }) {
  const { data } = await axios.get(
    `${SERVER_REQUEST_URL.SUMMONER_RECORD_DATA}${puuid}?start=${pageParam * 20}&type=${type}`,
  );
  if (data.error) {
    return [];
  }
  return data;
}

export default function useGetSummonerRecordList(puuid: string, type: GameType) {
  const gameType = type || 'TOTAL';
  return useInfiniteQuery<MatchDtoType[]>({
    queryKey: ['summonerRecordInfo', puuid, gameType],
    queryFn: async ({ pageParam = 0 }) => await getSummonerRecordList({ pageParam, puuid, type: gameType }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, pages) => {
      if (!lastPage || lastPage.length === 0) {
        return undefined;
      }
      return pages.length;
    },
    staleTime: 1000 * 60 * 10,
  });
}
