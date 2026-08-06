"use client";

import { useState } from "react";
import { Search, Loader2, Download, ShieldCheck, AlertCircle } from "lucide-react";
import { formatToman } from "@/lib/utils";
import { toJalali } from "@/lib/jalali";
import { PAYMENT_STATUS_LABELS } from "@/lib/utils";

type InvoiceResult = {
  number: string;
  customerName: string;
  serviceTitle: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  paymentStatus: string;
  warrantyDays: number;
  issuedAt: string;
};

export function InvoiceLookup() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InvoiceResult | null>(null);
  const [notFound, setNotFound] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length < 4) return;
    setLoading(true);
    setNotFound(false);
    setResult(null);
    try {
      const res = await fetch(`/api/invoices?query=${encodeURIComponent(query.trim())}`);
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      const data = await res.json();
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="شماره فاکتور یا شماره موبایل"
          className="flex-1 rounded-full border border-slate-300 px-5 py-3 text-sm focus-visible:border-water"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 font-semibold text-white hover:bg-graphite transition-colors disabled:opacity-60"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
          جستجو
        </button>
      </form>

      {notFound && (
        <div className="mt-6 flex items-center gap-2 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
          <AlertCircle className="size-5" />
          فاکتوری با این مشخصات یافت نشد. لطفاً شماره را بررسی کنید.
        </div>
      )}

      {result && (
        <div className="mt-8 rounded-xl2 border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="text-xs text-graphite/60">شماره فاکتور</div>
              <div className="font-display font-bold text-navy">{result.number}</div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-success">
              <ShieldCheck className="size-3.5" />
              {PAYMENT_STATUS_LABELS[result.paymentStatus]}
            </span>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-graphite/60">مشتری</dt>
              <dd className="font-semibold text-navy">{result.customerName}</dd>
            </div>
            <div>
              <dt className="text-graphite/60">خدمت</dt>
              <dd className="font-semibold text-navy">{result.serviceTitle}</dd>
            </div>
            <div>
              <dt className="text-graphite/60">تاریخ صدور</dt>
              <dd className="font-semibold text-navy">{toJalali(new Date(result.issuedAt))}</dd>
            </div>
            <div>
              <dt className="text-graphite/60">ضمانت</dt>
              <dd className="font-semibold text-navy">{result.warrantyDays} روز</dd>
            </div>
            <div>
              <dt className="text-graphite/60">مبلغ کل</dt>
              <dd className="font-semibold text-navy">{formatToman(result.totalAmount)}</dd>
            </div>
            <div>
              <dt className="text-graphite/60">مانده قابل پرداخت</dt>
              <dd className="font-semibold text-emergency">{formatToman(result.remainingAmount)}</dd>
            </div>
          </dl>

          <button className="mt-6 flex items-center gap-2 rounded-full border border-navy px-5 py-2.5 text-sm font-semibold text-navy hover:bg-navy hover:text-white transition-colors">
            <Download className="size-4" />
            دریافت نسخه PDF
          </button>
        </div>
      )}
    </div>
  );
}
