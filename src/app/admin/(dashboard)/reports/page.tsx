import { prisma } from "@/lib/prisma";
import { formatToman, STATUS_LABELS } from "@/lib/utils";

export default async function AdminReportsPage() {
  const [byStatus, bySer, revenue] = await Promise.all([
    prisma.serviceRequest.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.serviceRequest.groupBy({ by: ["serviceId"], _count: { _all: true } }),
    prisma.invoice.aggregate({ _sum: { totalAmount: true, paidAmount: true, remainingAmount: true } }),
  ]).catch(() => [[], [], { _sum: { totalAmount: 0, paidAmount: 0, remainingAmount: 0 } }] as const);

  const services = await prisma.service.findMany().catch(() => []);
  const serviceMap = new Map(services.map((s) => [s.id, s.title]));

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">گزارش‌ها</h1>
        <p className="text-sm text-graphite/60 mt-1">نمای تحلیلی از درخواست‌ها و درآمد کسب‌وکار</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl2 bg-white border border-slate-200 p-5">
          <p className="text-xs text-graphite/60">مجموع فاکتورها</p>
          <p className="mt-2 font-display text-xl font-bold text-navy">
            {formatToman(revenue._sum.totalAmount ?? 0)}
          </p>
        </div>
        <div className="rounded-xl2 bg-white border border-slate-200 p-5">
          <p className="text-xs text-graphite/60">وصول‌شده</p>
          <p className="mt-2 font-display text-xl font-bold text-success">
            {formatToman(revenue._sum.paidAmount ?? 0)}
          </p>
        </div>
        <div className="rounded-xl2 bg-white border border-slate-200 p-5">
          <p className="text-xs text-graphite/60">باقی‌مانده</p>
          <p className="mt-2 font-display text-xl font-bold text-red-500">
            {formatToman(revenue._sum.remainingAmount ?? 0)}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl2 bg-white border border-slate-200 p-5">
          <h2 className="font-semibold text-navy mb-4">درخواست‌ها بر اساس وضعیت</h2>
          {byStatus.length === 0 && <p className="text-sm text-graphite/50">داده‌ای موجود نیست.</p>}
          <div className="space-y-3">
            {byStatus.map((row) => (
              <div key={row.status} className="flex items-center justify-between text-sm">
                <span className="text-graphite/70">{STATUS_LABELS[row.status]}</span>
                <span className="font-semibold text-navy">{row._count._all}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl2 bg-white border border-slate-200 p-5">
          <h2 className="font-semibold text-navy mb-4">پرتقاضاترین خدمات</h2>
          {bySer.length === 0 && <p className="text-sm text-graphite/50">داده‌ای موجود نیست.</p>}
          <div className="space-y-3">
            {bySer.map((row) => (
              <div key={row.serviceId ?? "unknown"} className="flex items-center justify-between text-sm">
                <span className="text-graphite/70">
                  {row.serviceId ? serviceMap.get(row.serviceId) ?? "نامشخص" : "نامشخص"}
                </span>
                <span className="font-semibold text-navy">{row._count._all}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
