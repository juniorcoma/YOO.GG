import Link from 'next/link';
import ContentSelectBox from './ContentSelecetBox';
import Logo from '@/assets/icons/yoogg_logo.svg';
import BottomHeader from './BottomHeader';
import { getVersionsData } from '@/service/requestJsonData.api';

export default async function Header() {
  const [latestVersion] = await getVersionsData();
  return (
    <header className="w-full flex flex-col">
      <TopHeader />
      <BottomHeader version={latestVersion} />
    </header>
  );
}

function TopHeader() {
  return (
    <div className="bg-[#1C1C1F] relative">
      <div className="h-[4.8rem] flex items-center">
        <Link href="/" className="h-full px-[2.4rem] flex justify-center items-center">
          <h1 className="hidden-logo">YOO.GG</h1>
          <Logo />
        </Link>
        <ContentSelectBox />
      </div>
    </div>
  );
}
