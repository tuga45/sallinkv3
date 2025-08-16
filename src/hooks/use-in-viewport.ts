"use client";

import { RefObject, useEffect, useState } from "react";

export function useInViewport<T extends Element>(
  ref: RefObject<T>,
  options: IntersectionObserverInit = { root: null, rootMargin: "0px", threshold: 0.1 }
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const node = ref.current;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsIntersecting(entry?.isIntersecting || false);
    }, options);

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [ref, options.root, options.rootMargin, options.threshold]);

  return isIntersecting;
}
