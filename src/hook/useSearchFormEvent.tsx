'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function useSearchFormEvent() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [valueName, valueTagId] = inputValue.split('#');
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}account/${valueName}/${valueTagId}/isvalid`);
    const { gameName, tagLine } = data;

    if (data) {
      setInputValue('');
      saveLocalstorage('recentlySearch', `${gameName}-${tagLine}`);
      router.push(`/summoner/kr/${gameName}-${tagLine}`);
    } else {
      alert('소환사를 찾을 수 없습니다');
    }
  };

  return { inputValue, handleChangeEvent, handleSubmitEvent };
}

function saveLocalstorage(key: string, saveItem: string) {
  const MAX_LENGHT = 10;
  const storageItems = localStorage.getItem(key);
  if (!storageItems) {
    localStorage.setItem(key, JSON.stringify([saveItem]));
    return;
  }
  const parseItems = JSON.parse(storageItems);
  const filterSameItems = parseItems.filter((item: string) => item !== saveItem);
  filterSameItems.unshift(saveItem);
  if (filterSameItems.length > MAX_LENGHT) {
    filterSameItems.pop();
  }
  localStorage.setItem(key, JSON.stringify(filterSameItems));
}
