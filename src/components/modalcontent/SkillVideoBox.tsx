import { REQUEST_DATA_HOST } from '@/constant/API';
import useOutsideClick from '@/hook/useOutsideClick';
import { SpellKeyType } from '@/types';

interface SkillVideoBoxProps {
  skill: any;
  skillkey: SpellKeyType;
  close: any;
  communitySkillData: any;
}

export default function SkillVideoBox({ skill, skillkey, close, communitySkillData }: SkillVideoBoxProps) {
  const ref = useOutsideClick<HTMLDivElement>();

  return (
    <div className="video-box" ref={ref}>
      <div className="w-[21.5rem] h-full bg-color-gray-00 py-[1.6rem] px-[0.8rem] text-[1.4rem] overflow-auto">
        <h3 className="text-center text-[1.6rem] font-bold mb-[0.8rem]">
          <span className="text-[2rem] text-color-primary-500">{skillkey.toUpperCase()}</span> {skill.name}
        </h3>
        <p className="mb-[1.6rem]" dangerouslySetInnerHTML={{ __html: skill.description }}></p>
        <p>스킬 쿨타임 : {skill.cooldownBurn ? skill.cooldownBurn : '알 수 없음'}(초)</p>
        <p>소모값 : {skill.costBurn ? skill.costBurn : '없음'}</p>
        <p>스킬범위 : {skill.rangeBurn ? skill.rangeBurn : '없음'}</p>
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
        <div className="flex-1 bg-color-gray-200 flex items-center justify-center text-[2rem]">
          관련 스킬 영상이 없습니다
        </div>
      )}
      <button type="button" className="modal-close-btn" onClick={close}>
        닫기
      </button>
    </div>
  );
}
