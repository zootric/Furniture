import { MediaCard } from "@/components/ui/MediaCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Article } from "@/data/types";

export function RelatedArticles({ articles }: { articles: Article[] }) {
  return (
    <section aria-labelledby="related-articles-heading" className="frame px-5">
      <hr className="rule" />
      <h2 id="related-articles-heading" className="type-section mt-10 text-muted tablet:mt-14">
        You might also like
      </h2>
      <ul className="mt-8 grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
        {articles.map((article, i) => (
          <Reveal as="li" key={article.slug} className={i === 2 ? "tablet:max-desktop:hidden" : ""}>
            <MediaCard
              href={`/blog/${article.slug}`}
              image={article.image}
              alt=""
              title={article.title}
              description={article.excerpt}
              staticLabel
              className="h-[450px]"
              sizes="(min-width: 810px) 33vw, 100vw"
            />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
