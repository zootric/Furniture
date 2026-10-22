import type { Metadata } from "next";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { PageHeading } from "@/components/ui/PageHeading";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Furniture & objects designed in-house and produced in limited batches.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeading title="Furniture & Objects" intro="Designed in-house. Produced in limited batches." />
      <section aria-label="Products" className="frame px-5 pb-20 pt-[60px] tablet:pt-20">
        <ProductGrid products={products} priorityCount={4} />
      </section>
    </>
  );
}
