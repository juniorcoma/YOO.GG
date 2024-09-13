'use client';

import Image from 'next/image';
import ContentBox from './common/ContentBox';
import { DDRAGON_IMG_URL } from '@/constant/API';
import { useRef, useState } from 'react';
import useModal from '@/hook/useModal';
import FullSkinContainer from './modalcontent/FullSkinContainer';
import { ChampionDataType } from '@/types/staticData';
import { useTranslations } from 'next-intl';

interface ChampionSkinControlContainerProps {
  name: string;
  skinRenderList: ChampionDataType['skins'];
  titleName: string;
}

export default function ChampionSkinControlContainer({
  name,
  skinRenderList,
  titleName,
}: ChampionSkinControlContainerProps) {
  const [translateValue, setTranslateValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();
  const handlePrevEvent = () => {
    if (ref.current && ref.current.clientWidth < 641) return;
    if (ref.current && translateValue - 600 < 0) {
      setTranslateValue(0);
    } else {
      setTranslateValue(prev => prev - 600);
    }
  };

  const handleNextEvent = () => {
    if (ref.current && ref.current.clientWidth < 641) return;
    if (ref.current && translateValue + 600 + 641 > ref.current?.clientWidth) {
      setTranslateValue(prev => (ref.current ? prev + (ref.current?.clientWidth - prev - 641) : 0));
    } else {
      setTranslateValue(prev => prev + 600);
    }
  };

  const handleFullImgEvent = (skinName: string, skinNum: number) => {
    openModal({ component: FullSkinContainer, props: { champName: name, skinName, skinNum } });
  };
  const t = useTranslations('championDetail');
  return (
    <ContentBox
      titleText={`${titleName} ${t('champSkinContent')}`}
      SubTitleComponent={<SliderControlBtn handlePrev={handlePrevEvent} handleNext={handleNextEvent} />}
    >
      <div className="p-[1.6rem] overflow-hidden flex w-[67.3rem]">
        <div className="skin-list-box" ref={ref} style={{ transform: `translateX(${-translateValue}px)` }}>
          {skinRenderList.map(skin => (
            <div key={skin.id} className="skin-img-box">
              <button type="button" className="full-img-btn" onClick={() => handleFullImgEvent(skin.name, skin.num)}>
                <span>{t('champSkinDetail')}</span>
              </button>
              <img
                src={`${DDRAGON_IMG_URL.CHAMPION_LOADING}${name}_${skin.num}.jpg`}
                alt={`${skin.name} 이미지`}
                className="rounded-[0.8rem] scale-105"
              />
              <div className="skin-name">{skin.name === 'default' ? '기본' : skin.name}</div>
            </div>
          ))}
        </div>
      </div>
    </ContentBox>
  );
}

function SliderControlBtn({ handlePrev, handleNext }: { handlePrev: () => void; handleNext: () => void }) {
  return (
    <div className="flex gap-[0.8rem]">
      <button type="button" className="container-control-btn prev" onClick={handlePrev}>
        이전
      </button>
      <button type="button" className="container-control-btn next" onClick={handleNext}>
        다음
      </button>
    </div>
  );
}
