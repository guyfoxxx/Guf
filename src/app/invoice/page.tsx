import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { InvoiceLookup } from "@/components/ui/InvoiceLookup";

export const metadata: Metadata = {
  title: "پیگیری فاکتور",
  description: "پیگیری وضعیت فاکتور و پرداخت با وارد کردن شماره فاکتور یا شماره موبایل.",
};

export default function InvoicePage() {
  return (
    <Section className="pt-12">
      <SectionHeading
        eyebrow="پیگیری فاکتور"
        title="وضعیت فاکتور خود را بررسی کنید"
        description="شماره فاکتور یا شماره موبایلی که هنگام ثبت درخواست وارد کرده‌اید را جستجو کنید."
      />
      <div className="mx-auto max-w-2xl">
        <InvoiceLookup />
      </div>
    </Section>
  );
}
