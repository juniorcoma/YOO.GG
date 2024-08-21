'use client';

import { BOTTOM_NAV_RENDER_LIST } from '@/constant/renderList';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomHeader() {
  const pathName = usePathname();

  return (
    <div className="bg-color-primary-500 border-b border-color-primary-600">
      <div className="w-full max-w-[108rem] m-auto flex flex-col">
        <div className={`${pathName === '/' && 'hidden'}`}></div>
        <Navbar pathName={pathName} />
      </div>
    </div>
  );
}

function Navbar({ pathName }: { pathName: string }) {
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
        href="https://www.leagueoflegends.com/ko-kr/news/game-updates/patch-14-16-notes/"
        className="py-[0.4rem] px-[0.8rem] bg-color-primary-600 text-[1.4rem] rounded-[0.4rem] inline-flex gap-[0.4rem] items-center hover:bg-color-primary-700"
        target="_blank"
      >
        <div className="lol-icon-original w-[2.4rem] h-[2.4rem]" />
        <span className="font-[700] text-[#00FF0D]">14.16</span>
        패치 노트 보기
      </a>
    </nav>
  );
}
