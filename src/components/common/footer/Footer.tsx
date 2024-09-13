'use client';

import { FOOTER_SNS_RENDER_LIST } from '@/constant/renderList';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathName = usePathname();
  const t = useTranslations('footer');
  return (
    <footer id="footer" className={`${pathName === '/' ? 'footer-home' : 'footer-other'}`}>
      <div className="footer-inner">
        <div className="flex justify-between header dark:text-color-gray-700">
          <strong className="pb-[1.6rem]">
            <Link href="/">
              <img
                src={
                  pathName === '/ko' || pathName === '/en'
                    ? '/images/yoogg_logo_img1.png'
                    : '/images/yoogg_logo_img2.png'
                }
                alt="YOO.GG"
                width={140}
                height={40}
              />
            </Link>
          </strong>
          <div className="ml-[0.8rem]">
            <strong className="pb-[1.6rem] title">Developer</strong>
            <div>{t('developerName')}</div>
          </div>
          <div className="ml-[0.8rem]">
            <strong className="pb-[1.6rem] title">Email</strong>
            <div>pq120wal39@gmail.com</div>
            <div>pq120wal@naver.com</div>
          </div>
          <div className="ml-[0.8rem]">
            <strong className="pb-[1.6rem] title">Tech stack</strong>
            <div>Typescript</div>
            <div>Next.js14</div>
            <div>tailwind</div>
            <div>React Query</div>
            <div>Riot API</div>
          </div>
        </div>
        <div className="mt-[2.4rem] pt-[2.4rem] flex justify-between bottom dark:text-color-gray-700">
          <div>
            @ By using this website, you agree to our terms. We utilize Riot Games API for League of Legends data but
            are not affiliated with Riot Games.
            <br /> All trademarks and intellectual property are owned by Riot Games. The data provided is for
            informational purposes only.
          </div>
          <nav className="inline-flex gap-[0.8rem]">
            {FOOTER_SNS_RENDER_LIST.map(item => (
              <a
                key={item.id}
                href={item.link}
                className={`w-[3.2rem] h-[3.2rem] flex justify-center items-center rounded-[0.4rem] ${
                  item.id !== 1 && 'bg-white'
                }`}
                target="_blank"
              >
                <img src={item.imgPath} alt={item.alt} width={item.size} height={item.size} />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
