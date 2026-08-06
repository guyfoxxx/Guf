import { InvoiceForm } from "@/components/admin/InvoiceForm";

export default function NewInvoicePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy">صدور فاکتور جدید</h1>
      <p className="text-sm text-graphite/60 mt-1">
        اطلاعات مشتری و جزئیات خدمت انجام‌شده را وارد کنید
      </p>
      <div className="mt-6">
        <InvoiceForm />
      </div>
    </div>
  );
}
