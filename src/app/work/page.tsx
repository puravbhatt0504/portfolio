import type { Metadata } from "next";

import { getGitHubPortfolioData } from "@/lib/github";

import { RouteHero } from "@/components/sections/route-hero";
import { WorkPageClient } from "./client";
import { GitHubRepo } from "@/types/github";

const FALLBACK_USERNAME = "puravbhatt0504";

const ORDERED_WORKS = [
  {
    title: "Marka",
    aliases: ["employee-manager-final"],
    description:
      "Workforce platform in daily use by a fire-services company: two Flutter apps and a Next.js admin portal with live GPS tracking, biometric check-in, OCR receipt scanning, and payroll.",
    language: "Dart",
  },
  {
    title: "RelayQ",
    aliases: ["relayq"],
    description:
      "Multi-tenant background-job service that survives workers being killed mid-flight: 33k jobs/min, and 0 lost or duplicated across 10k jobs under chaos testing.",
    language: "TypeScript",
  },
  {
    title: "PulseBoard",
    aliases: ["pulseboard"],
    description:
      "Real-time collaborative Kanban with live cursors and shared editing, deployed to ECS Fargate behind CloudFront with AWS CDK and AI features on Bedrock.",
    language: "TypeScript",
  },
  {
    title: "Urban Policy Simulation",
    aliases: ["urban-policy-simulation", "simulation-sys", "simulation_sys"],
    description:
      "Agent-based simulation platform for testing zoning, transit, and housing policy on real city data before it is enacted, with AI-generated scenarios and explanations.",
    language: "Python",
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
