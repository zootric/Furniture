import Link from "next/link";
import { contactEmail } from "@/data/site";

/**
 * The reference shows a "Cart" control on phones but it has no action behind it.
 * Arlow pieces are made to order, so the panel explains that and points to enquiries.
 */
export function CartPanel({ onClose }: { onClose: () => void }) {
  return (
    <div id="cart-panel" role="region" aria-label="Cart" className="pb-10 pt-6 text-center text-cream">
      <p className="type-label">Your cart is empty</p>
      <p className="type-body mx-auto mt-3 max-w-[300px] text-cream-muted">
        Every piece is made to order. Contact the studio to confirm availability and lead time.
      </p>
      <div className="mt-6 flex flex-col items-center gap-3">
        <Link href="/shop" onClick={onClose} className="type-label inline-flex items-center gap-2">
          Browse the shop <span aria-hidden="true">↗</span>
        </Link>
        <a href={`mailto:${contactEmail}`} className="type-small text-cream-muted underline underline-offset-4">
          {contactEmail}
        </a>
      </div>
    </div>
  );
}
