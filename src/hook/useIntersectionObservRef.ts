'use client';

import { RefCallback, RefObject, useEffect, useRef } from 'react';

interface useIntersectionObservRefProps {
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
  onNotIntersecting: IntersectionObserverCallback;
}

const useIntersectionObservRef = <T extends HTMLElement>({
  callback,
  options = { root: null, rootMargin: '0px', threshold: 0 },
  onNotIntersecting,
}: useIntersectionObservRefProps): RefCallback<T> | RefObject<T> => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !elementRef.current) {
      return;
    }

    const callbackOlnyIntersection: IntersectionObserverCallback = (entries, observer) => {
      const isIntersecting = entries.every(entry => entry.isIntersecting);
      if (isIntersecting) {
        callback(entries, observer); // 요소가 보일 때의 콜백
      } else {
        onNotIntersecting(entries, observer); // 요소가 안보일 때의 콜백
      }
    };

    observerRef.current = new IntersectionObserver(callbackOlnyIntersection, options);

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options, onNotIntersecting]);

  return elementRef;
};

export default useIntersectionObservRef;
