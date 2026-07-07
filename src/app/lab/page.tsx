import type { Metadata } from "next";

import { RouteHero } from "@/components/sections/route-hero";
import { LabPageClient } from "./client";

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

      <LabPageClient experiments={EXPERIMENTS} />
    </main>
  );
}
