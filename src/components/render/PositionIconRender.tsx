import { ChampPositionType } from '@/types';
import PositionBottom from '@/assets/icons/position_bottom.svg';
import PositionTop from '@/assets/icons/position_top.svg';
import PositionMid from '@/assets/icons/position_mid.svg';
import PositionJungle from '@/assets/icons/position_jungle.svg';
import PositionSupport from '@/assets/icons/position_support.svg';

export default function PositionIconRender({ position }: { position: ChampPositionType }) {
  switch (position) {
    case 'top':
      return <PositionTop />;
    case 'bottom':
      return <PositionBottom />;
    case 'jungle':
      return <PositionJungle />;
    case 'mid':
      return <PositionMid />;
    case 'support':
      return <PositionSupport />;
  }
}
