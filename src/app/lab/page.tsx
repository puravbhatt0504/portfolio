import { RouteHero } from "@/components/sections/route-hero";
import { Reveal } from "@/components/ui/reveal";

const EXPERIMENTS = [
  {
    title: "Shader-Driven Typography",
    note: "Variable noise fields blended with glyph masks for alive headlines.",
  },
  {
    title: "Kinetic Cursor Physics",
    note: "Spring-chained cursor trails with stateful affordance responses.",
  },
  {
    title: "Narrative Scroll Engine",
    note: "Section-aware timing model combining snap, inertia, and reveal choreography.",
  },
];

export default function LabPage() {
  return (
    <main className="pb-20">
      <RouteHero
        eyebrow="Lab / Experiments"
        title="A playground for weird ideas that later become product features."
        description="I prototype interaction systems fast, test with users, then harden what resonates into scalable interfaces."
      />

      <section className="mx-auto w-full max-w-6xl space-y-5 px-6 md:px-12">
        {EXPERIMENTS.map((experiment, index) => (
          <Reveal key={experiment.title} delay={index * 0.08}>
            <article className="rounded-3xl border border-cyan-200/20 bg-zinc-900/60 p-6 backdrop-blur md:p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-100/70">
                Experiment {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-heading text-3xl text-zinc-100 md:text-4xl">
                {experiment.title}
              </h2>
              <p className="mt-3 max-w-3xl text-zinc-300/90">{experiment.note}</p>
            </article>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
