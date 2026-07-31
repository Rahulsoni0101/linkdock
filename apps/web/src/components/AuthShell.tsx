import { motion } from "framer-motion";
import { Anchor } from "lucide-react";
import Link from "next/link";
import { AuroraBackground } from "@/components/AuroraBackground";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-12">
      <AuroraBackground />

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-center"
        >
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 shadow-xl shadow-purple-600/30 transition-transform group-hover:rotate-12">
              <Anchor className="h-5 w-5 text-white" />
            </span>
            <span className="text-2xl font-bold tracking-tight text-white">
              Link<span className="gradient-text-static">Dock</span>
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="glass rounded-3xl p-8 shadow-2xl shadow-purple-950/30"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
