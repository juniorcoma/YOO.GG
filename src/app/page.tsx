import HomeContentBox from '@/components/homecontent/HomeContentBox';
import RotationsList from '@/components/homecontent/RotationsList';
import SummonerSearchForm from '@/components/summonersearchform/SummonerSearchForm';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="layout-container home">
      <div className="content-wrapper ">
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
        <div className="flex flex-col py-[6.4rem] gap-[3.2rem]">
          <div className="flex gap-[3.2rem] h-[30rem]">
            <div className="content-box w-[33rem]"></div>
            <HomeContentBox titleText="로테이션 챔피언" css="flex-1">
              <RotationsList />
            </HomeContentBox>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
