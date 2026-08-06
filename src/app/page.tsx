import Link from "next/link";
import Image from "next/image";
import { PhoneCall, ShieldCheck, Clock3, Wrench, Gauge, Camera, ArrowLeft, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/lib/services-data";
import { areas } from "@/lib/areas-data";
import { faqs } from "@/lib/faq-data";
import { LinkButton } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const emergency = process.env.NEXT_PUBLIC_PHONE_EMERGENCY ?? "09198814970";
  const galleryItems = await prisma.galleryItem
    .findMany({ orderBy: { createdAt: "desc" }, take: 3 })
    .catch(() => []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-industrial-gradient text-white section-pattern">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:py-28 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium glass">
              <Clock3 className="size-4 text-water" />
              پاسخگویی ۲۴ ساعته — همه روزه
            </span>
            <h1 className="mt-6 font-display text-3xl sm:text-5xl font-extrabold leading-tight">
              خدمات تخصصی لوله بازکنی و تخلیه چاه <span className="text-water">ره گشا</span>
            </h1>
            <p className="mt-5 max-w-xl text-slate-300 leading-8">
              تشخیص دقیق با تجهیزات مهندسی، اجرای بدون تخریب و پاسخگویی سریع در سراسر تهران و کرج.
              راه‌گشای مشکلات لوله‌کشی و چاه شما، در هر ساعت از شبانه‌روز.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`tel:${emergency}`}
                className="inline-flex items-center gap-2 rounded-full bg-emergency px-6 py-3.5 font-semibold shadow-soft hover:bg-orange-600 transition-colors"
              >
                <PhoneCall className="size-5" />
                تماس فوری
              </a>
              <LinkButton href="/emergency" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy">
                ثبت درخواست آنلاین
              </LinkButton>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-6 max-w-md">
              <div>
                <div className="font-display text-2xl font-bold">۲۴/۷</div>
                <div className="text-xs text-slate-400 mt-1">پاسخگویی</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold">۳۰ دقیقه</div>
                <div className="text-xs text-slate-400 mt-1">میانگین اعزام</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold">ضمانت</div>
                <div className="text-xs text-slate-400 mt-1">کتبی روی خدمات</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass rounded-xl2 p-2 shadow-glass">
              <div className="aspect-[4/3] w-full rounded-[1rem] bg-gradient-to-br from-graphite to-navy flex items-center justify-center">
                <Wrench className="size-24 text-water/40" aria-hidden />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 glass rounded-xl2 px-5 py-4 shadow-glass hidden sm:block">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Gauge className="size-5 text-water" />
                تشخیص با دوربین آندوسکوپی
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Section>
        <SectionHeading
          eyebrow="خدمات ره گشا"
          title="راه‌حل تخصصی برای هر مشکل لوله و چاه"
          description="از رفع گرفتگی ساده تا حفر چاه و پروژه‌های لوله‌کشی، با تجهیزات مهندسی و تیم فنی مجرب."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      {/* WHY CHOOSE US */}
      <Section className="bg-graphite text-white">
        <SectionHeading
          eyebrow="چرا ره گشا"
          title="مهندسی، سرعت و اعتماد در یک تیم"
          align="center"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "ضمانت کتبی", desc: "تمام خدمات با ضمانت رسمی و فاکتور شفاف" },
            { icon: Clock3, title: "۲۴ ساعته", desc: "پاسخگویی در تمام ساعات شبانه‌روز و تعطیلات" },
            { icon: Camera, title: "تشخیص دقیق", desc: "استفاده از دوربین آندوسکوپی و ردیاب نشتی" },
            { icon: Gauge, title: "تجهیزات مدرن", desc: "دستگاه فنر برقی، ژت آب و تانکر مجهز" },
          ].map((f) => (
            <div key={f.title} className="rounded-xl2 bg-white/5 p-6 glass">
              <f.icon className="size-8 text-water" aria-hidden />
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-300 leading-6">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* BEFORE / AFTER */}
      <Section>
        <SectionHeading
          eyebrow="نمونه کارها"
          title="پیش و پس از اجرای پروژه"
          description="بخشی از پروژه‌های انجام‌شده توسط تیم فنی ره گشا"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(galleryItems.length > 0 ? galleryItems : [1, 2, 3]).map((item, i) => {
            const g = typeof item === "number" ? null : item;
            return (
              <div key={g?.id ?? i} className="overflow-hidden rounded-xl2 border border-slate-200 shadow-sm">
                <div className="grid grid-cols-2">
                  <div className="relative aspect-square bg-slate-200 flex items-center justify-center text-xs text-graphite/50">
                    {g?.beforeImg ? (
                      <Image src={g.beforeImg} alt={`قبل - ${g.title}`} fill className="object-cover" />
                    ) : (
                      "قبل"
                    )}
                  </div>
                  <div className="relative aspect-square bg-slate-800 flex items-center justify-center text-xs text-white/60">
                    {g?.afterImg ? (
                      <Image src={g.afterImg} alt={`بعد - ${g.title}`} fill className="object-cover" />
                    ) : (
                      "بعد"
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-navy">{g?.title ?? "رفع گرفتگی و لایروبی چاه"}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <LinkButton href="/projects" variant="outline" className="border-navy">
            مشاهده همه پروژه‌ها
            <ArrowLeft className="size-4" />
          </LinkButton>
        </div>
      </Section>

      {/* REVIEWS */}
      <Section className="bg-surface">
        <SectionHeading eyebrow="نظرات مشتریان" title="اعتماد مشتریان، سرمایه ماست" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "علی رضایی", area: "تهران، سعادت‌آباد", text: "تکنسین سریع اومد و بدون اینکه کاشی‌ها رو خراب کنه گرفتگی رو رفع کرد." },
            { name: "مریم احمدی", area: "کرج، عظیمیه", text: "تخلیه چاه با قیمت منصفانه و بدون بو انجام شد، خیلی حرفه‌ای بودن." },
            { name: "حسین کریمی", area: "تهران، پونک", text: "برای حفر چاه مشاوره دقیقی دادن و کار رو تو زمان مشخص تحویل دادن." },
          ].map((r) => (
            <div key={r.name} className="rounded-xl2 bg-white p-6 shadow-sm border border-slate-200">
              <div className="flex gap-1 text-emergency">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-7 text-graphite/90">{r.text}</p>
              <div className="mt-4 text-sm font-semibold text-navy">{r.name}</div>
              <div className="text-xs text-graphite/60">{r.area}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* SERVICE AREAS */}
      <Section>
        <SectionHeading eyebrow="مناطق تحت پوشش" title="خدمات ره گشا در سراسر تهران و کرج" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => (
            <Link
              key={a.slug}
              href={`/areas/${a.slug}`}
              className="rounded-xl2 border border-slate-200 bg-white p-5 text-center hover:border-water hover:shadow-soft transition-all"
            >
              <div className="font-display font-bold text-navy">{a.name}</div>
              <div className="mt-1 text-xs text-graphite/60">{a.province}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-surface">
        <SectionHeading eyebrow="سوالات متداول" title="پاسخ به پرسش‌های رایج مشتریان" />
        <div className="mx-auto max-w-3xl divide-y divide-slate-200 rounded-xl2 border border-slate-200 bg-white">
          {faqs.slice(0, 4).map((f) => (
            <details key={f.question} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold text-navy flex items-center justify-between">
                {f.question}
                <span className="text-water group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-graphite/80">{f.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-6 text-center">
          <LinkButton href="/faq" variant="ghost">
            مشاهده همه سوالات
            <ArrowLeft className="size-4" />
          </LinkButton>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-industrial-gradient text-white">
        <div className="rounded-xl2 glass p-10 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            همین حالا مشکل لوله یا چاه خود را به ما بسپارید
          </h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            تیم فنی ره گشا در کمترین زمان در محل شما حاضر می‌شود.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${emergency}`}
              className="inline-flex items-center gap-2 rounded-full bg-emergency px-6 py-3.5 font-semibold shadow-soft hover:bg-orange-600 transition-colors"
            >
              <PhoneCall className="size-5" />
              تماس فوری
            </a>
            <LinkButton href="/emergency" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy">
              ثبت درخواست آنلاین
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}
