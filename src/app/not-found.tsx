import NotFoundBtn from '@/components/common/NotFoundBtn';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="w-[108rem] m-auto text-center pt-[12rem] pb-[6.4rem]">
      <div className="inline-flex flex-col gap-[3.6rem]">
        <h2 className="text-[2.4rem] font-bold">다시 한번 확인해주세요</h2>
        <p className="text-[1.6rem]">
          지금 입력하신 주소의 페이지는 <br /> 사라졌거나 다른 페이지로 변경되었습니다. <br />
          주소를 다시 확인해주세요!
        </p>
        <div>
          <div className="flex gap-[0.8rem] mb-[1.6rem] justify-center">
            <NotFoundBtn target="back">이전 페이지</NotFoundBtn>
            <NotFoundBtn target="home">홈</NotFoundBtn>
          </div>
          <Image src={`/images/not_found_img.png`} width={380} height={380} alt="404 이미지" />
        </div>
      </div>
    </div>
  );
}
