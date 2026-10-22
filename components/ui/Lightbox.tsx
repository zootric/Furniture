"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export type LightboxItem = { src: string; alt: string };

type LightboxProps = {
  items: LightboxItem[];
  index: number | null;
  onChange: (index: number | null) => void;
};

/** Full-screen image viewer: click or Escape closes, arrow keys step through the set. */
export function Lightbox({ items, index, onChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = index !== null && items[index] !== undefined;

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onChange(null);
      if (event.key === "ArrowRight") onChange(((index ?? 0) + 1) % items.length);
      if (event.key === "ArrowLeft") onChange(((index ?? 0) - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previousFocus?.focus();
    };
  }, [open, index, items.length, onChange]);

  if (!open) return null;
  const item = items[index];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      tabIndex={-1}
      onClick={() => onChange(null)}
      className="fixed inset-0 z-[60] flex cursor-zoom-out items-center justify-center bg-black/80 p-5 outline-none animate-[fade-in_0.3s_ease-out]"
    >
      <div className="relative aspect-[626/860] h-full max-h-[calc(100vh-40px)] max-w-full">
        <Image src={item.src} alt={item.alt} fill sizes="(min-width: 810px) 700px, 100vw" className="object-cover" priority />
      </div>
      <button
        type="button"
        onClick={() => onChange(null)}
        className="type-nav absolute right-5 top-5 text-cream opacity-80 hover:opacity-100"
      >
        Close
      </button>
    </div>
  );
}
