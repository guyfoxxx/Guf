"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, PhoneCall, Droplets } from "lucide-react";

const links = [
  { href: "/", label: "خانه" },
  { href: "/services", label: "خدمات" },
  { href: "/about", label: "درباره ما" },
  { href: "/projects", label: "نمونه کارها" },
  { href: "/blog", label: "بلاگ" },
  { href: "/faq", label: "سوالات متداول" },
  { href: "/contact", label: "تماس با ما" },
  { href: "/invoice", label: "پیگیری فاکتور" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const phone = process.env.NEXT_PUBLIC_PHONE_MAIN ?? "02100000000";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-navy">
            <span className="flex size-9 items-center justify-center rounded-xl2 bg-industrial-gradient text-white shadow-soft">
              <Droplets className="size-5" aria-hidden />
            </span>
            ره گشا
          </Link>

          <nav className="hidden lg:flex items-center gap-6" aria-label="ناوبری اصلی">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-graphite hover:text-water transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-graphite transition-colors"
            >
              <PhoneCall className="size-4" aria-hidden />
              تماس فوری
            </a>
            <Link
              href="/emergency"
              className="rounded-full bg-emergency px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
            >
              ثبت درخواست آنلاین
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-navy"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <nav className="flex flex-col p-4 gap-1" aria-label="ناوبری موبایل">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-graphite hover:bg-surface"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white"
              >
                <PhoneCall className="size-4" /> تماس فوری
              </a>
              <Link
                href="/emergency"
                onClick={() => setOpen(false)}
                className="rounded-full bg-emergency px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                ثبت درخواست آنلاین
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
