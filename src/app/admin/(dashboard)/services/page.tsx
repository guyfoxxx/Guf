import { prisma } from "@/lib/prisma";
import { formatToman } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function AdminServicesPage() {
  const items = await prisma.service
    .findMany({ orderBy: { order: "asc" }, include: { _count: { select: { requests: true } } } })
    .catch(() => []);

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">خدمات</h1>
        <p className="text-sm text-graphite/60 mt-1">
          مدیریت خدمات، بازه قیمتی و محتوای سئوی هر صفحه خدمت
        </p>
      </div>

      {items.length === 0 && (
        <div className="mt-6 rounded-xl2 border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-graphite/60">
          هنوز خدمتی در پایگاه‌داده ثبت نشده است. برای بارگذاری خدمات پیش‌فرض دستور{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">npm run db:seed</code>{" "}
          را اجرا کنید.
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <div key={s.id} className="rounded-xl2 bg-white border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-navy">{s.title}</h3>
              <Link href={`/services/${s.slug}`} target="_blank" className="text-graphite/40 hover:text-water">
                <ExternalLink className="size-4" />
              </Link>
            </div>
            <p className="mt-2 text-sm text-graphite/70 line-clamp-2">{s.shortDesc}</p>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="font-medium text-water">
                {formatToman(s.priceMin)} تا {formatToman(s.priceMax)}
              </span>
              <span className="text-graphite/50">{s._count.requests} درخواست</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
