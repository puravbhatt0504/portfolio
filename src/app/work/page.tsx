import { getGitHubPortfolioData } from "@/lib/github";

import { RouteHero } from "@/components/sections/route-hero";
import { Reveal } from "@/components/ui/reveal";

const FALLBACK_USERNAME = "vercel";

export default async function WorkPage() {
  const username = process.env.GITHUB_USERNAME ?? FALLBACK_USERNAME;
  const data = await getGitHubPortfolioData(username);

  return (
    <main className="pb-20">
      <RouteHero
        eyebrow="Work / Showcase"
        title="Selected repositories and craft experiments."
        description="A curated feed from GitHub with pinned priority, tuned to spotlight impact and consistency."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-6 md:grid-cols-2 md:px-12">
        {data.repos.slice(0, 6).map((repo, index) => (
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
