'use client';

import { createContext, useState } from 'react';

interface ModuleStateContext {
  moduleState: boolean;
  handleOpenModule: () => void;
  handleCloseModule: () => void;
}

export const ModuleStateContext = createContext<ModuleStateContext>({
  moduleState: false,
  handleOpenModule: () => {},
  handleCloseModule: () => {},
});

interface ModuleStateProvidersProps {
  children: React.ReactNode;
}

export default function ModuleStateProviders({ children }: ModuleStateProvidersProps) {
  const [moduleState, setModuleState] = useState(false);
  console.log(moduleState);
  const handleOpenModule = () => {
    setModuleState(true);
  };

  const handleCloseModule = () => {
    setModuleState(false);
  };

  return (
    <ModuleStateContext.Provider value={{ moduleState, handleOpenModule, handleCloseModule }}>
      {children}
    </ModuleStateContext.Provider>
  );
}
