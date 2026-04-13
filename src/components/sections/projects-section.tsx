"use client";

import { AnimatePresence, animate, motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { TiltCard } from "@/components/ui/tilt-card";
import { GitHubRepo } from "@/types/github";

type ProjectsSectionProps = {
  repos: GitHubRepo[];
};

export function ProjectsSection({ repos }: ProjectsSectionProps) {
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [cycleWidth, setCycleWidth] = useState(0);

  const cycleRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);

  const railItems = useMemo(() => [...repos, ...repos, ...repos], [repos]);

  useEffect(() => {
    const node = cycleRef.current;

    if (!node) {
      return;
    }

    const update = () => {
      const width = node.offsetWidth;
      setCycleWidth(width);
      x.set(-width);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);

    return () => observer.disconnect();
  }, [x, repos.length]);

  useAnimationFrame((_, delta) => {
    if (isDragging.current || cycleWidth === 0) {
      return;
    }

    const next = x.get() - delta * 0.04;
    x.set(next);
  });

  useEffect(() => {
    return x.on("change", (latest) => {
      if (!cycleWidth) {
        return;
      }

      if (latest <= -2 * cycleWidth) {
        x.set(latest + cycleWidth);
      } else if (latest >= 0) {
        x.set(latest - cycleWidth);
      }
    });
  }, [cycleWidth, x]);

  const snapToCard = (velocity = 0) => {
    if (!cycleWidth || repos.length === 0) {
      return;
    }

    const cardSpan = cycleWidth / repos.length;
    const projected = x.get() + velocity * 0.14;
    const snapped = Math.round(projected / cardSpan) * cardSpan;

    animate(x, snapped, {
      type: "spring",
      stiffness: 360,
      damping: 24,
      mass: 0.72,
    });
  };

  return (
    <section
      id="projects"
      className="relative flex min-h-screen snap-start flex-col justify-center gap-8 px-6 py-20 md:px-14"
    >
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/75">
          Repositories / Live
        </p>
        <h2 className="mt-3 font-heading text-4xl text-zinc-100 md:text-6xl">
          Motion-Driven Project Vault
        </h2>
      </div>

      <div className="mx-auto w-full max-w-7xl overflow-hidden pb-5">
        <motion.div
          className="flex cursor-grab gap-5 active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragMomentum
          dragElastic={0.04}
          onDragStart={() => {
            isDragging.current = true;
          }}
          onDragEnd={(_, info) => {
            isDragging.current = false;
            snapToCard(info.velocity.x);
          }}
          data-cursor="interactive"
        >
          {railItems.map((repo, index) => (
            <div
              key={`${repo.id}-${index}`}
              className="min-w-[290px] flex-1 basis-[min(72vw,360px)]"
              ref={index === repos.length ? cycleRef : undefined}
            >
              <TiltCard className="group h-full">
                <motion.button
                  onClick={() => setSelectedRepo(repo)}
                  className="relative h-full min-h-[250px] w-full rounded-3xl border border-cyan-200/20 bg-zinc-950/70 p-6 text-left backdrop-blur-lg transition hover:border-emerald-300/50"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % repos.length) * 0.05 }}
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/70">
                    {repo.language ?? "Multi-stack"}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-zinc-100">
                    {repo.name}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-zinc-300/80">
                    {repo.description ?? "A kinetic, engineered project with custom interaction flows."}
                  </p>
                  <div className="mt-8 flex items-center gap-5 text-xs uppercase tracking-[0.25em] text-zinc-400">
                    <span>* {repo.stargazers_count} Stars</span>
                    <span>* {repo.forks_count} Forks</span>
                  </div>
                </motion.button>
              </TiltCard>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedRepo ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 p-6 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRepo(null)}
          >
            <motion.article
              className="w-full max-w-2xl rounded-3xl border border-cyan-200/30 bg-zinc-900/95 p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                {selectedRepo.language ?? "Creative Engineering"}
              </p>
              <h3 className="mt-3 font-heading text-4xl text-zinc-50">
                {selectedRepo.name}
              </h3>
              <p className="mt-4 text-zinc-300/90">
                {selectedRepo.description ??
                  "Built with a focus on expressive interfaces, maintainability, and high-performance rendering."}
              </p>

              <div className="mt-7 flex flex-wrap gap-5 text-sm text-zinc-300">
                <span>Stars: {selectedRepo.stargazers_count}</span>
                <span>Forks: {selectedRepo.forks_count}</span>
                <span>
                  Updated: {new Date(selectedRepo.updated_at).toLocaleDateString()}
                </span>
              </div>

              <a
                href={selectedRepo.html_url}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex rounded-full border border-emerald-300/40 px-6 py-3 text-sm uppercase tracking-[0.2em] text-emerald-200 hover:bg-emerald-400/10"
              >
                View Repository
              </a>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
