"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  wide?: boolean;
};

export function Modal({ open, onClose, title, children, wide }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className={cn(
              "relative w-full rounded-2xl border border-white/10 bg-[#0d0d1c] p-6 shadow-2xl shadow-purple-950/40",
              wide ? "max-w-2xl" : "max-w-md"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
