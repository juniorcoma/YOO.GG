import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ReactQueryProviders from '@/hook/query/useReactQuery';
import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';
import BackgroundProvider from '@/hook/BackgroundProvider';
import { ModalsProvider } from '@/hook/ModalProvider';
import ModalContainer from '@/components/ModalContainer';
import ProgressProviders from '@/components/ProgressBarProvider';
import { getChampionsData, getVersionsData } from '@/service/requestJsonData.api';

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
    template: '%s | YOO.GG',
    default: 'YOO.GG',
  },
  description: '리그오브레전드의 모든 챔피언의 최신 정보와 소환사의 전적을 검색하여 승률을 올려보세요!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getChampionsData();
  await getVersionsData();
  return (
    <html lang="ko" className={AppleSDGOdicNeo.className}>
      <body className="text-color-gray-900">
        <BackgroundProvider>
          <ProgressProviders>
            <div id="__next">
              <Header />
              <ReactQueryProviders>
                <ModalsProvider>
                  <ModalContainer />
                  {children}
                </ModalsProvider>
              </ReactQueryProviders>
              <Footer />
            </div>
          </ProgressProviders>
        </BackgroundProvider>
        <div id="portal"></div>
      </body>
    </html>
  );
}
