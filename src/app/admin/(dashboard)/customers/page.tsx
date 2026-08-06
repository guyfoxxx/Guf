import { prisma } from "@/lib/prisma";
import { toJalali } from "@/lib/jalali";
import { Phone, MapPin } from "lucide-react";

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { _count: { select: { requests: true, invoices: true } } },
  }).catch(() => []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">مشتریان</h1>
          <p className="text-sm text-graphite/60 mt-1">لیست کامل مشتریان ثبت‌شده</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl2 bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-graphite/60 border-b border-slate-100">
                <th className="p-4">نام</th>
                <th className="p-4">تماس</th>
                <th className="p-4">آدرس</th>
                <th className="p-4">درخواست‌ها</th>
                <th className="p-4">فاکتورها</th>
                <th className="p-4">تاریخ ثبت</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 && (
                <tr><td colSpan={6} className="p-6 text-center text-graphite/50">هیچ مشتری‌ای ثبت نشده است.</td></tr>
              )}
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-slate-50">
                  <td className="p-4 font-medium text-navy">{c.name}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1.5 text-graphite/80">
                      <Phone className="size-3.5" /> {c.phone}
                    </span>
                  </td>
                  <td className="p-4 text-graphite/70 max-w-xs truncate">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 shrink-0" /> {c.address}
                    </span>
                  </td>
                  <td className="p-4">{c._count.requests}</td>
                  <td className="p-4">{c._count.invoices}</td>
                  <td className="p-4 text-graphite/60">{toJalali(c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
