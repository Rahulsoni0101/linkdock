import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, icon, className, id: propId, ...props },
  ref
) {
  const autoId = useId();
  const id = propId ?? autoId;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-200",
            "focus:border-purple-500/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-purple-500/10",
            icon ? "pl-10" : undefined,
            error && "border-red-500/60 focus:border-red-500 focus:ring-red-500/10",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
});
