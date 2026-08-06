import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone, Mail, MapPin, Clock3 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RequestForm } from "@/components/ui/RequestForm";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "راه‌های ارتباطی با شرکت خدمات فنی ره گشا: تلفن، واتساپ، ایمیل و فرم درخواست آنلاین.",
};

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_PHONE_MAIN ?? "02100000000";
  const emergency = process.env.NEXT_PUBLIC_PHONE_EMERGENCY ?? "09198814970";

  return (
    <Section className="pt-12">
      <SectionHeading eyebrow="تماس با ما" title="ره گشا همیشه در دسترس است" />
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl2 border border-slate-200 p-5 flex items-center gap-4">
            <Phone className="size-6 text-water" />
            <div>
              <div className="text-xs text-graphite/60">تماس عادی</div>
              <a href={`tel:${phone}`} className="font-semibold text-navy">{phone}</a>
            </div>
          </div>
          <div className="rounded-xl2 border border-slate-200 p-5 flex items-center gap-4">
            <Phone className="size-6 text-emergency" />
            <div>
              <div className="text-xs text-graphite/60">خط اضطراری</div>
              <a href={`tel:${emergency}`} className="font-semibold text-navy">{emergency}</a>
            </div>
          </div>
          <div className="rounded-xl2 border border-slate-200 p-5 flex items-center gap-4">
            <Mail className="size-6 text-water" />
            <div>
              <div className="text-xs text-graphite/60">ایمیل</div>
              <a href="mailto:info@rahgosha.top" className="font-semibold text-navy">info@rahgosha.top</a>
            </div>
          </div>
          <div className="rounded-xl2 border border-slate-200 p-5 flex items-center gap-4">
            <MapPin className="size-6 text-water" />
            <div>
              <div className="text-xs text-graphite/60">دفتر مرکزی</div>
              <div className="font-semibold text-navy">تهران، ایران</div>
            </div>
          </div>
          <div className="rounded-xl2 border border-slate-200 p-5 flex items-center gap-4">
            <Clock3 className="size-6 text-water" />
            <div>
              <div className="text-xs text-graphite/60">ساعات کاری</div>
              <div className="font-semibold text-navy">۲۴ ساعته، همه روزه</div>
            </div>
          </div>
          <div className="aspect-video rounded-xl2 bg-slate-200 flex items-center justify-center text-sm text-graphite/50">
            نقشه گوگل مپ (Google Maps Embed)
          </div>
        </div>

        <div className="lg:col-span-3 rounded-xl2 border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-display text-lg font-bold text-navy mb-4">فرم درخواست خدمات</h2>
          <Suspense fallback={null}>
            <RequestForm />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}
