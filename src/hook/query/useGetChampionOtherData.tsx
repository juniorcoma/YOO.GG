import { getChampionOtherData } from '@/service/server.api';
import { SpellKeyType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetChampionOtherData(champkey: string, skillKey: SpellKeyType) {
  return useQuery({
    queryKey: ['otherChampionData', skillKey, champkey],
    queryFn: () => getChampionOtherData(champkey, skillKey),
  });
}
