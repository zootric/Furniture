import type { Metadata } from "next";
import Image from "next/image";
import { BlurText } from "@/components/ui/BlurText";

export const metadata: Metadata = {
  title: "About",
  description: "Arlow began as a small workshop focused on proportion and restraint.",
};

export default function AboutPage() {
  return (
    <>
      <div className="frame px-2.5 pt-[var(--page-top)] tablet:px-5">
        <BlurText as="h1" text="About Arlow" className="type-display" />
        <p className="type-body mt-5">Arlow began as a small workshop focused on proportion and restraint.</p>
        <hr className="rule mt-[30px] bg-border-strong tablet:mt-10" />
      </div>

      <div className="frame px-2.5 pt-10 tablet:px-5">
        <div className="relative aspect-[37/35] w-full overflow-hidden tablet:aspect-[1400/845]">
          <Image
            src="/images/about/workshop.webp"
            alt="Two makers sanding and marking timber at a workbench in the Arlow workshop"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="mx-auto mt-10 max-w-[1400px] text-center text-[20px] leading-[1.4] tracking-[-0.02em] tablet:text-[24px]">
          <p>
            We were not interested in trends. We were interested in weight, structure, and how objects sit in space.
            Every piece begins with material. If something feels unnecessary, it’s removed. Production is small scale.
            We work with local fabricators and finish each piece by hand.
          </p>
          <p className="mt-5">We sketch. We prototype. We reduce.</p>
        </div>

        <div className="relative mt-5 aspect-[37/35] w-full overflow-hidden tablet:aspect-[1400/724]">
          <Image
            src="/images/about/bench.webp"
            alt="A workbench beneath shelves of stacked timber and hand tools"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <section aria-labelledby="not-fast-heading" className="relative mt-10 h-svh min-h-[600px] overflow-hidden text-surface">
        <Image
          src="/images/about/not-fast.webp"
          alt="A slatted wooden lounge chair on a dark steel base"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-foreground/50" />
        <div className="frame absolute inset-x-0 top-0 px-5 pt-20">
          <BlurText id="not-fast-heading" text="Arlow is not fast furniture." className="type-section max-w-[420px] tablet:max-w-none desktop:max-w-[420px]" />
          <p className="type-body mt-5">It is furniture meant to stay.</p>
        </div>
      </section>
    </>
  );
}
