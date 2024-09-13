import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { forwardRef, useEffect, useState } from 'react';

interface RecentlySearchListProps {
  left: number;
}

// eslint-disable-next-line react/display-name
const RecentlySearchList = forwardRef<HTMLInputElement, RecentlySearchListProps>(({ left }, ref) => {
  const [renderList, setRenderList] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const pathName = usePathname();
  const t = useTranslations('recentlySummonerSearchBox');
  const { locale } = useParams();
  useEffect(() => {
    const getItems = localStorage.getItem('recentlySearch');
    if (getItems) {
      const RecentlySearchList = JSON.parse(getItems);
      setRenderList(RecentlySearchList);
    }
    if (ref && typeof ref === 'object' && ref.current) {
      const inputElement = ref.current;

      const handleFocus = () => {
        if (!inputElement.value) {
          setIsVisible(true);
        }
      };

      const handleBlur = () => {
        setTimeout(() => {
          setIsVisible(false);
        }, 100);
      };
      const handleInput = () => {
        if (inputElement.value) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      };
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
      inputElement.addEventListener('input', handleInput);

      return () => {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
        inputElement.removeEventListener('input', handleInput);
      };
    }
  }, [ref, pathName]);

  return (
    <div className={`list-box ${isVisible ? '' : 'hidden'}`} style={{ left: `${left}%` }}>
      <div className="p-[1.6rem] text-color-gray-400 border-b border-color-gray-300">
        <p>
          <span className="text-color-primary-500">{t('strongTitle')}</span> {t('restTitle')}
        </p>
      </div>
      <div>
        <div className="px-[1.6rem] pt-[0.8rem] pb-[1.6rem]">{t('other')}</div>
        <ul>
          {renderList.length ? (
            renderList.map((item, index) => {
              const [name, tagId] = item.split('-');
              return (
                <li key={index} className="leading-[1] flex">
                  <Link
                    href={`/${locale}/summoner/kr/${item}`}
                    className="flex-1 flex gap-[0.8rem] items-center px-[1.6rem] py-[1.2rem] hover:bg-color-gray-100"
                  >
                    <span className="font-bold text-[1.2rem] text-[#fff] rounded-[0.4rem] bg-color-primary-500 w-[3.1rem] h-[2rem] flex justify-center items-center">
                      KR
                    </span>
                    <div>
                      <span className="text-[1.6rem]">{name}</span>
                      <span className="text-[1.4rem] ml-[0.4rem] text-color-gray-400">#{tagId}</span>
                    </div>
                  </Link>
                  <button
                    onMouseDown={e => {
                      e.preventDefault();

                      const filterList = renderList.filter(list => list !== item);
                      setRenderList(filterList);
                      localStorage.setItem('recentlySearch', JSON.stringify(filterList));
                    }}
                    className="px-[1.6rem] py-[1.2rem] hover:bg-color-red-100 flex justify-center items-center"
                  >
                    <img src={`/images/close_img.png`} width={24} height={24} alt="close" />
                  </button>
                </li>
              );
            })
          ) : (
            <div className="p-[1.6rem] flex justify-center items-center h-[30rem]">
              <p className="text-[1.6rem] text-color-gray-400">{t('notSearch')}</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
});

export default RecentlySearchList;
