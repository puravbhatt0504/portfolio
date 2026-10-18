import type { Metadata } from "next";

import { RouteHero } from "@/components/sections/route-hero";
import { AboutPageClient } from "./client";
import { siteConfig } from "@/lib/site";

const PRINCIPLES = [
  "Code as choreography",
  "Interaction before decoration",
  "Performance as a feature",
  "Design systems with personality",
];

export const metadata: Metadata = {
  title: "About",
  description:
    "How Purav Bhatt builds reliable full-stack systems and production AI features.",
};

export default function AboutPage() {
  return (
    <main className="pb-20">
      <RouteHero
        eyebrow="About / Philosophy"
        title="I build systems that hold up in production."
        description="Backends that don’t lose data, AI features measured by evals, and interfaces people actually enjoy using."
      />

      <AboutPageClient principles={PRINCIPLES} siteConfig={siteConfig} />
    </main>
  );
}
