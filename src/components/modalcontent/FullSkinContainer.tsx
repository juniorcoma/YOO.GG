import { DDRAGON_IMG_URL } from '@/constant/API';
import useModal from '@/hook/useModal';
import useOutsideClick from '@/hook/useOutsideClick';
import Image from 'next/image';

interface FullSkinContainerProps {
  champName: string;
  skinNum: number;
  skinName: string;
}

export default function FullSkinContainer({ champName, skinNum, skinName }: FullSkinContainerProps) {
  const { closeModal } = useModal();
  const ref = useOutsideClick<HTMLDivElement>({ callback: closeModal });
  return (
    <div className="full-img-box" ref={ref}>
      <img
        src={`${DDRAGON_IMG_URL.CHAMPION_SPLASH}${champName}_${skinNum}.jpg`}
        alt={`${skinName} 이미지`}
        className="rounded-[1.2rem]"
      />
      <em
        className="p-[0.8rem] text-[3.2rem] z-50 text-[#fff] absolute
      bottom-[-3.6rem] left-[1.6rem] font-bold dark:text-effect"
      >
        {skinName === 'default' ? champName : skinName}
      </em>
    </div>
  );
}
