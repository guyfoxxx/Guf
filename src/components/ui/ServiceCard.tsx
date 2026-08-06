import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowLeft } from "lucide-react";
import type { ServiceContent } from "@/lib/services-data";
import { formatToman } from "@/lib/utils";

export function ServiceCard({ service }: { service: ServiceContent }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon] ?? Icons.Wrench;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-xl2 border border-slate-200 bg-white p-6 shadow-sm hover:shadow-soft hover:-translate-y-1 transition-all"
    >
      <div className="flex size-12 items-center justify-center rounded-xl2 bg-industrial-gradient text-white">
        <Icon className="size-6" aria-hidden />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-navy">{service.title}</h3>
      <p className="mt-2 text-sm leading-6 text-graphite/80 flex-1">{service.shortDesc}</p>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-graphite/60">
          از {formatToman(service.priceMin)}
        </span>
        <span className="flex items-center gap-1 text-sm font-semibold text-water group-hover:gap-2 transition-all">
          مشاهده جزئیات
          <ArrowLeft className="size-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
