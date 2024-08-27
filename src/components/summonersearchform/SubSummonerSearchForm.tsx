'use client';
import ButtonSvg from '@/assets/icons/form_submit.svg';
import useSubmitFormEvent from '@/hook/useSubmitForm';
import { ChangeEvent, useState } from 'react';
export default function SubSummonerSearchForm() {
  const [inputValue, setInputValue] = useState('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const { handleSubmitEvent } = useSubmitFormEvent(inputValue);
  return (
    <form onSubmit={handleSubmitEvent} className="flex rounded-[0.4rem] overflow-hidden h-[3.2rem]">
      <div className="py-[0.8rem] pl-[1.2rem] pr-[2.8rem] bg-color-primary-200 text-[1.4rem] flex justify-center items-center">
        <strong className="text-color-primary-600">KR</strong>
      </div>
      <div className="flex justify-between bg-color-gray-00 flex-1 relative">
        <label
          htmlFor="summoner-search"
          className={`${
            inputValue && 'hidden'
          } absolute flex bottom-[50%] translate-y-[50%] left-[1.6rem] text-color-gray-400 text-[1.4rem]`}
        >
          <span>플레이어 이름 +</span>
          <span className="bg-color-gray-200 rounded-[0.2rem]">#KR1</span>
        </label>
        <input className="text-[1.4rem] px-[1.6rem] flex-1" value={inputValue} onChange={handleOnChange} />

        <button type="submit" className="px-[1.2rem]">
          <ButtonSvg />
        </button>
      </div>
    </form>
  );
}
