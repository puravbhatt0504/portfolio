import type { Metadata } from "next";

import { RouteHero } from "@/components/sections/route-hero";
import { LabPageClient } from "./client";

const EXPERIMENTS = [
  {
    title: "Sisyphus, with retries",
    note: "RelayQ's live demo as a 3D hill: every boulder is a real job in the real queue, and when one slips, a worker pushes it again.",
  },
  {
    title: "Eval-gated AI features",
    note: "PulseBoard's RAG and triage evals, built from real GitHub issues, run in CI and fail the build if answers, citations, or injection resistance regress.",
  },
  {
    title: "Vaidyapedia",
    note: "A small Rust (Axum + SQLite) wiki for village healing traditions, with healer submissions that go through moderated review.",
  },
];

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Side experiments and prototypes by Purav Bhatt.",
};

export default function LabPage() {
  return (
    <main className="pb-20">
      <RouteHero
        eyebrow="Lab / Purav Builds"
        title="Where I try ideas before they become products."
        description="Demos, eval harnesses, and small builds in new stacks. The ones that hold up end up in real projects."
      />

      <LabPageClient experiments={EXPERIMENTS} />
    </main>
  );
}
