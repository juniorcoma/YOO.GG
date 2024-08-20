'use client';
import ButtonSvg from '@/assets/icons/form_submit.svg';
import { ChangeEvent, useState } from 'react';

export default function SummonerSearchForm() {
  const [inputValue, setInputValue] = useState('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <form className="flex items-center h-[6rem] w-full bg-color-gray-00 relative text-[1.2rem] leading-[1] rounded-[3rem]">
      <div className="pl-[3.2rem] pr-[1.2rem] mr-[1.2rem] border-r-2 border-color-gray-400">
        <div className="mb-[0.4rem]">지역</div>
        <div className="text-color-gray-400 w-[19.4rem]">Korea</div>
      </div>
      <div className="relative flex-1">
        <label className="mb-[0.4rem]" htmlFor="summoner-search">
          검색
        </label>
        <input
          type="text"
          id="summoner-search"
          value={inputValue}
          onChange={handleOnChange}
          className="text-[1.4rem] w-full"
        />
        <label
          htmlFor="summoner-search"
          className={`${inputValue && 'hidden'} absolute flex bottom-[7.5%] text-color-gray-400 text-[1.4rem]`}
        >
          <span>플레이어 이름 +</span>
          <span className="bg-color-gray-200 rounded-[0.2rem]">#KR1</span>
        </label>
      </div>
      <button type="submit" className="px-[1.6rem]">
        <ButtonSvg />
      </button>
    </form>
  );
}
