import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';

import { getChampionsData, getItemsData, getSummonerSpellsData, getVersionsData } from '@/service/requestJsonData.api';

import { ModalsProvider } from '@/components/providers/ModalProvider';
import BackgroundProvider from '@/components/providers/BackgroundProvider';
import ProgressProviders from '@/components/providers/ProgressBarProvider';
import ReactQueryProviders from '@/components/providers/ReactQueryProviders';
import ModalContainerProviders from '@/components/providers/ModalContainerProviders';
import { TooltipProviders } from '@/components/providers/TooltipProviders';
import TooltipContainerProviders from '@/components/providers/TooltipContainerProviders';

const AppleSDGOdicNeo = localFont({
  src: [
    {
      path: '../../public/font/AppleSDGothicNeo-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: {
    template: '%s | 롤 전적 검색 사이트 YOO.GG',
    default: '롤 전적 검색 사이트 YOO.GG - 챔피언 정보와 게임 전적, 라이엇 아이디 태그 검색',
  },
  description:
    '리그오브레전드 전적검색과 다양한 정보를 만날 수 있는 YOO.GG, YOO.GG에서 롤 전적 검색과 챔피언 정보를 확인해보세요. 소환사의 협곡, 칼바람의 나락에 관한 전적 데이터를 만나볼 수 있습니다. 라이엇 아이디와 태그를 함께 검색해 보세요!',
  openGraph: {
    title: '롤 전적 검색 사이트 YOO.GG - 챔피언 정보와 게임 전적, 라이엇 아이디 태그 검색',
    description:
      '리그오브레전드 전적검색과 다양한 정보를 만날 수 있는 YOO.GG, YOO.GG에서 롤 전적 검색과 챔피언 정보를 확인해보세요. 소환사의 협곡, 칼바람의 나락에 관한 전적 데이터를 만나볼 수 있습니다. 라이엇 아이디와 태그를 함께 검색해 보세요!',
    url: 'https://yoo-gg.vercel.app',
    siteName: 'YOO.GG',
    type: 'website',
    images: [
      {
        url: 'https://yoo-gg.vercel.app/images/opengraph_img.png',
        width: 800,
        height: 600,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getChampionsData();
  await getVersionsData();
  await getItemsData();
  await getSummonerSpellsData();
  return (
    <html lang="ko" className={AppleSDGOdicNeo.className}>
      <meta name="title" content="롤 전적 검색 사이트 YOO.GG - 챔피언 정보와 게임 전적, 라이엇 아이디 태그 검색"></meta>
      <body>
        <BackgroundProvider>
          <ProgressProviders>
            <div id="__next">
              <Header />
              <ReactQueryProviders>
                <ModalsProvider>
                  <TooltipProviders>
                    <ModalContainerProviders />
                    <TooltipContainerProviders />
                    {children}
                  </TooltipProviders>
                </ModalsProvider>
              </ReactQueryProviders>
              <Footer />
            </div>
          </ProgressProviders>
        </BackgroundProvider>
        <div id="portal"></div>
        <div id="tooltip"></div>
      </body>
    </html>
  );
}
