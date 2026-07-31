"use client";

import { motion } from "framer-motion";
import {
  Anchor,
  BarChart3,
  ExternalLink,
  LayoutGrid,
  Link2,
  LogOut,
  Palette,
  QrCode,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ToastProvider } from "@/components/ui/Toast";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Links", icon: Link2 },
  { href: "/dashboard/customize", label: "Customize", icon: Palette },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/qrcode", label: "QR Code", icon: QrCode },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#07070f]">
        <div className="flex flex-col items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500">
            <Anchor className="h-6 w-6 animate-spin text-white" style={{ animationDuration: "3s" }} />
          </span>
          <p className="text-sm text-zinc-500">Loading your dock…</p>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-[#07070f]">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r border-white/5 bg-[#0a0a16]">
          <div className="flex items-center gap-2.5 px-5 py-5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 shadow-lg shadow-purple-600/30">
              <Anchor className="h-4.5 w-4.5 text-white" />
            </span>
            <span className="text-lg font-bold tracking-tight text-white">
              Link<span className="gradient-text-static">Dock</span>
            </span>
          </div>

          <nav className="mt-2 flex-1 space-y-1 px-3">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "text-white" : "text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/25 to-cyan-500/10 border border-purple-400/20"
                      transition={{ type: "spring", damping: 28, stiffness: 300 }}
                    />
                  )}
                  <item.icon className="relative h-4.5 w-4.5" />
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="space-y-1 border-t border-white/5 p-3">
            <Link
              href={`/${user.username}`}
              target="_blank"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ExternalLink className="h-4.5 w-4.5" />
              View my page
            </Link>
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-300 cursor-pointer"
            >
              <LogOut className="h-4.5 w-4.5" />
              Sign out
            </button>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="fixed inset-x-0 top-0 z-30 border-b border-white/5 bg-[#0a0a16]/95 backdrop-blur-lg lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500">
                <Anchor className="h-4 w-4 text-white" />
              </span>
              <span className="font-bold text-white">
                Link<span className="gradient-text-static">Dock</span>
              </span>
            </Link>
            <Link
              href={`/${user.username}`}
              target="_blank"
              className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-zinc-300"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              View
            </Link>
          </div>
          {/* Mobile nav */}
          <div className="no-scrollbar flex gap-1 overflow-x-auto px-3 pb-2">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-gradient-to-r from-purple-600/30 to-cyan-500/20 text-white"
                      : "text-zinc-500 hover:text-white"
                  )}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <main className="min-w-0 flex-1 overflow-x-hidden pl-0 pt-24 lg:pl-60 lg:pt-0">
          <div className="mx-auto max-w-5xl px-5 py-8">{children}</div>
        </main>
      </div>
    </ToastProvider>
  );
}
