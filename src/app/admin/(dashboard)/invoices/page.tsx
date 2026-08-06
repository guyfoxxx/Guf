import { prisma } from "@/lib/prisma";
import { toJalali } from "@/lib/jalali";
import { formatToman, PAYMENT_STATUS_LABELS } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";

export default async function AdminInvoicesPage() {
  const invoices = await prisma.invoice
    .findMany({
      orderBy: { issuedAt: "desc" },
      take: 200,
      include: { customer: true },
    })
    .catch(() => []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">فاکتورها</h1>
          <p className="text-sm text-graphite/60 mt-1">صدور و پیگیری فاکتورهای خدمات</p>
        </div>
        <LinkButton href="/admin/invoices/new" size="sm">
          فاکتور جدید
        </LinkButton>
      </div>

      <div className="mt-6 rounded-xl2 bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-graphite/60 border-b border-slate-100">
                <th className="p-4">شماره فاکتور</th>
                <th className="p-4">مشتری</th>
                <th className="p-4">مبلغ کل</th>
                <th className="p-4">پرداخت‌شده</th>
                <th className="p-4">باقی‌مانده</th>
                <th className="p-4">وضعیت پرداخت</th>
                <th className="p-4">تاریخ صدور</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-graphite/50">
                    هنوز فاکتوری صادر نشده است.
                  </td>
                </tr>
              )}
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-slate-50">
                  <td className="p-4 font-mono text-xs">{inv.number}</td>
                  <td className="p-4 font-medium text-navy">{inv.customer.name}</td>
                  <td className="p-4">{formatToman(inv.totalAmount)}</td>
                  <td className="p-4 text-success">{formatToman(inv.paidAmount)}</td>
                  <td className="p-4 text-red-500">{formatToman(inv.remainingAmount)}</td>
                  <td className="p-4">
                    <Badge
                      status={inv.paymentStatus}
                      label={PAYMENT_STATUS_LABELS[inv.paymentStatus]}
                    />
                  </td>
                  <td className="p-4 text-graphite/60 text-xs">{toJalali(inv.issuedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
