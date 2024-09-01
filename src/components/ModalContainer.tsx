'use client';

import { ModalStateContext } from '@/hook/ModalProvider';

import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ModalContainer() {
  const { component: Component, props } = useContext(ModalStateContext);
  useEffect(() => {
    if (Component) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [Component]);
  if (Component === null) return null;

  const portal = document.getElementById('portal') || document.createElement('div');

  return createPortal(
    <div className="modal-back-layout" style={{ top: `${document.scrollingElement?.scrollTop}px` }}>
      <Component {...props} />
    </div>,
    portal,
  );
}
