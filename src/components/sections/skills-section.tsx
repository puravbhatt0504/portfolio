"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/components/ui/reveal";
import { LanguageStat } from "@/types/github";

const FALLBACK_SKILLS = [
  "Next.js",
  "TypeScript",
  "Framer Motion",
  "WebGL",
  "Node.js",
  "Design Systems",
];

type SkillsSectionProps = {
  languages: LanguageStat[];
};

export function SkillsSection({ languages }: SkillsSectionProps) {
  const circles = (languages.length ? languages : FALLBACK_SKILLS.map((skill) => ({
    language: skill,
    count: 1,
    weight: 0.5,
  }))).slice(0, 6);

  return (
    <section className="relative flex min-h-screen snap-start items-center px-6 py-20 md:px-14">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/75">
              Signals / Stack
            </p>
            <h2 className="mt-4 font-heading text-4xl text-zinc-100 md:text-6xl">
              Orbiting Skills Matrix
            </h2>
            <p className="mt-5 max-w-xl text-zinc-300">
              Technologies pulse in a living system. The closer to center, the more actively they appear in recent work.
            </p>
          </div>
        </Reveal>

        <div className="relative flex items-center justify-center">
          <div className="relative h-[23rem] w-[23rem]">
            <motion.div
              className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/40 bg-zinc-900/70"
              animate={{ boxShadow: ["0 0 20px rgba(34,211,238,0.35)", "0 0 55px rgba(52,211,153,0.2)"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
            />

            {circles.map((entry, index) => {
              const angle = (index / circles.length) * Math.PI * 2;
              const radius = 130;
              const left = Math.cos(angle) * radius + 184;
              const top = Math.sin(angle) * radius + 184;

              return (
                <motion.div
                  key={entry.language}
                  className="absolute rounded-full border border-cyan-300/40 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-100 backdrop-blur"
                  style={{ left, top }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, type: "spring", stiffness: 150 }}
                  animate={{ y: [0, -6, 0] }}
                  data-cursor="interactive"
                >
                  {entry.language}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
