"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertTriangle, UploadCloud, ImagePlus } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus-visible:border-water";

export function GalleryUploadForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [title, setTitle] = useState("");
  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [afterPreview, setAfterPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onPickImage(file: File | null, setPreview: (url: string | null) => void) {
    if (!file) {
      setPreview(null);
      return;
    }
    setPreview(URL.createObjectURL(file));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch("/api/gallery", { method: "POST", body: formData });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error ?? "بارگذاری با خطا مواجه شد");
      }
      formRef.current?.reset();
      setTitle("");
      setBeforePreview(null);
      setAfterPreview(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "بارگذاری با خطا مواجه شد");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-xl2 border border-slate-200 bg-white p-5 space-y-4"
    >
      <div className="flex items-center gap-2 text-navy font-semibold">
        <UploadCloud className="size-5" />
        افزودن نمونه کار جدید (قبل و بعد)
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <AlertTriangle className="size-4" /> {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">عنوان</label>
        <input
          name="title"
          required
          minLength={2}
          className={inputClass}
          placeholder="مثلاً: لوله‌بازکنی — پروژه خیابان ولیعصر"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">تصویر قبل از اجرا</label>
          <label className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs text-graphite/50 overflow-hidden">
            {beforePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={beforePreview} alt="پیش‌نمایش قبل" className="h-full w-full object-cover" />
            ) : (
              <>
                <ImagePlus className="size-6" />
                انتخاب تصویر
              </>
            )}
            <input
              type="file"
              name="before"
              accept="image/png,image/jpeg,image/webp,image/gif"
              required
              className="hidden"
              onChange={(e) => onPickImage(e.target.files?.[0] ?? null, setBeforePreview)}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">تصویر پس از اجرا</label>
          <label className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs text-graphite/50 overflow-hidden">
            {afterPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={afterPreview} alt="پیش‌نمایش بعد" className="h-full w-full object-cover" />
            ) : (
              <>
                <ImagePlus className="size-6" />
                انتخاب تصویر
              </>
            )}
            <input
              type="file"
              name="after"
              accept="image/png,image/jpeg,image/webp,image/gif"
              required
              className="hidden"
              onChange={(e) => onPickImage(e.target.files?.[0] ?? null, setAfterPreview)}
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-graphite transition-colors disabled:opacity-60"
      >
        {saving && <Loader2 className="size-4 animate-spin" />}
        بارگذاری در گالری
      </button>
      <p className="text-xs text-graphite/50">حداکثر حجم هر تصویر ۵ مگابایت — فرمت‌های jpg, png, webp, gif</p>
    </form>
  );
}
