"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Statement copy whose words darken one by one as the block scrolls through the
 * viewport, matching the reference's scroll-linked text fill. Reduced motion shows it fully inked.
 */
export function ScrollRevealText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const distance = vh * 0.55 + rect.height;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / distance));
      setLit(Math.round(progress * words.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [words.length]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="transition-colors duration-300 motion-reduce:!text-foreground"
          style={{ color: i < lit ? "rgb(26 26 26)" : "rgb(26 26 26 / 0.1)" }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
