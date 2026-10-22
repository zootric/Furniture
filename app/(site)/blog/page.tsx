import type { Metadata } from "next";
import { ArticleRow } from "@/components/blog/ArticleRow";
import { PageHeading } from "@/components/ui/PageHeading";
import { Reveal } from "@/components/ui/Reveal";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Journal",
  description: "Material studies, process insights, studio updates.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeading
        title="Journal"
        intro="Material studies, process insights, studio updates."
      />
      {/* Rules separate rows: one entry per row on phones and desktop, two on tablets. */}
      <div className="frame px-5 pb-20">
        <ul className="grid grid-cols-1 border-b border-border tablet:grid-cols-2 tablet:items-center tablet:gap-x-5 desktop:grid-cols-1">
          {articles.map((article, i) => (
            <li
              key={article.slug}
              className={`relative ${i > 0 ? "-mt-px border-t border-border" : ""} ${
                i === 1 ? "tablet:border-t-0 desktop:border-t" : ""
              } tablet:odd:before:absolute tablet:odd:before:-right-5 tablet:odd:before:top-[-1px] tablet:odd:before:h-px tablet:odd:before:w-5 tablet:odd:before:bg-border desktop:odd:before:hidden ${
                i === 0 ? "tablet:before:hidden" : ""
              }`}
            >
              <Reveal>
                <ArticleRow article={article} priority={i === 0} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
