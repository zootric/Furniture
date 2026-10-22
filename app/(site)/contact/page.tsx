import type { Metadata } from "next";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SplitHero } from "@/components/ui/SplitHero";
import { contactEmail } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "For inquiries, custom projects, or trade partnerships, write to hello@arlowstudio.com.",
};

export default function ContactPage() {
  return (
    <SplitHero
      image="/images/contact/hero.png"
      alt="A man in a dark suit holding a corded telephone receiver"
      title="Contact Us"
      phoneTop="left"
      align="start"
      overlay={0.7}
      left={
        <div className="w-[258px]">
          <p className="type-body text-cream-muted">
            We’re based in a small workshop and studio. For inquiries, custom projects, or trade partnerships:
          </p>
          <ArrowLink href={`mailto:${contactEmail}`} className="mt-5">
            {contactEmail}
          </ArrowLink>
        </div>
      }
      right={
        <p className="type-body w-[275px] text-cream-muted tablet:text-justify">
          We typically reply within two business days. No automated replies.
        </p>
      }
    />
  );
}
