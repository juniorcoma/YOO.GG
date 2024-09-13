import { ChampionDataType } from '@/types/staticData';
import { useTranslations } from 'next-intl';

interface ChampionStatContainerProps {
  info: ChampionDataType['info'];
}

export default function ChampionStatContainer({ info }: ChampionStatContainerProps) {
  const t = useTranslations('champStatContainer');
  return (
    <div className="flex gap-[0.8rem]">
      <div className="stat-box text-[#39AECF] dark:text-[#66D2E6]">
        <span>{t('atteck')}</span>
        <strong>{info.attack}</strong>
      </div>
      <div className="stat-box text-[#0A74DA] dark:text-[#4AABFF]">
        <span>{t('defense')}</span>
        <strong>{info.defense}</strong>
      </div>
      <div className="stat-box text-[#50514F] dark:text-[#A9A9A9]">
        <span>{t('magic')}</span>
        <strong>{info.magic}</strong>
      </div>
      <div className="stat-box text-[#8B0000] dark:text-[#FF6666]">
        <span>{t('difficulty')}</span>
        <strong>{info.difficulty}</strong>
      </div>
    </div>
  );
}
