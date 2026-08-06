"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, Users, ClipboardList, Receipt, Wrench,
  UserCog, MapPin, Image as ImageIcon, Newspaper, Settings,
  BarChart3, DatabaseBackup, LogOut, Droplets,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/customers", label: "مشتریان", icon: Users },
  { href: "/admin/requests", label: "درخواست‌ها", icon: ClipboardList },
  { href: "/admin/invoices", label: "فاکتورها", icon: Receipt },
  { href: "/admin/services", label: "خدمات", icon: Wrench },
  { href: "/admin/employees", label: "کارکنان", icon: UserCog },
  { href: "/admin/areas", label: "مناطق", icon: MapPin },
  { href: "/admin/gallery", label: "گالری", icon: ImageIcon },
  { href: "/admin/blog", label: "بلاگ", icon: Newspaper },
  { href: "/admin/reports", label: "گزارش‌ها", icon: BarChart3 },
  { href: "/admin/backup", label: "پشتیبان‌گیری", icon: DatabaseBackup },
  { href: "/admin/settings", label: "تنظیمات", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-navy text-slate-300 min-h-screen p-4">
      <div className="flex items-center gap-2 text-white font-display font-bold px-2 py-3">
        <span className="flex size-9 items-center justify-center rounded-xl2 bg-industrial-gradient">
          <Droplets className="size-5" />
        </span>
        پنل مدیریت
      </div>

      <nav className="mt-6 flex-1 space-y-1">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-water/15 text-white" : "hover:bg-white/5"
              )}
            >
              <l.icon className="size-4.5" />
              {l.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-300 hover:bg-white/5"
      >
        <LogOut className="size-4.5" />
        خروج از حساب
      </button>
    </aside>
  );
}
