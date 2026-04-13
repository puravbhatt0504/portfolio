"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { featuredCaseStudies } from "@/lib/site";
import { GitHubRepo } from "@/types/github";

type FeaturedRepo = GitHubRepo & {
  category: string;
  summary: string;
  highlights: string[];
};

type ProjectsSectionProps = {
  repos: GitHubRepo[];
};

function normalizeName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function ProjectsSection({ repos }: ProjectsSectionProps) {
  const featuredRepos = useMemo<FeaturedRepo[]>(
    () =>
      featuredCaseStudies.map((work) => {
        const matched = repos.find((repo) =>
          work.aliases.some((alias) => normalizeName(alias) === normalizeName(repo.name)),
        );

        if (matched) {
          return {
            ...matched,
            category: work.category,
            summary: work.summary,
            highlights: work.highlights,
            description: matched.description ?? work.summary,
          };
        }

        return {
          id: `featured-${normalizeName(work.title)}`,
          name: work.title,
          description: work.summary,
          html_url: "https://github.com/puravbhatt0504",
          homepage: null,
          stargazers_count: 0,
          forks_count: 0,
          language: "TypeScript",
          topics: ["featured"],
          updated_at: new Date().toISOString(),
          fork: false,
          category: work.category,
          summary: work.summary,
          highlights: work.highlights,
        };
      }),
    [repos],
  );

  const [selectedRepo, setSelectedRepo] = useState<FeaturedRepo>(featuredRepos[0]);

  return (
    <section
      id="projects"
      className="relative flex min-h-screen flex-col justify-center gap-8 px-6 py-20 lg:snap-start md:px-14"
    >
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/75">
          Selected Work / Case Studies
        </p>
        <h2 className="mt-3 font-heading text-4xl text-zinc-100 md:text-6xl">
          Projects that turn ideas into something clients can feel.
        </h2>
        <p className="mt-4 max-w-3xl text-zinc-300/85">
          Strong visual work earns attention, but the detail work keeps trust.
          These featured builds show a mix of product clarity, interface craft,
          and practical system thinking.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="space-y-4">
          {featuredRepos.map((repo, index) => {
            const isActive = selectedRepo.id === repo.id;

            return (
              <Reveal key={repo.id} delay={index * 0.06}>
                <button
                  type="button"
                  onClick={() => setSelectedRepo(repo)}
                  className={`w-full rounded-[1.75rem] border p-6 text-left backdrop-blur-xl transition ${
                    isActive
                      ? "border-cyan-200/40 bg-cyan-300/10 shadow-[0_24px_80px_rgba(10,20,36,0.35)]"
                      : "border-white/10 bg-white/5 hover:border-emerald-300/30 hover:bg-white/8"
                  }`}
                  data-cursor="interactive"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/75">
                      {repo.category}
                    </p>
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                      {repo.language ?? "Multi-stack"}
                    </p>
                  </div>
                  <h3 className="mt-4 text-2xl text-zinc-50">{repo.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300/80 md:text-base">
                    {repo.summary}
                  </p>
                </button>
              </Reveal>
            );
          })}
        </div>

        <div className="lg:sticky lg:top-28">
          <AnimatePresence mode="wait">
            <motion.article
              key={selectedRepo.id}
              className="rounded-[2rem] border border-white/10 bg-linear-to-br from-zinc-950/95 via-zinc-900/95 to-cyan-500/10 p-7 backdrop-blur-2xl md:p-8"
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/75">
                  {selectedRepo.category}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                  Updated {formatDate(selectedRepo.updated_at)}
                </p>
              </div>

              <h3 className="mt-4 font-heading text-4xl text-zinc-50 md:text-5xl">
                {selectedRepo.name}
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300/88 md:text-lg">
                {selectedRepo.description ?? selectedRepo.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {selectedRepo.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-cyan-200/15 bg-cyan-300/8 px-4 py-2 text-xs uppercase tracking-[0.18em] text-cyan-100/75"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.3rem] border border-white/8 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    Language
                  </p>
                  <p className="mt-3 text-xl text-zinc-50">
                    {selectedRepo.language ?? "Multi-stack"}
                  </p>
                </div>
                <div className="rounded-[1.3rem] border border-white/8 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    Stars
                  </p>
                  <p className="mt-3 text-xl text-zinc-50">
                    {selectedRepo.stargazers_count}
                  </p>
                </div>
                <div className="rounded-[1.3rem] border border-white/8 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    Forks
                  </p>
                  <p className="mt-3 text-xl text-zinc-50">
                    {selectedRepo.forks_count}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton href={selectedRepo.html_url} target="_blank">
                  View Repository
                </MagneticButton>
                {selectedRepo.homepage ? (
                  <MagneticButton
                    href={selectedRepo.homepage}
                    target="_blank"
                    className="border-emerald-300/40"
                  >
                    Live Preview
                  </MagneticButton>
                ) : null}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
