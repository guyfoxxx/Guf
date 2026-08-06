import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { invoiceCreateSchema } from "@/lib/schema";
import { generateInvoiceNumber } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "غیرمجاز" }, { status: 401 });

  const body = await req.json();
  const parsed = invoiceCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  try {
    const customer = await prisma.customer.upsert({
      where: { phone: data.customerPhone },
      update: { name: data.customerName, address: data.customerAddress },
      create: {
        name: data.customerName,
        phone: data.customerPhone,
        address: data.customerAddress,
      },
    });

    const totalAmount = data.laborCost + data.materialsCost - data.discount;
    const seq = (await prisma.invoice.count()) + 1;

    const invoice = await prisma.invoice.create({
      data: {
        number: generateInvoiceNumber(seq),
        customerId: customer.id,
        laborCost: data.laborCost,
        materialsCost: data.materialsCost,
        discount: data.discount,
        totalAmount,
        paidAmount: 0,
        remainingAmount: totalAmount,
        warrantyDays: data.warrantyDays,
        notes: data.notes,
        items: {
          create: [
            {
              title: data.serviceTitle,
              quantity: 1,
              unitPrice: totalAmount,
              total: totalAmount,
            },
          ],
        },
      },
    });

    return NextResponse.json({ number: invoice.number }, { status: 201 });
  } catch (err) {
    console.error("Failed to create invoice", err);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query")?.trim();
  if (!query || query.length < 4) {
    return NextResponse.json({ error: "پارامتر جستجو نامعتبر است" }, { status: 400 });
  }

  const invoice = await prisma.invoice.findFirst({
    where: {
      OR: [
        { number: query },
        { customer: { phone: query } },
      ],
    },
    include: {
      customer: true,
      items: { include: { service: true } },
    },
    orderBy: { issuedAt: "desc" },
  });

  if (!invoice) {
    return NextResponse.json({ error: "فاکتور یافت نشد" }, { status: 404 });
  }

  return NextResponse.json({
    number: invoice.number,
    customerName: invoice.customer.name,
    serviceTitle: invoice.items[0]?.service?.title ?? invoice.items[0]?.title ?? "خدمات فنی",
    totalAmount: invoice.totalAmount,
    paidAmount: invoice.paidAmount,
    remainingAmount: invoice.remainingAmount,
    paymentStatus: invoice.paymentStatus,
    warrantyDays: invoice.warrantyDays,
    issuedAt: invoice.issuedAt,
  });
}
