import { Sidebar } from "@/components/admin/Sidebar";
import { requireAdminSession } from "@/lib/auth-guard";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdminSession();

  return (
    <div className="flex min-h-screen bg-surface" dir="rtl">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <main className="p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
