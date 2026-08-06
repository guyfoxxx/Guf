import { Phone, Clock } from "lucide-react";

export default function EmergencyBar() {
  const phone = process.env.NEXT_PUBLIC_PHONE_EMERGENCY ?? "09198814970";

  return (
    <div className="bg-navy text-white text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-200">
          <Clock className="size-4 text-water" aria-hidden />
          <span>پاسخگویی ۲۴ ساعته، همه روزه — حتی تعطیلات</span>
        </div>
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-1.5 font-semibold text-emergency hover:text-orange-400 transition-colors"
        >
          <Phone className="size-4" aria-hidden />
          <span>خط اضطراری: {phone}</span>
        </a>
      </div>
    </div>
  );
}
