'use client';
import { useEffect, useRef } from 'react';
import useModal from './useModal';

export default function useOutsideClick<T extends HTMLElement>() {
  const targetRef = useRef<T>(null);
  const { closeModal } = useModal();

  const handleOutsideClick = (e: MouseEvent) => {
    if (!targetRef.current?.contains(e.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (targetRef) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetRef]);

  return targetRef;
}
