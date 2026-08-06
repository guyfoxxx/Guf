import { prisma } from "@/lib/prisma";
import { toJalali } from "@/lib/jalali";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { GalleryUploadForm } from "@/components/admin/GalleryUploadForm";
import { GalleryDeleteButton } from "@/components/admin/GalleryDeleteButton";

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">گالری قبل و بعد</h1>
        <p className="text-sm text-graphite/60 mt-1">
          نمونه‌کارهای تکمیل‌شده برای نمایش در صفحه اصلی و پروژه‌ها
        </p>
      </div>

      <div className="mt-6">
        <GalleryUploadForm />
      </div>

      {items.length === 0 && (
        <div className="mt-6 rounded-xl2 border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-graphite/60 flex flex-col items-center gap-2">
          <ImageOff className="size-8 text-graphite/30" />
          هنوز تصویری در گالری بارگذاری نشده است.
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <div key={g.id} className="rounded-xl2 bg-white border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-2">
              <div className="relative aspect-square bg-slate-100">
                {g.beforeImg ? (
                  <Image src={g.beforeImg} alt={`قبل - ${g.title}`} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-graphite/40">قبل</div>
                )}
              </div>
              <div className="relative aspect-square bg-slate-100">
                {g.afterImg ? (
                  <Image src={g.afterImg} alt={`بعد - ${g.title}`} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-graphite/40">بعد</div>
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-navy text-sm">{g.title}</h3>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-graphite/50">{toJalali(g.createdAt)}</p>
                <GalleryDeleteButton id={g.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
