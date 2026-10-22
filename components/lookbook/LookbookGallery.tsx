"use client";

import { useState } from "react";
import { Lightbox } from "@/components/ui/Lightbox";
import { MediaCard } from "@/components/ui/MediaCard";
import { lookbook, lookbookCategories } from "@/data/lookbook";

type Filter = (typeof lookbookCategories)[number];

export function LookbookGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<number | null>(null);
  const entries = filter === "All" ? lookbook : lookbook.filter((entry) => entry.category === filter);
  const items = entries.map((entry) => ({ src: entry.image, alt: entry.title }));

  return (
    <>
      <div role="group" aria-label="Filter by room" className="flex flex-wrap gap-2.5">
        {lookbookCategories.map((category) => {
          const selected = category === filter;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                setFilter(category);
                setActive(null);
              }}
              className={`rounded px-6 py-3 text-[16px] leading-[1.6] tracking-[-0.02em] transition-colors duration-300 ${
                selected ? "bg-chip-active text-surface" : "bg-chip text-chip-text hover:text-foreground"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5" aria-live="polite">
        {entries.map((entry, i) => (
          <li key={entry.title}>
            <MediaCard
              image={entry.image}
              alt={entry.title}
              title={entry.title}
              showView
              onClick={() => setActive(i)}
              className="h-[460px]"
              sizes="(min-width: 1200px) 25vw, (min-width: 810px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </li>
        ))}
      </ul>

      <Lightbox items={items} index={active} onChange={setActive} />
    </>
  );
}
