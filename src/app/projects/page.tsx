import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { services } from "@/lib/services-data";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "نمونه کارها",
  description: "گالری پروژه‌های انجام‌شده توسط تیم فنی ره گشا در زمینه لوله بازکنی، تخلیه و حفر چاه.",
};

const placeholderProjects = services.slice(0, 8).map((s, i) => ({
  id: `placeholder-${i + 1}`,
  title: `${s.title} — پروژه شماره ${i + 1}`,
  service: s.title as string | null,
  beforeImg: null as string | null,
  afterImg: null as string | null,
}));

export default async function ProjectsPage() {
  const galleryItems = await prisma.galleryItem
    .findMany({ orderBy: { createdAt: "desc" } })
    .catch(() => []);

  const projects =
    galleryItems.length > 0
      ? galleryItems.map((g) => ({
          id: g.id,
          title: g.title,
          service: null as string | null,
          beforeImg: g.beforeImg,
          afterImg: g.afterImg,
        }))
      : placeholderProjects;

  return (
    <Section className="pt-12">
      <SectionHeading
        eyebrow="نمونه کارها"
        title="پروژه‌های اجرا شده"
        description={
          galleryItems.length > 0
            ? "تصاویر واقعی پیش و پس از اجرای پروژه‌ها"
            : "نمایش تصاویر پیش و پس از اجرای پروژه‌ها. برای مشاهده تصاویر واقعی، گالری از پنل مدیریت به‌روزرسانی می‌شود."
        }
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-xl2 border border-slate-200 shadow-sm bg-white">
            <div className="grid grid-cols-2">
              <div className="relative aspect-square bg-slate-200 flex items-center justify-center text-xs text-graphite/50">
                {p.beforeImg ? (
                  <Image src={p.beforeImg} alt={`قبل از اجرا — ${p.title}`} fill className="object-cover" />
                ) : (
                  "قبل از اجرا"
                )}
              </div>
              <div className="relative aspect-square bg-navy flex items-center justify-center text-xs text-white/60">
                {p.afterImg ? (
                  <Image src={p.afterImg} alt={`پس از اجرا — ${p.title}`} fill className="object-cover" />
                ) : (
                  "پس از اجرا"
                )}
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-navy">{p.title}</p>
              {p.service && <p className="text-xs text-graphite/60 mt-1">خدمت: {p.service}</p>}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
