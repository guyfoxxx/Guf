import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { blogPosts, getPostBySlug } from "@/lib/blog-data";
import { toJalali } from "@/lib/jalali";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.seoTitle, description: post.seoDesc };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "ره گشا" },
  };

  return (
    <Section className="pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="mx-auto max-w-3xl">
        <span className="text-sm font-semibold text-water">{post.category}</span>
        <h1 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-navy">{post.title}</h1>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-graphite/50">
          <CalendarDays className="size-3.5" />
          {toJalali(new Date(post.publishedAt))}
        </div>
        <p className="mt-6 leading-8 text-graphite/90 whitespace-pre-line">{post.content}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="rounded-full bg-surface px-3 py-1 text-xs text-graphite/70">
              #{t}
            </span>
          ))}
        </div>
      </article>

      <div className="mx-auto max-w-3xl mt-12 border-t border-slate-200 pt-8">
        <h2 className="font-display font-bold text-navy mb-4">مقالات مرتبط</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} href={`/blog/${r.slug}`} className="text-sm font-medium text-navy hover:text-water">
              {r.title}
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
