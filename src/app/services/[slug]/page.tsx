import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, PhoneCall } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { services, getServiceBySlug } from "@/lib/services-data";
import { formatToman } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seoTitle,
    description: service.seoDesc,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: { "@type": "LocalBusiness", name: "ره گشا" },
    areaServed: ["تهران", "کرج"],
    description: service.fullDesc,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-industrial-gradient text-white section-pattern">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <span className="text-water text-sm font-semibold">خدمات ره گشا</span>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold">{service.title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300 leading-8">{service.shortDesc}</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-sm">
            محدوده قیمت: {formatToman(service.priceMin)} تا {formatToman(service.priceMax)}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-display text-xl font-bold text-navy">توضیحات کامل</h2>
              <p className="mt-3 leading-8 text-graphite/90">{service.fullDesc}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-navy">مزایای خدمت</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.advantages.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-graphite/90">
                    <CheckCircle2 className="size-5 text-success shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-navy">مراحل اجرا</h2>
              <ol className="mt-4 space-y-4">
                {service.process.map((step, idx) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-water/10 font-bold text-water">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-semibold text-navy">{step.title}</div>
                      <div className="text-sm text-graphite/80 mt-1">{step.description}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-navy">سوالات متداول</h2>
              <div className="mt-4 divide-y divide-slate-200 rounded-xl2 border border-slate-200">
                {service.faq.map((f) => (
                  <details key={f.question} className="group p-5">
                    <summary className="cursor-pointer list-none font-semibold text-navy flex items-center justify-between">
                      {f.question}
                      <span className="text-water group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-graphite/80">{f.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl2 border border-slate-200 bg-white p-6 shadow-sm sticky top-24">
              <h3 className="font-display font-bold text-navy">درخواست این خدمت</h3>
              <p className="mt-2 text-sm text-graphite/70">
                همین حالا فرم درخواست را پر کنید یا مستقیم تماس بگیرید.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <LinkButton href={`/emergency?service=${service.slug}`} variant="emergency">
                  ثبت درخواست آنلاین
                </LinkButton>
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE_EMERGENCY ?? "09198814970"}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy px-5 py-2.5 text-sm font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
                >
                  <PhoneCall className="size-4" />
                  تماس فوری
                </a>
              </div>
            </div>

            <div className="rounded-xl2 bg-surface p-6 border border-slate-200">
              <h3 className="font-semibold text-navy text-sm mb-3">سایر خدمات</h3>
              <ul className="space-y-2 text-sm">
                {services
                  .filter((s) => s.slug !== service.slug)
                  .slice(0, 5)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="text-graphite/80 hover:text-water">
                        {s.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
