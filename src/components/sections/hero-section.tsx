"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { GitHubUser } from "@/types/github";

const HeroNebula = dynamic(
  () => import("@/components/three/hero-nebula").then((module) => module.HeroNebula),
  { ssr: false },
);

const TITLES = [
  "Creative Engineer",
  "Motion Architect",
  "TypeScript Alchemist",
  "Frontend Futurist",
];

type HeroSectionProps = {
  user: GitHubUser;
};

export function HeroSection({ user }: HeroSectionProps) {
  const [activeTitle, setActiveTitle] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTitle((previous) => (previous + 1) % TITLES.length);
    }, 1900);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen snap-start items-center overflow-hidden px-6 py-24 md:px-14">
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

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.5em] text-cyan-200/80">
            {user.login} / portfolio
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-heading text-5xl leading-[0.95] text-zinc-100 sm:text-7xl lg:text-8xl">
            <span className="block">{user.name ?? user.login}</span>
            <span className="mt-3 block bg-gradient-to-r from-cyan-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              {TITLES[activeTitle]}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.2} className="max-w-2xl">
          <p className="text-lg leading-relaxed text-zinc-300/90">
            {user.bio ??
              "I build expressive digital experiences where code behaves like choreography and interfaces feel alive."}
          </p>
        </Reveal>

        <Reveal delay={0.3} className="flex flex-wrap gap-4">
          <MagneticButton href="#projects">Explore Projects</MagneticButton>
          <MagneticButton
            href={user.html_url}
            target="_blank"
            className="border-emerald-300/40"
          >
            GitHub Profile
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
