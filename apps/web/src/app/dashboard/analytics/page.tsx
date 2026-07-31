"use client";

import { motion } from "framer-motion";
import { Eye, MousePointerClick, Smartphone, Monitor, Tablet } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import type { AnalyticsSummary } from "@/lib/types";

const DEVICE_ICONS: Record<string, React.ElementType> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

export default function AnalyticsPage() {
  const { push } = useToast();
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const summary = await api.get<AnalyticsSummary>("/api/analytics/summary");
      setData(summary);
    } catch {
      push("Failed to load analytics", "error");
    } finally {
      setLoading(false);
    }
  }, [push]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500" />
      </div>
    );
  }

  const chartData = (data?.chart ?? []).map((d) => ({
    date: d.date.slice(5),
    views: d.views,
    clicks: d.clicks,
  }));

  const ctr = data && data.views > 0 ? ((data.clicks / data.views) * 100).toFixed(1) : "0";

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-zinc-500">Last 30 days · refreshes automatically</p>
      </div>

      {/* KPI cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 text-purple-400">
            <Eye className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">Page views</span>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{data?.views.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="glass rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 text-cyan-400">
            <MousePointerClick className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">Clicks</span>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{data?.clicks.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="glass rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="text-xs uppercase tracking-wider">CTR</span>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{ctr}%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="glass rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 text-amber-400">
            <span className="text-xs uppercase tracking-wider">Top device</span>
          </div>
          <p className="mt-2 text-3xl font-bold capitalize text-white">
            {data?.devices.sort((a, b) => b.count - a.count)[0]?.device ?? "—"}
          </p>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="glass mt-6 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Traffic</h2>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-purple-300">
              <span className="h-2 w-2 rounded-full bg-purple-500" /> views
            </span>
            <span className="flex items-center gap-1.5 text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-500" /> clicks
            </span>
          </div>
        </div>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="date" tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#12121f",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  color: "#fff",
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="views" stroke="#a855f7" strokeWidth={2} fill="url(#gViews)" />
              <Area type="monotone" dataKey="clicks" stroke="#22d3ee" strokeWidth={2} fill="url(#gClicks)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Top links */}
        <div className="glass rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white">Top links</h2>
          <div className="mt-4 space-y-3">
            {(data?.topLinks ?? []).length === 0 && (
              <p className="py-6 text-center text-sm text-zinc-500">No clicks yet — share your page to get started</p>
            )}
            {data?.topLinks.map((l, i) => (
              <div key={l.url} className="flex items-center gap-3">
                <span className="w-5 text-sm font-bold text-zinc-600">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{l.title}</p>
                  <p className="truncate text-xs text-zinc-600">{l.url}</p>
                </div>
                <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-300">
                  {l.event_clicks} clicks
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div className="glass rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white">Devices</h2>
          <div className="mt-4 space-y-3">
            {(data?.devices ?? []).map((d) => {
              const Icon = DEVICE_ICONS[d.device] ?? Smartphone;
              const total = data?.devices.reduce((s, x) => s + x.count, 0) || 1;
              const pct = Math.round((d.count / total) * 100);
              return (
                <div key={d.device}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <Icon className="h-4 w-4 text-zinc-500" />
                      <span className="capitalize">{d.device}</span>
                    </span>
                    <span className="text-zinc-400">
                      {d.count} · {pct}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                    />
                  </div>
                </div>
              );
            })}
            {(data?.devices ?? []).length === 0 && (
              <p className="py-6 text-center text-sm text-zinc-500">No data yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
