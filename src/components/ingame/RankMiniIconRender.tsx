import { COMMUNITY_DRAGON_IMG_URL } from '@/constant/API';
import Image from 'next/image';

interface RankMiniIconRenderProps {
  tier: string;
}

export default function RankMiniIconRender({ tier }: RankMiniIconRenderProps) {
  const TierLowerString = tier.toLowerCase();
  return (
    <Image
      src={`${COMMUNITY_DRAGON_IMG_URL.MINI_TIER}${TierLowerString}.svg`}
      width={30}
      height={30}
      alt={`${TierLowerString} tier image`}
      unoptimized
    />
  );
}
