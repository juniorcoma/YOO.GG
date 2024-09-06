'use client';
import ButtonSvg from '@/assets/icons/form_submit.svg';

import RecentlySearchList from './RecentlySearchList';
import { useRef } from 'react';
import useSearchFormEvent from '@/hook/useSearchFormEvent';

interface SummonerSearchFormProps {
  inputId: string;
}

export default function SummonerSearchForm({ inputId }: SummonerSearchFormProps) {
  const { inputValue, handleChangeEvent, handleSubmitEvent } = useSearchFormEvent();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="relative">
      <form
        onSubmit={handleSubmitEvent}
        className="flex items-center h-[6rem] w-full bg-color-gray-00 relative text-[1.2rem] leading-[1] rounded-[3rem]"
      >
        <div className="pl-[3.2rem] pr-[1.2rem] mr-[1.2rem] border-r-2 border-color-gray-400">
          <div className="mb-[0.4rem]">지역</div>
          <div className="text-color-gray-400 w-[19.4rem]">Korea</div>
        </div>
        <div className="relative flex-1">
          <label className="mb-[0.4rem] cursor-pointer" htmlFor={inputId}>
            검색
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={handleChangeEvent}
            className="text-[1.4rem] w-full"
            id={inputId}
            ref={inputRef}
            autoComplete="off"
          />
          <label
            htmlFor={inputId}
            className={`${
              inputValue ? 'hidden' : ''
            } absolute flex bottom-[7.5%] text-color-gray-400 text-[1.4rem] z-20 cursor-text items-center gap-[0.4rem]`}
          >
            <span>플레이어 이름 +</span>
            <span className="bg-color-gray-200 rounded-[0.2rem] py-[0.2rem] px-[0.4rem]">#KR1</span>
          </label>
        </div>
        <button type="submit" className="px-[1.6rem]">
          <ButtonSvg />
        </button>
      </form>
      <RecentlySearchList ref={inputRef} left={31} />
    </div>
  );
}
