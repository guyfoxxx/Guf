import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { ensureUploadsGalleryDir, extensionForMimeType, uploadsGalleryDir } from "@/lib/uploads";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per image

async function saveImage(file: File): Promise<string> {
  const ext = extensionForMimeType(file.type);
  if (!ext) {
    throw new Error("فرمت تصویر مجاز نیست (فقط jpg, png, webp, gif)");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("حجم تصویر نباید بیشتر از ۵ مگابایت باشد");
  }

  const dir = await ensureUploadsGalleryDir();
  const filename = `${crypto.randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, filename), buffer);

  return `/api/uploads/gallery/${filename}`;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "غیرمجاز" }, { status: 401 });

  const form = await req.formData();
  const title = String(form.get("title") ?? "").trim();
  const before = form.get("before");
  const after = form.get("after");

  if (title.length < 2) {
    return NextResponse.json({ error: "عنوان را وارد کنید" }, { status: 400 });
  }
  if (!(before instanceof File) || before.size === 0) {
    return NextResponse.json({ error: "تصویر قبل از اجرا الزامی است" }, { status: 400 });
  }
  if (!(after instanceof File) || after.size === 0) {
    return NextResponse.json({ error: "تصویر پس از اجرا الزامی است" }, { status: 400 });
  }

  try {
    const [beforeUrl, afterUrl] = await Promise.all([saveImage(before), saveImage(after)]);

    const item = await prisma.galleryItem.create({
      data: { title, beforeImg: beforeUrl, afterImg: afterUrl },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "بارگذاری تصویر با خطا مواجه شد";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "غیرمجاز" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "شناسه الزامی است" }, { status: 400 });

  const item = await prisma.galleryItem.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "یافت نشد" }, { status: 404 });

  await prisma.galleryItem.delete({ where: { id } });

  // Best-effort cleanup of the files on disk; DB row is already gone either way.
  for (const url of [item.beforeImg, item.afterImg]) {
    if (url?.startsWith("/api/uploads/gallery/")) {
      const filename = url.replace("/api/uploads/gallery/", "");
      fs.unlink(path.join(uploadsGalleryDir(), filename)).catch(() => {});
    }
  }

  return NextResponse.json({ ok: true });
}
