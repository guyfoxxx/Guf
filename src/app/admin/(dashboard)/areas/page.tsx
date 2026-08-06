import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function AdminAreasPage() {
  const areas = await prisma.area
    .findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { customers: true, requests: true, employees: true } } },
    })
    .catch(() => []);

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">مناطق تحت پوشش</h1>
        <p className="text-sm text-graphite/60 mt-1">
          صفحات سئوی شهری و پوشش جغرافیایی خدمات
        </p>
      </div>

      {areas.length === 0 && (
        <div className="mt-6 rounded-xl2 border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-graphite/60">
          هنوز منطقه‌ای ثبت نشده است. دستور{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">npm run db:seed</code>{" "}
          را اجرا کنید.
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((a) => (
          <div key={a.id} className="rounded-xl2 bg-white border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-navy">{a.name}</h3>
              <Link href={`/areas/${a.slug}`} target="_blank" className="text-graphite/40 hover:text-water">
                <ExternalLink className="size-4" />
              </Link>
            </div>
            <p className="text-xs text-graphite/50 mt-1">استان {a.province}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-graphite/60">
              <span>{a._count.customers} مشتری</span>
              <span>{a._count.requests} درخواست</span>
              <span>{a._count.employees} تکنسین</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
