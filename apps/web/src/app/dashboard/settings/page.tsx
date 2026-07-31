"use client";

import { KeyRound, Save, Trash2, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function SettingsPage() {
  const { user, refresh, logout } = useAuth();
  const { push } = useToast();

  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [avatar, setAvatar] = useState(user?.avatar ?? "");
  const [username, setUsername] = useState(user?.username ?? "");
  const [saving, setSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwSaving, setPwSaving] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const saveProfile = async () => {
    setSaving(true);
    try {
      await api.put("/api/account", {
        displayName,
        bio,
        avatar: avatar || null,
        username,
      });
      await refresh();
      push("Profile saved");
    } catch (e) {
      push(e instanceof Error ? e.message : "Failed to save profile", "error");
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    setPwSaving(true);
    try {
      await api.put("/api/account/password", {
        currentPassword,
        newPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      push("Password updated");
    } catch (e) {
      push(e instanceof Error ? e.message : "Failed to update password", "error");
    } finally {
      setPwSaving(false);
    }
  };

  const deleteAccount = async () => {
    setDeleting(true);
    try {
      await api.delete("/api/account");
      logout();
      window.location.href = "/";
    } catch {
      push("Failed to delete account", "error");
      setDeleting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <p className="mt-1 text-sm text-zinc-500">Manage your profile and account</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Profile */}
        <section className="glass rounded-2xl p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <User className="h-4 w-4 text-purple-400" />
            Profile
          </h2>
          <div className="mt-5 space-y-4">
            <Input
              label="Display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name or brand"
            />
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={200}
                rows={3}
                placeholder="A short line about you"
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-purple-500/60 focus:ring-4 focus:ring-purple-500/10"
              />
              <p className="mt-1 text-right text-xs text-zinc-600">{bio.length}/200</p>
            </div>
            <Input
              label="Avatar image URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://…/avatar.jpg"
            />
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/\s/g, "").toLowerCase())}
              placeholder="yourname"
            />
            <Button onClick={saveProfile} loading={saving}>
              <Save className="h-4 w-4" />
              Save profile
            </Button>
          </div>
        </section>

        {/* Password */}
        <section className="glass rounded-2xl p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <KeyRound className="h-4 w-4 text-cyan-400" />
            Password
          </h2>
          <div className="mt-5 space-y-4">
            <Input
              label="Current password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
            />
            <Input
              label="New password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
            />
            <Button onClick={changePassword} loading={pwSaving} variant="secondary">
              <KeyRound className="h-4 w-4" />
              Update password
            </Button>
          </div>
        </section>
      </div>

      {/* Danger zone */}
      <section className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6">
        <h2 className="text-sm font-semibold text-red-300">Danger zone</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Deleting your account removes your page, links and analytics permanently.
        </p>
        <Button
          variant="danger"
          className="mt-4"
          onClick={() => setConfirmDelete(true)}
        >
          <Trash2 className="h-4 w-4" />
          Delete account
        </Button>
      </section>

      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete account?">
        <p className="text-sm text-zinc-400">
          This action is permanent. Your page at{" "}
          <span className="font-medium text-white">{user?.username}</span> will be
          taken down immediately and cannot be recovered.
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="secondary" onClick={() => setConfirmDelete(false)} className="flex-1">
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteAccount} loading={deleting} className="flex-1">
            Delete forever
          </Button>
        </div>
      </Modal>
    </div>
  );
}
