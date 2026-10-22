import Image from "next/image";
import Link from "next/link";

type MediaCardProps = {
  image: string;
  alt: string;
  title: string;
  description?: string;
  /** Extra classes for the description line (e.g. a narrower measure). */
  descriptionClassName?: string;
  /** Show the underlined "View" affordance at the right of the label. */
  showView?: boolean;
  /** Keep the label visible instead of revealing it on hover. */
  staticLabel?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
  sizes: string;
  priority?: boolean;
};

/**
 * Image-led card shared by the shop grid, collections, materials, galleries and
 * related content. On hover the photo blurs under a dim veil and a white label
 * rises from the bottom edge; on phones the label is always shown.
 */
export function MediaCard({
  image,
  alt,
  title,
  description,
  descriptionClassName = "max-w-[405px]",
  showView = false,
  staticLabel = false,
  href,
  onClick,
  className = "",
  sizes,
  priority,
}: MediaCardProps) {
  const interactive = Boolean(href || onClick);
  const reveal = interactive && !staticLabel;

  const body = (
    <>
      <Image src={image} alt={alt} fill sizes={sizes} loading={priority ? "eager" : undefined} className="object-cover" />
      {reveal && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[rgb(26_26_26/0.2)] opacity-0 backdrop-blur-[4px] transition-opacity duration-500 ease-quiet hover-reveal:group-hover:opacity-100 hover-reveal:group-focus-visible:opacity-100"
        />
      )}
      <span
        className={`absolute bottom-4 flex items-start justify-between gap-4 rounded bg-surface p-2 text-foreground transition-transform duration-500 ease-quiet ${
          showView ? "inset-x-4 tablet:inset-x-[5%]" : "inset-x-4"
        } ${
          reveal
            ? "hover-reveal:translate-y-[calc(100%+44px)] hover-reveal:group-hover:translate-y-0 hover-reveal:group-focus-visible:translate-y-0"
            : ""
        }`}
      >
        <span className="flex min-w-0 flex-col gap-2">
          <span className="type-label">{title}</span>
          {description && <span className={`type-small text-muted ${descriptionClassName}`}>{description}</span>}
        </span>
        {showView && (
          <span className="type-small shrink-0 border-b border-current pb-0.5 text-muted">View</span>
        )}
      </span>
    </>
  );

  const classes = `group relative block overflow-hidden rounded-lg bg-[#e7e3dc] ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {body}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${classes} w-full text-left`} aria-label={`Open ${title}`}>
        {body}
      </button>
    );
  }
  return <div className={classes}>{body}</div>;
}
