import type { Metadata } from "next";
import { Suspense } from "react";
import { PhoneCall, ShieldCheck, Clock3 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { RequestForm } from "@/components/ui/RequestForm";

export const metadata: Metadata = {
  title: "ثبت درخواست فوری",
  description: "ثبت درخواست خدمات لوله بازکنی، تخلیه چاه و خدمات اضطراری لوله‌کشی به‌صورت آنلاین.",
};

export default function EmergencyPage() {
  const emergency = process.env.NEXT_PUBLIC_PHONE_EMERGENCY ?? "09198814970";

  return (
    <Section className="pt-12">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-6">
          <span className="text-sm font-semibold text-emergency">درخواست اضطراری</span>
          <h1 className="font-display text-3xl font-bold text-navy">
            نیاز به کمک فوری دارید؟
          </h1>
          <p className="text-graphite/80 leading-7">
            فرم زیر را پر کنید تا نزدیک‌ترین تکنسین ره گشا در سریع‌ترین زمان با شما تماس بگیرد.
            برای موارد بسیار اضطراری، تماس تلفنی سریع‌تر است.
          </p>

          <a
            href={`tel:${emergency}`}
            className="flex items-center gap-3 rounded-xl2 bg-navy p-5 text-white"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-emergency">
              <PhoneCall className="size-5" />
            </span>
            <div>
              <div className="text-xs text-slate-300">تماس فوری با کارشناس</div>
              <div className="font-bold">{emergency}</div>
            </div>
          </a>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl2 border border-slate-200 p-4">
              <Clock3 className="size-6 text-water" />
              <div className="mt-2 text-sm font-semibold text-navy">اعزام سریع</div>
              <div className="text-xs text-graphite/70 mt-1">میانگین ۳۰ تا ۶۰ دقیقه</div>
            </div>
            <div className="rounded-xl2 border border-slate-200 p-4">
              <ShieldCheck className="size-6 text-water" />
              <div className="mt-2 text-sm font-semibold text-navy">ضمانت خدمات</div>
              <div className="text-xs text-graphite/70 mt-1">فاکتور رسمی و گارانتی کتبی</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 rounded-xl2 border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <Suspense fallback={null}>
            <RequestForm />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}
