"use client";

import { motion } from "framer-motion";

import { siteConfig } from "@/lib/site";

const STEPS = [
  {
    emphasis: "Strategy",
    ...siteConfig.process[0],
  },
  {
    emphasis: "UX Systems",
    ...siteConfig.process[1],
  },
  {
    emphasis: "Engineering",
    ...siteConfig.process[2],
  },
  {
    emphasis: "Finish",
    ...siteConfig.process[3],
  },
];

export function TimelineSection() {
  return (
    <section className="relative flex min-h-screen items-center px-6 py-20 lg:snap-start md:px-14">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/75">
          Process / Delivery Rhythm
        </p>
        <h2 className="mt-3 font-heading text-4xl text-zinc-100 md:text-6xl">
          A build process clients can actually trust.
        </h2>
        <p className="mt-4 max-w-3xl text-zinc-300/85">
          The site should feel expressive, but the working style behind it
          should still feel calm, structured, and easy to collaborate with.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {STEPS.map((step, index) => (
            <motion.article
              key={step.step}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-100/75">
                {step.emphasis} / {step.step}
              </p>
              <h3 className="mt-3 text-2xl text-zinc-100">{step.title}</h3>
              <p className="mt-3 max-w-3xl text-zinc-300/85">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
