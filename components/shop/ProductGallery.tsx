"use client";

import { useState } from "react";
import { Lightbox } from "@/components/ui/Lightbox";
import { MediaCard } from "@/components/ui/MediaCard";
import type { Product } from "@/data/types";

/**
 * Continuously drifting strip of secondary product photographs. Each frame opens
 * in the lightbox; with reduced motion the strip becomes a static scroller.
 */
export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState<number | null>(null);
  const items = product.gallery.map((src, i) => ({ src, alt: `${product.name}, view ${i + 2}` }));
  const loop = [...items, ...items];

  return (
    <section aria-label={`${product.name} gallery`} className="overflow-hidden motion-reduce:overflow-x-auto">
      <ul
        className="marquee-track flex w-max animate-[marquee_60s_linear_infinite] gap-5 hover:[animation-play-state:paused]"
      >
        {loop.map((item, i) => (
          <li key={i} className="w-[373px] shrink-0" aria-hidden={i >= items.length ? true : undefined}>
            <MediaCard
              image={item.src}
              alt={item.alt}
              title={product.name}
              showView
              onClick={() => setActive(i % items.length)}
              className="h-[450px]"
              sizes="373px"
            />
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={active} onChange={setActive} />
    </section>
  );
}
