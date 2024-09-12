'use client';

import { useContext, useEffect } from 'react';
import { ModuleStateContext } from '../providers/ModuleStateProviders';
import Close from '@/assets/icons/Close';

export default function LanguageModuleContainer() {
  const { moduleState, handleCloseModule } = useContext(ModuleStateContext);

  useEffect(() => {
    if (moduleState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [moduleState]);
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
          <button type="button" className="language-btn">
            한국어
          </button>
          <button type="button" className="language-btn">
            English
          </button>
        </div>
      </div>
    </div>
  );
}
