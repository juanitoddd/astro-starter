import type { Block } from "./block";

export type SectionCollection = "block" // | "grid" | "hero" | "slider";

export type PageSectionItem =
  | { collection: "block"; item: Block }  

export type PageSection = PageSectionItem & {
  id: number;
  sort: number | null;
};

export type Page = {
  id: number;
  slug: string;
  sections?: PageSection[] | null;
};
