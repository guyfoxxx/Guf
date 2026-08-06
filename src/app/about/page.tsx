import type { Metadata } from "next";
import { ShieldCheck, Users, Wrench, Award } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "درباره ره گشا",
  description: "آشنایی با شرکت خدمات فنی ره گشا، تیم فنی، تجهیزات و تعهد ما به کیفیت و پاسخگویی سریع.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-industrial-gradient text-white section-pattern">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold">درباره ره گشا</h1>
          <p className="mt-4 text-slate-300 leading-8">
            ره گشا با هدف ارائه خدمات فنی لوله‌کشی، تخلیه و حفر چاه با استاندارد مهندسی و پاسخگویی
            سریع، در تهران و کرج فعالیت می‌کند. تمرکز ما بر تشخیص دقیق مشکل، اجرای تمیز و بدون تخریب
            غیرضروری، و ارائه ضمانت کتبی روی تمام خدمات است.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="ماموریت ما" title="راه‌گشای مشکلات فنی ساختمان شما" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "اعتماد", desc: "شفافیت در قیمت و ارائه فاکتور رسمی برای هر خدمت" },
            { icon: Wrench, title: "تخصص فنی", desc: "تیمی متشکل از تکنسین‌های آموزش‌دیده و مجرب" },
            { icon: Users, title: "مشتری‌محوری", desc: "پاسخگویی سریع و پیگیری تا رضایت کامل مشتری" },
            { icon: Award, title: "کیفیت اجرا", desc: "استفاده از تجهیزات مدرن و متریال استاندارد" },
          ].map((v) => (
            <div key={v.title} className="rounded-xl2 border border-slate-200 p-6">
              <v.icon className="size-8 text-water" />
              <h3 className="mt-4 font-semibold text-navy">{v.title}</h3>
              <p className="mt-2 text-sm text-graphite/80 leading-6">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading eyebrow="تجهیزات" title="فناوری‌هایی که استفاده می‌کنیم" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "دستگاه فنر برقی صنعتی برای لوله‌های اصلی و فرعی",
            "ژت آب فشار قوی برای شست‌وشوی کامل داخل لوله",
            "دوربین آندوسکوپی برای تشخیص دقیق محل گرفتگی و آسیب",
            "ردیاب صدا و رطوبت برای تشخیص نشتی پنهان",
            "تانکر مجهز به پمپ مکش قوی برای تخلیه چاه",
            "دستگاه‌های حفاری استاندارد برای حفر چاه",
          ].map((t) => (
            <div key={t} className="rounded-xl2 bg-white border border-slate-200 p-5 text-sm leading-7 text-graphite/90">
              {t}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
