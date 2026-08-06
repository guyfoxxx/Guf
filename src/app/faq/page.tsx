import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { faqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "سوالات متداول",
  description: "پاسخ به پرسش‌های پرتکرار درباره خدمات لوله بازکنی، تخلیه چاه، هزینه‌ها و ضمانت خدمات ره گشا.",
};

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <Section className="pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SectionHeading eyebrow="سوالات متداول" title="هر آنچه باید بدانید" />
      <div className="mx-auto max-w-3xl divide-y divide-slate-200 rounded-xl2 border border-slate-200 bg-white">
        {faqs.map((f) => (
          <details key={f.question} className="group p-5">
            <summary className="cursor-pointer list-none font-semibold text-navy flex items-center justify-between">
              {f.question}
              <span className="text-water group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-7 text-graphite/80">{f.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
