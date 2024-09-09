import { SummonerSpellDataType } from '@/types/staticData';

interface SummonerSpellTooltipProps {
  data: SummonerSpellDataType;
}

export default function SummonerSpellTooltip({ data }: SummonerSpellTooltipProps) {
  return (
    <div className="flex flex-col gap-[0.8rem] text-[1.2rem]">
      <strong className="text-[1.4rem] text-[#FFA500]">
        {data.name}
        <span className="text-[1.2rem]"> ({data.id})</span>
      </strong>
      <p>{data.description}</p>
      <span>쿨타임 : {data.cooldownBurn}초</span>
      <span></span>
    </div>
  );
}
