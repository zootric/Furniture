import { BlurText } from "./BlurText";

type PageHeadingProps = {
  title: string;
  intro?: string;
  className?: string;
};

/** Large letter-spaced page title, optional one-line intro, and closing rule. */
export function PageHeading({ title, intro, className = "" }: PageHeadingProps) {
  return (
    <div className={`frame px-5 pt-[var(--page-top)] ${className}`}>
      <BlurText as="h1" text={title} className="type-display" />
      {intro && <p className="type-body mt-3 text-muted">{intro}</p>}
      <hr className="rule mt-5 tablet:mt-10" />
    </div>
  );
}
