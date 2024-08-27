'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useSubmitFormEvent(summonerName: string) {
  const router = useRouter();
  const sliceString = summonerName.split('#').join('-');

  const [recentlySearchArr, setRecentlySearchArr] = useState<string[]>([]);
  useEffect(() => {
    const storeData = localStorage.getItem('recentlySearch');
    if (storeData) {
      setRecentlySearchArr(JSON.parse(storeData));
    }
  }, []);

  const handleSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateSearchArr = [...recentlySearchArr, sliceString];
    localStorage.setItem('recentlySearch', JSON.stringify(updateSearchArr));
    router.push(`/summoner/kr/${sliceString}`);
  };

  return { handleSubmitEvent };
}
