import { prisma } from "@/lib/prisma";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await prisma.settings.findUnique({ where: { id: "singleton" } }).catch(() => null);

  const initial = {
    companyName: settings?.companyName ?? "ره گشا",
    phoneMain: settings?.phoneMain ?? "",
    phoneEmergency: settings?.phoneEmergency ?? "",
    whatsapp: settings?.whatsapp ?? "",
    address: settings?.address ?? "",
    workingHours: settings?.workingHours ?? "۲۴ ساعته - همه روزه",
    socialInstagram: settings?.socialInstagram ?? "",
  };

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">تنظیمات</h1>
        <p className="text-sm text-graphite/60 mt-1">اطلاعات تماس و تنظیمات عمومی وب‌سایت</p>
      </div>
      <div className="mt-6">
        <SettingsForm initial={initial} />
      </div>
    </div>
  );
}
