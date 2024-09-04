'use client';

import SubSummonerSearchForm from '@/components/summonersearchform/SubSummonerSearchForm';
import { BOTTOM_NAV_RENDER_LIST } from '@/constant/renderList';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HiddenHeader from './HiddenHeader';
import useIntersectionObservRef from '@/hook/useIntersectionObservRef';
import { useState } from 'react';

interface BottomHeaderProps {
  version: string;
}

export default function BottomHeader({ version }: BottomHeaderProps) {
  const pathName = usePathname();
  const [isViewHidden, setIsViewHidden] = useState(false);

  const observRef = useIntersectionObservRef<HTMLDivElement>({
    callback: () => {
      setIsViewHidden(false);
    },
    onNotIntersecting: () => {
      setIsViewHidden(true);
    },
  });

  return (
    <>
      <HiddenHeader open={isViewHidden} path={pathName} />
      <div className="bg-color-primary-500 border-b border-color-primary-600" ref={observRef}>
        <div className="w-full max-w-[108rem] m-auto flex flex-col">
          <div className={`${pathName === '/' && 'hidden'} py-[0.8rem] flex gap-[1.6rem]`}>
            <div className="relative w-[13rem] h-[3.2rem]">
              <img src={'/images/yoogg_sub_img.png'} alt="YOO.GG sub image" />
            </div>
            <div className="flex-1">
              <SubSummonerSearchForm />
            </div>
          </div>
          <Navbar pathName={pathName} version={version} />
        </div>
      </div>
    </>
  );
}

function Navbar({ pathName, version }: { pathName: string; version: string }) {
  const [mainVersion, subVersion] = version.split('.').slice(0, 2);
  return (
    <nav className="h-[4.8rem] text-[#fff] text-[1.6rem] flex justify-between items-center">
      <ul className="flex gap-[2.4rem] h-full">
        {BOTTOM_NAV_RENDER_LIST.map(item => (
          <li key={item.id} className={`${pathName === item.path && 'border-b-[3px] border-[#fff]'}`}>
            <Link href={item.path}>
              <div className={`${pathName !== item.path && 'opacity-65'} hover:opacity-100 pt-[1.3rem] pb-[1rem]`}>
                {item.innerText}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <a
        href={`https://www.leagueoflegends.com/ko-kr/news/game-updates/patch-${mainVersion}-${subVersion}-notes/`}
        className="py-[0.4rem] px-[0.8rem] bg-color-primary-600 text-[1.4rem] rounded-[0.4rem] inline-flex gap-[0.4rem] items-center hover:bg-color-primary-700"
        target="_blank"
      >
        <div className="lol-icon-original w-[2.4rem] h-[2.4rem]" />
        <span className="font-[700] text-[#00FF0D]">
          {mainVersion}.{subVersion}
        </span>
        패치 노트 보기
      </a>
    </nav>
  );
}
