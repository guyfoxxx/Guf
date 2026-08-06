import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { services } from "../src/lib/services-data";
import { areas } from "../src/lib/areas-data";
import { faqs } from "../src/lib/faq-data";
import { blogPosts } from "../src/lib/blog-data";

const prisma = new PrismaClient();

async function main() {
  console.log("در حال ایجاد کاربر مدیر...");
  const adminPhone = process.env.SEED_ADMIN_PHONE ?? "09120000000";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "RahGosha@1403";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { phone: adminPhone },
    update: {},
    create: {
      name: "مدیر سیستم",
      phone: adminPhone,
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  console.log("در حال ایجاد مناطق تحت پوشش...");
  for (const a of areas) {
    await prisma.area.upsert({
      where: { slug: a.slug },
      update: { name: a.name, province: a.province, seoTitle: a.seoTitle, seoDesc: a.seoDesc, body: a.body },
      create: {
        slug: a.slug,
        name: a.name,
        province: a.province,
        seoTitle: a.seoTitle,
        seoDesc: a.seoDesc,
        body: a.body,
      },
    });
  }

  console.log("در حال ایجاد خدمات...");
  for (const [i, s] of services.entries()) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        shortDesc: s.shortDesc,
        fullDesc: s.fullDesc,
        priceMin: s.priceMin,
        priceMax: s.priceMax,
        advantages: s.advantages,
        process: s.process,
        faq: s.faq,
        seoTitle: s.seoTitle,
        seoDesc: s.seoDesc,
        order: i,
      },
      create: {
        slug: s.slug,
        title: s.title,
        shortDesc: s.shortDesc,
        fullDesc: s.fullDesc,
        priceMin: s.priceMin,
        priceMax: s.priceMax,
        advantages: s.advantages,
        process: s.process,
        faq: s.faq,
        seoTitle: s.seoTitle,
        seoDesc: s.seoDesc,
        order: i,
      },
    });
  }

  console.log("در حال ایجاد پرسش‌های متداول...");
  for (const [i, f] of faqs.entries()) {
    const existing = await prisma.faq.findFirst({ where: { question: f.question } });
    if (!existing) {
      await prisma.faq.create({ data: { question: f.question, answer: f.answer, order: i } });
    }
  }

  console.log("در حال ایجاد مقالات بلاگ...");
  for (const p of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        category: p.category,
        tags: p.tags,
        seoTitle: p.seoTitle,
        seoDesc: p.seoDesc,
        publishedAt: new Date(p.publishedAt),
      },
      create: {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        category: p.category,
        tags: p.tags,
        seoTitle: p.seoTitle,
        seoDesc: p.seoDesc,
        publishedAt: new Date(p.publishedAt),
      },
    });
  }

  console.log("در حال ایجاد تنظیمات پیش‌فرض...");
  await prisma.settings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      companyName: "ره گشا",
      phoneMain: process.env.NEXT_PUBLIC_PHONE_MAIN ?? "02100000000",
      phoneEmergency: process.env.NEXT_PUBLIC_PHONE_EMERGENCY ?? "09198814970",
      whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "989198814970",
      address: "تهران، ایران",
      workingHours: "۲۴ ساعته - همه روزه",
    },
  });

  console.log(`تمام شد. برای ورود به پنل مدیریت از موبایل ${adminPhone} و رمز عبور تنظیم‌شده استفاده کنید.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
