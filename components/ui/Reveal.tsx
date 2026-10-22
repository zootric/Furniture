"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  as?: "div" | "li";
  className?: string;
  /** Distance in px the element rises while fading in. */
  offset?: number;
};

/**
 * Fades an element up into place the first time half of it enters the viewport,
 * matching the reference's appear effect on cards and copy blocks.
 */
export function Reveal({ children, as: Tag = "div", className = "", offset = 30 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      data-shown={shown}
      style={{ "--reveal-y": `${offset}px` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
