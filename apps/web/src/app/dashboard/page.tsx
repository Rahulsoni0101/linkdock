"use client";

import { Reorder } from "framer-motion";
import {
  ExternalLink,
  Link2,
  MousePointerClick,
  Pencil,
  Pin,
  Plus,
  Trash2,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { LinkEditor } from "@/components/dashboard/LinkEditor";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { cn, platformName } from "@/lib/utils";
import type { Link as LinkType } from "@/lib/types";

export default function DashboardPage() {
  const { user, refresh } = useAuth();
  const { push } = useToast();
  const [links, setLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<LinkType | null>(null);
  const [deleting, setDeleting] = useState<LinkType | null>(null);
  const [savingReorder, setSavingReorder] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await api.get<{ links: LinkType[] }>("/api/links");
      setLinks(data.links);
    } catch {
      push("Failed to load links", "error");
    } finally {
      setLoading(false);
    }
  }, [push]);

  useEffect(() => {
    load();
  }, [load]);

  const totalClicks = links.reduce((sum, l) => sum + l.clickCount, 0);
  const liveLinks = links.filter((l) => l.enabled).length;

  const handleSave = async (draft: {
    id?: string;
    title: string;
    url: string;
    thumbnail: string | null;
    enabled: boolean;
    pinned: boolean;
    scheduleStart: string | null;
    scheduleEnd: string | null;
  }) => {
    const body = {
      title: draft.title,
      url: draft.url,
      thumbnail: draft.thumbnail || undefined,
      enabled: draft.enabled,
      pinned: draft.pinned,
      scheduleStart: draft.scheduleStart || null,
      scheduleEnd: draft.scheduleEnd || null,
    };
    if (draft.id) {
      await api.put(`/api/links/${draft.id}`, body);
      push("Link updated");
    } else {
      await api.post("/api/links", body);
      push("Link added");
    }
    await load();
    await refresh();
  };

  const toggle = async (link: LinkType, field: "enabled" | "pinned") => {
    const next = { ...link, [field]: !link[field] };
    setLinks((prev) => prev.map((l) => (l.id === link.id ? next : l)));
    try {
      await api.put(`/api/links/${link.id}`, { [field]: !link[field] });
    } catch {
      setLinks((prev) => prev.map((l) => (l.id === link.id ? link : l)));
      push("Failed to update link", "error");
    }
  };

  const handleReorder = (next: LinkType[]) => {
    setLinks(next);
    setSavingReorder(true);
    api
      .post("/api/links/reorder", { order: next.map((l) => l.id) })
      .catch(() => push("Failed to save order", "error"))
      .finally(() => setSavingReorder(false));
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await api.delete(`/api/links/${deleting.id}`);
      setLinks((prev) => prev.filter((l) => l.id !== deleting.id));
      push("Link deleted");
      await refresh();
    } catch {
      push("Failed to delete link", "error");
    }
    setDeleting(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Your links</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Drag to reorder · your page lives at{" "}
            <Link
              href={`/${user?.username}`}
              target="_blank"
              className="font-medium text-purple-400 hover:underline"
            >
              linkdock.local/{user?.username} ↗
            </Link>
          </p>
        </div>
        <Button onClick={() => { setEditing(null); setEditorOpen(true); }}>
          <Plus className="h-4 w-4" />
          Add link
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "Total links", value: links.length, icon: Link2, color: "text-purple-400" },
          { label: "Live now", value: liveLinks, icon: Eye, color: "text-emerald-400" },
          { label: "All-time clicks", value: totalClicks, icon: MousePointerClick, color: "text-cyan-400" },
        ].map((s) => (
          <div
            key={s.label}
            className="glass rounded-2xl p-4 sm:p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-zinc-500">{s.label}</p>
              <s.icon className={cn("h-4 w-4", s.color)} />
            </div>
            <p className="mt-2 text-2xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Link list */}
      <div className="mt-6">
        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass h-20 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : links.length === 0 ? (
          <div className="glass flex flex-col items-center rounded-3xl px-6 py-16 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-purple-600/25 to-cyan-500/25">
              <Link2 className="h-7 w-7 text-purple-300" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">No links yet</h3>
            <p className="mt-1 max-w-sm text-sm text-zinc-500">
              Add your first link and your page goes live instantly. This is
              where it all starts.
            </p>
            <Button className="mt-6" onClick={() => { setEditing(null); setEditorOpen(true); }}>
              <Plus className="h-4 w-4" />
              Add your first link
            </Button>
          </div>
        ) : (
          <Reorder.Group
            axis="y"
            values={links}
            onReorder={handleReorder}
            className="space-y-3"
          >
            {links.map((link) => (
              <Reorder.Item
                key={link.id}
                value={link}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                whileDrag={{ scale: 1.02, zIndex: 10 }}
                className="glass group relative cursor-grab rounded-2xl transition-colors hover:border-purple-400/30 active:cursor-grabbing"
              >
                <div className="flex items-center gap-4 p-4">
                  {link.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={link.thumbnail}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-lg">
                      🔗
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-white">
                        {link.title}
                      </p>
                      {link.pinned && (
                        <span className="flex shrink-0 items-center gap-1 rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] font-medium text-purple-300">
                          <Pin className="h-2.5 w-2.5" /> pinned
                        </span>
                      )}
                      {!link.enabled && (
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
                          hidden
                        </span>
                      )}
                    </div>
                    <p className="truncate text-xs text-zinc-500">
                      {platformName(link.url)} · {link.clickCount} clicks
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hidden rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/5 hover:text-white sm:block"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => { setEditing(link); setEditorOpen(true); }}
                      className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/5 hover:text-cyan-300 cursor-pointer"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleting(link)}
                      className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* quick toggles */}
                <div className="flex items-center gap-4 border-t border-white/5 px-4 py-2.5">
                  <button
                    onClick={() => toggle(link, "pinned")}
                    className={cn(
                      "flex items-center gap-1.5 text-xs transition-colors cursor-pointer",
                      link.pinned ? "text-purple-300" : "text-zinc-500 hover:text-white"
                    )}
                  >
                    <Pin className="h-3 w-3" /> {link.pinned ? "Unpin" : "Pin"}
                  </button>
                  <button
                    onClick={() => toggle(link, "enabled")}
                    className={cn(
                      "flex items-center gap-1.5 text-xs transition-colors cursor-pointer",
                      link.enabled ? "text-emerald-400" : "text-zinc-500 hover:text-white"
                    )}
                  >
                    <span className={cn("h-2 w-2 rounded-full", link.enabled ? "bg-emerald-400" : "bg-zinc-600")} />
                    {link.enabled ? "Visible" : "Hidden"}
                  </button>
                  {savingReorder && (
                    <span className="ml-auto text-[10px] text-zinc-600">saving…</span>
                  )}
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>

      <LinkEditor
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        initial={editing}
        onSave={handleSave}
      />

      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Delete link?"
      >
        <p className="text-sm text-zinc-400">
          <span className="font-medium text-white">{deleting?.title}</span> will be
          permanently removed from your page.
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="secondary" onClick={() => setDeleting(null)} className="flex-1">
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete} className="flex-1">
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
