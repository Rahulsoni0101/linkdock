"use client";

import { motion } from "framer-motion";
import { Anchor, Home } from "lucide-react";
import Link from "next/link";
import { AuroraBackground } from "@/components/AuroraBackground";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center">
      <AuroraBackground />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <p className="text-7xl font-extrabold gradient-text">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white">This dock is empty</h1>
        <p className="mt-2 max-w-sm text-sm text-zinc-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 transition-all hover:brightness-110"
          >
            <Home className="h-4 w-4" />
            Go home
          </Link>
          <Link
            href="/signup"
            className="glass flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <Anchor className="h-4 w-4" />
            Claim this name
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
