"use client";

import { useEffect, useRef } from "react";
import { API_URL } from "@/lib/api";

export function ViewTracker({ username }: { username: string }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    fetch(`${API_URL}/api/analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, type: "view" }),
      keepalive: true,
    }).catch(() => {});
  }, [username]);
  return null;
}
