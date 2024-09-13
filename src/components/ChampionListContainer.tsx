'use client';
import { POSITION_BTN_RENDER_LIST } from '@/constant/renderList';
import { useState } from 'react';
import ChampionListTable from './ChampionListTable';
import { ChampPositionType, ExtendedChampionDataType, LanguageParamsType } from '@/types';
import { useParams } from 'next/navigation';

interface ChampionListContainerProps {
  championsData: ExtendedChampionDataType[];
  version: string;
}

export default function ChampionListContainer({ championsData, version }: ChampionListContainerProps) {
  const [currentPosition, setCurrentPosition] = useState<'all' | ChampPositionType>('all');
  const { locale } = useParams();
  return (
    <main className="flex-1 bg-color-gray-00 rounded-[0.4rem]">
      <nav className="py-[1.2rem] px-[1.6rem] flex border-b border-color-gray-200">
        {POSITION_BTN_RENDER_LIST.map(list => (
          <button
            key={list.id}
            type="button"
            className={`position-btn ${currentPosition === list.setValue && 'current-position'}`}
            onClick={() => setCurrentPosition(list.setValue as 'all' | ChampPositionType)}
          >
            {list.text[locale as LanguageParamsType]}
          </button>
        ))}
      </nav>
      <div>
        <ChampionListTable
          championsData={championsData}
          currentPosition={currentPosition}
          version={version}
          language={locale as LanguageParamsType}
        />
      </div>
    </main>
  );
}
