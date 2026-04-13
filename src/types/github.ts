export type GitHubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
};

export type GitHubRepo = {
  id: string;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  updated_at: string;
  fork: boolean;
};

export type LanguageStat = {
  language: string;
  count: number;
  weight: number;
};

export type GitHubPortfolioData = {
  user: GitHubUser;
  repos: GitHubRepo[];
  languages: LanguageStat[];
};
