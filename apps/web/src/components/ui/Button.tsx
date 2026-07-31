import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-500/40 hover:brightness-110",
  secondary: "glass text-white hover:bg-white/10",
  ghost: "text-zinc-400 hover:text-white hover:bg-white/5",
  danger: "bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25",
  outline:
    "border border-white/15 text-white hover:border-white/30 hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5",
  md: "text-sm px-4 py-2.5 rounded-xl gap-2",
  lg: "text-base px-6 py-3.5 rounded-2xl gap-2.5",
};

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", size = "md", loading, children, disabled, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      )}
      {children}
    </button>
  );
});
