"use client";

import { motion } from "framer-motion";
import { Check, Copy, Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/lib/auth";
import { API_URL } from "@/lib/api";

export default function QRCodePage() {
  const { user } = useAuth();
  const { push } = useToast();
  const [copied, setCopied] = useState(false);

  const pageUrl = `${window.location.origin}/${user?.username}`;
  const qrUrl = `${API_URL}/api/qr/${user?.username}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      push("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      push("Failed to copy", "error");
    }
  };

  const download = () => {
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = `${user?.username}-qr.png`;
    a.click();
    push("QR code downloaded");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">QR Code</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Scan to open your page — perfect for cards, posters and packaging
      </p>

      <div className="mt-8 flex flex-col items-center gap-8 lg:flex-row lg:items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="glass rounded-3xl p-8"
        >
          <div className="rounded-2xl bg-white p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl}
              alt={`QR code for ${user?.username}`}
              className="h-56 w-56"
            />
          </div>
          <p className="mt-4 text-center text-xs text-zinc-500">
            linkdock.local/{user?.username}
          </p>
        </motion.div>

        <div className="w-full max-w-sm space-y-3">
          <div className="glass rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-zinc-500">Your page URL</p>
            <p className="mt-2 truncate text-sm font-medium text-white">{pageUrl}</p>
            <div className="mt-4 flex gap-2">
              <Button onClick={copy} variant="secondary" className="flex-1">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy link"}
              </Button>
              <Button onClick={download} className="flex-1">
                <Download className="h-4 w-4" />
                Download PNG
              </Button>
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-zinc-500">Pro tip</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Print this QR on business cards, product packaging or flyers to drive
              offline traffic straight to your page. You can track every scan as a
              page view in your analytics.
            </p>
            <a
              href={pageUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center gap-2 text-sm font-medium text-purple-400 hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Open your page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
