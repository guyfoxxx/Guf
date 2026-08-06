import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serviceRequestSchema } from "@/lib/schema";
import { generateRequestCode } from "@/lib/utils";

// Simple in-memory rate limiter (per-process). For production, replace with
// a durable store (Redis) behind the reverse proxy / edge middleware.
const requestLog = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > MAX_REQUESTS;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "تعداد درخواست‌ها بیش از حد مجاز است. لطفاً کمی صبر کنید." },
      { status: 429 }
    );
  }

  const body = await req.json();
  const parsed = serviceRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  try {
    const customer = await prisma.customer.upsert({
      where: { phone: data.phone },
      update: { name: data.name, address: data.address },
      create: { name: data.name, phone: data.phone, address: data.address },
    });

    const service = await prisma.service.findUnique({ where: { slug: data.serviceId } });

    const request = await prisma.serviceRequest.create({
      data: {
        code: generateRequestCode(),
        customerId: customer.id,
        name: data.name,
        phone: data.phone,
        address: data.address,
        serviceId: service?.id,
        description: data.description,
        urgency: data.urgency,
        preferredTime: data.preferredTime ? new Date(data.preferredTime) : undefined,
      },
    });

    // TODO: integrate SMS provider here to notify the customer + on-call team.
    // await sendSms(data.phone, `درخواست شما با کد ${request.code} ثبت شد.`)

    return NextResponse.json({ code: request.code }, { status: 201 });
  } catch (err) {
    console.error("Failed to create service request", err);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
