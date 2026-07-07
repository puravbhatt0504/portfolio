"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const CARD_COLORS = [
  "rgba(139,92,246,0.10)",
  "rgba(249,115,22,0.10)",
  "rgba(59,130,246,0.10)",
];

type Experiment = {
  title: string;
  note: string;
};

type LabPageClientProps = {
  experiments: Experiment[];
};

export function LabPageClient({ experiments }: LabPageClientProps) {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-5 px-6 md:px-12">
      {experiments.map((experiment, index) => (
        <motion.div
          key={experiment.title}
          initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -30 : 30, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{
            duration: 0.9,
            delay: index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <SpotlightCard
            spotlightColor={CARD_COLORS[index % CARD_COLORS.length]}
            as="article"
          >
            <p className="text-xs uppercase tracking-label text-violet-500/90 font-semibold font-mono">
              Experiment {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-3 font-heading text-3xl text-slate-800 font-bold md:text-4xl group-hover:text-violet-700 transition-colors">
              {experiment.title}
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600 font-medium">{experiment.note}</p>
          </SpotlightCard>
        </motion.div>
      ))}
    </section>
  );
}
