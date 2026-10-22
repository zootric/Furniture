import { MediaCard } from "@/components/ui/MediaCard";
import type { Product } from "@/data/types";

export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="related-heading" className="px-5">
      <hr className="rule" />
      <h2 id="related-heading" className="type-section mt-10 text-muted tablet:mt-14">
        You might also like
      </h2>
      <ul className="mt-8 grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
        {products.map((product, i) => (
          <li key={product.slug} className={i === 2 ? "tablet:max-desktop:hidden" : undefined}>
            <MediaCard
              href={`/shop/${product.slug}`}
              image={product.image}
              alt={product.name}
              title={product.name}
              showView
              className="h-[450px]"
              sizes="(min-width: 810px) 33vw, 100vw"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
