import { SERVER_REQUEST_URL } from '@/constant/API';

import { GameType } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

async function getSummonerRecordList({
  pageParam = 0,
  puuid,
  type,
}: {
  pageParam: number;
  puuid: string;
  type: string;
}) {
  const { data } = await axios.get(
    `${SERVER_REQUEST_URL.SUMMONER_RECORD_DATA}${puuid}?start=${pageParam * 20}&type=${type}`,
  );
  return data;
}

export default function useGetSummonerRecordList(puuid: string, type: GameType) {
  return useInfiniteQuery({
    queryKey: ['summonerRecordInfo', puuid, type],
    queryFn: async ({ pageParam = 0 }) => await getSummonerRecordList({ pageParam, puuid, type }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, pages) => pages.length,
    staleTime: 1000 * 60 * 10,
  });
}
