import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/types";

/**
 * Journal index entry. Phones stack the photograph above the copy, tablets pair
 * entries two-up, and desktop spreads title, photograph and excerpt across a row.
 */
export function ArticleRow({ article, priority }: { article: Article; priority?: boolean }) {
  return (
    <article className="py-10 tablet:py-2 desktop:py-10">
      <Link
        href={`/blog/${article.slug}`}
        className="group grid grid-cols-1 gap-5 desktop:grid-cols-[1fr_1fr_340px]"
      >
        <div className="order-2 -mt-2.5 flex flex-col desktop:order-1 desktop:mt-0 desktop:justify-between">
          <h2 className="type-lead text-foreground">{article.title}</h2>
          <span className="type-nav mt-5 hidden text-muted transition-colors duration-300 group-hover:text-foreground desktop:inline">
            Read more →
          </span>
        </div>
        <div className="relative order-1 aspect-[510/340] overflow-hidden rounded-lg bg-[#e7e3dc] desktop:order-2">
          <Image
            src={article.image}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1200px) 36vw, (min-width: 810px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-quiet group-hover:scale-[1.02]"
          />
        </div>
        <div className="relative order-3 -mt-2.5 flex flex-col desktop:mt-0">
          <p className="type-body max-w-[500px] text-muted desktop:max-w-none">{article.excerpt}</p>
          <p className="mt-5 flex items-baseline gap-[5px] desktop:absolute desktop:left-0 desktop:top-[239px] desktop:mt-0">
            <span className="type-nav text-foreground">Category:</span>
            <span className="type-body text-muted">{article.category}</span>
          </p>
          <span className="type-nav mt-10 text-muted transition-colors duration-300 group-hover:text-foreground desktop:hidden">
            Read more →
          </span>
        </div>
      </Link>
    </article>
  );
}
