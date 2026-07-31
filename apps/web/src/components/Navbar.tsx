"use client";

import { motion } from "framer-motion";
import { Anchor, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#how", label: "How it works" },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isDashboard = pathname.startsWith("/dashboard");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-white/5 bg-[#07070f]/80 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href={user ? "/dashboard" : "/"} className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 shadow-lg shadow-purple-600/30 transition-transform duration-300 group-hover:rotate-12">
            <Anchor className="h-4.5 w-4.5 text-white" />
          </span>
          <span className="text-lg font-bold tracking-tight text-white">
            Link<span className="gradient-text-static">Dock</span>
          </span>
        </Link>

        {!isDashboard && (
          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              {!isDashboard && (
                <Link
                  href="/dashboard"
                  className="rounded-xl bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-xl bg-white/5 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-3 py-2 text-sm text-zinc-300 transition-colors hover:text-white">
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-purple-600/25 transition-all hover:brightness-110"
              >
                Create your page
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-white md:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-white/5 bg-[#0a0a16]/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1 px-5 py-4">
            {!isDashboard &&
              links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            <div className="mt-2 flex gap-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-xl bg-white/5 px-4 py-2.5 text-center text-sm text-white"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="flex-1 rounded-xl bg-white/5 px-4 py-2.5 text-sm text-zinc-300"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-xl bg-white/5 px-4 py-2.5 text-center text-sm text-white"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2.5 text-center text-sm font-medium text-white"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
