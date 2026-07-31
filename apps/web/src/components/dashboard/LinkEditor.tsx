"use client";

import { CalendarClock, Link2, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Toggle } from "@/components/ui/Toggle";
import { isValidUrl } from "@/lib/utils";

type Draft = {
  id?: string;
  title: string;
  url: string;
  thumbnail: string | null;
  enabled: boolean;
  pinned: boolean;
  scheduleStart: string | null;
  scheduleEnd: string | null;
};

type Props = {
  open: boolean;
  onClose: () => void;
  initial?: Draft | null;
  onSave: (draft: Draft) => Promise<void>;
};

export function LinkEditor({ open, onClose, initial, onSave }: Props) {
  const [draft, setDraft] = useState<Draft>({
    title: "",
    url: "",
    thumbnail: null,
    enabled: true,
    pinned: false,
    scheduleStart: null,
    scheduleEnd: null,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setDraft(
        initial ?? {
          title: "",
          url: "",
          thumbnail: null,
          enabled: true,
          pinned: false,
          scheduleStart: null,
          scheduleEnd: null,
        }
      );
      setError("");
    }
  }, [open, initial]);

  const submit = async () => {
    if (!draft.title.trim()) return setError("Title is required");
    if (!isValidUrl(draft.url)) return setError("Enter a valid URL (e.g. example.com)");
    setSaving(true);
    setError("");
    try {
      await onSave(draft);
      onClose();
    } catch {
      setError("Failed to save link. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={initial?.id ? "Edit link" : "Add a link"}>
      <div className="space-y-4">
        <Input
          label="Title"
          placeholder="My awesome link"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          autoFocus
        />
        <Input
          label="URL"
          icon={<Link2 className="h-4 w-4" />}
          placeholder="youtube.com/@you"
          value={draft.url}
          onChange={(e) => setDraft({ ...draft, url: e.target.value })}
        />
        <Input
          label="Thumbnail image URL (optional)"
          icon={<ImageIcon className="h-4 w-4" />}
          placeholder="https://…/cover.jpg"
          value={draft.thumbnail ?? ""}
          onChange={(e) => setDraft({ ...draft, thumbnail: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Publish from"
            type="datetime-local"
            icon={<CalendarClock className="h-4 w-4" />}
            value={draft.scheduleStart ?? ""}
            onChange={(e) => setDraft({ ...draft, scheduleStart: e.target.value })}
          />
          <Input
            label="Expire at"
            type="datetime-local"
            icon={<CalendarClock className="h-4 w-4" />}
            value={draft.scheduleEnd ?? ""}
            onChange={(e) => setDraft({ ...draft, scheduleEnd: e.target.value })}
          />
        </div>

        <div className="space-y-2.5">
          <Toggle
            checked={draft.enabled}
            onChange={(v) => setDraft({ ...draft, enabled: v })}
            label="Enabled"
            description="Hidden links don't appear on your public page"
          />
          <Toggle
            checked={draft.pinned}
            onChange={(v) => setDraft({ ...draft, pinned: v })}
            label="Pin to top"
            description="Highlight your most important link"
          />
        </div>

        {error && (
          <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="flex gap-3 pt-1">
          <Button variant="secondary" onClick={onClose} className="flex-1" disabled={saving}>
            Cancel
          </Button>
          <Button onClick={submit} loading={saving} className="flex-1">
            {initial?.id ? "Save changes" : "Add link"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
