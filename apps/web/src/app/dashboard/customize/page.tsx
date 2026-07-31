"use client";

import { motion } from "framer-motion";
import { Check, Plus, Save, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { PagePreview } from "@/components/PagePreview";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { cn, FONTS, THEMES } from "@/lib/utils";
import type { ProfileSettings, SocialLink } from "@/lib/types";

const SOCIAL_PLATFORMS = [
  "Instagram",
  "X",
  "TikTok",
  "YouTube",
  "Facebook",
  "LinkedIn",
  "GitHub",
  "Twitch",
  "Spotify",
  "Discord",
  "Telegram",
  "WhatsApp",
];

const DEFAULT_PROFILE: ProfileSettings = {
  theme: "aurora",
  primaryColor: "#a855f7",
  accentColor: "#22d3ee",
  font: "inter",
  backgroundType: "gradient",
  backgroundValue: "linear-gradient(160deg,#0b0b1e 0%,#1a1035 45%,#0b2545 100%)",
  showSocial: true,
  showBranding: true,
  seoTitle: "",
  seoDescription: "",
};

export default function CustomizePage() {
  const { user, refresh } = useAuth();
  const { push } = useToast();
  const [profile, setProfile] = useState<ProfileSettings>(DEFAULT_PROFILE);
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newPlatform, setNewPlatform] = useState("Instagram");
  const [newUrl, setNewUrl] = useState("");

  const load = useCallback(async () => {
    try {
      const data = await api.get<{ profile: ProfileSettings; socials: SocialLink[] }>("/api/profile");
      setProfile({ ...DEFAULT_PROFILE, ...data.profile, seoTitle: data.profile?.seoTitle ?? "", seoDescription: data.profile?.seoDescription ?? "" });
      setSocials(data.socials);
    } catch {
      push("Failed to load profile", "error");
    } finally {
      setLoading(false);
    }
  }, [push]);

  useEffect(() => {
    load();
  }, [load]);

  const patch = (field: Partial<ProfileSettings>) =>
    setProfile((prev) => ({ ...prev, ...field }));

  const save = async () => {
    setSaving(true);
    try {
      await api.put("/api/profile", {
        theme: profile.theme,
        primaryColor: profile.primaryColor,
        accentColor: profile.accentColor,
        font: profile.font,
        backgroundType: profile.backgroundType,
        backgroundValue: profile.backgroundValue,
        showSocial: profile.showSocial,
        showBranding: profile.showBranding,
        seoTitle: profile.seoTitle || null,
        seoDescription: profile.seoDescription || null,
      });
      await api.put("/api/profile/socials", { socials });
      await refresh();
      push("Changes saved");
    } catch {
      push("Failed to save changes", "error");
    } finally {
      setSaving(false);
    }
  };

  const addSocial = () => {
    if (!newUrl.trim()) return;
    setSocials((prev) => [
      ...prev,
      { id: crypto.randomUUID(), platform: newPlatform, url: newUrl.trim(), position: prev.length },
    ]);
    setNewUrl("");
  };

  const updateSocial = (id: string, url: string) =>
    setSocials((prev) => prev.map((s) => (s.id === id ? { ...s, url } : s)));

  const removeSocial = (id: string) =>
    setSocials((prev) => prev.filter((s) => s.id !== id));

  const selectedTheme = THEMES.find((t) => t.id === profile.theme) || THEMES[0];

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500" />
      </div>
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-8">
      <div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white">Customize</h1>
            <p className="mt-1 text-sm text-zinc-500">Make your page unmistakably yours</p>
          </div>
          <Button onClick={save} loading={saving}>
            <Save className="h-4 w-4" />
            Save changes
          </Button>
        </div>

        {/* Themes */}
        <section className="mt-7">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Theme</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  patch({ theme: t.id, primaryColor: t.primary, accentColor: t.accent, backgroundValue: t.background });
                }}
                className={cn(
                  "group relative h-24 overflow-hidden rounded-2xl border p-3 text-left transition-all cursor-pointer",
                  profile.theme === t.id
                    ? "border-purple-400/60 ring-2 ring-purple-500/30"
                    : "border-white/10 hover:border-white/25"
                )}
                style={{ background: t.background }}
              >
                {profile.theme === t.id && (
                  <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-purple-500 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
                <span className="relative block h-2 w-8 rounded-full" style={{ background: t.primary }} />
                <span className="relative mt-2 block h-1.5 w-10 rounded-full bg-white/25" />
                <span className="relative mt-1 block h-1.5 w-8 rounded-full bg-white/15" />
                <span className="relative mt-3 block text-[11px] font-medium text-white/90">{t.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Colors */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Colors</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {[
              { key: "primaryColor" as const, label: "Primary color" },
              { key: "accentColor" as const, label: "Accent color" },
            ].map((c) => (
              <div key={c.key} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <input
                  type="color"
                  value={profile[c.key]}
                  onChange={(e) => patch({ [c.key]: e.target.value })}
                  className="h-10 w-10 cursor-pointer rounded-lg border border-white/10 bg-transparent"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{c.label}</p>
                  <input
                    value={profile[c.key]}
                    onChange={(e) => patch({ [c.key]: e.target.value })}
                    className="mt-0.5 w-full bg-transparent text-xs text-zinc-500 outline-none font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Font */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Font</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Object.entries(FONTS).map(([key, family]) => (
              <button
                key={key}
                onClick={() => patch({ font: key })}
                className={cn(
                  "rounded-xl border px-4 py-3 text-left transition-all cursor-pointer",
                  profile.font === key
                    ? "border-purple-400/60 bg-purple-500/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25"
                )}
                style={{ fontFamily: family }}
              >
                <p className="text-sm text-white">AaBb</p>
                <p className="mt-1 text-[10px] capitalize text-zinc-500">{key}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Background */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Background</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {["gradient", "color", "image"].map((type) => (
              <button
                key={type}
                onClick={() => patch({ backgroundType: type as ProfileSettings["backgroundType"] })}
                className={cn(
                  "rounded-full px-4 py-2 text-sm capitalize transition-all cursor-pointer",
                  profile.backgroundType === type
                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                    : "border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
                )}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <Input
              label={profile.backgroundType === "image" ? "Image URL" : profile.backgroundType === "color" ? "Color (hex)" : "CSS gradient"}
              value={profile.backgroundValue}
              onChange={(e) => patch({ backgroundValue: e.target.value })}
              placeholder={profile.backgroundType === "gradient" ? "linear-gradient(160deg,#0b0b1e,#1a1035)" : profile.backgroundType === "color" ? "#0a0a0a" : "https://…/bg.jpg"}
            />
          </div>
        </section>

        {/* Toggles */}
        <section className="mt-8 space-y-2.5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Page settings</h2>
          <Toggle
            checked={profile.showSocial}
            onChange={(v) => patch({ showSocial: v })}
            label="Show social icons"
            description="Display your social profile links under your bio"
          />
          <Toggle
            checked={profile.showBranding}
            onChange={(v) => patch({ showBranding: v })}
            label="Show LinkDock branding"
            description="Turn this off on the Pro plan for a fully clean page"
          />
        </section>

        {/* Social links */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Social links</h2>
          <div className="mt-3 space-y-2.5">
            {socials.map((s) => (
              <div key={s.id} className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-xs text-zinc-500">{s.platform}</span>
                <Input
                  value={s.url}
                  onChange={(e) => updateSocial(s.id, e.target.value)}
                  placeholder="https://instagram.com/you"
                />
                <button
                  onClick={() => removeSocial(s.id)}
                  className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <select
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value)}
                className="w-28 shrink-0 rounded-xl border border-white/10 bg-[#0d0d1c] px-2 py-2.5 text-xs text-white outline-none focus:border-purple-500/60"
              >
                {SOCIAL_PLATFORMS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <Input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://…" onKeyDown={(e) => e.key === "Enter" && addSocial()} />
              <Button variant="secondary" onClick={addSocial} className="shrink-0 px-3">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* SEO */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">SEO</h2>
          <div className="mt-3 space-y-3">
            <Input
              label="Page title"
              value={profile.seoTitle ?? ""}
              onChange={(e) => patch({ seoTitle: e.target.value })}
              placeholder={`${user?.username} — LinkDock`}
            />
            <Input
              label="Meta description"
              value={profile.seoDescription ?? ""}
              onChange={(e) => patch({ seoDescription: e.target.value })}
              placeholder="Everything about me, in one place"
            />
          </div>
        </section>

        <div className="mt-8">
          <Button onClick={save} loading={saving} size="lg">
            <Save className="h-4 w-4" />
            Save changes
          </Button>
        </div>
      </div>

      {/* Live preview */}
      <div className="mt-10 lg:mt-0">
        <div className="sticky top-8">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Live preview
          </p>
          <motion.div
            layout
            transition={{ type: "spring", damping: 26, stiffness: 240 }}
            className="mx-auto w-[320px] overflow-hidden rounded-[2.4rem] border border-white/10 p-2.5 shadow-2xl shadow-purple-950/40"
            style={{ background: selectedTheme.background }}
          >
            <div className="h-[560px] overflow-hidden rounded-[1.9rem]">
              <PagePreview
                displayName={user?.displayName ?? user?.username ?? "creator"}
                bio={user?.bio ?? null}
                avatar={user?.avatar ?? null}
                profile={profile}
                links={[
                  { id: "1", title: "🎧 Listen to my music", url: "#", thumbnail: null, pinned: true },
                  { id: "2", title: "📸 Instagram", url: "#", thumbnail: null, pinned: false },
                  { id: "3", title: "🛍️ Shop", url: "#", thumbnail: null, pinned: false },
                  { id: "4", title: "📧 Newsletter", url: "#", thumbnail: null, pinned: false },
                ]}
                socials={socials}
                compact
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
