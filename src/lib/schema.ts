import { z } from "zod";

export const serviceRequestSchema = z.object({
  name: z.string().min(3, "نام باید حداقل ۳ حرف باشد"),
  phone: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثال: 09123456789)"),
  address: z.string().min(10, "آدرس را کامل‌تر وارد کنید"),
  serviceId: z.string().min(1, "نوع خدمت را انتخاب کنید"),
  description: z.string().min(10, "توضیحات مشکل را کامل‌تر بنویسید"),
  urgency: z.enum(["NORMAL", "URGENT", "EMERGENCY"]),
  preferredTime: z.string().optional(),
});

export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;

export const invoiceLookupSchema = z.object({
  query: z.string().min(4, "شماره فاکتور یا موبایل را وارد کنید"),
});

export const invoiceCreateSchema = z.object({
  customerName: z.string().min(3, "نام مشتری را وارد کنید"),
  customerPhone: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  customerAddress: z.string().min(5, "آدرس را وارد کنید"),
  serviceTitle: z.string().min(2, "عنوان خدمت را وارد کنید"),
  laborCost: z.coerce.number().min(0, "هزینه اجرت را وارد کنید"),
  materialsCost: z.coerce.number().min(0).default(0),
  discount: z.coerce.number().min(0).default(0),
  warrantyDays: z.coerce.number().min(0).default(30),
  notes: z.string().optional(),
});

export type InvoiceCreateInput = z.infer<typeof invoiceCreateSchema>;

export const customerSchema = z.object({
  name: z.string().min(3),
  phone: z.string().regex(/^09\d{9}$/),
  secondPhone: z.string().optional(),
  address: z.string().min(5),
  buildingType: z.enum(["APARTMENT", "VILLA", "COMMERCIAL", "INDUSTRIAL", "OTHER"]),
  notes: z.string().optional(),
});
