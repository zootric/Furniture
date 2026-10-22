import Image from "next/image";
import { ScrollRevealText } from "@/components/home/ScrollRevealText";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BlurText } from "@/components/ui/BlurText";
import { MediaCard } from "@/components/ui/MediaCard";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHero } from "@/components/ui/SplitHero";
import { getProduct } from "@/data/products";
import { materials, quietFormsSlugs } from "@/data/site";

const statement =
  "We design furniture that feels settled in a room, not staged for attention. Each piece is reduced to what is essential and built to age with quiet dignity.";

export default function HomePage() {
  const collection = quietFormsSlugs.map((slug) => getProduct(slug)).filter((p) => p !== undefined);

  return (
    <>
      <SplitHero
        image="/images/home/hero.jpg"
        alt="A slatted wooden armchair on a steel frame in a dim concrete room"
        title="ARLOW®"
        phoneTop="right"
        left={
          <div className="w-[258px]">
            <p className="type-body text-cream-muted">
              Each piece is produced in small batches, finished by hand, and made to soften with time.
            </p>
            <ArrowLink href="/shop" className="mt-5">
              Shop Collection
            </ArrowLink>
          </div>
        }
        right={
          <p className="type-body w-[275px] text-cream-muted tablet:text-justify">
            Objects shaped for lived spaces, Furniture built from solid materials and quiet intention, Designed to settle
            into a room, not compete with it.
          </p>
        }
      />

      {/* Collection 01 — Quiet Forms */}
      <section aria-labelledby="collection-heading" className="frame px-2.5 pt-10 tablet:px-5">
        <hr className="rule" />
        <BlurText id="collection-heading" text="Collection 01 — Quiet Forms" className="type-section mt-14 text-muted" />
        <div className="mt-5 flex flex-col gap-5 desktop:flex-row desktop:items-start desktop:justify-between">
          <Reveal className="type-body max-w-[367px] text-muted">
            <p>A study in proportion and weight.</p>
            <p>
              Powder-coated steel. Solid oak. Natural linen. Each piece is made in small batches. No seasonal excess.
              No artificial urgency.
            </p>
          </Reveal>
          <Reveal offset={15} className="flex self-start">
            <ArrowLink href="/shop" variant="button">
              Explore Collection
            </ArrowLink>
          </Reveal>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
          {collection.map((product, i) => (
            <Reveal as="li" key={product.slug} className={i === 2 ? "tablet:max-desktop:hidden" : ""}>
              <MediaCard
                href={`/shop/${product.slug}`}
                image={product.image}
                alt={product.name}
                title={product.name}
                showView
                className="aspect-[453/547]"
                sizes="(min-width: 810px) 33vw, 100vw"
              />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Statement */}
      <section aria-label="Studio statement" className="frame mt-10 flex flex-col gap-[34px] tablet:flex-row tablet:items-center tablet:gap-0">
        <div className="px-2.5 pt-10 tablet:flex-1 tablet:pl-5 tablet:pr-0 tablet:pt-0">
          <ScrollRevealText text={statement} className="type-statement" />
        </div>
        <div className="relative aspect-[3/4] w-full shrink-0 tablet:w-[calc(50%-15px)]">
          <Image
            src="/images/home/statement.png"
            alt="A sculptural black stool with organic, branching legs"
            fill
            sizes="(min-width: 810px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Materials */}
      <section id="materials" aria-labelledby="materials-heading" className="frame scroll-mt-20 px-2.5 pt-10 tablet:px-5">
        <hr className="rule" />
        <BlurText id="materials-heading" text="Materials" className="type-section mt-14 text-muted" />
        <p className="type-body mt-5 max-w-[494px] text-muted">
          We build with solid oak, powder-coated steel, and natural linen. Each material is chosen for durability and
          quiet presence. Grain remains visible. Finishes remain matte. Fabrics are left undyed to age naturally. We do
          not polish away character. We allow it to remain.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-5 tablet:grid-cols-3 tablet:gap-2.5 desktop:gap-5">
          {materials.map((material) => (
            <Reveal as="li" key={material.name}>
              <MediaCard
                image={material.image}
                alt={`${material.name} — material study`}
                title={material.name}
                description={material.lines.join(" ")}
                descriptionClassName="max-w-[180px]"
                staticLabel
                className="aspect-[453/547]"
                sizes="(min-width: 810px) 33vw, 100vw"
              />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Styled in Real Spaces */}
      <section aria-labelledby="spaces-heading" className="relative mt-10 h-svh min-h-[600px] overflow-hidden text-surface">
        <Image
          src="/images/home/styled-spaces.jpg"
          alt="A rust velvet armchair and ottoman in a softly lit room"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-foreground/50" />
        <div className="frame absolute inset-x-0 top-0 px-2.5 pt-20 tablet:px-5">
          <BlurText id="spaces-heading" text="Styled in Real Spaces" className="type-section" />
          <Reveal className="type-body mt-5">
            <p>No staged showrooms.</p>
            <p>No artificial lighting. Just homes. Studios.</p>
            <p>Corners where life actually happens.</p>
          </Reveal>
          <Reveal offset={5} className="mt-5 flex">
            <ArrowLink href="/lookbook">View Lookbook</ArrowLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
