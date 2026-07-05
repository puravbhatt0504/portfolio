import type { Metadata } from "next";

import { RouteHero } from "@/components/sections/route-hero";
import { Reveal } from "@/components/ui/reveal";

const EXPERIMENTS = [
  {
    title: "Employee Ops UX Workbench",
    note: "Design and interaction experiments inspired by Employee Manager Final, focused on smoother admin workflows and team-level visibility.",
  },
  {
    title: "Grindflow Productivity Engine",
    note: "Rapid prototypes for task orchestration, execution tracking, and dashboard responsiveness in full-stack TypeScript systems.",
  },
  {
    title: "Sikkim Tourism Experience Concepts",
    note: "Interface concepts for destination storytelling, route discovery, and media-rich exploration tailored to Sikkim tourism use cases.",
  },
];

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Experimental product concepts and interface explorations by Purav Bhatt.",
};

export default function LabPage() {
  return (
    <main className="pb-20">
      <RouteHero
        eyebrow="Lab / Purav Builds"
        title="A full-stack experimentation space shaped by real products."
        description="I prototype features around employee management, productivity systems, and tourism experiences, then evolve the strongest ideas into production-ready implementations."
      />

      <section className="mx-auto w-full max-w-6xl space-y-5 px-6 md:px-12">
        {EXPERIMENTS.map((experiment, index) => (
          <Reveal key={experiment.title} delay={index * 0.08}>
            <article className="rounded-3xl border border-pink-500/20 bg-white/70 p-6 backdrop-blur md:p-8 shadow-sm transition hover:shadow-md">
              <p className="text-xs uppercase tracking-[0.25em] text-pink-500/90 font-bold">
                Experiment {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-heading text-3xl text-slate-800 font-bold md:text-4xl">
                {experiment.title}
              </h2>
              <p className="mt-3 max-w-3xl text-slate-600 font-medium">{experiment.note}</p>
            </article>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
