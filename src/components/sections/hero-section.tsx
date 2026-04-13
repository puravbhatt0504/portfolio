"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { GitHubUser, PortfolioStats } from "@/types/github";

const HeroNebula = dynamic(
  () => import("@/components/three/hero-nebula").then((module) => module.HeroNebula),
  { ssr: false },
);

const TITLES = [
  "Full-Stack Product Developer",
  "TypeScript and Flutter Engineer",
  "Frontend and Backend Builder",
  "Shipping Real-World Systems",
];

type HeroSectionProps = {
  user: GitHubUser;
  stats: PortfolioStats;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function normalizeWebsite(url: string) {
  if (!url) {
    return "";
  }

  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export function HeroSection({ user, stats }: HeroSectionProps) {
  const [activeTitle, setActiveTitle] = useState(0);
  const websiteUrl = normalizeWebsite(user.blog);

  const statsRail = [
    { label: "Repos", value: formatNumber(stats.totalRepos) },
    { label: "Stars", value: formatNumber(stats.totalStars) },
    { label: "Followers", value: formatNumber(user.followers) },
    { label: "Core Stack", value: stats.primaryLanguage ?? "Multi-stack" },
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTitle((previous) => (previous + 1) % TITLES.length);
    }, 1900);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-24 lg:snap-start md:px-14">
      <HeroNebula />

      <motion.div
        className="absolute inset-0 opacity-35"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(34,211,238,.3), transparent 35%), radial-gradient(circle at 80% 60%, rgba(16,185,129,.25), transparent 40%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="flex flex-col gap-7">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="rounded-full border border-cyan-200/20 bg-zinc-950/40 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80 backdrop-blur-md">
                {user.login} / portfolio
              </p>
              <p className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-emerald-100/80">
                Open for client work
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="max-w-5xl font-heading text-5xl leading-[0.92] text-zinc-50 sm:text-7xl lg:text-[5.75rem]">
              <span className="block">{user.name ?? user.login}</span>
              <span className="mt-4 block text-zinc-200/95">
                Building product experiences that feel
              </span>
              <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-white to-emerald-300 bg-clip-text text-transparent">
                polished before the first pitch ends.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16} className="max-w-3xl">
            <p className="text-lg leading-relaxed text-zinc-300/88 md:text-xl">
              {user.bio ??
                "Full-stack product developer crafting client-facing websites, operational dashboards, and cross-platform builds with TypeScript, Next.js, and Flutter."}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="relative min-h-[2.5rem] overflow-hidden text-base uppercase tracking-[0.28em] text-cyan-100/75 md:text-lg">
              <AnimatePresence mode="wait">
                <motion.p
                  key={TITLES[activeTitle]}
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                  transition={{ duration: 0.4 }}
                  className="absolute"
                >
                  {TITLES[activeTitle]}
                </motion.p>
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.28} className="flex flex-wrap gap-4">
            <MagneticButton href="#projects">Explore Work</MagneticButton>
            <MagneticButton href="/about" className="border-white/20 text-zinc-100">
              About My Craft
            </MagneticButton>
            <MagneticButton
              href={websiteUrl || user.html_url}
              target="_blank"
              className="border-emerald-300/40"
            >
              {websiteUrl ? "Visit Website" : "GitHub Profile"}
            </MagneticButton>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <aside className="rounded-[2rem] border border-white/10 bg-zinc-950/45 p-6 shadow-[0_30px_120px_rgba(4,8,18,0.55)] backdrop-blur-2xl md:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">
              Snapshot / Why this feels credible
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {statsRail.map((entry) => (
                <div
                  key={entry.label}
                  className="rounded-[1.4rem] border border-white/8 bg-white/5 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                    {entry.label}
                  </p>
                  <p className="mt-3 font-heading text-3xl text-zinc-50">
                    {entry.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                user.location,
                user.company,
                "Next.js",
                "TypeScript",
                "Flutter",
                "Motion UI",
              ]
                .filter(Boolean)
                .map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-cyan-200/15 bg-cyan-300/8 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100/75"
                  >
                    {item}
                  </span>
                ))}
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
