import type { Metadata } from "next";
import { LookbookGallery } from "@/components/lookbook/LookbookGallery";
import { PageHeading } from "@/components/ui/PageHeading";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "Arlow pieces styled in real homes and in the workshop.",
};

export default function LookbookPage() {
  return (
    <>
      <PageHeading title="Gallery" />
      <section aria-label="Lookbook" className="px-5 pb-20 pt-[60px] tablet:pt-20">
        <LookbookGallery />
      </section>
    </>
  );
}
