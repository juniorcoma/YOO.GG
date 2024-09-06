import { DDRAGON_IMG_URL } from '@/constant/API';
import useOutsideClick from '@/hook/useOutsideClick';
import Image from 'next/image';

interface FullSkinContainerProps {
  champName: string;
  skinNum: number;
  skinName: string;
}

export default function FullSkinContainer({ champName, skinNum, skinName }: FullSkinContainerProps) {
  const ref = useOutsideClick<HTMLDivElement>();
  return (
    <div className="full-img-box" ref={ref}>
      <img
        src={`${DDRAGON_IMG_URL.CHAMPION_SPLASH}${champName}_${skinNum}.jpg`}
        alt={`${skinName} 이미지`}
        className="rounded-[1.2rem]"
      />
      <em
        className="text-[3.2rem] z-50 text-color-gray-00 absolute
      bottom-[1.6rem] left-[1.6rem] font-bold"
      >
        {skinName === 'default' ? '기본' : skinName}
      </em>
    </div>
  );
}
