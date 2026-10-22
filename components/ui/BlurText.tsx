"use client";

import { Fragment, useEffect, useRef, useState } from "react";

type BlurTextProps = {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  id?: string;
};

/**
 * Letter-by-letter blur-in reveal used for display headings on the reference.
 * The heading is labelled with the full string; the individually animated glyphs are hidden from assistive tech.
 */
export function BlurText({ text, as: Tag = "h2", className = "", id }: BlurTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  let index = 0;
  const words = text.split(" ");

  return (
    <Tag
      ref={ref as never}
      id={id}
      aria-label={text}
      className={`blur-text ${className}`}
      data-state={visible ? "visible" : "hidden"}
    >
      <span aria-hidden="true">
        {words.map((word, w) => (
          <Fragment key={w}>
            <span className="inline-block whitespace-nowrap">
              {[...word].map((char) => (
                <span key={index} className="blur-text-char" style={{ "--i": index++ } as React.CSSProperties}>
                  {char}
                </span>
              ))}
            </span>
            {w < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
