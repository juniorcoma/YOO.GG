import { DDRAGON_DATA_URL, REQUEST_LANGUAGE_MATCHER } from '@/constant/API';
import { LanguageParamsType } from '@/types';
import { ChampionsDataType } from '@/types/staticData';

import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetChampionsData(version: string, lang: LanguageParamsType) {
  const language = REQUEST_LANGUAGE_MATCHER[lang];
  const requestUrl = DDRAGON_DATA_URL.CHAMPIONS.replace('{VERSION}', version).replace('{LANGUAGE}', language);

  return useSuspenseQuery<{ version: string; data: ChampionsDataType[] }>({
    queryKey: ['champions', version, lang],
    queryFn: async () => {
      const { data } = await axios.get(requestUrl);
      return {
        version: data.version,
        data: Object.values(data.data),
      };
    },
    staleTime: Infinity,
  });
}
