import { useState, useEffect } from "react";

export function useCountUp(end: number, duration: number, trigger: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger || end === 0) return;

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart — 처음엔 빠르게, 마지막 구간부터 천천히
      const eased = 1 - Math.pow(1 - progress, 5);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [trigger, end, duration]);

  return count;
}
