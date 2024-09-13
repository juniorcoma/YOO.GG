import NotFoundBtn from '@/components/common/NotFoundBtn';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFoundPage');
  return (
    <div className="w-[108rem] m-auto text-center pt-[12rem] pb-[6.4rem]">
      <div className="inline-flex flex-col gap-[3.6rem]">
        <h2 className="text-[2.4rem] font-bold">{t('title')}</h2>
        <p className="text-[1.6rem]">
          {t('description1')} <br /> {t('description2')} <br />
          {t('description3')}
        </p>
        <div className="flex flex-col gap-[0.8rem] items-center">
          <div className="flex gap-[0.8rem] mb-[1.6rem] justify-center">
            <NotFoundBtn target="back">{t('prevBtnText')}</NotFoundBtn>
            <NotFoundBtn target="home">{t('homeBtnText')}</NotFoundBtn>
          </div>
          <img src={`/images/not_found_img.png`} width={380} height={380} alt="404 이미지" />
        </div>
      </div>
    </div>
  );
}
