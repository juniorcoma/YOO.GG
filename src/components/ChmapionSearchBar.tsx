'use client';

import { STATIC_DATA_HOST } from '@/constant/API';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ChampionSearchBarProps {
  championData: any;
}
export default function ChampionSearchBar({ championData }: ChampionSearchBarProps) {
  const [value, setValue] = useState('');
  const [matchList, setMatchList] = useState([]);

  useEffect(() => {
    if (value !== '') {
      const regexp = new RegExp(`^${value}`);
      const matchChamp = championData.filter((champ: any) => regexp.test(champ.name));

      setMatchList(matchChamp);
    }

    if (value === '') {
      setMatchList([]);
    }
  }, [value]);

  return (
    <form className="champion-search-box">
      <div className="h-full relative">
        <label className="search-label" htmlFor="search-champion">
          검색
        </label>
        <input
          id="search-champion"
          className="pl-[4.8rem] pr-[1.6rem] w-full h-full text-[1.6rem]"
          placeholder="챔피언 검색 (가렌, 갈리오,...)"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
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
                        src={`${STATIC_DATA_HOST.CHAMPION_SQUARE_IMG}${champ.image.full}`}
                        width={36}
                        height={36}
                        alt={`${champ.name} 이미지`}
                        className="rounded-[50%]"
                      />
                      <span className="text-[1.4rem] font-bold">{champ.name}</span>
                      <span className="text-color-gray-500 ml-[1.6rem]">{champ.title}</span>
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