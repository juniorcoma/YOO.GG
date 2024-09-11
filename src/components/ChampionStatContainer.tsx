import { ChampionDataType } from '@/types/staticData';

interface ChampionStatContainerProps {
  info: ChampionDataType['info'];
}

export default function ChampionStatContainer({ info }: ChampionStatContainerProps) {
  return (
    <div className="flex gap-[0.8rem]">
      <div className="stat-box text-[#39AECF] dark:text-[#66D2E6]">
        <span>물리</span>
        <strong>{info.attack}</strong>
      </div>
      <div className="stat-box text-[#0A74DA] dark:text-[#4AABFF]">
        <span>탱킹</span>
        <strong>{info.defense}</strong>
      </div>
      <div className="stat-box text-[#50514F] dark:text-[#A9A9A9]">
        <span>마법</span>
        <strong>{info.magic}</strong>
      </div>
      <div className="stat-box text-[#8B0000] dark:text-[#FF6666]">
        <span>난이도</span>
        <strong>{info.difficulty}</strong>
      </div>
    </div>
  );
}
