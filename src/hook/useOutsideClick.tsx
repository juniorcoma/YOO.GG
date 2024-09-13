'use client';
import { useEffect, useRef } from 'react';

interface useOutsideClickProps {
  callback: () => void;
}

export default function useOutsideClick<T extends HTMLElement>({ callback }: useOutsideClickProps) {
  const targetRef = useRef<T>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (!targetRef.current?.contains(e.target as Node) && targetRef.current) {
      callback();
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
