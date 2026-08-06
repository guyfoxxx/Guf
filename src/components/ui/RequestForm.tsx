"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { serviceRequestSchema, type ServiceRequestInput } from "@/lib/schema";
import { services } from "@/lib/services-data";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

export function RequestForm({ defaultServiceSlug }: { defaultServiceSlug?: string }) {
  const searchParams = useSearchParams();
  const serviceFromUrl = searchParams.get("service") ?? undefined;
  const [submitted, setSubmitted] = useState<{ code: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ServiceRequestInput>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      urgency: "URGENT",
      serviceId: defaultServiceSlug ?? serviceFromUrl ?? "",
    },
  });

  async function onSubmit(data: ServiceRequestInput) {
    setError(null);
    try {
      const res = await fetch("/api/requests.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("خطا در ثبت درخواست");
      const json = await res.json();
      setSubmitted({ code: json.code });
    } catch {
      setError("ثبت درخواست با خطا مواجه شد. لطفاً مجدداً تلاش کنید یا با ما تماس بگیرید.");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl2 border border-success/30 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-success" />
        <h3 className="mt-4 font-display text-xl font-bold text-navy">درخواست شما ثبت شد</h3>
        <p className="mt-2 text-sm text-graphite/80">
          کد پیگیری شما: <span className="font-bold text-navy">{submitted.code}</span>
        </p>
        <p className="mt-2 text-sm text-graphite/70">
          تیم فنی ره گشا به‌زودی با شما تماس خواهد گرفت.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <AlertTriangle className="size-4" /> {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="name">
          نام و نام خانوادگی
        </label>
        <input
          id="name"
          {...register("name")}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus-visible:border-water"
          placeholder="مثلاً علی رضایی"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="phone">
          شماره موبایل
        </label>
        <input
          id="phone"
          {...register("phone")}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus-visible:border-water"
          placeholder="09123456789"
          inputMode="numeric"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="address">
          آدرس کامل
        </label>
        <input
          id="address"
          {...register("address")}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus-visible:border-water"
          placeholder="استان، شهر، خیابان، پلاک"
        />
        {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="serviceId">
          نوع خدمت
        </label>
        <select
          id="serviceId"
          {...register("serviceId")}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus-visible:border-water"
        >
          <option value="">انتخاب کنید</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
        {errors.serviceId && <p className="mt-1 text-xs text-red-600">{errors.serviceId.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="description">
          توضیح مشکل
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus-visible:border-water"
          placeholder="مشکل را با جزئیات توضیح دهید"
        />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="urgency">
            سطح فوریت
          </label>
          <select
            id="urgency"
            {...register("urgency")}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus-visible:border-water"
          >
            <option value="NORMAL">عادی</option>
            <option value="URGENT">فوری</option>
            <option value="EMERGENCY">اضطراری</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="preferredTime">
            زمان ترجیحی (اختیاری)
          </label>
          <input
            id="preferredTime"
            type="datetime-local"
            {...register("preferredTime")}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus-visible:border-water"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-emergency px-6 py-3.5 font-semibold text-white hover:bg-orange-600 transition-colors disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        ثبت درخواست
      </button>
    </form>
  );
}
