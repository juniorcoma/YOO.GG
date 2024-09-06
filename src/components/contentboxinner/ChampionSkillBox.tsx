'use client';

import { SPELL_KEY } from '@/constant';
import useModal from '@/hook/useModal';
import Image from 'next/image';
import SkillVideoBox from '../modalcontent/SkillVideoBox';
import { SpellKeyType } from '@/types';
import imgSrcVersionLoader from '@/utils/imgSrcVersionLoader';

interface ChampionSkillBoxProps {
  skill: any[];
  communitySkillData: any[];
  version: string;
}

export default function ChampionSkillBox({ skill, communitySkillData, version }: ChampionSkillBoxProps) {
  const { openModal, closeModal } = useModal();

  return (
    <div className="flex justify-center items-center px-[6.4rem] py-[3.2rem]">
      <div className="flex justify-between w-full">
        {skill.map((skill: any, index: number) => (
          <button
            type="button"
            className="flex gap-[0.4rem] flex-col items-center hover:bg-color-gray-200 w-[10rem] py-[0.8rem]"
            key={skill.id}
            onClick={() =>
              openModal({
                component: SkillVideoBox,
                props: {
                  communitySkillData: communitySkillData[index],
                  skill,
                  skillkey: SPELL_KEY[index].toLowerCase() as SpellKeyType,
                  close: closeModal,
                },
              })
            }
          >
            <span className="text-[2.0rem]">{SPELL_KEY[index]}</span>
            <Image
              src={`${
                index
                  ? imgSrcVersionLoader(version, 'CHAMPION_ABILITY')
                  : imgSrcVersionLoader(version, 'CHAMPION_PASSIVE')
              }${skill.image.full}`}
              width={32}
              height={32}
              className="rounded-[0.4rem]"
              alt={''}
              unoptimized
            />
            <span className="text-[1.4rem]">{skill.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
