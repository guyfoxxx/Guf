import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toPersianDigits(input: string | number): string {
  const map: Record<string, string> = {
    "0": "۰", "1": "۱", "2": "۲", "3": "۳", "4": "۴",
    "5": "۵", "6": "۶", "7": "۷", "8": "۸", "9": "۹",
  };
  return String(input).replace(/[0-9]/g, (d) => map[d]);
}

export function formatToman(amount: number): string {
  return toPersianDigits(amount.toLocaleString("en-US")) + " تومان";
}

export function generateRequestCode(): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `RG-${Date.now().toString().slice(-6)}-${rand}`;
}

export function generateInvoiceNumber(seq: number): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  return `RG-${yy}${mm}-${String(seq).padStart(4, "0")}`;
}

export const URGENCY_LABELS: Record<string, string> = {
  NORMAL: "عادی",
  URGENT: "فوری",
  EMERGENCY: "اضطراری",
};

export const STATUS_LABELS: Record<string, string> = {
  NEW: "جدید",
  CONTACTED: "تماس گرفته شد",
  ASSIGNED: "واگذار شده",
  WORKING: "در حال انجام",
  COMPLETED: "تکمیل شده",
  CANCELLED: "لغو شده",
};

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  UNPAID: "پرداخت نشده",
  PARTIAL: "پرداخت ناقص",
  PAID: "پرداخت شده",
};
