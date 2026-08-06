import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Tag } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { blogPosts } from "@/lib/blog-data";
import { toJalali } from "@/lib/jalali";

export const metadata: Metadata = {
  title: "بلاگ ره گشا",
  description: "مقالات آموزشی درباره لوله بازکنی، تخلیه چاه، هزینه‌ها و نگهداری سیستم فاضلاب ساختمان.",
};

export default function BlogPage() {
  return (
    <Section className="pt-12">
      <SectionHeading eyebrow="بلاگ" title="مقالات آموزشی ره گشا" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-xl2 border border-slate-200 bg-white p-6 hover:shadow-soft hover:-translate-y-1 transition-all"
          >
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-water">
              <Tag className="size-3.5" /> {post.category}
            </span>
            <h2 className="mt-3 font-display text-lg font-bold text-navy">{post.title}</h2>
            <p className="mt-2 text-sm text-graphite/80 leading-6">{post.excerpt}</p>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-graphite/50">
              <CalendarDays className="size-3.5" />
              {toJalali(new Date(post.publishedAt))}
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
