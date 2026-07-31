"use client";

import { KeyRound, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth";
import { ApiError } from "@/lib/api";

export default function SignupPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(username, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-white">Create your page</h1>
        <p className="mt-1 text-sm text-zinc-400">Free forever. No credit card.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Username"
          icon={<User className="h-4 w-4" />}
          placeholder="yourname"
          value={username}
          onChange={(e) => setUsername(e.target.value.replace(/\s/g, "").toLowerCase())}
          required
        />
        <Input
          label="Email"
          type="email"
          icon={<Mail className="h-4 w-4" />}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          icon={<KeyRound className="h-4 w-4" />}
          placeholder="Minimum 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
            {error}
          </p>
        )}

        <Button type="submit" loading={loading} className="w-full" size="lg">
          {loading ? "Creating…" : "Create my page"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-purple-400 hover:text-purple-300">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
