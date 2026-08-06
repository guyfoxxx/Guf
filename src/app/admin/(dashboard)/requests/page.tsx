import { prisma } from "@/lib/prisma";
import { toJalaliDateTime } from "@/lib/jalali";
import { Badge } from "@/components/ui/Badge";
import { StatusUpdater } from "@/components/admin/StatusUpdater";
import { URGENCY_LABELS } from "@/lib/utils";
import { Phone } from "lucide-react";

export default async function AdminRequestsPage() {
  const requests = await prisma.serviceRequest
    .findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      include: { service: true, assignedEmployee: true },
    })
    .catch(() => []);

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">درخواست‌ها</h1>
        <p className="text-sm text-graphite/60 mt-1">
          مدیریت درخواست‌های خدمات ثبت‌شده توسط مشتریان و اپراتورها
        </p>
      </div>

      <div className="mt-6 rounded-xl2 bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-graphite/60 border-b border-slate-100">
                <th className="p-4">کد پیگیری</th>
                <th className="p-4">مشتری</th>
                <th className="p-4">خدمت</th>
                <th className="p-4">اولویت</th>
                <th className="p-4">تکنسین</th>
                <th className="p-4">وضعیت</th>
                <th className="p-4">تاریخ ثبت</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-graphite/50">
                    هنوز درخواستی ثبت نشده است.
                  </td>
                </tr>
              )}
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 align-middle">
                  <td className="p-4 font-mono text-xs">{r.code}</td>
                  <td className="p-4">
                    <div className="font-medium text-navy">{r.name}</div>
                    <div className="flex items-center gap-1 text-xs text-graphite/60 mt-0.5">
                      <Phone className="size-3" /> {r.phone}
                    </div>
                  </td>
                  <td className="p-4 text-graphite/80">{r.service?.title ?? "نامشخص"}</td>
                  <td className="p-4">
                    <Badge status={r.urgency} label={URGENCY_LABELS[r.urgency]} />
                  </td>
                  <td className="p-4 text-graphite/70">{r.assignedEmployee?.name ?? "—"}</td>
                  <td className="p-4">
                    <StatusUpdater id={r.id} status={r.status} />
                  </td>
                  <td className="p-4 text-graphite/60 text-xs">{toJalaliDateTime(r.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
