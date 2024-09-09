import { ImageDataType } from '@/types/staticData';

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
  return (
    <div className="flex flex-col text-[1.2rem] min-w-[20rem]">
      <strong className="text-[1.4rem] text-[#FFA500]">{data.name}</strong>
      <p dangerouslySetInnerHTML={{ __html: data.description }} className="mb-[0.4rem]"></p>
      <span>가격 : {data.gold.total.toLocaleString()}원</span>
      <span>판매가격 : {data.gold.sell.toLocaleString()}원</span>
    </div>
  );
}
