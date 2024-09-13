'use client';

import { useRouter } from 'next/navigation';

interface NotFoundBtnProps {
  children: React.ReactNode;
  target: 'back' | 'home';
}
export default function NotFoundBtn({ children, target }: NotFoundBtnProps) {
  const router = useRouter();

  const handleClick = () => {
    if (target === 'back') {
      router.back();
      return;
    } else {
      router.push('/');
      return;
    }
  };

  return (
    <button
      type="button"
      className="rounded-[0.4rem] py-[0.8rem] text-[1.4rem] w-[9.6rem] bg-color-primary-500 flex justify-center items-center text-[#fff]"
      onClick={handleClick}
    >
      <span>{children}</span>
    </button>
  );
}
