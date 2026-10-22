import Link from "next/link";

export function BrandLogo({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`inline-block p-0.5 font-display text-[24px] leading-[1.2] uppercase ${className}`}
      aria-label="Arlow — home"
    >
      Arlow
    </Link>
  );
}
