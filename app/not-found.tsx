import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLink } from "@/components/ui/ArrowLink";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  const intro = (
    <div className="w-[258px] shrink-0">
      <p className="type-body text-cream-muted">We couldn’t find that page.</p>
      <div className="mt-5 flex flex-col items-start gap-3.5">
        <ArrowLink href="/">Return to Home</ArrowLink>
        <ArrowLink href="/shop">Explore Collection</ArrowLink>
      </div>
    </div>
  );
  const note = (
    <p className="type-body text-cream-muted tablet:w-[275px] tablet:text-justify">
      It may have been moved, renamed, or quietly retired. Let’s bring you back to something that belongs.
    </p>
  );

  return (
    <main className="relative h-svh min-h-[560px] overflow-hidden bg-[#1e2a29] text-cream">
      <Image src="/images/not-found/hero.png" alt="" fill priority sizes="100vw" className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-foreground/70" />
      <div className="absolute inset-0 hidden items-center px-5 pt-10 desktop:flex">
        {intro}
        <p aria-hidden="true" className="ml-5 text-[290px] leading-[1.2] tracking-[-0.04em]">
          404
        </p>
        <div className="ml-auto">{note}</div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-end gap-5 px-2.5 pb-10 tablet:px-5 desktop:hidden">
        {intro}
        {note}
        <p aria-hidden="true" className="text-[186px] leading-[1.2] tracking-[-0.04em] tablet:text-[232px]">
          404
        </p>
      </div>
      <h1 className="sr-only">404 — Page not found</h1>
    </main>
  );
}
