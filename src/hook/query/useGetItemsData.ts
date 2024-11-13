import { DDRAGON_DATA_URL, REQUEST_LANGUAGE_MATCHER } from '@/constant/API';
import { LanguageParamsType } from '@/types';
import formatGameVersion from '@/utils/formatGameVersion';
import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetItemsData(gameVersion: string, lang: LanguageParamsType) {
  const version = formatGameVersion(gameVersion);
  const language = REQUEST_LANGUAGE_MATCHER[lang];
  const requestUrl = DDRAGON_DATA_URL.ITEMS.replace('{VERSION}', version).replace('{LANGUAGE}', language);
  return useSuspenseQuery({
    queryKey: ['items', version],
    queryFn: async () => {
      const { data } = await axios.get(requestUrl);
      return data;
    },
    staleTime: Infinity,
  });
}
