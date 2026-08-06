import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "خدمات ره گشا",
  description:
    "خدمات تخصصی لوله بازکنی، تخلیه چاه، حفر چاه، لایروبی، تشخیص ترکیدگی لوله و پمپ چاه با ضمانت کتبی و پاسخگویی ۲۴ ساعته.",
};

export default function ServicesPage() {
  return (
    <Section className="pt-12">
      <SectionHeading
        eyebrow="خدمات"
        title="تمام خدمات لوله‌کشی، چاه و فاضلاب"
        description="هر خدمت با شرح کامل، محدوده قیمت، فرآیند اجرا و سوالات پرتکرار ارائه شده است."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </Section>
  );
}
