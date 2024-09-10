'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TooltipStateContext } from './TooltipProviders';

export default function TooltipContainerProviders() {
  const { component: Component, props, target } = useContext(TooltipStateContext);
  const [position, setPosition] = useState<{ top: null | number; left: number | null }>({ top: null, left: null });
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (target && ref.current) {
      const rect = target?.getBoundingClientRect();
      setPosition({
        top:
          window.innerHeight / 2 > rect?.top
            ? rect?.bottom + window.scrollY + 10
            : rect?.top + window.scrollY - (ref.current?.offsetHeight + 10) || null,
        left: rect?.left || null,
      });
    }
  }, [target]);

  if (Component === null) return null;

  const portal = document.getElementById('tooltip') || document.createElement('div');

  return createPortal(
    <div ref={ref} className="tooltip-box" style={{ top: `${position.top}px`, left: `${position.left}px` }}>
      <Component {...props} />
    </div>,
    portal,
  );
}
