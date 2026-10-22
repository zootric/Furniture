import Link from "next/link";

type RollLinkProps = {
  href: string;
  children: string;
  className?: string;
  /** Classes for the resting label; the revealed copy always uses `hoverClassName`. */
  restClassName?: string;
  hoverClassName?: string;
  current?: boolean;
  onClick?: () => void;
};

/**
 * Text link whose label rolls upward on hover to reveal a duplicate in the
 * hover colour, mirroring the Framer navigation effect on the reference.
 */
export function RollLink({
  href,
  children,
  className = "",
  restClassName = "",
  hoverClassName = "",
  current,
  onClick,
}: RollLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className={`group relative inline-flex p-0.5 type-nav ${className}`}
    >
      <span className="relative block overflow-hidden">
        <span
          className={`block transition-transform duration-500 ease-quiet group-hover:-translate-y-full group-focus-visible:-translate-y-full ${restClassName}`}
        >
          {children}
        </span>
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 top-full block transition-transform duration-500 ease-quiet group-hover:-translate-y-full group-focus-visible:-translate-y-full ${hoverClassName}`}
        >
          {children}
        </span>
      </span>
    </Link>
  );
}
