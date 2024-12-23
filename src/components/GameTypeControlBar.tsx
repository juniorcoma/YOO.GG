'use client';

import { GAME_TYPE_RENDER_LIST } from '@/constant/renderList';
import useGetIsInGame from '@/hook/query/useGetIsInGame';
import { LanguageParamsType } from '@/types';
import { useTranslations } from 'next-intl';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

interface GameTypeControlBarProps {
  puuid: string;
}

export default function GameTypeControlBar({ puuid }: GameTypeControlBarProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const pathArr = pathName.split('/');
  const isIngame = pathArr[pathArr.length - 1] === 'ingame';
  const t = useTranslations('ingame');
  const type = isIngame ? '' : searchParams.get('queue_type') || 'TOTAL';
  const { locale } = useParams();
  const handleClick = (type: string) => {
    if (isIngame) {
      pathArr.splice(pathArr.length - 1, 1);
      router.push(`${pathArr.join('/')}?queue_type=${type}`);
      return;
    }
    router.push(`?queue_type=${type}`);
  };

  const handleIngameBtnClick = () => {
    if (isIngame) return;
    router.push(`${pathName}/ingame`);
  };

  const { data: ingameData } = useGetIsInGame(puuid);

  return (
    <div className="bg-color-gray-00 border-t border-color-gray-200">
      <div className="w-[108rem] m-auto py-[0.8rem] flex justify-between">
        <ul className="flex gap-[0.8rem]">
          {GAME_TYPE_RENDER_LIST.map(item => (
            <li key={item.id}>
              <button
                type="button"
                className={`text-[1.6rem] px-[2.4rem] py-[0.8rem] flex justify-center items-center rounded-[0.4rem] ${
                  type === item.query && 'text-color-primary-600 bg-color-primary-100'
                }`}
                onClick={() => handleClick(item.query)}
              >
                {item.text[locale as LanguageParamsType]}
              </button>
            </li>
          ))}
        </ul>
        <div>
          <button
            type="button"
            className={`relative text-[1.6rem] px-[2.4rem] py-[0.8rem] flex justify-center items-center rounded-[0.4rem] ${
              isIngame && 'text-color-primary-600 bg-color-primary-100'
            }`}
            onClick={handleIngameBtnClick}
          >
            {t('text')}
            {ingameData?.ingame && !isIngame && (
              <span className="absolute text-[#fff] text-[1.2rem] px-[0.8rem] py-[0.4rem] bg-[#A29BFE] right-[-2rem] top-[50%] translate-y-[-50%] rounded-[0.4rem] ingame">
                Live
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
