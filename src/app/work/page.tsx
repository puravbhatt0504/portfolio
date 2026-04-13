import type { Metadata } from "next";

import { getGitHubPortfolioData } from "@/lib/github";

import { RouteHero } from "@/components/sections/route-hero";
import { Reveal } from "@/components/ui/reveal";
import { GitHubRepo } from "@/types/github";

const FALLBACK_USERNAME = "puravbhatt0504";

const ORDERED_WORKS = [
  {
    title: "Employee Manager Final",
    aliases: ["employee-manager-final"],
    description:
      "A complete employee workflow platform focused on streamlined management operations and team visibility.",
    language: "Dart",
  },
  {
    title: "Sikkim Tourism",
    aliases: ["sikkim-tourism", "sikkim_tourism", "monastery-ar", "event_management"],
    description:
      "An immersive tourism experience concept for showcasing destinations, routes, and culture in Sikkim.",
    language: "HTML",
  },
  {
    title: "Grindflow",
    aliases: ["grindflow", "grindflow-backend"],
    description:
      "A productivity and workflow system built for execution-focused teams and individuals.",
    language: "TypeScript",
  },
  {
    title: "Quote Me",
    aliases: ["quote-me-", "quote-me"],
    description:
      "A quote and request workflow product focused on quick interactions and clear delivery pipelines.",
    language: "TypeScript",
  },
  {
    title: "Tenderhunter",
    aliases: ["tenderhunter"],
    description:
      "A practical platform to discover and track tender opportunities with streamlined filtering and discovery.",
    language: "JavaScript",
  },
];

function normalizeName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected repositories and product-facing builds from Purav Bhatt's public work.",
};

export default async function WorkPage() {
  const username = process.env.GITHUB_USERNAME ?? FALLBACK_USERNAME;
  const data = await getGitHubPortfolioData(username);

  const displayRepos = ORDERED_WORKS.map((work) => {
    const found = data.repos.find((repo) =>
      work.aliases.some((alias) => normalizeName(alias) === normalizeName(repo.name)),
    );

    if (found) {
      return {
        ...found,
        name: work.title,
      };
    }

    return {
      id: `work-${normalizeName(work.title)}`,
      name: work.title,
      description: work.description,
      html_url: "https://github.com/puravbhatt0504",
      homepage: null,
      stargazers_count: 0,
      forks_count: 0,
      language: work.language,
      topics: ["work"],
      updated_at: "2026-04-13T00:00:00.000Z",
      fork: false,
    } satisfies GitHubRepo;
  });

  return (
    <main className="pb-20">
      <RouteHero
        eyebrow="Work / Showcase"
        title="Selected repositories and craft experiments."
        description="A curated feed from GitHub with pinned priority, tuned to spotlight impact and consistency."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-6 md:grid-cols-2 md:px-12">
        {displayRepos.map((repo, index) => (
          <Reveal key={repo.id} delay={index * 0.07}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-3xl border border-cyan-200/20 bg-zinc-900/60 p-6 backdrop-blur transition hover:border-emerald-300/60"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-100/70">
                {repo.language ?? "Cross-stack"}
              </p>
              <h2 className="mt-3 text-2xl text-zinc-100">{repo.name}</h2>
              <p className="mt-3 text-zinc-300/85">
                {repo.description ?? "Engineered with motion, performance, and product clarity."}
              </p>
              <div className="mt-5 flex gap-4 text-sm text-zinc-300">
                <span>Stars: {repo.stargazers_count}</span>
                <span>Forks: {repo.forks_count}</span>
              </div>
            </a>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
