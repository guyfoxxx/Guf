import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "غیرمجاز" }, { status: 401 });

  const customers = await prisma.customer.findMany({
    include: { area: true, _count: { select: { requests: true, invoices: true } } },
    orderBy: { createdAt: "desc" },
  });

  const rows = customers.map((c) => ({
    نام: c.name,
    موبایل: c.phone,
    آدرس: c.address,
    منطقه: c.area?.name ?? "",
    "نوع ساختمان": c.buildingType,
    "تعداد درخواست": c._count.requests,
    "تعداد فاکتور": c._count.invoices,
    "تاریخ ثبت": c.createdAt.toISOString().slice(0, 10),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "مشتریان");
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="rahgosha-customers-${Date.now()}.xlsx"`,
    },
  });
}
