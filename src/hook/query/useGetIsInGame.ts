import { SERVER_REQUEST_URL } from '@/constant/API';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetIsInGame(puuid: string) {
  return useQuery({
    queryKey: ['ingame', puuid],
    queryFn: async () => {
      const { data } = await axios.get(`${SERVER_REQUEST_URL.SPECTATOR}${puuid}`);
      return data;
    },
    refetchInterval: 1000 * 60,
    refetchIntervalInBackground: false,
    gcTime: 0,
  });
}
