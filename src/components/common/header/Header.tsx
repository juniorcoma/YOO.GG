import Link from 'next/link';
import ContentSelectBox from './ContentSelecetBox';
import Logo from '@/assets/icons/yoogg_logo.svg';
import BottomHeader from './BottomHeader';

export default function Header() {
  return (
    <header className="w-full flex flex-col">
      <TopHeader />
      <BottomHeader />
    </header>
  );
}

function TopHeader() {
  return (
    <div className="bg-[#1C1C1F] relative">
      <div className="h-[4.8rem] flex items-center">
        <Link href="/" className="h-full px-[2.4rem] flex justify-center items-center">
          <Logo />
        </Link>
        <ContentSelectBox />
      </div>
    </div>
  );
}
