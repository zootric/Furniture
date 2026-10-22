import type { LookbookCategory, LookbookEntry } from "./types";

export const lookbookCategories: ("All" | LookbookCategory)[] = [
  "All",
  "Dining",
  "Living",
  "Entryway",
  "Workshop",
];

export const lookbook: LookbookEntry[] = [
  {
    title: "The Sunday Table",
    category: "Dining",
    image: "/images/lookbook/the-sunday-table.jpg",
  },
  {
    title: "Long Table, Low Light",
    category: "Dining",
    image: "/images/lookbook/long-table-low-light.jpg",
  },
  {
    title: "Morning in the Dining Room",
    category: "Dining",
    image: "/images/lookbook/morning-in-the-dining-room.jpg",
  },
  {
    title: "Wood and Afternoon Light",
    category: "Living",
    image: "/images/lookbook/wood-and-afternoon-light.jpg",
  },
  {
    title: "The Reading Corner",
    category: "Living",
    image: "/images/lookbook/the-reading-corner.jpg",
  },
  {
    title: "A Quiet Living Room",
    category: "Living",
    image: "/images/lookbook/a-quiet-living-room.jpg",
  },
  {
    title: "Hallway, Mirror and Console",
    category: "Entryway",
    image: "/images/lookbook/hallway-mirror-and-console.jpg",
  },
  {
    title: "Reflected Light",
    category: "Entryway",
    image: "/images/lookbook/reflected-light.jpg",
  },
  {
    title: "Marking Out",
    category: "Workshop",
    image: "/images/lookbook/marking-out.jpg",
  },
  {
    title: "By Hand",
    category: "Workshop",
    image: "/images/lookbook/by-hand.jpg",
  },
];
