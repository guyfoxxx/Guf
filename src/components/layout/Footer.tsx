import Link from "next/link";
import { Droplets, MapPin, Phone, Mail } from "lucide-react";
import { services } from "@/lib/services-data";
import { areas } from "@/lib/areas-data";

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_PHONE_MAIN ?? "02100000000";
  const emergency = process.env.NEXT_PUBLIC_PHONE_EMERGENCY ?? "09198814970";

  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-white font-display text-lg font-bold">
            <span className="flex size-9 items-center justify-center rounded-xl2 bg-industrial-gradient">
              <Droplets className="size-5" />
            </span>
            ره گشا
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            شرکت خدمات فنی ره گشا، ارائه‌دهنده خدمات تخصصی لوله بازکنی، تخلیه چاه، حفر چاه و لوله‌کشی
            با تکیه بر دانش فنی، تجهیزات مدرن و پاسخگویی ۲۴ ساعته.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">خدمات</h3>
          <ul className="space-y-2 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-water transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">مناطق تحت پوشش</h3>
          <ul className="space-y-2 text-sm">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="hover:text-water transition-colors">
                  {a.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/invoice" className="hover:text-water transition-colors">
                پیگیری فاکتور
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">ارتباط با ما</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-water" />
              <a href={`tel:${phone}`}>{phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-emergency" />
              <a href={`tel:${emergency}`}>{emergency} (اضطراری)</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-water" />
              <a href="mailto:info@rahgosha.top">info@rahgosha.top</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-water" />
              <span>تهران، ایران</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ره گشا — تمام حقوق محفوظ است.
      </div>
    </footer>
  );
}
