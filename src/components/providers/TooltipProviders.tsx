'use client';

import { createContext, useState } from 'react';

export type TooltipState<T = {}> = {
  component: React.ComponentType<T> | null;
  props: T;
  target: HTMLElement | null;
};

export const TooltipStateContext = createContext<TooltipState>({
  component: null,
  props: {},
  target: null,
});

export const TooltipSetterContext = createContext<React.Dispatch<React.SetStateAction<TooltipState<any>>>>(() => {});

export const TooltipProviders = ({ children }: { children: React.ReactNode }) => {
  const [tooltipState, setTooltipState] = useState<TooltipState>({
    component: null,
    props: {},
    target: null,
  });

  return (
    <TooltipStateContext.Provider value={tooltipState}>
      <TooltipSetterContext.Provider value={setTooltipState}>{children}</TooltipSetterContext.Provider>
    </TooltipStateContext.Provider>
  );
};
