import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "غیرمجاز" }, { status: 401 });

  const [customers, requests, invoices, services, employees, areas, blogPosts] = await Promise.all([
    prisma.customer.findMany(),
    prisma.serviceRequest.findMany(),
    prisma.invoice.findMany({ include: { items: true, payments: true } }),
    prisma.service.findMany(),
    prisma.employee.findMany(),
    prisma.area.findMany(),
    prisma.blogPost.findMany(),
  ]);

  const dump = {
    generatedAt: new Date().toISOString(),
    customers,
    requests,
    invoices,
    services,
    employees,
    areas,
    blogPosts,
  };

  return new NextResponse(JSON.stringify(dump, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="rahgosha-backup-${Date.now()}.json"`,
    },
  });
}
