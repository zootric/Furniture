import Image from "next/image";
import type { ArticleBlock, InlineText } from "@/data/types";

function Inline({ content }: { content: InlineText[] }) {
  return (
    <>
      {content.map((part, i) =>
        part.bold ? (
          <strong key={i} className="font-bold">
            {part.text}
          </strong>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}

/**
 * Spacing follows the reference rich text: paragraphs sit 20px apart, headings open
 * 40px of space, while sub-headings, pull quotes and lists run straight on.
 */
function spacing(block: ArticleBlock, previous: ArticleBlock | undefined) {
  if (!previous) return "";
  switch (block.type) {
    case "h2":
    case "image":
      return "mt-10";
    case "h3":
    case "quote":
    case "list":
      return previous.type === "image" ? "mt-10" : "";
    default:
      return previous.type === "image" ? "mt-10" : "mt-5";
  }
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="type-body text-foreground">
      {blocks.map((block, i) => {
        const className = spacing(block, blocks[i - 1]);
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className={className}>
                <Inline content={block.content} />
              </p>
            );
          case "quote":
            return (
              <blockquote key={i} className={className}>
                <p>
                  <Inline content={block.content} />
                </p>
              </blockquote>
            );
          case "h2":
            return (
              <h2 key={i} className={`text-[28px] font-light leading-[1.2] tracking-[-0.04em] tablet:text-[32px] desktop:text-[40px] ${className}`}>
                <Inline content={block.content} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className={`text-[16px] leading-[1.3] tracking-normal ${className}`}>
                <Inline content={block.content} />
              </h3>
            );
          case "list":
            return (
              <ul key={i} className={`list-disc pl-5 ${className}`}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Inline content={item} />
                  </li>
                ))}
              </ul>
            );
          case "image":
            return (
              <Image
                key={i}
                src={block.src}
                alt={block.alt}
                width={block.width}
                height={block.height}
                sizes="(min-width: 840px) 800px, 100vw"
                className={`h-auto w-full rounded-lg ${className}`}
              />
            );
        }
      })}
    </div>
  );
}
