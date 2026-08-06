import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, PhoneCall } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { areas, getAreaBySlug } from "@/lib/areas-data";
import { services } from "@/lib/services-data";
import { LinkButton } from "@/components/ui/Button";

export function generateStaticParams() {
  return areas.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const area = getAreaBySlug(city);
  if (!area) return {};
  return { title: area.seoTitle, description: area.seoDesc };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const area = getAreaBySlug(city);
  if (!area) notFound();

  return (
    <>
      <section className="bg-industrial-gradient text-white section-pattern">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <span className="inline-flex items-center gap-2 text-water text-sm font-semibold">
            <MapPin className="size-4" /> {area.province}
          </span>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
            خدمات لوله بازکنی و تخلیه چاه در {area.name}
          </h1>
          <p className="mt-4 text-slate-300 leading-8">{area.body}</p>
          <div className="mt-6">
            <LinkButton href="/emergency" variant="emergency" size="lg">
              <PhoneCall className="size-4" /> ثبت درخواست در {area.name}
            </LinkButton>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading title={`خدمات قابل ارائه در ${area.name}`} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>
    </>
  );
}
