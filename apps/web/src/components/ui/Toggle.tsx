import { cn } from "@/lib/utils";

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  description?: string;
};

export function Toggle({ checked, onChange, label, description }: Props) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-colors hover:bg-white/[0.06] cursor-pointer"
    >
      <div>
        {label && <p className="text-sm font-medium text-white">{label}</p>}
        {description && <p className="mt-0.5 text-xs text-zinc-500">{description}</p>}
      </div>
      <span
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300",
          checked ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-white/10"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </span>
    </button>
  );
}
