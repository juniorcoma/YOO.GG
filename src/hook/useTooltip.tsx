import { TooltipSetterContext, TooltipState } from '@/components/providers/TooltipProviders';
import { useContext } from 'react';

export default function useTooltip() {
  const setTooltipState = useContext(TooltipSetterContext);

  const openTooltip = <T,>({ component, props, target }: TooltipState<T>) => {
    setTooltipState({ component, props, target });
  };

  const closeTooltip = () => {
    setTooltipState({ component: null, props: {}, target: null });
  };

  return { openTooltip, closeTooltip };
}
