"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STATUS_LABELS } from "@/lib/utils";

const STATUSES = ["NEW", "CONTACTED", "ASSIGNED", "WORKING", "COMPLETED", "CANCELLED"];

export function StatusUpdater({ id, status }: { id: string; status: string }) {
  const [current, setCurrent] = useState(status);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleChange(next: string) {
    setCurrent(next);
    setSaving(true);
    try {
      const res = await fetch(`/api/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setCurrent(status);
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      value={current}
      disabled={saving}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-navy disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
