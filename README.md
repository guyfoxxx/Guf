# ره گشا (rahgosha.top)

پلتفرم مدیریت خدمات فنی — لوله‌بازکنی، تخلیه چاه، حفر چاه و لوله‌کشی اضطراری.
Next.js 15 (App Router) · TypeScript · Tailwind CSS · Prisma · PostgreSQL · NextAuth

---

## چیزی که در این پروژه آماده است

**سایت عمومی (۹ صفحه + صفحات داینامیک):**
Home · Services (+ ۱۱ صفحه تفصیلی خدمت با قیمت، مزایا، فرآیند، FAQ و SEO) ·
Emergency Request · About · Projects · Blog (+ صفحه هر مقاله) · FAQ · Contact ·
Invoice Search (`/invoice`) · صفحات شهری برای SEO (`/areas/[city]`)

**پنل مدیریت (`/admin`, پشت NextAuth):**
Dashboard آماری · مشتریان · درخواست‌ها (تغییر وضعیت آنی) · فاکتورها (+ صدور فاکتور جدید) ·
خدمات · کارکنان · مناطق · گالری قبل/بعد · بلاگ · گزارش‌ها · پشتیبان‌گیری (JSON + خروجی اکسل) · تنظیمات

**زیرساخت:**
مدل کامل Prisma (User, Customer, ServiceRequest, Invoice, InvoiceItem, Payment, Employee,
Service, Area, GalleryItem, BlogPost, Faq, Review, Settings, AuditLog) ·
احراز هویت NextAuth (Credentials + bcrypt) · اسکیمای Zod برای هر فرم ·
Schema.org (LocalBusiness/Service/FAQ) + OpenGraph + Sitemap + Robots ·
Manifest برای نصب PWA · Rate limiting روی فرم درخواست · اسکریپت seed برای داده‌های واقعی اولیه

## ⚠️ چیزی که هنوز نیاز به راه‌اندازی شما دارد

این پروژه به‌صورت کامل نوشته شده، اما **در محیطی بدون دسترسی به اینترنت ساخته شده** پس
`npm install` روی آن اجرا نشده و به دیتابیس واقعی وصل نشده است. قبل از اجرا:

1. **دیتابیس واقعی** (PostgreSQL) وصل کنید — بدون آن، پنل مدیریت خالی نمایش داده می‌شود (نه خراب، فقط بدون داده).
2. **پیامک (SMS)**: کد ارسال پیامک به‌صورت TODO در `src/app/api/requests/route.ts` گذاشته شده — باید به یک درگاه ایرانی (کاوه‌نگار، ملی‌پیامک، sms.ir) وصل شود.
3. **تصاویر واقعی**: `public/icon-192.png`, `icon-512.png` و `og-cover.jpg` به‌صورت گرافیک ساده و برندی ساخته شده‌اند (نه عکس واقعی). طبق بریف طراحی، هیرو باید عکس/ویدیوی واقعی تکنسین و تجهیزات داشته باشد — این تصاویر را در `public/` و کامپوننت `Hero` جایگزین کنید.
4. **PWA کامل**: مانیفست و آیکن‌ها آماده است؛ اگر Service Worker آفلاین هم می‌خواهید، پکیج `next-pwa` در `package.json` هست ولی هنوز به `next.config.ts` متصل نشده.

## نصب و راه‌اندازی

```bash
npm install

# یک فایل .env بسازید (از .env.example کپی کنید) و DATABASE_URL و NEXTAUTH_SECRET را ست کنید
cp .env.example .env

# ساخت جدول‌ها در دیتابیس
npm run db:migrate

# بارگذاری داده‌های اولیه واقعی (خدمات، مناطق، FAQ، مقالات، یک کاربر مدیر)
npm run db:seed

# اجرا در حالت توسعه
npm run dev
```

بعد از seed، برای ورود به `/admin/login` از موبایل `09120000000` و رمز `RahGosha@1403`
استفاده کنید (یا مقادیر `SEED_ADMIN_PHONE` / `SEED_ADMIN_PASSWORD` در `.env` را قبل از seed تغییر دهید).
**بعد از اولین ورود، رمز عبور مدیر را حتماً از دیتابیس یا یک صفحه تغییر رمز (که باید اضافه کنید) عوض کنید.**

## گالری قبل/بعد (آپلود عکس توسط ادمین)

از پنل مدیریت → «گالری قبل و بعد» می‌توانید برای هر پروژه یک عکس «قبل از اجرا»
و یک عکس «پس از اجرا» + عنوان آپلود کنید. عکس‌ها در پوشه‌ی `uploads/gallery`
(در ریشه‌ی پروژه روی سرور، **خارج از** `public/`) ذخیره می‌شوند تا هنگام
Deploy بعدی (که پوشه‌ی `public/` را از نو کپی می‌کند) پاک نشوند، و از مسیر
`/api/uploads/gallery/...` سرو می‌شوند. حداکثر حجم هر عکس ۵ مگابایت
(jpg/png/webp/gif). صفحه‌ی اصلی و «نمونه کارها» به‌صورت خودکار همین عکس‌های
واقعی را نشان می‌دهند؛ تا وقتی چیزی آپلود نشده، جای‌گذارهای قبلی نمایش داده
می‌شوند.

**نکته سرور:** مطمئن شوید کاربر PM2 اجازه‌ی نوشتن در `APP_DIR/uploads` را
دارد (پوشه در اولین آپلود خودش ساخته می‌شود).

## دستورات مفید

| دستور | کاربرد |
|---|---|
| `npm run dev` | اجرای سرور توسعه |
| `npm run build` / `npm run start` | ساخت و اجرای نسخه production |
| `npm run db:migrate` | ساخت/به‌روزرسانی جدول‌های دیتابیس |
| `npm run db:seed` | پر کردن دیتابیس با داده‌های واقعی اولیه |
| `npm run db:studio` | مشاهده و ویرایش دیتابیس با Prisma Studio |

## ساختار پروژه

```
src/app/            صفحات (App Router)
src/app/admin/      پنل مدیریت (پشت احراز هویت)
src/app/api/        API Routeها
src/components/     کامپوننت‌های UI, layout, admin
src/lib/            prisma client, auth, zod schemas, داده‌های استاتیک سئو، jalali, utils
prisma/schema.prisma مدل کامل دیتابیس
prisma/seed.ts       اسکریپت بارگذاری داده اولیه
```

## استقرار (Deploy)

سازگار با Vercel، یا هر سرور Node.js. قبل از build مطمئن شوید:
- `DATABASE_URL` به یک PostgreSQL واقعی (مثلاً Neon, Supabase, یا سرور خودتان) وصل است.
- `NEXTAUTH_SECRET` با `openssl rand -base64 32` ساخته و ست شده.
- `NEXT_PUBLIC_SITE_URL` روی `https://rahgosha.top` تنظیم است (برای متادیتا و sitemap).
# Hh
# Hh
# Guf
