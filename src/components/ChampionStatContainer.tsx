interface ChampionStatContainerProps {
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
}

export default function ChampionStatContainer({ info }: ChampionStatContainerProps) {
  return (
    <div className="flex gap-[0.8rem]">
      <div className="stat-box text-[#006D77]">
        <span>물리</span>
        <strong>{info.attack}</strong>
      </div>
      <div className="stat-box text-[#0A74DA]">
        <span>탱킹</span>
        <strong>{info.defense}</strong>
      </div>
      <div className="stat-box text-[#50514F]">
        <span>마법</span>
        <strong>{info.magic}</strong>
      </div>
      <div className="stat-box text-[#8B0000]">
        <span>난이도</span>
        <strong>{info.difficulty}</strong>
      </div>
    </div>
  );
}
