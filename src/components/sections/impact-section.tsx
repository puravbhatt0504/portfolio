"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";
import { PortfolioStats } from "@/types/github";

type ImpactSectionProps = {
  stats: PortfolioStats;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

export function ImpactSection({ stats }: ImpactSectionProps) {
  const metricCards = [
    {
      label: "Active repositories",
      value: formatNumber(stats.totalRepos),
      note: "Public work that signals consistency and technical range.",
    },
    {
      label: "Recent activity",
      value: formatNumber(stats.recentActivityCount),
      note: "Repositories updated in the last 6 months.",
    },
    {
      label: "Total stars",
      value: formatNumber(stats.totalStars),
      note: "Interest earned across shipped public work.",
    },
    {
      label: "Core stack",
      value: stats.primaryLanguage ?? "Multi-stack",
      note: "The strongest signal from recent repository activity.",
    },
  ];

  return (
    <section className="relative px-6 py-20 md:px-14">
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
              Positioning / Proof
            </p>
            <h2 className="mt-4 max-w-2xl font-heading text-4xl text-zinc-50 md:text-6xl">
              Built to look premium and hold up under real usage.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300/85 md:text-lg">
              The strongest portfolio work does two jobs at once: it captures
              attention fast, and it backs that attention up with credible
              execution. This site now leans into both.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {metricCards.map((metric, index) => (
                <motion.article
                  key={metric.label}
                  className="rounded-[1.5rem] border border-cyan-200/15 bg-zinc-950/60 p-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: index * 0.08, duration: 0.55 }}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                    {metric.label}
                  </p>
                  <p className="mt-3 font-heading text-3xl text-zinc-50 md:text-4xl">
                    {metric.value}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-300/75">
                    {metric.note}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="space-y-4">
          {siteConfig.services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <article className="rounded-[1.75rem] border border-white/10 bg-linear-to-br from-cyan-500/10 via-zinc-950/80 to-emerald-400/10 p-6 backdrop-blur-xl md:p-7">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/75">
                  Service {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-2xl text-zinc-50">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300/80 md:text-base">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
