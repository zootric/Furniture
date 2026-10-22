import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { AvailabilityLink, ProductDetails, ProductTitle } from "@/components/shop/ProductInformation";
import { RelatedProducts } from "@/components/shop/RelatedProducts";
import { getProduct, products } from "@/data/products";
import { relatedProductSlugs } from "@/data/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description[0],
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const related = relatedProductSlugs.map((slug) => getProduct(slug)).filter((p) => p !== undefined);

  return (
    <>
      <article className="frame px-5 pt-[var(--page-top)]">
        <div className="flex flex-col gap-5 desktop:flex-row">
          <div className="relative aspect-[570/600] w-full shrink-0 overflow-hidden rounded-2xl bg-[#e7e3dc] desktop:w-[570px] desktop:self-start">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1200px) 570px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="order-1 tablet:order-2 tablet:mt-10">
              <ProductTitle product={product} />
            </div>
            <div className="order-2 mt-10 tablet:order-1 tablet:mt-0">
              <ProductDetails product={product} />
            </div>
            <div className="order-3 mt-10 flex">
              <AvailabilityLink product={product} />
            </div>
          </div>
        </div>
      </article>

      <div className="frame mt-20 px-5 tablet:mt-[120px]">
        <hr className="rule" />
      </div>
      <div className="mt-14">
        <ProductGallery product={product} />
      </div>

      <div className="mt-20 pb-10 tablet:mt-40 tablet:pb-20">
        <RelatedProducts products={related} />
      </div>
    </>
  );
}
