import { MediaCard } from "@/components/ui/MediaCard";
import type { Product } from "@/data/types";

/** Auto-filling grid: four columns at 1440px, three at 1280px, two on tablets, one on phones. */
export function ProductGrid({ products, priorityCount = 0 }: { products: Product[]; priorityCount?: number }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
      {products.map((product, i) => (
        <li key={product.slug}>
          <MediaCard
            href={`/shop/${product.slug}`}
            image={product.image}
            alt={product.name}
            title={product.name}
            showView
            className="h-[460px]"
            sizes="(min-width: 1200px) 25vw, (min-width: 810px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={i < priorityCount}
          />
        </li>
      ))}
    </ul>
  );
}
