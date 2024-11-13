import { DDRAGON_DATA_URL, REQUEST_LANGUAGE_MATCHER } from '@/constant/API';
import { LanguageParamsType } from '@/types';
import { RuneDataType } from '@/types/staticData';
import formatGameVersion from '@/utils/formatGameVersion';
import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetRuneData(gameVersion: string, lang: LanguageParamsType) {
  const version = formatGameVersion(gameVersion);
  const language = REQUEST_LANGUAGE_MATCHER[lang];
  const requestUrl = DDRAGON_DATA_URL.RUNES.replace('{VERSION}', version).replace('{LANGUAGE}', language);
  return useSuspenseQuery<RuneDataType[]>({
    queryKey: ['rune', version],
    queryFn: async () => {
      const { data } = await axios.get(requestUrl);
      return data;
    },
    staleTime: Infinity,
  });
}
