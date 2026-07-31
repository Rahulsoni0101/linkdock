"use client";

import { FONTS } from "@/lib/utils";
import type { ProfileSettings } from "@/lib/types";
import { cn } from "@/lib/utils";
import { API_URL } from "@/lib/api";

type LinkItem = {
  id: string;
  title: string;
  url: string;
  thumbnail: string | null;
  pinned: boolean;
};

type Props = {
  displayName: string | null;
  bio: string | null;
  avatar: string | null;
  profile: ProfileSettings;
  links: LinkItem[];
  socials: { platform: string; url: string }[];
  compact?: boolean;
  interactive?: boolean;
};

function backgroundStyle(profile: ProfileSettings): React.CSSProperties {
  const { backgroundType, backgroundValue } = profile;
  if (backgroundType === "image") {
    return { backgroundImage: `url(${backgroundValue})`, backgroundSize: "cover", backgroundPosition: "center" };
  }
  if (backgroundType === "color") return { backgroundColor: backgroundValue };
  return { background: backgroundValue };
}

export function PagePreview({
  displayName,
  bio,
  avatar,
  profile,
  links,
  socials,
  compact,
  interactive,
}: Props) {
  const font = FONTS[profile.font] || FONTS.inter;
  const primary = profile.primaryColor;
  const accent = profile.accentColor;

  const linkClass =
    profile.theme === "mono" || profile.theme === "terminal"
      ? "border border-white/15 bg-white/5"
      : "";

  return (
    <div
      className={cn("relative flex h-full min-h-full flex-col overflow-hidden", compact && "rounded-2xl border border-white/10")}
      style={{ ...backgroundStyle(profile), fontFamily: font }}
    >
      {profile.backgroundType === "gradient" && (
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ backgroundImage: `radial-gradient(circle at 20% 20%, ${primary}88, transparent 50%), radial-gradient(circle at 80% 80%, ${accent}88, transparent 50%)` }}
        />
      )}

      <div className="relative flex flex-1 flex-col items-center overflow-y-auto px-6 py-10 no-scrollbar">
        {/* Avatar */}
        <div
          className="grid place-items-center overflow-hidden text-3xl shadow-xl"
          style={{
            width: compact ? 76 : 96,
            height: compact ? 76 : 96,
            borderRadius: "50%",
            background: avatar ? undefined : `linear-gradient(135deg, ${primary}, ${accent})`,
            boxShadow: `0 8px 40px ${primary}55`,
          }}
        >
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="" className="h-full w-full object-cover" />
          ) : (
            <span>✨</span>
          )}
        </div>

        {/* Name + bio */}
        <p className="mt-4 text-xl font-bold" style={{ color: "#fff" }}>
          {displayName || "@creator"}
        </p>
        {bio && (
          <p className="mt-1 max-w-[280px] text-center text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
            {bio}
          </p>
        )}

        {/* Socials */}
        {profile.showSocial && socials.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {socials.map((s) => (
              <a
                key={s.platform}
                href={interactive ? s.url : undefined}
                target={interactive ? "_blank" : undefined}
                rel={interactive ? "noreferrer" : undefined}
                className="grid place-items-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs transition-transform hover:scale-105"
                style={{ color: "#fff" }}
              >
                {s.platform}
              </a>
            ))}
          </div>
        )}

        {/* Links */}
        <div className={cn("mt-6 flex w-full max-w-xs flex-1 flex-col", profile.theme === "grid" && "grid grid-cols-2 gap-2.5")}>
          {links.length === 0 && (
            <p className="py-8 text-center text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Your links will appear here
            </p>
          )}
          {links.map((link) => {
            const href = interactive ? `${API_URL}/api/s/${link.id}` : undefined;
            return (
              <a
                key={link.id}
                href={href}
                target={interactive ? "_blank" : undefined}
                rel={interactive ? "noreferrer" : undefined}
                className={cn(
                  "group relative mb-2.5 flex items-center overflow-hidden rounded-2xl px-4 py-3 backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02]",
                  profile.theme === "cards" || profile.theme === "grid"
                    ? "border border-white/15 bg-white/10"
                    : linkClass
                )}
                style={
                  profile.theme === "stack" || profile.theme === "minimal"
                    ? {
                        background: `linear-gradient(135deg, ${primary}cc, ${accent}99)`,
                        boxShadow: `0 4px 24px ${primary}44`,
                        border: "1px solid rgba(255,255,255,0.18)",
                      }
                    : undefined
                }
              >
                <span className="text-lg" style={{ color: "#fff" }}>{link.thumbnail ? "🖼️" : "🔗"}</span>
                <span className="ml-3 text-sm font-medium" style={{ color: "#fff" }}>
                  {link.title}
                </span>
                {link.pinned && (
                  <span className="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-[9px] uppercase tracking-wide" style={{ color: "#fff" }}>
                    top
                  </span>
                )}
              </a>
            );
          })}
        </div>

        {/* Footer */}
        {profile.showBranding && (
          <p className="mt-6 text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.45)" }}>
            ⚓ powered by LinkDock
          </p>
        )}
      </div>
    </div>
  );
}
