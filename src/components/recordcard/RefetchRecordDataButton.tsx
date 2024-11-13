'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '@/assets/icons/loading.svg';

export default function RefetchRecordDataButton({ puuid }: { puuid: string }) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const [remainingTimeToRefetch, setRemainingTimeToRefetch] = useState(10);
  useEffect(() => {
    if (disabled) {
      const timer = setTimeout(() => {
        setDisabled(false);
        setRemainingTimeToRefetch(0);
      }, 1000 * 60 * 10);

      const remainingTimer = setInterval(() => {
        setRemainingTimeToRefetch(prev => {
          if (prev === 1) {
            clearInterval(remainingTimer);
          }
          return prev > 0 ? prev - 1 : 0;
        });
      }, 1000 * 60);

      return () => {
        clearInterval(remainingTimer);
        clearTimeout(timer);
      };
    }
  }, [disabled]);

  const queueType = searchParams.get('queue_type') || 'TOTAL';
  const handleRefetch = async () => {
    setIsLoading(true);
    await queryClient.refetchQueries({ queryKey: ['summonerRecordInfo', puuid, queueType] });
    router.refresh();
    setIsLoading(false);
    setDisabled(true);
    setRemainingTimeToRefetch(10);
  };
  return (
    <div className="flex flex-col gap-[0.8rem] w-[10rem]">
      <button
        type="button"
        onClick={handleRefetch}
        className="px-[1.2rem] py-[0.8rem] bg-color-primary-500 text-[#fff] disabled:bg-gray-400 rounded-[0.4rem] text-[1.4rem]"
        disabled={isLoading || disabled}
      >
        {isLoading ? (
          <div className="loader">
            <Loading />
          </div>
        ) : (
          '전적 갱신'
        )}
      </button>
      {remainingTimeToRefetch > 0 && (
        <span className="self-center text-[1.2rem]">{`${remainingTimeToRefetch}분 후 갱신 가능`}</span>
      )}
    </div>
  );
}
