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
      "Dual Flutter mobile apps (admin & employee) + Next.js admin portal for City Fire Services. Live GPS tracking, biometric auth, OCR receipt scanning, backed by Supabase.",
    language: "Dart",
  },
  {
    title: "Simulation Sys",
    aliases: ["urban-policy-simulation", "simulation-sys", "simulation_sys"],
    description:
      "Data-driven simulation tool for urban planning and policy impact analysis. Visualizes outcomes of city-wide policy changes on infrastructure and population metrics.",
    language: "TypeScript",
  },
  {
    title: "Sikkim Tourism",
    aliases: ["sikkim-tourism", "sikkim_tourism", "monastery-ar", "event_management"],
    description:
      "Interactive tourism app with smooth animations, dynamic routing, and media-rich image galleries. Deployed on Vercel with responsive design for all devices.",
    language: "HTML",
  },
  {
    title: "Grindflow",
    aliases: ["grindflow", "grindflow-backend"],
    description:
      "AI-powered peer-to-peer knowledge exchange platform. TypeScript backend (Node.js/Express) with intelligent matching and knowledge graph creation.",
    language: "TypeScript",
  },
  {
    title: "Quote Me",
    aliases: ["quote-me-", "quote-me"],
    description:
      "Next.js app for generating fire safety quotations. Dynamic product catalog, real-time tax/discount calculations, live preview with branding, and Excel export.",
    language: "TypeScript",
  },
  {
    title: "Tenderhunter",
    aliases: ["tenderhunter"],
    description:
      "Platform to discover and track tender opportunities. Automated tracking, filtering by category and deadline, with organizational bidding tools.",
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
            <div className="rounded-3xl border border-pink-500/20 bg-white/70 p-6 backdrop-blur transition hover:border-blue-500/60 shadow-sm hover:shadow-md">
              <p className="text-xs uppercase tracking-label text-pink-500/90 font-semibold font-mono">
                {repo.language ?? "Cross-stack"}
              </p>
              <h2 className="mt-3 font-heading text-2xl text-slate-800 font-bold">{repo.name}</h2>
              <p className="mt-3 text-slate-600">
                {repo.description ?? "Engineered with motion, performance, and product clarity."}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex gap-4 text-sm text-slate-500 font-medium font-mono">
                  <span>★ {repo.stargazers_count}</span>
                  <span>Forks: {repo.forks_count}</span>
                </div>
                <div className="flex items-center gap-3">
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition-colors"
                  >
                    Code →
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
