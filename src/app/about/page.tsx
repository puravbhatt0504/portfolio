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

      <AboutPageClient principles={PRINCIPLES} siteConfig={siteConfig} />
    </main>
  );
}
