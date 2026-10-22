import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  /** "text" is the bare uppercase link; "button" is the filled taupe pill. */
  variant?: "text" | "button";
  className?: string;
  external?: boolean;
};

export function ArrowLink({ href, children, variant = "text", className = "", external }: ArrowLinkProps) {
  const base =
    variant === "button"
      ? "type-label inline-flex items-center gap-3 rounded-lg bg-accent px-6 py-[11px] text-surface transition-opacity duration-300 hover:opacity-85"
      : "type-label group inline-flex items-center gap-2 p-0.5 text-surface";
  const content = (
    <>
      <span>{children}</span>
      <ArrowIcon className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </>
  );

  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={`${base} ${className}`} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${className}`}>
      {content}
    </Link>
  );
}
