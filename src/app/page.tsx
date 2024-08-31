import ContentBox from '@/components/ContentBox';
import RotationsList from '@/components/RotationsList';
import SummonerSearchForm from '@/components/summonersearchform/SummonerSearchForm';
import WorldsMusicList from '@/components/WorldsMusicList';
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
            <ContentBox titleText="LOL MUSIC" css="w-[33rem]">
              <WorldsMusicList />
            </ContentBox>
            <ContentBox titleText="로테이션 챔피언" css="flex-1">
              <RotationsList />
            </ContentBox>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
