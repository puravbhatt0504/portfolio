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
    homepage: "https://relayq-demo.onrender.com/demo",
  },
  {
    title: "PulseBoard",
    aliases: ["pulseboard"],
    description:
      "Real-time collaborative Kanban with live cursors and shared editing, deployed to ECS Fargate behind CloudFront with AWS CDK and AI features on Bedrock.",
    language: "TypeScript",
    homepage: "https://pulseboard-fmbj.onrender.com",
  },
  {
    title: "Urban Policy Simulation",
    aliases: ["urban-policy-simulation", "simulation-sys", "simulation_sys"],
    description:
      "Agent-based simulation platform for testing zoning, transit, and housing policy on real city data before it is enacted, with AI-generated scenarios and explanations.",
    language: "Python",
  },
  {
    title: "ExpenseLens",
    aliases: ["expenselens"],
    description:
      "Flutter expense tracker that reads UPI and food-delivery screenshots with on-device ML Kit OCR, auto-categorizes spend, and syncs to a Node.js API on Neon Postgres.",
    language: "Dart",
    homepage: "https://web-six-olive-25.vercel.app",
  },
  {
    title: "Grindflow",
    aliases: ["grindflow", "grindflow-backend"],
    description:
      "Peer-powered study notes platform with Gemini-scored notes, auto-generated quizzes, and a public library. Next.js, Neon, Drizzle, Clerk, and UploadThing.",
    language: "TypeScript",
    homepage: "https://grindflow.vercel.app",
  },
  {
    title: "Grain Connect",
    aliases: ["grain-connect"],
    description:
      "Live client site for an agri-commodity trading business: Next.js App Router, GSAP and Framer Motion, an RSS news ticker filtered for grain and ethanol news, and structured data for SEO.",
    language: "JavaScript",
    homepage: "https://grainconnect.in",
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
        description: work.description,
        homepage: found.homepage ?? work.homepage ?? null,
      };
    }

    return {
      id: `work-${normalizeName(work.title)}`,
      name: work.title,
      description: work.description,
      html_url: "https://github.com/puravbhatt0504",
      homepage: work.homepage ?? null,
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
