'use client';

import imgSrcVersionLoader from '@/utils/imgSrcVersionLoader';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PositionIconRender } from './ChampionListTable';

interface ChampionSearchBarProps {
  championsData: any;
  version: string;
}
export default function ChampionSearchBar({ championsData, version }: ChampionSearchBarProps) {
  const [value, setValue] = useState('');
  const [matchList, setMatchList] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (value !== '') {
      const regexp = new RegExp(`^${value}`);
      const matchChamp = championsData.filter((champ: any) => regexp.test(champ.name));

      setMatchList(matchChamp);
    }

    if (value === '') {
      setMatchList([]);
    }
  }, [championsData, value]);

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (matchList.length === 1) {
      const championData = matchList[0];
      router.push(`/champions/${championData.id}/info`);
    }
  };

  return (
    <form className="champion-search-box" onSubmit={handleSubmitEvent}>
      <div className="h-full relative">
        <label className="search-label" htmlFor="search-champion">
          검색
        </label>
        <input
          id="search-champion"
          className="pl-[4.8rem] pr-[6.4rem] w-full h-full text-[1.6rem]"
          placeholder="챔피언 검색 (가렌, 갈리오,...)"
          value={value}
          onChange={e => setValue(e.target.value)}
          autoComplete="off"
        />
        <span
          className={`leading-[1] absolute top-[50%] translate-y-[-50%] right-[1.5rem] text-[1.2rem] border border-color-gray-300 px-[0.8rem] py-[0.4rem] rounded-[0.4rem] ${
            matchList.length === 1 ? 'visible' : 'invisible'
          }`}
        >
          Enter
        </span>
        <div className="search-popup">
          {matchList.length !== 0 && (
            <>
              <div className="p-[1.2rem] border-b border-color-primary-500">
                <h3 className="text-[1.4rem] font-bold">Champion Build</h3>
              </div>
              <ul className="flex flex-col">
                {matchList.map((champ: any) => (
                  <li key={champ.key}>
                    <Link
                      href={`/champions/${champ.id}/info`}
                      className="px-[1.2rem] py-[0.8rem] border-b border-color-gray-300 flex gap-[1.6rem] items-center hover:bg-color-gray-100"
                    >
                      <Image
                        src={`${imgSrcVersionLoader(version, 'CHAMPION_SQUARE')}${champ.image.full}`}
                        width={36}
                        height={36}
                        alt={`${champ.name} 이미지`}
                        className="rounded-[50%]"
                      />
                      <span className="text-[1.4rem] font-bold">{champ.name}</span>
                      <span className="text-color-gray-500 ml-[1.6rem]">{champ.title}</span>
                      <span className="text-color-gray-500 ml-[1.6rem]">
                        <PositionIconRender position={champ.position} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
