import { SummonerSpellDataType } from '@/types/staticData';
import { useTranslations } from 'next-intl';

interface SummonerSpellTooltipProps {
  data: SummonerSpellDataType;
}

export default function SummonerSpellTooltip({ data }: SummonerSpellTooltipProps) {
  const t = useTranslations('spellTooltip');
  return (
    <div className="flex flex-col gap-[0.8rem] text-[1.2rem]">
      <strong className="text-[1.4rem] text-[#FFA500]">
        {data.name}
        <span className="text-[1.2rem]"> ({data.id})</span>
      </strong>
      <p>{data.description}</p>
      <span>
        {t('cooldown')} : {data.cooldownBurn}
        {t('unit')}
      </span>
      <span></span>
    </div>
  );
}
