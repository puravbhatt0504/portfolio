import { PortfolioShell } from "@/components/portfolio-shell";
import { getGitHubPortfolioData } from "@/lib/github";

const FALLBACK_USERNAME = "vercel";

export default async function Home() {
  const username = process.env.GITHUB_USERNAME ?? FALLBACK_USERNAME;

  const data = await getGitHubPortfolioData(username);

  return <PortfolioShell data={data} />;
}
