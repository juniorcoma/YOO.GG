import { getSummonerData } from '@/service/requestJsonData.api';
import { LanguageParamsType } from '@/types';
import Link from 'next/link';

interface ParticipantInfoProps {
  summonerId: string;
  locale: LanguageParamsType;
}

export default async function ParticipantInfo({ summonerId, locale }: ParticipantInfoProps) {
  const [name, tag] = summonerId.split('#');
  const summonerData = await getSummonerData(name, tag);
  return (
    <>
      <Link href={`/${locale}/summoner/kr/${name}-${tag}`} className="hover:underline">
        {name}
        <span className="text-color-gray-400">#{tag}</span>
      </Link>
      <div className="text-color-gray-400 leading-[1]">Level {summonerData.summonerLevel}</div>
    </>
  );
}
