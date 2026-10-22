import Image from "next/image";
import { BlurText } from "./BlurText";

type SplitHeroProps = {
  image: string;
  alt: string;
  title: string;
  left: React.ReactNode;
  right: React.ReactNode;
  /** Which copy block sits at the top of the screen on phones. */
  phoneTop: "left" | "right";
  /** Vertical alignment of the two copy blocks on wider screens. */
  align?: "center" | "start";
  /** Opacity of the charcoal veil laid over the photograph. */
  overlay?: number;
};

/**
 * Full-viewport photograph with copy at either edge and a large display title at
 * the bottom-left. Used by the home and contact pages.
 */
export function SplitHero({ image, alt, title, left, right, phoneTop, align = "center", overlay = 0.5 }: SplitHeroProps) {
  const top = phoneTop === "left" ? left : right;
  const bottom = phoneTop === "left" ? right : left;

  return (
    <section className="relative h-svh min-h-[640px] overflow-hidden bg-[#2a2a29] text-cream">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-foreground" style={{ opacity: overlay }} />
      <div className="frame absolute inset-0 flex flex-col justify-between px-2.5 pb-10 pt-20 tablet:justify-end tablet:px-5">
        <div className={`tablet:hidden ${phoneTop === "left" ? "mt-[max(0px,calc(100svh-797px))]" : ""}`}>{top}</div>
        <div>
          <div className="tablet:hidden">{bottom}</div>
          <div
            className={`hidden justify-between tablet:flex ${align === "center" ? "items-center" : "items-start"}`}
          >
            {left}
            {right}
          </div>
          <BlurText
            as="h1"
            text={title}
            className={`type-display tablet:mt-[190px] ${phoneTop === "left" ? "mt-5" : "mt-[34px]"}`}
          />
        </div>
      </div>
    </section>
  );
}
