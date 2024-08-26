'use client';

import { createContext, useState } from 'react';

export type ModalState<T = {}> = {
  component: React.ComponentType<T> | null;
  props: T;
};

export const ModalStateContext = createContext<ModalState>({
  component: null,
  props: {},
});

export const ModalSetterContext = createContext<React.Dispatch<React.SetStateAction<ModalState<any>>>>(() => {});

export const ModalsProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>({
    component: null,
    props: {},
  });

  return (
    <ModalStateContext.Provider value={modalState}>
      <ModalSetterContext.Provider value={setModalState}>{children}</ModalSetterContext.Provider>
    </ModalStateContext.Provider>
  );
};
