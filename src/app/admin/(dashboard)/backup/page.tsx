import { DatabaseBackup, FileSpreadsheet, ShieldCheck } from "lucide-react";

export default function AdminBackupPage() {
  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">پشتیبان‌گیری و خروجی</h1>
        <p className="text-sm text-graphite/60 mt-1">
          تهیه نسخه پشتیبان از اطلاعات و خروجی اکسل برای گزارش‌گیری
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <a
          href="/api/backup"
          className="flex items-start gap-4 rounded-xl2 bg-white border border-slate-200 p-5 hover:border-water transition-colors"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl2 bg-navy text-white">
            <DatabaseBackup className="size-5" />
          </span>
          <span>
            <span className="block font-semibold text-navy">دریافت پشتیبان کامل (JSON)</span>
            <span className="block text-sm text-graphite/60 mt-1">
              خروجی کامل مشتریان، درخواست‌ها، فاکتورها، خدمات و مقالات
            </span>
          </span>
        </a>

        <a
          href="/api/export/customers"
          className="flex items-start gap-4 rounded-xl2 bg-white border border-slate-200 p-5 hover:border-water transition-colors"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl2 bg-water text-white">
            <FileSpreadsheet className="size-5" />
          </span>
          <span>
            <span className="block font-semibold text-navy">خروجی اکسل مشتریان</span>
            <span className="block text-sm text-graphite/60 mt-1">
              فایل Excel از لیست کامل مشتریان برای گزارش‌گیری
            </span>
          </span>
        </a>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl2 border border-dashed border-slate-300 bg-surface p-5 text-sm text-graphite/70">
        <ShieldCheck className="size-5 shrink-0 text-water" />
        <p>
          برای بازیابی نسخه پشتیبان یا زمان‌بندی خودکار (روزانه/هفتگی)، فایل JSON دریافتی را
          به همراه دیتابیس PostgreSQL روی یک سرویس ذخیره‌سازی امن (مثلاً S3 یا فضای مشابه)
          نگه‌داری کنید. این بخش برای اتصال به سرویس ابری قابل توسعه است.
        </p>
      </div>
    </div>
  );
}
