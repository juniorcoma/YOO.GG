import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ReactQueryProviders from '@/hook/query/useReactQuery';
import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';
import BackgroundProvider from '@/hook/BackgroundProvider';
import { ModalsProvider } from '@/hook/ModalProvider';
import ModalContainer from '@/components/ModalContainer';

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
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={AppleSDGOdicNeo.className}>
      <body className="text-color-gray-900">
        <BackgroundProvider>
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
        </BackgroundProvider>
        <div id="portal"></div>
      </body>
    </html>
  );
}
