import type { Metadata } from "next";

import { RouteHero } from "@/components/sections/route-hero";
import { Reveal } from "@/components/ui/reveal";

const PRINCIPLES = [
  "Code as choreography",
  "Interaction before decoration",
  "Performance as a feature",
  "Design systems with personality",
];

export const metadata: Metadata = {
  title: "About",
  description:
    "How Purav Bhatt approaches interaction design, systems thinking, and product engineering.",
};

export default function AboutPage() {
  return (
    <main className="pb-20">
      <RouteHero
        eyebrow="About / Philosophy"
        title="I design interfaces that behave like living systems."
        description="My process blends systems thinking, motion design, and product engineering to create interfaces users can feel, not just use."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-6 md:grid-cols-2 md:px-12">
        {PRINCIPLES.map((item, index) => (
          <Reveal key={item} delay={index * 0.06}>
            <article className="rounded-3xl border border-cyan-200/20 bg-zinc-900/60 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-100/70">
                Principle {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 text-2xl text-zinc-100">{item}</h2>
            </article>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
