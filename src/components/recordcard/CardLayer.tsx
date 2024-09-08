import { PerksDtoType } from '@/types/response';
import { RunesDataType } from '@/types/staticData';
import { useState } from 'react';
import RecordDetailContainer from './RecordDetailContainer';
import SummonerCardBtnIcon from './SummonerCardBtnIcon';

export default function CardLayer({
  children,
  isWin,
  gameVersion,
  perks,
  runesDataArr,
}: {
  children: React.ReactNode;
  isWin: boolean;
  gameVersion: string;
  perks: PerksDtoType;
  runesDataArr: RunesDataType[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={`${isWin ? 'bg-color-primary-100' : 'bg-color-red-100'} rounded-[0.8rem] overflow-hidden flex`}>
        <div className={`w-[0.8rem] ${isWin ? 'bg-color-primary-500' : 'bg-color-red-500'}`} />
        <div className="flex py-[0.8rem] pl-[1.2rem] pr-[0.4rem] flex-1 gap-[1.2rem]">{children}</div>
        <button
          className={`w-[4.7rem] py-[1.2rem] ${
            isWin ? 'bg-color-primary-200' : 'bg-color-red-200'
          } flex justify-center items-end`}
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span className={isOpen ? 'arrow rotate' : 'arrow'}>
            <SummonerCardBtnIcon iswin={isWin} />
          </span>
        </button>
      </div>
      <RecordDetailContainer isOpen={isOpen} gameVersion={gameVersion} perks={perks} runesDataArr={runesDataArr} />
    </>
  );
}
