import { REQUEST_DATA_HOST } from '@/constant/API';
import useModal from '@/hook/useModal';
import useOutsideClick from '@/hook/useOutsideClick';
import { SpellKeyType } from '@/types';
import { useTranslations } from 'next-intl';

interface SkillVideoBoxProps {
  skill: any;
  skillkey: SpellKeyType;
  close: any;
  communitySkillData: any;
}

export default function SkillVideoBox({ skill, skillkey, close, communitySkillData }: SkillVideoBoxProps) {
  const { closeModal } = useModal();
  const ref = useOutsideClick<HTMLDivElement>({ callback: closeModal });
  const t = useTranslations('skillVideoBox');
  return (
    <div className="video-box" ref={ref}>
      <div className="w-[21.5rem] h-full bg-color-gray-00 py-[1.6rem] px-[0.8rem] text-[1.4rem] overflow-auto">
        <h3 className="text-center text-[1.6rem] font-bold mb-[0.8rem]">
          <span className="text-[2rem] text-color-primary-500">{skillkey.toUpperCase()}</span> {skill.name}
        </h3>
        <p className="mb-[1.6rem]" dangerouslySetInnerHTML={{ __html: skill.description }}></p>
        <p>
          {t('cooldown')} : {skill.cooldownBurn ? skill.cooldownBurn : t('emptyCool')}
          {t('unit')}
        </p>
        <p>
          {t('cost')} : {skill.costBurn ? skill.costBurn : t('nodata')}
        </p>
        <p>
          {t('range')} : {skill.rangeBurn ? skill.rangeBurn : t('nodata')}
        </p>
      </div>
      {communitySkillData.abilityVideoPath ? (
        <video
          src={`${REQUEST_DATA_HOST.SKILL_VIDEO}${communitySkillData.abilityVideoPath}`}
          controls
          autoPlay
          muted
          loop
        ></video>
      ) : (
        <div className="flex-1 bg-color-gray-200 flex items-center justify-center text-[2rem]">{t('notVideo')}</div>
      )}
      <button type="button" className="modal-close-btn" onClick={close}>
        {t('closeBtn')}
      </button>
    </div>
  );
}
