"use client";

import { motion } from "framer-motion";
import { education, experience, type TimelineEntry } from "@/lib/site";

const spring = { type: "spring" as const, damping: 18, stiffness: 110 };

function Entry({ entry, index }: { entry: TimelineEntry; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...spring, delay: index * 0.08 }}
      className={`sticker relative bg-paper-white p-6 ${index % 2 === 0 ? "-rotate-[0.6deg]" : "rotate-[0.6deg]"}`}
    >
      <span className="tape -top-3 left-8 w-12 h-4 -rotate-3" />
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h4 className="font-heading text-xl font-bold text-ink">{entry.title}</h4>
        <span className="font-mono text-[11px] uppercase tracking-widest text-coral shrink-0">
          {entry.period}
        </span>
      </div>
      <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mt-1">
        {entry.org} · {entry.location}
      </p>
      <ul className="mt-4 space-y-2">
        {entry.points.map((point) => (
          <li key={point} className="flex gap-3 text-base text-ink/80 leading-relaxed">
            <span aria-hidden className="text-coral mt-0.5">✦</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </motion.li>
  );
}

function Group({ label, entries }: { label: string; entries: TimelineEntry[] }) {
  return (
    <div>
      <h3 className="font-hand text-3xl text-ink mb-6 -rotate-1">{label}</h3>
      <ol className="space-y-8">
        {entries.map((entry, i) => (
          <Entry key={`${entry.org}-${entry.title}`} entry={entry} index={i} />
        ))}
      </ol>
    </div>
  );
}

export function Experience3D() {
  return (
    <section id="experience" className="relative px-6 md:px-20 py-16 z-10">
      <div className="section-divider mb-12" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-blue mb-4">
            Experience &amp; Education
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink">
            Where I&apos;ve <span className="text-coral italic font-serif">worked</span> and studied
          </h2>
        </div>

        <div className="space-y-14">
          <Group label="Experience" entries={experience} />
          <Group label="Education" entries={education} />
        </div>
      </div>
    </section>
  );
}
