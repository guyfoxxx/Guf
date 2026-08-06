"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Droplets, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", { phone, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("شماره موبایل یا رمز عبور اشتباه است");
      return;
    }
    router.push("/admin");
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl2 bg-white p-8 shadow-glass">
        <div className="flex items-center gap-2 justify-center text-navy font-display font-bold text-lg">
          <span className="flex size-9 items-center justify-center rounded-xl2 bg-industrial-gradient text-white">
            <Droplets className="size-5" />
          </span>
          پنل مدیریت ره گشا
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">شماره موبایل</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
              placeholder="09123456789"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 font-semibold text-white hover:bg-graphite transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            ورود به پنل
          </button>
        </form>
      </div>
    </div>
  );
}
