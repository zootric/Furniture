import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { BlurText } from "@/components/ui/BlurText";
import { articles, getArticle } from "@/data/articles";
import { relatedArticleSlugs } from "@/data/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return articles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { type: "article", images: [article.image] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const related = relatedArticleSlugs.map((slug) => getArticle(slug)).filter((a) => a !== undefined);

  return (
    <>
      <article>
        <header className="frame px-5 pt-[var(--page-top)]">
          <p className="type-body flex gap-[5px]">
            <span>Category:</span>
            <span className="text-muted">{article.category}</span>
          </p>
          <BlurText as="h1" text={article.title} className="type-display mt-3" />
          <p className="type-body mt-3 text-muted">{article.excerpt}</p>
          <hr className="rule mt-10" />
        </header>

        <div className="mx-auto max-w-[840px] px-5 pt-5 tablet:pt-10">
          <div className="flex items-center gap-2.5">
            <Image
              src={article.author.avatar}
              alt=""
              width={100}
              height={100}
              className="size-[100px] rounded-lg object-cover"
            />
            <div>
              <p className="text-[20px] leading-[1.4] tracking-[-0.02em] tablet:text-[24px]">{article.author.name}</p>
              <p className="type-copy mt-2.5 text-muted">{article.author.role}</p>
            </div>
          </div>
          <div className="mt-10">
            <ArticleBody blocks={article.body} />
          </div>
        </div>
      </article>

      <div className="mt-20 pb-10 tablet:mt-40 tablet:pb-20">
        <RelatedArticles articles={related} />
      </div>
    </>
  );
}
