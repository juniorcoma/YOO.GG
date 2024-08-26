'use client';

import { SPELL_KEY } from '@/constant';
import { STATIC_DATA_HOST } from '@/constant/API';
import useModal from '@/hook/useModal';
import Image from 'next/image';
import SkillVideoBox from './SkillVideoBox';
import { SpellKeyType } from '@/types';

interface ChampionSkillBoxProps {
  skill: any[];
  champKey: string;
}

export default function ChampionSkillBox({ skill, champKey }: ChampionSkillBoxProps) {
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
                props: { champKey, skill, skillkey: SPELL_KEY[index].toLowerCase() as SpellKeyType, close: closeModal },
              })
            }
          >
            <span className="text-[2.0rem]">{SPELL_KEY[index]}</span>
            <Image
              src={`${index ? STATIC_DATA_HOST.CHAMPION_ABILITY_IMG : STATIC_DATA_HOST.CHAMPION_PASSIVE_IMG}${
                skill.image.full
              }`}
              width={32}
              height={32}
              className="rounded-[0.4rem]"
              alt={''}
            />
            <span className="text-[1.4rem]">{skill.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
