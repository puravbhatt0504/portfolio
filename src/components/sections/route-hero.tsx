"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/components/ui/reveal";
import { FloatingParticles, TextShimmer } from "@/components/ui/motion-effects";

type RouteHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function RouteHero({ eyebrow, title, description }: RouteHeroProps) {
  // Split title at the last word to shimmer it
  const words = title.split(" ");
  const lastWord = words.pop() || "";
  const restOfTitle = words.join(" ");

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center px-6 pt-28 md:px-12 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundSize: "200% 200%",
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15), transparent 36%), radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.12), transparent 32%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08), transparent 40%)",
        }}
      />

      {/* Floating particles */}
      <FloatingParticles count={6} seed={521} colors={["bg-violet-400/15", "bg-fuchsia-400/10", "bg-pink-400/15"]} />

      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Reveal>
          <motion.p
            className="text-xs uppercase tracking-label text-violet-500/90 font-semibold font-mono"
            whileHover={{ letterSpacing: "0.35em", x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {eyebrow}
          </motion.p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-4xl font-heading text-5xl text-slate-900 md:text-7xl font-extrabold tracking-tight">
            {restOfTitle}{" "}
            <TextShimmer className="text-5xl md:text-7xl font-extrabold font-heading tracking-tight">
              {lastWord}
            </TextShimmer>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-slate-600 font-medium text-lg leading-relaxed">{description}</p>
        </Reveal>

        {/* Decorative line */}
        <motion.div
          className="mt-12 h-px max-w-xs"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "linear-gradient(90deg, rgba(139,92,246,0.4), rgba(236,72,153,0.3), transparent)",
          }}
        />
      </div>
    </section>
  );
}
