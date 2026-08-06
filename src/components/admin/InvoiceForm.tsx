"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceCreateSchema, type InvoiceCreateInput } from "@/lib/schema";
import { Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus-visible:border-water";

export function InvoiceForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceCreateInput>({
    resolver: zodResolver(invoiceCreateSchema),
    defaultValues: { laborCost: 0, materialsCost: 0, discount: 0, warrantyDays: 30 },
  });

  const [labor, materials, discount] = watch(["laborCost", "materialsCost", "discount"]);
  const total = Math.max(0, (Number(labor) || 0) + (Number(materials) || 0) - (Number(discount) || 0));

  async function onSubmit(data: InvoiceCreateInput) {
    setError(null);
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setDone(json.number);
      router.refresh();
    } catch {
      setError("صدور فاکتور با خطا مواجه شد. اطلاعات را بررسی کنید.");
    }
  }

  if (done) {
    return (
      <div className="rounded-xl2 border border-success/30 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-success" />
        <h3 className="mt-4 font-display text-xl font-bold text-navy">فاکتور صادر شد</h3>
        <p className="mt-2 text-sm text-graphite/80">
          شماره فاکتور: <span className="font-bold text-navy">{done}</span>
        </p>
        <a href="/admin/invoices" className="mt-4 inline-block text-sm text-water">
          بازگشت به لیست فاکتورها
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl" noValidate>
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <AlertTriangle className="size-4" /> {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">نام مشتری</label>
          <input {...register("customerName")} className={inputClass} placeholder="نام و نام خانوادگی" />
          {errors.customerName && <p className="mt-1 text-xs text-red-600">{errors.customerName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">شماره موبایل</label>
          <input {...register("customerPhone")} className={inputClass} placeholder="09123456789" inputMode="numeric" />
          {errors.customerPhone && <p className="mt-1 text-xs text-red-600">{errors.customerPhone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">آدرس</label>
        <input {...register("customerAddress")} className={inputClass} placeholder="آدرس کامل محل خدمت" />
        {errors.customerAddress && <p className="mt-1 text-xs text-red-600">{errors.customerAddress.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">عنوان خدمت</label>
        <input {...register("serviceTitle")} className={inputClass} placeholder="مثلاً لوله بازکنی فاضلاب آشپزخانه" />
        {errors.serviceTitle && <p className="mt-1 text-xs text-red-600">{errors.serviceTitle.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">اجرت (تومان)</label>
          <input type="number" {...register("laborCost")} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">مصالح (تومان)</label>
          <input type="number" {...register("materialsCost")} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">تخفیف (تومان)</label>
          <input type="number" {...register("discount")} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">مدت ضمانت (روز)</label>
        <input type="number" {...register("warrantyDays")} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">توضیحات (اختیاری)</label>
        <textarea {...register("notes")} rows={3} className={inputClass} />
      </div>

      <div className="rounded-xl2 bg-surface border border-slate-200 p-4 flex items-center justify-between">
        <span className="text-sm text-graphite/70">مبلغ نهایی فاکتور</span>
        <span className="font-display text-lg font-bold text-navy">{total.toLocaleString("en-US")} تومان</span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 font-semibold text-white hover:bg-graphite transition-colors disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        صدور فاکتور
      </button>
    </form>
  );
}
