import { STATIC_DATA_HOST } from '@/constant/API';
import useGetChampionOtherData from '@/hook/query/useGetChampionOtherData';
import useOutsideClick from '@/hook/useOutsideClick';
import { SpellKeyType } from '@/types';
import { useEffect, useRef } from 'react';

interface SkillVideoBoxProps {
  champKey: string;
  skill: any;
  skillkey: SpellKeyType;
  close: any;
}

export default function SkillVideoBox({ champKey, skill, skillkey, close }: SkillVideoBoxProps) {
  const { data, isLoading } = useGetChampionOtherData(champKey, skillkey);
  const ref = useOutsideClick<HTMLDivElement>();
  if (isLoading) return <div> 로딩중</div>;

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
      <video
        src={`${data && STATIC_DATA_HOST.SKILL_VIDEO_HOST}${data.abilityVideoPath}`}
        controls
        autoPlay
        muted
        loop
      ></video>
      <button type="button" className="modal-close-btn" onClick={close}>
        닫기
      </button>
    </div>
  );
}
