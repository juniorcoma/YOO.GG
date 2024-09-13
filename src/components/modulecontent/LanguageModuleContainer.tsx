'use client';

import { useContext, useEffect } from 'react';
import { ModuleStateContext } from '../providers/ModuleStateProviders';
import Close from '@/assets/icons/Close';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { LanguageRenderList } from '@/constant/renderList';
import { LanguageParamsType } from '@/types';

export default function LanguageModuleContainer() {
  const { moduleState, handleCloseModule } = useContext(ModuleStateContext);
  const pathName = usePathname();
  const { locale } = useParams();
  const router = useRouter();
  useEffect(() => {
    if (moduleState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [moduleState]);

  const handleOnclick = (lang: LanguageParamsType, locale: LanguageParamsType) => {
    const pathArr = pathName.split('/');
    pathArr.splice(0, 2);
    pathArr.unshift(lang);

    const url = pathArr.join('/');

    router.push(`/${url}`);
  };

  return (
    <div
      className={`${moduleState ? 'module-container_open' : 'module-container_close'} module-container`}
      onClick={e => {
        if (e.currentTarget === e.target) {
          handleCloseModule();
        }
      }}
    >
      <div className={`${moduleState ? 'language-menu_open' : 'language-menu_close'} module-inner`}>
        <div className="w-full p-[2.4rem] flex justify-end">
          <button type="button" onClick={handleCloseModule}>
            <Close size={36} />
          </button>
        </div>
        <div className="px-[2.4rem] flex flex-col text-[1.8rem]">
          {LanguageRenderList.map(lang =>
            lang.value === locale ? (
              <span key={lang.id} className="language-btn current">
                {lang.text}
              </span>
            ) : (
              <button
                type="button"
                className="language-btn"
                key={lang.id}
                onClick={() => handleOnclick(lang.value as 'ko' | 'en', locale as 'ko' | 'en')}
              >
                {lang.text}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
