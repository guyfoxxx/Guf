import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  NEW: "bg-water/10 text-water",
  CONTACTED: "bg-amber-100 text-amber-700",
  ASSIGNED: "bg-indigo-100 text-indigo-700",
  WORKING: "bg-orange-100 text-emergency",
  COMPLETED: "bg-green-100 text-success",
  CANCELLED: "bg-red-100 text-red-600",
  UNPAID: "bg-red-100 text-red-600",
  PARTIAL: "bg-amber-100 text-amber-700",
  PAID: "bg-green-100 text-success",
  NORMAL: "bg-slate-100 text-graphite",
  URGENT: "bg-orange-100 text-emergency",
  EMERGENCY: "bg-red-100 text-red-600",
};

export function Badge({ status, label }: { status: string; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        styles[status] ?? "bg-slate-100 text-graphite"
      )}
    >
      {label}
    </span>
  );
}
