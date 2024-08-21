import SummonerSearchForm from '@/components/summonersearchform/SummonerSearchForm';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="layout-container">
      <div className="content-wrapper">
        <h1 className="hidden-logo">YOO.GG</h1>
        <div className="mt-[6.4rem] mb-[4.8rem]">
          <Image
            className="m-auto"
            src={'/images/home_main_img.png'}
            width={316}
            height={224}
            alt="YOO.GG 메인 이미지"
          />
        </div>
        <div className="w-[80rem] m-auto">
          <SummonerSearchForm />
        </div>
        <div className="flex flex-col py-[6.4rem]">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
