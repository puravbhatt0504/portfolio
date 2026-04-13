import "server-only";

import {
  GitHubPortfolioData,
  GitHubRepo,
  GitHubUser,
  LanguageStat,
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

export async function getGitHubPortfolioData(
  username: string,
): Promise<GitHubPortfolioData> {
  const [user, repositories, pinnedRepositories] = await Promise.all([
    githubFetch<GitHubUser>(`/users/${username}`),
    githubFetch<GitHubRepo[]>(`/users/${username}/repos?per_page=100&sort=updated`),
    getPinnedRepositories(username),
  ]);

  const cleanRepos = repositories
    .map((repository) => ({ ...repository, id: String(repository.id) }))
    .filter((repository) => !repository.fork);

  const fallbackRepositories = cleanRepos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 9);

  return {
    user,
    repos: pinnedRepositories.length ? pinnedRepositories : fallbackRepositories,
    languages: aggregateLanguages(cleanRepos.slice(0, 30)),
  };
}
