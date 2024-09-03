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
  const callbackOlnyIntersection: IntersectionObserverCallback = (entries, observer) => {
    const isIntersecting = entries.map(entry => entry.isIntersecting).reduce((acc, cur) => acc && cur, true);
    if (isIntersecting) {
      callback(entries, observer); // 요소가 보일 때의 콜백
    } else {
      onNotIntersecting(entries, observer); // 요소가 안보일 때의 콜백
    }
  };

  const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(callbackOlnyIntersection, options));
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current || !observerRef.current) {
      return;
    }
    observerRef.current.observe(elementRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => observerRef.current.disconnect();
  }, [observerRef, elementRef]);

  return elementRef;
};

export default useIntersectionObservRef;
