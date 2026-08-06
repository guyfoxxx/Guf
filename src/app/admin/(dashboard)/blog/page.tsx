import { prisma } from "@/lib/prisma";
import { toJalali } from "@/lib/jalali";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } }).catch(() => []);

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">بلاگ</h1>
        <p className="text-sm text-graphite/60 mt-1">مقالات آموزشی و محتوای سئوی وب‌سایت</p>
      </div>

      {posts.length === 0 && (
        <div className="mt-6 rounded-xl2 border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-graphite/60">
          هنوز مقاله‌ای منتشر نشده است. دستور{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">npm run db:seed</code>{" "}
          را اجرا کنید.
        </div>
      )}

      <div className="mt-6 rounded-xl2 bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-graphite/60 border-b border-slate-100">
                <th className="p-4">عنوان</th>
                <th className="p-4">دسته‌بندی</th>
                <th className="p-4">وضعیت</th>
                <th className="p-4">تاریخ انتشار</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-slate-50">
                  <td className="p-4 font-medium text-navy">{p.title}</td>
                  <td className="p-4 text-graphite/70">{p.category}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        p.published ? "bg-green-100 text-success" : "bg-slate-100 text-graphite/60"
                      }`}
                    >
                      {p.published ? "منتشرشده" : "پیش‌نویس"}
                    </span>
                  </td>
                  <td className="p-4 text-graphite/60 text-xs">{toJalali(p.publishedAt)}</td>
                  <td className="p-4">
                    <Link href={`/blog/${p.slug}`} target="_blank" className="text-graphite/40 hover:text-water">
                      <ExternalLink className="size-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
