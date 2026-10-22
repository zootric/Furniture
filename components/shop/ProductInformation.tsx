import { ArrowLink } from "@/components/ui/ArrowLink";
import { contactEmail } from "@/data/site";
import type { Product } from "@/data/types";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[16px] font-medium leading-[1.2] uppercase">{children}</h2>;
}

function LeadTime({ text, highlight }: { text: string; highlight: string }) {
  const [before, ...rest] = text.split(highlight);
  if (!rest.length) return <>{text}</>;
  return (
    <>
      {before}
      <strong className="font-bold">{highlight}</strong>
      {rest.join(highlight)}
    </>
  );
}

export function ProductTitle({ product }: { product: Product }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <p className="type-copy max-w-[150px] text-muted tablet:max-w-none">{product.collection}</p>
        <p className="type-subsection text-muted">{product.price}</p>
      </div>
      <h1 className="text-[36px] font-light leading-[1.2] tracking-[-0.04em] text-foreground tablet:text-[45px] desktop:text-[56px]">
        {product.name}
      </h1>
    </div>
  );
}

export function AvailabilityLink({ product }: { product: Product }) {
  const subject = encodeURIComponent(`Availability: ${product.name}`);
  return (
    <ArrowLink variant="button" href={`mailto:${contactEmail}?subject=${subject}`}>
      Contact for Availability
    </ArrowLink>
  );
}

/** Description, dimensions, materials, lead time and care, laid out as a two-column grid on wide screens. */
export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="type-copy grid grid-cols-1 gap-5 text-muted tablet:grid-cols-2">
      <section className="flex flex-col gap-5">
        <SectionHeading>
          <span className="text-foreground">Description:</span>
        </SectionHeading>
        {product.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="flex flex-col gap-5">
        <SectionHeading>
          <span className="text-foreground">Dimensions:</span>
        </SectionHeading>
        <ul className="list-disc pl-[18px]">
          {product.dimensions.map((dimension) => (
            <li key={dimension.label}>
              <strong className="font-bold">{dimension.label}:</strong> {dimension.value}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-5">
        <SectionHeading>
          <span className="text-foreground">Materials:</span>
        </SectionHeading>
        <ul className="list-disc pl-[18px]">
          {product.materials.map((material) => (
            <li key={material}>{material}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-5">
        <SectionHeading>
          <span className="text-foreground">Lead Time</span>
        </SectionHeading>
        <p>
          <LeadTime text={product.leadTime} highlight={product.leadTimeHighlight} />
        </p>
      </section>

      <section className="flex flex-col gap-3.5">
        <h2 className="text-[16px] font-medium leading-[1.2] tracking-[-0.04em] text-black">Care:</h2>
        <p>{product.care}</p>
      </section>
    </div>
  );
}
