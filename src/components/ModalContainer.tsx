'use client';

import { ModalStateContext } from '@/hook/ModalProvider';
import useModal from '@/hook/useModal';
import { usePathname } from 'next/navigation';

import { useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ModalContainer() {
  const { component: Component, props } = useContext(ModalStateContext);
  const pathName = usePathname();
  const { closeModal } = useModal();
  const previousPathName = useRef(pathName);
  useEffect(() => {
    if (Component) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [Component]);

  useEffect(() => {
    if (Component && previousPathName.current !== pathName) {
      closeModal();
    }

    previousPathName.current = pathName;
  }, [pathName, Component, closeModal]);

  if (Component === null) return null;

  const portal = document.getElementById('portal') || document.createElement('div');

  return createPortal(
    <div className="modal-back-layout" style={{ top: `${document.scrollingElement?.scrollTop}px` }}>
      <Component {...props} />
    </div>,
    portal,
  );
}
