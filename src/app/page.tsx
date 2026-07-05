import { InteractiveShell } from "@/components/interactive-shell";
import { getGitHubPortfolioData } from "@/lib/github";

const FALLBACK_USERNAME = "puravbhatt0504";

export default async function Home() {
  const username = process.env.GITHUB_USERNAME ?? FALLBACK_USERNAME;

  const data = await getGitHubPortfolioData(username);

  return <InteractiveShell data={data} />;
}
