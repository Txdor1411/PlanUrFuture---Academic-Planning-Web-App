"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollHijackProps {
  children: React.ReactNode;
}

export function ScrollHijack({ children }: ScrollHijackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only hijack if cursor is over this component
      const rect = container.getBoundingClientRect();
      const isOverComponent = 
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!isOverComponent) return;

      e.preventDefault();
      e.stopPropagation();

      setProgress((prev) => {
        const delta = e.deltaY * 0.003;
        return Math.max(0, Math.min(1, prev + delta));
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {children}
      {progress > 0 && progress < 1 && (
        <div className="pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full border border-sky-300/40 bg-sky-500/15 px-4 py-2 text-xs font-semibold text-sky-100">
          Scroll to explore • {Math.round(progress * 100)}%
        </div>
      )}
    </div>
  );
}

