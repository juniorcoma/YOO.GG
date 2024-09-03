'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-[108rem] m-auto pt-[6.4rem] mb-[6.4rem]">
      <div className="flex flex-col items-center">
        <Image src={`/images/page_error_img.png`} width={300} height={300} alt="에러" />
        <h2 className="text-[3.2rem] mt-[1.2rem] mb-[1.6rem]">페이지 에러</h2>
        <p className="text-[2.4rem] font-bold mb-[3.2rem] text-center">
          요청하신 페이지를 처리 중에 오류가 발생했습니다.
          <br /> 서비스 이용에 불편을 드려 죄송합니다. 잠시후 다시 시도해주세요.
        </p>
        <button
          className="text-[1.6rem] text-color-gray-00 bg-color-primary-500 py-[0.8rem] w-[39.3rem] rounded-[0.4rem]"
          type="button"
          onClick={() => router.refresh()}
        >
          재시도
        </button>
      </div>
    </div>
  );
}
