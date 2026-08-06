import { prisma } from "@/lib/prisma";
import { Phone } from "lucide-react";

export default async function AdminEmployeesPage() {
  const employees = await prisma.employee
    .findMany({
      orderBy: { createdAt: "desc" },
      include: { area: true, _count: { select: { assignedJobs: true } } },
    })
    .catch(() => []);

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">کارکنان</h1>
        <p className="text-sm text-graphite/60 mt-1">تکنسین‌ها و اپراتورهای فعال در تیم</p>
      </div>

      <div className="mt-6 rounded-xl2 bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-graphite/60 border-b border-slate-100">
                <th className="p-4">نام</th>
                <th className="p-4">نقش</th>
                <th className="p-4">مهارت‌ها</th>
                <th className="p-4">منطقه</th>
                <th className="p-4">تماس</th>
                <th className="p-4">کارهای واگذارشده</th>
                <th className="p-4">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-graphite/50">
                    هنوز کارمندی ثبت نشده است.
                  </td>
                </tr>
              )}
              {employees.map((e) => (
                <tr key={e.id} className="border-b border-slate-50">
                  <td className="p-4 font-medium text-navy">{e.name}</td>
                  <td className="p-4 text-graphite/70">{e.role}</td>
                  <td className="p-4 text-graphite/60 text-xs">{e.skills.join("، ") || "—"}</td>
                  <td className="p-4 text-graphite/70">{e.area?.name ?? "—"}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1.5 text-graphite/80">
                      <Phone className="size-3.5" /> {e.phone}
                    </span>
                  </td>
                  <td className="p-4">{e._count.assignedJobs}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        e.isActive ? "bg-green-100 text-success" : "bg-slate-100 text-graphite/60"
                      }`}
                    >
                      {e.isActive ? "فعال" : "غیرفعال"}
                    </span>
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
