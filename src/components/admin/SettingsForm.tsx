"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

type SettingsData = {
  companyName: string;
  phoneMain: string;
  phoneEmergency: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  socialInstagram: string;
};

const inputClass =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus-visible:border-water";

export function SettingsForm({ initial }: { initial: SettingsData }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof SettingsData>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
      router.refresh();
    } catch {
      setError("ذخیره تنظیمات با خطا مواجه شد.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <AlertTriangle className="size-4" /> {error}
        </div>
      )}
      {saved && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-success">
          <CheckCircle2 className="size-4" /> تنظیمات با موفقیت ذخیره شد.
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">نام شرکت</label>
        <input className={inputClass} value={form.companyName} onChange={(e) => update("companyName", e.target.value)} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">تلفن ثابت</label>
          <input className={inputClass} value={form.phoneMain} onChange={(e) => update("phoneMain", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">شماره اضطراری ۲۴ ساعته</label>
          <input
            className={inputClass}
            value={form.phoneEmergency}
            onChange={(e) => update("phoneEmergency", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">شماره واتس‌اپ</label>
        <input className={inputClass} value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">آدرس دفتر مرکزی</label>
        <input className={inputClass} value={form.address} onChange={(e) => update("address", e.target.value)} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">ساعات کاری</label>
          <input
            className={inputClass}
            value={form.workingHours}
            onChange={(e) => update("workingHours", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">اینستاگرام (اختیاری)</label>
          <input
            className={inputClass}
            value={form.socialInstagram}
            onChange={(e) => update("socialInstagram", e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 font-semibold text-white hover:bg-graphite transition-colors disabled:opacity-60"
      >
        {saving && <Loader2 className="size-4 animate-spin" />}
        ذخیره تنظیمات
      </button>
    </form>
  );
}
