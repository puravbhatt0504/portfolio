import type { Metadata } from "next";

import { getGitHubPortfolioData } from "@/lib/github";

import { RouteHero } from "@/components/sections/route-hero";
import { WorkPageClient } from "./client";
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
    title: "Grindflow",
    aliases: ["grindflow", "grindflow-backend"],
    description:
      "AI-powered peer-to-peer knowledge exchange platform. TypeScript backend (Node.js/Express) with intelligent matching and knowledge graph creation.",
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
    title: "Simulation Sys",
    aliases: ["urban-policy-simulation", "simulation-sys", "simulation_sys"],
    description:
      "Data-driven simulation tool for urban planning and policy impact analysis. Visualizes outcomes of city-wide policy changes on infrastructure and population metrics.",
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

      <WorkPageClient repos={displayRepos} />
    </main>
  );
}
