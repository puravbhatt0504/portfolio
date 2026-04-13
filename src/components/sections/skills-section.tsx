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
  topTopics: string[];
};

function formatTopic(topic: string) {
  return topic.replace(/[-_]/g, " ");
}

export function SkillsSection({ languages, topTopics }: SkillsSectionProps) {
  const circles = (
    languages.length
      ? languages
      : FALLBACK_SKILLS.map((skill) => ({
          language: skill,
          count: 1,
          weight: 0.5,
        }))
  ).slice(0, 6);

  return (
    <section className="relative flex min-h-screen items-center px-6 py-20 lg:snap-start md:px-14">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/75">
              Signals / Stack
            </p>
            <h2 className="mt-4 font-heading text-4xl text-zinc-100 md:text-6xl">
              A stack that supports both taste and delivery.
            </h2>
            <p className="mt-5 max-w-xl text-zinc-300">
              The visual polish matters, but so does the engineering underneath
              it. These are the languages and topics showing up most often in
              recent public work.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {(topTopics.length ? topTopics : ["nextjs", "typescript", "ui", "full-stack"])
                .slice(0, 6)
                .map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-200/80"
                  >
                    {formatTopic(topic)}
                  </span>
                ))}
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative flex items-center justify-center">
            <div className="relative h-[23rem] w-[23rem]">
              <motion.div
                className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/40 bg-zinc-900/70"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34,211,238,0.35)",
                    "0 0 55px rgba(52,211,153,0.2)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
              />

              {circles.map((entry, index) => {
                const angle = (index / circles.length) * Math.PI * 2;
                const radius = 130;
                const left = `${(Math.cos(angle) * radius + 184).toFixed(3)}px`;
                const top = `${(Math.sin(angle) * radius + 184).toFixed(3)}px`;

                return (
                  <motion.div
                    key={entry.language}
                    className="absolute rounded-full border border-cyan-300/40 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-100 backdrop-blur"
                    style={{ left, top }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      transition: {
                        delay: index * 0.08,
                        type: "spring",
                        stiffness: 150,
                      },
                    }}
                    viewport={{ once: true }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      y: {
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.12,
                      },
                    }}
                    data-cursor="interactive"
                  >
                    {entry.language}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <motion.div
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/75">
                Delivery focus
              </p>
              <h3 className="mt-3 text-2xl text-zinc-50">
                From landing pages to real product systems.
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300/80 md:text-base">
                The strongest client work usually sits between design taste and
                engineering practicality. This stack supports both sides of that
                equation.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {circles.slice(0, 4).map((entry, index) => (
                <motion.article
                  key={`${entry.language}-card`}
                  className="rounded-[1.5rem] border border-cyan-200/10 bg-zinc-950/55 p-5"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                    Activity signal
                  </p>
                  <p className="mt-3 text-2xl text-zinc-50">{entry.language}</p>
                  <p className="mt-2 text-sm text-zinc-300/75">
                    Appears in {entry.count} recent repositories.
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
