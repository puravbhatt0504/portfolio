import "server-only";

import { cache } from "react";

import {
  GitHubPortfolioData,
  GitHubRepo,
  GitHubUser,
  LanguageStat,
  PortfolioStats,
} from "@/types/github";

const GITHUB_API = "https://api.github.com";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";

type PinnedRepositoryResponse = {
  data?: {
    user: {
      pinnedItems: {
        nodes: Array<{
          id: string;
          name: string;
          description: string | null;
          url: string;
          homepageUrl: string | null;
          stargazerCount: number;
          forkCount: number;
          isFork: boolean;
          updatedAt: string;
          primaryLanguage: {
            name: string;
          } | null;
          repositoryTopics: {
            nodes: Array<{
              topic: {
                name: string;
              };
            }>;
          };
        }>;
      };
    };
  };
};

const PINNED_REPOS_QUERY = `
  query PinnedRepositories($login: String!) {
    user(login: $login) {
      pinnedItems(first: 9, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            isFork
            updatedAt
            primaryLanguage {
              name
            }
            repositoryTopics(first: 5) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

function buildHeaders() {
  const token = process.env.GITHUB_TOKEN;

  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function githubFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${GITHUB_API}${path}`, {
    headers: buildHeaders(),
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function githubGraphQLFetch<T>(
  query: string,
  variables: Record<string, string>,
): Promise<T> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("GitHub GraphQL requires GITHUB_TOKEN.");
  }

  const response = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildHeaders(),
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function getPinnedRepositories(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await githubGraphQLFetch<PinnedRepositoryResponse>(
      PINNED_REPOS_QUERY,
      { login: username },
    );

    const pinned = response.data?.user.pinnedItems.nodes ?? [];

    return pinned
      .filter((repository) => !repository.isFork)
      .map((repository) => ({
        id: repository.id,
        name: repository.name,
        description: repository.description,
        html_url: repository.url,
        homepage: repository.homepageUrl,
        stargazers_count: repository.stargazerCount,
        forks_count: repository.forkCount,
        language: repository.primaryLanguage?.name ?? null,
        topics: repository.repositoryTopics.nodes.map((node) => node.topic.name),
        updated_at: repository.updatedAt,
        fork: repository.isFork,
      }));
  } catch {
    return [];
  }
}

function aggregateLanguages(repositories: GitHubRepo[]): LanguageStat[] {
  const languageMap = new Map<string, number>();

  for (const repository of repositories) {
    if (!repository.language) {
      continue;
    }

    const current = languageMap.get(repository.language) ?? 0;
    languageMap.set(repository.language, current + 1);
  }

  const sorted = [...languageMap.entries()].sort((a, b) => b[1] - a[1]);
  const maxCount = sorted[0]?.[1] ?? 1;

  return sorted.slice(0, 8).map(([language, count]) => ({
    language,
    count,
    weight: Number((count / maxCount).toFixed(2)),
  }));
}

function aggregateTopics(repositories: GitHubRepo[]) {
  const topicMap = new Map<string, number>();

  for (const repository of repositories) {
    for (const topic of repository.topics ?? []) {
      const current = topicMap.get(topic) ?? 0;
      topicMap.set(topic, current + 1);
    }
  }

  return [...topicMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([topic]) => topic);
}

function getRecentActivityCount(repositories: GitHubRepo[]) {
  const cutoff = Date.now() - 1000 * 60 * 60 * 24 * 180;

  return repositories.filter((repository) => {
    const updatedAt = new Date(repository.updated_at).getTime();
    return Number.isFinite(updatedAt) && updatedAt >= cutoff;
  }).length;
}

function buildPortfolioStats(
  repositories: GitHubRepo[],
  languages: LanguageStat[],
): PortfolioStats {
  return {
    totalRepos: repositories.length,
    totalStars: repositories.reduce(
      (total, repository) => total + repository.stargazers_count,
      0,
    ),
    totalForks: repositories.reduce(
      (total, repository) => total + repository.forks_count,
      0,
    ),
    primaryLanguage: languages[0]?.language ?? null,
    recentActivityCount: getRecentActivityCount(repositories),
    topTopics: aggregateTopics(repositories),
  };
}

const MOCK_REPOS: GitHubRepo[] = [
  {
    id: "3",
    name: "employee-manager-final",
    description: "A comprehensive workforce management system for City Fire Services. Features dual Flutter mobile apps (admin & employee) and a Next.js admin portal, backed by Supabase. Includes live GPS tracking, Mapbox integration, biometric auth, and OCR receipt scanning.",
    html_url: "https://github.com/puravbhatt0504/employee-manager-final",
    homepage: "https://employee-manager-final.vercel.app",
    stargazers_count: 2,
    forks_count: 0,
    language: "Dart",
    topics: ["flutter", "dart", "nextjs", "supabase", "mapbox", "ocr", "gps-tracking"],
    updated_at: new Date().toISOString(),
    fork: false,
  },
  {
    id: "2",
    name: "grindflow",
    description: "AI-powered peer-to-peer knowledge exchange platform. Built with a robust TypeScript backend (Node.js/Express) and an interactive frontend to facilitate seamless knowledge graph creation and intelligent matching.",
    html_url: "https://github.com/puravbhatt0504/grindflow",
    homepage: null,
    stargazers_count: 1,
    forks_count: 3,
    language: "TypeScript",
    topics: ["ai", "typescript", "nodejs", "knowledge-graph", "peer-to-peer"],
    updated_at: new Date().toISOString(),
    fork: false,
  },
  {
    id: "5",
    name: "urban-policy-simulation",
    description: "A complex simulation tool for urban planning and policy impact analysis. Uses data-driven models to predict and visualize the outcomes of city-wide policy changes on infrastructure and population metrics.",
    html_url: "https://github.com/puravbhatt0504/urban-policy-simulation",
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    topics: ["simulation", "policy", "urban-planning", "data-visualization"],
    updated_at: new Date().toISOString(),
    fork: false,
  },
  {
    id: "1",
    name: "Quote-me-",
    description: "A professional Next.js web app for generating fire safety quotations. Features a dynamic product catalog, real-time tax/discount calculations, live previews with branding, and one-click Excel export.",
    html_url: "https://github.com/puravbhatt0504/Quote-me-",
    homepage: "https://quote-me-five.vercel.app",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    topics: ["nextjs", "react", "tailwindcss", "typescript"],
    updated_at: new Date().toISOString(),
    fork: false,
  },
  {
    id: "1177878490",
    name: "Sikkim-Tourism",
    description: "Interactive tourism application showcasing the beauty of Sikkim. Features smooth animations, dynamic routing, and visually stunning image galleries to promote local tourism.",
    html_url: "https://github.com/puravbhatt0504/Sikkim-Tourism",
    homepage: "https://sikkim-tourism-five.vercel.app",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    topics: ["tourism", "javascript", "react", "frontend"],
    updated_at: new Date().toISOString(),
    fork: true,
  },
  {
    id: "6",
    name: "tenderhunter",
    description: "A comprehensive platform to track and manage tender applications. Streamlines the bidding process with automated tracking and organizational tools.",
    html_url: "https://github.com/puravbhatt0504/tenderhunter",
    homepage: "https://tenderhunter.vercel.app",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    topics: ["tender", "management", "javascript"],
    updated_at: new Date().toISOString(),
    fork: false,
  }
];

export const getGitHubPortfolioData = cache(async function getGitHubPortfolioData(
  username: string,
): Promise<GitHubPortfolioData> {
  try {
    const [user, repositories, pinnedRepositories] = await Promise.all([
      githubFetch<GitHubUser>(`/users/${username}`),
      githubFetch<GitHubRepo[]>(`/users/${username}/repos?per_page=100&sort=updated`),
      getPinnedRepositories(username),
    ]);

    const cleanRepos = repositories
      .map((repository) => ({ ...repository, id: String(repository.id) }))
      .filter((repository) => (!repository.fork || repository.name === "urban-policy-simulation" || repository.name === "Sikkim-Tourism") && repository.name.toLowerCase() !== "portfolio");

    const cleanPinnedRepos = pinnedRepositories.filter(
      (repository) => repository.name.toLowerCase() !== "portfolio"
    );

    const requiredNames = ["employee-manager-final", "grindflow", "urban-policy-simulation", "quote-me-", "sikkim-tourism", "tenderhunter"];
    const additionalRepos = cleanRepos.filter(repo => 
      requiredNames.includes(repo.name.toLowerCase()) && 
      !cleanPinnedRepos.some(pinned => pinned.name.toLowerCase() === repo.name.toLowerCase())
    );
    
    const missingMocks = MOCK_REPOS.filter(repo =>
      requiredNames.includes(repo.name.toLowerCase()) &&
      !cleanPinnedRepos.some(pinned => pinned.name.toLowerCase() === repo.name.toLowerCase()) &&
      !additionalRepos.some(add => add.name.toLowerCase() === repo.name.toLowerCase())
    );

    const fallbackRepositories = cleanRepos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 9);

    const finalRepos = cleanPinnedRepos.length ? [...cleanPinnedRepos, ...additionalRepos, ...missingMocks] : [...fallbackRepositories, ...missingMocks];

    const languages = aggregateLanguages(cleanRepos);

    return {
      user,
      repos: finalRepos,
      languages,
      stats: buildPortfolioStats(cleanRepos, languages),
    };
  } catch (error) {
    console.warn("Using fallback mock data due to API limit.");
    
    // Return dummy data if API fails (e.g. rate limit / 401)
    return {
      user: {
        login: username,
        name: "Purav Bhatt",
        bio: "Full-Stack Developer | Building immersive and dynamic digital experiences.",
        avatar_url: "https://avatars.githubusercontent.com/u/134580434?v=4",
        html_url: `https://github.com/${username}`,
        blog: "",
        company: null,
        location: "India",
        followers: 12,
        following: 5,
        public_repos: 13
      },
      repos: MOCK_REPOS,
      languages: [
        { language: "TypeScript", count: 6, weight: 1 },
        { language: "JavaScript", count: 4, weight: 0.66 },
        { language: "Dart", count: 2, weight: 0.33 },
        { language: "HTML", count: 1, weight: 0.16 },
      ],
      stats: {
        totalRepos: 13,
        totalStars: 2,
        totalForks: 3,
        primaryLanguage: "TypeScript",
        recentActivityCount: 13,
        topTopics: ["typescript", "react", "nextjs", "javascript", "dart", "flutter"],
      }
    };
  }
});
