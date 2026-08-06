import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-7xl px-4">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "right";
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", align === "center" ? "mx-auto text-center" : "text-right")}>
      {eyebrow && (
        <span className="text-sm font-semibold text-water tracking-wide">{eyebrow}</span>
      )}
      <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-navy">{title}</h2>
      {description && <p className="mt-3 text-graphite/80 leading-7">{description}</p>}
    </div>
  );
}
