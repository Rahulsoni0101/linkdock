export function cn(...classes: (string | number | boolean | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function platformName(url: string): string {
  const host = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  })();
  if (host.includes("instagram")) return "Instagram";
  if (host.includes("twitter") || host.includes("x.com")) return "X";
  if (host.includes("tiktok")) return "TikTok";
  if (host.includes("youtube")) return "YouTube";
  if (host.includes("facebook")) return "Facebook";
  if (host.includes("linkedin")) return "LinkedIn";
  if (host.includes("github")) return "GitHub";
  if (host.includes("twitch")) return "Twitch";
  if (host.includes("spotify")) return "Spotify";
  if (host.includes("discord")) return "Discord";
  if (host.includes("telegram")) return "Telegram";
  if (host.includes("whatsapp")) return "WhatsApp";
  if (host.includes("mailto")) return "Email";
  return host.replace(/^www\./, "");
}

export const FONTS: Record<string, string> = {
  inter: "Inter, system-ui, sans-serif",
  space: "'Space Grotesk', system-ui, sans-serif",
  poppins: "Poppins, system-ui, sans-serif",
  montserrat: "Montserrat, system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
  serif: "'Playfair Display', Georgia, serif",
};

export const THEMES: {
  id: string;
  name: string;
  primary: string;
  accent: string;
  background: string;
  layout: "stack" | "grid" | "cards" | "minimal";
}[] = [
  {
    id: "aurora",
    name: "Aurora",
    primary: "#a855f7",
    accent: "#22d3ee",
    background: "linear-gradient(160deg,#0b0b1e 0%,#1a1035 45%,#0b2545 100%)",
    layout: "stack",
  },
  {
    id: "midnight",
    name: "Midnight",
    primary: "#6366f1",
    accent: "#818cf8",
    background: "linear-gradient(180deg,#020617 0%,#0f172a 100%)",
    layout: "stack",
  },
  {
    id: "sunset",
    name: "Sunset",
    primary: "#fb7185",
    accent: "#fbbf24",
    background: "linear-gradient(160deg,#1c0a2e 0%,#3b0f1f 55%,#4a1d0e 100%)",
    layout: "cards",
  },
  {
    id: "forest",
    name: "Forest",
    primary: "#34d399",
    accent: "#a3e635",
    background: "linear-gradient(160deg,#04120c 0%,#0b2a1d 100%)",
    layout: "stack",
  },
  {
    id: "ocean",
    name: "Ocean",
    primary: "#38bdf8",
    accent: "#2dd4bf",
    background: "linear-gradient(160deg,#020617 0%,#082f49 60%,#134e4a 100%)",
    layout: "minimal",
  },
  {
    id: "pearl",
    name: "Pearl",
    primary: "#e879f9",
    accent: "#f0abfc",
    background: "linear-gradient(160deg,#170a2e 0%,#31155c 100%)",
    layout: "cards",
  },
  {
    id: "terminal",
    name: "Terminal",
    primary: "#4ade80",
    accent: "#22d3ee",
    background: "#050805",
    layout: "minimal",
  },
  {
    id: "mono",
    name: "Mono",
    primary: "#e5e5e5",
    accent: "#a3a3a3",
    background: "#0a0a0a",
    layout: "minimal",
  },
];

export const THEME_BY_ID = Object.fromEntries(THEMES.map((t) => [t.id, t]));

export function relativeTime(dateStr: string): string {
  const d = new Date(dateStr);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString();
}

export function isValidUrl(value: string): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  return /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i.test(trimmed);
}
