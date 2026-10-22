export const contactEmail = "hello@arlowstudio.com";

export type NavLink = { label: string; href: string };

// The reference header points "Blog" at the first article rather than the index;
// this build sends it to the Journal index so every post is reachable.
export const headerNavLeft: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
];

export const headerNavRight: NavLink[] = [
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export const footerNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Lookbook", href: "/lookbook" },
];

export const materials = [
  {
    name: "Oak",
    lines: [
      "Kiln-dried, slow-grown European oak.",
      "Grain visible. Knots embraced.",
    ],
    image: "/images/materials/oak.png",
  },
  {
    name: "Steel",
    lines: [
      "Powder-coated in muted finishes.",
      "Structured. Precise. Durable.",
    ],
    image: "/images/materials/steel.png",
  },
  {
    name: "Linen",
    lines: ["Undyed. Textured. Meant to soften over time."],
    image: "/images/materials/linen.png",
  },
];

/** Shop order slugs featured in Collection 01 — Quiet Forms on the home page. */
export const quietFormsSlugs = [
  "vale-bench",
  "soren-dining-table",
  "alder-chair",
];

/** The reference shows the first three catalogue pieces under "You might also like". */
export const relatedProductSlugs = [
  "oren-mirror",
  "brant-pedestal",
  "noma-tray",
];

export const relatedArticleSlugs = [
  "on-quiet-forms",
  "soft-structure",
  "still-objects",
];
