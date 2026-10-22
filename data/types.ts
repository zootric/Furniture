export type Dimension = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  price: string;
  collection: string;
  /** Hero image shown on the shop grid and detail page. */
  image: string;
  /** Secondary images shown in the detail-page gallery strip. */
  gallery: string[];
  description: string[];
  dimensions: Dimension[];
  materials: string[];
  leadTime: string;
  /** Portion of `leadTime` rendered in bold. */
  leadTimeHighlight: string;
  care: string;
};

export type InlineText = { text: string; bold?: boolean };

export type ArticleBlock =
  | { type: "paragraph" | "quote" | "h2" | "h3"; content: InlineText[] }
  | { type: "list"; items: InlineText[][] }
  | { type: "image"; src: string; alt: string; width: number; height: number };

export type Author = { name: string; role: string; avatar: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: Author;
  image: string;
  body: ArticleBlock[];
};

export type LookbookCategory = "Dining" | "Living" | "Entryway" | "Workshop";

export type LookbookEntry = {
  title: string;
  category: LookbookCategory;
  image: string;
};
