import { getSummonerRecordList } from '@/service/server.api';
import { GameType } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useGetSummonerRecordList(puuid: string, type: GameType) {
  return useInfiniteQuery({
    queryKey: ['summonerRecordInfo', puuid, type],
    queryFn: async ({ pageParam = 0 }) => await getSummonerRecordList({ pageParam, puuid, type }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, pages) => pages.length,
    staleTime: 1000 * 60 * 10,
  });
}
