import { ImageDataType } from '@/types/staticData';
import { useTranslations } from 'next-intl';

interface ItemTooltipProps {
  data: {
    name: string;
    description: string;
    plaintext: string;
    image: ImageDataType;
    gold: {
      base: number;
      purchasable: boolean;
      total: number;
      sell: number;
    };
    tags: string[];
  };
}
export default function ItemTooltip({ data }: ItemTooltipProps) {
  const t = useTranslations('itemTooltip');
  return (
    <div className="flex flex-col text-[1.2rem] min-w-[20rem]">
      <strong className="text-[1.4rem] text-[#FFA500]">{data.name}</strong>
      <p dangerouslySetInnerHTML={{ __html: data.description }} className="mb-[0.4rem]"></p>
      <span>
        {t('price')} : {data.gold.total.toLocaleString()}
      </span>
      <span>
        {t('sell')} : {data.gold.sell.toLocaleString()}
      </span>
    </div>
  );
}
