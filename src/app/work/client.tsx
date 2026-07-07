"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { MagneticWrap } from "@/components/ui/motion-effects";
import { GitHubRepo } from "@/types/github";

const CARD_COLORS = [
  "rgba(236,72,153,0.10)",
  "rgba(139,92,246,0.10)",
  "rgba(59,130,246,0.10)",
  "rgba(249,115,22,0.10)",
  "rgba(16,185,129,0.10)",
  "rgba(236,72,153,0.08)",
];

type WorkPageClientProps = {
  repos: GitHubRepo[];
};

export function WorkPageClient({ repos }: WorkPageClientProps) {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-5 px-6 md:grid-cols-2 md:px-12">
      {repos.map((repo, index) => (
        <motion.div
          key={repo.id}
          initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{
            duration: 0.8,
            delay: index * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <SpotlightCard
            spotlightColor={CARD_COLORS[index % CARD_COLORS.length]}
          >
            <p className="text-xs uppercase tracking-label text-violet-500/90 font-semibold font-mono">
              {repo.language ?? "Cross-stack"}
            </p>
            <h2 className="mt-3 font-heading text-2xl text-slate-800 font-bold group-hover:text-violet-700 transition-colors">
              {repo.name}
            </h2>
            <p className="mt-3 text-slate-600">
              {repo.description ?? "Engineered with motion, performance, and product clarity."}
            </p>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex gap-4 text-sm text-slate-500 font-medium font-mono">
                <span className="flex items-center gap-1.5">
                  <motion.span
                    className="inline-block w-2 h-2 rounded-full bg-violet-400"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ type: "tween", duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                  />
                  ★ {repo.stargazers_count}
                </span>
                <span>Forks: {repo.forks_count}</span>
              </div>
              <div className="flex items-center gap-3">
                {repo.homepage && (
                  <MagneticWrap strength={0.25}>
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      Live Demo ↗
                    </a>
                  </MagneticWrap>
                )}
                <MagneticWrap strength={0.25}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-violet-500 hover:text-violet-600 transition-colors"
                  >
                    Code →
                  </a>
                </MagneticWrap>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </section>
  );
}
