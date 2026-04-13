"use client";

import { motion } from "framer-motion";

const EVENTS = [
  {
    year: "2026",
    title: "Building Immersive Product Interfaces",
    description:
      "Shipped storytelling-driven product surfaces combining WebGL visuals, RSC architecture, and motion systems.",
  },
  {
    year: "2024",
    title: "Scaled Design System Foundations",
    description:
      "Led tokenized UI architecture and animation primitives used across enterprise-level React applications.",
  },
  {
    year: "2022",
    title: "Creative Frontend Consulting",
    description:
      "Partnered with brands and startups to design memorable landing experiences and conversion-focused microsites.",
  },
];

export function TimelineSection() {
  return (
    <section className="relative flex min-h-screen snap-start items-center px-6 py-20 md:px-14">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/75">
          Experience / Timeline
        </p>
        <h2 className="mt-3 font-heading text-4xl text-zinc-100 md:text-6xl">
          Evolution Through Motion
        </h2>

        <div className="relative mt-14 space-y-10 border-l border-cyan-300/30 pl-9">
          {EVENTS.map((event, index) => (
            <motion.article
              key={event.year}
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
            >
              <span className="absolute -left-[2.85rem] top-2 h-4 w-4 rounded-full border border-cyan-300 bg-zinc-950" />
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-100/75">
                {event.year}
              </p>
              <h3 className="mt-2 text-2xl text-zinc-100">{event.title}</h3>
              <p className="mt-3 max-w-3xl text-zinc-300/85">{event.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
