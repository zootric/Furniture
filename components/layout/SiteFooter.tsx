import Image from "next/image";
import Link from "next/link";
import { footerNav } from "@/data/site";
import { NewsletterForm } from "./NewsletterForm";

export function SiteFooter() {
  return (
    <footer className="bg-footer-background px-2.5 pb-5 pt-10 text-cream tablet:px-5 desktop:pt-20">
      <div className="flex flex-col gap-10 tablet:gap-14 desktop:flex-row-reverse desktop:justify-between">
        <div className="flex w-full flex-col gap-5 desktop:max-w-[570px] desktop:gap-[46px]">
          <nav aria-label="Footer">
            <ul className="flex items-center justify-between">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="type-nav inline-block p-0.5 transition-opacity duration-300 hover:opacity-60">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="relative aspect-[570/350] w-full overflow-hidden rounded tablet:rounded-lg">
            <Image
              src="/images/footer/newsletter.jpg"
              alt="A person seated on a tan leather sofa beneath a single pendant light"
              fill
              sizes="(min-width: 1200px) 570px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Phone: newsletter sits right-aligned above the copyright. Tablet: side by side. Desktop: a column. */}
        <div className="flex w-full flex-col tablet:flex-row tablet:items-end tablet:justify-between desktop:max-w-[373px] desktop:flex-col desktop:items-stretch desktop:justify-start">
          <div className="ml-auto w-full max-w-[373px] tablet:ml-0">
            <h2 className="type-subsection text-surface">Subscribe to Our Newsletter</h2>
            <p className="mt-5 text-[16px] leading-[1.2] text-cream-muted">
              Join quietly, We send notes when new pieces are released. Nothing weekly. Nothing automated.
            </p>
            <NewsletterForm />
          </div>
          <p className="type-small mt-10 text-cream-muted tablet:mt-0 desktop:mt-auto">@2026 ARLOW</p>
        </div>
      </div>

      <div className="relative mt-2.5 aspect-[1400/255] w-full tablet:mt-14">
        <Image src="/images/brand/wordmark.svg" alt="ARLOW®" fill sizes="100vw" className="object-contain" unoptimized />
      </div>
    </footer>
  );
}
