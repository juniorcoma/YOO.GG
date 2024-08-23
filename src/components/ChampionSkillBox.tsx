'use client';

import { STATIC_DATA_HOST } from '@/constant/API';
import Image from 'next/image';

interface ChampionSkillBoxProps {
  skill: any[];
  passive: any;
}

export default function ChampionSkillBox({ skill, passive }: ChampionSkillBoxProps) {
  console.log(skill);
  return (
    <div className="flex justify-center items-center px-[6.4rem] py-[3.2rem]">
      <div className="flex justify-between w-full">
        <div className="flex gap-[0.4rem] flex-col items-center hover:bg-color-gray-200 w-[8rem] py-[0.8rem]">
          <span className="text-[2.0rem]">P</span>
          <Image
            src={`${STATIC_DATA_HOST.CHAMPION_PASSIVE_IMG}${passive.image.full}`}
            width={32}
            height={32}
            className="rounded-[0.4rem]"
            alt={''}
          />
          <span className="text-[1.4rem]">{passive.name}</span>
        </div>
        {skill.map((skill: any, index: number) => (
          <div
            className="flex gap-[0.4rem] flex-col items-center hover:bg-color-gray-200 w-[8rem] py-[0.8rem]"
            key={skill.id}
          >
            <span className="text-[2.0rem]">{SPELL_KEY[index]}</span>
            <Image
              src={`${STATIC_DATA_HOST.CHAMPION_ABILITY_IMG}${skill.image.full}`}
              width={32}
              height={32}
              className="rounded-[0.4rem]"
              alt={''}
            />
            <span className="text-[1.4rem]">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SPELL_KEY = ['Q', 'W', 'E', 'R'];
