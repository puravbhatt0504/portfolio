"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/components/ui/reveal";

type RouteHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function RouteHero({ eyebrow, title, description }: RouteHeroProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center px-6 pt-28 md:px-12">
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(34,211,238,0.24), transparent 36%), radial-gradient(circle at 80% 70%, rgba(52,211,153,0.18), transparent 32%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-100/75">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-4xl font-heading text-5xl text-zinc-100 md:text-7xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-zinc-300/90">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
