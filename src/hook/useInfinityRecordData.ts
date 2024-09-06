'use client';
import { SERVER_REQUEST_URL } from '@/constant/API';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface useInfinityRecordDataProps<T> {
  initialData: T[];
  puuid: string;
}

export default function useInfinityRecordData<T>({ initialData, puuid }: useInfinityRecordDataProps<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const gameType = searchParams.get('queue_type') || 'TOTAL';
  const [isFetching, setIsFetching] = useState(false);
  const refetchNextPage = async () => {
    setIsFetching(true);
    const refetchResponse = await fetch(
      `${SERVER_REQUEST_URL.SUMMONER_RECORD_DATA}${puuid}?start=${page * 20}&type=${gameType}`,
    );
    const refetchData = await refetchResponse.json();

    setData(prevData => [...prevData, ...refetchData] as T[]);
    setIsFetching(false);
    setPage(prev => prev + 1);
  };

  return {
    data,
    isFetching,
    refetchNextPage,
  };
}
