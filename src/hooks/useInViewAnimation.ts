import { useEffect, useRef, useState } from 'react';

/**
 * Detects when an element enters the viewport.
 * Triggers only once.
 */
export function useInViewAnimation(threshold = 0.3) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, hasTriggered]);

  return { ref, hasTriggered };
}
