import jalaali from "jalaali-js";
import { toPersianDigits } from "./utils";

const MONTHS = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
];

export function toJalali(date: Date): string {
  const { jy, jm, jd } = jalaali.toJalaali(date);
  return `${toPersianDigits(jd)} ${MONTHS[jm - 1]} ${toPersianDigits(jy)}`;
}

export function toJalaliDateTime(date: Date): string {
  const time = date.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  return `${toJalali(date)} - ${time}`;
}
