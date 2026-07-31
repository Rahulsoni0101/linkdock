"use client";

import { motion } from "framer-motion";
import {
  Anchor,
  BarChart3,
  CalendarClock,
  Globe,
  Link2,
  Palette,
  QrCode,
  Rocket,
  Sparkles,
  Store,
  Users,
  Wand2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

function BioMockup() {
  const links = [
    { label: "🎧 New single out now", sub: "Listen on all platforms", live: true },
    { label: "📸 Instagram", sub: "Daily behind the scenes", live: false },
    { label: "🛍️ My store", sub: "Limited merch drop", live: true },
    { label: "📧 Newsletter", sub: "Join 12k+ readers", live: false },
    { label: "🎬 YouTube", sub: "Weekly videos", live: false },
  ];
  return (
    <div className="relative mx-auto w-[300px] rounded-[2.6rem] border border-white/10 bg-[#0b0b18] p-3 shadow-2xl shadow-purple-950/50 sm:w-[330px]">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-b from-purple-950/60 via-[#0d0d1d] to-[#0d0d1d] p-6">
        <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 p-[2px]">
            <div className="grid h-full w-full place-items-center rounded-full bg-[#141428] text-2xl">
              🚀
            </div>
          </div>
          <p className="mt-3 text-sm font-semibold text-white">Nova</p>
          <p className="mt-1 text-[11px] text-zinc-400">Musician · Creator · Dreamer</p>

          <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-500">
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">@nova</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">@nova.music</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">linkdock.gg/nova</span>
          </div>
        </div>

        <div className="relative mt-5 flex flex-col gap-2.5">
          {links.map((l, i) => (
            <motion.div
              key={l.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.12, duration: 0.4 }}
              className={cn(
                "rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 backdrop-blur-sm transition-colors hover:bg-white/[0.09]",
                l.live && "border-purple-400/30"
              )}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-white">{l.label}</p>
                {l.live && (
                  <span className="flex h-1.5 w-1.5">
                    <span className="relative inline-flex h-full w-full rounded-full bg-emerald-400">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    </span>
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-[10px] text-zinc-500">{l.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-4 flex items-center justify-center gap-2 text-[10px] text-zinc-500">
          {["▶", "♪", "✉", "🎬"].map((s) => (
            <span
              key={s}
              className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/5"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: Link2,
    title: "Unlimited links",
    desc: "Add as many links as you want — free. Reorder with drag & drop, pin your best content, hide seasonal links without deleting them.",
    color: "from-purple-500 to-fuchsia-400",
  },
  {
    icon: Palette,
    title: "Stunning themes",
    desc: "8 hand-crafted themes plus full control over colors, fonts and backgrounds. Make your page unmistakably yours.",
    color: "from-cyan-400 to-sky-500",
  },
  {
    icon: BarChart3,
    title: "Deep analytics",
    desc: "Track views, clicks, referrers and devices. Know exactly which links convert and where your traffic comes from.",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: QrCode,
    title: "QR codes",
    desc: "Generate a QR code for your page instantly — perfect for business cards, posters, packaging and print.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: CalendarClock,
    title: "Link scheduling",
    desc: "Schedule links to appear and expire automatically. Perfect for launches, drops and limited-time promos.",
    color: "from-rose-400 to-pink-500",
  },
  {
    icon: Store,
    title: "Zero-commission store",
    desc: "Sell digital products and collect tips with 0% platform fees. We only make money when you upgrade, never off your sales.",
    color: "from-indigo-400 to-violet-500",
  },
  {
    icon: Users,
    title: "Audience capture",
    desc: "Embed forms to collect emails and phone numbers directly on your page. Build your own audience, not ours.",
    color: "from-lime-400 to-green-500",
  },
  {
    icon: Globe,
    title: "Your own domain",
    desc: "Point a custom domain at your page. Fully branded, no shared linktr-style URL required.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: Wand2,
    title: "Smart routing",
    desc: "Redirect visitors by country, device or time of day. Send every visitor to the offer most likely to convert.",
    color: "from-fuchsia-400 to-purple-500",
  },
];

const platforms = ["Instagram", "TikTok", "YouTube", "X / Twitter", "LinkedIn", "Twitch", "Spotify", "Snapchat", "Pinterest", "Facebook"];

const pricing = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Everything you need to launch",
    features: ["Unlimited links", "8 beautiful themes", "Basic analytics", "QR code", "Link scheduling", "Social icons"],
    cta: "Start for free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$6",
    period: "/month",
    desc: "For creators who mean business",
    features: [
      "Everything in Free",
      "Custom domain",
      "Deep analytics + referrers",
      "Remove LinkDock branding",
      "Audience capture forms",
      "Custom colors & fonts",
      "Zero commission forever",
    ],
    cta: "Go Pro",
    highlight: true,
  },
  {
    name: "Teams",
    price: "$15",
    period: "/month",
    desc: "For agencies & multi-brand",
    features: [
      "Everything in Pro",
      "Multiple pages & brands",
      "Team collaboration",
      "Advanced audience exports",
      "Priority support",
      "API access",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <AuroraBackground />

        <div className="relative mx-auto max-w-6xl px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-zinc-300"
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              Zero commission. Unlimited links. Built for 2026.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
            >
              One link for
              <br />
              <span className="gradient-text">everything you are</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400"
            >
              LinkDock turns your bio into a beautiful, fast and measurable
              hub. Add unlimited links, customize every pixel, and keep 100% of
              every sale you make.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                href="/signup"
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-purple-600/30 transition-all duration-300 hover:shadow-purple-500/50 hover:brightness-110 sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/20 blur-md transition-transform duration-500 group-hover:translate-x-full" />
                Create your free page
              </Link>
              <a
                href="#features"
                className="glass w-full rounded-2xl px-8 py-4 text-base font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Explore features
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.8 }}
              className="mt-10 flex items-center justify-center gap-8 text-center"
            >
              {[
                ["1M+", "creators"],
                ["250M", "clicks / mo"],
                ["0%", "commission"],
                ["99.9%", "uptime"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p className="text-xl font-bold text-white sm:text-2xl">{num}</p>
                  <p className="text-[11px] uppercase tracking-wider text-zinc-500">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Floating mockup */}
          <div className="relative mx-auto mt-16 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="animate-float"
            >
              <BioMockup />
            </motion.div>

            {/* Floating stat chips */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="glass absolute -left-8 top-16 hidden rounded-2xl px-4 py-3 sm:block"
            >
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">Clicks today</p>
              <p className="text-lg font-bold text-white">
                +2,431 <span className="text-emerald-400">▲ 18%</span>
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="glass absolute -right-8 bottom-24 hidden rounded-2xl px-4 py-3 sm:block"
            >
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">Conversion</p>
              <p className="text-lg font-bold text-white">12.4%</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- PLATFORM MARQUEE ---------- */}
      <section className="border-y border-white/5 bg-white/[0.02] py-8">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.25em] text-zinc-600">
          Works with every platform you use
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#07070f] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#07070f] to-transparent" />
          <div className="flex w-max animate-marquee gap-10">
            {[...platforms, ...platforms].map((p, i) => (
              <span key={i} className="flex items-center gap-2 text-lg font-semibold text-zinc-600">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" />
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section id="features" className="relative py-24">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-400">
              Features
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Everything you need.
              <br />
              <span className="gradient-text-static">Nothing you don&apos;t.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-zinc-400">
              Every feature that made link-in-bio tools famous — plus the ones
              they forgot to build.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-colors hover:border-white/15 hover:bg-white/[0.05]"
              >
                <div
                  className={cn(
                    "absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40 bg-gradient-to-br",
                    f.color
                  )}
                />
                <div
                  className={cn(
                    "relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg",
                    f.color
                  )}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="relative mt-4 text-lg font-semibold text-white">{f.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section id="how" className="relative py-24">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              How it works
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Live in <span className="gradient-text-static">60 seconds</span>
            </motion.h2>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Rocket,
                step: "01",
                title: "Create your account",
                desc: "Sign up free, grab your username, and you've got a live page instantly at linkdock.gg/you.",
              },
              {
                icon: Zap,
                step: "02",
                title: "Add your links",
                desc: "Paste in any URL, drag to reorder, pin what matters, schedule what's time-sensitive.",
              },
              {
                icon: BarChart3,
                step: "03",
                title: "Grow with data",
                desc: "Share your page, track every click, and let analytics tell you what your audience loves.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="relative rounded-2xl border border-white/8 bg-white/[0.03] p-7"
              >
                <span className="absolute right-6 top-5 text-5xl font-extrabold text-white/5">{s.step}</span>
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-purple-400/30 bg-purple-500/10 text-purple-300">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PRICING ---------- */}
      <section id="pricing" className="relative py-24">
        <AuroraBackground className="opacity-50" />
        <div className="relative mx-auto max-w-6xl px-5">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Pricing
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Start free. <span className="gradient-text-static">Stay free.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-zinc-400">
              No hidden fees. No commission on your sales. Ever.
            </motion.p>
          </motion.div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pricing.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className={cn(
                  "relative rounded-3xl p-8",
                  p.highlight
                    ? "border border-purple-400/40 bg-gradient-to-b from-purple-600/15 to-cyan-500/5 shadow-2xl shadow-purple-900/30"
                    : "border border-white/8 bg-white/[0.03]"
                )}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-1 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">{p.price}</span>
                  <span className="mb-1 text-sm text-zinc-500">{p.period}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-400">{p.desc}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={cn(
                    "mt-8 block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all",
                    p.highlight
                      ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-600/30 hover:brightness-110"
                      : "border border-white/15 text-white hover:bg-white/5"
                  )}
                >
                  {p.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-purple-400/25 bg-gradient-to-br from-purple-600/20 via-[#0d0d1d] to-cyan-500/10 p-10 text-center sm:p-16"
          >
            <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-purple-500/40 blur-3xl animate-pulse-ring" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white sm:text-5xl">
                Ready to dock your <span className="gradient-text">links?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-zinc-300">
                Join creators building their own corner of the internet. Free
                forever — no credit card, no commission.
              </p>
              <Link
                href="/signup"
                className="group relative mt-8 inline-block overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 px-9 py-4 text-base font-semibold text-white shadow-2xl shadow-purple-600/40 transition-all hover:brightness-110"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/20 blur-md transition-transform duration-500 group-hover:translate-x-full" />
                Claim your username
              </Link>
              <p className="mt-4 text-xs text-zinc-500">
                <Anchor className="mr-1 inline h-3 w-3" />
                Your page is live the moment you sign up
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
