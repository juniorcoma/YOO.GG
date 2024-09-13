'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  const t = useTranslations('errorPage');
  const { locale } = useParams();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-[108rem] m-auto pt-[6.4rem] mb-[6.4rem]">
      <div className="flex flex-col items-center">
        <img src={`/images/page_error_img.png`} width={300} height={300} alt="에러" />
        <h2 className="text-[3.2rem] mt-[1.2rem] mb-[1.6rem]">{t('title')}</h2>
        <p className="text-[2.4rem] font-bold mb-[3.2rem] text-center">
          {t('description1')}
          <br /> {t('description2')}
        </p>
        <button
          className="text-[1.6rem] text-color-gray-00 bg-color-primary-500 py-[0.8rem] w-[39.3rem] rounded-[0.4rem]"
          type="button"
          onClick={() => {
            router.push(`/${locale}`);
          }}
        >
          {t('homeBtn')}
        </button>
      </div>
    </div>
  );
}
