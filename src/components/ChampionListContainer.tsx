'use client';
import { POSITION_BTN_RENDER_LIST } from '@/constant/renderList';
import { useState } from 'react';
import ChampionListTable from './ChampionListTable';

interface ChampionListContainerProps {
  championData: any;
}

export default function ChampionListContainer({ championData }: ChampionListContainerProps) {
  const [currentPosition, setCurrentPosition] = useState<'all' | 'top' | 'jungle' | 'mid' | 'bottom' | 'support'>(
    'all',
  );
  return (
    <main className="flex-1 bg-color-gray-00 rounded-[0.4rem]">
      <nav className="py-[1.2rem] px-[1.6rem] flex border-b border-color-gray-200">
        {POSITION_BTN_RENDER_LIST.map(list => (
          <button
            key={list.id}
            type="button"
            className={`position-btn ${currentPosition === list.setValue && 'current-position'}`}
            onClick={() => setCurrentPosition(list.setValue as 'all' | 'top' | 'jungle' | 'mid' | 'bottom' | 'support')}
          >
            {list.text}
          </button>
        ))}
      </nav>
      <div>
        <ChampionListTable championData={championData} currentPosition={currentPosition} />
      </div>
    </main>
  );
}
