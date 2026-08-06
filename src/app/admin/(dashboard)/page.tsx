import { prisma } from "@/lib/prisma";
import { formatToman, STATUS_LABELS } from "@/lib/utils";
import { toJalali } from "@/lib/jalali";
import { Users, ClipboardList, Receipt, Wallet } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [customerCount, openRequests, unpaidInvoices, monthRevenue, recentRequests] =
    await Promise.all([
      prisma.customer.count(),
      prisma.serviceRequest.count({ where: { status: { in: ["NEW", "CONTACTED", "ASSIGNED", "WORKING"] } } }),
      prisma.invoice.count({ where: { paymentStatus: { not: "PAID" } } }),
      prisma.invoice.aggregate({
        _sum: { paidAmount: true },
        where: { issuedAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } },
      }),
      prisma.serviceRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        include: { service: true },
      }),
    ]).catch(() => [0, 0, 0, { _sum: { paidAmount: 0 } }, []] as const);

  const stats = [
    { label: "کل مشتریان", value: customerCount, icon: Users, color: "text-water" },
    { label: "درخواست‌های باز", value: openRequests, icon: ClipboardList, color: "text-emergency" },
    { label: "فاکتورهای معوق", value: unpaidInvoices, icon: Receipt, color: "text-red-500" },
    { label: "درآمد این ماه", value: formatToman(monthRevenue._sum.paidAmount ?? 0), icon: Wallet, color: "text-success" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy">داشبورد</h1>
      <p className="text-sm text-graphite/60 mt-1">نمای کلی از وضعیت کسب‌وکار</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl2 bg-white border border-slate-200 p-5">
            <s.icon className={`size-6 ${s.color}`} />
            <div className="mt-3 font-display text-xl font-bold text-navy">{s.value}</div>
            <div className="text-xs text-graphite/60 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl2 bg-white border border-slate-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-semibold text-navy">آخرین درخواست‌ها</h2>
          <Link href="/admin/requests" className="text-sm text-water">مشاهده همه</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-graphite/60 border-b border-slate-100">
                <th className="p-4">کد</th>
                <th className="p-4">مشتری</th>
                <th className="p-4">خدمت</th>
                <th className="p-4">وضعیت</th>
                <th className="p-4">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-graphite/50">
                    هنوز درخواستی ثبت نشده است.
                  </td>
                </tr>
              )}
              {recentRequests.map((r) => (
                <tr key={r.id} className="border-b border-slate-50">
                  <td className="p-4 font-mono">{r.code}</td>
                  <td className="p-4">{r.name}</td>
                  <td className="p-4">{r.service?.title ?? "—"}</td>
                  <td className="p-4">{STATUS_LABELS[r.status]}</td>
                  <td className="p-4 text-graphite/60">{toJalali(r.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
