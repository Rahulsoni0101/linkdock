"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import { createContext, useCallback, useContext, useState } from "react";

type Toast = { id: number; message: string; type: "success" | "error" | "info" };
type ToastCtx = { push: (message: string, type?: Toast["type"]) => void };

const ToastContext = createContext<ToastCtx | null>(null);

let counter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = ++counter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.95 }}
              transition={{ type: "spring", damping: 24, stiffness: 320 }}
              className="pointer-events-auto flex items-center gap-3 rounded-xl border border-white/10 bg-[#12121f]/95 px-4 py-3 shadow-xl backdrop-blur-md"
            >
              {t.type === "success" && <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-emerald-400" />}
              {t.type === "error" && <XCircle className="h-4.5 w-4.5 shrink-0 text-red-400" />}
              {t.type === "info" && <Info className="h-4.5 w-4.5 shrink-0 text-cyan-400" />}
              <p className="text-sm text-zinc-100">{t.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
